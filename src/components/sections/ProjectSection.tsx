import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProjectContainer = styled.section`
  padding: 6rem 0;
  background: ${props => props.theme.colors.background};
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1rem;
  background: ${props => props.theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

const SectionDescription = styled(motion.p)`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
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

const ViewAllButton = styled(motion.div)`
  text-align: center;
  margin-top: 2rem;
`;

const ButtonLink = styled(Link)`
  display: inline-block;
  background: ${props => props.theme.colors.gradient};
  color: white;
  padding: 1rem 2rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const ProjectSection: React.FC = () => {
  const projects = [
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
      icon: '📊'
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
      icon: '☁️'
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
      icon: '🏭'
    }
  ];

  return (
    <ProjectContainer>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          테크레디가 함께한 프로젝트들을 소개합니다
        </SectionTitle>
        <SectionDescription
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          아이디어를 현실로 만들기 위해, 기획부터 실행까지 몰입한 결과물입니다.
        </SectionDescription>

        <ProjectGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <ProjectImage>
                {project.icon}
              </ProjectImage>
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectClient>{project.client}</ProjectClient>
                <ProjectDate>{project.date}</ProjectDate>
                <ProjectDescription>{project.description}</ProjectDescription>
                
                <TechStack>
                  {project.techStack.map((tech, techIndex) => (
                    <TechTag key={techIndex}>{tech}</TechTag>
                  ))}
                </TechStack>

                <Achievements>
                  <AchievementTitle>주요 성과</AchievementTitle>
                  <AchievementList>
                    {project.achievements.map((achievement, achievementIndex) => (
                      <AchievementItem key={achievementIndex}>
                        {achievement}
                      </AchievementItem>
                    ))}
                  </AchievementList>
                </Achievements>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectGrid>

        <ViewAllButton
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <ButtonLink to="/projects">전체 프로젝트 보기</ButtonLink>
        </ViewAllButton>
      </Container>
    </ProjectContainer>
  );
};

export default ProjectSection;
