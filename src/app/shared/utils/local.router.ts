import { Router } from "@angular/router";

// ================ INDEX ================ //
export function goIndex(router: Router) {
    router.navigate(['auth/']);
}

// ================ AUTH ================ //
export function goLogin(router: Router) {
    router.navigate(['auth']);
}

export function goForGotPassword(router: Router) {
    router.navigate(['auth/forgot']);
}

// ================ ADMIN ================ //
export function goAdminHome(router: Router) {
    router.navigate(['admin/home']);
}

export function goAdminServiciosEspecificos(router: Router) {
    router.navigate(['admin/servicios/especificos/mantenimiento']);
}

export function goAdminServiciosGenerales(router: Router) {
    router.navigate(['admin/servicios/generales/mantenimiento']);
}

// ================= SERVICIOS ESPECIFICOS ================== //
export function goAdminServiciosEspecificosListaFRX(router: Router) {
    router.navigate(['admin/servicios/especificos/lista-frx']);
}

export function goAdminServiciosEspecificosAgregar(router: Router) {
    router.navigate(['admin/servicios/especificos/agregar']);
}

// ================= SERVICIOS ESPECIFICOS - MANTENIMIENTO ================== //
export function goAdminServiciosEspecificosMantenimientoParametro(router: Router) {
    router.navigate(['admin/servicios/especificos/mantenimiento/parametro']);
}

export function goAdminMantenimientoCliente(router: Router) {
    router.navigate(['admin/cliente/lista-persona']);
}

export function goAdminMantenimientoEmpresa(router: Router) {
    router.navigate(['admin/cliente/lista-empresa']);
}

export function goAdminMantenimientoClienteAgregar(router: Router) {
    router.navigate(['admin/cliente/agregar']);
}

// ================= SERVICIOS GENERALES ================== //
export function goAdminServiciosGeneralesMantenimiento(router: Router) {
    router.navigate(['admin/servicios/generales/mantenimiento']);
}

export function goAdminServiciosGeneralesLista(router: Router) {
    router.navigate(['admin/servicios/generales/lista']);
}

export function goAdminServiciosGeneralesAgregar(router: Router) {
    router.navigate(['admin/servicios/generales/agregar']);
}







// ============== COTIZACION =============== //
export function goAdminCotizacionLaboratorio(router: Router) {
    router.navigate(['admin/cotizacion/laboratorio']);
}

export function goAdminCotizacionServicio(router: Router) {
    router.navigate(['admin/cotizacion/servicio']);
}

// =============== RECEPCION =============== //

// ================ PRUEBAS ================ //

// ================ GRAFICOS =============== //
export function goAdminGraficosGeneral(router: Router) {
    router.navigate(['admin/graficos']);
}

// =============== PARAMETRO =============== //

// =============== CLIENTES ================ //

// ================ USUARIO ================ //
export function goUsuarios(router: Router) {
    router.navigate(['admin/usuarios']);
}

// ================  ================ //

// ================  ================ //

// ================  ================ //