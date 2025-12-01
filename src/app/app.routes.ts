import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/pages/login/login').then((m) => m.Login),
  },

  {
    path: '',
    loadComponent: () =>
      import('./shared/layout/shell/shell').then((m) => m.Shell),
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/pages/home/home').then((m) => m.Home),
        data: { bottomNav: true }, // sem FAB
      },
      {
        path: 'produtos',
        loadComponent: () =>
          import('./features/produto/produto-list/produto-list').then(
            (m) => m.ProdutoList
          ),
        data: {
          bottomNav: true,
          fab: { label: 'Novo produto', route: '/produtos/novo', icon: 'add' },
        },
      },
      {
        path: 'produtos/novo',
        loadComponent: () =>
          import('./features/produto/produto-create/produto-create').then(
            (m) => m.ProdutoCreate
          ),
        data: {
          bottomNav: true,
        },
      },
      {
        path: 'pedidos/novo',
        loadComponent: () =>
          import('./features/pedidos/pedidos-create/pedidos-create').then(
            (m) => m.PedidosCreate
          ),
        data: {
          bottomNav: true,
        },
      },
      {
        path: 'pedidos',
        loadComponent: () =>
          import('./features/pedidos/pedidos-list/pedidos-list').then(
            (m) => m.PedidosList
          ),
        data: {
          bottomNav: true,
          fab: { label: 'Novo pedido', route: '/pedidos/novo', icon: 'add' },
        },
      },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./features/usuarios/usuarios-list/usuarios-list').then(
            (m) => m.UsuariosList
          ),
        data: {
          bottomNav: true,
          fab: { label: 'Novo usuário', route: '/usuarios/novo', icon: 'add' },
        },
      },
      // {
      //   path: 'relatorios',
      //   loadComponent: () =>
      //     import('./features/pages/relatorios/relatorios.component').then(
      //       (m) => m.RelatoriosComponent
      //     ),
      //   data: { bottomNav: true },
      // },
      { path: '', pathMatch: 'full', redirectTo: 'home' },
    ],
  },

  { path: '**', redirectTo: 'home' },
];
