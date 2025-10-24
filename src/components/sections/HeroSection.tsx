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

const SendButton = styled.button`
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
    transform: translateY(-50%);
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const LoadingDot = styled.div`
  width: 12px;
  height: 12px;
  background: ${props => props.theme.colors.primary};
  border-radius: 50%;
  animation: loading 1.4s infinite ease-in-out both;

  &:nth-child(1) {
    animation-delay: -0.32s;
  }

  &:nth-child(2) {
    animation-delay: -0.16s;
  }

  @keyframes loading {
    0%, 80%, 100% {
      transform: scale(0);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const LoadingText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
`;

const BacklightOverlay = styled(motion.div)`
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  background: linear-gradient(135deg, 
    rgba(99, 102, 241, 0.1) 0%, 
    rgba(99, 102, 241, 0.3) 50%, 
    rgba(99, 102, 241, 0.1) 100%
  );
  border-radius: ${props => props.theme.borderRadius.lg};
  z-index: -1;
  opacity: 0;
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { 
      opacity: 0.3;
      transform: scale(1);
    }
    50% { 
      opacity: 0.8;
      transform: scale(1.02);
    }
  }
`;

const TypingPlaceholder = styled.div`
  position: absolute;
  top: 1rem;
  left: 1.5rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1rem;
  pointer-events: none;
  z-index: 1;
`;

const TypingCursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 1rem;
  background: ${props => props.theme.colors.primary};
  margin-left: 2px;
  animation: blink 1s infinite;

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
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
  max-width: 1200px;
  margin-top: 2rem;
`;

const ProposalCompleteMessage = styled(motion.div)`
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05));
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const CompleteTitle = styled.h3`
  color: #22c55e;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const CompleteDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1rem;
  margin: 0;
`;

const PortfolioSection = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;
`;

const PortfolioLeft = styled.div`
  flex: 1;
`;

const PortfolioRight = styled.div`
  flex: 1;
`;

const SimilarPortfolioTitle = styled.h3`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const PortfolioGrid = styled.div`
  display: flex;
  flex-direction: column;
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

const CategoryBadge = styled.span`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 1rem;
  display: inline-block;
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
  margin-bottom: 1rem;
`;

const TechTag = styled.span`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 0.8rem;
`;

const ViewProjectButton = styled(motion.button)`
  background: transparent;
  border: 1px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
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

const ProgressContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: ${props => props.theme.colors.surface};
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: ${props => props.theme.colors.gradient};
  border-radius: 2px;
`;

const ProgressText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  text-align: center;
  margin: 0;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const NavButton = styled(motion.button)`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.surfaceLight};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NextButton = styled(NavButton)`
  background: ${props => props.theme.colors.primary};
  border-color: ${props => props.theme.colors.primary};
  margin-left: auto;

  &:hover {
    background: ${props => props.theme.colors.primary};
    transform: translateY(-1px);
  }
`;

const CustomInput = styled.input`
  width: 100%;
  padding: 1rem;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  color: white;
  font-size: 1rem;
  outline: none;
  margin-top: 1rem;

  &:focus {
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const RecipePopup = styled(motion.div)`
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
  padding: 2rem;
`;

const RecipeContainer = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

const RecipeHeader = styled.div`
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  text-align: center;
`;

const RecipeTitle = styled.h2`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const RecipeDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1rem;
  margin: 0;
`;

const RecipeContent = styled.div`
  padding: 2rem;
`;

const RecipeSection = styled.div`
  margin-bottom: 2rem;
`;

const RecipeSectionTitle = styled.h3`
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const RecipeField = styled.div`
  margin-bottom: 1rem;
`;

const RecipeLabel = styled.label`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  display: block;
  margin-bottom: 0.5rem;
`;

const RecipeInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  color: white;
  font-size: 0.9rem;
  outline: none;

  &:focus {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const RecipeCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const RecipeCheckboxInput = styled.input`
  width: 1rem;
  height: 1rem;
`;

const RecipeCheckboxLabel = styled.label`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  cursor: pointer;
`;

const RecipeActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 1rem 2rem 2rem;
`;

const RecipeButton = styled(motion.button)`
  background: ${props => props.theme.colors.gradient};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  flex: 1;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const QuoteSuccessMessage = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.95), rgba(16, 185, 129, 0.95));
  color: white;
  padding: 2rem 3rem;
  border-radius: ${props => props.theme.borderRadius.lg};
  text-align: center;
  z-index: 2000;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const QuoteSuccessTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const QuoteSuccessText = styled.p`
  font-size: 1.1rem;
  margin: 0;
  line-height: 1.6;
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
  const [showRecipePopup, setShowRecipePopup] = useState(false);
  const [customProjectType, setCustomProjectType] = useState('');
  const [featuresInput, setFeaturesInput] = useState('');
  const [recipeData, setRecipeData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    privacyAgreement: false
  });
  const [typingText, setTypingText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showQuoteSuccess, setShowQuoteSuccess] = useState(false);

  const interviewQuestions = [
    {
      question: "어떤 종류의 프로젝트를 원하시나요?",
      type: "select",
      options: ["웹사이트 개발", "모바일 앱 개발", "시스템 구축", "클라우드 마이그레이션", "기타"]
    },
    {
      question: "예상 예산은 어느 정도인가요?",
      type: "select",
      options: ["1,000만원 미만", "1,000만원 - 3,000만원", "3,000만원 - 5,000만원", "5,000만원 - 1억원", "1억원 이상", "상호 협의"]
    },
    {
      question: "프로젝트 완료 예상 기간은?",
      type: "select",
      options: ["1개월 이내", "1-3개월", "3-6개월", "6개월 이상", "상호 협의"]
    },
    {
      question: "필요한 주요 기능들을 알려주세요",
      type: "text",
      placeholder: "예: 사용자 관리, 결제 시스템, 상품 관리, 관리자 페이지"
    }
  ];

  const placeholderText = "자사 홈페이지 리뉴얼";

  // 타이핑 애니메이션
  useEffect(() => {
    if (typingIndex < placeholderText.length) {
      const timer = setTimeout(() => {
        setTypingText(prev => prev + placeholderText[typingIndex]);
        setTypingIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [typingIndex, placeholderText]);

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
    setSelectedAnswer(answer);
    
    if (interviewData.currentStep === 1 && answer === '기타') {
      setShowCustomInput(true);
      return;
    }
  };

  const handleNextStep = () => {
    if (selectedAnswer) {
      const currentQuestion = interviewQuestions[interviewData.currentStep - 1];
      
      if (currentQuestion.type === 'select') {
        if (currentQuestion.question.includes('프로젝트')) {
          setInterviewData(prev => ({ ...prev, projectType: selectedAnswer }));
        } else if (currentQuestion.question.includes('예산')) {
          setInterviewData(prev => ({ ...prev, budget: selectedAnswer }));
        } else if (currentQuestion.question.includes('기간')) {
          setInterviewData(prev => ({ ...prev, timeline: selectedAnswer }));
        }
      } else {
        const features = selectedAnswer.split(',').map(f => f.trim()).filter(f => f);
        setInterviewData(prev => ({ ...prev, features }));
      }

      if (interviewData.currentStep < interviewQuestions.length) {
        setInterviewData(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
        setSelectedAnswer('');
        setShowCustomInput(false);
      } else {
        // 인터뷰 완료 - 레시피 팝업 표시
        setShowRecipePopup(true);
      }
    }
  };

  const handleCustomProjectType = (value: string) => {
    setCustomProjectType(value);
    setSelectedAnswer(value);
  };

  const handleFeaturesInput = (value: string) => {
    setFeaturesInput(value);
    setSelectedAnswer(value);
  };

  const handlePreviousStep = () => {
    if (interviewData.currentStep > 1) {
      setInterviewData(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  const handleRecipeSubmit = () => {
    // 여기서 Supabase에 새로운 문의 저장
    console.log('Recipe submitted:', { ...interviewData, ...recipeData });
    setShowQuoteSuccess(true);
    setTimeout(() => {
      setShowQuoteSuccess(false);
      setShowRecipePopup(false);
      setShowSimilarPortfolio(true);
    }, 3000);
  };

  const handleCloseRecipePopup = () => {
    setShowRecipePopup(false);
  };

  const handleRecipePopupClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseRecipePopup();
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
      tech: ["Java", "Spring Boot", "Oracle", "Redis"],
      category: "신규"
    },
    {
      title: "금융권 클라우드 인프라",
      client: "B금융지주", 
      description: "AWS 기반 고가용성 클라우드 인프라 구축",
      tech: ["AWS", "Kubernetes", "Docker", "Terraform"],
      category: "컨설팅"
    },
    {
      title: "제조사 스마트팩토리 플랫폼",
      client: "C제조사",
      description: "실시간 생산 현황 모니터링 및 설비 관리 플랫폼",
      tech: ["Next.js", "Node.js", "TypeScript", "PostgreSQL"],
      category: "유지보수"
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
                    placeholder=""
                    disabled={isGenerating}
                  />
                  <SendButton
                    type="submit"
                    disabled={!prompt.trim() || isGenerating}
                  >
                    {isGenerating ? (
                      <LoadingSpinner>
                        <LoadingDot />
                        <LoadingDot />
                        <LoadingDot />
                      </LoadingSpinner>
                    ) : '→'}
                  </SendButton>
                  {isGenerating && <BacklightOverlay animate={{ opacity: 1 }} />}
                  {!prompt && (
                    <TypingPlaceholder>
                      {typingText}
                      <TypingCursor />
                    </TypingPlaceholder>
                  )}
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

          {interviewData.currentStep > 0 && interviewData.currentStep <= interviewQuestions.length && (() => {
            const currentQuestion = interviewQuestions[interviewData.currentStep - 1];
            if (!currentQuestion) return null;
            
            return (
              <InterviewContainer
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <ProgressContainer>
                  <ProgressBar>
                    <ProgressFill
                      initial={{ width: 0 }}
                      animate={{ width: `${(interviewData.currentStep / interviewQuestions.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </ProgressBar>
                  <ProgressText>
                    {interviewData.currentStep} / {interviewQuestions.length}
                  </ProgressText>
                </ProgressContainer>

                <InterviewQuestion>
                  {currentQuestion.question}
                </InterviewQuestion>
                
                {currentQuestion.type === 'select' ? (
                  <>
                    <OptionGrid>
                      {currentQuestion.options?.map((option, index) => (
                        <OptionButton
                          key={index}
                          onClick={() => handleInterviewAnswer(option)}
                          style={{
                            backgroundColor: selectedAnswer === option ? '#6366f1' : undefined,
                            borderColor: selectedAnswer === option ? '#6366f1' : undefined
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {option}
                        </OptionButton>
                      ))}
                    </OptionGrid>
                    {showCustomInput && (
                      <CustomInput
                        type="text"
                        placeholder="프로젝트 유형을 직접 입력해주세요"
                        value={customProjectType}
                        onChange={(e) => handleCustomProjectType(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && customProjectType.trim()) {
                            handleNextStep();
                          }
                        }}
                      />
                    )}
                    <NavigationButtons>
                      <NavButton
                        onClick={handlePreviousStep}
                        disabled={interviewData.currentStep === 1}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        이전
                      </NavButton>
                      <NextButton
                        onClick={handleNextStep}
                        disabled={!selectedAnswer}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        다음
                      </NextButton>
                    </NavigationButtons>
                  </>
                ) : (
                  <>
                    <TextInput
                      type="text"
                      placeholder={currentQuestion.placeholder}
                      value={featuresInput}
                      onChange={(e) => handleFeaturesInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          // 엔터 시 입력폼 확장 (새 줄 추가)
                          setFeaturesInput(prev => prev + '\n');
                        }
                      }}
                    />
                    <NavigationButtons>
                      <NavButton
                        onClick={handlePreviousStep}
                        disabled={interviewData.currentStep === 1}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        이전
                      </NavButton>
                      <NextButton
                        onClick={handleNextStep}
                        disabled={!featuresInput.trim()}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        다음
                      </NextButton>
                    </NavigationButtons>
                  </>
                )}
              </InterviewContainer>
            );
          })()}

          {showRecipePopup && (
            <RecipePopup
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleRecipePopupClick}
            >
              <RecipeContainer
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <RecipeHeader>
                  <RecipeTitle>🍳 맞춤 제안서 레시피</RecipeTitle>
                  <RecipeDescription>
                    귀하의 요구사항에 맞는 완벽한 제안서를 만들어드리겠습니다.
                  </RecipeDescription>
                  <button
                    onClick={handleCloseRecipePopup}
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: 'none',
                      border: 'none',
                      color: '#9ca3af',
                      fontSize: '1.5rem',
                      cursor: 'pointer',
                      padding: '0.5rem'
                    }}
                  >
                    ×
                  </button>
                </RecipeHeader>

                <RecipeContent>
                  <RecipeSection>
                    <RecipeSectionTitle>📋 프로젝트 정보</RecipeSectionTitle>
                    <RecipeField>
                      <RecipeLabel>프로젝트 유형</RecipeLabel>
                      <RecipeInput value={interviewData.projectType} readOnly />
                    </RecipeField>
                    <RecipeField>
                      <RecipeLabel>예상 예산</RecipeLabel>
                      <RecipeInput value={interviewData.budget} readOnly />
                    </RecipeField>
                    <RecipeField>
                      <RecipeLabel>완료 예상 기간</RecipeLabel>
                      <RecipeInput value={interviewData.timeline} readOnly />
                    </RecipeField>
                    <RecipeField>
                      <RecipeLabel>주요 기능</RecipeLabel>
                      <RecipeInput value={interviewData.features.join(', ')} readOnly />
                    </RecipeField>
                  </RecipeSection>

                  <RecipeSection>
                    <RecipeSectionTitle>📞 연락처 정보</RecipeSectionTitle>
                    <RecipeField>
                      <RecipeLabel>이름 *</RecipeLabel>
                      <RecipeInput
                        value={recipeData.name}
                        onChange={(e) => setRecipeData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="홍길동"
                      />
                    </RecipeField>
                    <RecipeField>
                      <RecipeLabel>회사명 *</RecipeLabel>
                      <RecipeInput
                        value={recipeData.company}
                        onChange={(e) => setRecipeData(prev => ({ ...prev, company: e.target.value }))}
                        placeholder="(주)테크사피엔스"
                      />
                    </RecipeField>
                    <RecipeField>
                      <RecipeLabel>이메일 *</RecipeLabel>
                      <RecipeInput
                        type="email"
                        value={recipeData.email}
                        onChange={(e) => setRecipeData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="hong@company.com"
                      />
                    </RecipeField>
                    <RecipeField>
                      <RecipeLabel>연락처 *</RecipeLabel>
                      <RecipeInput
                        value={recipeData.phone}
                        onChange={(e) => setRecipeData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="010-1234-5678"
                      />
                    </RecipeField>
                    <RecipeCheckbox>
                      <RecipeCheckboxInput
                        type="checkbox"
                        checked={recipeData.privacyAgreement}
                        onChange={(e) => setRecipeData(prev => ({ ...prev, privacyAgreement: e.target.checked }))}
                      />
                      <RecipeCheckboxLabel>
                        개인정보 처리방침에 동의합니다 *
                      </RecipeCheckboxLabel>
                    </RecipeCheckbox>
                  </RecipeSection>
                </RecipeContent>

                <RecipeActions>
                  <RecipeButton
                    onClick={handleRecipeSubmit}
                    disabled={!recipeData.name || !recipeData.company || !recipeData.email || !recipeData.phone || !recipeData.privacyAgreement}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    견적서 받기
                  </RecipeButton>
                </RecipeActions>
              </RecipeContainer>
            </RecipePopup>
          )}

          {showQuoteSuccess && (
            <QuoteSuccessMessage
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <QuoteSuccessTitle>✅ 견적서 요청 완료</QuoteSuccessTitle>
              <QuoteSuccessText>
                영업일 기준 3일 이내에 견적서를 송부해드리겠습니다.<br />
                감사합니다.
              </QuoteSuccessText>
            </QuoteSuccessMessage>
          )}

          {showSimilarPortfolio && (
            <SimilarPortfolioContainer
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ProposalCompleteMessage
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <CompleteTitle>✅ 제안서 제작 완료</CompleteTitle>
                <CompleteDescription>
                  귀하의 요구사항에 맞는 맞춤형 제안서가 준비되었습니다.
                </CompleteDescription>
              </ProposalCompleteMessage>

              <PortfolioSection>
                <PortfolioLeft>
                  <SimilarPortfolioTitle>유사한 프로젝트 포트폴리오</SimilarPortfolioTitle>
                  <PortfolioGrid>
                    {similarPortfolios.map((portfolio, index) => (
                      <PortfolioCard
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <CategoryBadge>{portfolio.category}</CategoryBadge>
                        <PortfolioTitle>{portfolio.title}</PortfolioTitle>
                        <PortfolioClient>{portfolio.client}</PortfolioClient>
                        <PortfolioDescription>{portfolio.description}</PortfolioDescription>
                        <PortfolioTech>
                          {portfolio.tech.map((tech, techIndex) => (
                            <TechTag key={techIndex}>{tech}</TechTag>
                          ))}
                        </PortfolioTech>
                        <ViewProjectButton
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          프로젝트 보러가기 →
                        </ViewProjectButton>
                      </PortfolioCard>
                    ))}
                  </PortfolioGrid>
                </PortfolioLeft>
              </PortfolioSection>

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