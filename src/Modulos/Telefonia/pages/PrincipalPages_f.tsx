import React, {ChangeEvent} from 'react'
import '../styles/buttonTable.scss'
import '../styles/tabs.scss'
import {Ilinea2, Ilineas2} from '../interfaces/lineas-interfaces'
import {getLineas} from '../services/telefonia'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import {useEffect, useState} from 'react'
import {PhoneAndroidSharp, CellWifiSharp, AccountCircleSharp, Search} from '@mui/icons-material'
import InfoIcon from '@mui/icons-material/Info'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddBoxIcon from '@mui/icons-material/AddBox'
import CircleIcon from '@mui/icons-material/Circle'
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import BasicModal from './modals/modal-cargo'
import BasicModal2 from './modals/modal-equipo'
import axios from 'axios'
import BasicModal3 from './modals/modal-AltaLinea'
import {TextField} from '@mui/material'

interface TabPanelProps {
   children?: React.ReactNode
   index: number
   value: number
}

function TabPanel(props: TabPanelProps) {
   const {children, value, index, ...other} = props

   return (
      <div
         role='tabpanel'
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}
      >
         {value === index && (
            <Box sx={{p: 3}}>
               <Typography>{children}</Typography>
            </Box>
         )}
      </div>
   )
}

export function LineasActivas() {
   const [Lineasa, setLineasa] = useState<Ilineas2>([])
   //variables de modal
   const [modelState, setmodelState] = useState(false)
   const [modelState2, setmodelState2] = useState(false)
   const [Paginado1, setPaginado1] = useState(0)
   const [SearchActivo, setSearchActivo] = useState('')

   const [objet, setobjet] = useState<Ilinea2>()
   const [compa, setcompa] = useState<Ilinea2>()

   const handleClose = () => setmodelState(false)
   const handleClose2 = () => setmodelState2(false)

   const filtrado2 = (): Ilinea2[] => {
      if (SearchActivo.length === 0) return Lineasa.slice(Paginado1, Paginado1 + 5)

      const filtrado1 = Lineasa.filter((filtro1) => filtro1.numero.includes(SearchActivo))
      return filtrado1.slice(Paginado1, Paginado1 + 5)
   }

   const proxPag = () => {
      if (
         Lineasa.filter((filtro1) => filtro1.numero.includes(SearchActivo)).length >
         Paginado1 + 10
      )
         setPaginado1(Paginado1 + 5)
   }

   const antPag = () => {
      if (Paginado1 > 0) setPaginado1(Paginado1 - 5)
   }

   const mostrarLineas = async () => {
      const res: any = await getLineas()
      setLineasa(res.data.data_todo)
   }

   const onSearchChange = ({target}: ChangeEvent<HTMLInputElement>) => {
      setPaginado1(0)
      setSearchActivo(target.value)
   }

   console.log(objet)
   useEffect(() => {
      mostrarLineas()
   }, [])

   return (
      <div className='container'>
         <h6>NAJC - Lineas Coorporativas</h6>
         <TextField
            type='text'
            id='search'
            name='search'
            className='input_buscar'
            placeholder='Buscar'
            variant='standard'
            label=''
            value={SearchActivo}
            onChange={onSearchChange}
         ></TextField>
         <table className='table1'>
            <thead>
               <tr>
                  <th className='th_luz'></th>
                  <th className='th_nlinea'>Nº Linea</th>
                  <th className='th_cargo'>Cargo</th>
                  <th className='th_cargo'>Plan</th>
                  <th className='th_estado'>Estado</th>
                  <th className='th_opciones'></th>
                  {/* <th></th> */}
               </tr>
            </thead>
            {filtrado2()?.map((linea: Ilinea2) => {
               if (linea.estado_linea != 'Pendiente' && linea.numero != '') {
                  let punto
                  if (linea.cargo.length) {
                     punto = 'tdg'
                  } else {
                     punto = 'tdo'
                  }
                  return (
                     <tbody key={linea._id}>
                        <tr>
                           <td className={punto}>
                              <CircleIcon />
                           </td>

                           <td>{linea.numero}</td>
                           <td>
                              {linea.cargo.map((cargos) => {
                                 if (cargos.estado_cargo != null) {
                                    if (cargos.estado_cargo === true) {
                                       return cargos.nombre + ' ' + cargos.apellido
                                    }
                                 } else {
                                    return 'No asignado'
                                 }
                              })}
                           </td>
                           <td>
                              {linea.consumos.map((consumo_plan) => {
                                 if (consumo_plan.descripcion_concepto.includes('GB Internet')) {
                                    return (
                                       consumo_plan.descripcion_concepto +
                                       ' (' +
                                       consumo_plan.id_plan +
                                       ')'
                                    )
                                 }
                              })}
                           </td>

                           <td>{linea.estado_linea}</td>

                           <td>
                              <button
                                 className='button'
                                 title='Agregar Cargo'
                                 onClick={() => {
                                    console.log(linea)
                                    setobjet(linea), setmodelState(true)
                                 }}
                              >
                                 <AccountCircleSharp />
                              </button>
                              <button
                                 className='button'
                                 title='Agregar Equipo'
                                 onClick={() => {
                                    setcompa(linea), setmodelState2(true)
                                 }}
                              >
                                 <PhoneAndroidSharp />
                              </button>
                              <button className='button' title='Modificar Linea'>
                                 <CellWifiSharp />
                              </button>
                           </td>
                        </tr>
                        <BasicModal
                           modelState={modelState}
                           handleClose={handleClose}
                           lineaTel={objet?.numero}
                        />
                        <BasicModal2
                           modelState2={modelState2}
                           handleClose2={handleClose2}
                           lineaTel={compa?.numero}
                        />
                     </tbody>
                  )
               }
            })}
         </table>{' '}
         <br></br>
         <NavigateBeforeIcon className='button2' onClick={antPag} />
         &nbsp;&nbsp;
         <NavigateNextIcon className='button2' onClick={proxPag} />
      </div>
   )
}

