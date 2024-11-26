// transactions.interface.ts
import { CreditCard } from "../CreditCard/creditcard.interface";

export interface Transactions {
  credit_card: CreditCard;
  amount: number;
  comment: string;
  date: number;
  currency: string;
  uid?: string;
}
