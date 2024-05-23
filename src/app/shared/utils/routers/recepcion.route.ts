import { Router } from "@angular/router";

export function admiRecepcionFRX(router: Router) {
    router.navigate(['admin/servicios/especificos/recepcion/frx']);
}

export function admiRecepcionFRXLista(router: Router) {
    router.navigate(['admin/servicios/especificos/recepcion/lista/frx']);
}

export function admiRecepcionGeneral(router: Router) {
    router.navigate(['admin/servicios/especificos/recepcion/generales']);
}
export function admiRecepcionGeneralLista(router: Router) {
    router.navigate(['admin/servicios/especificos/recepcion/lista/generales']);
}