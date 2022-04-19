import React, {useEffect, useState} from 'react'
import {FaRegTrashAlt, FaFileUpload, FaSearch} from 'react-icons/fa'
import {Ilineas2} from '../interfaces/lineas-interfaces'
import {getLineas} from '../services/telefonia'

const el_texto = 'GB Internet'

export default function PrincipalPages() {
   const [Lineas, setLineas] = useState<Ilineas2>([])

   const mostrarLineas = async () => {
      const res: any = await getLineas()
      setLineas(res.data.data_todo)
   }
   useEffect(() => {
      mostrarLineas()
   }, [])

   return (
      <div className='container'>
         <h2>Lineas Coorporativas - NAJC</h2>
         <br></br>

         {/* <button className="buttonCreate"></button>             */}
         <table className='table table-bordered'>
            <thead>
               <tr>
                  <th>Nº Linea</th>
                  <th>Cargo</th>
                  <th>Plan</th>
                  <th>Estado</th>
                  <th>Opciones</th>
                  {/* <th></th> */}
               </tr>
            </thead>
            {Lineas?.map((linea) => {
               if (linea.estado_linea != 'Pendiente') {
                  return (
                     <tbody key={linea._id}>
                        <tr>
                           <td>{linea.numero}</td>
                           <td>
                              {linea.cargo.map((cargos) => {
                                 if (cargos.estado_cargo === true) {
                                    return cargos.nombre
                                 } else {
                                    return 'No asignado'
                                 }
                              })}
                           </td>
                           <td>
                              {linea.consumos.map((consumo_plan) => {
                                 if (consumo_plan.descripcion_concepto.includes(el_texto)) {
                                    return (
                                       consumo_plan.descripcion_concepto +
                                       ' (' +
                                       consumo_plan.id_plan +
                                       ')'
                                    )
                                 }
                              })}
                           </td>
                           <td>
                              <td>{linea.estado_linea}</td>
                           </td>
                           <td>
                              <td>
                                 <button className='buttonEdit tooltip-test' title='Editar'>
                                    <FaFileUpload />
                                 </button>
                                 <button className='buttonDelet'>
                                    <FaRegTrashAlt />
                                 </button>
                                 <button className='buttonVew'>
                                    <FaSearch />
                                 </button>
                              </td>
                           </td>
                        </tr>
                     </tbody>
                  )
               }
            })}
         </table>
      </div>
   )
}
