import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { getProjects, Project } from '../lib/supabase';

const ProjectPageContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  padding-top: 80px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const PageHeader = styled.div`
  text-align: center;
  padding: 4rem 0 2rem;
`;

const PageTitle = styled(motion.h1)`
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

const PageDescription = styled(motion.p)`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)<{ $isActive: boolean }>`
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.$isActive ? props.theme.colors.gradient : props.theme.colors.surface};
  color: ${props => props.$isActive ? 'white' : props.theme.colors.text};
  border: 1px solid ${props => props.$isActive ? 'transparent' : props.theme.colors.border};

  &:hover {
    background: ${props => props.$isActive ? props.theme.colors.gradient : props.theme.colors.surfaceLight};
    transform: translateY(-2px);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.xl};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  background: ${props => props.theme.colors.surfaceLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: ${props => props.theme.colors.textSecondary};
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
  padding: 2rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: white;
`;

const ProjectClient = styled.p`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ProjectDate = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background: ${props => props.theme.colors.surfaceLight};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 500;
`;

const Achievements = styled.div`
  margin-bottom: 1.5rem;
`;

const AchievementTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '⭐';
    font-size: 0.8rem;
  }
`;

const AchievementList = styled.ul`
  list-style: none;
`;

const AchievementItem = styled.li`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
  padding-left: 1rem;
  position: relative;

  &::before {
    content: '•';
    color: ${props => props.theme.colors.primary};
    position: absolute;
    left: 0;
  }
`;

const ProjectPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('전체');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const filters = ['전체', '신규', '유지보수', '컨설팅', '구축', '개발', '서버 관리'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const sampleProjects = [
    {
      id: 1,
      title: '대형 유통사 통합 ERP 시스템 구축',
      client: 'A유통그룹',
      date: '2024.01 - 2024.08',
      description: '선사 사원리를 위한 한 ERP 시스설계 구축 시 내이너 마이그레이션 및 통합.',
      techStack: ['Java', 'Spring Boot', 'Oracle', 'Redis', 'Kafka'],
      achievements: [
        '업무 효율 40% 향상',
        '데이터 처리 속도 3배 개선',
        '운영 비용 30% 절감'
      ],
      icon: '📊',
      category: '구축'
    },
    {
      id: 2,
      title: '금융권 클라우드 인프라 구축 및 운영',
      client: 'B금융지주',
      date: '2023.06 -',
      description: 'AWS 기반 고사성어라 구축 및 24/7 어린 시비스 시공.',
      techStack: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Prometheus'],
      achievements: [
        '시스템 가용률 99.99% 달성',
        '장애 대응 시간 80% 단축',
        '인프라 비용 25% 절감'
      ],
      icon: '☁️',
      category: '서버 관리'
    },
    {
      id: 3,
      title: '제조사 스마트팩토리 웹 플랫폼 개발',
      client: 'C제조사',
      date: '2023.09 - 2024.03',
      description: '실시간 생산 현황 모니터링 및 설비 관리를 위한 길 기반 플랫폼 개발.',
      techStack: ['Next.js', 'Node.js', 'TypeScript', 'PostgreSQL'],
      achievements: [
        '생산성 35% 향상',
        '불량률 50% 감소',
        '실시간 데이터 가시화'
      ],
      icon: '🏭',
      category: '개발'
    },
    {
      id: 4,
      title: '공공기관 전자문서 시스템 구축',
      client: 'D공공기관',
      date: '2023.03 - 2023.12',
      description: '전자결재 및 문서 관리 시스템 구축, 보안 강화 및 접근 제어 시스템 구현.',
      techStack: ['Java', 'Spring', 'PostgreSQL', 'Redis', 'ElasticSearch'],
      achievements: [
        '문서 처리 시간 60% 단축',
        '정보 유출 사고 90% 감소',
        '보안 등급 상향'
      ],
      icon: '📄',
      category: '구축'
    },
    {
      id: 5,
      title: '물류 기업 통합 관제 시스템 개발',
      client: 'F물류',
      date: '2023.01 - 2023.08',
      description: '실시간 차량 추적 및 배송 관리를 위한 통합 관제 시스템 구축.',
      techStack: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'WebSocket'],
      achievements: [
        '배송 효율 45% 향상',
        '재고 정확도 30% 증가',
        '운영 비용 20% 절감'
      ],
      icon: '🚚',
      category: '개발'
    },
    {
      id: 6,
      title: '의료기관 서버 인프라 현대화',
      client: 'G병원',
      date: '2022.09 - 2023.03',
      description: '온프레미스 환경을 클라우드로 전환하고 보안 강화 및 성능 최적화 수행.',
      techStack: ['Azure', 'Docker', 'Kubernetes', 'Nginx', 'PostgreSQL'],
      achievements: [
        '시스템 응답 속도 60% 개선',
        '보안 취약점 0건',
        '유지보수 비용 35% 절감'
      ],
      icon: '🏥',
      category: '서버 관리'
    }
  ];

  const filteredProjects = activeFilter === '전체' 
    ? projects 
    : projects.filter(project => (project.category || '기타') === activeFilter);

  return (
    <ProjectPageContainer>
      <Container>
        <PageHeader>
          <PageTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            프로젝트 포트폴리오
          </PageTitle>
          <PageDescription
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            다양한 산업 분야에서 성공적으로 완료한 프로젝트들을 소개합니다
          </PageDescription>
        </PageHeader>

        <FilterSection>
          {filters.map((filter) => (
            <FilterButton
              key={filter}
              $isActive={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </FilterButton>
          ))}
        </FilterSection>

        <ProjectGrid>
          {loading ? (
            <div>로딩 중...</div>
          ) : (
            filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Link to={`/projects/${project.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ProjectImage>
                    {project.icon || '📊'}
                  </ProjectImage>
                  <ProjectContent>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectClient>{project.client}</ProjectClient>
                    <ProjectDate>{project.start_date}</ProjectDate>
                    <ProjectDescription>{project.description}</ProjectDescription>
                    
                    <TechStack>
                      {project.tech_stack?.map((tech, techIndex) => (
                        <TechTag key={techIndex}>{tech}</TechTag>
                      ))}
                    </TechStack>

                    <Achievements>
                      <AchievementTitle>주요 성과</AchievementTitle>
                      <AchievementList>
                        {project.achievements?.map((achievement, achievementIndex) => (
                          <AchievementItem key={achievementIndex}>
                            {achievement}
                          </AchievementItem>
                        ))}
                      </AchievementList>
                    </Achievements>
                  </ProjectContent>
                </Link>
              </ProjectCard>
            ))
          )}
        </ProjectGrid>
      </Container>
      <Footer />
    </ProjectPageContainer>
  );
};

export default ProjectPage;
