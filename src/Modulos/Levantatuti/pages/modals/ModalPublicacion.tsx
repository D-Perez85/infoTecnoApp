import {Box, Modal} from '@mui/material'
import '../../styles/modalPublicar.scss'
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

const PublicarNoticia = (noticia: string) => {
   const publicarBtn = {
      titulo: noticia,
      mod: 'modpublibtn',
      publicacion: true,
      publicacionView: 'Publicada',
   }
   PublicarNoticiaBTN(publicarBtn)
}

type stateModel = {
   modelStateP: boolean
   handleCloseP: () => void
   objetPub?: Inoticia
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

const ModalPubli: React.FC<stateModel> = ({
   modelStateP,
   handleCloseP,
   objetPub,
   funcionModalP,
   refreshStateC,
}) => {
   return (
      <div>
         <Modal
            open={modelStateP}
            onClose={(_, reason) => {
               if (reason !== 'backdropClick') {
                  handleCloseP()
               }
            }}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
         >
            <Box sx={style} className='modal-container'>
               <button className='buttonCreate-close ' onClick={handleCloseP}>
                  <AiOutlineClose />
               </button>

               <h2 className='titleModalTrash'>¡Atencion!</h2>
               {funcionModalP ? (
                  <p className='textModalTrash'>Publicar esta noticia antes de tiempo?</p>
               ) : (
                  <p className='textModalTrash'>Desea quitar la publicacion?</p>
               )}
               {funcionModalP ? (
                  <button
                     className='ButtonPublicarModal'
                     onClick={() => {
                        PublicarNoticia(objetPub!.titulo), handleCloseP(), refreshStateC()
                     }}
                  >
                     Publicar{' '}
                  </button>
               ) : (
                  <button
                     className='ButtonQuitarPublicacion'
                     onClick={() => {
                        QuitarPublicacion(objetPub!.titulo), handleCloseP(), refreshStateC()
                     }}
                  >
                     Quitar Publicacion{' '}
                  </button>
               )}
            </Box>
         </Modal>
      </div>
   )
}

export default ModalPubli
