import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Inquiry {
  id: number;
  name: string;
  phone: string;
  message: string | null;
  created_at: string;
  is_read: boolean;
}

export async function createInquiry(name: string, phone: string, message: string): Promise<Inquiry | null> {
  const { data, error } = await supabase
    .from('inquiries')
    .insert([{ name, phone, message }])
    .select()
    .single();

  if (error) {
    console.error('Error creating inquiry:', error);
    throw error;
  }

  return data;
}

export async function getAllInquiries(): Promise<Inquiry[]> {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching inquiries:', error);
    throw error;
  }

  return data || [];
}

export async function markAsRead(id: number): Promise<void> {
  const { error } = await supabase
    .from('inquiries')
    .update({ is_read: true })
    .eq('id', id);

  if (error) {
    console.error('Error marking as read:', error);
    throw error;
  }
}

export async function deleteInquiry(id: number): Promise<void> {
  const { error } = await supabase
    .from('inquiries')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting inquiry:', error);
    throw error;
  }
}
