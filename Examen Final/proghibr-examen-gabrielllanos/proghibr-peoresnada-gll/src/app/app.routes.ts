import { Routes } from '@angular/router';

export const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    loadComponent: () => import('./paginas/inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    path: 'publicacion',
    loadComponent: () => import('./paginas/publicacion/publicacion.page').then( m => m.PublicacionPage)
  },
];
