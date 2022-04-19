import {Ilinea2} from '../../interfaces/lineas-interfaces'
export const initialValues: Ilinea2 = {
   id_linea: '',
   numero: '',
   compania: '',
   estado_linea: '',
   fecha_alta: '',
   fecha_baja: '',
   cargo: [
      {
         dni: '',
         n_empleado: '',
         apellido: '',
         nombre: '',
         id_dependencia: '',
         nombre_dependencia: '',
         id_organismo: '',
         nombre_organismo: '',
         estado_cargo: false,
         fecha_inicio: '',
         fecha_fin: '',
         n_nota: '',
      },
   ],

   consumos: [
      {
         cuenta: '',
         nro_factura: '',
         desc_factura: '',
         inicio_ciclo: '',
         fin_ciclo: '',
         ciclo2: '',
         linea: '',
         id_plan: '',
         id_concepto: '',
         descripcion_concepto: '',
         fin_bonificacion: '',
         cantidad: 0,
         monto_neto: 0,
         monto_impuestos: 0,
         monto_total: 0,
      },
   ],

   equipos: [
      {
         nlinea: '',
         marca: '',
         modelo: '',
         imei: '',
         compania: '',
         estado_equipo: false,
         fecha_inicio: '',
         fecha_fin: '',
      },
   ],
}
