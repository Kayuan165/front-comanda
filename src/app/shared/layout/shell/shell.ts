import { Component, computed, inject, signal } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { BottomNav, BottomNavItem } from '../bottom-nav/bottom-nav';
import { Fab, FabConfig } from '../fab/fab';
import { filter } from 'rxjs';
import { TopNavbar } from '../top-navbar/top-navbar';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, TopNavbar, BottomNav, Fab],
  standalone: true,
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  items: BottomNavItem[] = [
    { label: 'Dashboard', route: '/home' },
    { label: 'Produtos', route: '/produtos' },
    { label: 'Pedidos', route: '/pedidos' },
    { label: 'Usuários', route: '/usuarios' },
  ];

  private showBottomNavSig = signal<boolean>(true);
  private fabSig = signal<FabConfig | null>(null);

  showBottomNav = computed(() => this.showBottomNavSig());
  fab = computed(() => this.fabSig());

  constructor() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        const deepest = this.deepest(this.route);
        const data = deepest?.snapshot.data ?? {};
        this.showBottomNavSig.set(!!data['bottomNav']);
        this.fabSig.set(data['fab'] ?? null);
      });
  }

  private deepest(rt: ActivatedRoute): ActivatedRoute {
    let child = rt;
    while (child.firstChild) child = child.firstChild;
    return child;
  }
}
