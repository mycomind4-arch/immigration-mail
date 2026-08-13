import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Clock, O as ArrowRight, T as ChevronDown, _ as Lock, a as Stamp, b as FileText, c as ShieldCheck, f as Quote, g as Mail, o as Sparkles, p as PackageCheck, u as Send, w as CircleCheck, x as Eye, y as FileUp } from "../_libs/lucide-react.mjs";
import { i as SiteHeader, r as SiteFooter } from "./router-CF6FJEW1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-tJa-VfFk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var workflows = [
	{
		title: "Respond to a Notice",
		description: "Organize a notice, confirm the important details, prepare a response, and get it ready to mail.",
		icon: FileText,
		href: "/workflows/respond-to-notice"
	},
	{
		title: "Submit Supporting Documents",
		description: "Prepare a clear cover letter and organize supporting documentation for a mailing.",
		icon: Mail,
		href: "/workflows/supporting-documents"
	},
	{
		title: "Prepare an Explanation Letter",
		description: "Turn your own facts and instructions into a professional, editable correspondence draft.",
		icon: Sparkles,
		href: "/workflows/explanation-letter"
	}
];
var features = [
	{
		icon: FileText,
		title: "Guided workflows",
		desc: "Start with the job, not a blank page. Each workflow walks you through the steps from document to mailed letter."
	},
	{
		icon: Sparkles,
		title: "AI-assisted drafting",
		desc: "Organize your facts into a professional draft. Everything is editable. The AI never invents facts, deadlines, or legal conclusions."
	},
	{
		icon: Send,
		title: "Physical mail with tracking",
		desc: "Your correspondence is printed, enveloped, and mailed via USPS. Track delivery and keep proof of service."
	},
	{
		icon: ShieldCheck,
		title: "Proof of delivery",
		desc: "Certified mail options include signature tracking and a return receipt card — your record that it arrived."
	},
	{
		icon: Lock,
		title: "Secure document handling",
		desc: "Documents are stored securely, never shared, and never used for marketing analytics. You can delete your data anytime."
	},
	{
		icon: Clock,
		title: "Mailing history",
		desc: "Every mailing is recorded. See what you sent, when, and its delivery status — all in one place."
	}
];
var steps = [
	{
		n: "01",
		title: "Understand",
		desc: "Start with the document or correspondence problem you need to solve."
	},
	{
		n: "02",
		title: "Prepare",
		desc: "Confirm your facts, let AI help organize the draft, and review every word."
	},
	{
		n: "03",
		title: "Send",
		desc: "Choose your mailing options — first-class, certified, or certified with return receipt."
	},
	{
		n: "04",
		title: "Prove",
		desc: "Track delivery and keep a permanent record of what you sent and when."
	}
];
var stats = [
	{
		value: "3–5",
		label: "Business day delivery"
	},
	{
		value: "$4.99",
		label: "Starting price per mailing"
	},
	{
		value: "100%",
		label: "You control the facts"
	},
	{
		value: "0",
		label: "Printers needed"
	}
];
var testimonials = [
	{
		quote: "I needed to respond to an RFE and didn't have a printer. Immigration Mail walked me through the whole thing and mailed it certified. The tracking gave me peace of mind.",
		author: "Maria L.",
		role: "Responded to RFE"
	},
	{
		quote: "The guided workflow made writing my explanation letter so much clearer. I liked that I could edit everything and nothing was sent until I approved it.",
		author: "David K.",
		role: "Explanation Letter"
	},
	{
		quote: "Having a record of every mailing with tracking numbers in one place is exactly what I needed for my immigration case.",
		author: "Priya S.",
		role: "Supporting Documents"
	}
];
var comparison = [
	{
		feature: "Guided workflows (not blank-page chat)",
		us: true,
		them: false
	},
	{
		feature: "AI never invents facts or legal conclusions",
		us: true,
		them: "varies"
	},
	{
		feature: "Physical mail with tracking",
		us: true,
		them: false
	},
	{
		feature: "Certified mail with return receipt",
		us: true,
		them: false
	},
	{
		feature: "Proof of delivery records",
		us: true,
		them: false
	},
	{
		feature: "Mailing history dashboard",
		us: true,
		them: false
	},
	{
		feature: "No printer or post office visit needed",
		us: true,
		them: "DIY"
	},
	{
		feature: "You review before anything is sent",
		us: true,
		them: "varies"
	}
];
var faqItems = [
	{
		q: "Is this legal advice?",
		a: "No. Immigration Mail is a correspondence tool, not a law firm. We help you prepare and send documents — we do not provide legal advice, and AI never invents facts or legal conclusions."
	},
	{
		q: "How does the mailing work?",
		a: "Your final document is printed, placed in an envelope, and mailed via USPS. You can choose first-class, certified, or certified with return receipt for proof of delivery."
	},
	{
		q: "Is my data secure?",
		a: "All documents are stored with encryption, never shared with third parties, and never used for marketing. You can request full deletion of your data at any time."
	},
	{
		q: "What types of mail can I send?",
		a: "Standard, Certified, Certified, and Registered mail. Costs start at $4.99 per mailing, including printing, paper, envelope, and postage."
	},
	{
		q: "How long does delivery take?",
		a: "First-class mail typically arrives in 3–5 business days. Certified mail follows the same timeline with added tracking and proof of delivery."
	}
];
function HomePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, { variant: "transparent" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden",
			style: { background: "linear-gradient(135deg, #1a2b4a 0%, #15223c 60%, #101a30 100%)" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 opacity-10",
				style: { backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8951d' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-12V8H14v28h14v-2H16V10h18v12h2zM16 12h12v6H16v-6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container relative py-20 md:py-28",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "badge badge-gold mb-5",
							children: "Immigration correspondence, made clearer"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl",
							style: { fontFamily: "var(--font-serif)" },
							children: "Send your immigration correspondence with confidence."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-xl text-lg leading-8 text-white/70",
							children: "Prepare professional correspondence, send physical mail with tracking, and keep a record of what you sent. Guided workflows — not blank-page AI chat."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/workflows/respond-to-notice",
								className: "btn-gold text-base",
								children: ["Respond to a Notice ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 18 })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#workflows",
								className: "inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10",
								children: "See what you can do"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-sm text-white/50",
							children: "Not a law firm. Not legal advice. You remain in control of the facts and final document."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative hidden lg:block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card relative p-6 shadow-2xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 border-b border-warm-border pb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-10 w-10 items-center justify-center rounded-lg bg-navy-600",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
											size: 20,
											className: "text-gold-400"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-navy-600",
										style: { fontFamily: "var(--font-serif)" },
										children: "Your correspondence workflow"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-navy-400",
										children: "From document to mailing record"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-5 space-y-3",
									children: [
										{
											icon: FileUp,
											text: "Upload and review your notice",
											done: true
										},
										{
											icon: FileText,
											text: "Organize the facts and objective",
											done: true
										},
										{
											icon: Sparkles,
											text: "Draft and edit your correspondence",
											done: true
										},
										{
											icon: Send,
											text: "Choose mailing and keep the record",
											done: false
										}
									].map(({ icon: Icon, text, done }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 text-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `flex h-8 w-8 items-center justify-center rounded-lg ${done ? "bg-emerald-50" : "bg-gray-100"}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
													size: 15,
													className: done ? "text-emerald-600" : "text-gray-400"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: done ? "text-navy-600" : "text-navy-400",
												children: text
											}),
											done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
												size: 15,
												className: "ml-auto text-emerald-500"
											})
										]
									}, text))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 flex items-center justify-between rounded-xl bg-navy-50 px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-sm text-navy-500",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageCheck, {
											size: 16,
											className: "text-gold-500"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tracking: USPS Certified" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "badge badge-green",
										children: "In transit"
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute -bottom-3 -right-3 flex items-center gap-2 rounded-xl bg-gold-500 px-4 py-2 text-sm font-semibold text-white shadow-lg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stamp, { size: 16 }), " Proof of delivery"]
						})]
					})]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-warm-border bg-white py-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container grid grid-cols-2 gap-6 md:grid-cols-4",
				children: stats.map(({ value, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-3xl font-bold text-navy-600",
						style: { fontFamily: "var(--font-serif)" },
						children: value
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-navy-400",
						children: label
					})]
				}, label))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-warm-border bg-cream py-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-navy-400",
				children: [
					{
						icon: Lock,
						text: "Bank-grade encryption"
					},
					{
						icon: PackageCheck,
						text: "USPS tracking included"
					},
					{
						icon: ShieldCheck,
						text: "Proof of delivery records"
					},
					{
						icon: Eye,
						text: "You review before anything is sent"
					}
				].map(({ icon: Icon, text }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							size: 16,
							className: "text-gold-500"
						}),
						" ",
						text
					]
				}, text))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "workflows",
			className: "bg-cream py-16 md:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-2xl text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "eyebrow",
							children: "Start with the job"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-3xl font-bold text-navy-600 md:text-4xl",
							style: { fontFamily: "var(--font-serif)" },
							children: "What are you trying to do?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-navy-400",
							children: "Choose a guided starting point. Immigration Mail is designed around correspondence tasks, not generic AI chat."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-5 md:grid-cols-3",
					children: workflows.map(({ title, description, icon: Icon, href }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: href,
						className: "card group p-6 transition hover:-translate-y-1 hover:shadow-lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									size: 24,
									className: "text-navy-600"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-5 text-xl font-semibold text-navy-600",
								style: { fontFamily: "var(--font-serif)" },
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-6 text-navy-400",
								children: description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-600",
								children: ["Start workflow ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
									size: 16,
									className: "transition-transform group-hover:translate-x-1"
								})]
							})
						]
					}, title))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "how",
			className: "bg-white py-16 md:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "eyebrow",
							children: "The process"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-3xl font-bold text-navy-600 md:text-4xl",
							style: { fontFamily: "var(--font-serif)" },
							children: "How Immigration Mail works"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-navy-400",
							children: "From document to delivered letter in four clear steps. Nothing is sent until you review and approve it."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-8 md:grid-cols-4",
					children: steps.map(({ n, title, desc }, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [
							i < steps.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-[2.2rem] top-12 hidden h-px w-[calc(100%-2rem)] bg-gradient-to-r from-warm-border to-transparent md:block" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-12 w-12 items-center justify-center rounded-xl bg-navy-600 text-white",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-bold",
									children: n
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-lg font-semibold text-navy-600",
								style: { fontFamily: "var(--font-serif)" },
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-6 text-navy-400",
								children: desc
							})
						]
					}, n))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "features",
			className: "bg-cream py-16 md:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "eyebrow",
							children: "Why Immigration Mail"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-3xl font-bold text-navy-600 md:text-4xl",
							style: { fontFamily: "var(--font-serif)" },
							children: "Built for important mail"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-navy-400",
							children: "Everything you need to prepare, send, and prove your immigration correspondence — in one place."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3",
					children: features.map(({ icon: Icon, title, desc }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-11 w-11 items-center justify-center rounded-lg bg-gold-50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									size: 22,
									className: "text-gold-600"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 font-semibold text-navy-600",
								style: { fontFamily: "var(--font-serif)" },
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-6 text-navy-400",
								children: desc
							})
						]
					}, title))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-white py-16 md:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container max-w-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "eyebrow",
						children: "The difference"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-3xl font-bold text-navy-600 md:text-4xl",
						style: { fontFamily: "var(--font-serif)" },
						children: "Immigration Mail vs. doing it yourself"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm border border-warm-border rounded-xl overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-navy-600 text-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-4 text-left font-semibold",
									children: "Feature"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-4 text-center font-semibold",
									style: { fontFamily: "var(--font-serif)" },
									children: "Immigration Mail"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-4 text-center font-semibold",
									children: "DIY"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-warm-border",
							children: comparison.map(({ feature, us, them }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-cream/50",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3.5 text-navy-500 font-medium",
										children: feature
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3.5 text-center",
										children: us === true ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
											size: 18,
											className: "mx-auto text-emerald-600"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-navy-400",
											children: us
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3.5 text-center",
										children: them === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-navy-300",
											children: "—"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-navy-400",
											children: them
										})
									})
								]
							}, feature))
						})]
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-cream py-16 md:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-2xl text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "eyebrow",
						children: "What people say"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-3xl font-bold text-navy-600 md:text-4xl",
						style: { fontFamily: "var(--font-serif)" },
						children: "Built for real correspondence"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-5 md:grid-cols-3",
					children: testimonials.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, {
								size: 24,
								className: "text-gold-300"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-sm leading-7 text-navy-500",
								children: [
									"\"",
									t.quote,
									"\""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-10 w-10 items-center justify-center rounded-full bg-navy-50 font-bold text-navy-500",
									style: { fontFamily: "var(--font-serif)" },
									children: t.author.charAt(0)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-navy-600",
									children: t.author
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-navy-400",
									children: t.role
								})] })]
							})
						]
					}, t.author))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "pricing",
			className: "bg-white py-16 md:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-2xl text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "eyebrow",
								children: "Simple pricing"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 text-3xl font-bold text-navy-600 md:text-4xl",
								style: { fontFamily: "var(--font-serif)" },
								children: "Pay per mailing. No subscription."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-navy-400",
								children: "Prices include printing, paper, envelope, and postage."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-12 grid gap-5 md:grid-cols-4",
						children: [
							{
								type: "Standard",
								price: "$4.99",
								desc: "3–7 business days, tracking included",
								icon: Mail
							},
							{
								type: "Certified",
								price: "$14.94",
								desc: "Delivery tracking + confirmation",
								icon: PackageCheck
							},
							{
								type: "Registered",
								price: "$32.49",
								desc: "Secure handling + tracking, insured",
								icon: Stamp,
								featured: true
							}
						].map(({ type, price, desc, icon: Icon, featured }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `card p-6 text-center ${featured ? "ring-2 ring-gold-400" : ""}`,
							children: [
								featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "badge badge-gold mb-3",
									children: "Most popular"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									size: 28,
									className: "mx-auto text-navy-600"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 font-semibold text-navy-600",
									style: { fontFamily: "var(--font-serif)" },
									children: type
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-3xl font-bold text-navy-600",
									style: { fontFamily: "var(--font-serif)" },
									children: price
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-navy-400",
									children: desc
								})
							]
						}, type))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/pricing",
							className: "btn-outline",
							children: ["See full pricing ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 16 })]
						})
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "trust",
			className: "bg-cream py-16 md:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-8 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
									size: 24,
									className: "text-gold-500"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 text-lg font-semibold text-navy-600",
									style: { fontFamily: "var(--font-serif)" },
									children: "Your facts stay yours"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-6 text-navy-400",
									children: "AI assists with organization and drafting. It will never invent facts, deadlines, or legal conclusions. Your documents are encrypted and never shared."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
									size: 24,
									className: "text-gold-500"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 text-lg font-semibold text-navy-600",
									style: { fontFamily: "var(--font-serif)" },
									children: "Built for important mail"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-6 text-navy-400",
									children: "The product is designed around physical correspondence, tracking, and a retained mailing record — not just digital documents."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
									size: 24,
									className: "text-gold-500"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 text-lg font-semibold text-navy-600",
									style: { fontFamily: "var(--font-serif)" },
									children: "Know what we're not"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-6 text-navy-400",
									children: "Immigration Mail is not a government agency or law firm and does not provide legal advice. If you need legal guidance, consult a qualified immigration attorney."
								})
							]
						})
					]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "faq",
			className: "bg-white py-16 md:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "eyebrow",
							children: "Questions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-3xl font-bold text-navy-600 md:text-4xl",
							style: { fontFamily: "var(--font-serif)" },
							children: "Frequently asked"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 space-y-3",
						children: faqItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQItem, {
							q: item.q,
							a: item.a
						}, item.q))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/faq",
							className: "btn-outline",
							children: ["See all questions ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 16 })]
						})
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			style: { background: "linear-gradient(135deg, #1a2b4a 0%, #15223c 100%)" },
			className: "py-16 md:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-bold text-white md:text-4xl",
						style: { fontFamily: "var(--font-serif)" },
						children: "Ready to send your correspondence?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-4 max-w-lg text-white/60",
						children: "Start a guided workflow, review your draft, and mail it — all in one place."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/workflows/respond-to-notice",
						className: "btn-gold mt-8 text-base",
						children: ["Start now ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 18 })]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
	] });
}
function FAQItem({ q, a }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: "flex w-full items-center justify-between p-5 text-left",
			onClick: () => setOpen(!open),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-semibold text-navy-600",
				children: q
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
				size: 18,
				className: `shrink-0 text-navy-400 transition-transform ${open ? "rotate-180" : ""}`
			})]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-5 pb-5 text-sm leading-6 text-navy-400",
			children: a
		})]
	});
}
//#endregion
export { HomePage as component };
