import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecognitionPage from './pages/RecognitionPage'; 
import PresencasRegistradas from './pages/PresencasRegistradas'; 
import UsuariosCadastrados from './pages/UsuariosCadastrados'; 
import FaceCapturePage from './pages/FaceCapturePage';
import RegistroLogin from './pages/RegistroLogin';
import Logout from './pages/Logout';
import Navbar from './components/Navbar';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  const videoRef = useRef(null);

  return (
    <AuthProvider>
      <Router>
        <Navbar /> 
        <Routes>
        <Route path="/cadastrar" element={<PrivateRoute element={() => <FaceCapturePage videoRef={videoRef} />} />} />
          <Route path="/reconhecer" element={<RecognitionPage />} />
          <Route path="/usuarios" element={<PrivateRoute element={UsuariosCadastrados} />} />
          <Route path="/presencas" element={<PrivateRoute element={PresencasRegistradas} />} />
          <Route path="/login" element={<RegistroLogin />} />
          <Route path="/logout"  element={<Logout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
