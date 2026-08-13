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
var _lazy_0z6k64 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_0z6k64
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
		"mtime": "2026-08-13T10:30:01.812Z",
		"size": 579,
		"path": "../favicon.svg"
	},
	"/llms.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"bbb-otfxhg7f2jJccPc0U8G9sTnILjw\"",
		"mtime": "2026-08-13T10:30:01.812Z",
		"size": 3003,
		"path": "../llms.txt"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"74-0J+QUqBny1BAZPd9NEpBE16Y4co\"",
		"mtime": "2026-08-13T10:30:01.812Z",
		"size": 116,
		"path": "../robots.txt"
	},
	"/sitemap.xml": {
		"type": "application/xml",
		"etag": "\"7a6-9kENBvtOUqBzG/F7W0Wusf671cE\"",
		"mtime": "2026-08-13T10:30:01.812Z",
		"size": 1958,
		"path": "../sitemap.xml"
	},
	"/assets/_slug-Dp2XHCFA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"455c-0+xalPBY4egcfPVwHrzHnCXn3N4\"",
		"mtime": "2026-08-13T10:30:00.982Z",
		"size": 17756,
		"path": "../assets/_slug-Dp2XHCFA.js"
	},
	"/assets/about-C-bznN4r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163f-rBi7ZFiwReH2fxWcBZVMn/fKjmE\"",
		"mtime": "2026-08-13T10:30:00.982Z",
		"size": 5695,
		"path": "../assets/about-C-bznN4r.js"
	},
	"/assets/analyze-DcCtCc4Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"68fa-D2/CZSpmB3SP15+xngEbVWl8860\"",
		"mtime": "2026-08-13T10:30:00.982Z",
		"size": 26874,
		"path": "../assets/analyze-DcCtCc4Q.js"
	},
	"/assets/auth-BG0FHgqa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13de-k4EewYmZAswj+el/23Yhu3YjYUA\"",
		"mtime": "2026-08-13T10:30:00.982Z",
		"size": 5086,
		"path": "../assets/auth-BG0FHgqa.js"
	},
	"/assets/cases-CSA4VUx3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8d4-hL1G5WI2SIVE0abu+kpndaJ0UJU\"",
		"mtime": "2026-08-13T10:30:00.982Z",
		"size": 2260,
		"path": "../assets/cases-CSA4VUx3.js"
	},
	"/assets/cases-DMKhFLKz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2cf0-oqPR4laDC5h0E7zZN6YRkHcEJ/w\"",
		"mtime": "2026-08-13T10:30:00.982Z",
		"size": 11504,
		"path": "../assets/cases-DMKhFLKz.js"
	},
	"/assets/clock-DgL0WYbn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"514-ZdKs62JA0U8F7UPt8wB5VpOIdFs\"",
		"mtime": "2026-08-13T10:30:00.982Z",
		"size": 1300,
		"path": "../assets/clock-DgL0WYbn.js"
	},
	"/assets/contact-C3p4Y79X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"144f-h4V+sLn7oJhH0DEBhmuUA4cmkr4\"",
		"mtime": "2026-08-13T10:30:00.982Z",
		"size": 5199,
		"path": "../assets/contact-C3p4Y79X.js"
	},
	"/assets/dashboard-DW9ENvba.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2aa1-LVJMmnZms40id/liFlo4/qY3FgA\"",
		"mtime": "2026-08-13T10:30:00.982Z",
		"size": 10913,
		"path": "../assets/dashboard-DW9ENvba.js"
	},
	"/assets/explanation-letter-CJeQycYU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ec4-6C5lFk125yu/IXRGJqSRZ9oxvNk\"",
		"mtime": "2026-08-13T10:30:00.982Z",
		"size": 16068,
		"path": "../assets/explanation-letter-CJeQycYU.js"
	},
	"/assets/pricing-BpH2HeoT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1055-LRcmXe5hD7z4d5bWCFY+3Sb2dAo\"",
		"mtime": "2026-08-13T10:30:00.982Z",
		"size": 4181,
		"path": "../assets/pricing-BpH2HeoT.js"
	},
	"/assets/faq-DEL-l0i1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ea7-k/5e44azLNlL6O7Bqi3n/DJhTNg\"",
		"mtime": "2026-08-13T10:30:00.982Z",
		"size": 3751,
		"path": "../assets/faq-DEL-l0i1.js"
	},
	"/assets/privacy-kUR481cg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4c-mJKlVQNa8mwzhQrLR7aRmMTeQTA\"",
		"mtime": "2026-08-13T10:30:00.983Z",
		"size": 2636,
		"path": "../assets/privacy-kUR481cg.js"
	},
	"/assets/resources-DTPPLpvq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec3-NngoYBdtteM3y7FM+gondVv/1Z0\"",
		"mtime": "2026-08-13T10:30:00.983Z",
		"size": 3779,
		"path": "../assets/resources-DTPPLpvq.js"
	},
	"/assets/respond-to-notice-B2nUu5Nu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c3e-eFspAaNFypwgBjmxi/XseuNI8sU\"",
		"mtime": "2026-08-13T10:30:00.983Z",
		"size": 19518,
		"path": "../assets/respond-to-notice-B2nUu5Nu.js"
	},
	"/assets/routes-Bq1cePpj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"54c0-nHMcKRvx0d56sFBG6yNKJbK8wlU\"",
		"mtime": "2026-08-13T10:30:00.983Z",
		"size": 21696,
		"path": "../assets/routes-Bq1cePpj.js"
	},
	"/assets/styles-CVQ8ziUF.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"9283-uMUJTYuOM8/NkmxULAwAfGqqFjY\"",
		"mtime": "2026-08-13T10:30:00.983Z",
		"size": 37507,
		"path": "../assets/styles-CVQ8ziUF.css"
	},
	"/assets/supporting-documents-B-65fRWW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f0f-E5s2zJVW+EJkGkCUQwp3b/AE/Po\"",
		"mtime": "2026-08-13T10:30:00.983Z",
		"size": 16143,
		"path": "../assets/supporting-documents-B-65fRWW.js"
	},
	"/assets/terms-BtId2Nn9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a6a-x6zhOcd/0ehPSTDyrl0T4+Mi9uw\"",
		"mtime": "2026-08-13T10:30:00.983Z",
		"size": 2666,
		"path": "../assets/terms-BtId2Nn9.js"
	},
	"/assets/workflows-Bo9BpbIB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"52e-svpiodr37dC3+PtoUPwP63i8nmY\"",
		"mtime": "2026-08-13T10:30:00.983Z",
		"size": 1326,
		"path": "../assets/workflows-Bo9BpbIB.js"
	},
	"/assets/index-b7JmOLM9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a8ce-zIzW6mb3GlIWZj22RkomyurMwcE\"",
		"mtime": "2026-08-13T10:30:00.982Z",
		"size": 567502,
		"path": "../assets/index-b7JmOLM9.js"
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
