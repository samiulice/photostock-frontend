import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { AdminProfile } from './components/profile/admin-profile/admin-profile';
import { Homepage } from './components/home/homepage/homepage';
import { authGuardGuard } from './core/guards/auth-guard-guard';
import { ProfileWrapper } from './components/profile/profile-wrapper/profile-wrapper';
import { ImageWrapper } from './components/image-gallery/image-wrapper/image-wrapper';
import { ImageDetails } from './components/image-gallery/image-details/image-details';
import { Profile } from './dummy-user/profile/profile';



export const routes: Routes = [
  { path: '', component: Homepage },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'profile/user', component: ProfileWrapper, canActivate: [authGuardGuard]},
  { path: 'profile/admin', component: AdminProfile },
  {path:'image',component:ImageWrapper},
  {path:'image-details/:id', component:ImageDetails},
  {path:'dummy', component:Profile}

  
];

