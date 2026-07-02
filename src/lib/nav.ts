export const NAV_LINKS = [
  { to: "/learn", label: "Learn" },
  { to: "/practice", label: "Practice" },
  { to: "/resources", label: "Resources" },
  { to: "/comics", label: "Comics" },
  { to: "/project", label: "Project" },
  { to: "/amito", label: "Meet Amito" },
] as const;

export function isNavActive(currentPath: string, to: string): boolean {
  if (to === "/") return currentPath === "/";
  return currentPath === to || currentPath.startsWith(`${to}/`);
}
