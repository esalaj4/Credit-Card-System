import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../client.service';
import { CreditCard } from '../creditcard.interface';
import { CreditCardDetailsComponent } from '../credit-card-details/credit-card-details.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit-card-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, CreditCardDetailsComponent],
  templateUrl: './credit-card-list.component.html',
  styleUrls: ['./credit-card-list.component.css']  // Fixed styleUrl to styleUrls
})
export class CreditCardListComponent implements OnInit {
  client: CreditCard[] = [];

  // Inject ChangeDetectorRef for manual change detection in zoneless mode
  constructor(private clientService: ClientService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe(
      (data) => {
        this.client = data; 
        // Manually trigger change detection in zoneless mode
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching clients:', error);
      }
    );
  }

  navigateToDetails(card: CreditCard) {
    this.router.navigate(['/credit-card/details', card.card_number]);
  }
}
