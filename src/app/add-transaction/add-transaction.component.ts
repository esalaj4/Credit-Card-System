import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { TransactionsService } from '../transactions.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { ClientService } from '../client.service'; // Import ClientService
import { CreditCard } from '../CreditCard/creditcard.interface'; // Import CreditCard interface

@Component({
    selector: 'app-add-transaction',
    templateUrl: './add-transaction.component.html',
    styleUrls: ['./add-transaction.component.css'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule] 
})

export class AddTransactionComponent implements OnInit {
    applyForm: FormGroup;
    currencies: string[] = ['CAD', 'EUR', 'KYD', 'MWK', 'NAD', 'USD']; 
    creditCards: CreditCard[] = []; 

    constructor(
        private transactionsService: TransactionsService, 
        private clientService: ClientService, 
        private router: Router
    ) {
        this.applyForm = new FormGroup({
            amount: new FormControl(null),
            card_number: new FormControl(''),
            currency: new FormControl(''),
            cardholder_name: new FormControl(''),
            comment: new FormControl(''),
            date: new FormControl(new Date().toISOString().substring(0, 10)) 
        });
    }

    ngOnInit() {
        this.loadCreditCards(); 
    }

    loadCreditCards() {
        this.clientService.getClients().subscribe(data => {
            this.creditCards = data; 
        }, error => {
            console.error('Error loading credit cards', error);
        });
    }


    submitApplication() {
        const newTransaction = {
            credit_card: {
                card_number: Number(this.applyForm.value.card_number),
                cardholder_name: this.applyForm.value.cardholder_name,
                csc_code: '', // Optional
                expiration_date_month: 1, // Default value
                expiration_date_year: new Date().getFullYear(),
                issuer: '', // Optional
                transactions: [] // Initialize if necessary
            },
            amount: Number(this.applyForm.value.amount),
            comment: this.applyForm.value.comment,
            date: new Date(this.applyForm.value.date).getTime(),
            currency: this.applyForm.value.currency
        };

        this.transactionsService.submitCard(newTransaction).subscribe(response => {
            console.log('Transaction added:', response);
            this.router.navigate(['/transactions']); 
        }, error => {
            console.error('Error adding transaction', error);
        });
    }
}
