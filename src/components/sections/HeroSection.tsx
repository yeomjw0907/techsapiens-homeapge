import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  overflow: hidden;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
  background-size: 100px 100px;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

const PrimaryButton = styled(motion.button)`
  background: ${props => props.theme.colors.gradient};
  color: white;
  padding: 1rem 2rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const SecondaryButton = styled(motion.button)`
  background: transparent;
  color: white;
  padding: 1rem 2rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  font-size: 1.1rem;
  border: 1px solid ${props => props.theme.colors.border};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.surfaceLight};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const VisualContent = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FloatingCards = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
`;

const Card = styled(motion.div)`
  position: absolute;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: ${props => props.theme.shadows.xl};
`;

const Card1 = styled(Card)`
  top: 0;
  left: 0;
  width: 280px;
  z-index: 3;
`;

const Card2 = styled(Card)`
  top: 60px;
  right: 0;
  width: 280px;
  z-index: 2;
`;

const CardIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${props => props.theme.colors.gradient};
  border-radius: ${props => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
`;

const CardDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const CardLink = styled.a`
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  font-size: 0.9rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

interface HeroSectionProps {
  onContactClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    onContactClick();
  };

  return (
    <HeroContainer id="home">
      <BackgroundPattern />
      <Content>
        <TextContent>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            AI의 속도, 전문가의 완성도
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            IT 전문가 그룹 테크레디
          </Subtitle>
          <Description
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            AI 자동화와 글로벌 24시간 개발팀으로<br />
            50% 저렴하게, 2배 빠르게
          </Description>
          <ButtonGroup
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <PrimaryButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToServices}
            >
              자세히 보기
            </PrimaryButton>
            <SecondaryButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactClick}
            >
              문의하기
            </SecondaryButton>
          </ButtonGroup>
        </TextContent>
        <VisualContent>
          <FloatingCards>
            <Card1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <CardIcon>⚡</CardIcon>
              <CardTitle>SyncFlow</CardTitle>
              <CardDescription>
                회의와 문서 작업 시간을 획기적으로 줄이고,<br />
                팀 협업 효율을 극대화 해보세요.
              </CardDescription>
              <CardLink href="#">더보기</CardLink>
            </Card1>
            <Card2
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <CardIcon>🤖</CardIcon>
              <CardTitle>LLM 포탈</CardTitle>
              <CardDescription>
                복잡한 LLM 연동을 단일 게이트웨이로 단순화하고,<br />
                보안·비용까지 중앙에서 안전하게 관리하세요.
              </CardDescription>
              <CardLink href="#">더보기</CardLink>
            </Card2>
          </FloatingCards>
        </VisualContent>
      </Content>
    </HeroContainer>
  );
};

export default HeroSection;
