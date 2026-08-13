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
var _lazy_hOpmiZ = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_hOpmiZ
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
	"/llms.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"c10-nrwrBvnim9nyp3vAPmPkC8aPVpk\"",
		"mtime": "2026-08-13T05:42:42.350Z",
		"size": 3088,
		"path": "../llms.txt"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"74-0J+QUqBny1BAZPd9NEpBE16Y4co\"",
		"mtime": "2026-08-13T05:42:42.350Z",
		"size": 116,
		"path": "../robots.txt"
	},
	"/sitemap.xml": {
		"type": "application/xml",
		"etag": "\"7a6-9kENBvtOUqBzG/F7W0Wusf671cE\"",
		"mtime": "2026-08-13T05:42:42.350Z",
		"size": 1958,
		"path": "../sitemap.xml"
	},
	"/assets/_slug-CT2zFCq5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f80-qAdIii6cQG+qFrcav5Ltbb6MBYw\"",
		"mtime": "2026-08-13T05:42:41.736Z",
		"size": 16256,
		"path": "../assets/_slug-CT2zFCq5.js"
	},
	"/assets/about-tIwhE8QZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14ba-UUM4m6SRxJtnssRLkBZHnIT2LHE\"",
		"mtime": "2026-08-13T05:42:41.736Z",
		"size": 5306,
		"path": "../assets/about-tIwhE8QZ.js"
	},
	"/assets/arrow-left-VJiyki0B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-6PT/cp5fXVD3ASaQd2wVjfV2op0\"",
		"mtime": "2026-08-13T05:42:41.736Z",
		"size": 154,
		"path": "../assets/arrow-left-VJiyki0B.js"
	},
	"/assets/auth-Bj_EhZO7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"127f-3eYic9jS8zvHndpOPr4G2We/ljM\"",
		"mtime": "2026-08-13T05:42:41.736Z",
		"size": 4735,
		"path": "../assets/auth-Bj_EhZO7.js"
	},
	"/assets/check-C1yuyO6Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"71-DfKm9GgWmUKn62Djjtx2hAk9Br8\"",
		"mtime": "2026-08-13T05:42:41.736Z",
		"size": 113,
		"path": "../assets/check-C1yuyO6Z.js"
	},
	"/assets/chevron-down-CpWmn2Tc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"75-AkK2BxdL25zb+LkpvKpe+eQRVV8\"",
		"mtime": "2026-08-13T05:42:41.736Z",
		"size": 117,
		"path": "../assets/chevron-down-CpWmn2Tc.js"
	},
	"/assets/circle-check-MXCBXfjd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a7-tihkILO6cWzbsKF/2HS4/etzxjA\"",
		"mtime": "2026-08-13T05:42:41.736Z",
		"size": 167,
		"path": "../assets/circle-check-MXCBXfjd.js"
	},
	"/assets/clock-BCPTY1jC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9e-SeKmM9YqjJ20heUcPIc7DB314YU\"",
		"mtime": "2026-08-13T05:42:41.736Z",
		"size": 158,
		"path": "../assets/clock-BCPTY1jC.js"
	},
	"/assets/contact-BYDyLKOj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"160c-OyCESWb2PddroZKSez04BKiq7Fo\"",
		"mtime": "2026-08-13T05:42:41.736Z",
		"size": 5644,
		"path": "../assets/contact-BYDyLKOj.js"
	},
	"/assets/dashboard-BHBwlR6U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b6d-zetaZfeO9ogCWTzNKYqAm/Kf8lY\"",
		"mtime": "2026-08-13T05:42:41.736Z",
		"size": 7021,
		"path": "../assets/dashboard-BHBwlR6U.js"
	},
	"/assets/explanation-letter-BqhPFw61.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"374c-8j+DaLycUAiuvIPDtVkFAxAUWbE\"",
		"mtime": "2026-08-13T05:42:41.736Z",
		"size": 14156,
		"path": "../assets/explanation-letter-BqhPFw61.js"
	},
	"/assets/faq-E8xDA0Rw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1685-5MySOmlDkH0k8qkDaPi8B28TANM\"",
		"mtime": "2026-08-13T05:42:41.736Z",
		"size": 5765,
		"path": "../assets/faq-E8xDA0Rw.js"
	},
	"/assets/file-up-C5PVy7N4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"156-L72mNL+xCJBcBPL0pRI8kvop+1g\"",
		"mtime": "2026-08-13T05:42:41.736Z",
		"size": 342,
		"path": "../assets/file-up-C5PVy7N4.js"
	},
	"/assets/lock-DcXqT-TJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c3-heRRifBAUbdUZV48ckAV/4ErWMU\"",
		"mtime": "2026-08-13T05:42:41.736Z",
		"size": 195,
		"path": "../assets/lock-DcXqT-TJ.js"
	},
	"/assets/mail-BqDuAn_9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-B2d5GXIMOSZBEsMpr+wVi1WbtUw\"",
		"mtime": "2026-08-13T05:42:41.736Z",
		"size": 202,
		"path": "../assets/mail-BqDuAn_9.js"
	},
	"/assets/package-check-CU33UarS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19f-iMnPFBvFG198LMsmWJMzzolG9YM\"",
		"mtime": "2026-08-13T05:42:41.736Z",
		"size": 415,
		"path": "../assets/package-check-CU33UarS.js"
	},
	"/assets/pricing-C6mCr7sT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13cb-d5innh1Q1rz04BDwFoBDLh0jSzk\"",
		"mtime": "2026-08-13T05:42:41.736Z",
		"size": 5067,
		"path": "../assets/pricing-C6mCr7sT.js"
	},
	"/assets/privacy-D1xPND_h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1257-xTRvjP8CvpkWFg4oSPd4TPBTdsY\"",
		"mtime": "2026-08-13T05:42:41.736Z",
		"size": 4695,
		"path": "../assets/privacy-D1xPND_h.js"
	},
	"/assets/resources-BZ-463E-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ead-MNl5C1XKY7MNsN+JSzwZv9qyfR0\"",
		"mtime": "2026-08-13T05:42:41.736Z",
		"size": 3757,
		"path": "../assets/resources-BZ-463E-.js"
	},
	"/assets/routes-Bf2SOUv7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"568b-7j/nMTkWFzZUQQZwPOe+sbAkCwg\"",
		"mtime": "2026-08-13T05:42:41.737Z",
		"size": 22155,
		"path": "../assets/routes-Bf2SOUv7.js"
	},
	"/assets/respond-to-notice-BQRIAuza.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"412b-UjCgSlsnptdFyHt5WZ6Rigt25Mg\"",
		"mtime": "2026-08-13T05:42:41.737Z",
		"size": 16683,
		"path": "../assets/respond-to-notice-BQRIAuza.js"
	},
	"/assets/index-EgjZQNN_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"56868-utZbthm1rxkAuwXunpE/xbILdGY\"",
		"mtime": "2026-08-13T05:42:41.736Z",
		"size": 354408,
		"path": "../assets/index-EgjZQNN_.js"
	},
	"/assets/shield-alert-BlB4eqz_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"156-K8ij8y3kynN+krqXaJ+CXI9SLtM\"",
		"mtime": "2026-08-13T05:42:41.737Z",
		"size": 342,
		"path": "../assets/shield-alert-BlB4eqz_.js"
	},
	"/assets/shield-check-Bm4SLtIw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"135-4v26lkHc4mCDjW/eCCIQm4PzbGU\"",
		"mtime": "2026-08-13T05:42:41.737Z",
		"size": 309,
		"path": "../assets/shield-check-Bm4SLtIw.js"
	},
	"/assets/stamp-0tYn7YXc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-0vzfsji7kpZibCSxElgfo0xJRQM\"",
		"mtime": "2026-08-13T05:42:41.737Z",
		"size": 310,
		"path": "../assets/stamp-0tYn7YXc.js"
	},
	"/assets/sparkles-CQJLCQmy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e3-GsK2vnOxP5qcJmJW8SF1KinujPs\"",
		"mtime": "2026-08-13T05:42:41.737Z",
		"size": 483,
		"path": "../assets/sparkles-CQJLCQmy.js"
	},
	"/assets/styles-6k83-7l6.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"7c43-UMcaqChfhRGrmL9HIozwGtJEa1Y\"",
		"mtime": "2026-08-13T05:42:41.737Z",
		"size": 31811,
		"path": "../assets/styles-6k83-7l6.css"
	},
	"/assets/supporting-documents-CydShnOV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3550-4Jndb5Fux5qgu+o0+euP854lfJE\"",
		"mtime": "2026-08-13T05:42:41.737Z",
		"size": 13648,
		"path": "../assets/supporting-documents-CydShnOV.js"
	},
	"/assets/workflows--VXaBa1T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5eb-duo6aeNuc6SFGrVF47fupCtcw1I\"",
		"mtime": "2026-08-13T05:42:41.737Z",
		"size": 1515,
		"path": "../assets/workflows--VXaBa1T.js"
	},
	"/assets/terms-ufr2TfgI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"105a-QVxcAbQZBK+BA4BEJ57prD1A04w\"",
		"mtime": "2026-08-13T05:42:41.737Z",
		"size": 4186,
		"path": "../assets/terms-ufr2TfgI.js"
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
