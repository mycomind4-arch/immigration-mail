import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link, f as createRouter, g as createRootRouteWithContext, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { O as ArrowRight, b as FileText, h as Menu, t as X, v as House } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CVx3ZisP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var styles_default = "/assets/styles-iuSliQk9.css";
function SiteHeader({ variant = "default" }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const transparent = variant === "transparent";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `sticky top-0 z-50 border-b transition-all ${transparent ? "border-transparent bg-transparent" : "border-warm-border bg-white/95 backdrop-blur-sm"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container flex min-h-16 items-center justify-between py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `flex h-9 w-9 items-center justify-center rounded-lg ${transparent ? "bg-white/15" : "bg-navy-600"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
							size: 18,
							className: transparent ? "text-white" : "text-gold-400"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `text-lg font-bold tracking-tight ${transparent ? "text-white" : "text-navy-600"}`,
						style: { fontFamily: "var(--font-serif)" },
						children: "Immigration Mail"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-7 md:flex",
					children: [
						{
							label: "How it works",
							href: "/#how"
						},
						{
							label: "What you can send",
							href: "/#workflows"
						},
						{
							label: "Pricing",
							href: "/pricing"
						},
						{
							label: "Resources",
							href: "/resources"
						},
						{
							label: "FAQ",
							href: "/faq"
						}
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: item.href,
						className: `text-sm font-medium transition-colors ${transparent ? "text-white/80 hover:text-white" : "text-navy-500 hover:text-navy-600"}`,
						children: item.label
					}, item.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden items-center gap-3 md:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/dashboard",
						className: `text-sm font-semibold ${transparent ? "text-white/90 hover:text-white" : "text-navy-500 hover:text-navy-600"}`,
						children: "My Mailings"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/workflows/respond-to-notice",
						className: "btn-gold",
						children: "Start"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "md:hidden",
					onClick: () => setOpen(!open),
					"aria-label": "Menu",
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						size: 22,
						className: transparent ? "text-white" : "text-navy-600"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
						size: 22,
						className: transparent ? "text-white" : "text-navy-600"
					})
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-warm-border bg-white md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container flex flex-col gap-1 py-3",
				children: [[
					{
						label: "How it works",
						href: "/#how"
					},
					{
						label: "What you can send",
						href: "/#workflows"
					},
					{
						label: "Pricing",
						href: "/pricing"
					},
					{
						label: "Resources",
						href: "/resources"
					},
					{
						label: "FAQ",
						href: "/faq"
					},
					{
						label: "My Mailings",
						href: "/dashboard"
					},
					{
						label: "Contact",
						href: "/contact"
					}
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: item.href,
					className: "rounded-lg px-3 py-2.5 text-sm font-medium text-navy-500 hover:bg-navy-50",
					onClick: () => setOpen(false),
					children: item.label
				}, item.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/workflows/respond-to-notice",
					className: "btn-gold mt-2 justify-center",
					onClick: () => setOpen(false),
					children: "Start"
				})]
			})
		})]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-warm-border bg-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container py-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-8 w-8 items-center justify-center rounded-lg bg-navy-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
									size: 16,
									className: "text-gold-400"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-base font-bold text-navy-600",
								style: { fontFamily: "var(--font-serif)" },
								children: "Immigration Mail"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-6 text-navy-400",
							children: "Prepare and send important immigration correspondence with confidence."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold text-navy-600",
						children: "Product"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 space-y-2 text-sm text-navy-400",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/#how",
								className: "hover:text-gold-500",
								children: "How it works"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/#workflows",
								className: "hover:text-gold-500",
								children: "What you can send"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/pricing",
								className: "hover:text-gold-500",
								children: "Pricing"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/dashboard",
								className: "hover:text-gold-500",
								children: "My Mailings"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/faq",
								className: "hover:text-gold-500",
								children: "FAQ"
							}) })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold text-navy-600",
						children: "Resources"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 space-y-2 text-sm text-navy-400",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/resources",
								className: "hover:text-gold-500",
								children: "Guides"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/about",
								className: "hover:text-gold-500",
								children: "About"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: "hover:text-gold-500",
								children: "Contact"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy",
								className: "hover:text-gold-500",
								children: "Privacy Policy"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/terms",
								className: "hover:text-gold-500",
								children: "Terms of Service"
							}) })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold text-navy-600",
						children: "Important"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs leading-5 text-navy-400",
						children: "Immigration Mail is not a law firm or government agency and does not provide legal advice. You remain in control of the facts and final document."
					})] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex flex-col gap-3 border-t border-warm-border pt-6 text-xs text-navy-400 md:flex-row md:items-center md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "© 2026 Immigration Mail. Powered by MailMyPDF." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Information is educational and product-related, not legal advice." })]
			})]
		})
	});
}
var Route$14 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Immigration Mail — Prepare and send important immigration correspondence" },
			{
				name: "description",
				content: "Guided workflows to prepare, review, send, and track important immigration correspondence. Physical mail with proof of delivery. Not a law firm — you control the facts."
			},
			{
				name: "robots",
				content: "index,follow"
			},
			{
				name: "theme-color",
				content: "#1a2b4a"
			},
			{
				property: "og:title",
				content: "Immigration Mail — Send your immigration correspondence with confidence"
			},
			{
				property: "og:description",
				content: "Prepare, review, send, track, and keep a record of important immigration correspondence."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:site_name",
				content: "Immigration Mail"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "Immigration Mail — Prepare and send immigration correspondence"
			},
			{
				name: "twitter:description",
				content: "Guided workflows, physical mail with tracking, and proof of delivery."
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	notFoundComponent: NotFoundPage,
	shellComponent: RootShell,
	component: RootComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$14.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
function NotFoundPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-20 md:py-32",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container max-w-lg text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-navy-50",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
								size: 36,
								className: "text-navy-300"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-8 text-6xl font-bold text-navy-600",
							style: { fontFamily: "var(--font-serif)" },
							children: "404"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-xl font-semibold text-navy-500",
							children: "This page must be in the mail"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-navy-400",
							children: "The page you're looking for doesn't exist or has moved. Let's get you back on track."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								className: "btn-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { size: 16 }), " Back to home"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/workflows/respond-to-notice",
								className: "btn-gold",
								children: ["Start a workflow ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 16 })]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
var $$splitComponentImporter$13 = () => import("./routes-C7vXtdB-.mjs");
var Route$13 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./about-C9duR8yr.mjs");
var Route$12 = createFileRoute("/about")({
	head: () => ({ meta: [{ title: "About — Immigration Mail" }, {
		name: "description",
		content: "Immigration Mail helps people prepare and send important immigration correspondence with guided workflows, AI-assisted drafting, and physical mail with tracking."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./auth-CoxlbA5-.mjs");
var Route$11 = createFileRoute("/auth")({
	head: () => ({ meta: [
		{ title: "Sign In — Immigration Mail" },
		{
			name: "description",
			content: "Create an account or sign in to Immigration Mail."
		},
		{
			name: "robots",
			content: "noindex,nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./contact-B0xlchr7.mjs");
var Route$10 = createFileRoute("/contact")({
	head: () => ({ meta: [{ title: "Contact — Immigration Mail" }, {
		name: "description",
		content: "Get in touch with the Immigration Mail team for support, feedback, or partnership inquiries."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./dashboard-DEXGMH-A.mjs");
var Route$9 = createFileRoute("/dashboard")({
	head: () => ({ meta: [
		{ title: "My Mailings — Immigration Mail" },
		{
			name: "description",
			content: "View your mailing history, tracking status, and delivery records."
		},
		{
			name: "robots",
			content: "noindex,nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./faq-C9QNkhQ8.mjs");
var Route$8 = createFileRoute("/faq")({
	head: () => ({ meta: [
		{ title: "FAQ — Immigration Mail" },
		{
			name: "description",
			content: "Answers to common questions about Immigration Mail: how it works, mailing, privacy, legal scope, and pricing."
		},
		{
			property: "og:title",
			content: "FAQ — Immigration Mail"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./pricing-BXcfmHnv.mjs");
var Route$7 = createFileRoute("/pricing")({
	head: () => ({ meta: [
		{ title: "Pricing — Immigration Mail" },
		{
			name: "description",
			content: "Simple per-mailing pricing. First-Class $3.99, Certified $8.99, Certified with Return Receipt $12.99, Registered $15.99. No subscription."
		},
		{
			property: "og:title",
			content: "Pricing — Immigration Mail"
		},
		{
			property: "og:description",
			content: "Pay per mailing. No subscription. Prices include printing, paper, envelope, and postage."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./privacy-B3jaxxuT.mjs");
var Route$6 = createFileRoute("/privacy")({
	head: () => ({ meta: [{ title: "Privacy Policy — Immigration Mail" }, {
		name: "description",
		content: "How Immigration Mail collects, uses, stores, and protects your data and documents."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./terms-HOesJ_je.mjs");
var Route$5 = createFileRoute("/terms")({
	head: () => ({ meta: [{ title: "Terms of Service — Immigration Mail" }, {
		name: "description",
		content: "Terms of service for Immigration Mail, including user responsibilities, payment, and limitations."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./resources-BH3Nz4U-.mjs");
var Route$4 = createFileRoute("/resources/")({
	head: () => ({ meta: [
		{ title: "Resources & Guides — Immigration Mail" },
		{
			name: "description",
			content: "Guides for preparing immigration correspondence: how to respond to notices, write explanation letters, and submit supporting documents."
		},
		{
			property: "og:title",
			content: "Resources & Guides — Immigration Mail"
		},
		{
			property: "og:description",
			content: "Guides for preparing immigration correspondence."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("../_slug-DQpYsjY1.mjs");
var Route$3 = createFileRoute("/resources/$slug")({
	head: () => ({ meta: [{ title: "How to Respond to a Request for Evidence (RFE) — Immigration Mail" }, {
		name: "description",
		content: "A practical guide to organizing and responding to an RFE, including what to include and how to mail it with proof of delivery."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./explanation-letter-bu5mgS0o.mjs");
var Route$2 = createFileRoute("/workflows/explanation-letter")({
	head: () => ({ meta: [{ title: "Prepare an Explanation Letter — Immigration Mail" }, {
		name: "description",
		content: "Turn your facts and objective into a professional, editable explanation letter and mail it with tracking."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./respond-to-notice-eayEgcln.mjs");
var Route$1 = createFileRoute("/workflows/respond-to-notice")({
	head: () => ({ meta: [
		{ title: "Respond to a Notice — Immigration Mail" },
		{
			name: "description",
			content: "Guided workflow to organize a notice, prepare a response, and mail it with proof of delivery."
		},
		{
			property: "og:title",
			content: "Respond to a Notice — Immigration Mail"
		},
		{
			property: "og:description",
			content: "Organize your notice, prepare an editable draft, and send certified mail with tracking."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./supporting-documents-BnfMRJqV.mjs");
var Route = createFileRoute("/workflows/supporting-documents")({
	head: () => ({ meta: [{ title: "Submit Supporting Documents — Immigration Mail" }, {
		name: "description",
		content: "Prepare a cover letter and submit supporting documents by mail with tracking and proof of delivery."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$13.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$14
});
var AboutRoute = Route$12.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$14
});
var AuthRoute = Route$11.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$14
});
var ContactRoute = Route$10.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$14
});
var DashboardRoute = Route$9.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$14
});
var FaqRoute = Route$8.update({
	id: "/faq",
	path: "/faq",
	getParentRoute: () => Route$14
});
var PricingRoute = Route$7.update({
	id: "/pricing",
	path: "/pricing",
	getParentRoute: () => Route$14
});
var PrivacyRoute = Route$6.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$14
});
var TermsRoute = Route$5.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$14
});
var ResourcesIndexRoute = Route$4.update({
	id: "/resources/",
	path: "/resources/",
	getParentRoute: () => Route$14
});
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AuthRoute,
	ContactRoute,
	DashboardRoute,
	FaqRoute,
	PricingRoute,
	PrivacyRoute,
	TermsRoute,
	ResourcesSlugRoute: Route$3.update({
		id: "/resources/$slug",
		path: "/resources/$slug",
		getParentRoute: () => Route$14
	}),
	WorkflowsExplanationLetterRoute: Route$2.update({
		id: "/workflows/explanation-letter",
		path: "/workflows/explanation-letter",
		getParentRoute: () => Route$14
	}),
	WorkflowsRespondToNoticeRoute: Route$1.update({
		id: "/workflows/respond-to-notice",
		path: "/workflows/respond-to-notice",
		getParentRoute: () => Route$14
	}),
	WorkflowsSupportingDocumentsRoute: Route.update({
		id: "/workflows/supporting-documents",
		path: "/workflows/supporting-documents",
		getParentRoute: () => Route$14
	}),
	ResourcesIndexRoute
};
var routeTree = Route$14._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { SiteHeader as i, Route$3 as n, SiteFooter as r, router_exports as t };
