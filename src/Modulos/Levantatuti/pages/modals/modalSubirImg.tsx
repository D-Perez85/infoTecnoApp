import React, {useEffect, useState} from 'react'
import {Inoticia} from '../../interfaces/noticias-interfaces'
import '../../styles/modalSubirImagen.scss'
import {postSubirImagen, crearNoticia, editarNoticias} from '../../servicios/Noticias-Services'

//*Envio de imagenes a Api
let imageFile: File
let imageFile2: File

//*Tipado de props

type stateModel = {
   handleClose: () => void
   objectNoticiaEnviar: Inoticia
   refreshStateC: () => void
   functionModal: boolean
   modelState: boolean
   setpaginacionValue: (n: number) => void
}

const ModalSubirImagen: React.FC<stateModel> = ({
   handleClose,
   objectNoticiaEnviar,
   refreshStateC,
   functionModal,
   modelState,
   setpaginacionValue,
}) => {
   const SubirImagen = async (
      noticia: string,
      imageFile: File,
      imageFile2: File,
      objectNoticiaEnviar: Inoticia,

      imagenCargadaActiva: boolean
   ) => {
      //*Crea la noticia o edita la noticia segun valor functionModal
      if (functionModal) {
         objectNoticiaEnviar.usuario_creador.nombreUsuario = 'giulitiano' //TODO: cambiar por el nombre del usuario logueado
         await crearNoticia(objectNoticiaEnviar)
      } else {
         objectNoticiaEnviar.usuario_editor = 'giulitiano' //TODO: cambiar por el nombre del usuario logueado
         await editarNoticias(objectNoticiaEnviar)
      }
      //*Revisamos si cargaron alguna imagen
      if (imagenCargadaActiva) {
         const formData = new FormData()
         formData.append('portada', imageFile)
         formData.append('miniatura', imageFile2)
         formData.append('titulo', noticia)
         formData.append('usuario', 'giulitiano')
         await postSubirImagen(formData).then(() => {
            handleClose()
            refreshStateC()
         })
      }
   }

   const [imagenCargadaActiva, setimagenCargadaActiva] = useState(false)
   const [object, setobject] = useState(objectNoticiaEnviar)
   const [portada, setportada] = useState<string>(
      'https://baxcompany.com/wp-content/uploads/2017/08/300x150-300x150.png'
   )
   const [miniatura, setminiatura] = useState(
      'https://baxcompany.com/wp-content/uploads/2017/08/300x150-300x150.png'
   )

   const [fileUrl, setFileUrl] = useState('')
   const [fileUrl2, setFileUrl2] = useState('')

   function processImage(event: any) {
      setimagenCargadaActiva(true)
      imageFile = event.target.files[0]
      const imageUrl: string = URL.createObjectURL(imageFile)
      setFileUrl(imageUrl)
   }
   function processImage2(event: any) {
      setimagenCargadaActiva(true)
      imageFile2 = event.target.files[0]
      const imageUrl2: string = URL.createObjectURL(imageFile2)
      setFileUrl2(imageUrl2)
   }
   useEffect(() => {
      setobject(objectNoticiaEnviar)

      if (objectNoticiaEnviar.imagen !== undefined) {
         console.log()

         setportada(objectNoticiaEnviar.imagen?.filter((e) => e.tipo === 'portada')[0].url)
         setminiatura(objectNoticiaEnviar.imagen?.filter((e) => e.tipo === 'miniatura')[0].url)
         setFileUrl(objectNoticiaEnviar.imagen?.filter((e) => e.tipo === 'portada')[0].url)
         setFileUrl2(objectNoticiaEnviar.imagen?.filter((e) => e.tipo === 'miniatura')[0].url)
      }
   }, [objectNoticiaEnviar, modelState])

   return (
      <div>
         <div className='gridImagenes'>
            <div>
               <img
                  className='imagenSubida'
                  src={fileUrl}
                  onError={(e: any) => {
                     e.target.src = portada
                     e.onerror = null
                  }}
               ></img>
            </div>

            <div>
               <input
                  className='file-select'
                  type='file'
                  accept='image/png,image/jpeg,image/jpg'
                  onChange={processImage}
               />
            </div>

            <div>
               <img
                  className='imagenSubida'
                  src={fileUrl2}
                  onError={(e: any) => {
                     e.target.src = miniatura
                     e.onerror = null
                  }}
               ></img>
            </div>

            <div>
               <input
                  className='file-select'
                  type='file'
                  accept='image/png,image/jpeg,image/jpg'
                  onChange={processImage2}
               />
            </div>
         </div>

         <button
            /*  disabled={} */
            className='btnSubir'
            onClick={() => {
               setpaginacionValue(3)
               SubirImagen(
                  objectNoticiaEnviar!.titulo,
                  imageFile,
                  imageFile2,
                  objectNoticiaEnviar,
                  imagenCargadaActiva
               )
            }}
         >
            Subir
         </button>
      </div>
   )
}

export default ModalSubirImagen
