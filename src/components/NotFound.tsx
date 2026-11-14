import { useEffect } from 'react'
import scene from '../assets/not-found.html?raw'
import { SITE_URL } from '../lib/site'

const markup = scene
  .split('{{HOME}}').join('#/')
  .split('{{FINANCE}}').join('#/finance')
  .split('{{MARKETING}}').join('#/marketing')
  .split('{{SITE}}').join(SITE_URL)

/** Shown for any address that is not a real page of the site. The same markup is built into dist/404.html for the server. */
export function NotFound() {
  useEffect(() => {
    const before = document.title
    document.title = '404 · Page not found | MAAR BUSINESS LEVEL 2 BTEC'
    return () => { document.title = before }
  }, [])
  return <div dangerouslySetInnerHTML={{ __html: markup }} />
}
