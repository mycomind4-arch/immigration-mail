/**
 * Case management — create, list, and manage immigration cases.
 * Each case is a workspace for documents, correspondence, and mailings.
 */
import { supabase } from "./supabase";
import { useAuth } from "./auth";

export interface Case {
  id: string;
  user_id: string;
  name: string;
  applicant_name?: string;
  petitioner_name?: string;
  receipt_number?: string;
  category?: string;
  agency?: string;
  status: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface MailingOrder {
  id: string;
  case_id?: string;
  user_id: string;
  correspondence_id?: string;
  workflow_id: string;
  recipient_name: string;
  recipient_org?: string;
  recipient_address1: string;
  recipient_address2?: string;
  recipient_city: string;
  recipient_state: string;
  recipient_zip: string;
  mail_method: string;
  price_cents: number;
  status: string;
  tracking_number?: string;
  created_at: string;
  updated_at: string;
}

export interface Correspondence {
  id: string;
  case_id?: string;
  user_id: string;
  workflow_id: string;
  title: string;
  draft_content: string;
  status: string;
  created_at: string;
  updated_at: string;
}

/**
 * Fetch all cases for the current user.
 */
export async function fetchCases(userId: string): Promise<{ data: Case[] | null; error: string | null }> {
  const { data, error } = await supabase
    .from("cases")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) return { data: null, error: error.message };
  return { data: data as Case[], error: null };
}

/**
 * Create a new case.
 */
export async function createCase(
  userId: string,
  caseData: Partial<Case>
): Promise<{ data: Case | null; error: string | null }> {
  const { data, error } = await supabase
    .from("cases")
    .insert({
      user_id: userId,
      name: caseData.name || "Untitled case",
      applicant_name: caseData.applicant_name,
      petitioner_name: caseData.petitioner_name,
      receipt_number: caseData.receipt_number,
      category: caseData.category,
      agency: caseData.agency,
      status: "active",
      notes: caseData.notes,
    })
    .select()
    .single();

  if (error) return { data: null, error: error.message };
  return { data: data as Case, error: null };
}

/**
 * Update a case.
 */
export async function updateCase(
  caseId: string,
  updates: Partial<Case>
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from("cases")
    .update(updates)
    .eq("id", caseId);
  return { error: error?.message ?? null };
}

/**
 * Fetch all mailing orders for the current user.
 */
export async function fetchMailingOrders(userId: string): Promise<{ data: MailingOrder[] | null; error: string | null }> {
  const { data, error } = await supabase
    .from("mailing_orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) return { data: null, error: error.message };
  return { data: data as MailingOrder[], error: null };
}

/**
 * Fetch all correspondence for the current user.
 */
export async function fetchCorrespondence(userId: string): Promise<{ data: Correspondence[] | null; error: string | null }> {
  const { data, error } = await supabase
    .from("case_correspondence")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) return { data: null, error: error.message };
  return { data: data as Correspondence[], error: null };
}

/**
 * Save a correspondence draft to the database.
 */
export async function saveCorrespondence(
  userId: string,
  data: {
    case_id?: string;
    workflow_id: string;
    title: string;
    draft_content: string;
    status?: string;
  }
): Promise<{ data: Correspondence | null; error: string | null }> {
  const { data: result, error } = await supabase
    .from("case_correspondence")
    .insert({
      user_id: userId,
      case_id: data.case_id || null,
      workflow_id: data.workflow_id,
      title: data.title,
      draft_content: data.draft_content,
      status: data.status || "draft",
    })
    .select()
    .single();

  if (error) return { data: null, error: error.message };
  return { data: result as Correspondence, error: null };
}

/**
 * Create a mailing order record (after checkout).
 */
export async function createMailingOrder(
  userId: string,
  data: {
    case_id?: string;
    correspondence_id?: string;
    workflow_id: string;
    recipient_name: string;
    recipient_org?: string;
    recipient_address1: string;
    recipient_address2?: string;
    recipient_city: string;
    recipient_state: string;
    recipient_zip: string;
    mail_method: string;
    price_cents: number;
  }
): Promise<{ data: MailingOrder | null; error: string | null }> {
  const { data: result, error } = await supabase
    .from("mailing_orders")
    .insert({
      user_id: userId,
      case_id: data.case_id || null,
      correspondence_id: data.correspondence_id || null,
      workflow_id: data.workflow_id,
      recipient_name: data.recipient_name,
      recipient_org: data.recipient_org,
      recipient_address1: data.recipient_address1,
      recipient_address2: data.recipient_address2,
      recipient_city: data.recipient_city,
      recipient_state: data.recipient_state,
      recipient_zip: data.recipient_zip,
      mail_method: data.mail_method,
      price_cents: data.price_cents,
      status: "draft",
    })
    .select()
    .single();

  if (error) return { data: null, error: error.message };
  return { data: result as MailingOrder, error: null };
}

/**
 * Format price from cents to dollars.
 */
export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

/**
 * Format mail method for display.
 */
export function formatMailMethod(method: string): string {
  return method.charAt(0).toUpperCase() + method.slice(1);
}

/**
 * Format a date for display.
 */
export function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return iso;
  }
}
