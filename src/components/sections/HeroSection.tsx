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
  padding: 1rem 3.5rem 1rem 1.5rem;
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
  width: 2.5rem;
  height: 2.5rem;
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

const LoadingSpinner = styled(motion.div)`
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingOverlay = styled(motion.div)`
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, transparent, rgba(99, 102, 241, 0.3), transparent);
  border-radius: ${props => props.theme.borderRadius.lg};
  z-index: -1;
  animation: shimmer 2s ease-in-out infinite;

  @keyframes shimmer {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.8; }
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

const InterviewContainer = styled(motion.div)`
  width: 100%;
  max-width: 600px;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  margin-top: 2rem;
`;

const InterviewQuestion = styled.h3`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const OptionButton = styled(motion.button)`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  color: white;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.surfaceLight};
  }
`;

const TextInput = styled.input`
  width: 100%;
  padding: 1rem;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  color: white;
  font-size: 1rem;
  outline: none;
  margin-bottom: 1.5rem;

  &:focus {
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const SimilarPortfolioContainer = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  margin-top: 2rem;
`;

const SimilarPortfolioTitle = styled.h3`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const PortfolioCard = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const PortfolioTitle = styled.h4`
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const PortfolioClient = styled.p`
  color: ${props => props.theme.colors.primary};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const PortfolioDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 1rem;
`;

const PortfolioTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechTag = styled.span`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 0.8rem;
`;

const FinalButton = styled(motion.button)`
  background: ${props => props.theme.colors.gradient};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 2rem;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

// 사용하지 않는 스타일 컴포넌트들 제거됨

interface HeroSectionProps {
  onContactClick: () => void;
}

interface InterviewData {
  projectType: string;
  budget: string;
  timeline: string;
  features: string[];
  currentStep: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [interviewData, setInterviewData] = useState<InterviewData>({
    projectType: '',
    budget: '',
    timeline: '',
    features: [],
    currentStep: 0
  });
  const [showSimilarPortfolio, setShowSimilarPortfolio] = useState(false);

  const interviewQuestions = [
    {
      question: "어떤 종류의 프로젝트를 원하시나요?",
      type: "select",
      options: ["웹사이트 개발", "모바일 앱 개발", "시스템 구축", "클라우드 마이그레이션", "기타"]
    },
    {
      question: "예상 예산은 어느 정도인가요?",
      type: "select",
      options: ["1,000만원 미만", "1,000만원 - 3,000만원", "3,000만원 - 5,000만원", "5,000만원 - 1억원", "1억원 이상", "협의"]
    },
    {
      question: "프로젝트 완료 예상 기간은?",
      type: "select",
      options: ["1개월 이내", "1-3개월", "3-6개월", "6개월 이상", "협의"]
    },
    {
      question: "필요한 주요 기능들을 알려주세요 (쉼표로 구분)",
      type: "text",
      placeholder: "예: 사용자 관리, 결제 시스템, 상품 관리, 관리자 페이지"
    }
  ];

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
    
    // 인터뷰 시작
    setTimeout(() => {
      setIsGenerating(false);
      setInterviewData(prev => ({ ...prev, currentStep: 1 }));
    }, 2000);
  };

  const handleInterviewAnswer = (answer: string) => {
    const currentQuestion = interviewQuestions[interviewData.currentStep - 1];
    
    if (currentQuestion.type === 'select') {
      if (currentQuestion.question.includes('프로젝트')) {
        setInterviewData(prev => ({ ...prev, projectType: answer }));
      } else if (currentQuestion.question.includes('예산')) {
        setInterviewData(prev => ({ ...prev, budget: answer }));
      } else if (currentQuestion.question.includes('기간')) {
        setInterviewData(prev => ({ ...prev, timeline: answer }));
      }
    } else {
      const features = answer.split(',').map(f => f.trim()).filter(f => f);
      setInterviewData(prev => ({ ...prev, features }));
    }

    if (interviewData.currentStep < interviewQuestions.length) {
      setInterviewData(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
    } else {
      // 인터뷰 완료 - 유사 포트폴리오 표시
      setShowSimilarPortfolio(true);
    }
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

  const similarPortfolios = [
    {
      title: "대형 유통사 통합 ERP 시스템",
      client: "A유통그룹",
      description: "전사 통합 ERP 시스템 구축으로 업무 효율 40% 향상",
      tech: ["Java", "Spring Boot", "Oracle", "Redis"]
    },
    {
      title: "금융권 클라우드 인프라",
      client: "B금융지주", 
      description: "AWS 기반 고가용성 클라우드 인프라 구축",
      tech: ["AWS", "Kubernetes", "Docker", "Terraform"]
    },
    {
      title: "제조사 스마트팩토리 플랫폼",
      client: "C제조사",
      description: "실시간 생산 현황 모니터링 및 설비 관리 플랫폼",
      tech: ["Next.js", "Node.js", "TypeScript", "PostgreSQL"]
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

          {interviewData.currentStep === 0 && (
            <>
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
                    {isGenerating ? <LoadingSpinner /> : '→'}
                  </SendButton>
                  {isGenerating && <LoadingOverlay />}
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
            </>
          )}

          {interviewData.currentStep > 0 && interviewData.currentStep <= interviewQuestions.length && (
            <InterviewContainer
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <InterviewQuestion>
                {interviewQuestions[interviewData.currentStep - 1].question}
              </InterviewQuestion>
              
              {interviewQuestions[interviewData.currentStep - 1].type === 'select' ? (
                <OptionGrid>
                  {interviewQuestions[interviewData.currentStep - 1].options.map((option, index) => (
                    <OptionButton
                      key={index}
                      onClick={() => handleInterviewAnswer(option)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option}
                    </OptionButton>
                  ))}
                </OptionGrid>
              ) : (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const input = e.currentTarget.querySelector('input') as HTMLInputElement;
                  if (input.value.trim()) {
                    handleInterviewAnswer(input.value);
                    input.value = '';
                  }
                }}>
                  <TextInput
                    type="text"
                    placeholder={interviewQuestions[interviewData.currentStep - 1].placeholder}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (e.currentTarget.value.trim()) {
                          handleInterviewAnswer(e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }
                    }}
                  />
                </form>
              )}
            </InterviewContainer>
          )}

          {showSimilarPortfolio && (
            <SimilarPortfolioContainer
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <SimilarPortfolioTitle>
                유사한 프로젝트 포트폴리오
              </SimilarPortfolioTitle>
              
              <PortfolioGrid>
                {similarPortfolios.map((portfolio, index) => (
                  <PortfolioCard
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <PortfolioTitle>{portfolio.title}</PortfolioTitle>
                    <PortfolioClient>{portfolio.client}</PortfolioClient>
                    <PortfolioDescription>{portfolio.description}</PortfolioDescription>
                    <PortfolioTech>
                      {portfolio.tech.map((tech, techIndex) => (
                        <TechTag key={techIndex}>{tech}</TechTag>
                      ))}
                    </PortfolioTech>
                  </PortfolioCard>
                ))}
              </PortfolioGrid>

              <FinalButton
                onClick={onContactClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                맞춤 제안서 받기
              </FinalButton>
            </SimilarPortfolioContainer>
          )}
        </ChatContainer>
      </MainHero>
    </HeroContainer>
  );
};

export default HeroSection;