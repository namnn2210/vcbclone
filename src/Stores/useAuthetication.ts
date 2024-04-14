import { create } from 'zustand';

export const useAuthetication = create(set => ({
  auth: false,
  info: { name: '', password: '', accountNumber: '', amount: '', token: '' },
  setLogIn: () => set(() => ({ auth: true })),
  setLogOut: () => set(() => ({ auth: false })),
  setInfo: (info: any) => set(() => ({ info })),
}));
