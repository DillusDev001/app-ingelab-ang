import { MuestraParametroFrx } from "./muestra-parametro-frx";
import { Parametro } from "./parametro";

export interface MuestraFrx {
    cod_cotizacion: string;
    muestra_sec: number;
    costo_muestra: number;
    cod_interno: string;
    descripcion: string;
    observacion: string;
    muestra_parametros: MuestraParametroFrx[];

    fec_crea: string;
    user_crea: string;
    fec_mod: string;
    user_mod: string;
}