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
	"/llms.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"bbb-otfxhg7f2jJccPc0U8G9sTnILjw\"",
		"mtime": "2026-08-13T11:13:25.868Z",
		"size": 3003,
		"path": "../llms.txt"
	},
	"/assets/_slug-CP8k68Rx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"455c-mAnbUrx1grYrpzuh+Rwobvcq1ws\"",
		"mtime": "2026-08-13T11:13:24.990Z",
		"size": 17756,
		"path": "../assets/_slug-CP8k68Rx.js"
	},
	"/assets/about-CvaqMaD7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16ac-S2vZCE7Jq6w4AVMLjIEBaDKVwy8\"",
		"mtime": "2026-08-13T11:13:24.990Z",
		"size": 5804,
		"path": "../assets/about-CvaqMaD7.js"
	},
	"/assets/auth-BdXtxh9Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15d4-WO7TQAdZjGQpjrq9Zoq6/ZxmevA\"",
		"mtime": "2026-08-13T11:13:24.990Z",
		"size": 5588,
		"path": "../assets/auth-BdXtxh9Z.js"
	},
	"/assets/cases-8imKi9JQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8d4-UKfA1o/rBoG12f7PFDcxOz8hl5w\"",
		"mtime": "2026-08-13T11:13:24.990Z",
		"size": 2260,
		"path": "../assets/cases-8imKi9JQ.js"
	},
	"/assets/contact-CO5HvDBD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"146c-ldQXZJuUCV49JEQcK6MuvcMQTe4\"",
		"mtime": "2026-08-13T11:13:24.990Z",
		"size": 5228,
		"path": "../assets/contact-CO5HvDBD.js"
	},
	"/assets/analyze-pPR4Yxyy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"68fa-u4naeoOjZ2L6nKoMhs3QY2W83pc\"",
		"mtime": "2026-08-13T11:13:24.990Z",
		"size": 26874,
		"path": "../assets/analyze-pPR4Yxyy.js"
	},
	"/assets/cases-CDbNA-00.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d1d-viHnyrGYI40lRXVPQYjSrNzCSds\"",
		"mtime": "2026-08-13T11:13:24.990Z",
		"size": 11549,
		"path": "../assets/cases-CDbNA-00.js"
	},
	"/assets/clock-3GLYJ-_Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"514-2uVEc6R2gYvKDEnP+guUvMhbbBI\"",
		"mtime": "2026-08-13T11:13:24.990Z",
		"size": 1300,
		"path": "../assets/clock-3GLYJ-_Q.js"
	},
	"/assets/dashboard-DmkmdNfL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2aeb-0Tu8LyZHiUL/F4VXAKay/xVi0Ck\"",
		"mtime": "2026-08-13T11:13:24.990Z",
		"size": 10987,
		"path": "../assets/dashboard-DmkmdNfL.js"
	},
	"/assets/explanation-letter-Dms6wQNh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f43-WUp3Fj3qW/KFPcWhUxU/PhuiAAw\"",
		"mtime": "2026-08-13T11:13:24.990Z",
		"size": 16195,
		"path": "../assets/explanation-letter-Dms6wQNh.js"
	},
	"/assets/faq-G_5lDUnN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ed5-iIsLIlaXOhYSfoR7kwXXqBYXj4Q\"",
		"mtime": "2026-08-13T11:13:24.990Z",
		"size": 3797,
		"path": "../assets/faq-G_5lDUnN.js"
	},
	"/assets/privacy-BiukQqqS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a69-aoHrj/gO3iYFk7ICwg+trb6EJjU\"",
		"mtime": "2026-08-13T11:13:24.990Z",
		"size": 2665,
		"path": "../assets/privacy-BiukQqqS.js"
	},
	"/assets/resources-Cb4342Ur.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec3-lazqMGGE3Z4tJy7yKJiIcI+PykI\"",
		"mtime": "2026-08-13T11:13:24.990Z",
		"size": 3779,
		"path": "../assets/resources-Cb4342Ur.js"
	},
	"/assets/pricing-BTp7AiiL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10ef-RkRSPWHkIye/4YvoO7wlHks+Rp8\"",
		"mtime": "2026-08-13T11:13:24.990Z",
		"size": 4335,
		"path": "../assets/pricing-BTp7AiiL.js"
	},
	"/assets/routes-DnB4cceR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"56f5-AsTnbQmOEDhQDf34gjARBEDNEEI\"",
		"mtime": "2026-08-13T11:13:24.990Z",
		"size": 22261,
		"path": "../assets/routes-DnB4cceR.js"
	},
	"/assets/terms-Bmyq6viH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a87-AQ0QGzn9Xi/15pV4SGMMvxi8RQU\"",
		"mtime": "2026-08-13T11:13:24.990Z",
		"size": 2695,
		"path": "../assets/terms-Bmyq6viH.js"
	},
	"/assets/workflows-Bo9BpbIB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"52e-svpiodr37dC3+PtoUPwP63i8nmY\"",
		"mtime": "2026-08-13T11:13:24.990Z",
		"size": 1326,
		"path": "../assets/workflows-Bo9BpbIB.js"
	},
	"/assets/styles-Hjx4BJ4g.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"98c3-aPmTm5ddpOwCWvMFxkEDfYyvxmk\"",
		"mtime": "2026-08-13T11:13:24.990Z",
		"size": 39107,
		"path": "../assets/styles-Hjx4BJ4g.css"
	},
	"/assets/supporting-documents-D9zwdQFU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f8e-hHcvp5ua6hB8CaEPXuBwrADMA4Y\"",
		"mtime": "2026-08-13T11:13:24.990Z",
		"size": 16270,
		"path": "../assets/supporting-documents-D9zwdQFU.js"
	},
	"/assets/respond-to-notice-Bk1TxA1U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4cee-YRBZKfv6YCi/uCNTgMLPWWz01nA\"",
		"mtime": "2026-08-13T11:13:24.990Z",
		"size": 19694,
		"path": "../assets/respond-to-notice-Bk1TxA1U.js"
	},
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"243-5agzIM++tBsokoi0arIvrZssMsg\"",
		"mtime": "2026-08-13T11:13:25.868Z",
		"size": 579,
		"path": "../favicon.svg"
	},
	"/sitemap.xml": {
		"type": "application/xml",
		"etag": "\"7a6-9kENBvtOUqBzG/F7W0Wusf671cE\"",
		"mtime": "2026-08-13T11:13:25.868Z",
		"size": 1958,
		"path": "../sitemap.xml"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"74-0J+QUqBny1BAZPd9NEpBE16Y4co\"",
		"mtime": "2026-08-13T11:13:25.869Z",
		"size": 116,
		"path": "../robots.txt"
	},
	"/assets/index-77SIX4Xo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a8ce-PnH01Nmbpaejml1zb1MSnSccHZs\"",
		"mtime": "2026-08-13T11:13:24.989Z",
		"size": 567502,
		"path": "../assets/index-77SIX4Xo.js"
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
