import React from 'react'
import logo from './logo.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from '@mui/material/Button'

import {Stack} from '@mui/material'

function App() {
   return (
      <div className='App'>
         <header className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <br></br>
            <Stack spacing={2} direction='row'>
               <Button variant='outlined' href='/noticias'>
                  Levantatuti
               </Button>
               <Button variant='outlined' href='/principalf'>
                  Telefonia
               </Button>
            </Stack>
         </header>
      </div>
   )
}

export default App
