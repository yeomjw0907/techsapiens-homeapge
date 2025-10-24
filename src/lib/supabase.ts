import { createClient } from '@supabase/supabase-js';

// Supabase 설정
const supabaseUrl = 'https://capkjlkptwrvdyesqtoy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhcGtqbGtwdHdydmR5ZXNxdG95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyODI3MzYsImV4cCI6MjA3Njg1ODczNn0.NHkg3cCymLpJLEWjm0ETm1OdeoDkEO9S2M8coi02kjc';

export const supabase = createClient(supabaseUrl, supabaseKey);

// 데이터베이스 타입 정의
export interface Project {
  id: number;
  title: string;
  description: string;
  client: string;
  status: 'active' | 'completed' | 'pending';
  start_date: string;
  end_date?: string;
  tech_stack: string[];
  achievements: string[];
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  project_type: string;
  budget: string;
  description: string;
  status: 'new' | 'contacted' | 'in_progress' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

// 프로젝트 관련 함수들
export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data || [];
};

export const createProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project | null> => {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single();

  if (error) {
    console.error('Error creating project:', error);
    return null;
  }

  return data;
};

export const updateProject = async (id: number, updates: Partial<Project>): Promise<Project | null> => {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating project:', error);
    return null;
  }

  return data;
};

export const deleteProject = async (id: number): Promise<boolean> => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting project:', error);
    return false;
  }

  return true;
};

// 문의사항 관련 함수들
export const getInquiries = async (): Promise<Inquiry[]> => {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching inquiries:', error);
    return [];
  }

  return data || [];
};

export const createInquiry = async (inquiry: Omit<Inquiry, 'id' | 'created_at' | 'updated_at'>): Promise<Inquiry | null> => {
  const { data, error } = await supabase
    .from('inquiries')
    .insert([inquiry])
    .select()
    .single();

  if (error) {
    console.error('Error creating inquiry:', error);
    return null;
  }

  return data;
};

export const updateInquiry = async (id: number, updates: Partial<Inquiry>): Promise<Inquiry | null> => {
  const { data, error } = await supabase
    .from('inquiries')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating inquiry:', error);
    return null;
  }

  return data;
};

export const deleteInquiry = async (id: number): Promise<boolean> => {
  const { error } = await supabase
    .from('inquiries')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting inquiry:', error);
    return false;
  }

  return true;
};

// 관리자 인증 함수들
export const authenticateAdmin = async (username: string, password: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('username', username)
    .eq('password', password) // 실제로는 해시된 비밀번호 사용
    .single();

  if (error) {
    console.error('Error authenticating admin:', error);
    return false;
  }

  return !!data;
};
