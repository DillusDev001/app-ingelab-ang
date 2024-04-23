import { Empresa } from "./empresa";

export interface Persona {
    id_persona: number;
    nombre_persona: string;
    celular: string;
    email: string;
    razon: string;
    nit: string;
    id_empresa: number | Empresa;
    fec_crea: string;
    user_crea: string;
    fec_mod: string;
    user_mod: string;
}
