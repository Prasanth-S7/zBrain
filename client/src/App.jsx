import { Button } from "./components/ui/button"
import Landing from "./pages/landing"
import Login from "./pages/login"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUp from "./pages/signup"
import Dashboard from "./pages/dashboard"
import { Toaster } from "./components/ui/toaster"
function App() {

  return (
    <div>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
