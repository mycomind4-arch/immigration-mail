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
		"mtime": "2026-08-13T09:44:35.835Z",
		"size": 579,
		"path": "../favicon.svg"
	},
	"/llms.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"bbb-otfxhg7f2jJccPc0U8G9sTnILjw\"",
		"mtime": "2026-08-13T09:44:35.835Z",
		"size": 3003,
		"path": "../llms.txt"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"74-0J+QUqBny1BAZPd9NEpBE16Y4co\"",
		"mtime": "2026-08-13T09:44:35.835Z",
		"size": 116,
		"path": "../robots.txt"
	},
	"/sitemap.xml": {
		"type": "application/xml",
		"etag": "\"7a6-9kENBvtOUqBzG/F7W0Wusf671cE\"",
		"mtime": "2026-08-13T09:44:35.835Z",
		"size": 1958,
		"path": "../sitemap.xml"
	},
	"/assets/_slug-DzuT_s1E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"455c-0nfwcNUIUtNa0dJkjRIVTS1iOs4\"",
		"mtime": "2026-08-13T09:44:35.058Z",
		"size": 17756,
		"path": "../assets/_slug-DzuT_s1E.js"
	},
	"/assets/about-DJnDItV4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163f-MqG5relwqKZ424pvEM4YOZUUe58\"",
		"mtime": "2026-08-13T09:44:35.058Z",
		"size": 5695,
		"path": "../assets/about-DJnDItV4.js"
	},
	"/assets/analyze-DwAGYR5N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"68fa-AElqNNDGAwiP9987u8xidm5Y7fc\"",
		"mtime": "2026-08-13T09:44:35.058Z",
		"size": 26874,
		"path": "../assets/analyze-DwAGYR5N.js"
	},
	"/assets/clock-BTAzRzMI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"514-AsoySG4brlXEwDebkzwJY4GZMBI\"",
		"mtime": "2026-08-13T09:44:35.058Z",
		"size": 1300,
		"path": "../assets/clock-BTAzRzMI.js"
	},
	"/assets/auth-BeGYMHF9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13de-529GYa9v82iz//WdF96ql+kyod8\"",
		"mtime": "2026-08-13T09:44:35.058Z",
		"size": 5086,
		"path": "../assets/auth-BeGYMHF9.js"
	},
	"/assets/contact-B9Uf5UNa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"144f-Boj9H5ASL0Cyvh0s9R9bi2kOcLc\"",
		"mtime": "2026-08-13T09:44:35.058Z",
		"size": 5199,
		"path": "../assets/contact-B9Uf5UNa.js"
	},
	"/assets/dashboard-DLGNPOzr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ed9-t80NdkXN1McYxqpUDdB3ChqW+vE\"",
		"mtime": "2026-08-13T09:44:35.058Z",
		"size": 7897,
		"path": "../assets/dashboard-DLGNPOzr.js"
	},
	"/assets/explanation-letter-CaEaPTMn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3984-OmG18s6UsxWakqbI+I5bCW62IPs\"",
		"mtime": "2026-08-13T09:44:35.058Z",
		"size": 14724,
		"path": "../assets/explanation-letter-CaEaPTMn.js"
	},
	"/assets/faq-BDyqrfh1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ea7-dZY5DHaKRcBf6ydW72uvXPMkh1w\"",
		"mtime": "2026-08-13T09:44:35.058Z",
		"size": 3751,
		"path": "../assets/faq-BDyqrfh1.js"
	},
	"/assets/pricing-fCV-Ynx7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1055-ZPQLJqnUuaZcMPEZKkWDWeSCzsM\"",
		"mtime": "2026-08-13T09:44:35.058Z",
		"size": 4181,
		"path": "../assets/pricing-fCV-Ynx7.js"
	},
	"/assets/privacy-CAHuEIEO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4c-MZ8qERZORbn7ohoi0sAd3u5ukEk\"",
		"mtime": "2026-08-13T09:44:35.058Z",
		"size": 2636,
		"path": "../assets/privacy-CAHuEIEO.js"
	},
	"/assets/resources-BuW4EFWK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec3-Bk/3UqGUo9VYyYFJ8exA3Dqt1+Y\"",
		"mtime": "2026-08-13T09:44:35.058Z",
		"size": 3779,
		"path": "../assets/resources-BuW4EFWK.js"
	},
	"/assets/respond-to-notice-CQkEdugO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44f3-Q2o21HWsWHkDym6hpmtJtwsLVkI\"",
		"mtime": "2026-08-13T09:44:35.058Z",
		"size": 17651,
		"path": "../assets/respond-to-notice-CQkEdugO.js"
	},
	"/assets/routes-xqPkyTHC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"54c0-WgKBhfK113L1UgErb2ROckgjw8Y\"",
		"mtime": "2026-08-13T09:44:35.058Z",
		"size": 21696,
		"path": "../assets/routes-xqPkyTHC.js"
	},
	"/assets/styles-BH4RLBJ1.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"8e17-s/XHgI7wdKLYMN0guEE8c2p2MOQ\"",
		"mtime": "2026-08-13T09:44:35.058Z",
		"size": 36375,
		"path": "../assets/styles-BH4RLBJ1.css"
	},
	"/assets/supporting-documents-Dncjqb-b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3bd8-QDw6NwHA2ZwTEnRHhmNXC5WZu4A\"",
		"mtime": "2026-08-13T09:44:35.058Z",
		"size": 15320,
		"path": "../assets/supporting-documents-Dncjqb-b.js"
	},
	"/assets/terms-CBxHCi_b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a6a-9l3Ghjsiv7Kud8TguPw4SVRWZqg\"",
		"mtime": "2026-08-13T09:44:35.058Z",
		"size": 2666,
		"path": "../assets/terms-CBxHCi_b.js"
	},
	"/assets/workflows-Bo9BpbIB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"52e-svpiodr37dC3+PtoUPwP63i8nmY\"",
		"mtime": "2026-08-13T09:44:35.058Z",
		"size": 1326,
		"path": "../assets/workflows-Bo9BpbIB.js"
	},
	"/assets/index-CRvTB6_G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"89d3d-WmoobS1AU4GyNZoSqahsjdDLUQU\"",
		"mtime": "2026-08-13T09:44:35.058Z",
		"size": 564541,
		"path": "../assets/index-CRvTB6_G.js"
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
