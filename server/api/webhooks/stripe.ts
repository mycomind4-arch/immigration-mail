/**
 * POST /api/webhooks/stripe
 *
 * Stripe webhook handler for Immigration Mail.
 *
 * Uses @mailmypdf/payment-fulfillment's shared fulfillment engine.
 * Fulfillment no longer depends on the browser return path.
 *
 * Security:
 *   - Verifies Stripe signature using STRIPE_WEBHOOK_SECRET
 *   - Idempotent (shared engine handles dedup)
 *   - Verifies approved artifact hashes before mailing
 */

import { createError, defineEventHandler, getRequestHeaders, readBody, type H3Event } from "h3";
import {
  handleStripeWebhookEvent,
  type StripeWebhookEvent,
} from "../../../src/platform/fulfillment-adapter";
import { createSupabaseIntentStore, createMailMyPDFClient } from "../../../src/platform/fulfillment-adapter";

export default defineEventHandler(async (event: H3Event) => {
  if (event.method !== "POST") throw createError({ statusCode: 405, statusMessage: "Method not allowed." });

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret) {
    throw createError({ statusCode: 503, statusMessage: "Stripe webhook is not configured. Set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET." });
  }

  const rawBody = await readBody(event);
  const bodyText = typeof rawBody === "string" ? rawBody : JSON.stringify(rawBody);

  const headers = getRequestHeaders(event);
  const signature = headers["stripe-signature"] || headers["Stripe-Signature"];

  if (!signature) {
    throw createError({ statusCode: 400, statusMessage: "Missing Stripe signature header." });
  }

  const { default: Stripe } = await import("stripe");
  const stripe = new Stripe(secretKey, { apiVersion: "2024-06-20" as Stripe.LatestApiVersion });

  let stripeEvent: Stripe.Event;
  try {
    stripeEvent = await stripe.webhooks.constructEventAsync(bodyText, signature, webhookSecret);
  } catch (err) {
    throw createError({
      statusCode: 400,
      statusMessage: `Webhook signature verification failed: ${err instanceof Error ? err.message : "unknown error"}`,
    });
  }

  // Map Stripe event to our generic interface
  const webhookEvent: StripeWebhookEvent = {
    type: stripeEvent.type,
    data: {
      object: stripeEvent.data.object as Record<string, unknown>,
    } as StripeWebhookEvent["data"]["object"],
  };

  return handleStripeWebhookEvent(webhookEvent, {
    store: createSupabaseIntentStore(),
    client: createMailMyPDFClient(),
    verticalName: "immigration-mail",
    stripeSecretKey: secretKey,
    stripeWebhookSecret: webhookSecret,
  });
});
