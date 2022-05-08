import {Sprzedawca} from './sprzedawca.model';

export interface Faktura {
    numer: number,
    date: Date,
    sprzedawca: Sprzedawca,
    kwota: number
}