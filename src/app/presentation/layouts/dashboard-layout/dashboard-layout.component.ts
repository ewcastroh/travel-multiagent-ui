import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, OnInit, signal } from '@angular/core';
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
export class DashboardLayoutComponent implements OnInit {
  public routes = routes[0].children?.filter((route) => route.data);

  public darkMode = signal<boolean>(false);

  constructor() {
    effect(() => {
      const body = document.body;
      if (this.darkMode()) {
        body.classList.add('dark-mode-body');
        localStorage.setItem('darkMode', 'true');
      } else {
        body.classList.remove('dark-mode-body');
        localStorage.setItem('darkMode', 'false');
      }
    });
  }

  public ngOnInit(): void {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode === 'true') {
      this.darkMode.set(true);
    }
  }
}
