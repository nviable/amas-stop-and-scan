import type { AnchorHTMLAttributes, ReactNode } from "react";

type AppLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
  children: ReactNode;
};

export default function AppLink({ to, children, className, ...rest }: AppLinkProps) {
  return (
    <a href={to} className={className} {...rest}>
      {children}
    </a>
  );
}
