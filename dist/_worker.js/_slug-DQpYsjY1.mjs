import { n as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { C as Clock, a as Stamp, b as FileText, c as ShieldCheck, k as ArrowLeft, n as TriangleAlert, p as PackageCheck, w as CircleCheck } from "./_libs/lucide-react.mjs";
import { i as SiteHeader, n as Route$3, r as SiteFooter } from "./_ssr/router-CVx3ZisP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-DQpYsjY1.js
var import_jsx_runtime = require_jsx_runtime();
function GuidePage() {
	const slug = Route$3.useParams().slug;
	const guide = {
		"how-to-respond-to-rfe": {
			title: "How to Respond to a Request for Evidence (RFE)",
			category: "Responding to Notices",
			readTime: "6 min",
			content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RFEContent, {})
		},
		"writing-an-explanation-letter": {
			title: "Writing an Effective Explanation Letter",
			category: "Correspondence Tips",
			readTime: "5 min",
			content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExplanationContent, {})
		},
		"certified-mail-guide": {
			title: "Why Certified Mail Matters for Immigration Correspondence",
			category: "Mailing",
			readTime: "4 min",
			content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CertifiedMailContent, {})
		}
	}[slug];
	if (!guide) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container py-20 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold text-navy-600",
					children: "Guide not found"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/resources",
					className: "btn-outline mt-6",
					children: "Back to resources"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "bg-white py-12 md:py-16 border-b border-warm-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "container max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/resources",
								className: "inline-flex items-center gap-1 text-sm text-navy-400 hover:text-gold-500",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 15 }), " All guides"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex items-center gap-3 text-xs text-navy-400",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-gold-600",
									children: guide.category
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 12 }),
										" ",
										guide.readTime
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-3 text-3xl font-bold text-navy-600 md:text-4xl",
								style: { fontFamily: "var(--font-serif)" },
								children: guide.title
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "py-10 md:py-14",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "container max-w-2xl prose-content",
						children: guide.content
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					style: { background: "linear-gradient(135deg, #1a2b4a 0%, #15223c 100%)" },
					className: "py-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "container max-w-2xl text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-bold text-white",
								style: { fontFamily: "var(--font-serif)" },
								children: "Ready to send your correspondence?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-white/60",
								children: "Start a guided workflow and get your letter in the mail today."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/workflows/respond-to-notice",
								className: "btn-gold mt-6",
								children: "Start now"
							})
						]
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function H2({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "mt-10 text-xl font-bold text-navy-600",
		style: { fontFamily: "var(--font-serif)" },
		children
	});
}
function P({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-4 text-sm leading-7 text-navy-500",
		children
	});
}
function UL({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-4 space-y-2 pl-5 text-sm text-navy-500",
		style: { listStyle: "disc" },
		children
	});
}
function Callout({ children, type = "info" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `mt-6 ${type === "warning" ? "alert alert-warning" : type === "success" ? "alert alert-success" : "alert alert-info"}`,
		children
	});
}
function RFEContent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "A Request for Evidence (RFE) is a notice from USCIS asking for additional documentation or information to process your application or petition. RFEs are common and not necessarily a bad sign — they often mean the adjudicator needs clarification or is missing a specific document." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "What an RFE typically includes" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UL, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The specific evidence or information being requested" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A deadline for your response (typically 30–90 days from the notice date)" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Instructions on where and how to submit your response" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Your receipt number and case information" })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "Step 1: Read the RFE carefully" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Before anything else, read the entire RFE. Note exactly what is being asked for and the deadline. If you're not sure what a specific request means, consider consulting an immigration attorney — Immigration Mail can help you prepare and send the correspondence, but it cannot tell you what evidence to submit." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Callout, {
			type: "warning",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					size: 16,
					className: "inline mr-1"
				}),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Important:" }),
				" Missing an RFE deadline can result in your case being denied. Note the deadline immediately and plan to submit well before it."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "Step 2: Gather your documents" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Collect every document the RFE requests. If you're missing something, prepare an explanation for why it's unavailable and what alternative evidence you're providing instead." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UL, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Make copies of everything — never send original documents unless specifically asked" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Translate any documents not in English and include a certified translation" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Organize documents in the order the RFE lists them" })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "Step 3: Write a cover letter" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "A clear cover letter helps the adjudicator understand what you're submitting and why. Include:" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UL, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Your name and receipt/case number" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The date and reference number from the RFE" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A list of every document enclosed" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A brief response to each item requested" })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"Immigration Mail's ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/workflows/respond-to-notice",
				className: "text-gold-600 font-semibold",
				children: "Respond to a Notice"
			}),
			" workflow guides you through this step by step."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "Step 4: Mail with proof of delivery" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "For immigration correspondence, certified mail is strongly recommended. It provides a USPS tracking number and a delivery record showing the date and (with return receipt) the signature of the recipient." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Callout, {
			type: "success",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageCheck, {
					size: 16,
					className: "inline mr-1"
				}),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Tip:" }),
				" Certified mail with return receipt gives you a signed card back — physical proof that your response was received."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "Step 5: Keep copies of everything" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Retain copies of your cover letter, all enclosed documents, the tracking number, and the return receipt (if applicable). If USCIS claims they didn't receive your response, these records are your proof of timely submission." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Callout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
			size: 16,
			className: "inline mr-1"
		}), " Immigration Mail retains your mailing record automatically — including the tracking number, mail type, and recipient address."] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "Key takeaways" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UL, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Read the RFE carefully and note the deadline" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Gather exactly what's requested, with translations if needed" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Write a clear cover letter listing every enclosure" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Mail certified with return receipt for proof of delivery" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Keep copies of everything" })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, {
			className: "text-xs text-navy-300 mt-8",
			children: "This guide is for informational purposes only and does not constitute legal advice. If you need legal guidance, consult a qualified immigration attorney."
		})
	] });
}
function ExplanationContent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "An explanation letter accompanies your application or response to clarify circumstances that may raise questions — a gap in employment, a name change, a visa overstay explanation, or why certain evidence is unavailable." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "What an explanation letter should do" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UL, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "State the facts clearly and chronologically" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Explain what happened and why" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Reference supporting documents where applicable" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Maintain a professional, respectful tone" })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "What an explanation letter should NOT do" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UL, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Make legal arguments or draw legal conclusions" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Include information you cannot verify" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Speculate about what the adjudicator wants to hear" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Be overly emotional or accusatory" })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Callout, {
			type: "warning",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					size: 16,
					className: "inline mr-1"
				}),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Key principle:" }),
				" Stick to facts you can prove. The letter should inform, not advocate. If your situation requires legal strategy, consult an attorney."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "Structure of an effective letter" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UL, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Header:" }), " Your name, case/receipt number, date, and \"Re:\" line referencing the relevant application or notice"] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Opening:" }), " State the purpose of the letter in one sentence"] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Body:" }), " Present the relevant facts chronologically, with clear dates and context"] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Reference:" }), " Mention enclosed supporting documents by name"] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Closing:" }), " Thank the reader for their consideration and offer to provide additional information if needed"] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "Common situations where an explanation letter helps" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UL, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Explaining a gap in employment or education" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Clarifying a name discrepancy across documents" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Explaining why a specific document is unavailable" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Providing context for a visa overstay or status violation" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Clarifying the nature of a relationship for family-based petitions" })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "How Immigration Mail helps" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"Immigration Mail's ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/workflows/explanation-letter",
				className: "text-gold-600 font-semibold",
				children: "Explanation Letter workflow"
			}),
			" guides you through providing your facts and objective, then generates an editable draft. You review every word before it's mailed."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Callout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
			size: 16,
			className: "inline mr-1"
		}), " The AI assistant organizes your input — it never invents facts, deadlines, or legal conclusions. Everything is editable."] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, {
			className: "text-xs text-navy-300 mt-8",
			children: "This guide is for informational purposes only and does not constitute legal advice."
		})
	] });
}
function CertifiedMailContent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "When you send immigration correspondence — whether responding to an RFE, submitting supporting documents, or sending an explanation letter — proof that your letter arrived can be just as important as the letter itself." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "What is certified mail?" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Certified Mail is a USPS service that provides a tracking number and a delivery record. The sender receives confirmation that the item was delivered, including the date of delivery. With the return receipt option, you also receive a signed card confirming who accepted the delivery." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "Why it matters for immigration correspondence" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UL, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Proof of timely submission:" }), " If USCIS or another agency claims they didn't receive your response, your certified mail receipt proves otherwise"] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Delivery date confirmation:" }), " The USPS delivery record shows exactly when your letter arrived"] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Signature proof:" }), " With return receipt, you have a physical card showing who signed for the delivery"] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Callout, {
			type: "warning",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					size: 16,
					className: "inline mr-1"
				}),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Don't rely on first-class mail alone" }),
				" for deadline-sensitive immigration correspondence. While first-class includes tracking, it doesn't provide signature proof or a delivery record."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "Comparing mail types" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm border border-warm-border rounded-lg overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-navy-50 text-left text-xs font-semibold text-navy-400",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3",
							children: "Feature"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3",
							children: "First-Class"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3",
							children: "Certified"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3",
							children: "Certified + RR"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
					className: "divide-y divide-warm-border text-navy-500",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-semibold",
								children: "Tracking number"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									size: 14,
									className: "text-emerald-500"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									size: 14,
									className: "text-emerald-500"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									size: 14,
									className: "text-emerald-500"
								})
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-semibold",
								children: "Delivery record"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-navy-300",
								children: "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									size: 14,
									className: "text-emerald-500"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									size: 14,
									className: "text-emerald-500"
								})
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-semibold",
								children: "Signature proof"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-navy-300",
								children: "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-navy-300",
								children: "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									size: 14,
									className: "text-emerald-500"
								})
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-semibold",
								children: "Signed return card"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-navy-300",
								children: "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-navy-300",
								children: "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									size: 14,
									className: "text-emerald-500"
								})
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-semibold",
								children: "Price"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: "$3.99"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: "$8.99"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: "$12.99"
							})
						] })
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "Our recommendation" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "For most immigration correspondence — especially responses to RFEs, NOIDs, or other notices with deadlines — we recommend Certified Mail with Return Receipt ($12.99). The signed return card is your strongest proof that your response was received by the agency." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Callout, {
			type: "success",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stamp, {
					size: 16,
					className: "inline mr-1"
				}),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Immigration Mail handles everything:" }),
				" printing, envelope, postage, tracking, and return receipt — all in one step. No printer or post office visit required."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, {
			className: "text-xs text-navy-300 mt-8",
			children: "This guide is for informational purposes only and does not constitute legal advice."
		})
	] });
}
//#endregion
export { GuidePage as component };
