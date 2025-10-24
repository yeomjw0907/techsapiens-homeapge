import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  overflow: hidden;
  padding: 80px 2rem 2rem;
`;

const BackgroundPattern = styled.div<{ $mouseX: number; $mouseY: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at ${props => props.$mouseX}% ${props => props.$mouseY}%, rgba(99, 102, 241, 0.05) 0%, transparent 70%),
              radial-gradient(circle at ${props => 100 - props.$mouseX}% ${props => 100 - props.$mouseY}%, rgba(139, 92, 246, 0.05) 0%, transparent 70%);
  z-index: 1;
  transition: all 0.8s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at ${props => props.$mouseX * 0.6}% ${props => props.$mouseY * 0.6}%, rgba(99, 102, 241, 0.03) 0%, transparent 50%),
      radial-gradient(circle at ${props => 100 - props.$mouseX * 0.6}% ${props => 100 - props.$mouseY * 0.6}%, rgba(139, 92, 246, 0.03) 0%, transparent 50%);
    transition: all 0.8s ease;
  }
`;

const MainHero = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const ChatContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const WelcomeText = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 600;
  color: white;
  text-align: center;
  margin-bottom: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
  margin-bottom: 3rem;
  line-height: 1.6;
`;

const PromptContainer = styled(motion.div)`
  width: 100%;
  position: relative;
`;

const PromptInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  color: white;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const SendButton = styled(motion.button)`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    transform: translateY(-50%) scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SuggestionContainer = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const SuggestionCard = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const SuggestionTitle = styled.h3`
  color: white;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const SuggestionDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.4;
`;

// 사용하지 않는 스타일 컴포넌트들 제거됨

interface HeroSectionProps {
  onContactClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handlePromptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // 여기서 제안서 생성 로직을 구현할 예정
    setTimeout(() => {
      setIsGenerating(false);
      onContactClick(); // 임시로 문의 모달 열기
    }, 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  const TypingText = styled.span`
    border-right: 2px solid #06b6d4;
    animation: blink 1s infinite;
    
    @keyframes blink {
      0%, 50% { border-color: #06b6d4; }
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

  const suggestions = [
    {
      title: "웹사이트 개발",
      description: "반응형 웹사이트나 웹 애플리케이션 개발이 필요하신가요?"
    },
    {
      title: "모바일 앱 개발",
      description: "iOS/Android 앱 개발 또는 크로스플랫폼 앱 개발을 원하시나요?"
    },
    {
      title: "시스템 구축",
      description: "ERP, CRM 등 기업용 시스템 구축이 필요하신가요?"
    },
    {
      title: "클라우드 마이그레이션",
      description: "기존 시스템을 클라우드로 이전하고 싶으신가요?"
    }
  ];

  return (
    <HeroContainer id="home" onMouseMove={handleMouseMove}>
      <BackgroundPattern $mouseX={mousePosition.x} $mouseY={mousePosition.y} />
      <MainHero>
        <ChatContainer>
          <WelcomeText
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            안녕하세요! 테크사피엔스입니다 👋
          </WelcomeText>
          
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            필요하신 IT 서비스를 설명해주세요. 맞춤형 제안서를 만들어드리겠습니다.
          </Subtitle>

          <PromptContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handlePromptSubmit}>
              <PromptInput
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="예: 온라인 쇼핑몰 개발이 필요합니다. 사용자 관리, 결제 시스템, 상품 관리 기능이 포함되어야 합니다."
                disabled={isGenerating}
              />
              <SendButton
                type="submit"
                disabled={!prompt.trim() || isGenerating}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isGenerating ? '⏳' : '→'}
              </SendButton>
            </form>
          </PromptContainer>

          <SuggestionContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {suggestions.map((suggestion, index) => (
              <SuggestionCard
                key={index}
                onClick={() => handleSuggestionClick(suggestion.title)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <SuggestionTitle>{suggestion.title}</SuggestionTitle>
                <SuggestionDescription>{suggestion.description}</SuggestionDescription>
              </SuggestionCard>
            ))}
          </SuggestionContainer>
        </ChatContainer>
      </MainHero>
    </HeroContainer>
  );
};

export default HeroSection;