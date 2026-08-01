import type { IconType } from 'react-icons'
import {
  FiBell,
  FiCpu,
  FiDatabase,
  FiEdit3,
  FiFileText,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiServer,
  FiShare2,
} from 'react-icons/fi'
import {
  SiClaude,
  SiCplusplus,
  SiCss,
  SiDocker,
  SiExpress,
  SiFigma,
  SiGit,
  SiGithub,
  SiGooglegemini,
  SiHtml5,
  SiIntellijidea,
  SiJavascript,
  SiLangchain,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiOllama,
  SiOpenjdk,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import { VscVscode } from 'react-icons/vsc'
import { BsOpenai } from 'react-icons/bs'

/**
 * Explicit icon registry for keys stored in portfolio data.
 * Deliberately NOT a wildcard `import * as Si from 'react-icons/si'` — that pulls every
 * icon in the package into the bundle (multi-MB). Only list icons actually referenced.
 */
const ICONS: Record<string, IconType> = {
  FiBell,
  FiCpu,
  FiDatabase,
  FiEdit3,
  FiFileText,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiServer,
  FiShare2,
  SiClaude,
  SiCplusplus,
  SiCss,
  SiDocker,
  SiExpress,
  SiFigma,
  SiGit,
  SiGithub,
  SiGooglegemini,
  SiHtml5,
  SiIntellijidea,
  SiJavascript,
  SiLangchain,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiOllama,
  SiOpenjdk,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
  FaAws,
  VscVscode,
  BsOpenai,
}

/** Resolves an icon key (e.g. "SiReact") stored in portfolio data to its react-icons component. */
export function getIcon(key: string | undefined): IconType | null {
  if (!key) return null
  return ICONS[key] ?? null
}
