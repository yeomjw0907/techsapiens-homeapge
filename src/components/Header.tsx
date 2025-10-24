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

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    gap: 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
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

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'block' : 'none'};
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1rem;
  box-shadow: ${props => props.theme.shadows.lg};
  z-index: 1000;

  @media (min-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const MobileNavLinks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MobileNavItem = styled.li`
  width: 100%;
`;

const MobileNavLink = styled(Link)<{ $isActive?: boolean }>`
  display: block;
  color: ${props => props.$isActive ? props.theme.colors.primary : props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.surfaceLight};
    color: ${props => props.theme.colors.primary};
  }
`;

interface HeaderProps {
  onContactClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onContactClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      // 메인 페이지가 아닌 경우 메인 페이지로 이동 후 스크롤
      window.location.href = `/#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  const handleContactClick = () => {
    onContactClick();
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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
            <NavLink 
              to="/admin"
              $isActive={location.pathname === '/admin'}
            >
              관리자
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
        <MobileMenuButton
          onClick={toggleMobileMenu}
          whileTap={{ scale: 0.95 }}
        >
          ☰
        </MobileMenuButton>
      </Nav>
      <MobileMenu $isOpen={mobileMenuOpen}>
        <MobileNavLinks>
          <MobileNavItem>
            <MobileNavLink 
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
            </MobileNavLink>
          </MobileNavItem>
          <MobileNavItem>
            <MobileNavLink 
              to="/" 
              $isActive={false}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('services');
              }}
            >
              서비스
            </MobileNavLink>
          </MobileNavItem>
          <MobileNavItem>
            <MobileNavLink 
              to="/projects"
              $isActive={location.pathname === '/projects'}
            >
              프로젝트
            </MobileNavLink>
          </MobileNavItem>
          <MobileNavItem>
            <MobileNavLink 
              to="/" 
              $isActive={false}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('about');
              }}
            >
              회사소개
            </MobileNavLink>
          </MobileNavItem>
          <MobileNavItem>
            <MobileNavLink 
              to="/admin"
              $isActive={location.pathname === '/admin'}
            >
              관리자
            </MobileNavLink>
          </MobileNavItem>
          <MobileNavItem>
            <ContactButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactClick}
            >
              프로젝트 문의
            </ContactButton>
          </MobileNavItem>
        </MobileNavLinks>
      </MobileMenu>
    </HeaderContainer>
  );
};

export default Header;
