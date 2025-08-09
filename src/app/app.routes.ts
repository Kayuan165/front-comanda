import { Routes } from '@angular/router';
import { Login } from './features/pages/login/login';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent() {
      return import('./features/pages/login/login').then((m) => m.Login);
    },
  },
  {
    path: 'produtos',
    loadComponent() {
      return import('./features/produto/produto-list/produto-list').then(
        (m) => m.ProdutoList
      );
    },
  },
  // {
  //   path: 'pedidos',
  // },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // {
  //   path: 'edit-visitor',
  //   loadComponent: () =>
  //     import('./features/user/edit/edit.component').then(
  //       (m) => m.EditComponent
  //     ),
  //   providers: [provideClientHydration()],
  // },
];
