import { Usuario } from "../app/sesion-module/usuario";

export interface DataLocalStorage {
    usuario: Usuario | null;
    loggedDate: String;
}
