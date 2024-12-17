import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Recipes from './pages/Recipes';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import Favorites from './pages/Favorites';
import Ingredients from './pages/Ingredients';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  return (
    <div className="min-h-screen">
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/my-recipes" element={<Navigate to="/recipes" replace />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
