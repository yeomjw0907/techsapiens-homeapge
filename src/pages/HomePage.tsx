import React from 'react';
import styled from 'styled-components';
import HeroSection from '../components/sections/HeroSection';
import ServiceSection from '../components/sections/ServiceSection';
import AboutSection from '../components/sections/AboutSection';
import ProjectSection from '../components/sections/ProjectSection';
import ContactSection from '../components/sections/ContactSection';
import Footer from '../components/Footer';

const HomePageContainer = styled.div`
  min-height: 100vh;
`;

interface HomePageProps {
  onContactClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onContactClick }) => {
  return (
    <HomePageContainer>
      <HeroSection onContactClick={onContactClick} />
      <ServiceSection />
      <AboutSection />
      <ProjectSection />
      <ContactSection onContactClick={onContactClick} />
      <Footer />
    </HomePageContainer>
  );
};

export default HomePage;
