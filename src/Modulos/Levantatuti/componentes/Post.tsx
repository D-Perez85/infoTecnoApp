import React, {useEffect, useState} from 'react'; 
import {
   FaRegThumbsDown,
   FaEdit,
   FaInfo,
   FaCheck,
   FaFileImage,
   FaEye,
   FaRegThumbsUp,
} from 'react-icons/fa'
import {Inoticia, Inoticias} from '../interfaces/noticias-interfaces'
import {
   Table,
   TableContainer,
   TableHead,
   TableRow,
   TableCell,
   TableBody,
   FormControlLabel,
   Checkbox,
} from '@material-ui/core'
import ModalPublicacion from '../pages/modals/ModalPublicacion'
import ModalEstado from '../pages/modals/ModalEstado'
import ModalInformacion from '../pages/modals/ModalInfomacion'
import {initialValues} from '../pages/modals/helpers-noticias'
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'
import BasicModal from '../pages/modals/ModalModificarCrear'
import ModalPreview from '../pages/modals/ModalPreview'
import ModalQuitarPublicacion from '../pages/modals/ModalQuitarPublicacion'

type statePost = {
   posts?: Inoticias
   loading: boolean
   busqueda: string
   handleChange: any
   BuscarFechaCreacion: string
   buscarFechaPublicacion: string
   handleChangeFechaCreacion: any
   handleChangeFechaPublicacion: any
   checkedOne: any
   handleChangeOne: any
   refreshN: () => void
}
const Posts: React.FC<statePost> = ({
   posts,
   loading,
   busqueda,
   handleChange,
   BuscarFechaCreacion,
   handleChangeFechaCreacion,
   buscarFechaPublicacion,
   handleChangeFechaPublicacion,
   checkedOne,
   handleChangeOne,
   refreshN,
}) => {
   const [modelStateInfo, setmodelStateInfo] = useState(false)
   const [objetInfo, setobjetInfo] = useState<Inoticia>()
   const [functionModal, setfunctionModal] = useState(false)
   const handleCloseInfo = () => setmodelStateInfo(false)
   //modalInfo

   const [modelState, setmodelState] = useState(false)
   const [refreshState, setrefreshState] = useState(false)
   const [objet, setobjet] = useState<Inoticia>(initialValues)
   const handleClose = () => setmodelState(false)
   const refreshStateC = () => setrefreshState(refreshState ? false : true)
   //Modal Editar

   const [modelStateE, setmodelStateE] = useState(false)
   const handleCloseE = () => setmodelStateE(false)
   const [objetE, setobjetE] = useState<Inoticia>()
   const [functionMdaleE, setfunctionMdaleE] = useState(false)
   //Modal baja

   const [modelStateP, setmodelStateP] = useState(false)
   const [objetPub, setobjetPub] = useState<Inoticia>()
   const handleCloseP = () => setmodelStateP(false)
   const [functionModalP, setfunctionModalp] = useState(false)
   //Modal Publicacion

   const [modelStateQP, setmodelStateQP] = useState(false)
   const [objetQPub, setobjetQPub] = useState<Inoticia>()
   const handleCloseQP = () => setmodelStateQP(false)

   const [modelStatePreview, setmodelStatePreview] = useState(false)
   const [objetPreview, setobjetPreview] = useState<Inoticia>()
   const handleClosePreview = () => setmodelStatePreview(false)
   //Modal Preview

   useEffect(() => {
      if (!modelState) {
         refreshN()
      }
   }, [refreshState])

   if (loading) {
      return <h2>Loading...</h2>
   } //Loading de carga pagina principal

   return (
      <div className='test'>
         <button
            className='buttonCreate'
            onClick={() => {
               setfunctionModal(true), setobjet(initialValues), setmodelState(true)
            }}
         >
            Nueva Noticia
         </button>

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
         <div className='Form-Control checknoticias'>
            <FormControlLabel
               value='end'
               control={<Checkbox value={checkedOne} onChange={handleChangeOne} />}
               label='Noticias publicadas'
               labelPlacement='end'
            />
         </div>
         <div className='Container-Table'>
            <TableContainer className='Table-Conteiner'>
               <Table className='table'>
                  <TableHead className='table-head'>
                     <TableRow className='row-table'>
                        <TableCell className='cell-table '>Titulo</TableCell>
                        <TableCell className='cell-table'>
                           Fecha Creacion
                           <TableRow>
                              <input
                                 type='date'
                                 onChange={handleChangeFechaCreacion}
                                 value={BuscarFechaCreacion}
                              />
                           </TableRow>
                        </TableCell>
                        <TableCell className='cell-table'>Ultima Modificacion</TableCell>
                        <TableCell className='cell-table'>
                           Fecha Publicacion
                           <TableRow>
                              <input
                                 type='date'
                                 onChange={handleChangeFechaPublicacion}
                                 value={buscarFechaPublicacion}
                              />
                           </TableRow>
                        </TableCell>
                        <TableCell className='cell-table'> Estado</TableCell>
                        <TableCell className='cell-table'>Publicacion</TableCell>
                        <TableCell className='cell-table'>Acciones</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {posts?.map((post: Inoticia) => {
                        return (
                           <TableRow key={post._id}>
                              <TableCell className='cell-table text-titulo'>
                                 {post.titulo}
                              </TableCell>
                              <TableCell className='cell-table'>{post.fecha_creacion}</TableCell>
                              <TableCell className='cell-table'>{post.fecha_edicion}</TableCell>
                              <TableCell className='cell-table'>{post.fecha_publicacion}</TableCell>
                              <TableCell className='cell-table'>
                                 {post.estado ? (
                                    <p className='activo'>{post.estadoF}</p>
                                 ) : (
                                    <p className='inactivo'>{post.estadoF}</p>
                                 )}
                              </TableCell>
                              <TableCell className='cell-table'>{post.publicacionView}</TableCell>
                              <TableCell className='cell-table'>
                                 {' '}
                                 {post.publicacion ? (
                                    <button
                                       className='buttonPublicar tooltip-test pointer'
                                       title='Quitar Publicacion'
                                       onClick={() => {
                                          setobjetQPub(post),
                                             setmodelStateQP(true),
                                             setfunctionModalp(false)
                                       }}
                                    >
                                       <FaEdit />
                                    </button>
                                 ) : (
                                    <button
                                       className='buttonEdit tooltip-test pointer'
                                       title='Editar'
                                       onClick={() => {
                                          setfunctionModal(false),
                                             setobjet(post),
                                             setmodelState(true)
                                       }}
                                    >
                                       <FaEdit />
                                    </button>
                                 )}
                                 {post.estado ? (
                                    <button
                                       className='buttonDelet tooltip-test pointer'
                                       title='Baja'
                                       onClick={() => {
                                          setobjetE(post),
                                             setmodelStateE(true),
                                             setfunctionMdaleE(true)
                                       }}
                                    >
                                       <FaRegThumbsDown />
                                    </button>
                                 ) : (
                                    <button
                                       className='buttonAlta tooltip-test pointer'
                                       title='Alta'
                                       onClick={() => {
                                          setobjetE(post),
                                             setmodelStateE(true),
                                             setfunctionMdaleE(false)
                                       }}
                                    >
                                       <FaRegThumbsUp />
                                    </button>
                                 )}
                                 <button
                                    className='buttonVew pointer'
                                    onClick={() => {
                                       setobjetInfo(post), setmodelStateInfo(true)
                                    }}
                                 >
                                    <FaInfo />
                                 </button>
                                 <button
                                    className='buttonPublicar tooltip-test pointer'
                                    title='SubirImagen'
                                 >
                                    <FaFileImage />
                                 </button>
                                 {post.publicacion ? (
                                    <button
                                       className='buttonPublicar tooltip-test pointer'
                                       title='Quitar Publicacion'
                                       onClick={() => {
                                          setobjetPub(post),
                                             setmodelStateP(true),
                                             setfunctionModalp(false)
                                       }}
                                    >
                                       <AiOutlineClose />
                                    </button>
                                 ) : (
                                    <button
                                       className='buttonPublicar tooltip-test'
                                       title='Publicar'
                                       onClick={() => {
                                          setobjetPub(post),
                                             setmodelStateP(true),
                                             setfunctionModalp(true)
                                       }}
                                    >
                                       <FaCheck />
                                    </button>
                                 )}
                                 <button
                                    className='buttonPublicar tooltip-test'
                                    title='VistaPrevia'
                                    onClick={() => {
                                       setobjetPreview(post), setmodelStatePreview(true)
                                    }}
                                 >
                                    <FaEye />
                                 </button>
                              </TableCell>
                           </TableRow>
                        )
                     })}
                  </TableBody>
               </Table>
            </TableContainer>
         </div>

         <BasicModal
            modelState={modelState}
            handleClose={handleClose}
            objet={objet}
            refreshStateC={refreshStateC}
            functionModal={functionModal}
         />

         <ModalEstado
            refreshStateC={refreshStateC}
            modelStateE={modelStateE}
            handleCloseE={handleCloseE}
            objetE={objetE}
            functionMdaleE={functionMdaleE}
         />
         <ModalPublicacion
            refreshStateC={refreshStateC}
            modelStateP={modelStateP}
            handleCloseP={handleCloseP}
            objetPub={objetPub}
            funcionModalP={functionModalP}
         />

         <ModalInformacion
            modelStateInfo={modelStateInfo}
            handleCloseInfo={handleCloseInfo}
            objetInfo={objetInfo}
         />

         <ModalPreview
            modelStatePreview={modelStatePreview}
            handleClosePreview={handleClosePreview}
            objetPreview={objetPreview}
         />

         <ModalQuitarPublicacion
            refreshStateC={refreshStateC}
            modelStateQP={modelStateQP}
            handleCloseQP={handleCloseQP}
            objetQPub={objetQPub}
            funcionModalP={functionModalP}
         />
      </div>
   )
}
export default Posts; 
