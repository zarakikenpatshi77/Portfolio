import { ThemeProvider, CssBaseline } from '@mui/material'
import { HelmetProvider } from 'react-helmet-async'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import theme from './theme'
import Layout from './components/Layout'
import Home from './pages/Home'
import Admin from './pages/Admin'
import AdminDashboard from './pages/AdminDashboard'
import PrivateRoute from './components/PrivateRoute'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme(darkMode)}>
        <CssBaseline />
        <BrowserRouter>
          <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <PrivateRoute>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
