export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      v4_process_benchmarks: {
        Row: {
          id: number;
          process_name: string;
          area_py: number;
          p25: number;
          p50: number;
          p75: number;
          scope: string | null;
          source: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          process_name: string;
          area_py: number;
          p25: number;
          p50: number;
          p75: number;
          scope?: string | null;
          source?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: number;
          process_name?: string;
          area_py?: number;
          p25?: number;
          p50?: number;
          p75?: number;
          scope?: string | null;
          source?: string | null;
          created_at?: string | null;
        };
      };
      v4_standard_quantities: {
        Row: {
          id: number;
          process_name: string;
          area_py: number;
          item_name: string;
          unit: string | null;
          quantity: number | null;
          source: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          process_name: string;
          area_py: number;
          item_name: string;
          unit?: string | null;
          quantity?: number | null;
          source?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: number;
          process_name?: string;
          area_py?: number;
          item_name?: string;
          unit?: string | null;
          quantity?: number | null;
          source?: string | null;
          created_at?: string | null;
        };
      };
      v4_item_prices: {
        Row: {
          id: number;
          process_name: string;
          item_name: string;
          unit: string | null;
          unit_price: number | null;
          brand: string | null;
          source: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          process_name: string;
          item_name: string;
          unit?: string | null;
          unit_price?: number | null;
          brand?: string | null;
          source?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: number;
          process_name?: string;
          item_name?: string;
          unit?: string | null;
          unit_price?: number | null;
          brand?: string | null;
          source?: string | null;
          created_at?: string | null;
        };
      };
      v4_market_cases: {
        Row: {
          id: number;
          apartment_name: string | null;
          area_py: number | null;
          region: string | null;
          total_amount: number | null;
          process_breakdown: Json | null;
          source: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          apartment_name?: string | null;
          area_py?: number | null;
          region?: string | null;
          total_amount?: number | null;
          process_breakdown?: Json | null;
          source?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: number;
          apartment_name?: string | null;
          area_py?: number | null;
          region?: string | null;
          total_amount?: number | null;
          process_breakdown?: Json | null;
          source?: string | null;
          created_at?: string | null;
        };
      };
      v4_engine_reference: {
        Row: {
          id: number;
          key: string;
          value: Json;
          description: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          key: string;
          value: Json;
          description?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: number;
          key?: string;
          value?: Json;
          description?: string | null;
          created_at?: string | null;
        };
      };
      v4_knowledge_base: {
        Row: {
          id: number;
          content: string;
          metadata: Json | null;
          embedding: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          content: string;
          metadata?: Json | null;
          embedding?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: number;
          content?: string;
          metadata?: Json | null;
          embedding?: string | null;
          created_at?: string | null;
        };
      };
      v4_audit_rules: {
        Row: {
          id: number;
          rule_name: string;
          process_name: string | null;
          condition: Json;
          message: string;
          severity: string;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          rule_name: string;
          process_name?: string | null;
          condition: Json;
          message: string;
          severity: string;
          created_at?: string | null;
        };
        Update: {
          id?: number;
          rule_name?: string;
          process_name?: string | null;
          condition?: Json;
          message?: string;
          severity?: string;
          created_at?: string | null;
        };
      };
      uploaded_documents: {
        Row: {
          id: string;
          session_id: string | null;
          document_type: string;
          file_url: string | null;
          file_name: string | null;
          file_size: number | null;
          extracted_data: Json | null;
          apartment_name: string | null;
          area_py: number | null;
          region: string | null;
          processed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id?: string | null;
          document_type: string;
          file_url?: string | null;
          file_name?: string | null;
          file_size?: number | null;
          extracted_data?: Json | null;
          apartment_name?: string | null;
          area_py?: number | null;
          region?: string | null;
          processed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string | null;
          document_type?: string;
          file_url?: string | null;
          file_name?: string | null;
          file_size?: number | null;
          extracted_data?: Json | null;
          apartment_name?: string | null;
          area_py?: number | null;
          region?: string | null;
          processed?: boolean;
          created_at?: string;
        };
      };
    };
    Functions: {
      estimate_by_area_v2: {
        Args: Record<string, unknown>;
        Returns: Json;
      };
      get_process_items_v2: {
        Args: Record<string, unknown>;
        Returns: Json;
      };
      audit_get_percentile: {
        Args: Record<string, unknown>;
        Returns: Json;
      };
      match_knowledge_base: {
        Args: Record<string, unknown>;
        Returns: Json;
      };
    };
    Views: Record<string, never>;
    Enums: Record<string, never>;
  };
}
