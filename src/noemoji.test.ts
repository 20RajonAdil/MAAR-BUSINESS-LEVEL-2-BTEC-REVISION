import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

// Emoji, pictographs and dingbat check/cross marks (these render differently on every phone). Icons must be SVG.
const EMOJI = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B50}\u{22EE}\u{25A0}-\u{25FF}\u{21BB}\u{FE0F}]/u

function walk(dir: string, out: string[] = []) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (/\.(ts|tsx|css|html)$/.test(n) && !n.endsWith('.test.ts')) out.push(p)
  }
  return out
}

describe('no emoji', () => {
  it('source files contain no emoji or symbol-font glyphs', () => {
    const bad: string[] = []
    for (const f of [...walk('src'), 'index.html']) {
      const text = readFileSync(f, 'utf8')
      text.split('\n').forEach((line, i) => { if (EMOJI.test(line)) bad.push(`${f}:${i + 1}: ${line.trim().slice(0, 80)}`) })
    }
    expect(bad).toEqual([])
  })
})
