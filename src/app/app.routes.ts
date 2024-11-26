import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AddCreditCardComponent } from './CreditCard/add-credit-card/add-credit-card.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent}, 
    {path: '', component: HomeComponent},
    {path: 'credit-card', loadChildren: () => import('./CreditCard/credit-cards.module').then(m => m.CreditCardsModule)},
    {path: 'transactions', component: TransactionsComponent},
    {path: 'add-credit-card', component: AddCreditCardComponent},
    {path: 'add-transaction', component: AddTransactionComponent }, // Ensure this route is defined

];
