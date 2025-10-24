import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { supabase, getProjects, getInquiries, createProject, updateProject, deleteProject, createInquiry, updateInquiry, deleteInquiry, Project, Inquiry } from '../lib/supabase';

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
  align-items: center;
`;

const StatusSelect = styled.select`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.sm};
  padding: 0.5rem;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  margin-right: 0.5rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  option {
    background: ${props => props.theme.colors.background};
    color: white;
  }
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

const LoginForm = styled.div`
  max-width: 400px;
  margin: 0 auto;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
`;

const LoginTitle = styled.h2`
  color: white;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  color: white;
  font-size: 1rem;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const LoginButton = styled.button`
  width: 100%;
  background: ${props => props.theme.colors.gradient};
  color: white;
  padding: 0.75rem 1rem;
  border-radius: ${props => props.theme.borderRadius.md};
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const ModalTitle = styled.h2`
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.surfaceLight};
    color: white;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
`;

const ModalInput = styled.input`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 0.75rem 1rem;
  color: white;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const TextArea = styled.textarea`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 0.75rem 1rem;
  color: white;
  font-size: 0.9rem;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const Select = styled.select`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 0.75rem 1rem;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  option {
    background: ${props => props.theme.colors.background};
    color: white;
  }
`;

const SubmitButton = styled.button`
  background: ${props => props.theme.colors.gradient};
  color: white;
  padding: 1rem 2rem;
  border-radius: ${props => props.theme.borderRadius.md};
  border: none;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const AdminPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'inquiries'>('projects');
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    client: '',
    status: 'active' as const,
    start_date: '',
    end_date: '',
    tech_stack: [] as string[],
    achievements: [] as string[],
    icon: '',
    category: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Supabase를 통한 인증
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', loginData.username)
        .eq('password', loginData.password)
        .single();

      if (error || !data) {
        alert('잘못된 로그인 정보입니다.');
        return;
      }

      setIsLoggedIn(true);
      // 데이터 로드
      await loadData();
    } catch (error) {
      console.error('Login error:', error);
      alert('로그인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [projectsData, inquiriesData] = await Promise.all([
        getProjects(),
        getInquiries()
      ]);
      setProjects(projectsData);
      setInquiries(inquiriesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (window.confirm('정말로 이 프로젝트를 삭제하시겠습니까?')) {
      const success = await deleteProject(id);
      if (success) {
        setProjects(projects.filter(p => p.id !== id));
      } else {
        alert('프로젝트 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const handleDeleteInquiry = async (id: number) => {
    if (window.confirm('정말로 이 문의사항을 삭제하시겠습니까?')) {
      const success = await deleteInquiry(id);
      if (success) {
        setInquiries(inquiries.filter(i => i.id !== id));
      } else {
        alert('문의사항 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await updateInquiry(id, { status: newStatus as any });
      setInquiries(inquiries.map(inquiry => 
        inquiry.id === id ? { ...inquiry, status: newStatus as any } : inquiry
      ));
    } catch (error) {
      console.error('Error updating inquiry status:', error);
      alert('상태 변경 중 오류가 발생했습니다.');
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const projectData = {
        ...newProject,
        tech_stack: newProject.tech_stack,
        achievements: newProject.achievements
      };
      
      const createdProject = await createProject(projectData);
      if (createdProject) {
        setProjects([createdProject, ...projects]);
        setShowAddProject(false);
        setNewProject({
          title: '',
          description: '',
          client: '',
          status: 'active',
          start_date: '',
          end_date: '',
          tech_stack: [],
          achievements: [],
          icon: '',
          category: ''
        });
        alert('프로젝트가 성공적으로 추가되었습니다.');
      }
    } catch (error) {
      console.error('Error adding project:', error);
      alert('프로젝트 추가 중 오류가 발생했습니다.');
    }
  };

  const handleProjectInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTechStackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const techStack = e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech);
    setNewProject(prev => ({
      ...prev,
      tech_stack: techStack
    }));
  };

  const handleAchievementsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const achievements = e.target.value.split(',').map(achievement => achievement.trim()).filter(achievement => achievement);
    setNewProject(prev => ({
      ...prev,
      achievements: achievements
    }));
  };

  if (!isLoggedIn) {
    return (
      <AdminContainer>
        <Container>
          <LoginForm>
            <LoginTitle>관리자 로그인</LoginTitle>
            <form onSubmit={handleLogin}>
              <Input
                type="text"
                placeholder="사용자명"
                value={loginData.username}
                onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                required
              />
              <Input
                type="password"
                placeholder="비밀번호"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                required
              />
              <LoginButton type="submit" disabled={loading}>
                {loading ? '로그인 중...' : '로그인'}
              </LoginButton>
            </form>
            <div style={{ marginTop: '1rem', textAlign: 'center', color: '#a1a1aa', fontSize: '0.9rem' }}>
              테스트 계정: admin / admin123
            </div>
          </LoginForm>
        </Container>
      </AdminContainer>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

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
              <AddButton onClick={() => setShowAddProject(true)}>새 프로젝트 추가</AddButton>
              <ProjectGrid>
                {projects.map((project) => (
                  <ProjectCard key={project.id}>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectMeta>
                      <ProjectStatus $status={project.status}>
                        {project.status === 'active' ? '진행중' : 
                         project.status === 'completed' ? '완료' : '대기'}
                      </ProjectStatus>
                      <ProjectDate>{formatDate(project.start_date)} - {project.end_date ? formatDate(project.end_date) : '진행중'}</ProjectDate>
                    </ProjectMeta>
                    <ProjectDescription>{project.description}</ProjectDescription>
                    <ProjectActions>
                      <ActionButton $variant="primary">수정</ActionButton>
                      <ActionButton $variant="secondary">상세</ActionButton>
                      <ActionButton $variant="danger" onClick={() => handleDeleteProject(project.id)}>삭제</ActionButton>
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
                      <InquiryDate>{formatDate(inquiry.created_at)}</InquiryDate>
                    </InquiryHeader>
                    <InquiryContent>
                      <InquiryField>
                        <FieldLabel>연락처:</FieldLabel>
                        <FieldValue>{inquiry.phone} ({inquiry.email})</FieldValue>
                      </InquiryField>
                      {inquiry.project_type && (
                        <InquiryField>
                          <FieldLabel>프로젝트 유형:</FieldLabel>
                          <FieldValue>{inquiry.project_type}</FieldValue>
                        </InquiryField>
                      )}
                      {inquiry.budget && (
                        <InquiryField>
                          <FieldLabel>예상 예산:</FieldLabel>
                          <FieldValue>{inquiry.budget}</FieldValue>
                        </InquiryField>
                      )}
                      {inquiry.timeline && (
                        <InquiryField>
                          <FieldLabel>프로젝트 일정:</FieldLabel>
                          <FieldValue>{inquiry.timeline}</FieldValue>
                        </InquiryField>
                      )}
                      <InquiryField>
                        <FieldLabel>문의 내용:</FieldLabel>
                        <FieldValue>{inquiry.message}</FieldValue>
                      </InquiryField>
                      <InquiryField>
                        <FieldLabel>개인정보 동의:</FieldLabel>
                        <FieldValue>{inquiry.privacy_agreement ? '동의' : '미동의'}</FieldValue>
                      </InquiryField>
                      <InquiryField>
                        <FieldLabel>현재 상태:</FieldLabel>
                        <FieldValue>{inquiry.status}</FieldValue>
                      </InquiryField>
                    </InquiryContent>
                    <InquiryActions>
                      <StatusSelect 
                        value={inquiry.status} 
                        onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                      >
                        <option value="new">컨택전</option>
                        <option value="contacted">컨택중</option>
                        <option value="in_progress">프로젝트 진행</option>
                        <option value="completed">프로젝트 불가</option>
                      </StatusSelect>
                      <ActionButton $variant="secondary">상세보기</ActionButton>
                      <ActionButton $variant="danger" onClick={() => handleDeleteInquiry(inquiry.id)}>삭제</ActionButton>
                    </InquiryActions>
                  </InquiryItem>
                ))}
              </InquiryList>
            </div>
          )}
        </ContentArea>
      </Container>

      {showAddProject && (
        <ModalOverlay onClick={() => setShowAddProject(false)}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>새 프로젝트 추가</ModalTitle>
              <CloseButton onClick={() => setShowAddProject(false)}>×</CloseButton>
            </ModalHeader>
            
            <Form onSubmit={handleAddProject}>
              <FormRow>
                <FormGroup>
                  <Label>프로젝트 제목 *</Label>
                  <ModalInput
                    type="text"
                    name="title"
                    value={newProject.title}
                    onChange={handleProjectInputChange}
                    placeholder="프로젝트 제목을 입력하세요"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>클라이언트 *</Label>
                  <ModalInput
                    type="text"
                    name="client"
                    value={newProject.client}
                    onChange={handleProjectInputChange}
                    placeholder="클라이언트명을 입력하세요"
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label>프로젝트 설명 *</Label>
                <TextArea
                  name="description"
                  value={newProject.description}
                  onChange={handleProjectInputChange}
                  placeholder="프로젝트에 대한 상세 설명을 입력하세요"
                  required
                />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label>시작일 *</Label>
                  <ModalInput
                    type="date"
                    name="start_date"
                    value={newProject.start_date}
                    onChange={handleProjectInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>종료일</Label>
                  <ModalInput
                    type="date"
                    name="end_date"
                    value={newProject.end_date}
                    onChange={handleProjectInputChange}
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>상태 *</Label>
                  <Select
                    name="status"
                    value={newProject.status}
                    onChange={handleProjectInputChange}
                    required
                  >
                    <option value="active">진행중</option>
                    <option value="completed">완료</option>
                    <option value="pending">대기</option>
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label>카테고리</Label>
                  <ModalInput
                    type="text"
                    name="category"
                    value={newProject.category}
                    onChange={handleProjectInputChange}
                    placeholder="예: 웹 개발, 모바일 앱, 시스템 구축"
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>아이콘</Label>
                  <ModalInput
                    type="text"
                    name="icon"
                    value={newProject.icon}
                    onChange={handleProjectInputChange}
                    placeholder="예: 📊, 🚀, 💻"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>기술 스택 (쉼표로 구분)</Label>
                  <ModalInput
                    type="text"
                    value={newProject.tech_stack.join(', ')}
                    onChange={handleTechStackChange}
                    placeholder="예: React, Node.js, MongoDB"
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label>주요 성과 (쉼표로 구분)</Label>
                <ModalInput
                  type="text"
                  value={newProject.achievements.join(', ')}
                  onChange={handleAchievementsChange}
                  placeholder="예: 성능 50% 향상, 사용자 만족도 95% 달성"
                />
              </FormGroup>

              <SubmitButton type="submit">
                프로젝트 추가
              </SubmitButton>
            </Form>
          </ModalContainer>
        </ModalOverlay>
      )}
    </AdminContainer>
  );
};

export default AdminPage;
