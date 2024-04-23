export interface Usuario {
    user: string;
    
    codigo: string;

    nombres: string;
    apellidos: string;
    code: string;
    celular: string;
    telefono: string;
    ci: string;
    exp: string;
    sexo: string;
    est_civil: string;
    fec_nac: string;

    banco: string;
    nro_cuenta: string;

    fec_ingreso: string;
    fec_baja: string;
    rol: string;
    img: string;
        
    estado: number;

    fec_crea: Date;
    user_mod: string;
    fec_mod: Date;
}