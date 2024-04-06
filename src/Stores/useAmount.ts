import { create } from 'zustand';

export const useAmount = create(set => ({
  amoutInBank: 0,
  setAmoutInBank: (money: any) => set(() => ({ amoutInBank: money })),
}));
