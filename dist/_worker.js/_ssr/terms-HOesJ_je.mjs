import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { b as FileText, l as ShieldAlert } from "../_libs/lucide-react.mjs";
import { i as SiteHeader, r as SiteFooter } from "./router-CVx3ZisP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/terms-HOesJ_je.js
var import_jsx_runtime = require_jsx_runtime();
var sections = [
	{
		title: "Acceptance of Terms",
		body: "By using Immigration Mail, you agree to these Terms of Service. If you do not agree, do not use the service."
	},
	{
		title: "Description of Service",
		body: "Immigration Mail provides guided workflows for preparing immigration-related correspondence and physical mailing services. The service includes AI-assisted drafting, document upload, physical mail delivery via USPS, and mailing record retention."
	},
	{
		title: "Not Legal Advice",
		body: "Immigration Mail is not a law firm, government agency, or accredited representative. We do not provide legal advice, legal representation, or case strategy. The AI assistant organizes information you provide but does not invent facts, determine legal requirements, or draw legal conclusions. If you need legal advice, consult a qualified immigration attorney."
	},
	{
		title: "User Responsibilities",
		body: "You are responsible for the accuracy of all information you provide. You must review every draft before approving it for mailing. You are responsible for verifying that the recipient address is correct and that the correspondence is appropriate for your situation."
	},
	{
		title: "Acceptable Use",
		body: "You agree not to use Immigration Mail to send fraudulent, threatening, or harassing correspondence. You may not use the service to file documents you know to be false or misleading. You may not attempt to access other users' data or interfere with service operations."
	},
	{
		title: "Payment & Refunds",
		body: "Payment is processed securely via Stripe before mailing. If your mailing has not been submitted for processing, you may request a full refund. Once a mailing is in process, refunds are not available. Prices include printing, paper, envelope, and postage."
	},
	{
		title: "Intellectual Property",
		body: "Immigration Mail and its design, content, and software are owned by Immigration Mail. Your correspondence content remains yours. We do not claim ownership of documents you create through the service."
	},
	{
		title: "Limitation of Liability",
		body: "Immigration Mail is provided 'as is.' We are not liable for outcomes related to your correspondence, including denied applications, missed deadlines, or delivery failures beyond our control. Our liability is limited to the cost of the mailing service provided."
	},
	{
		title: "Dispute Resolution",
		body: "Any disputes will be resolved through binding arbitration. You and Immigration Mail waive the right to participate in class action lawsuits or class-wide arbitration."
	},
	{
		title: "Changes to Terms",
		body: "We may update these terms at any time. Continued use after changes constitutes acceptance of the updated terms."
	},
	{
		title: "Contact",
		body: "For questions about these terms, contact us at support@immigrationmail.app."
	}
];
function TermsPage() {
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
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
									size: 20,
									className: "text-navy-600"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-3xl font-bold text-navy-600",
								style: { fontFamily: "var(--font-serif)" },
								children: "Terms of Service"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-navy-400",
								children: "Last updated: August 2026"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "alert alert-warning mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
								size: 18,
								className: "shrink-0"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Important:" }), " Immigration Mail is not a law firm and does not provide legal advice. These terms explain what we are and what we are not."] })]
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
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { TermsPage as component };
