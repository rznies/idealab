import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import IdeaDetail from './pages/IdeaDetail';
import SubmitIdea from './pages/SubmitIdea';
import Dashboard from './pages/Dashboard';
import { StoreProvider } from './store';

const App: React.FC = () => {
  return (
    <StoreProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="feed" element={<Home />} />
            <Route path="idea/:id" element={<IdeaDetail />} />
            <Route path="submit" element={<SubmitIdea />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </HashRouter>
    </StoreProvider>
  );
};

export default App;