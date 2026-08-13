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
		"mtime": "2026-08-13T06:21:14.572Z",
		"size": 3088,
		"path": "../llms.txt"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"74-0J+QUqBny1BAZPd9NEpBE16Y4co\"",
		"mtime": "2026-08-13T06:21:14.572Z",
		"size": 116,
		"path": "../robots.txt"
	},
	"/assets/_slug-CC3ouoUh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f80-VjH2YdsZ9VSjuupQS81wxNRYgXo\"",
		"mtime": "2026-08-13T06:21:13.895Z",
		"size": 16256,
		"path": "../assets/_slug-CC3ouoUh.js"
	},
	"/sitemap.xml": {
		"type": "application/xml",
		"etag": "\"7a6-9kENBvtOUqBzG/F7W0Wusf671cE\"",
		"mtime": "2026-08-13T06:21:14.572Z",
		"size": 1958,
		"path": "../sitemap.xml"
	},
	"/assets/about-Xkz88wO9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14ba-FWSY9g6vm3k8V15d8qIwMc3xMKY\"",
		"mtime": "2026-08-13T06:21:13.895Z",
		"size": 5306,
		"path": "../assets/about-Xkz88wO9.js"
	},
	"/assets/check-DarCTSdp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"71-UsGKxEzXJcputeP1aGLGeY7/yac\"",
		"mtime": "2026-08-13T06:21:13.896Z",
		"size": 113,
		"path": "../assets/check-DarCTSdp.js"
	},
	"/assets/arrow-left-DYWYLsdd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-bUIP6DLByRL9UJputmCNfjhMP7s\"",
		"mtime": "2026-08-13T06:21:13.896Z",
		"size": 154,
		"path": "../assets/arrow-left-DYWYLsdd.js"
	},
	"/assets/circle-check-BicaZ8rO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a7-YCp5kPbWmomDwjgEFE+JC1rewKc\"",
		"mtime": "2026-08-13T06:21:13.896Z",
		"size": 167,
		"path": "../assets/circle-check-BicaZ8rO.js"
	},
	"/assets/auth-Dgslg8bW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"127f-XqjafoZMlQsihd5gE8cT7UH3MZc\"",
		"mtime": "2026-08-13T06:21:13.896Z",
		"size": 4735,
		"path": "../assets/auth-Dgslg8bW.js"
	},
	"/assets/clock-EAYMUD4J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9e-NHBOMahulUBwsCbEeTxYZGbB1og\"",
		"mtime": "2026-08-13T06:21:13.896Z",
		"size": 158,
		"path": "../assets/clock-EAYMUD4J.js"
	},
	"/assets/contact-D81yNcnp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"160c-AO8wooX0Ri9qo5l8EbjcOhKg7ws\"",
		"mtime": "2026-08-13T06:21:13.896Z",
		"size": 5644,
		"path": "../assets/contact-D81yNcnp.js"
	},
	"/assets/chevron-down-BGrWT6qT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"75-qdjofhwbgGEgU+lSEyz8gTZIft0\"",
		"mtime": "2026-08-13T06:21:13.896Z",
		"size": 117,
		"path": "../assets/chevron-down-BGrWT6qT.js"
	},
	"/assets/dashboard-BBQKlEWq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b6d-mriDbdTTqxcGopEnrhzus0/rBvY\"",
		"mtime": "2026-08-13T06:21:13.896Z",
		"size": 7021,
		"path": "../assets/dashboard-BBQKlEWq.js"
	},
	"/assets/explanation-letter-BGjXfQuf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"36d7-ko5vg/8qjLN+Kjlvi12U83ffgKc\"",
		"mtime": "2026-08-13T06:21:13.896Z",
		"size": 14039,
		"path": "../assets/explanation-letter-BGjXfQuf.js"
	},
	"/assets/mail-CJGCWfRj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-VXov57syBffq0tq9rXYwgv6EZvI\"",
		"mtime": "2026-08-13T06:21:13.896Z",
		"size": 202,
		"path": "../assets/mail-CJGCWfRj.js"
	},
	"/assets/file-up-D-rAI3EE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"156-KHW0iGurK/QhvGtpSZ/YHDwHLCk\"",
		"mtime": "2026-08-13T06:21:13.896Z",
		"size": 342,
		"path": "../assets/file-up-D-rAI3EE.js"
	},
	"/assets/lock-BWwhUZ-T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c3-9ViuIP3EPJuurOp3SZUABRFmOYA\"",
		"mtime": "2026-08-13T06:21:13.896Z",
		"size": 195,
		"path": "../assets/lock-BWwhUZ-T.js"
	},
	"/assets/faq-C962wDKn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1685-euUuqqPN93k2oH6cPSCBHdDiLAU\"",
		"mtime": "2026-08-13T06:21:13.896Z",
		"size": 5765,
		"path": "../assets/faq-C962wDKn.js"
	},
	"/assets/privacy-Dbm2TwY5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1257-Rfd5i8TFdRa6qics4PgNpXV2ZVo\"",
		"mtime": "2026-08-13T06:21:13.896Z",
		"size": 4695,
		"path": "../assets/privacy-Dbm2TwY5.js"
	},
	"/assets/package-check-B--Kmshg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19f-wnCEtk3wpFk1Im25yAInzhw8iZ8\"",
		"mtime": "2026-08-13T06:21:13.896Z",
		"size": 415,
		"path": "../assets/package-check-B--Kmshg.js"
	},
	"/assets/index-h6RGz4jX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5685a-REAy+pg2oenPKP16wfvL8AEM+Z8\"",
		"mtime": "2026-08-13T06:21:13.895Z",
		"size": 354394,
		"path": "../assets/index-h6RGz4jX.js"
	},
	"/assets/pricing-BGED6PL8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1287-9HQFaO0Tq1mpMexVbEzERP+pmVc\"",
		"mtime": "2026-08-13T06:21:13.896Z",
		"size": 4743,
		"path": "../assets/pricing-BGED6PL8.js"
	},
	"/assets/respond-to-notice-D-jc86VQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"40b6-1pft9YjRIZxPexgvz2YGVVD3JSA\"",
		"mtime": "2026-08-13T06:21:13.896Z",
		"size": 16566,
		"path": "../assets/respond-to-notice-D-jc86VQ.js"
	},
	"/assets/routes-Bu3xXm6f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"55f5-Ibd+KQbHRHr76sLLYtrS+GD11vE\"",
		"mtime": "2026-08-13T06:21:13.896Z",
		"size": 22005,
		"path": "../assets/routes-Bu3xXm6f.js"
	},
	"/assets/resources-Dozr4OoM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ead-wtwbwdcthWXrhg6VLvpsgCrbsIk\"",
		"mtime": "2026-08-13T06:21:13.896Z",
		"size": 3757,
		"path": "../assets/resources-Dozr4OoM.js"
	},
	"/assets/shield-alert-ma4m3mgB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"156-8TYzHf//wsb+kUiB+BvzU9t0Kbc\"",
		"mtime": "2026-08-13T06:21:13.896Z",
		"size": 342,
		"path": "../assets/shield-alert-ma4m3mgB.js"
	},
	"/assets/shield-check-BaPcaTRH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"135-m7/d7bU61J5uST3A2+R5m4bWehc\"",
		"mtime": "2026-08-13T06:21:13.896Z",
		"size": 309,
		"path": "../assets/shield-check-BaPcaTRH.js"
	},
	"/assets/stamp-CoWSM4cp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-NeguHaMd4YFulbsDOc9p4Sfr8sU\"",
		"mtime": "2026-08-13T06:21:13.896Z",
		"size": 310,
		"path": "../assets/stamp-CoWSM4cp.js"
	},
	"/assets/sparkles-BGWEO04I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e3-Cjgr+2WEvPw5RkbQcBbNdsWyVWE\"",
		"mtime": "2026-08-13T06:21:13.896Z",
		"size": 483,
		"path": "../assets/sparkles-BGWEO04I.js"
	},
	"/assets/styles-6k83-7l6.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"7c43-UMcaqChfhRGrmL9HIozwGtJEa1Y\"",
		"mtime": "2026-08-13T06:21:13.896Z",
		"size": 31811,
		"path": "../assets/styles-6k83-7l6.css"
	},
	"/assets/supporting-documents-CSa5s0Ji.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34db-939s2O6ZMHcdNB++O1C62rrlzkA\"",
		"mtime": "2026-08-13T06:21:13.896Z",
		"size": 13531,
		"path": "../assets/supporting-documents-CSa5s0Ji.js"
	},
	"/assets/terms-DPv1xhDi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"105a-2/P8skYMKj20uDrCUPLTd8OkFYY\"",
		"mtime": "2026-08-13T06:21:13.896Z",
		"size": 4186,
		"path": "../assets/terms-DPv1xhDi.js"
	},
	"/assets/workflows-NQ6fNG8u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5eb-y0TUi8iw4W4J2FNWhxz7W8EX46M\"",
		"mtime": "2026-08-13T06:21:13.896Z",
		"size": 1515,
		"path": "../assets/workflows-NQ6fNG8u.js"
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
