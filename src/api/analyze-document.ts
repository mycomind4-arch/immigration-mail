/**
 * Server-side document analysis function.
 *
 * Calls an LLM API (OpenAI-compatible) to analyze extracted document text
 * and return structured immigration document analysis.
 *
 * Requires OPENAI_API_KEY environment variable.
 * Uses gpt-4o for analysis (supports large context, structured output).
 */
import { createServerFn } from "@tanstack/react-start";
import { ANALYSIS_SYSTEM_PROMPT, type DocumentAnalysis, emptyAnalysis } from "../lib/document-analysis";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o";
const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";

export interface AnalyzeDocumentInput {
  /** Raw text extracted from the document (OCR or PDF text extraction) */
  text: string;
  /** Optional: user-provided context (what they think the document is) */
  userContext?: string;
}

export interface AnalyzeDocumentOutput {
  analysis: DocumentAnalysis;
  error: string | null;
}

export const analyzeDocument = createServerFn(
  "POST",
  async (input: AnalyzeDocumentInput): Promise<AnalyzeDocumentOutput> => {
    if (!OPENAI_API_KEY) {
      return {
        analysis: emptyAnalysis,
        error: "Document analysis is not configured. An OPENAI_API_KEY is required on the server.",
      };
    }

    if (!input.text || input.text.trim().length < 10) {
      return {
        analysis: emptyAnalysis,
        error: "Not enough text was extracted from the document to analyze. Please try a clearer scan or higher-quality upload.",
      };
    }

    const userPrompt = input.userContext
      ? `The user provided this context: "${input.userContext}"\n\nHere is the text extracted from the document:\n\n---\n${input.text}\n---`
      : `Here is the text extracted from the document:\n\n---\n${input.text}\n---`;

    try {
      const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: OPENAI_MODEL,
          messages: [
            { role: "system", content: ANALYSIS_SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.1,
          max_tokens: 4096,
          response_format: { type: "json_object" },
        }),
      });

      if (!response.ok) {
        const errText = await response.text().catch(() => "Unknown error");
        console.error("OpenAI API error:", response.status, errText);
        return {
          analysis: emptyAnalysis,
          error: `The analysis service returned an error (${response.status}). Please try again.`,
        };
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        return {
          analysis: emptyAnalysis,
          error: "The analysis service returned an empty response. Please try again.",
        };
      }

      // Parse the JSON response
      let parsed: DocumentAnalysis;
      try {
        parsed = JSON.parse(content);
      } catch {
        // Try to extract JSON from the response if it's wrapped in markdown
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsed = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("Could not parse analysis response as JSON");
        }
      }

      // Validate and fill in defaults
      const analysis: DocumentAnalysis = {
        ...emptyAnalysis,
        ...parsed,
        extracted_dates: parsed.extracted_dates ?? [],
        requested_actions: parsed.requested_actions ?? [],
        referenced_forms: parsed.referenced_forms ?? [],
        warnings: parsed.warnings ?? [],
        what_to_do: parsed.what_to_do ?? [],
        documents_to_verify: parsed.documents_to_verify ?? [],
        uncertainty_flags: parsed.uncertainty_flags ?? [],
      };

      return { analysis, error: null };
    } catch (err) {
      console.error("Document analysis failed:", err);
      return {
        analysis: emptyAnalysis,
        error: "Document analysis failed. Please try again or upload a clearer document.",
      };
    }
  }
);
