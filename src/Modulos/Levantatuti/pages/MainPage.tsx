import React from "react";
import logo from '../../../../src/logo.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from '@mui/material/Button'
import {Stack} from '@mui/material'


function MainPage() {
    return (
 
       <div className='Main'>
          <header className='Main-header'>
             <img src={logo} className='Main-logo' alt='logo' />
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
 
 export default MainPage; 