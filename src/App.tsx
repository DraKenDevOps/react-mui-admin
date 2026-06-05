import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './middleware/Auth'
import AdminLayout from './layouts/AdminLayout'
import Login from './pages/Login'
import Home from './pages/Home'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Auth />}>
          <Route element={<AdminLayout />}>
            <Route path="/app" element={<Home />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/app" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
