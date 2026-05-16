/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import AiMatching from './pages/AiMatching';
import Jobs from './pages/Jobs';
import Talents from './pages/Talents';
import About from './pages/About';
import AiEducation from './pages/AiEducation';
import MatchingData from './pages/MatchingData';
import SuccessStories from './pages/SuccessStories';
import Community from './pages/Community';
import MyPage from './pages/MyPage';
import Login from './pages/Login';
import RevenueModel from './pages/RevenueModel';
import StoryCommunity from './pages/StoryCommunity';
import AiPolicy from './pages/AiPolicy';

import { InquiryProvider } from './components/ui/InquiryContext';
import { ToastProvider } from './components/ui/Toast';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ToastProvider>
      <InquiryProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="ai-matching" element={<AiMatching />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="talents" element={<Talents />} />
            <Route path="about" element={<About />} />
            <Route path="education" element={<AiEducation />} />
            <Route path="ai-policy" element={<AiPolicy />} />
            <Route path="revenue" element={<RevenueModel />} />
            <Route path="stories-community" element={<StoryCommunity />} />
            <Route path="data" element={<MatchingData />} />
            <Route path="stories" element={<SuccessStories />} />
            <Route path="community" element={<Community />} />
            <Route path="login" element={<Login />} />
            <Route path="mypage" element={<MyPage />} />
          </Route>
        </Routes>
      </Router>
    </InquiryProvider>
  </ToastProvider>
  );
}
