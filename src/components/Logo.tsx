export function Logo({ className = '' }: { className?: string }) {
  return <img className={className} src={`${import.meta.env.BASE_URL}icon-192.png`} width={192} height={192} alt="MAAR logo" decoding="async" />
}
