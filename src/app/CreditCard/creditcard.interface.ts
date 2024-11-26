import { Transactions } from "../transactions/transactions.interface";

export interface CreditCard {
  card_number: number;
  cardholder_name: string;
  csc_code: string;
  expiration_date_month: number;
  expiration_date_year: number;
  issuer: string;
  transactions: Transactions[];
}