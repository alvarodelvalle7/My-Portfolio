export interface NavLink {
	label: string;
	href: string;
}

// Single source of truth for the site's main navigation,
// shared between the header and the footer.
export const navLinks: NavLink[] = [
	{ label: "About", href: "#about" },
	{ label: "Projects", href: "#projects" },
	{ label: "Services", href: "#services" },
	{ label: "Stack", href: "#stack" },
];
