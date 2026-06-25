import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Bookmark,
  Bot,
  Brain,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  CirclePlay,
  Clock,
  Columns2,
  Compass,
  Download,
  Globe,
  GraduationCap,
  Heart,
  History,
  Hourglass,
  Lightbulb,
  Link,
  Mail,
  Maximize,
  Maximize2,
  Menu,
  MessageCircle,
  Minimize,
  MoreHorizontal,
  Play,
  Share2,
  Shield,
  Sparkles,
  Trash2,
  Wallet,
  ZoomIn,
  ZoomOut,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  menu_book: BookOpen,
  arrow_forward: ArrowRight,
  arrow_back: ArrowLeft,
  chevron_left: ChevronLeft,
  chevron_right: ChevronRight,
  hourglass_top: Hourglass,
  account_balance_wallet: Wallet,
  school: GraduationCap,
  schedule: Clock,
  auto_awesome: Sparkles,
  explore: Compass,
  play_arrow: Play,
  play_circle: CirclePlay,
  menu: Menu,
  more_horiz: MoreHorizontal,
  link: Link,
  favorite: Heart,
  chat_bubble: MessageCircle,
  share: Share2,
  lightbulb: Lightbulb,
  robot_2: Bot,
  bookmark: Bookmark,
  history: History,
  delete: Trash2,
  language: Globe,
  mail: Mail,
  psychology: Brain,
  verified_user: BadgeCheck,
  help: CircleHelp,
  security: Shield,
  travel_explore: Compass,
  zoom_in: ZoomIn,
  zoom_out: ZoomOut,
  fit_width: Maximize2,
  spread: Columns2,
  fullscreen: Maximize,
  fullscreen_exit: Minimize,
  download: Download,
};

type IconProps = {
  name: string;
  className?: string;
  filled?: boolean;
};

export default function Icon({ name, className = "", filled = false }: IconProps) {
  const LucideComponent = ICONS[name];
  if (!LucideComponent) {
    if (import.meta.env.DEV) {
      console.warn(`Unknown icon: ${name}`);
    }
    return null;
  }

  return (
    <LucideComponent
      aria-hidden
      className={`inline-block shrink-0 size-[1em] ${className}`}
      fill={filled ? "currentColor" : "none"}
      strokeWidth={filled ? 0 : 2}
    />
  );
}
