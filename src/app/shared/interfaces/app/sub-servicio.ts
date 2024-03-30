export interface SubServicio {
    id_sub_servicio: number;
    id_servicio: number;
    nombre: string;
    descripcion: string;
    costo_directo: number;
    costo_variable: number;
    
    fec_crea: string;
    user_crea: string;
    fec_mod: string;
    user_mod: string;
}