import axios from 'axios'

export const getNoticas = async () => {
   const URL = 'http://localhost:3001/api/traerNoticias'
   return await axios
      .get(URL)
      .then(function (response: object) {
         // handle success

         return response
      })
      .catch(function (error: object) {
         // handle error
         console.log(error)
         return error
      })
      .then(function (response: object) {
         // always executed
         return response
      })
}

export const editarNoticias = async (noticia: any) => {
   const URL = 'http://localhost:3001/api/noticiamod'
   axios
      .patch(URL, {
         noticia,
      })
      .then(function (response) {
         console.log(response.data)
      })
      .catch(function (error) {
         console.log(error)
      })
}

export const getPublicar = async (noticia: any) => {
   const URL = 'http://localhost:3001/api/publicar'
   axios
      .patch(URL, {
         noticia,
      })
      .then(function (response) {
         console.log(response.data)
      })
      .catch(function (error) {
         console.log(error)
      })
}

export const patchBajarNoticia = async (noticia: any) => {
   const URL = 'http://localhost:3001/api/noticiabaja'
   return await axios
      .patch(URL, {
         noticia,
      })
      .then(function (response: object) {
         // handle success

         return response
      })
      .catch(function (error: object) {
         // handle error
         console.log(error)
         return error
      })
      .then(function (response: object) {
         // always executed
         return response
      })
}

export const PublicarNoticiaBTN = async (noticia: any) => {
   const URL = 'http://localhost:3001/api/publicarbtn'
   
   return await axios
      .patch(URL, {
         noticia,
      })
      .then(function (response: object) {
         // handle success

         return response
      })
      .catch(function (error: object) {
         // handle error
         console.log(error)
         return error
      })
      .then(function (response: object) {
         // always executed
         return response
      })
}

export const postFechaCreacion = async (noticia: any) => {
   const URL = 'http://localhost:3001/api/fechaCreador'
  
   return await axios

      .post(URL, noticia)

      .then(function (response: object) {
         // handle success

         return response
      })
      .catch(function (error: object) {
         // handle error
         console.log(error)
         return error
      })
      .then(function (response: object) {
         // always executed
         return response
      })
}

export const postFechaPublicacion = async (noticia: any) => {
   const URL = 'http://localhost:3001/api/fechapublicacion'
  

   return await axios

      .post(URL, noticia)

      .then(function (response: object) {
         // handle success

         return response
      })
      .catch(function (error: object) {
         // handle error
         console.log(error)
         return error
      })
      .then(function (response: object) {
         // always executed

         return response
      })
}

export const crearNoticia = async (noticia: any) => {
   const URL = 'http://localhost:3001/api/noticia'
  
   axios
      .post(URL, {
         noticia,
      })
      .then(function (response) {
         console.log(response.data)
      })
      .catch(function (error) {
         console.log(error)
      })
}

export const postSubirImagen = async (noticia: any) => {
   const URL = 'http://localhost:3001/api/imagen'
   await axios({
      method: 'post',
      url: URL,
      data: noticia,
      headers: {'Content-Type': 'multipart/form-data'},
   })
      .then(function (response) {
         console.log(response.data)
         return response.data
      })
      .catch(function (error) {
         console.log(error)
      })
}


export const postEstado = async (noticia: any) => {
   const URL = 'http://localhost:3001/api/estpublicacion'
  
   return await axios

      .post(URL, noticia)

      .then(function (response: object) {
         // handle success
console.log(response);

         return response
      })
      .catch(function (error: object) {
         // handle error
         console.log(error)
         return error
      })
      .then(function (response: object) {
         // always executed

         return response
      })
}

export const QuitarPublicacionBTN = async (noticia: any) => {
   const URL = 'http://localhost:3001/api/quitarpublicacion'
   
   return await axios
      .patch(URL, {
         noticia,
      })
      .then(function (response: object) {
         // handle success

         return response
      })
      .catch(function (error: object) {
         // handle error
         console.log(error)
         return error
      })
      .then(function (response: object) {
         // always executed
         return response
      })
}


export const patchAltaNoticia = async (noticia: any) => {
   const URL = 'http://localhost:3001/api/altanoticia'
   return await axios
      .patch(URL, {
         noticia,
      })
      .then(function (response: object) {
         // handle success

         return response
      })
      .catch(function (error: object) {
         // handle error
         console.log(error)
         return error
      })
      .then(function (response: object) {
         // always executed
         return response
      })
}