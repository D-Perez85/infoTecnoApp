import React from 'react'
import {BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import PrincipalPages_f from '../../Telefonia/pages/PrincipalPages';
import MainPage from '../pages/MainPage';
import NoticiasPages from '../pages/NoticiasPages';

const AppRouter = () => {
  return (
      <Router>
          <div>
              <Routes>
                 <Route path="/" element={<MainPage />} />
                  <Route path="/noticias" element={<NoticiasPages />} />
                  <Route path="/principalf" element={<PrincipalPages_f />} />
              </Routes>
          </div>
      </Router>
  )
}
export default AppRouter; 
