export interface CotizacionGeneralSubServicios {
    cod_cotizacion: string;
    id_sub_servicio: number;
    costo_sub_servicio: number;
    observacion: string;

    nombre: string;
    descripcion: string;

    fec_crea: string;
    user_crea: string;
    fec_mod: string;
    user_mod: string;
}