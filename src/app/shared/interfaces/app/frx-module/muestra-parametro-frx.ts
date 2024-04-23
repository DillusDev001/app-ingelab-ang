import { Parametro } from "./parametro";

export interface MuestraParametroFrx {
    cod_cotizacion: string;
    muestra_sec: number;
    parametro_sec: number;
    id_parametro: number;
    cantidad: number;
    costo_parametro_unitario: number;
    costo_parametro_total: number;
    observacion: string;
    parametro: Parametro;

    fec_crea: string;
    user_crea: string;
    fec_mod: string;
    user_mod: string;
}