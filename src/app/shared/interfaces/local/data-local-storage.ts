import { Usuario } from "../app/usuario";

export interface DataLocalStorage {
    usuario: Usuario | null;
    loggedDate: String;
}
