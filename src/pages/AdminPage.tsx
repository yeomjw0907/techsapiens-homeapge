import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AdminContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  padding-top: 80px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  background: ${props => props.theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.1rem;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 1rem 2rem;
  background: ${props => props.$active ? props.theme.colors.gradient : 'transparent'};
  color: ${props => props.$active ? 'white' : props.theme.colors.textSecondary};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md} ${props => props.theme.borderRadius.md} 0 0;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$active ? props.theme.colors.gradient : props.theme.colors.surfaceLight};
  }
`;

const ContentArea = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  min-height: 500px;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ProjectCard = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const ProjectTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ProjectMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ProjectStatus = styled.span<{ $status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 500;
  background: ${props => {
    switch (props.$status) {
      case 'active': return 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      case 'completed': return 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
      case 'pending': return 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
      default: return props.theme.colors.surfaceLight;
    }
  }};
  color: white;
`;

const ProjectDate = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const ProjectActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button<{ $variant: 'primary' | 'secondary' | 'danger' }>`
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;

  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background: ${props.theme.colors.gradient};
          color: white;
        `;
      case 'secondary':
        return `
          background: transparent;
          color: ${props.theme.colors.textSecondary};
          border: 1px solid ${props.theme.colors.border};
        `;
      case 'danger':
        return `
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
        `;
    }
  }}

  &:hover {
    transform: translateY(-1px);
  }
`;

const InquiryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InquiryItem = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const InquiryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const InquiryTitle = styled.h4`
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
`;

const InquiryDate = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const InquiryContent = styled.div`
  margin-bottom: 1rem;
`;

const InquiryField = styled.div`
  margin-bottom: 0.5rem;
`;

const FieldLabel = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 500;
  margin-right: 0.5rem;
`;

const FieldValue = styled.span`
  color: white;
`;

const InquiryActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const AddButton = styled.button`
  background: ${props => props.theme.colors.gradient};
  color: white;
  padding: 1rem 2rem;
  border-radius: ${props => props.theme.borderRadius.md};
  border: none;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'inquiries'>('projects');

  // 샘플 데이터
  const projects = [
    {
      id: 1,
      title: '대형 유통사 통합 ERP 시스템 구축',
      status: 'active',
      date: '2024.01 - 2024.08',
      description: '선사 사원리를 위한 한 ERP 시스설계 구축 시 내이너 마이그레이션 및 통합.',
      client: 'A유통그룹'
    },
    {
      id: 2,
      title: '금융권 클라우드 인프라 구축 및 운영',
      status: 'completed',
      date: '2023.06 -',
      description: 'AWS 기반 고사성어라 구축 및 24/7 어린 시비스 시공.',
      client: 'B금융지주'
    },
    {
      id: 3,
      title: '제조사 스마트팩토리 웹 플랫폼 개발',
      status: 'pending',
      date: '2023.09 - 2024.03',
      description: '실시간 생산 현황 모니터링 및 설비 관리를 위한 길 기반 플랫폼 개발.',
      client: 'C제조사'
    }
  ];

  const inquiries = [
    {
      id: 1,
      name: '김철수',
      company: 'D기업',
      email: 'kim@dcompany.com',
      phone: '010-1234-5678',
      projectType: '웹 개발',
      budget: '5,000만원',
      description: '회사 홈페이지 리뉴얼 프로젝트를 진행하고 싶습니다.',
      date: '2024-01-15'
    },
    {
      id: 2,
      name: '이영희',
      company: 'E스타트업',
      email: 'lee@estartup.com',
      phone: '010-9876-5432',
      projectType: '모바일 앱',
      budget: '3,000만원',
      description: 'iOS/Android 앱 개발 프로젝트 문의드립니다.',
      date: '2024-01-14'
    }
  ];

  return (
    <AdminContainer>
      <Container>
        <Header>
          <Title>관리자 페이지</Title>
          <Subtitle>포트폴리오 관리 및 문의사항 접수</Subtitle>
        </Header>

        <TabsContainer>
          <Tab 
            $active={activeTab === 'projects'} 
            onClick={() => setActiveTab('projects')}
          >
            프로젝트 관리
          </Tab>
          <Tab 
            $active={activeTab === 'inquiries'} 
            onClick={() => setActiveTab('inquiries')}
          >
            문의사항 관리
          </Tab>
        </TabsContainer>

        <ContentArea>
          {activeTab === 'projects' && (
            <div>
              <AddButton>새 프로젝트 추가</AddButton>
              <ProjectGrid>
                {projects.map((project) => (
                  <ProjectCard key={project.id}>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectMeta>
                      <ProjectStatus $status={project.status}>
                        {project.status === 'active' ? '진행중' : 
                         project.status === 'completed' ? '완료' : '대기'}
                      </ProjectStatus>
                      <ProjectDate>{project.date}</ProjectDate>
                    </ProjectMeta>
                    <ProjectDescription>{project.description}</ProjectDescription>
                    <ProjectActions>
                      <ActionButton $variant="primary">수정</ActionButton>
                      <ActionButton $variant="secondary">상세</ActionButton>
                      <ActionButton $variant="danger">삭제</ActionButton>
                    </ProjectActions>
                  </ProjectCard>
                ))}
              </ProjectGrid>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div>
              <InquiryList>
                {inquiries.map((inquiry) => (
                  <InquiryItem key={inquiry.id}>
                    <InquiryHeader>
                      <InquiryTitle>{inquiry.company} - {inquiry.name}</InquiryTitle>
                      <InquiryDate>{inquiry.date}</InquiryDate>
                    </InquiryHeader>
                    <InquiryContent>
                      <InquiryField>
                        <FieldLabel>연락처:</FieldLabel>
                        <FieldValue>{inquiry.phone} ({inquiry.email})</FieldValue>
                      </InquiryField>
                      <InquiryField>
                        <FieldLabel>프로젝트 유형:</FieldLabel>
                        <FieldValue>{inquiry.projectType}</FieldValue>
                      </InquiryField>
                      <InquiryField>
                        <FieldLabel>예산:</FieldLabel>
                        <FieldValue>{inquiry.budget}</FieldValue>
                      </InquiryField>
                      <InquiryField>
                        <FieldLabel>문의 내용:</FieldLabel>
                        <FieldValue>{inquiry.description}</FieldValue>
                      </InquiryField>
                    </InquiryContent>
                    <InquiryActions>
                      <ActionButton $variant="primary">답변하기</ActionButton>
                      <ActionButton $variant="secondary">상세보기</ActionButton>
                      <ActionButton $variant="danger">삭제</ActionButton>
                    </InquiryActions>
                  </InquiryItem>
                ))}
              </InquiryList>
            </div>
          )}
        </ContentArea>
      </Container>
    </AdminContainer>
  );
};

export default AdminPage;
