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
		"mtime": "2026-08-13T06:33:03.583Z",
		"size": 3088,
		"path": "../llms.txt"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"74-0J+QUqBny1BAZPd9NEpBE16Y4co\"",
		"mtime": "2026-08-13T06:33:03.583Z",
		"size": 116,
		"path": "../robots.txt"
	},
	"/assets/_slug-BNDV9kED.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"440e-24xbzDwi8d06E/l+VJet7RRj3Qs\"",
		"mtime": "2026-08-13T06:33:02.962Z",
		"size": 17422,
		"path": "../assets/_slug-BNDV9kED.js"
	},
	"/sitemap.xml": {
		"type": "application/xml",
		"etag": "\"7a6-9kENBvtOUqBzG/F7W0Wusf671cE\"",
		"mtime": "2026-08-13T06:33:03.583Z",
		"size": 1958,
		"path": "../sitemap.xml"
	},
	"/assets/about-B3KZ7Tis.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1635-2Fp8APHSxdFaqjuET24ld1scC7k\"",
		"mtime": "2026-08-13T06:33:02.962Z",
		"size": 5685,
		"path": "../assets/about-B3KZ7Tis.js"
	},
	"/assets/dashboard-CShaizXt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b70-GAxDUSASquFsbfUFHO3lUuJIPCM\"",
		"mtime": "2026-08-13T06:33:02.962Z",
		"size": 7024,
		"path": "../assets/dashboard-CShaizXt.js"
	},
	"/assets/auth-DCDyUKzz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e2e-l7ZEFQhQq9SFYtVATzwGPyEOrwY\"",
		"mtime": "2026-08-13T06:33:02.962Z",
		"size": 3630,
		"path": "../assets/auth-DCDyUKzz.js"
	},
	"/assets/contact-CGko3Hdt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"144a-VNLacJUIn0W/fXMgnCAAVU5UtXk\"",
		"mtime": "2026-08-13T06:33:02.962Z",
		"size": 5194,
		"path": "../assets/contact-CGko3Hdt.js"
	},
	"/assets/clock-JpIN9477.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"514-P/pfRsaEo63VkECeu0wAjpBlhiw\"",
		"mtime": "2026-08-13T06:33:02.962Z",
		"size": 1300,
		"path": "../assets/clock-JpIN9477.js"
	},
	"/assets/faq-DAc2oHuy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ea7-wcRqC6m+eHQ/eppGj3Vvxl2spdQ\"",
		"mtime": "2026-08-13T06:33:02.962Z",
		"size": 3751,
		"path": "../assets/faq-DAc2oHuy.js"
	},
	"/assets/explanation-letter-eQDKzHhY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3553-+iGb4LZtluRWUU2RQ4oP9nmJvlQ\"",
		"mtime": "2026-08-13T06:33:02.962Z",
		"size": 13651,
		"path": "../assets/explanation-letter-eQDKzHhY.js"
	},
	"/assets/pricing-BVIVfoj4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"104b-eqfNrbx235S48faAkVtuFI2WUQ4\"",
		"mtime": "2026-08-13T06:33:02.962Z",
		"size": 4171,
		"path": "../assets/pricing-BVIVfoj4.js"
	},
	"/assets/privacy-DfWzFRmS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4c-DUSJ97PVDN1jEGuV+oa9CIMfNGI\"",
		"mtime": "2026-08-13T06:33:02.962Z",
		"size": 2636,
		"path": "../assets/privacy-DfWzFRmS.js"
	},
	"/assets/respond-to-notice-BPAhsFHu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"404f-yDR6dSkPTH0zgjc7ckUlg0R0urA\"",
		"mtime": "2026-08-13T06:33:02.962Z",
		"size": 16463,
		"path": "../assets/respond-to-notice-BPAhsFHu.js"
	},
	"/assets/resources-BK1f6EOx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f00-zyporu2vDQvcfYkdpI4qvVnxzA4\"",
		"mtime": "2026-08-13T06:33:02.962Z",
		"size": 3840,
		"path": "../assets/resources-BK1f6EOx.js"
	},
	"/assets/styles-DvNSTP52.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"82eb-LAulhbjE37Cb0HesHpOgOMAh9ck\"",
		"mtime": "2026-08-13T06:33:02.963Z",
		"size": 33515,
		"path": "../assets/styles-DvNSTP52.css"
	},
	"/assets/routes-CYbbHtc6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"470a-CF5vVrPUAPz4MXY+xa10uTKyMWs\"",
		"mtime": "2026-08-13T06:33:02.963Z",
		"size": 18186,
		"path": "../assets/routes-CYbbHtc6.js"
	},
	"/assets/terms-BOuSlsYk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a6a-wt5m7+kQF1aHLMtX0TDQqpzgTHE\"",
		"mtime": "2026-08-13T06:33:02.963Z",
		"size": 2666,
		"path": "../assets/terms-BOuSlsYk.js"
	},
	"/assets/supporting-documents-9D3u9-hN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37a7-gN8wJPoVGUhZMN2z/NtlWEcT4Xo\"",
		"mtime": "2026-08-13T06:33:02.963Z",
		"size": 14247,
		"path": "../assets/supporting-documents-9D3u9-hN.js"
	},
	"/assets/workflows-Bo9BpbIB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"52e-svpiodr37dC3+PtoUPwP63i8nmY\"",
		"mtime": "2026-08-13T06:33:02.963Z",
		"size": 1326,
		"path": "../assets/workflows-Bo9BpbIB.js"
	},
	"/assets/index-DXLey0t3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"56174-9MpLTE40sPIfF/ZkuuimqgkeS14\"",
		"mtime": "2026-08-13T06:33:02.962Z",
		"size": 352628,
		"path": "../assets/index-DXLey0t3.js"
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
