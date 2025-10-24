import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Header from './components/Header';
import ContactModal from './components/ContactModal';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AdminPage from './pages/AdminPage';

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <div className="App">
          <Header onContactClick={openContactModal} />
        <Routes>
          <Route path="/" element={<HomePage onContactClick={openContactModal} />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage onContactClick={openContactModal} />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
          <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;