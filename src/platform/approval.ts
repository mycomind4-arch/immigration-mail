/**
 * Immigration Mail approval helpers.
 *
 * Re-exports the shared approval contract from @mailmypdf/payment-fulfillment.
 * The sha256, hashDraft, and hashRecipient functions are now centralized
 * in the platform package so every vertical uses the same canonicalization.
 */

export {
  sha256,
  hashDraft,
  hashRecipient,
  verifyIntegrity,
  type MailingIntent,
  type MailingRecipient,
} from "@mailmypdf/payment-fulfillment";
