import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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
  background: radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
  z-index: 1;
`;

const MainHero = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

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
  line-height: 1.2;
  margin-bottom: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const TitleLine = styled.span`
  display: block;
  color: white;
`;

const TitleHighlight = styled.span`
  background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ThreeDIcon = styled(motion.div)`
  width: 200px;
  height: 200px;
  position: relative;
  transform-style: preserve-3d;
`;

const IconLayer = styled.div<{ $depth: number; $color: string }>`
  position: absolute;
  width: ${props => 200 - props.$depth * 20}px;
  height: ${props => 200 - props.$depth * 20}px;
  background: ${props => props.$color};
  border-radius: 20px;
  transform: translateZ(${props => props.$depth * 30}px) rotateX(${props => props.$depth * 5}deg) rotateY(${props => props.$depth * 10}deg);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  font-weight: bold;
`;

const CardsSection = styled.div`
  padding: 4rem 0;
  position: relative;
  z-index: 2;
`;

const CardsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FeatureCard = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
`;

const CardIcon = styled.div<{ $color: string }>`
  width: 60px;
  height: 60px;
  background: ${props => props.$color};
  border-radius: ${props => props.theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const CardDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const CardArrow = styled.div`
  width: 40px;
  height: 40px;
  background: ${props => props.theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
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
      <MainHero>
        <Content>
          <TextContent>
            <Title
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <TitleLine>AI의 속도, 전문가의 완성도</TitleLine>
              <TitleLine>
                IT 전문가 그룹 <TitleHighlight>테크레디</TitleHighlight>
              </TitleLine>
            </Title>
            <Subtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              AI 자동화와 글로벌 24시간 개발팀으로
            </Subtitle>
            <Description
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
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
                서비스 보기
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
            <ThreeDIcon
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <IconLayer $depth={0} $color="linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)">
                TS
              </IconLayer>
              <IconLayer $depth={1} $color="linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)">
                TS
              </IconLayer>
              <IconLayer $depth={2} $color="linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)">
                TS
              </IconLayer>
            </ThreeDIcon>
          </VisualContent>
        </Content>
      </MainHero>
      <CardsSection>
        <CardsContainer>
          <FeatureCard
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <CardHeader>
              <CardTitle>SyncFlow</CardTitle>
              <CardIcon $color="linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)">
                👥
              </CardIcon>
            </CardHeader>
            <CardDescription>
              회의와 문서 작업 시간을 획기적으로 줄이고, 팀 협업 효율을 극대화 해보세요.
            </CardDescription>
            <CardArrow>→</CardArrow>
          </FeatureCard>
          <FeatureCard
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <CardHeader>
              <CardTitle>LLM 포털</CardTitle>
              <CardIcon $color="linear-gradient(135deg, #10b981 0%, #059669 100%)">
                🛡️
              </CardIcon>
            </CardHeader>
            <CardDescription>
              복잡한 LLM 연동을 단일 게이트웨이로 단순화하고, 보안·비용까지 중앙에서 안전하게 관리하세요.
            </CardDescription>
            <CardArrow>→</CardArrow>
          </FeatureCard>
        </CardsContainer>
      </CardsSection>
    </HeroContainer>
  );
};

export default HeroSection;