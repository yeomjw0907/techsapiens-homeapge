import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeaderContainer = styled(motion.header)<{ scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => props.scrolled ? 'rgba(15, 15, 35, 0.95)' : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  transition: all 0.3s ease;
  padding: 1rem 0;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled(Link)<{ $isActive?: boolean }>`
  color: ${props => props.$isActive ? props.theme.colors.primary : 'white'};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${props => props.$isActive ? '100%' : '0'};
    height: 2px;
    background: ${props => props.theme.colors.gradient};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const ContactButton = styled(motion.button)`
  background: ${props => props.theme.colors.gradient};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

interface HeaderProps {
  onContactClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onContactClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    onContactClick();
  };

  return (
    <HeaderContainer scrolled={scrolled}>
      <Nav>
        <Logo to="/">Techsapiens</Logo>
        <NavLinks>
          <NavItem>
            <NavLink 
              to="/" 
              $isActive={location.pathname === '/'}
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  scrollToSection('home');
                }
              }}
            >
              메인페이지
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink 
              to="/" 
              $isActive={false}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('services');
              }}
            >
              서비스
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink 
              to="/projects"
              $isActive={location.pathname === '/projects'}
            >
              프로젝트
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink 
              to="/" 
              $isActive={false}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('about');
              }}
            >
              회사소개
            </NavLink>
          </NavItem>
          <NavItem>
            <ContactButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactClick}
            >
              프로젝트 문의
            </ContactButton>
          </NavItem>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
