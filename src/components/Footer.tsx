import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background: ${props => props.theme.colors.background};
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: 3rem 0 2rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  margin-bottom: 1rem;
`;

const CompanyDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ContactItem = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  margin: 0;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${props => props.theme.colors.border};
  padding-top: 2rem;
  text-align: center;
`;

const Copyright = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  margin: 0;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <CompanyInfo>
            <Logo to="/">Techsapiens</Logo>
            <CompanyDescription>
              SI-SW 개발/서버관리 전문 기업<br />
              고객의 성공을 위한 최고의 기술 솔루션을 제공합니다.
            </CompanyDescription>
            <ContactInfo>
              <ContactItem>이메일: contact@techsapiens.com</ContactItem>
              <ContactItem>전화: 02-1234-5678</ContactItem>
              <ContactItem>주소: 서울특별시 강남구</ContactItem>
            </ContactInfo>
          </CompanyInfo>
          
          <FooterSection>
            <SectionTitle>서비스</SectionTitle>
            <FooterLinks>
              <FooterLink to="/">맞춤 SI</FooterLink>
              <FooterLink to="/">솔루션</FooterLink>
              <FooterLink to="/">서버관리</FooterLink>
              <FooterLink to="/">유지보수</FooterLink>
            </FooterLinks>
          </FooterSection>
          
          <FooterSection>
            <SectionTitle>회사</SectionTitle>
            <FooterLinks>
              <FooterLink to="/">회사소개</FooterLink>
              <FooterLink to="/projects">프로젝트</FooterLink>
              <FooterLink to="/">인재채용</FooterLink>
              <FooterLink to="/">문의하기</FooterLink>
            </FooterLinks>
          </FooterSection>
          
          <FooterSection>
            <SectionTitle>프로젝트</SectionTitle>
            <FooterLinks>
              <FooterLink to="/projects">전체 프로젝트</FooterLink>
              <FooterLink to="/projects">SI 구축</FooterLink>
              <FooterLink to="/projects">클라우드</FooterLink>
              <FooterLink to="/projects">웹 개발</FooterLink>
            </FooterLinks>
          </FooterSection>
        </FooterContent>
        
        <FooterBottom>
          <Copyright>© 2025 Techsapiens. All rights reserved.</Copyright>
        </FooterBottom>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
