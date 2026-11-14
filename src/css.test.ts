import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

// An unbalanced brace silently swallows every rule after it (it once broke the whole desktop layout), so guard it.
describe('stylesheets', () => {
  for (const f of readdirSync('src/styles').filter(n => n.endsWith('.css'))) {
    it(`${f} has balanced braces and no media query left open`, () => {
      const text = readFileSync(join('src/styles', f), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/url\([^)]*\)/g, '').replace(/'[^']*'|"[^"]*"/g, '')
      let depth = 0, min = 0
      for (const ch of text) { if (ch === '{') depth++; if (ch === '}') { depth--; min = Math.min(min, depth) } }
      expect(min).toBe(0)
      expect(depth).toBe(0)
    })
  }
})
