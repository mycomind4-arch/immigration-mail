import { n as require_jsx_runtime, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { f as createRouter, g as createRootRouteWithContext, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CYHM7Zxx.js
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-8hNHWk4B.css";
var Route$10 = createRootRouteWithContext()({
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
	const { queryClient } = Route$10.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$9 = () => import("./routes-CDMLQpmT.mjs");
var Route$9 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./about-gD2lI6EP.mjs");
var Route$8 = createFileRoute("/about")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./auth-BBDIYkCM.mjs");
var Route$7 = createFileRoute("/auth")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./faq-Cgrg8oJd.mjs");
var Route$6 = createFileRoute("/faq")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./pricing-CcXqE6u2.mjs");
var Route$5 = createFileRoute("/pricing")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./privacy-D2iYCJ_K.mjs");
var Route$4 = createFileRoute("/privacy")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./terms-D00CrRUf.mjs");
var Route$3 = createFileRoute("/terms")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./explanation-letter-ChZyVI9b.mjs");
var Route$2 = createFileRoute("/workflows/explanation-letter")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./respond-to-notice-_P4nw4ks.mjs");
var Route$1 = createFileRoute("/workflows/respond-to-notice")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./supporting-documents-fpLHgHcy.mjs");
var Route = createFileRoute("/workflows/supporting-documents")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$9.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$10
	}),
	AboutRoute: Route$8.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => Route$10
	}),
	AuthRoute: Route$7.update({
		id: "/auth",
		path: "/auth",
		getParentRoute: () => Route$10
	}),
	FaqRoute: Route$6.update({
		id: "/faq",
		path: "/faq",
		getParentRoute: () => Route$10
	}),
	PricingRoute: Route$5.update({
		id: "/pricing",
		path: "/pricing",
		getParentRoute: () => Route$10
	}),
	PrivacyRoute: Route$4.update({
		id: "/privacy",
		path: "/privacy",
		getParentRoute: () => Route$10
	}),
	TermsRoute: Route$3.update({
		id: "/terms",
		path: "/terms",
		getParentRoute: () => Route$10
	}),
	WorkflowsExplanationLetterRoute: Route$2.update({
		id: "/workflows/explanation-letter",
		path: "/workflows/explanation-letter",
		getParentRoute: () => Route$10
	}),
	WorkflowsRespondToNoticeRoute: Route$1.update({
		id: "/workflows/respond-to-notice",
		path: "/workflows/respond-to-notice",
		getParentRoute: () => Route$10
	}),
	WorkflowsSupportingDocumentsRoute: Route.update({
		id: "/workflows/supporting-documents",
		path: "/workflows/supporting-documents",
		getParentRoute: () => Route$10
	})
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
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
export { getRouter };
