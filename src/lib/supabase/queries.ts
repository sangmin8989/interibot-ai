import { createServerComponentClient } from "./client";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

type Client = SupabaseClient<Database>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rpc(supabase: Client, fn: string, params: Record<string, unknown>): Promise<{ data: any; error: any }> {
  // Use type assertion to bypass strict RPC arg typing from auto-generated types
  return (supabase.rpc as any)(fn, params);
}

export async function getProcessBenchmarks() {
  const supabase = createServerComponentClient();
  const { data, error } = await supabase
    .from("v4_process_benchmarks")
    .select("*");
  if (error) throw error;
  return data;
}

export async function getStandardQuantities(area: number) {
  const supabase = createServerComponentClient();
  const { data, error } = await supabase
    .from("v4_standard_quantities")
    .select("*")
    .eq("area_py", area);
  if (error) throw error;
  return data;
}

export async function getKnowledgeBase(query: string, matchCount = 5) {
  const supabase = createServerComponentClient();
  const { data, error } = await rpc(supabase, "match_knowledge_base", {
    query_text: query,
    match_count: matchCount,
  });
  if (error) throw error;
  return data;
}

export async function estimateByAreaV2(params: {
  p_area_py: number;
  p_apartment_type?: string;
  p_scope?: string;
}) {
  const supabase = createServerComponentClient();
  const { data, error } = await rpc(supabase, "estimate_by_area_v2", params);
  if (error) throw error;
  return data;
}

export async function getProcessItemsV2(params: {
  p_process_name: string;
  p_area_py?: number;
}) {
  const supabase = createServerComponentClient();
  const { data, error } = await rpc(supabase, "get_process_items_v2", params);
  if (error) throw error;
  return data;
}

export async function auditGetPercentile(params: {
  p_process_name: string;
  p_amount: number;
  p_area_py: number;
}) {
  const supabase = createServerComponentClient();
  const { data, error } = await rpc(supabase, "audit_get_percentile", params);
  if (error) throw error;
  return data;
}

export async function saveUploadedDocument(doc: {
  session_id?: string;
  document_type: string;
  file_url?: string;
  file_name?: string;
  file_size?: number;
  extracted_data?: Record<string, unknown>;
  apartment_name?: string;
  area_py?: number;
  region?: string;
}) {
  const supabase = createServerComponentClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase.from("uploaded_documents") as any)
    .insert(doc)
    .select()
    .single();
  if (error) throw error;
  return data;
}
