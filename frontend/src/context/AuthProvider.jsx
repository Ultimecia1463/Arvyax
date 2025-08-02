import { createContext, useState, useEffect, useContext } from 'react'

const AuthContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const data = sessionStorage.getItem('user')
    if (data) setUser(JSON.parse(data))
    setLoading(false)
  }, [])

  const login = (token, userData) => {
    const payload = { ...userData, token }
    sessionStorage.setItem('user', JSON.stringify(payload))
    setUser(payload)
  }

  const logout = () => {
    sessionStorage.removeItem('user')
    setUser(null)
  }

  if (loading) return <div className="flex justify-center items-center min-h-screen">
    <span className="loading loading-infinity text-secondary w-100"></span>
  </div>

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}