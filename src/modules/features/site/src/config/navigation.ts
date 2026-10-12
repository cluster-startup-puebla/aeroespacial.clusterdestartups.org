export interface NavItem {
  key: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { key: "home", href: "/" },
  { key: "manifiesto", href: "/manifiesto" },
  { key: "blog", href: "/blog" },
  { key: "calendario", href: "/calendario" },
];
