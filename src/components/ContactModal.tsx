import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { createInquiry } from '../lib/supabase';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
`;

const ModalContainer = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.surfaceLight};
    color: white;
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const ModalDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
`;

const Required = styled.span`
  color: ${props => props.theme.colors.primary};
  margin-left: 0.25rem;
`;

const Input = styled.input`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 0.75rem 1rem;
  color: white;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const TextArea = styled.textarea`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 0.75rem 1rem;
  color: white;
  font-size: 0.9rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const SubmitButton = styled(motion.button)`
  background: ${props => props.theme.colors.gradient};
  color: white;
  padding: 1rem 2rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Select = styled.select`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 0.75rem 1rem;
  color: white;
  font-size: 0.9rem;
  width: 100%;
  transition: all 0.3s ease;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  option {
    background: ${props => props.theme.colors.background};
    color: white;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const Checkbox = styled.input`
  margin-top: 0.25rem;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.5;
  cursor: pointer;
`;

const PrivacyLink = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: underline;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    budget: '',
    projectType: '',
    timeline: '',
    privacyAgreement: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Supabase에 문의사항 저장
      const inquiryData = {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        project_type: formData.projectType,
        budget: formData.budget,
        timeline: formData.timeline,
        privacy_agreement: formData.privacyAgreement,
        status: 'new' as const
      };
      
      const result = await createInquiry(inquiryData);
      
      if (!result) {
        throw new Error('문의사항 저장에 실패했습니다.');
      }
      
      console.log('Inquiry submitted successfully:', result);
      setIsSubmitting(false);
      onClose();
      
      // 폼 초기화
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: '',
        budget: '',
        projectType: '',
        timeline: '',
        privacyAgreement: false
      });
      
      // 성공 메시지 팝업
      const successMessage = document.createElement('div');
      successMessage.innerHTML = `
        <div style="
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          z-index: 10000;
          text-align: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          max-width: 400px;
          width: 90%;
        ">
          <div style="font-size: 3rem; margin-bottom: 1rem;">✅</div>
          <h3 style="margin: 0 0 1rem 0; font-size: 1.5rem; font-weight: 600;">문의 접수 완료!</h3>
          <p style="margin: 0; font-size: 1rem; line-height: 1.5;">
            문의사항이 성공적으로 전송되었습니다.<br>
            빠른 시일 내에 연락드리겠습니다.
          </p>
        </div>
        <div style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          z-index: 9999;
        "></div>
      `;
      document.body.appendChild(successMessage);
      
      // 3초 후 자동으로 제거
      setTimeout(() => {
        if (document.body.contains(successMessage)) {
          document.body.removeChild(successMessage);
        }
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setIsSubmitting(false);
      
      // 더 구체적인 오류 메시지 제공
      let errorMessage = '문의사항 저장에 실패했습니다.';
      
      if (error instanceof Error) {
        if (error.message.includes('데이터베이스 오류')) {
          errorMessage = '데이터베이스 연결에 문제가 있습니다. 잠시 후 다시 시도해주세요.';
        } else if (error.message.includes('network')) {
          errorMessage = '네트워크 연결을 확인해주세요.';
        } else {
          errorMessage = `오류: ${error.message}`;
        }
      }
      
      alert(errorMessage + '\n\n다시 시도해주세요.');
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          <ModalContainer
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <ModalHeader>
              <ModalTitle>프로젝트 문의</ModalTitle>
              <CloseButton onClick={onClose}>×</CloseButton>
            </ModalHeader>
            
            <ModalBody>
              <ModalDescription>
                아래 양식을 작성해주시면 담당자가 빠르게 연락드리겠습니다.
              </ModalDescription>
              
              <Form onSubmit={handleSubmit}>
                <FormRow>
                  <FormGroup>
                    <Label>
                      이름 <Required>*</Required>
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="홍길동"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>
                      회사/기관명 <Required>*</Required>
                    </Label>
                    <Input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="(주)테크사피엔스"
                      required
                    />
                  </FormGroup>
                </FormRow>
                
                <FormRow>
                  <FormGroup>
                    <Label>
                      이메일 <Required>*</Required>
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@company.com"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>
                      연락처 <Required>*</Required>
                    </Label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="010-1234-5678"
                      required
                    />
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <Label>
                      프로젝트 유형 <Required>*</Required>
                    </Label>
                    <Select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">프로젝트 유형을 선택해주세요</option>
                      <option value="웹 개발">웹 개발</option>
                      <option value="모바일 앱">모바일 앱</option>
                      <option value="시스템 구축">시스템 구축</option>
                      <option value="클라우드 마이그레이션">클라우드 마이그레이션</option>
                      <option value="AI/ML 솔루션">AI/ML 솔루션</option>
                      <option value="기타">기타</option>
                    </Select>
                  </FormGroup>
                  <FormGroup>
                    <Label>
                      예상 예산 <Required>*</Required>
                    </Label>
                    <Select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">예산 범위를 선택해주세요</option>
                      <option value="1,000만원 미만">1,000만원 미만</option>
                      <option value="1,000만원 - 3,000만원">1,000만원 - 3,000만원</option>
                      <option value="3,000만원 - 5,000만원">3,000만원 - 5,000만원</option>
                      <option value="5,000만원 - 1억원">5,000만원 - 1억원</option>
                      <option value="1억원 이상">1억원 이상</option>
                      <option value="협의">협의</option>
                    </Select>
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <Label>
                    프로젝트 일정 <Required>*</Required>
                  </Label>
                  <Select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">프로젝트 일정을 선택해주세요</option>
                    <option value="1개월 이내">1개월 이내</option>
                    <option value="1-3개월">1-3개월</option>
                    <option value="3-6개월">3-6개월</option>
                    <option value="6개월 이상">6개월 이상</option>
                    <option value="협의">협의</option>
                  </Select>
                </FormGroup>
                
                <FormGroup>
                  <Label>
                    문의 내용 <Required>*</Required>
                  </Label>
                  <TextArea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="프로젝트 내용, 예산, 일정 등을 자유롭게 작성해주세요"
                    required
                  />
                </FormGroup>

                <CheckboxContainer>
                  <Checkbox
                    type="checkbox"
                    name="privacyAgreement"
                    checked={formData.privacyAgreement}
                    onChange={handleInputChange}
                    required
                  />
                  <CheckboxLabel>
                    개인정보 수집 및 이용에 동의합니다. 
                    <PrivacyLink href="/policy" target="_blank">개인정보처리방침</PrivacyLink>을 확인했습니다.
                    <Required>*</Required>
                  </CheckboxLabel>
                </CheckboxContainer>
                
                <SubmitButton
                  type="submit"
                  disabled={isSubmitting || !formData.privacyAgreement}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? '전송 중...' : '문의 보내기'}
                </SubmitButton>
              </Form>
            </ModalBody>
          </ModalContainer>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
