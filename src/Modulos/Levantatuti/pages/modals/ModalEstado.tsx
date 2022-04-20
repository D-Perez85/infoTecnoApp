import {Box, Modal} from '@mui/material'
import {patchBajarNoticia, patchAltaNoticia} from '../../servicios/Noticias-Services'
import React from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import {Inoticia} from '../../interfaces/noticias-interfaces'

const BajaNoticia = (noticia: string) => {
   const baja = {
      titulo: noticia,
      mod: 'modestado',
      estado: false,
      estadoF: 'Inactiva',
   }
   patchBajarNoticia(baja)
}

const AltaNoticia = (noticia: string) => {
   const alta = {
      titulo: noticia,
      mod: 'modestado',
      estado: true,
      estadoF: 'Activa',
   }
   patchAltaNoticia(alta)
}

type stateModel = {
   modelStateE: boolean
   handleCloseE: () => void
   objetE?: Inoticia
   refreshStateC: () => void
   functionMdaleE: boolean
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

const ModalEstado: React.FC<stateModel> = ({
   modelStateE,
   handleCloseE,
   objetE,
   refreshStateC,
   functionMdaleE,
}) => {
   return (
      <div>
         <Modal
            open={modelStateE}
            onClose={(_, reason) => {
               if (reason !== 'backdropClick') {
                  handleCloseE()
               }
            }}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
         >
            <Box sx={style} className='modal-container'>
               <button className='buttonCreate-close ' onClick={handleCloseE}>
                  <AiOutlineClose />
               </button>
               <h2 className='titleModal'>¡Atencion!</h2>
               {functionMdaleE ? (
                  <p className='textModal'>Estas Seguro de dar de baja la Noticia?</p>
               ) : (
                  <p className='textModal'>Dar de Alta la Noticia</p>
               )}
               {functionMdaleE ? (
                  <button
                     className='ButtonBajaNoticia'
                     onClick={() => {
                        BajaNoticia(objetE!.titulo), handleCloseE(), refreshStateC()
                     }}
                  >
                      Bajar Noticia{' '}
                  </button>
               ) : (
                  <button
                     className='ButtonAltaNoticia'
                     onClick={() => {
                        AltaNoticia(objetE!.titulo), handleCloseE(), refreshStateC()
                     }}
                  >
                      Alta Noticia{' '}
                  </button>
               )}
            </Box>
         </Modal>
      </div>
   )
}
export default ModalEstado; 
