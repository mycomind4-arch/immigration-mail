import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Lock, b as FileText, c as ShieldCheck, g as Mail, i as Trash2 } from "../_libs/lucide-react.mjs";
import { i as SiteHeader, r as SiteFooter } from "./router-CVx3ZisP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-B3jaxxuT.js
var import_jsx_runtime = require_jsx_runtime();
var sections = [
	{
		title: "Information We Collect",
		body: "We collect information you provide directly: your name, email address, mailing addresses, correspondence content, and uploaded documents. We also collect usage data such as pages visited and actions taken, used to operate and improve the service."
	},
	{
		title: "How We Use Your Information",
		body: "Your information is used solely to provide the Immigration Mail service — preparing, sending, and tracking your correspondence. We never use your documents or case details for marketing, advertising, or training AI models."
	},
	{
		title: "Data Storage & Security",
		body: "All data is stored with industry-standard encryption. Documents are stored in private, access-controlled storage. Access is limited to you and authorized service operators. We conduct regular security reviews."
	},
	{
		title: "Document Handling",
		body: "Your documents are processed only to fulfill your mailing request. The final approved document is transmitted to our mailing partner for printing and mailing. Unapproved drafts and supporting documents are stored securely and can be deleted at any time."
	},
	{
		title: "Third-Party Services",
		body: "We use the following third-party services to operate: MailMyPDF (mailing fulfillment), Stripe (payment processing), and USPS (delivery). Each service receives only the information necessary to perform its function. Your document content is never shared with analytics or advertising providers."
	},
	{
		title: "Your Rights",
		body: "You have the right to access your data, export it, and request deletion. You can delete individual documents, mailing records (after retention requirements are met), or your entire account. Contact us at any time to exercise these rights."
	},
	{
		title: "Data Retention",
		body: "Mailing records are retained for the period necessary to provide proof-of-service documentation. Draft documents can be deleted by you at any time. Account data is deleted within 30 days of your deletion request, except where retention is legally required."
	},
	{
		title: "Cookies",
		body: "We use essential cookies for authentication and session management. We do not use advertising cookies or third-party tracking pixels."
	},
	{
		title: "Contact",
		body: "For privacy questions or to exercise your data rights, contact us at privacy@immigrationmail.app."
	}
];
function PrivacyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-white py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container max-w-3xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-10 w-10 items-center justify-center rounded-lg bg-navy-50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
									size: 20,
									className: "text-navy-600"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-3xl font-bold text-navy-600",
								style: { fontFamily: "var(--font-serif)" },
								children: "Privacy Policy"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-navy-400",
								children: "Last updated: August 2026"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "alert alert-info mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
								size: 16,
								className: "shrink-0"
							}), " Your documents and case details are sensitive. This policy explains exactly how we handle them."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 space-y-6",
							children: sections.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-semibold text-navy-600",
								style: { fontFamily: "var(--font-serif)" },
								children: s.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-7 text-navy-400",
								children: s.body
							})] }, s.title))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 grid gap-4 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "card p-4 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
										size: 20,
										className: "mx-auto text-gold-500"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-navy-400",
										children: "Documents never used for marketing"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "card p-4 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
										size: 20,
										className: "mx-auto text-gold-500"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-navy-400",
										children: "Delete your data anytime"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "card p-4 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
										size: 20,
										className: "mx-auto text-gold-500"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-navy-400",
										children: "Contact us for any request"
									})]
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { PrivacyPage as component };
