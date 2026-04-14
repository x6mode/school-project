import { create } from 'zustand';

import { UserProfile } from '../types/api';

interface IUser {
  data: UserProfile | undefined;
  setData: (data: UserProfile) => void;
  resetData: () => void;
}

export const useUserStore = create<IUser>((set) => ({
  data: undefined,
  setData: (data: UserProfile) => set({ data }),
  resetData: () => set({ data: undefined }),
}));
