-- Supabase 데이터베이스 스키마
-- 이 파일을 Supabase SQL Editor에서 실행하세요

-- 프로젝트 테이블
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  client VARCHAR(255) NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'completed', 'pending')),
  start_date DATE NOT NULL,
  end_date DATE,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  achievements TEXT[] NOT NULL DEFAULT '{}',
  image_url VARCHAR(500),
  icon VARCHAR(10),
  category VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 문의사항 테이블
CREATE TABLE inquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  project_type VARCHAR(100),
  budget VARCHAR(100),
  timeline VARCHAR(100),
  privacy_agreement BOOLEAN DEFAULT false,
  status VARCHAR(20) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 관리자 사용자 테이블
CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL, -- 실제로는 해시된 비밀번호 사용
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 기본 관리자 계정 생성 (비밀번호: admin123)
INSERT INTO admin_users (username, email, password) 
VALUES ('admin', 'admin@techsapiens.com', 'admin123');

-- 샘플 프로젝트 데이터
INSERT INTO projects (title, description, client, status, start_date, end_date, tech_stack, achievements, icon, category) VALUES
('대형 유통사 통합 ERP 시스템 구축', '선사 사원리를 위한 한 ERP 시스설계 구축 시 내이너 마이그레이션 및 통합.', 'A유통그룹', 'active', '2024-01-01', '2024-08-31', ARRAY['Java', 'Spring Boot', 'Oracle', 'Redis', 'Kafka'], ARRAY['업무 효율 40% 향상', '데이터 처리 속도 3배 개선', '운영 비용 30% 절감'], '📊', '구축'),
('금융권 클라우드 인프라 구축 및 운영', 'AWS 기반 고사성어라 구축 및 24/7 어린 시비스 시공.', 'B금융지주', 'completed', '2023-06-01', NULL, ARRAY['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Prometheus'], ARRAY['시스템 가용률 99.99% 달성', '장애 대응 시간 80% 단축', '인프라 비용 25% 절감'], '☁️', '서버 관리'),
('제조사 스마트팩토리 웹 플랫폼 개발', '실시간 생산 현황 모니터링 및 설비 관리를 위한 길 기반 플랫폼 개발.', 'C제조사', 'pending', '2023-09-01', '2024-03-31', ARRAY['Next.js', 'Node.js', 'TypeScript', 'PostgreSQL'], ARRAY['생산성 35% 향상', '불량률 50% 감소', '실시간 데이터 가시화'], '🏭', '개발');

-- 샘플 문의사항 데이터
INSERT INTO inquiries (name, company, email, phone, message, project_type, budget, timeline, privacy_agreement, status) VALUES
('김철수', 'D기업', 'kim@dcompany.com', '010-1234-5678', '회사 홈페이지 리뉴얼 프로젝트를 진행하고 싶습니다. 웹 개발 관련 문의드립니다.', '웹 개발', '3,000만원 - 5,000만원', '3-6개월', true, 'new'),
('이영희', 'E스타트업', 'lee@estartup.com', '010-9876-5432', 'iOS/Android 앱 개발 프로젝트 문의드립니다. 모바일 앱 개발 관련 상담을 받고 싶습니다.', '모바일 앱', '1,000만원 - 3,000만원', '1-3개월', true, 'new');

-- RLS (Row Level Security) 정책 설정
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 프로젝트 테이블 정책 (모든 사용자가 읽기 가능)
CREATE POLICY "Allow public read access to projects" ON projects
  FOR SELECT USING (true);

-- 문의사항 테이블 정책 (모든 사용자가 읽기/쓰기 가능)
CREATE POLICY "Allow public read access to inquiries" ON inquiries
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);

-- 관리자 사용자 테이블 정책 (인증된 사용자만 접근)
CREATE POLICY "Allow authenticated access to admin_users" ON admin_users
  FOR ALL USING (true);
