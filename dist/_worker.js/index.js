globalThis.__nitro_main__ = import.meta.url;
import { n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_j1UWbH = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_j1UWbH
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"243-5agzIM++tBsokoi0arIvrZssMsg\"",
		"mtime": "2026-08-20T16:27:44.613Z",
		"size": 579,
		"path": "../favicon.svg"
	},
	"/llms.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"bbb-otfxhg7f2jJccPc0U8G9sTnILjw\"",
		"mtime": "2026-08-20T16:27:44.613Z",
		"size": 3003,
		"path": "../llms.txt"
	},
	"/sitemap.xml": {
		"type": "application/xml",
		"etag": "\"7a6-9kENBvtOUqBzG/F7W0Wusf671cE\"",
		"mtime": "2026-08-20T16:27:44.613Z",
		"size": 1958,
		"path": "../sitemap.xml"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"74-0J+QUqBny1BAZPd9NEpBE16Y4co\"",
		"mtime": "2026-08-20T16:27:44.613Z",
		"size": 116,
		"path": "../robots.txt"
	},
	"/assets/_slug-DOrFQpJO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"437f-IHabnonPpSJCqg+OSRDnt7jnIv0\"",
		"mtime": "2026-08-20T16:27:43.760Z",
		"size": 17279,
		"path": "../assets/_slug-DOrFQpJO.js"
	},
	"/assets/analyze-CwY091ON.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6ace-Xo6Uz263iY3a92cuFMH7wuX13jY\"",
		"mtime": "2026-08-20T16:27:43.760Z",
		"size": 27342,
		"path": "../assets/analyze-CwY091ON.js"
	},
	"/assets/about-CaqI7wlr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16ac-gEg9TBSbwmL10l6+gMXE6kK86Ls\"",
		"mtime": "2026-08-20T16:27:43.760Z",
		"size": 5804,
		"path": "../assets/about-CaqI7wlr.js"
	},
	"/assets/arrow-right-BAuuKx25.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-iIUFBl43881Xb3Agi6LK5qQNBJo\"",
		"mtime": "2026-08-20T16:27:43.760Z",
		"size": 165,
		"path": "../assets/arrow-right-BAuuKx25.js"
	},
	"/assets/auth-kAJHXDH6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15d4-EmTRKe1+5uFjXmOj21sjKghSNxM\"",
		"mtime": "2026-08-20T16:27:43.760Z",
		"size": 5588,
		"path": "../assets/auth-kAJHXDH6.js"
	},
	"/assets/cases-C0oH3gaU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d1d-3IDPcPoybhLALe0MAmFc0URo0uw\"",
		"mtime": "2026-08-20T16:27:43.760Z",
		"size": 11549,
		"path": "../assets/cases-C0oH3gaU.js"
	},
	"/assets/clock-CPKZxiUu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-vkE/pqCl9aNOtKmO24SQz5y+afo\"",
		"mtime": "2026-08-20T16:27:43.760Z",
		"size": 169,
		"path": "../assets/clock-CPKZxiUu.js"
	},
	"/assets/contact-BNW4B-No.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"146c-ks4FMztSEMtFbUc6x0MFoN2cN2Y\"",
		"mtime": "2026-08-20T16:27:43.760Z",
		"size": 5228,
		"path": "../assets/contact-BNW4B-No.js"
	},
	"/assets/cases-Dm9C4uIy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8d4-Oy87VuShBHiKkoO/vElG20OnFy4\"",
		"mtime": "2026-08-20T16:27:43.760Z",
		"size": 2260,
		"path": "../assets/cases-Dm9C4uIy.js"
	},
	"/assets/explanation-letter-Au5ecaT_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f43-uQzybnbfief2g8OGu8J+KIb+360\"",
		"mtime": "2026-08-20T16:27:43.760Z",
		"size": 16195,
		"path": "../assets/explanation-letter-Au5ecaT_.js"
	},
	"/assets/dashboard-82hHgHbp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2aeb-Zticko8bJSbwVSQKHrq4jbnhamg\"",
		"mtime": "2026-08-20T16:27:43.760Z",
		"size": 10987,
		"path": "../assets/dashboard-82hHgHbp.js"
	},
	"/assets/createLucideIcon-CTXDjUOs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a5-dF9i0mOkJyRbbw+VvMuh4eXpa1s\"",
		"mtime": "2026-08-20T16:27:43.760Z",
		"size": 1189,
		"path": "../assets/createLucideIcon-CTXDjUOs.js"
	},
	"/assets/privacy-ZaGNs2iB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a69-ckj2gSLVdLazm1BkSPjwB9Ft4kA\"",
		"mtime": "2026-08-20T16:27:43.760Z",
		"size": 2665,
		"path": "../assets/privacy-ZaGNs2iB.js"
	},
	"/assets/pricing-BxjwQ9GL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10ef-hq/cao2Il15kznXPtyi1IJf+9RI\"",
		"mtime": "2026-08-20T16:27:43.760Z",
		"size": 4335,
		"path": "../assets/pricing-BxjwQ9GL.js"
	},
	"/assets/faq-BVEf6T-y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ed5-dPuH7+PHcGCvp3+QOhryw/NLgfM\"",
		"mtime": "2026-08-20T16:27:43.760Z",
		"size": 3797,
		"path": "../assets/faq-BVEf6T-y.js"
	},
	"/assets/respond-to-notice-Duqr93eC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4cee-ZocbhJZCFjLNwtVHLCrLyhSnZc0\"",
		"mtime": "2026-08-20T16:27:43.760Z",
		"size": 19694,
		"path": "../assets/respond-to-notice-Duqr93eC.js"
	},
	"/assets/respond-to-a-uscis-notice-DooY-8io.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"962-pK/qy93weEFEaovzDKh2CCODFEM\"",
		"mtime": "2026-08-20T16:27:43.760Z",
		"size": 2402,
		"path": "../assets/respond-to-a-uscis-notice-DooY-8io.js"
	},
	"/assets/resources-DpnDU94c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eb9-L1VUaztoWLct7GQfjbcI/0iYTDc\"",
		"mtime": "2026-08-20T16:27:43.760Z",
		"size": 3769,
		"path": "../assets/resources-DpnDU94c.js"
	},
	"/assets/routes-CHHoEbv3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"56f5-29JyNhGO4lZtoVQ3HZeIDPWfYrI\"",
		"mtime": "2026-08-20T16:27:43.760Z",
		"size": 22261,
		"path": "../assets/routes-CHHoEbv3.js"
	},
	"/assets/shield-check-Cipp0DiX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28c-uc0i/Ia7Q1CFL7FOp+hOnusFuEo\"",
		"mtime": "2026-08-20T16:27:43.760Z",
		"size": 652,
		"path": "../assets/shield-check-Cipp0DiX.js"
	},
	"/assets/index-CkUOA5nt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8aa7e-E5j4civc4uMC2hq6pjgya4MSusQ\"",
		"mtime": "2026-08-20T16:27:43.760Z",
		"size": 567934,
		"path": "../assets/index-CkUOA5nt.js"
	},
	"/assets/styles-BtB_GTMF.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"a2f5-NsJ59QMblakMgn/VcY4Iwm50CRM\"",
		"mtime": "2026-08-20T16:27:43.760Z",
		"size": 41717,
		"path": "../assets/styles-BtB_GTMF.css"
	},
	"/assets/supporting-documents-BoEIpESH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f8e-FT3iP9WNa/5SFKIfyyX7qmvG+DA\"",
		"mtime": "2026-08-20T16:27:43.760Z",
		"size": 16270,
		"path": "../assets/supporting-documents-BoEIpESH.js"
	},
	"/assets/terms-f05OgWY_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a87-1qnIrsC2fcEwfDFeTlNST4cjjhk\"",
		"mtime": "2026-08-20T16:27:43.760Z",
		"size": 2695,
		"path": "../assets/terms-f05OgWY_.js"
	},
	"/assets/workflows-Bo9BpbIB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"52e-svpiodr37dC3+PtoUPwP63i8nmY\"",
		"mtime": "2026-08-20T16:27:43.760Z",
		"size": 1326,
		"path": "../assets/workflows-Bo9BpbIB.js"
	},
	"/assets/workflows-DLS4NRvq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1262-sUqF95w7OYLn4iGYAUVDgLPdSZc\"",
		"mtime": "2026-08-20T16:27:43.760Z",
		"size": 4706,
		"path": "../assets/workflows-DLS4NRvq.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-pages.mjs
var nitroApp = useNitroApp();
var cloudflare_pages_default = {
	async fetch(cfReq, env, context) {
		augmentReq(cfReq, {
			env,
			context
		});
		const url = new URL(cfReq.url);
		if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfReq);
		return nitroApp.fetch(cfReq);
	},
	scheduled(event, env, context) {}
};
//#endregion
export { cloudflare_pages_default as default };
