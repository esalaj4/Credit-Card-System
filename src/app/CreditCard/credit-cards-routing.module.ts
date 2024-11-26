import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditCardListComponent } from './credit-card-list/credit-card-list.component';
import { CreditCardDetailsComponent } from './credit-card-details/credit-card-details.component';

const routes: Routes = [
  {path: 'list', component: CreditCardListComponent}, 
  {path: 'details/:id', component: CreditCardDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditCardsRoutingModule { }
