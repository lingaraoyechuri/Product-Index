import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { MainLayout } from './components/MainLayout';
import { HomePage } from './components/HomePage';
import { ToolsPage } from './components/ToolsPage';
import { AboutPage } from './components/AboutPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { GlobalStyle } from './styles/GlobalStyle';

function App() {
  return (
    <>
      <ThemeProvider>
        <GlobalStyle />
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/tools/:id" element={<ProductDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </MainLayout>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;

