import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent() {
      return import('./features/pages/login/login').then(
        (m) => m.Login
      );
    },
  },
  // {
  //   path: 'produtos',
  //   loadComponent() {
  //     return import('./features/pages/produtos/produtos').then(
  //       (m) => m.Produtos
  //     );
  //   },
  //   canActivate: [],
  // },
  // {
  //   path: 'pedidos',
  //   loadComponent() {
  //     return import('./features/pages/pedidos/pedidos').then((m) => m.Pedidos);
  //   },
  //   canActivate: [],
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
