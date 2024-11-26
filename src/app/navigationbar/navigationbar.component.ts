import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navigationbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navigationbar.component.html',
  styleUrl: './navigationbar.component.css'
})
export class NavigationbarComponent {

}
