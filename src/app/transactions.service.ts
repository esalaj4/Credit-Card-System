// transactions.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transactions } from './transactions/transactions.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private transactionUrl = "http://localhost:3000/transactions"; // Adjust this to your actual endpoint

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<Transactions[]> {
    return this.http.get<Transactions[]>(this.transactionUrl); // Get the list of transactions
  }

  submitCard(transaction: Transactions): Observable<any> {
    return this.http.post(this.transactionUrl, transaction); // Send a new transaction to the backend
  }

  removeTransaction(transactionUid:string) : Observable<any> {
    return this.http.delete(`${this.transactionUrl}/${transactionUid}`);
  }
}
