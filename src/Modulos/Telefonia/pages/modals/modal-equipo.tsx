import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import {Ilinea2} from '../../interfaces/lineas-interfaces'
import {Form, Formik, FormikValues} from 'formik'
import {FormControl, InputLabel, NativeSelect, TextField} from '@mui/material'
import Select, {SelectChangeEvent} from '@mui/material/Select'

import Collapsible from 'react-collapsible'
import '../../styles/modalc.scss'
import '../../styles/buttonTable.scss'
import {agrePerCarg, postEquipog} from '../../services/telefonia'
import {LineasActivas, LineasCargos} from '../PrincipalPages_f'
import {AccountCircle} from '@mui/icons-material'

//css modal
const style = {
   position: 'absolute',
   left: '50%',
   top: '50%',
   transform: 'translate(-50%, -50%)',
   width: 800,
   bgcolor: 'background.paper',
   border: '2px solid #000',
   boxShadow: 24,
   p: 4,
}

type stateModel2 = {
   modelState2: boolean
   handleClose2: () => void
   lineaTel?: string
}

const opciones_estado = [
   {value: 'activo', label: 'ACTIVO'},
   {value: 'no activo', label: 'NO ACTIVO'},
]

const BasicModal2: React.FC<stateModel2> = ({modelState2, handleClose2, lineaTel}) => {
   const cargo: any = {
      nlinea: lineaTel,
   }
   const submitT = (values: Ilinea2, actions: FormikValues) => {
      console.log(actions)
   }

   return (
      <div>
         <Modal
            open={modelState2}
            onClose={handleClose2}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
         >
            <Box sx={style}>
               <Collapsible trigger='Nuevo Equipo'>
                  <Formik
                     initialValues={cargo!}
                     onSubmit={(values, actions) => {
                        console.log({values, actions})
                        postEquipog(values).then((res: any) => {
                           console.log(res)
                        })
                        actions.setSubmitting(false)
                     }}
                     validate={(valores) => {
                        const errores: any = {}

                        if (!valores.nlinea) {
                           errores.nlinea = 'Por favor ingresar un DNI'
                        }

                        return errores
                     }}
                  >
                     {({values, errors, touched, handleChange, handleBlur}) => (
                        <Form>
                           <TextField
                              type='text'
                              id='nlinea'
                              name='nlinea'
                              className='input_hidden'
                              variant='standard'
                              label='Nº linea'
                              value={values.nlinea}
                              onChange={handleChange}
                              onBlur={handleBlur}
                           />
                           {touched.nlinea && errors.nlinea && <div>Por favor ingresar Numero</div>}

                           <div className='container1'>
                              <div>
                                 <TextField
                                    type='text'
                                    id='marca'
                                    name='marca'
                                    className='input_cargo'
                                    variant='standard'
                                    label='Marca'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                 />

                                 <TextField
                                    type='text'
                                    id='modelo'
                                    name='modelo'
                                    className='input_cargo'
                                    variant='standard'
                                    label='Modelo'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                 />
                              </div>

                              <p></p>

                              <div>
                                 <TextField
                                    type='text'
                                    id='imei'
                                    name='imei'
                                    className='input_cargo'
                                    variant='standard'
                                    label='IMEI'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                 />
                                 <Box sx={{minWidth: 120}}>
                                    <FormControl className='select_lebel'>
                                       <InputLabel variant='standard' htmlFor='uncontrolled-native'>
                                          Compañia
                                       </InputLabel>
                                       <NativeSelect
                                          defaultValue={''}
                                          inputProps={{
                                             name: 'compania',
                                             id: 'compania',
                                          }}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                       >
                                          <option value={''}></option>
                                          <option value={'CLARO'}>CLARO</option>
                                          <option value={'MOVISTAR'}>MOVISTAR</option>
                                          <option value={'PERSONAL'}>PERSONAL</option>
                                       </NativeSelect>
                                    </FormControl>
                                 </Box>
                              </div>

                              <p></p>

                              <div>
                                 <Box sx={{minWidth: 120}}>
                                    <FormControl className='select_lebel'>
                                       <InputLabel variant='standard' htmlFor='uncontrolled-native'>
                                          Estado
                                       </InputLabel>
                                       <NativeSelect
                                          defaultValue={''}
                                          inputProps={{
                                             name: 'estado_equipo',
                                             id: 'estado_equipo',
                                          }}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                       >
                                          <option value={''}></option>
                                          <option value={'true'}>ACTIVO</option>
                                          <option value={'false'}>NO ACTIVO</option>
                                       </NativeSelect>
                                    </FormControl>
                                 </Box>

                                 <Box sx={{minWidth: 120}}>
                                    <FormControl className='select_lebel'>
                                       <TextField
                                          type='date'
                                          id='fecha_inicio'
                                          name='fecha_inicio'
                                          className='input_fecha'
                                          variant='standard'
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                       />
                                    </FormControl>
                                 </Box>
                              </div>

                              <p></p>
                              <p></p>
                           </div>

                           <Button type='submit' className='button1'>
                              Guardar Equipo
                           </Button>
                        </Form>
                     )}
                  </Formik>
               </Collapsible>
               <hr></hr>
               <hr></hr>

               <Collapsible trigger='Historial de Equipos'></Collapsible>
            </Box>
         </Modal>
      </div>
   )
}

export default BasicModal2
