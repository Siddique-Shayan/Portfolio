import type { Plugin, ViteDevServer } from 'vite'

/**
 * Dev-only middleware that runs api/contact.ts's handler directly inside the Vite dev
 * server, so `npm run dev` can exercise the contact form without needing the Vercel CLI
 * (`vercel dev`). Production deploys ignore this entirely — Vercel serves api/contact.ts
 * as a serverless function on its own, independent of the Vite build.
 */
export function contactApiDevPlugin(): Plugin {
  return {
    name: 'contact-api-dev-middleware',
    apply: 'serve',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/contact', async (req, res) => {
        const chunks: Uint8Array[] = []
        for await (const chunk of req) chunks.push(chunk as Uint8Array)
        const raw = Buffer.concat(chunks).toString('utf-8')

        let body: unknown = {}
        try {
          body = raw ? JSON.parse(raw) : {}
        } catch {
          // leave body as {} — the handler validates and rejects malformed payloads
        }

        const mockRes = {
          statusCode: 200,
          status(code: number) {
            this.statusCode = code
            return this
          },
          json(payload: unknown) {
            res.statusCode = this.statusCode
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(payload))
          },
        }

        try {
          const mod = await server.ssrLoadModule('/api/contact.ts')
          await mod.default({ method: req.method, body }, mockRes)
        } catch (error) {
          console.error('[contact-api-dev] handler failed:', error)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: false, error: 'Dev contact handler crashed — check the terminal.' }))
        }
      })
    },
  }
}
