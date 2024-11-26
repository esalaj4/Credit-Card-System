import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Transactions } from './transactions.interface'; 
import { TransactionsService } from '../transactions.service'; 
import { CommonModule } from '@angular/common'; 
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.css'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule] 
})

export class TransactionsComponent implements OnInit {
    transactions: Transactions[] = []; 
    filteredTransactions: Transactions[] = []; 

    // Property for filtering
    filterCardNumber: string = '';

    constructor(
        private transactionsService: TransactionsService, 
        private router: Router, 
        private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.loadTransactions(); 
    }

    loadTransactions() {
        this.transactionsService.getTransactions().subscribe(data => {
            this.transactions = data; 
            this.filteredTransactions = data; 
            console.log('Fetched Transactions:', this.transactions); 
            
            // Manually trigger change detection after loading transactions
            this.cdr.detectChanges();
        }, error => {
            console.error('Error loading transactions', error);
        });
    }

    filterTransactions() {
        if (this.filterCardNumber) {
            this.filteredTransactions = this.transactions.filter(transaction =>
                transaction.credit_card.card_number.toString().includes(this.filterCardNumber)
            );
        } else {
            this.filteredTransactions = this.transactions; // Reset to all transactions if no filter
        }

        // Manually trigger change detection after filtering
        this.cdr.detectChanges();
    }

    goToAddTransaction() {
        this.router.navigate(['add-transaction']);
    }

    removeTransaction(transactionUid?: string) {
        // Check if transactionUid is defined before calling the service
        if (transactionUid) {
            this.transactionsService.removeTransaction(transactionUid).subscribe((response: any) => {
                console.log('Transaction removed:', response);
                this.loadTransactions(); // Reload transactions after removal
                
                // Manually trigger change detection after removing transaction
                this.cdr.detectChanges();
            }, (error: any) => {
                console.error("Error removing transaction", error);
            });
        } else {
            console.error("Transaction ID is undefined");
        }
    }
}
