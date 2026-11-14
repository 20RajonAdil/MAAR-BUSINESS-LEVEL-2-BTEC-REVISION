import { useCallback, useEffect, useState } from 'react'

export interface OfflineState {
  /** device currently has a network connection */
  online: boolean
  /** every file of the site is saved on this device */
  ready: boolean
  /** a newer version was installed in the background */
  updated: boolean
  supported: boolean
}

let readyFlag = false
const listeners = new Set<() => void>()
const notify = () => listeners.forEach(l => l())
let updatedFlag = false

/** Called once at start-up (production only). Registers the service worker and watches its state. */
export function registerOffline() {
  if (!('serviceWorker' in navigator)) return
  // true once any service worker controls this page; the first claim on a fresh install is not an "update"
  let controlled = !!navigator.serviceWorker.controller
  navigator.serviceWorker.addEventListener('message', (e: MessageEvent) => {
    if (e.data?.type === 'OFFLINE_READY') { readyFlag = true; notify() }
  })
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (controlled) { updatedFlag = true; notify() } else controlled = true
  })
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      // ask the active worker whether the cache is complete
      const ask = () => reg.active?.postMessage({ type: 'STATUS' })
      navigator.serviceWorker.ready.then(ask)
      // look for a newer version now and whenever the app comes back to the foreground
      const check = () => { if (navigator.onLine) reg.update().catch(() => undefined) }
      document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') check() })
      window.addEventListener('online', check)
    }).catch(() => undefined)
    // ask the browser not to evict the saved site when storage is low
    navigator.storage?.persist?.().catch(() => undefined)
  })
}

export function useOffline(): OfflineState & { dismissUpdate: () => void } {
  const [, force] = useState(0)
  const [online, setOnline] = useState(() => navigator.onLine)
  useEffect(() => {
    const l = () => force(n => n + 1)
    listeners.add(l)
    const on = () => setOnline(true), off = () => setOnline(false)
    window.addEventListener('online', on); window.addEventListener('offline', off)
    return () => { listeners.delete(l); window.removeEventListener('online', on); window.removeEventListener('offline', off) }
  }, [])
  const dismissUpdate = useCallback(() => { updatedFlag = false; notify() }, [])
  return { online, ready: readyFlag, updated: updatedFlag, supported: 'serviceWorker' in navigator, dismissUpdate }
}
