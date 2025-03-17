import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Recipes from './pages/Recipes';
import NewRecipe from './pages/NewRecipe';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Favorites from './pages/Favorites';
import Ingredients from './pages/Ingredients';
import Profile from './pages/Profile';
import MyRecipes from './pages/MyRecipes';
import Navbar from './components/Navbar';
import Subscriptions from './pages/Subscriptions';

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

const AppContent = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    return (
        <div className="min-h-screen">
            {!isLoginPage && <Navbar />}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/recipes/new"
                    element={
                        <ProtectedRoute>
                            <NewRecipe />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/my-recipes"
                    element={
                        <ProtectedRoute>
                            <MyRecipes />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/favorites"
                    element={
                        <ProtectedRoute>
                            <Favorites />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/ingredients"
                    element={
                        <ProtectedRoute>
                            <Ingredients />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/subscriptions"
                    element={
                        <ProtectedRoute>
                            <Subscriptions />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <AppContent />

        </Router>
        
    );
};

export default App;
