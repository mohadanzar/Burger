import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL environment variable. Please add it to your .env file.')
}

if (!supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable. Please add it to your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      menu_items: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          category: string
          image_url: string
          available: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          category: string
          image_url: string
          available?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          category?: string
          image_url?: string
          available?: boolean
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          total_amount: number
          status: string
          payment_status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          total_amount: number
          status?: string
          payment_status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          total_amount?: number
          status?: string
          payment_status?: string
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          menu_item_id: string
          quantity: number
          price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          menu_item_id: string
          quantity: number
          price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          menu_item_id?: string
          quantity?: number
          price?: number
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          phone: string
          is_admin: boolean
          created_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          phone?: string
          is_admin?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          phone?: string
          is_admin?: boolean
          created_at?: string
        }
      }
    }
  }
}