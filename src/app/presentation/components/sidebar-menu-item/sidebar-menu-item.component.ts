import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar-menu-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarMenuItemComponent {

  @Input({required: true })
  public icon!: string;

  @Input({required: true })
  public title!: string;

  @Input({required: true })
  public description!: string;

  @Input({required: true })
  public path!: string;

}
