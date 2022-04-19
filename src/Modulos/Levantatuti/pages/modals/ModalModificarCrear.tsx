import {Formik, Form, Field} from 'formik'
import * as yup from 'yup'
import React, {useEffect, useState} from 'react'
import {Inoticia} from '../../interfaces/noticias-interfaces'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {FormControlLabel, Box, Checkbox, Modal} from '@material-ui/core'
import {Editor} from 'react-draft-wysiwyg'
registerLocale('es', es)
import {registerLocale} from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import {initialValues} from './helpers-noticias'
import es from 'date-fns/locale/es/index.js'
import {convertToRaw, EditorState} from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import DatePicker from 'react-datepicker'
import {prepareDraft} from '../../utils/utilsFunctions'
import {Step, StepLabel, Stepper} from '@mui/material'
import ModalSubirImagen from './modalSubirImg'
import ComponentCargaModal from '../../componentes/ComponentCargaModal'

moment.locale('es-mx')
//*Tipado de props
type stateModel = {
   modelState: boolean
   objet: Inoticia
   handleClose: () => void
   refreshStateC: () => void
   functionModal: boolean
}
//*Estilo de box-modal
const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   bgcolor: 'background.paper',
   border: '2px solid #000',
   boxShadow: 24,
   overflow: 'scroll',
   p: 4,
}

