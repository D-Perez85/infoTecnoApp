import React, {useEffect, useState} from 'react'
import {
   getNoticas,
   postEstado,
   postFechaCreacion,
   postFechaPublicacion,
} from '../servicios/Noticias-Services'
import {Inoticias} from '../interfaces/noticias-interfaces'
import Pagination from '../componentes/pagination'
import Posts from '../componentes/Post'
import {Breadcrumbs, Link} from '@material-ui/core'
import moment from 'moment'

moment.locale('es-mx')



export default function NoticiasPages() {
   const [noticias, setNoticias] = useState<Inoticias>([])
   const [loading, setLoading] = useState(false)
   const [currentPage, setCurrentPage] = useState(1)
   const [postsPerPage] = useState(5)
   const [refreshNoticias, setrefreshNoticias] = useState(false)

   useEffect(() => {
      const loadNoticias = async () => {
         setLoading(true)
         const res: any = await getNoticas()
         setNoticias(res.data)
         setTablaNoticias(res.data)
         setLoading(false)
      }
      loadNoticias()
   }, [refreshNoticias])

   const refreshN = () => setrefreshNoticias(refreshNoticias ? false : true)

   const indexOfLastPost = currentPage * postsPerPage
   const indexOfFirstPost = indexOfLastPost - postsPerPage
   const currentPosts = noticias.slice(indexOfFirstPost, indexOfLastPost)

   const paginate = (pageNumber: any) => setCurrentPage(pageNumber)

   const [busqueda, setBusqueda] = useState('')
   const [tablaNoticias, setTablaNoticias] = useState<Inoticias>([])

   const handleChange = (e: any) => {
      setBusqueda(e.target.value)
      filtrar(e.target.value)
   }

/**
 * @description Function que retorna un resultado, filtrando una tabla iterada de posts.
 * @param terminoBusqueda es la referencia de busqueda, si al iterar esta en la lista la retorna y setea a noticias con el valor 
 * */
   const filtrar = (terminoBusqueda: any) => {
      const resultadoBusqueda = tablaNoticias.filter((posts) => {
         if (posts.titulo.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
            return posts
         }
      })
      setNoticias(resultadoBusqueda)
   }

   const [BuscarFecha, setBusquedaFecha] = useState(''); 

/**
 * @description Function que retorna el set de un value, y hace el dispatch de buscarFechaCreacion, usando como args una constante formateada del value inciial.
 * @param e.target.value es la referencia de busqueda y de seteo de la constante fecha. con moment se da formato a la fecha.
 * */  
   const handleChangeFecha = (e: any) => {
      setBusquedaFecha(e.target.value)
      const fecha = moment(e.target.value).format('DD/MM/YYYY')
      buscarFechaCreacion(fecha)
   }

/**
 * @description Function async que hace el request de la fecha de creacion de una noticia
 * @param noticia es la referencia de busqueda (args) y de seteo de la constante fechaCreacion =>  
 * */ 
   const buscarFechaCreacion = async (noticia: string) => {
      const fechaCreacion = {
         fecha_creacion: noticia,
      }
      const res: any = await postFechaCreacion(fechaCreacion)
      setNoticias(res.data.data)
   }

   const [BuscarFechaPublicacion, setBuscarFechaPublicacion] = useState('')
   const handleChangeFechapublicacion = (e: any) => {
      setBuscarFechaPublicacion(e.target.value)
      const fecha2 = moment(e.target.value).format('DD/MM/YYYY')
      buscarFechaPublicacion(fecha2)
   }
   const buscarFechaPublicacion = async (noticia: string) => {
      const fechaPublicacion = {
         fecha_publicacion: noticia,
      }
      const res: any = await postFechaPublicacion(fechaPublicacion)
      setNoticias(res.data.data)
   } //Filtro Busqueda fecha de Publicacion

   const [checkedOne, setcheckedOne] = useState(false)
   const handleChangeOne = async () => {
      setcheckedOne(!checkedOne)
      if (!checkedOne) {
         const estadoPublicacion = {
            publicacion: true,
         }
         const res: any = await postEstado(estadoPublicacion)
         setNoticias(res.data.data)
      } else {
         refreshN()
      }
   } //Filtro CheckBox para noticias publicadas

   
   return (
      <div className='container'>
         <div className='container'>
            <Breadcrumbs aria-label='breadcrumb'>
               <Link underline='hover' color='inherit' href=''>
                  Noticias
               </Link>
               <Link underline='hover' color='inherit' href=''>
                  Usuarios
               </Link>
               <Link underline='hover' color='inherit' href=''>
                  Organismos
               </Link>
               <Link underline='hover' color='inherit' href=''></Link>
            </Breadcrumbs>
         </div>
         <h2>Tabla de Noticias</h2>

         <Posts
            posts={currentPosts}
            loading={loading}
            busqueda={busqueda}
            handleChange={handleChange}
            BuscarFechaCreacion={BuscarFecha}
            handleChangeFechaCreacion={handleChangeFecha}
            buscarFechaPublicacion={BuscarFechaPublicacion}
            handleChangeFechaPublicacion={handleChangeFechapublicacion}
            refreshN={refreshN}
            handleChangeOne={handleChangeOne}
            checkedOne={checkedOne}
         />

         <Pagination postsPerPage={postsPerPage} totalPosts={noticias.length} paginate={paginate} />

         <button className='btn-volver'>Volver</button>
      </div>
   )
}