//-----cargos

export function LineasCargos(linea?: string) {
   const [Cargos, setCargos] = useState<Ilineas2>([])
   //variables de modal
   const [modelState, setmodelState] = useState(false)
   const [objet, setobjet] = useState<Ilinea2>()
   const handleClose = () => setmodelState(false)

   const mostrarCargos = async () => {
      const res: any = await getLineas()
      setCargos(res.data.data_todo)
   }

   console.log('HOLA' + linea)
   useEffect(() => {
      mostrarCargos()
   }, [])

   return (
      <div className='container'>
         <table className='table_modal'>
            <thead>
               <tr>
                  <th>Apellido y Nombre</th>
                  <th>DNI</th>
                  <th>Organismo</th>
                  <th>Estado</th>
                  {/* <th></th> */}
               </tr>
            </thead>

            {Cargos.map((linea_c: Ilinea2) => {
               if (linea_c.numero === linea) {
                  {
                     return linea_c.cargo.sort().map((cargos_c) => {
                        let va1
                        let estado
                        if (cargos_c.estado_cargo === true) {
                           va1 = 'tr2'
                           estado = 'Activo'
                        } else {
                           va1 = 'tr1'
                           estado = 'No Activo'
                        }

                        return (
                           <tr className={va1} key={cargos_c._id}>
                              <td>{cargos_c.apellido + ' ' + cargos_c.nombre}</td>
                              <td>{cargos_c.dni}</td>
                              <td>{cargos_c.nombre_dependencia}</td>
                              <td>{estado}</td>
                           </tr>
                        )
                     })
                  }
               }
            })}
         </table>{' '}
      </div>
   )
}

//-----

function LineasConsumos() {
   const [Lineas, setLineas] = useState<Ilineas2>([])
   const mostrarLineas = async () => {
      const res: any = await getLineas()
      setLineas(res.data.data_todo)
   }
   useEffect(() => {
      mostrarLineas()
   }, [])

   const mi_formData = new FormData()

   const filtrarArchivo = (e: any) => {
      const mi_archivo = e.target.files[0]
      console.log(mi_archivo)
      if (e.target && e.target.files[0]) {
         mi_formData.append('file', mi_archivo)
      }
   }

   const SubmitFileData = () => {
      axios({
         method: 'post',
         url: 'http://localhost:3001/api/subirarchivo',
         data: mi_formData,
         headers: {'Content-Type': 'multipart/form-data'},
      })
         // Axios.post('http://localhost:3001/api/subir', {FormData})

         .then((res) => {
            console.log(res)
         })
         .catch((error) => {
            console.log(error)
         })
   }

   return (
      <div className='container'>
         <h6>NAJC - Lineas Coorporativas CONSUMOS</h6>
         <br></br>

         <div>
            <label>
               <input type='file' name='file' onChange={(e) => filtrarArchivo(e)} />
            </label>
            <input type='submit' onClick={SubmitFileData} value='Importar' />
         </div>

         <br></br>

         {/* <button className="buttonCreate"></button>             */}
         <table className='table2 table-bordered'>
            <thead>
               <tr>
                  <th>Ciclo</th>
                  <th>Cant Lineas</th>
                  <th>Total</th>
                  <th></th>
               </tr>
            </thead>

            <tbody>
               <tr>
                  <td>04/12/2020 05/01/2021</td>
                  <td>170</td>
                  <td>$ 3.194.605</td>
                  <td>
                     <button className='button10' title='Modificar Linea'>
                        <NavigateNextOutlinedIcon />
                     </button>
                  </td>
               </tr>
            </tbody>
         </table>
         <br></br>
      </div>
   )
}
//-------------------------------------

