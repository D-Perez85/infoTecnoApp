import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import NoticiasPages from './Modulos/Levantatuti/pages/NoticiasPages'
import PrincipalPages_f from './Modulos/Telefonia/pages/PrincipalPages_f'
import './Modulos/Levantatuti/styles/styles.scss'; 




ReactDOM.render(
   <BrowserRouter>
      <Routes>    
         <Route path='/' element={<App />} />
         <Route path='/noticias' element={<NoticiasPages />} />
         <Route path='/principalf' element={<PrincipalPages_f />} />
      </Routes>
   </BrowserRouter>,
   document.getElementById('root')
)
reportWebVitals()
