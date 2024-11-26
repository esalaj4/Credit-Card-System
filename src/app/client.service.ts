import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from './CreditCard/creditcard.interface';
import { Transactions } from './transactions/transactions.interface';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = "http://localhost:3000/cards";

  constructor(private http: HttpClient) { }

  getClients(): Observable<CreditCard[]>{
    return this.http.get<CreditCard[]>(this.apiUrl);
  }
  
  getClientsById(id: string): Observable<CreditCard>{
    return this.http.get<CreditCard>(`${this.apiUrl}/${id}`);
  }

  getCardDetails(cardNumber: string): Observable<CreditCard> {
    return this.http.get<CreditCard>(`${this.apiUrl}/${cardNumber}`);
  }

  removeCard(cardNumber: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cardNumber}`);
  }

  
  addCard(card: CreditCard): Observable<CreditCard> {
    return this.http.post<CreditCard>(this.apiUrl, card)
  }
}
