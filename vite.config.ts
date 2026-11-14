import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'

/** After the build, list every emitted file and write dist/sw.js from sw-template.js,
 *  so the service worker always precaches exactly what this build contains. */
function precacheManifest(): Plugin {
  let outDir = 'dist'
  return {
    name: 'maar-precache-manifest',
    apply: 'build',
    configResolved(c) { outDir = c.build.outDir },
    closeBundle() {
      const root = join(process.cwd(), outDir)
      const files: string[] = []
      const walk = (d: string) => {
        for (const n of readdirSync(d)) {
          const p = join(d, n)
          if (statSync(p).isDirectory()) walk(p)
          else files.push(relative(root, p).split('\\').join('/'))
        }
      }
      walk(root)
      const list = files.filter(f => f !== 'sw.js' && !f.endsWith('.map')).sort()
      const hash = createHash('sha1')
      for (const f of list) hash.update(f).update(readFileSync(join(root, f)))
      const id = hash.digest('hex').slice(0, 10)
      const urls = ['./', ...list.map(f => './' + f)]
      const sw = readFileSync(join(process.cwd(), 'sw-template.js'), 'utf8')
        .replace('__BUILD_ID__', id)
        .replace('/*__PRECACHE__*/[]', JSON.stringify(urls, null, 1))
      writeFileSync(join(root, 'sw.js'), sw)
      console.log(`\n[offline] precaching ${urls.length} files, build ${id}`)
    },
  }
}

// base './' keeps asset paths relative so the build works on GitHub Pages (any repo sub-path), Vercel and static hosts.
export default defineConfig({
  base: './',
  plugins: [react(), precacheManifest()],
  test: { include: ['src/**/*.test.ts'] },
})
