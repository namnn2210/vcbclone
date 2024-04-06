import { create } from 'zustand';

export const useTransactions = create(set => ({
  transactions: [],
  addTransactions: (record: any) => set((state: any) => ({ transactions: [record, ...state.transactions] })),
}));
