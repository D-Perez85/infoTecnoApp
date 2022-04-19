export interface Inoticia {
   _id?: string
   titulo: string
   cuerpo: string
   tags: string
   likes: number
   visitas: number
   dislikes: number

   fecha_creacion?: string
   fecha_edicion?: string
   fecha_baja?: string
   fecha_publicacion?: string

   estado?: Boolean
   estadoF?: string
   publicacion?: Boolean
   publicacionView?: string

   usuario_creador: {
      nombre: string
      apellido: string
      nombreUsuario: string
      email: string
   }

   datos_autor: {
      email: string
      nombre: string
      apellido: string
   }

   usuario_editor?: string

   imagen?: [
      {
         url: string
         tipo: string
      }
   ]

   id_organismo: string
   nombreOrg: string

   tematicas: Array<string>
}

export interface Inoticias extends Array<Inoticia> {}
