import { Box, Modal, Container} from '@mui/material'
import '../../styles/modalInformacion.scss'
import React from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import {Inoticia} from '../../interfaces/noticias-interfaces'
import parse from 'html-react-parser'

type stateModel = {
   modelStateInfo: boolean
   handleCloseInfo: () => void
   objetInfo?: Inoticia
}

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   bgcolor: 'background.paper',
   border: '2px solid #000',
   boxShadow: 24,
  
   p: 4,
}

const ModalInformacion: React.FC<stateModel> = ({modelStateInfo, handleCloseInfo, objetInfo}) => {
   const cuerpo = objetInfo?.cuerpo ? parse(objetInfo.cuerpo) : ''
   return (
      <div>
         <Modal 
            open={modelStateInfo}
            onClose={(_, reason) => {
               if (reason !== 'backdropClick') {
                  handleCloseInfo()
               }
            }}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
         >
            <Container >
               <Box className='BoxInputs modal-container' sx={style}>
                  <button className='buttonCreate-close' onClick={handleCloseInfo}>
                     <AiOutlineClose />
                  </button>                
                     <h2 className='tituloModatInfo'>Información de noticia:</h2>  
                        <div className='conten-info'>
                        <p className='text-titulo'>Titulo: {objetInfo?.titulo}</p>
                        <p>Organizacion: {objetInfo?.nombreOrg}</p>
                        <p>Fecha de Creacion: {objetInfo?.fecha_creacion}</p>
                        <p className='text-cuerpo'>Cuerpo: {cuerpo}</p>
                        <p>Tags: {objetInfo?.tags}</p>
                        <p>Tematicas: {objetInfo?.tematicas}</p>
                        <p>Autor: {objetInfo?.datos_autor.nombre} {objetInfo?.datos_autor.apellido}</p>
                        <p>{objetInfo?.datos_autor.email}</p>
                        
                        <p>Likes: {objetInfo?.likes} Visitas: {objetInfo?.visitas}</p>
                        <p>Creador: {objetInfo?.usuario_creador.nombre}</p>
                        </div>
                           
               </Box>
            </Container>
         </Modal>
      </div>
   )
}

export default ModalInformacion
