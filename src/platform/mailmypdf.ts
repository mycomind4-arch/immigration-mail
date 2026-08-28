/**
 * Immigration Mail MailMyPDF adapter.
 *
 * Re-exports the shared @mailmypdf/mailing-client package.
 * The actual HTTP client logic lives in the platform package,
 * eliminating per-vertical duplication.
 *
 * Type aliases maintain backward compatibility with existing imports
 * that use the Immigration-specific names.
 */

export {
  uploadDocument,
  uploadDocumentBase64,
  createCommunication,
  getCommunication,
  createMailingClient,
  MailMyPDFPlatformError,
  type MailType,
  type MailMyPDFDocument,
  type MailMyPDFCommunication,
  type MailingRecipient as ImmigrationRecipient,
  type MailingSender as ImmigrationSender,
  type CreateCommunicationInput as CreateImmigrationCommunicationInput,
} from "@mailmypdf/mailing-client";
