import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { CreditCard } from '../creditcard.interface';
import { ClientService } from '../../client.service';
import { Transactions } from '../../transactions/transactions.interface';
import { TransactionsService } from '../../transactions.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-credit-card-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './credit-card-details.component.html',
  styleUrls: ['./credit-card-details.component.css']  // Fixed styleUrl to styleUrls
})
export class CreditCardDetailsComponent implements OnInit {
  creditCard!: CreditCard;
  filteredTransactions: Transactions[] = [];

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private transactionService: TransactionsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const cardNumber = this.route.snapshot.paramMap.get('id');
    if (cardNumber) {
      // Load the credit card details
      this.clientService.getCardDetails(cardNumber).subscribe(data => {
        this.creditCard = data;
        
        // Manually trigger change detection after data is loaded
        this.cdr.detectChanges();
      });

      // Load and filter the transactions by credit card number
      this.transactionService.getTransactions().pipe(
        map(transactions => 
          transactions.filter((transactions: { credit_card: CreditCard; }) =>
            transactions.credit_card.card_number === Number(cardNumber))
        )
      ).subscribe(filteredTransactions => {
        this.filteredTransactions = filteredTransactions;

        // Manually trigger change detection after transactions are loaded
        this.cdr.detectChanges();
      });
    }
  }

  removeCard(): void {
    if (this.creditCard && confirm('Are you sure you want to remove this credit card')) {
      this.clientService.removeCard(this.creditCard.card_number).subscribe(() => {
        this.router.navigate(['/credit-card/list']);
        
        // Manually trigger change detection after card is removed
        this.cdr.detectChanges();
      });
    }
  }
}
