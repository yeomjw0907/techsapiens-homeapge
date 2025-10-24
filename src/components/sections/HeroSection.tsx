import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  overflow: hidden;
  padding-top: 80px;
  cursor: none;
`;

const BackgroundPattern = styled.div<{ $mouseX: number; $mouseY: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at ${props => props.$mouseX}% ${props => props.$mouseY}%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
              radial-gradient(circle at ${props => 100 - props.$mouseX}% ${props => 100 - props.$mouseY}%, rgba(139, 92, 246, 0.15) 0%, transparent 50%);
  z-index: 1;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at ${props => props.$mouseX * 0.8}% ${props => props.$mouseY * 0.8}%, rgba(99, 102, 241, 0.08) 0%, transparent 30%),
      radial-gradient(circle at ${props => 100 - props.$mouseX * 0.8}% ${props => 100 - props.$mouseY * 0.8}%, rgba(139, 92, 246, 0.08) 0%, transparent 30%);
    transition: all 0.3s ease;
  }
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

const ServiceIcon = styled(motion.div)`
  width: 200px;
  height: 200px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(6, 182, 212, 0.3);
  
  &::before {
    content: '⚙️';
    font-size: 4rem;
    filter: grayscale(0) brightness(1.2);
  }
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
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    onContactClick();
  };

  const TypingText = styled.span`
    border-right: 2px solid ${props => props.theme.colors.primary};
    animation: blink 1s infinite;
    
    @keyframes blink {
      0%, 50% { border-color: ${props => props.theme.colors.primary}; }
      51%, 100% { border-color: transparent; }
    }
  `;

  const TypingAnimation: React.FC<{ text: string; speed?: number }> = ({ text, speed = 100 }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);

        return () => clearTimeout(timeout);
      }
    }, [currentIndex, text, speed]);

    return (
      <TypingText>
        {displayText}
      </TypingText>
    );
  };

  return (
    <HeroContainer id="home" onMouseMove={handleMouseMove}>
      <BackgroundPattern $mouseX={mousePosition.x} $mouseY={mousePosition.y} />
      <MainHero>
        <Content>
          <TextContent>
            <Title
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <TitleLine>전문가의 완성도</TitleLine>
              <TitleLine>
                IT 전문  <TitleHighlight>테크사피엔스</TitleHighlight>
              </TitleLine>
            </Title>
            <Subtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <TypingAnimation text="검증된 실력, 테크사피엔스와 함께하세요" speed={80} />
            </Subtitle>
            <Description
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
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
            <ServiceIcon
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
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
              <CardTitle>시스템 구축</CardTitle>
              <CardIcon $color="linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)">
                🏗️
              </CardIcon>
            </CardHeader>
            <CardDescription>
              기업의 비즈니스 요구사항에 맞는 맞춤형 시스템을 구축하여 업무 효율성을 극대화합니다.
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
              <CardTitle>클라우드 솔루션</CardTitle>
              <CardIcon $color="linear-gradient(135deg, #10b981 0%, #059669 100%)">
                ☁️
              </CardIcon>
            </CardHeader>
            <CardDescription>
              안정적이고 확장 가능한 클라우드 인프라 구축으로 비용 효율성과 성능을 동시에 확보합니다.
            </CardDescription>
            <CardArrow>→</CardArrow>
          </FeatureCard>
        </CardsContainer>
      </CardsSection>
    </HeroContainer>
  );
};

export default HeroSection;