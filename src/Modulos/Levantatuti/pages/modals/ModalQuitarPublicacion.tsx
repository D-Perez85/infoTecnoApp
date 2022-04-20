import {Box, Modal} from '@mui/material'
import React from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import {Inoticia} from '../../interfaces/noticias-interfaces'
import {PublicarNoticiaBTN, QuitarPublicacionBTN} from '../../servicios/Noticias-Services'

const QuitarPublicacion = (noticia: string) => {
   const QuitarPubli = {
      titulo: noticia,
      mod: 'modquitarpubli',
      publicacion: false,
      publicacionView: 'No Publicada',
   }
   QuitarPublicacionBTN(QuitarPubli)
}

type stateModel = {
   modelStateQP: boolean
   handleCloseQP: () => void
   objetQPub?: Inoticia
   refreshStateC: () => void
   funcionModalP: boolean
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

const ModalQuitarPubli: React.FC<stateModel> = ({
   modelStateQP,
   handleCloseQP,
   objetQPub,
   refreshStateC,
}) => {
   return (
      <div>
         <Modal
            open={modelStateQP}
            onClose={(_, reason) => {
               if (reason !== 'backdropClick') {
                  handleCloseQP()
               }
            }}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
         >
            <Box sx={style} className='modal-container'>
               <button className='buttonCreate-close ' onClick={handleCloseQP}>
                  <AiOutlineClose />
               </button>

               <h2 className='titleModalTrash'>¡Atencion!</h2>
                 <p className='textModalTrash'>Para poder editar debe quitar la publicacion</p>        
                  <button
                     className='ButtonQuitarPublicacion'
                     onClick={() => {
                        QuitarPublicacion(objetQPub!.titulo), handleCloseQP(), refreshStateC()
                     }}
                  >
                     Quitar Publicacion
                  </button>
              
            </Box>
         </Modal>
      </div>
   )
}

export default ModalQuitarPubli
