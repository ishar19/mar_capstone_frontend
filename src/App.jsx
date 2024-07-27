import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Register from './pages/register'
import Login from './pages/login'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}
export default App
