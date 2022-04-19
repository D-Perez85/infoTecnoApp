import {Box, Modal, Link} from '@mui/material'
import '../../styles/modalPreview.scss'
import React from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import {Inoticia} from '../../interfaces/noticias-interfaces'
import parse from 'html-react-parser'

type stateModel = {
   modelStatePreview: boolean
   handleClosePreview: () => void
   objetPreview?: Inoticia
}

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

const ModalPreview: React.FC<stateModel> = ({
   modelStatePreview,
   handleClosePreview,
   objetPreview,
}) => {
   const cuerpo = objetPreview?.cuerpo ? parse(objetPreview.cuerpo) : ''
   return (
      <div>
         <Modal
            open={modelStatePreview}
            onClose={(_, reason) => {
               if (reason !== 'backdropClick') {
                  handleClosePreview()
               }
            }}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
         >
            <Box className='BoxInputs' sx={style}>
               <button className='buttonCreate-close ' onClick={handleClosePreview}>
                  <AiOutlineClose />
               </button>
               <Link>
                  <p>{objetPreview?.tematicas}</p>
               </Link>
               <h2 className='titulo'>{objetPreview?.titulo}</h2>
               <img
                  src={objetPreview?.imagen?.filter((e) => e.tipo === 'portada')[0].url}
                  alt=''
                  className='imagen'
               />

               <p className='cuerpoPreview'>{cuerpo}</p>
               <p>{objetPreview?.tags}</p>
            </Box>
         </Modal>
      </div>
   )
}

export default ModalPreview
