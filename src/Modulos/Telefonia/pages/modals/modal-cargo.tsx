import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import {Ilinea2} from '../../interfaces/lineas-interfaces'
import {Form, Formik, FormikValues} from 'formik'
import {TextField} from '@mui/material'
import Collapsible from 'react-collapsible'
import '../../styles/modalc.scss'
import '../../styles/buttonTable.scss'
import {agrePerCarg} from '../../services/telefonia'
import {LineasActivas, LineasCargos} from '../PrincipalPages_f'

//css modal
const style = {
   position: 'absolute',
   left: '50%',
   top: '50%',
   transform: 'translate(-50%, -50%)',
   width: 600,
   bgcolor: 'background.paper',
   border: '2px solid #000',
   boxShadow: 24,
   p: 4,
}

type stateModel = {
   modelState: boolean
   handleClose: () => void
   lineaTel?: string
}

const BasicModal: React.FC<stateModel> = ({modelState, handleClose, lineaTel}) => {
   console.log(lineaTel)
   const cargo: any = {
      numero: lineaTel,
   }
   //    const submitT = (values: Ilinea2, actions: FormikValues) => {
   //       console.log(actions)
   //    }

   return (
      <div>
         <Modal
            open={modelState}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
         >
            <Box sx={style}>
               <Collapsible trigger='Nuevo Cargo'>
                  <Formik
                     initialValues={cargo!}
                     onSubmit={(values, actions) => {
                        console.log({values, actions})
                        agrePerCarg(values).then((res: any) => {
                           console.log(res)
                        })
                        actions.setSubmitting(false)
                     }}
                     validate={(valores) => {
                        const errores: any = {}

                        if (!valores.numero) {
                           errores.numero = 'Por favor ingresar un DNI'
                        }

                        return errores
                     }}
                  >
                     {({values, errors, touched, handleChange, handleBlur}) => (
                        <Form>
                           <TextField
                              type='text'
                              id='numero'
                              name='numero'
                              className='input_hidden'
                              variant='standard'
                              label='Numero'
                              value={values.numero}
                              onChange={handleChange}
                              onBlur={handleBlur}
                           />
                           {touched.numero && errors.numero && <div>Por favor ingresar Numero</div>}

                           <div className='container1'>
                              <div>
                                 <TextField
                                    type='text'
                                    id='dni'
                                    name='dni'
                                    className='input_cargo'
                                    variant='standard'
                                    label='DNI'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                 />
                              </div>
                              <div>
                                 <TextField
                                    type='date'
                                    id='fecha_inicio'
                                    name='fecha_inicio'
                                    className='input_cargo_fecha'
                                    variant='standard'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                 />

                                 <TextField
                                    type='text'
                                    id='nEmpleado'
                                    name='nEmpleado'
                                    className='input_hidden'
                                    variant='standard'
                                    label='Nº Empleado'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                 />
                              </div>
                              <p></p>
                              <div>
                                 <TextField
                                    type='text'
                                    id='apellido'
                                    name='apellido'
                                    className='input_hidden'
                                    variant='standard'
                                    label='Apellido'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                 />
                                 <TextField
                                    type='text'
                                    id='nombre'
                                    name='nombre'
                                    className='input_hidden'
                                    variant='standard'
                                    label='Nombre'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                 />
                              </div>
                              <p></p>
                              <div>
                                 <TextField
                                    type='text'
                                    id='nombreDependencia'
                                    name='nombreDependencia'
                                    className='input_hidden'
                                    variant='standard'
                                    label='Dependencia'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                 />
                                 <TextField
                                    type='text'
                                    id='nombreOrganismo'
                                    name='nombreOrganismo'
                                    className='input_hidden'
                                    variant='standard'
                                    label='Organismo'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                 />
                                 <p></p>

                                 <TextField
                                    type='text'
                                    id='id_dependencia'
                                    name='id_dependencia'
                                    className='input_hidden'
                                    variant='standard'
                                    label='ID Dependencia'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                 />
                                 <TextField
                                    type='text'
                                    id='id_organismo'
                                    name='id_organismo'
                                    className='input_hidden'
                                    variant='standard'
                                    label='ID Organismo'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                 />
                              </div>
                              <p></p>
                              <div>
                                 <TextField
                                    type='text'
                                    id='n_nota'
                                    name='n_nota'
                                    className='input_cargo'
                                    variant='standard'
                                    label='Nº Nota'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                 />
                                 <p></p>
                                 <div>
                                    <Button type='submit' className='button1'>
                                       Guardar
                                    </Button>
                                 </div>
                              </div>
                              <p></p>
                           </div>
                        </Form>
                     )}
                  </Formik>
               </Collapsible>
               <hr></hr>
               <hr></hr>

               <Collapsible trigger='Historial de Cargos'>{LineasCargos(lineaTel)}</Collapsible>
            </Box>
         </Modal>
      </div>
   )
}

export default BasicModal
