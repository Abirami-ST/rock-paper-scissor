import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './Services/auth.service';

export const canActivateGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  let isAuthorized = authService.isAuthenticated();
  console.log("IsAuthorized :", isAuthorized);

  if(isAuthorized){
    return true;
  }else{
    router.navigate(['/login']);
    return false;
  }
 
};
