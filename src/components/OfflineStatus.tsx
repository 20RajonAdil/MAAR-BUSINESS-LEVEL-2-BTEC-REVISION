import { useEffect, useRef, useState } from 'react'
import { useOffline } from '../lib/offline'
import { Icon } from './Icon'

/** Header pill: shows whether the site is saved for offline use, or that the device is offline. */
export function OfflinePill() {
  const { online, ready, supported } = useOffline()
  if (!supported) return null
  if (!online) return <span className="off-pill is-off" role="status" title="You are offline. Everything still works."><Icon name="wifi-off" size={16} strokeWidth={2.2} /><span>Offline</span></span>
  if (ready) return <span className="off-pill is-ready" title="The whole site is saved on this device and works offline."><Icon name="cloud-check" size={17} strokeWidth={2.1} /><span>Offline ready</span></span>
  return <span className="off-pill is-prep" title="Saving the site for offline use…"><Icon name="cloud" size={17} strokeWidth={2.1} /><span>Saving…</span></span>
}

/** Short messages when connection or version changes. Never blocks the student. */
export function OfflineToast() {
  const { online, ready, updated, dismissUpdate } = useOffline()
  const [msg, setMsg] = useState<{ icon: string; text: string } | null>(null)
  const first = useRef(true)
  const prevOnline = useRef(online)
  const prevReady = useRef(ready)

  useEffect(() => {
    if (first.current) { first.current = false; prevOnline.current = online; prevReady.current = ready; return }
    let m: { icon: string; text: string } | null = null
    if (prevOnline.current && !online) m = { icon: 'wifi-off', text: 'You are offline. Everything still works.' }
    else if (!prevOnline.current && online) m = { icon: 'cloud-check', text: 'Back online.' }
    else if (!prevReady.current && ready) m = { icon: 'cloud-check', text: 'Saved. This site now works offline.' }
    prevOnline.current = online; prevReady.current = ready
    if (m) { setMsg(m); const t = setTimeout(() => setMsg(null), 4200); return () => clearTimeout(t) }
  }, [online, ready])

  if (updated) {
    return (
      <div className="toast toast-update" role="status">
        <Icon name="sparkles" size={18} /><span>A new version is ready.</span>
        <button className="toast-btn" onClick={() => window.location.reload()}>Refresh</button>
        <button className="toast-x" onClick={dismissUpdate} aria-label="Dismiss"><Icon name="x" size={16} strokeWidth={2.6} /></button>
      </div>
    )
  }
  if (!msg) return null
  return <div className="toast" role="status"><Icon name={msg.icon} size={18} /><span>{msg.text}</span></div>
}
