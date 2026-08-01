type ClassValue = string | number | null | boolean | undefined | ClassValue[]

function flatten(value: ClassValue, out: string[]) {
  if (!value) return
  if (Array.isArray(value)) {
    value.forEach((v) => flatten(v, out))
    return
  }
  out.push(String(value))
}

/** Minimal className combiner — avoids pulling in clsx as a dependency. */
export function cn(...values: ClassValue[]): string {
  const out: string[] = []
  values.forEach((v) => flatten(v, out))
  return out.join(' ')
}
