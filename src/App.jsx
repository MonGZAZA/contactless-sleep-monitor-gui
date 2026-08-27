import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SleepProvider } from './context/SleepContext';
import Layout from './components/Layout';
import Simulator from './pages/Simulator';
import Dashboard from './pages/Dashboard';
import Emergency from './pages/Emergency';
import Guide from './pages/Guide';

export default function App() {
  return (
    <BrowserRouter>
      <SleepProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Simulator />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </SleepProvider>
    </BrowserRouter>
  );
}
