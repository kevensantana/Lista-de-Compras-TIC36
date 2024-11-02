import { Routes } from '@angular/router';
import { getProducts } from './shared/resolvers/get-products.resolver';
import { getProduct } from './shared/resolvers/get-product.resolver';

import { ProfileComponent } from './shared/pages/profile/profile.component';
import { authGuardFn } from '@auth0/auth0-angular';
import { HomeComponent } from './shared/pages/home/home.component';
import { ListaComprasComponent } from './shared/pages/lista-compras/lista-compras.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '',  component: HomeComponent,},
  { path: 'profile', component: ProfileComponent, canActivate: [authGuardFn] },
  { path: 'listaCompras', resolve: {products: getProducts}, component: ListaComprasComponent, canActivate: [authGuardFn]},

  {
    path: 'listaCompras/create-product',
    loadComponent: () => import('./features/create/create.component').then((m) => m.CreateComponent), canActivate: [authGuardFn]
  },
  {
    path: 'edit-product/:id',
    resolve: {
      product: getProduct,
    },
      loadComponent: () => import('./features/edit/edit.component').then((m) => m.EditComponent)
    },
    { path: '**', component: NotFoundComponent } 
];

