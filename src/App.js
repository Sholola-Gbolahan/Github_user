import React from "react"
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from "./pages"


import { Routes, BrowserRouter,Route } from "react-router-dom"
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>} index={true} />
          <Route path="/login" element={<Login />} /> 
          <Route path='*' element={<Error/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