function LineasPendientes() {
   const [Lineas, setLineas] = useState<Ilineas2>([])
   const [Activa, setActiva] = useState<Ilinea2>()

   const [modelState3, setmodelState3] = useState(false)
   const [Paginado, setPaginado] = useState(0)
   const [Search, setSearch] = useState('')

   const handleClose3 = () => setmodelState3(false)

   const filtrado1 = (): Ilinea2[] => {
      if (Search.length === 0) return Lineas.slice(Paginado, Paginado + 7)
      const filtrado = Lineas.filter((filtro) => filtro.numero.includes(Search))
      return filtrado.slice(Paginado, Paginado + 7)
   }

   const proxPag = () => {
      setPaginado(Paginado + 5)
   }

   const antPag = () => {
      if (Paginado > 0) setPaginado(Paginado - 5)
   }

   const mostrarLineas = async () => {
      const res: any = await getLineas()
      setLineas(res.data.data_todo)
   }

   const onSearchChange = ({target}: ChangeEvent<HTMLInputElement>) => {
      setPaginado(0)
      setSearch(target.value)
   }

   useEffect(() => {
      mostrarLineas()
   }, [])

   return (
      <div className='container'>
         <h6>NAJC - Lineas Coorporativas PENDIENTES/BAJAS</h6>
         <TextField
            type='text'
            id='search'
            name='search'
            className='input_buscar'
            placeholder='Buscar'
            variant='standard'
            label=''
            value={Search}
            onChange={onSearchChange}
         ></TextField>
         <table className='table1'>
            <thead>
               <tr>
                  <th></th>
                  <th>Nº Linea</th>
                  <th>Plan</th>
                  <th>Estado</th>
                  <th></th>
               </tr>
            </thead>
            {filtrado1()?.map((lineap: Ilinea2) => {
               if (lineap.estado_linea === 'Pendiente' && lineap.numero != '') {
                  return (
                     <tbody key={lineap._id}>
                        <tr>
                           <td className='th_luz'></td>
                           <td className='th_nlinea'>{lineap.numero}</td>
                           <td className='th_plan'>
                              {lineap.consumos.map((consumo_plan) => {
                                 if (consumo_plan.descripcion_concepto.includes('GB Internet')) {
                                    return (
                                       consumo_plan.descripcion_concepto +
                                       ' (' +
                                       consumo_plan.id_plan +
                                       ')'
                                    )
                                 }
                              })}
                           </td>

                           <td className='th_estado'>{lineap.estado_linea}</td>

                           <td className='th_opciones'>
                              <button
                                 className='button'
                                 title='Alta'
                                 onClick={() => {
                                    setActiva(lineap), setmodelState3(true)
                                 }}
                              >
                                 <AddBoxIcon />
                              </button>
                              <button className='button' title='Detalle'>
                                 <InfoIcon />
                              </button>
                              <button className='button' title='Eliminar'>
                                 <DeleteForeverIcon />
                              </button>
                           </td>
                        </tr>
                        <BasicModal3
                           modelState3={modelState3}
                           handleClose3={handleClose3}
                           lineaTel={Activa?.numero}
                        />
                     </tbody>
                  )
               }
            })}
         </table>{' '}
         <br></br>
         <NavigateBeforeIcon className='button2' onClick={antPag} />
         &nbsp;&nbsp;
         <NavigateNextIcon className='button2' onClick={proxPag} />
      </div>
   )
}
//-------------------------------------
export default function BasicTabs() {
   const [value, setValue] = React.useState(0)

   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue)
   }

   return (
      <div className='container'>
         <Box sx={{width: '100 %'}}>
            <Box className='tab_color' sx={{borderBottom: 2, borderColor: 'divider'}}>
               <Tabs value={value} onChange={handleChange} aria-label='tabs'>
                  <Tab label='Lineas Activas' {...LineasActivas} />
                  <Tab label='Lineas Pendientes/Bajas' {...LineasPendientes} />
                  <Tab label='Consumos' {...LineasConsumos} />
               </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
               {LineasActivas()}
            </TabPanel>
            <TabPanel value={value} index={1}>
               {LineasPendientes()}
            </TabPanel>
            <TabPanel value={value} index={2}>
               {LineasConsumos()}
            </TabPanel>
         </Box>
      </div>
   )
}
function setIsPopoverOpen(arg0: boolean): void {
   throw new Error('Function not implemented.')
}
