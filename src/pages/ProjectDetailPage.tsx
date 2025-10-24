import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { getProjects, Project } from '../lib/supabase';

const ProjectDetailContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  padding-top: 80px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const ProjectHeader = styled.div`
  text-align: center;
  padding: 2rem 0 4rem;
`;

const ProjectTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: ${props => props.theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

const ProjectMeta = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  text-align: center;
`;

const MetaLabel = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const MetaValue = styled.p`
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
`;

const ProjectImage = styled.div`
  height: 400px;
  background: ${props => props.theme.colors.surfaceLight};
  border-radius: ${props => props.theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(99, 102, 241, 0.1) 50%, transparent 70%);
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const ProjectContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const MainContent = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const TechTag = styled.span`
  background: ${props => props.theme.colors.surfaceLight};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 0.9rem;
  font-weight: 500;
`;

const Achievements = styled.div`
  margin-bottom: 2rem;
`;

const AchievementList = styled.ul`
  list-style: none;
`;

const AchievementItem = styled.li`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 0.75rem;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.6;

  &::before {
    content: '✓';
    color: ${props => props.theme.colors.primary};
    position: absolute;
    left: 0;
    font-weight: bold;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InfoCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
`;

const InfoTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const InfoValue = styled.span`
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
`;

const CTAButton = styled(motion.button)`
  background: ${props => props.theme.colors.gradient};
  color: white;
  padding: 1rem 2rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

interface ProjectDetailPageProps {
  onContactClick: () => void;
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ onContactClick }) => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projects = await getProjects();
        const foundProject = projects.find(p => p.id === parseInt(id || '0'));
        setProject(foundProject || null);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching project:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  if (loading) {
    return (
      <ProjectDetailContainer>
        <Container>
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            로딩 중...
          </div>
        </Container>
      </ProjectDetailContainer>
    );
  }

  if (!project) {
    return (
      <ProjectDetailContainer>
        <Container>
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h1>프로젝트를 찾을 수 없습니다</h1>
            <Link to="/projects" style={{ color: '#6366f1', textDecoration: 'none' }}>
              프로젝트 목록으로 돌아가기
            </Link>
          </div>
        </Container>
      </ProjectDetailContainer>
    );
  }

  const handleContactClick = () => {
    onContactClick();
  };

  return (
    <ProjectDetailContainer>
      <Container>
        <BackButton to="/projects">
          ← 프로젝트 목록으로 돌아가기
        </BackButton>

        <ProjectHeader>
          <ProjectTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {project.title}
          </ProjectTitle>
          <ProjectMeta>
            <MetaItem>
              <MetaLabel>클라이언트</MetaLabel>
              <MetaValue>{project.client}</MetaValue>
            </MetaItem>
            <MetaItem>
              <MetaLabel>기간</MetaLabel>
              <MetaValue>{project.start_date} {project.end_date ? `- ${project.end_date}` : ''}</MetaValue>
            </MetaItem>
            <MetaItem>
              <MetaLabel>카테고리</MetaLabel>
              <MetaValue>{project.category}</MetaValue>
            </MetaItem>
          </ProjectMeta>
        </ProjectHeader>

        <ProjectImage>
          {project.icon || '📊'}
        </ProjectImage>

        <ProjectContent>
          <MainContent>
            <SectionTitle>프로젝트 개요</SectionTitle>
            <ProjectDescription>
              {project.description}
            </ProjectDescription>

            <SectionTitle>기술 스택</SectionTitle>
            <TechStack>
              {project.tech_stack?.map((tech, index) => (
                <TechTag key={index}>{tech}</TechTag>
              ))}
            </TechStack>

            <SectionTitle>주요 성과</SectionTitle>
            <Achievements>
              <AchievementList>
                {project.achievements?.map((achievement, index) => (
                  <AchievementItem key={index}>
                    {achievement}
                  </AchievementItem>
                ))}
              </AchievementList>
            </Achievements>
          </MainContent>

          <Sidebar>
            <InfoCard>
              <InfoTitle>프로젝트 정보</InfoTitle>
              <InfoItem>
                <InfoLabel>클라이언트</InfoLabel>
                <InfoValue>{project.client}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>상태</InfoLabel>
                <InfoValue>{project.status}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>카테고리</InfoLabel>
                <InfoValue>{project.category || '기타'}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>시작일</InfoLabel>
                <InfoValue>{project.start_date}</InfoValue>
              </InfoItem>
              {project.end_date && (
                <InfoItem>
                  <InfoLabel>종료일</InfoLabel>
                  <InfoValue>{project.end_date}</InfoValue>
                </InfoItem>
              )}
            </InfoCard>

            <CTAButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactClick}
            >
              프로젝트 문의하기
            </CTAButton>
          </Sidebar>
        </ProjectContent>
      </Container>
    </ProjectDetailContainer>
  );
};

export default ProjectDetailPage;

