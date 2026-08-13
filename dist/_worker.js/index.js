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
		"mtime": "2026-08-13T09:48:03.688Z",
		"size": 579,
		"path": "../favicon.svg"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"74-0J+QUqBny1BAZPd9NEpBE16Y4co\"",
		"mtime": "2026-08-13T09:48:03.688Z",
		"size": 116,
		"path": "../robots.txt"
	},
	"/llms.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"bbb-otfxhg7f2jJccPc0U8G9sTnILjw\"",
		"mtime": "2026-08-13T09:48:03.689Z",
		"size": 3003,
		"path": "../llms.txt"
	},
	"/assets/_slug-nCcKXAWO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"455c-4gvvKYMs3bn3tIKCNlkSJlGZUUU\"",
		"mtime": "2026-08-13T09:48:02.711Z",
		"size": 17756,
		"path": "../assets/_slug-nCcKXAWO.js"
	},
	"/sitemap.xml": {
		"type": "application/xml",
		"etag": "\"7a6-9kENBvtOUqBzG/F7W0Wusf671cE\"",
		"mtime": "2026-08-13T09:48:03.689Z",
		"size": 1958,
		"path": "../sitemap.xml"
	},
	"/assets/about-BjSX4EXu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163f-CSTjUK5uZW4o7BzP5rVF7SiMvfs\"",
		"mtime": "2026-08-13T09:48:02.711Z",
		"size": 5695,
		"path": "../assets/about-BjSX4EXu.js"
	},
	"/assets/analyze-Btiq27mz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"68fa-VCBKdGJgLci8EiyaU7fo7i8qLTI\"",
		"mtime": "2026-08-13T09:48:02.711Z",
		"size": 26874,
		"path": "../assets/analyze-Btiq27mz.js"
	},
	"/assets/auth-CsLVzWtk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13de-mvWumQalOakDYEfX2T14oTpFm8Q\"",
		"mtime": "2026-08-13T09:48:02.711Z",
		"size": 5086,
		"path": "../assets/auth-CsLVzWtk.js"
	},
	"/assets/cases-CH9rubkV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"56b-URlW+QbPrwD+r5dZvZty3Mudozc\"",
		"mtime": "2026-08-13T09:48:02.711Z",
		"size": 1387,
		"path": "../assets/cases-CH9rubkV.js"
	},
	"/assets/cases-D95AkIvd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2cf0-ax/wNa1dH8K+TDrc7kAeg9mwCcU\"",
		"mtime": "2026-08-13T09:48:02.711Z",
		"size": 11504,
		"path": "../assets/cases-D95AkIvd.js"
	},
	"/assets/clock-qDWZSbMH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"514-8R0z0FbgZujIJOZS0c4l+d3Mly4\"",
		"mtime": "2026-08-13T09:48:02.711Z",
		"size": 1300,
		"path": "../assets/clock-qDWZSbMH.js"
	},
	"/assets/contact-55_eCLBU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"144f-VRijkkTcHlkvGmQlD004j5lXduY\"",
		"mtime": "2026-08-13T09:48:02.711Z",
		"size": 5199,
		"path": "../assets/contact-55_eCLBU.js"
	},
	"/assets/dashboard-BU1V46OU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2aa1-dkur9SBaZB7cukEZohscygvyMsk\"",
		"mtime": "2026-08-13T09:48:02.711Z",
		"size": 10913,
		"path": "../assets/dashboard-BU1V46OU.js"
	},
	"/assets/explanation-letter-BkRqdn0f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3984-k9Yl365CxNCQA9zYDFNBDvuVF3Y\"",
		"mtime": "2026-08-13T09:48:02.711Z",
		"size": 14724,
		"path": "../assets/explanation-letter-BkRqdn0f.js"
	},
	"/assets/faq-DQGjPfQ2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ea7-bA75w2m1u74ODjokBFWrC7nzyrk\"",
		"mtime": "2026-08-13T09:48:02.711Z",
		"size": 3751,
		"path": "../assets/faq-DQGjPfQ2.js"
	},
	"/assets/pricing-U00DpGmw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1055-sAiRkXIpL/AEzRtjBL50bQUKSTg\"",
		"mtime": "2026-08-13T09:48:02.711Z",
		"size": 4181,
		"path": "../assets/pricing-U00DpGmw.js"
	},
	"/assets/privacy-BfxtTFp-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4c-tfxHInJ/4tnCSJxdo35xvNNURRA\"",
		"mtime": "2026-08-13T09:48:02.711Z",
		"size": 2636,
		"path": "../assets/privacy-BfxtTFp-.js"
	},
	"/assets/resources-BeJUT9m9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec3-khUVCybY1PE7o1u8h5GSyr5UIZ4\"",
		"mtime": "2026-08-13T09:48:02.711Z",
		"size": 3779,
		"path": "../assets/resources-BeJUT9m9.js"
	},
	"/assets/respond-to-notice-CA38bNgO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44f3-26Bv5SAHpqK6SQsVPX6XZqG0sg4\"",
		"mtime": "2026-08-13T09:48:02.711Z",
		"size": 17651,
		"path": "../assets/respond-to-notice-CA38bNgO.js"
	},
	"/assets/routes-oPTiJQNb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"54c0-FxcMbGfM+RE+on+/qh3UlqcT/xQ\"",
		"mtime": "2026-08-13T09:48:02.711Z",
		"size": 21696,
		"path": "../assets/routes-oPTiJQNb.js"
	},
	"/assets/styles-CVQ8ziUF.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"9283-uMUJTYuOM8/NkmxULAwAfGqqFjY\"",
		"mtime": "2026-08-13T09:48:02.711Z",
		"size": 37507,
		"path": "../assets/styles-CVQ8ziUF.css"
	},
	"/assets/supporting-documents-BD9RD2O8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3bd8-YwI0/XWLWWJzLp8fz8i/Ma4vFG0\"",
		"mtime": "2026-08-13T09:48:02.711Z",
		"size": 15320,
		"path": "../assets/supporting-documents-BD9RD2O8.js"
	},
	"/assets/terms-B7IqkgbC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a6a-PbISDtz+aKaikrIPwCcCImBYLIg\"",
		"mtime": "2026-08-13T09:48:02.711Z",
		"size": 2666,
		"path": "../assets/terms-B7IqkgbC.js"
	},
	"/assets/workflows-Bo9BpbIB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"52e-svpiodr37dC3+PtoUPwP63i8nmY\"",
		"mtime": "2026-08-13T09:48:02.711Z",
		"size": 1326,
		"path": "../assets/workflows-Bo9BpbIB.js"
	},
	"/assets/index-By8RueNj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a84c-6drPJpsZj+5EjkrdxY3XwVTBRwI\"",
		"mtime": "2026-08-13T09:48:02.711Z",
		"size": 567372,
		"path": "../assets/index-By8RueNj.js"
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
