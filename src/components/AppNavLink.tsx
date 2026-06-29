import type { AnchorHTMLAttributes, ReactNode } from "react";

type AppNavLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
  currentPath: string;
  children: ReactNode;
  activeClassName?: string;
  inactiveClassName?: string;
};

function isActive(currentPath: string, to: string) {
  if (to === "/") return currentPath === "/";
  return currentPath === to || currentPath.startsWith(`${to}/`);
}

export default function AppNavLink({
  to,
  currentPath,
  children,
  className = "",
  activeClassName = "nav-link nav-link-active",
  inactiveClassName = "nav-link",
  ...rest
}: AppNavLinkProps) {
  const active = isActive(currentPath, to);
  return (
    <a href={to} className={`${active ? activeClassName : inactiveClassName} ${className}`.trim()} {...rest}>
      {children}
    </a>
  );
}