//*props
const BasicModal: React.FC<stateModel> = ({
   modelState,
   handleClose,
   objet,
   refreshStateC,
   functionModal,
}) => {
   //*Menus de el stepper
   const steps = ['Desarrolle la nueva noticia', 'Suba la imagen de portada e imagen miniatura']
   //*Estados de las variables
   const [objectNoticiaEnviar, setobjectNoticiaEnviar] = useState(initialValues)
   const [paginacionValue, setpaginacionValue] = useState<number>(1)
   const [modalData, setmodalData] = useState<Inoticia>(objet)
   const [editorState, setEditorState] = useState(
      modalData.cuerpo ? prepareDraft(modalData.cuerpo) : EditorState.createEmpty()
   )
   const onEditorStateChange = (editorState: EditorState) => {
      setEditorState(editorState)
   }

   //*UseEffect para cargar los datos del objeto noticia , dependiendo del modal editar o crear
   useEffect(() => {
      if (!functionModal) {
         setmodalData(objet)
      } else {
         setmodalData(initialValues)
      }
   }, [objet])

   //*UseEffect para cargar el cuerpo de la noticia, setear el stepper en el 1 , cuando se abre el modal
   useEffect(() => {
      if (modelState) {
         setEditorState(prepareDraft(objet.cuerpo))
         setpaginacionValue(1)
         console.log('Refresco de modal open')
      }
   }, [modelState])

   //*Construccion del modal
   return (
      <div>
         <Modal open={modelState}>
            <Box className='BoxInputs' sx={style}>
               {/*BackArrow para regresar al modal*/}
               {paginacionValue === 2 ? (
                  <button
                     className='button-back'
                     onClick={() => {
                        setpaginacionValue(1)
                     }}
                  >
                     {'<'}
                  </button>
               ) : null}
               {/*CloseButton*/}
               <button
                  className='buttonCreate-close '
                  onClick={() => {
                     handleClose()
                     refreshStateC()
                  }}
               >
                  X
               </button>
               {/*Stepper Crear o Editar noticias*/}
               <Stepper activeStep={paginacionValue} alternativeLabel>
                  {steps.map((label) => (
                     <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                     </Step>
                  ))}
               </Stepper>
               <Formik
                  initialValues={modalData}
                  onSubmit={(values, actions) => {
                     values.cuerpo = draftToHtml(convertToRaw(editorState.getCurrentContent()))
                     if (functionModal) {
                        setobjectNoticiaEnviar(values)
                        /*  crearNoticia(values) */
                     } else {
                        setobjectNoticiaEnviar(values)
                        /*  editarNoticias(values) */
                     }
                     /* actions.setSubmitting(false) */
                     /*  handleClose() */
                     /*  refreshStateC() */
                     setpaginacionValue(2)
                  }}
                  validationSchema={validate}
                  enableReinitialize
               >
                  {(formik) => {
                     //*UseState de fechas baja/subida
                     const [fechaPublic, setFechaPublic] = useState(
                        modalData.fecha_publicacion ? true : false
                     )
                     const [fechaBaja, setFechaBaja] = useState(modalData.fecha_baja ? true : false)

                     const uno = (
                        <div>
                           <Form className='formInputs'>
                              <div className='TextField inputTitulo'>
                                 <Field
                                    type='input'
                                    name='titulo'
                                    placeholder='Titulo'
                                    className='inputTitulo'
                                 />
                                 {formik.errors.titulo && formik.touched.titulo ? (
                                    <div style={{color: 'red'}}>{formik.errors.titulo}</div>
                                 ) : null}
                              </div>

                              <div>
                                 <Field
                                    type='input'
                                    name='tags'
                                    placeholder='Tags'
                                    className='TextField inputTags'
                                 />
                              </div>
                              <div>
                                 <Field
                                    type='input'
                                    name='tematicas'
                                    placeholder='Tematicas'
                                    className='TextField inputTematicas'
                                 />
                              </div>

                              {functionModal ? (
                                 <div>
                                    <Field
                                       type='input'
                                       name='datos_autor.nombre'
                                       placeholder='Nombre autor'
                                       className='TextField inputNombreAutor'
                                    />
                                    {formik.errors.datos_autor?.nombre &&
                                    formik.touched.datos_autor?.nombre ? (
                                       <div style={{color: 'red'}}>
                                          {formik.errors.datos_autor.nombre}
                                       </div>
                                    ) : null}
                                 </div>
                              ) : null}

                              {functionModal ? (
                                 <div>
                                    <Field
                                       type='input'
                                       name='datos_autor.apellido'
                                       placeholder='Apellido autor'
                                       className='TextField inputApellidoAutor'
                                    />
                                    {formik.errors.datos_autor?.apellido &&
                                    formik.touched.datos_autor?.apellido ? (
                                       <div style={{color: 'red'}}>
                                          {formik.errors.datos_autor.apellido}
                                       </div>
                                    ) : null}
                                 </div>
                              ) : null}

                              {functionModal ? (
                                 <div className='inputEmailAutor TextField'>
                                    <Field
                                       type='input'
                                       name='datos_autor.email'
                                       placeholder='Email autor'
                                       className='inputEmailAutor'
                                    />

                                    {formik.errors.datos_autor?.email &&
                                    formik.touched.datos_autor?.email ? (
                                       <div style={{color: 'red'}}>
                                          {formik.errors.datos_autor.email}
                                       </div>
                                    ) : null}
                                 </div>
                              ) : null}

                              <div className={functionModal ? 'inputCuerpo2' : 'inputCuerpo'}>
                                 <Field
                                    type='input'
                                    name='cuerpo'
                                    className={functionModal ? 'inputCuerpo2' : 'inputCuerpo'}
                                 >
                                    {() => {
                                       return (
                                          <Editor
                                             editorState={editorState}
                                             placeholder='Cuerpo de la noticia'
                                             onEditorStateChange={onEditorStateChange}
                                             wrapperClassName='wrapper-class'
                                             editorClassName='editorClass '
                                          ></Editor>
                                       )
                                    }}
                                 </Field>
                              </div>

                              <FormControlLabel
                                 className={functionModal ? 'checkpubli2' : 'checkpubli'}
                                 control={
                                    <Checkbox
                                       checked={fechaPublic}
                                       onChange={() => setFechaPublic(fechaPublic ? false : true)}
                                    />
                                 }
                                 label='Fecha de publicación'
                              />

                              <div>
                                 <Field
                                    type='input'
                                    name='fecha_publicacion'
                                    className={functionModal ? 'inputFecha2' : 'inputFecha'}
                                 >
                                    {() => (
                                       <DatePicker
                                          onKeyDown={(e) => {
                                             e.preventDefault()
                                          }}
                                          disabled={!fechaPublic}
                                          dateFormat='dd/MM/yyyy'
                                          selected={
                                             formik.values.fecha_publicacion
                                                ? moment(
                                                     formik.values.fecha_publicacion,
                                                     'DD/MM/YYYY'
                                                  ).toDate()
                                                : null
                                          }
                                          onChange={(e) => {
                                             formik.values.fecha_publicacion =
                                                moment(e).format('DD/MM/YYYY')
                                             formik.setFieldValue(
                                                'fecha_publicacion',
                                                moment(e).format('DD/MM/YYYY')
                                             )
                                          }}
                                          className='webix_dataview_item'
                                          locale='es'
                                          placeholderText='Seleccione una fecha'
                                       />
                                    )}
                                 </Field>
                              </div>

                              <FormControlLabel
                                 className={functionModal ? 'checkbaja2' : 'checkbaja'}
                                 control={
                                    <Checkbox
                                       checked={fechaBaja}
                                       onChange={() => setFechaBaja(fechaBaja ? false : true)}
                                    />
                                 }
                                 label='Fecha de bajada'
                              />

                              <div>
                                 <Field
                                    type='input'
                                    name='fecha_baja'
                                    className={
                                       functionModal ? 'inputfechaDeBaja2' : 'inputfechaDeBaja'
                                    }
                                 >
                                    {() => {
                                       return (
                                          <DatePicker
                                             onKeyDown={(e) => {
                                                e.preventDefault()
                                             }}
                                             disabled={!fechaBaja}
                                             dateFormat='dd/MM/yyyy'
                                             selected={
                                                formik.values.fecha_baja
                                                   ? moment(
                                                        formik.values.fecha_baja,
                                                        'DD/MM/YYYY'
                                                     ).toDate()
                                                   : null
                                             }
                                             onChange={(e) => {
                                                formik.setFieldValue(
                                                   'fecha_baja',
                                                   formik.values.fecha_baja
                                                )

                                                formik.values.fecha_baja =
                                                   moment(e).format('DD/MM/YYYY')
                                             }}
                                             locale='es'
                                             className='webix_dataview_item '
                                             placeholderText='Seleccione una fecha'
                                          />
                                       )
                                    }}
                                 </Field>
                              </div>

                              <button
                                 className={functionModal ? 'inputButton2' : 'inputButton'}
                                 type='submit'
                                 onClick={() => {
                                    refreshStateC()
                                 }}
                              >
                                 Submit
                              </button>
                           </Form>
                        </div>
                     )
                     //*Switch de renderizado de modal
                     {
                        switch (paginacionValue) {
                           case 1:
                              return uno

                           case 2:
                              return (
                                 <ModalSubirImagen
                                    handleClose={handleClose}
                                    objectNoticiaEnviar={objectNoticiaEnviar}
                                    refreshStateC={refreshStateC}
                                    functionModal={functionModal}
                                    modelState={modelState}
                                    setpaginacionValue={setpaginacionValue}
                                 />
                              )

                           case 3:
                              return <ComponentCargaModal />

                           default:
                              return uno
                        }
                     }
                  }}
               </Formik>
            </Box>
         </Modal>
      </div>
   )
}

export default BasicModal

//Validaciones de Formularios

const validate = yup.object().shape({
   titulo: yup
      .string()
      .required('El titulo es requerido')
      .max(60, 'El titulo no puede tener mas de 50 caracteres'),

   datos_autor: yup.object().shape({
      nombre: yup.string().required('El nombre es requerido'),
      apellido: yup.string().required('El apellido es requerido'),
      email: yup.string().required('El email es requerido').email('El email no es válido'),
   }),
})
