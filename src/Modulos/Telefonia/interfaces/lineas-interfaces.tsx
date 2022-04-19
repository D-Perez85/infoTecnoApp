export interface Ilinea2 {
   _id?: string
   id_linea: string
   numero: string
   compania: string
   estado_linea: string
   fecha_alta: string
   fecha_baja: string
   cargo: [
      {
         _id?: string
         dni: string
         n_empleado: string
         apellido: string
         nombre: string
         id_dependencia: string
         nombre_dependencia: string
         id_organismo: string
         nombre_organismo: string
         estado_cargo: boolean
         fecha_inicio: string
         fecha_fin?: string
         n_nota: string
      }
   ]

   consumos: [
      {
         cuenta: String
         nro_factura: String
         desc_factura: String
         inicio_ciclo: String
         fin_ciclo: String
         ciclo2: String
         linea: String
         id_plan: String
         id_concepto: String
         descripcion_concepto: String
         fin_bonificacion: String
         cantidad: number
         monto_neto: number
         monto_impuestos: number
         monto_total: number
      }
   ]

   equipos: [
      {
         nlinea: string
         marca: string
         modelo: string
         imei: string
         compania: string
         estado_equipo: boolean
         fecha_inicio: string
         fecha_fin: string
      }
   ]
}

export interface Ilineas2 extends Array<Ilinea2> {}
