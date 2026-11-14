import {
  ArrowLeft, ArrowRight, Banknote, BookOpen, Calculator, ChartColumn, ChartLine, Check, ChevronRight, CircleCheck, CircleX, ClipboardCheck,
  Cloud, CloudCheck, Cog, Compass, CornerDownLeft, Droplets, EllipsisVertical, FileSearch, GraduationCap, History, House, Info, Landmark, LayoutGrid,
  Lightbulb, Lock, Megaphone, Microscope, Percent, Pin, Receipt, RefreshCw, Rocket, Scale, Search, ShoppingCart, Sigma, Sparkles, Tag, Target,
  Trophy, TrendingDown, TrendingUp, TriangleAlert, Truck, WifiOff, X, Zap, Coins, Minus, Key, Layers,
} from 'lucide-react'

/** One place for every icon in the app. All are inline SVG (no emoji, no network). */
const MAP = {
  // topics
  rocket: Rocket, cog: Cog, pin: Pin, 'trending-up': TrendingUp, calculator: Calculator, banknote: Banknote, scale: Scale, 'bar-chart': ChartColumn,
  target: Target, receipt: Receipt, 'file-search': FileSearch, landmark: Landmark, droplets: Droplets, percent: Percent, sigma: Sigma,
  megaphone: Megaphone, 'shopping-cart': ShoppingCart, microscope: Microscope, compass: Compass, 'line-chart': ChartLine, tag: Tag, truck: Truck,
  // interface
  search: Search, zap: Zap, exam: ClipboardCheck, book: BookOpen, cap: GraduationCap, check: Check, x: X, 'arrow-left': ArrowLeft, 'arrow-right': ArrowRight,
  lock: Lock, refresh: RefreshCw, dots: EllipsisVertical, 'wifi-off': WifiOff, 'cloud-check': CloudCheck, cloud: Cloud, info: Info, sparkles: Sparkles,
  chevron: ChevronRight, grid: LayoutGrid, trophy: Trophy, history: History, enter: CornerDownLeft, bulb: Lightbulb, warn: TriangleAlert,
  'circle-check': CircleCheck, 'circle-x': CircleX, home: House, 'trend-down': TrendingDown, minus: Minus, coins: Coins, key: Key, layers: Layers,
} as const

export type IconName = keyof typeof MAP

export function Icon({ name, size = 20, strokeWidth = 1.9, className }: { name: string; size?: number; strokeWidth?: number; className?: string }) {
  const C = MAP[name as IconName] ?? Info
  return <C size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" focusable="false" />
}
