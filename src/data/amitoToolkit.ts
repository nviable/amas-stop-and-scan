import { asset, rasterAsset } from "../lib/assets";

export type AmitoPlatformId = "telegram" | "discord";

export interface AmitoPlatform {
  id: AmitoPlatformId;
  name: string;
  url: string;
  qrImage: string;
  handle: string;
  cta: string;
  hint: string;
  /** Tailwind classes for the icon switcher when selected / idle */
  activeClass: string;
  inactiveClass: string;
}

export const AMITO_TOOLKIT_PLATFORMS: AmitoPlatform[] = [
  {
    id: "telegram",
    name: "Telegram",
    url: "https://t.me/AmitoAIBot",
    qrImage: asset("/amito/qr-telegram.png"),
    handle: "@AMITOAIBOT",
    cta: "Open on Telegram",
    hint: "Start a chat with the Amito bot on Telegram.",
    accentClass: "text-[#229ED9]",
    activeClass: "bg-[#229ED9]/15 ring-2 ring-[#229ED9] text-[#229ED9] scale-105",
    inactiveClass: "bg-white text-on-surface-variant shadow-soft hover:bg-surface-container-low",
  },
  {
    id: "discord",
    name: "Discord",
    url: "https://discord.gg/QVeW4cCpEx",
    qrImage: asset("/amito/qr-discord.png"),
    handle: "AMAS Test Server",
    cta: "Join on Discord",
    hint: "Join the server, then DM the bot or chat openly in the main channel.",
    accentClass: "text-[#5865F2]",
    activeClass: "bg-[#5865F2]/15 ring-2 ring-[#5865F2] text-[#5865F2] scale-105",
    inactiveClass: "bg-white text-on-surface-variant shadow-soft hover:bg-surface-container-low",
  },
];

export const AMITO_TOOLKIT_FEATURED = rasterAsset("/amito/toolkit-featured.png");
