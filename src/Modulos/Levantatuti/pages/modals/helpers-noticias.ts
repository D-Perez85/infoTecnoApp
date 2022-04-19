import {Inoticia} from '../../interfaces/noticias-interfaces'
export const initialValues: Inoticia = {
   titulo: '',
   cuerpo: '',
   tags: '',
   likes: 0,
   visitas: 0,
   dislikes: 0,

   usuario_creador: {
      nombre: '',
      apellido: '',
      nombreUsuario: '',
      email: '',
   },

   datos_autor: {
      email: '',
      nombre: '',
      apellido: '',
   },

   id_organismo: '',
   nombreOrg: '',
   tematicas: [],
}
