import { Router } from "@angular/router";

export function goLogin(router: Router) {
    router.navigate(['auth/login']);
}

export function goForGotPassword(router: Router) {
    router.navigate(['auth/forgot']);
}

export function goAdminDashBoard(router: Router) {
    router.navigate(['admin']);
}