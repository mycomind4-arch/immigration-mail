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
		"etag": "\"468-Y4y8jr61aAQj4LyBnjgmWBC7oOg\"",
		"mtime": "2026-08-13T05:37:03.309Z",
		"size": 1128,
		"path": "../llms.txt"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"49-7pG7yH2R1g2vU+NNposPV+EWOS0\"",
		"mtime": "2026-08-13T05:37:03.309Z",
		"size": 73,
		"path": "../robots.txt"
	},
	"/assets/about-vvb6ry5Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14fe-Mh426rLMnENnqJBCGv5lqY7VLEM\"",
		"mtime": "2026-08-13T05:37:02.753Z",
		"size": 5374,
		"path": "../assets/about-vvb6ry5Y.js"
	},
	"/sitemap.xml": {
		"type": "application/xml",
		"etag": "\"19b-X7ZEgfYLn9x1JONQ9IsXZHAkcvs\"",
		"mtime": "2026-08-13T05:37:03.309Z",
		"size": 411,
		"path": "../sitemap.xml"
	},
	"/assets/arrow-right-BK28JWJQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a0-IZQn1oUBLzHr4EJECUjJ2KsY96c\"",
		"mtime": "2026-08-13T05:37:02.753Z",
		"size": 160,
		"path": "../assets/arrow-right-BK28JWJQ.js"
	},
	"/assets/auth-TuQeM_kz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12d2-9IUHZPpximbQU163V4JefKXJVKA\"",
		"mtime": "2026-08-13T05:37:02.753Z",
		"size": 4818,
		"path": "../assets/auth-TuQeM_kz.js"
	},
	"/assets/check-Bkb7mjf3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"77-ebAlN4426+bM6lTAPTB2AV0TF+k\"",
		"mtime": "2026-08-13T05:37:02.753Z",
		"size": 119,
		"path": "../assets/check-Bkb7mjf3.js"
	},
	"/assets/chevron-down-CZx1Epfk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7b-KmU8zjcBFUu6V/58UR0KXrKh+QA\"",
		"mtime": "2026-08-13T05:37:02.753Z",
		"size": 123,
		"path": "../assets/chevron-down-CZx1Epfk.js"
	},
	"/assets/faq-BFtfbbM2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16ac-z5xEYz/SgYdGZ8Weo0/dyWzVtF8\"",
		"mtime": "2026-08-13T05:37:02.753Z",
		"size": 5804,
		"path": "../assets/faq-BFtfbbM2.js"
	},
	"/assets/circle-check-CDwFEXj_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ad-vvEY3bAnYehZ9yYQo391RK8EqxE\"",
		"mtime": "2026-08-13T05:37:02.753Z",
		"size": 173,
		"path": "../assets/circle-check-CDwFEXj_.js"
	},
	"/assets/clock-C51iBwsQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-La/GjMuRLSfBCJuiA418ju3R1Cg\"",
		"mtime": "2026-08-13T05:37:02.753Z",
		"size": 164,
		"path": "../assets/clock-C51iBwsQ.js"
	},
	"/assets/explanation-letter-X5sNJT5v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3750-YbRs21yYRNxI2F6fyA7n0PsK6UQ\"",
		"mtime": "2026-08-13T05:37:02.753Z",
		"size": 14160,
		"path": "../assets/explanation-letter-X5sNJT5v.js"
	},
	"/assets/lock-B_L8aeXI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c9-nhMCKTu7oTXyVPt+vBlLV3G7s9c\"",
		"mtime": "2026-08-13T05:37:02.753Z",
		"size": 201,
		"path": "../assets/lock-B_L8aeXI.js"
	},
	"/assets/pricing-D7D_d1ik.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13f0-Jtq+YlHqbH0qmdqitWBkddh/mp0\"",
		"mtime": "2026-08-13T05:37:02.754Z",
		"size": 5104,
		"path": "../assets/pricing-D7D_d1ik.js"
	},
	"/assets/mail-ClRyZkf7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d0-49fpt5x3Z2sZwfK0FH0q/BFsciw\"",
		"mtime": "2026-08-13T05:37:02.753Z",
		"size": 208,
		"path": "../assets/mail-ClRyZkf7.js"
	},
	"/assets/privacy-CF1EvJm1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1283-4JiHT4fNgewA2i9iqvpi7WiGIOw\"",
		"mtime": "2026-08-13T05:37:02.754Z",
		"size": 4739,
		"path": "../assets/privacy-CF1EvJm1.js"
	},
	"/assets/respond-to-notice-W9QTlhAJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"412f-l6B2ZOfclg8Tp1/ctW+Zl3vJIqk\"",
		"mtime": "2026-08-13T05:37:02.754Z",
		"size": 16687,
		"path": "../assets/respond-to-notice-W9QTlhAJ.js"
	},
	"/assets/file-up-Di9Cnvw5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15c-QGZyxjIkqMWfX8ze6HB82O2G/0U\"",
		"mtime": "2026-08-13T05:37:02.753Z",
		"size": 348,
		"path": "../assets/file-up-Di9Cnvw5.js"
	},
	"/assets/shield-check-Rgk83YSZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13b-H31GS2p2S9jZEcFiYAVJqKrf0s8\"",
		"mtime": "2026-08-13T05:37:02.754Z",
		"size": 315,
		"path": "../assets/shield-check-Rgk83YSZ.js"
	},
	"/assets/shield-alert-CgQrIECe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15c-RuvjPlt/CPXA3/hNiDN3i3hHbpE\"",
		"mtime": "2026-08-13T05:37:02.754Z",
		"size": 348,
		"path": "../assets/shield-alert-CgQrIECe.js"
	},
	"/assets/routes-DRN7-ZxJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"43f6-H/rZbh4K1U+jrka3kZksqi2uwEw\"",
		"mtime": "2026-08-13T05:37:02.754Z",
		"size": 17398,
		"path": "../assets/routes-DRN7-ZxJ.js"
	},
	"/assets/index-DunmbuBF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"53593-5N5uGOqfb2TWYLTZ5D5EV7hr2qI\"",
		"mtime": "2026-08-13T05:37:02.753Z",
		"size": 341395,
		"path": "../assets/index-DunmbuBF.js"
	},
	"/assets/site-footer-DJFnqbGo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a75-IhfKMFOyO+hgz9uepvxlQHujUv0\"",
		"mtime": "2026-08-13T05:37:02.754Z",
		"size": 6773,
		"path": "../assets/site-footer-DJFnqbGo.js"
	},
	"/assets/sparkles-BPaeMlrr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e9-KCTWEbi0JPCSnxHqNC5Bx7gsrfA\"",
		"mtime": "2026-08-13T05:37:02.754Z",
		"size": 489,
		"path": "../assets/sparkles-BPaeMlrr.js"
	},
	"/assets/stamp-DASkuYko.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b1-tCw+MqNKbnc5Yhse/1zqHhburYg\"",
		"mtime": "2026-08-13T05:37:02.754Z",
		"size": 689,
		"path": "../assets/stamp-DASkuYko.js"
	},
	"/assets/styles-CnLY034Z.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"71b7-uH8AKXddqzye8ovmIP5llW05nYc\"",
		"mtime": "2026-08-13T05:37:02.754Z",
		"size": 29111,
		"path": "../assets/styles-CnLY034Z.css"
	},
	"/assets/supporting-documents-wxtB6Rhs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3554-jGaQ2PH8SFByaVJfr3/jH3dYTuQ\"",
		"mtime": "2026-08-13T05:37:02.754Z",
		"size": 13652,
		"path": "../assets/supporting-documents-wxtB6Rhs.js"
	},
	"/assets/workflows-C-6mxnPy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"657-tPAaL86mqhDwTwlOJV8TiBrVQSg\"",
		"mtime": "2026-08-13T05:37:02.754Z",
		"size": 1623,
		"path": "../assets/workflows-C-6mxnPy.js"
	},
	"/assets/terms-D2j_d9Mt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1081-1INYQnDhsGB7TKWkmlh7regfnKE\"",
		"mtime": "2026-08-13T05:37:02.754Z",
		"size": 4225,
		"path": "../assets/terms-D2j_d9Mt.js"
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
