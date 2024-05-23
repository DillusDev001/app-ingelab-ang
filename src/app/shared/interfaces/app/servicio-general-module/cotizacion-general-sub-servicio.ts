import { SubServicio } from "../servicio-module/sub-servicio";

export interface CotizacionGeneralSubServicio{

    cod_cotizacion: string;
    id_sub_servicio: number;
    costo_sub_servicio: number;
    sub_servicio: SubServicio;

    observacion: string;

    fec_crea: string;
    user_crea: string;
    fec_mod: string;
    user_mod: string;
    
}