import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { CreditCardListComponent } from './CreditCard/credit-card-list/credit-card-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NavigationbarComponent, CreditCardListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'handin_1';
}
