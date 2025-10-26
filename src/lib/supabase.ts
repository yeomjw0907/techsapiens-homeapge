import { createClient } from '@supabase/supabase-js';

// Supabase 설정
const supabaseUrl = 'https://capkjlkptwrvdyesqtoy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhcGtqbGtwdHdydmR5ZXNxdG95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyODI3MzYsImV4cCI6MjA3Njg1ODczNn0.NHkg3cCymLpJLEWjm0ETm1OdeoDkEO9S2M8coi02kjc';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Supabase 연결 테스트 함수
export const testSupabaseConnection = async (): Promise<boolean> => {
  try {
    console.log('Testing Supabase connection...');
    const { data, error } = await supabase
      .from('inquiries')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection test failed:', error);
      return false;
    }
    
    console.log('Supabase connection test successful');
    return true;
  } catch (error) {
    console.error('Supabase connection test error:', error);
    return false;
  }
};

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
  thumbnail_url?: string;
  category?: string;
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  message?: string; // 기존 문의사항 (선택사항)
  project_type?: string; // 프로젝트 유형
  budget?: string; // 예산
  timeline?: string; // 완료 기간
  features?: string[]; // 주요 기능들
  privacy_agreement?: boolean; // 개인정보 처리방침 동의
  admin_memo?: string; // 관리자 메모
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'rejected';
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
  try {
    console.log('Attempting to create inquiry:', inquiry);
    
    // 먼저 연결 테스트
    const isConnected = await testSupabaseConnection();
    if (!isConnected) {
      throw new Error('데이터베이스 연결에 실패했습니다. 네트워크 연결을 확인해주세요.');
    }
    
    const { data, error } = await supabase
      .from('inquiries')
      .insert([inquiry])
      .select()
      .single();

    if (error) {
      console.error('Supabase error creating inquiry:', error);
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw new Error(`데이터베이스 오류: ${error.message}`);
    }

    console.log('Inquiry created successfully:', data);
    return data;
  } catch (error) {
    console.error('Error creating inquiry:', error);
    throw error;
  }
};

// 인터뷰 데이터를 저장하는 함수
export const createInterviewInquiry = async (interviewData: {
  projectType: string;
  budget: string;
  timeline: string;
  features: string[];
}, contactData: {
  name: string;
  company: string;
  email: string;
  phone: string;
  privacyAgreement: boolean;
}): Promise<Inquiry | null> => {
  try {
    console.log('Creating interview inquiry with data:', { interviewData, contactData });
    
    const inquiryData = {
      name: contactData.name,
      company: contactData.company,
      email: contactData.email,
      phone: contactData.phone,
      project_type: interviewData.projectType,
      budget: interviewData.budget,
      timeline: interviewData.timeline,
      privacy_agreement: contactData.privacyAgreement,
      status: 'new' as const,
      message: `프로젝트 유형: ${interviewData.projectType}\n예산: ${interviewData.budget}\n완료 기간: ${interviewData.timeline}\n주요 기능: ${interviewData.features.join(', ')}`
    };

    const result = await createInquiry(inquiryData);
    console.log('Interview inquiry created successfully:', result);
    return result;
  } catch (error) {
    console.error('Error creating interview inquiry:', error);
    throw error;
  }
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
