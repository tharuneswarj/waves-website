"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { customerAccessTokenCreate, customerAccessTokenDelete, getCustomer, customerCreate } from "./customer";

interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  customer: Customer | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshCustomer: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      customer: null,
      accessToken: null,
      loading: false,
      error: null,
      login: async (email, password) => {
        set({ loading: true, error: null });
        const result = await customerAccessTokenCreate(email, password);
        if (result.accessToken) {
          const customer = await getCustomer(result.accessToken);
          set({ accessToken: result.accessToken, customer, loading: false });
          return true;
        }
        set({ loading: false, error: result.errors[0]?.message ?? "Login failed" });
        return false;
      },
      signup: async (email, password, firstName, lastName) => {
        set({ loading: true, error: null });
        const result = await customerCreate(email, password, firstName, lastName);
        if (result.customer) {
          const tokenResult = await customerAccessTokenCreate(email, password);
          if (tokenResult.accessToken) {
            const customer = await getCustomer(tokenResult.accessToken);
            set({ accessToken: tokenResult.accessToken, customer, loading: false });
            return true;
          }
        }
        set({ loading: false, error: result.errors[0]?.message ?? "Signup failed" });
        return false;
      },
      logout: async () => {
        const { accessToken } = get();
        if (accessToken) await customerAccessTokenDelete(accessToken);
        set({ customer: null, accessToken: null });
      },
      refreshCustomer: async () => {
        const { accessToken } = get();
        if (!accessToken) return;
        const customer = await getCustomer(accessToken);
        if (customer) set({ customer });
      },
      clearError: () => set({ error: null }),
    }),
    {
      name: "waves-auth",
      partialize: (state) => ({ accessToken: state.accessToken, customer: state.customer }),
    }
  )
);
