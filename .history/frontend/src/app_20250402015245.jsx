import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import PollDetails from './pages/PollDetails'
import UserPolls from './pages/UserPolls'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/polls/:id" element={<PollDetails />} />
        <Route path="/my-polls" element={
          <ProtectedRoute>
            <UserPolls />
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  )
}

export default App