import { Router } from "@angular/router";


// ================ AUTH ================ //
export function goLogin(router: Router) {
    router.navigate(['auth/login']);
}

export function goForGotPassword(router: Router) {
    router.navigate(['auth/forgot']);
}

export function goAdminDashBoard(router: Router) {
    router.navigate(['admin/home']);
}

// ================= HOME ================== //
export function goAdminHome(router: Router) {
    router.navigate(['admin/home']);
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