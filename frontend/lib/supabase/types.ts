export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          price_in_cents: number;
          currency: string;
          status: 'draft' | 'active' | 'archived';
          stock: number;
          sku: string | null;
          metadata: Json | null;
          category_id: string | null;
          created_at: string;
          updated_at: string;
          media_urls: string[] | null;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          price_in_cents: number;
          currency?: string;
          status?: 'draft' | 'active' | 'archived';
          stock?: number;
          sku?: string | null;
          metadata?: Json | null;
          category_id?: string | null;
          created_at?: string;
          updated_at?: string;
          media_urls?: string[] | null;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          price_in_cents?: number;
          currency?: string;
          status?: 'draft' | 'active' | 'archived';
          stock?: number;
          sku?: string | null;
          metadata?: Json | null;
          category_id?: string | null;
          created_at?: string;
          updated_at?: string;
          media_urls?: string[] | null;
        };
        Relationships: [
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Enums: Record<string, never>;
    Functions: Record<string, never>;
    Views: Record<string, never>;
  };
};

export type ProductRow = Database['public']['Tables']['products']['Row'];
export type CategoryRow = Database['public']['Tables']['categories']['Row'];
