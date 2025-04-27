import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './presentation/layouts/dashboard-layout/dashboard-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'agent',
        loadComponent: () =>
          import('./presentation/pages/agent-page/agent-page.component'),
        data: {
          icon: 'fa-solid fa-robot',
          title: 'Travel Agent',
          description: 'Travel planner assistant',
        },
      },
      {
        path: '**',
        redirectTo: 'agent',
        pathMatch: 'full',
      },
    ],
  },
];
