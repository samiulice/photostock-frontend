import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if(token){
    return true;
  }
  router.navigate(['/login']);
  return false;
};
