import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as SiteHeader, r as SiteFooter } from "./router-CEbsMTH7.mjs";
import { t as workflows } from "./workflows-C-PLUic4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/explanation-letter-RmIhNFWs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	{
		id: "intake",
		label: "Purpose"
	},
	{
		id: "facts",
		label: "Facts"
	},
	{
		id: "objective",
		label: "Objective"
	},
	{
		id: "draft",
		label: "Draft"
	},
	{
		id: "review",
		label: "Review"
	},
	{
		id: "documents",
		label: "Documents"
	},
	{
		id: "recipient",
		label: "Recipient"
	},
	{
		id: "mail",
		label: "Mail"
	},
	{
		id: "checkout",
		label: "Checkout"
	}
];
var MAIL_OPTIONS = [
	{
		id: "standard",
		label: "Standard",
		price: "$4.99",
		desc: "3–7 business days · Tracking included"
	},
	{
		id: "certified",
		label: "Certified",
		price: "$14.94",
		desc: "Delivery tracking + confirmation · 3–7 days"
	},
	{
		id: "registered",
		label: "Registered",
		price: "$32.49",
		desc: "Secure handling + tracking · 5–10 days"
	}
];
var REVIEW_CHECKS = [
	"I reviewed every factual statement in this letter.",
	"Names, dates, and reference numbers are correct.",
	"The letter accurately reflects what I want to communicate.",
	"I understand Immigration Mail is not providing legal advice."
];
function ExplanationLetter() {
	const definition = workflows["explanation-letter"];
	const [step, setStep] = (0, import_react.useState)(0);
	const [purpose, setPurpose] = (0, import_react.useState)("");
	const [recipientType, setRecipientType] = (0, import_react.useState)("");
	const [facts, setFacts] = (0, import_react.useState)("");
	const [objective, setObjective] = (0, import_react.useState)("");
	const [draft, setDraft] = (0, import_react.useState)("");
	const [checks, setChecks] = (0, import_react.useState)(REVIEW_CHECKS.map(() => false));
	const [mailType, setMailType] = (0, import_react.useState)("certified");
	const [recipient, setRecipient] = (0, import_react.useState)({
		name: "",
		org: "",
		address1: "",
		address2: "",
		city: "",
		state: "",
		zip: ""
	});
	const [done, setDone] = (0, import_react.useState)(false);
	const allChecked = checks.every(Boolean);
	function generateDraft() {
		return `Re: ${purpose || "[Explanation Letter]"}
${recipientType ? `To: ${recipientType}` : ""}

Dear Sir or Madam,

I am writing to provide the following explanation. ${objective || "[Your objective will appear here.]"}

${facts || "[The facts you provided will appear here.]"}

Sincerely,
[Your Name]`;
	}
	function canContinue() {
		switch (step) {
			case 0: return purpose.trim().length > 0;
			case 1: return facts.trim().length > 0;
			case 2: return objective.trim().length > 0;
			case 4: return allChecked;
			case 6: return !!(recipient.name && recipient.address1 && recipient.city && recipient.state && recipient.zip);
			default: return true;
		}
	}
	function next() {
		if (step === 3 && !draft) setDraft(generateDraft());
		if (step === STEPS.length - 1) {
			setDone(true);
			return;
		}
		setStep((s) => Math.min(s + 1, STEPS.length - 1));
	}
	function back() {
		setStep((s) => Math.max(s - 1, 0));
	}
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Success, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-3xl px-4 py-10 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
						current: step,
						onStep: (i) => setStep(i),
						canGoTo: (i) => i <= step
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 envelope-card p-6 md:p-10",
						children: [
							step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "postmark w-fit",
									children: "1 · Purpose"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-4 font-serif text-4xl",
									children: "Prepare an explanation letter"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-muted-foreground",
									children: "Turn your own facts and instructions into a professional, editable correspondence draft."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 rounded-md border border-rule/70 bg-paper-deep/40 p-4 text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono text-xs uppercase tracking-widest text-stamp",
										children: "Disclaimer"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2",
										children: definition.disclaimer
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "input-label",
											children: "What is this letter for? *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: "input-field",
											value: purpose,
											onChange: (e) => setPurpose(e.target.value),
											placeholder: "Example: Explain a gap in employment history"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "input-label",
											children: "Who is it addressed to?"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: "input-field",
											value: recipientType,
											onChange: (e) => setRecipientType(e.target.value),
											placeholder: "USCIS officer, embassy official, etc."
										})]
									})]
								})
							] }),
							step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "postmark w-fit",
									children: "2 · Your facts"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 font-serif text-3xl",
									children: "What do you want to explain?"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-muted-foreground",
									children: "Use your own words. Only include information you can verify."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									className: "input-field mt-6 min-h-48",
									value: facts,
									onChange: (e) => setFacts(e.target.value),
									placeholder: "Enter the facts and context you want to explain..."
								})
							] }),
							step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "postmark w-fit",
									children: "3 · Your objective"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 font-serif text-3xl",
									children: "What do you want the letter to accomplish?"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									className: "input-field mt-6 min-h-40",
									value: objective,
									onChange: (e) => setObjective(e.target.value),
									placeholder: "Example: I want to clearly explain the circumstances so the reader understands the context..."
								})
							] }),
							step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "postmark w-fit",
									children: "4 · Draft"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 font-serif text-3xl",
									children: "Your explanation letter"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-muted-foreground",
									children: "Review every fact, name, date, and statement. This is editable."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									className: "input-field mt-6 min-h-72 font-mono text-sm leading-6",
									value: draft,
									onChange: (e) => setDraft(e.target.value)
								})
							] }),
							step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "postmark w-fit",
									children: "5 · Review"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 font-serif text-3xl",
									children: "Review before anything is mailed"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 space-y-3",
									children: REVIEW_CHECKS.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "check-card",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: checks[i],
											onChange: (e) => setChecks((c) => c.map((v, j) => j === i ? e.target.checked : v))
										}), item]
									}, item))
								})
							] }),
							step === 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "postmark w-fit",
									children: "6 · Documents"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 font-serif text-3xl",
									children: "Add supporting documents"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-muted-foreground",
									children: "Attach any documents referenced in your letter."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "upload-zone mt-6 block",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											className: "mx-auto text-muted-foreground",
											width: "28",
											height: "28",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: 1.5,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												strokeLinecap: "round",
												strokeLinejoin: "round",
												d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-3 block font-medium text-foreground",
											children: "Add attachments"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-1 block text-xs text-muted-foreground",
											children: "Evidence, references, supporting documents"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "file",
											accept: "application/pdf,image/jpeg,image/png",
											multiple: true,
											className: "sr-only"
										})
									]
								})
							] }),
							step === 6 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "postmark w-fit",
									children: "7 · Recipient"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 font-serif text-3xl",
									children: "Where should we send it?"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 grid gap-4 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "sm:col-span-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "input-label",
												children: "Recipient name *"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: "input-field",
												value: recipient.name,
												onChange: (e) => setRecipient({
													...recipient,
													name: e.target.value
												})
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "sm:col-span-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "input-label",
												children: "Organization"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: "input-field",
												value: recipient.org,
												onChange: (e) => setRecipient({
													...recipient,
													org: e.target.value
												}),
												placeholder: recipientType || "Organization"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "sm:col-span-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "input-label",
												children: "Address line 1 *"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: "input-field",
												value: recipient.address1,
												onChange: (e) => setRecipient({
													...recipient,
													address1: e.target.value
												})
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "sm:col-span-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "input-label",
												children: "Address line 2"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: "input-field",
												value: recipient.address2,
												onChange: (e) => setRecipient({
													...recipient,
													address2: e.target.value
												})
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "input-label",
											children: "City *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: "input-field",
											value: recipient.city,
											onChange: (e) => setRecipient({
												...recipient,
												city: e.target.value
											})
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "input-label",
											children: "State *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: "input-field",
											value: recipient.state,
											onChange: (e) => setRecipient({
												...recipient,
												state: e.target.value
											})
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "input-label",
											children: "ZIP Code *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: "input-field",
											value: recipient.zip,
											onChange: (e) => setRecipient({
												...recipient,
												zip: e.target.value
											})
										})] })
									]
								})
							] }),
							step === 7 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "postmark w-fit",
									children: "8 · Mail options"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 font-serif text-3xl",
									children: "Choose your mail type"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 grid gap-3 sm:grid-cols-2",
									children: MAIL_OPTIONS.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `mail-option ${mailType === opt.id ? "selected" : ""}`,
										onClick: () => setMailType(opt.id),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-medium text-foreground",
												children: opt.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: opt.desc
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-right",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-serif text-lg",
													children: opt.price
												}), mailType === opt.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
													className: "ml-auto h-4 w-4 text-stamp",
													fill: "none",
													viewBox: "0 0 24 24",
													stroke: "currentColor",
													strokeWidth: 2,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
														strokeLinecap: "round",
														strokeLinejoin: "round",
														d: "M5 13l4 4L19 7"
													})
												})]
											})]
										})
									}, opt.id))
								})
							] }),
							step === 8 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "postmark w-fit",
									children: "9 · Checkout"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 font-serif text-3xl",
									children: "Review and pay"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between rounded-lg border border-rule/60 px-4 py-3 text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Mail type"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-foreground",
												children: MAIL_OPTIONS.find((m) => m.id === mailType)?.label
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between rounded-lg border border-rule/60 px-4 py-3 text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Recipient"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-foreground",
												children: recipient.name || "—"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between rounded-lg border border-rule/60 px-4 py-3 text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Total"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-serif text-lg",
												children: MAIL_OPTIONS.find((m) => m.id === mailType)?.price
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 rounded-md border border-rule/70 bg-paper-deep/40 p-3 text-sm text-muted-foreground",
									children: "Secure checkout via Stripe is being connected."
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: back,
									disabled: step === 0,
									className: "text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30",
									children: "← Back"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: next,
									disabled: !canContinue(),
									className: "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-stamp transition-transform hover:-translate-y-0.5 disabled:opacity-30 disabled:transform-none disabled:shadow-none",
									children: [step === STEPS.length - 1 ? "Pay and send" : "Continue", " →"]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "text-sm text-muted-foreground hover:text-stamp transition-colors",
							children: "← Back to Immigration Mail"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function Stepper({ current, onStep, canGoTo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "flex items-center justify-between gap-1 overflow-x-auto",
		children: STEPS.map((s, i) => {
			const done = i < current;
			const active = i === current;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-1 shrink-0 items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => canGoTo(i) && onStep(i),
						className: `flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] transition-colors ${active ? "border-stamp bg-stamp text-accent-foreground" : done ? "border-ink bg-ink text-primary-foreground" : "border-rule bg-card text-muted-foreground"}`,
						children: String(i + 1).padStart(2, "0")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `text-xs ${active ? "text-foreground" : "text-muted-foreground"}`,
						children: s.label
					}),
					i < STEPS.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1 border-t border-dashed border-rule" })
				]
			}, s.id);
		})
	});
}
function Success() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-lg px-6 py-32 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-stamp/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							className: "h-8 w-8 text-stamp",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor",
							strokeWidth: 2,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								strokeLinecap: "round",
								strokeLinejoin: "round",
								d: "M5 13l4 4L19 7"
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-6 font-serif text-4xl",
						children: "Your letter has been submitted"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted-foreground",
						children: "Your correspondence is being prepared for mailing."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 inline-flex items-center gap-2 rounded-lg border border-rule/60 px-4 py-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Tracking number:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono font-medium text-foreground",
							children: "— Pending —"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "inline-flex items-center rounded-full border border-input px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted",
							children: "Back to home"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/workflows/explanation-letter",
							className: "inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-stamp",
							children: "Start another"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { ExplanationLetter as component };
