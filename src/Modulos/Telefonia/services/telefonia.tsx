import axios from 'axios'

export const getLineas = async () => {
   const URL = 'http://localhost:3001/api/listarlineas'
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

export const agrePerCarg = (valores: any) => {
   console.log('hola ' + valores)
   const URL = 'http://localhost:3001/api/agrePerCarg'
   return axios
      .post(URL, valores)
      .then(function (response: object) {
         // handle success
         console.log(response)
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

export const postEquipog = (valores: any) => {
   const URL = 'http://localhost:3001/api/agregarequipo2'
   return axios
      .post(URL, valores)
      .then(function (response: object) {
         // handle success
         console.log(response)
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

export const PatchAltaLinea = (valores: any) => {
   const URL = 'http://localhost:3001/api/altalinea'
   return axios
      .patch(URL, valores)
      .then(function (response: object) {
         // handle success
         console.log(response)
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
