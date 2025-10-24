import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ServiceContainer = styled.section`
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

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const ServiceCard = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2.5rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.theme.colors.gradient};
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.xl};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ServiceIcon = styled.div`
  width: 80px;
  height: 80px;
  background: ${props => props.theme.colors.gradient};
  border-radius: ${props => props.theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2rem;
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
`;

const ServiceDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const FeatureList = styled.ul`
  text-align: left;
  margin-bottom: 1.5rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const CheckIcon = styled.span`
  color: ${props => props.theme.colors.primary};
  font-weight: bold;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`;

const TechTag = styled.span`
  background: ${props => props.theme.colors.surfaceLight};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 500;
`;

const ServiceSection: React.FC = () => {
  const services = [
    {
      icon: '🤖',
      title: 'LLM 포탈',
      description: '복잡한 LLM 연동을 단일 게이트웨이로 단순화하고, 보안·비용까지 중앙에서 안전하게 관리하세요.',
      features: [
        '중앙화된 LLM 관리',
        '보안 강화',
        '비용 최적화',
        'API 통합'
      ],
      techStack: ['Python', 'FastAPI', 'Docker', 'Kubernetes']
    },
    {
      icon: '🌐',
      title: '맞춤형 SI 구축',
      description: '고객의 비즈니스 요구사항에 맞는 맞춤형 시스템 통합 솔루션을 제공합니다.',
      features: [
        '요구사항 분석',
        '시스템 설계',
        '구현 및 테스트',
        '운영 지원'
      ],
      techStack: ['Java', 'Spring', 'Oracle', 'React']
    },
    {
      icon: '🖥️',
      title: '서버 관리 서비스',
      description: '24/7 모니터링과 전문적인 서버 관리로 안정적인 시스템 운영을 보장합니다.',
      features: [
        '24/7 모니터링',
        '자동 백업',
        '성능 최적화',
        '보안 관리'
      ],
      techStack: ['AWS', 'Azure', 'Docker', 'Kubernetes']
    }
  ];

  return (
    <ServiceContainer id="services">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          전문 IT 서비스
        </SectionTitle>
        <SectionDescription
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          AI와 글로벌 협업으로 소프트웨어 개발 산업을 혁신하는 테크 컴퍼니
        </SectionDescription>
        
        <ServiceGrid>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <FeatureList>
                {service.features.map((feature, featureIndex) => (
                  <FeatureItem key={featureIndex}>
                    <CheckIcon>✓</CheckIcon>
                    {feature}
                  </FeatureItem>
                ))}
              </FeatureList>
              <TechStack>
                {service.techStack.map((tech, techIndex) => (
                  <TechTag key={techIndex}>{tech}</TechTag>
                ))}
              </TechStack>
            </ServiceCard>
          ))}
        </ServiceGrid>
      </Container>
    </ServiceContainer>
  );
};

export default ServiceSection;
