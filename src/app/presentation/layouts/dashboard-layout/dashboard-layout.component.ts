import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { SideBarMenuItemComponent } from '@components/index';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
CommonModule,
    RouterModule,
    SideBarMenuItemComponent,
  ],
  templateUrl: './dashboard-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {
  public routes = routes[0].children?.filter((route) => route.data);

  public darkMode = signal<boolean>(false);
}
