import React from "react"; 
import {AiOutlineSearch} from 'react-icons/ai'


export const ConteinerSearch = ({busqueda, handleChange}: {busqueda:string, handleChange: () => void}) =>{
    return (
        <div className='conteinerSerch'>

        <input
           className='form-control inputSerch'
           type='text'
           placeholder='Buscar...'
           value={busqueda}
           onChange={handleChange}
        />
        <button className='buttonSearch'>
           <AiOutlineSearch />
        </button>
     </div>
     
    )
}