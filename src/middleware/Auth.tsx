import { Navigate, Outlet } from 'react-router-dom'

const TOKEN_KEY = 'ACCESS_TOKEN'

export default function Auth() {
  const token = localStorage.getItem(TOKEN_KEY)

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
