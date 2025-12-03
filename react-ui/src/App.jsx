import { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage/LoginPage'
import Dashboard from './pages/Dashboard/Dashboard'
import './index.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
   
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsLoggedIn(true)
    }
    setLoading(false)
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    setIsLoggedIn(true)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem('user')
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="App">
      {isLoggedIn ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <LoginPage onLoginSuccess={handleLogin} />
      )}
    </div>
  )
}

export default App