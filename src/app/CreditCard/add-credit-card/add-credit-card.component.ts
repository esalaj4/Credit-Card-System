import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CreditCard } from '../creditcard.interface';
import { ClientService } from '../../client.service';

@Component({
  selector: 'app-add-credit-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-credit-card.component.html',
  styleUrl: './add-credit-card.component.css'
})

// card_number, cardholder_name, csc_code, expiration_date_month, expiration_date_year, issuer
/*
F4.1.1 Field card_number only accepts numbers (integers)
F4.1.2 Field card_number length must be 7-16 digits
F4.1.3 Field card_number is required
F4.2.1 Field csc_code only accepts numbers (integers)
F4.2.2 Field csc_code length must be 3 digits (integers)
F4.2.4 Field csc_code is required
F4.3.1 Field cardholder_name is required
F4.4.1 Field expiration_date_month must be in range 1-12
F4.4.2 Field expiration_date_month is required
F4.5.1 Field expiration_date_year is required
*/

export class AddCreditCardComponent {
  formBuilder = inject(FormBuilder);
  clientService = inject(ClientService)

  addCreditCardForm = this.formBuilder.group({
    card_number: [
      '', 
      [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(7),
        Validators.maxLength(16)
      ]],
    cardholder_name: [
      '',
      Validators.required
    ],
    csc_code: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]{3}$'),
      ]
    ],
    expiration_date_month: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(1),
        Validators.max(12)
      ]
    ],
    expiration_date_year: [
      '',
      [
      Validators.required,
      Validators.pattern('^[0-9]*$')
      ]
    ],
    issuer: [
      ''
    ]
  })

  onSubmit() {
    if (this.addCreditCardForm.valid) {
      console.log('form submited', this.addCreditCardForm.value);
      
      const formCard = this.addCreditCardForm.value

      const newCard: CreditCard = {
        card_number: parseInt(formCard.card_number ?? ''),
        cardholder_name: formCard.cardholder_name ?? '',
        csc_code: formCard.csc_code ?? '',
        expiration_date_month: parseInt(formCard.expiration_date_month ?? '1'),
        expiration_date_year: parseInt(formCard.expiration_date_year ?? '2000'),
        issuer: formCard.issuer ?? 'unknown',
        transactions: []
      }

      this.clientService.addCard(newCard).subscribe(
        (response) => {
          console.log('New credit card added successfully', response);
          this.addCreditCardForm.reset();
        },
        (error) => {
          console.error('Error adding credit card:', error);
        }
      );

    } else {
      console.log('form invalid');
    }
  }
}
