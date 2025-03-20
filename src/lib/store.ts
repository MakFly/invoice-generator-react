import { create } from 'zustand';

export type UserType = {
  id: string;
  email: string;
  isPremium: boolean;
};

export type InvoiceStatus = 'draft' | 'sent' | 'paid';

export type StoredInvoice = {
  id: string;
  userId: string;
  data: InvoiceData;
  status: InvoiceStatus;
  signature?: string;
  createdAt: string;
  updatedAt: string;
  sentAt?: string;
  paidAt?: string;
};

export type InvoiceData = {
  from: {
    businessName: string;
    address: string;
    email: string;
    phone: string;
  };
  to: {
    clientName: string;
    address: string;
    email: string;
    phone: string;
  };
  payment: {
    bankName: string;
    accountNumber: string;
    swiftCode: string;
  };
  details: {
    invoiceNumber: string;
    date: string;
    dueDate: string;
    items: Array<{
      description: string;
      quantity: number;
      rate: number;
      amount: number;
    }>;
  };
};

type AuthStore = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  isAuthenticated: boolean;
  isPremium: boolean;
};

type InvoiceStore = {
  invoices: StoredInvoice[];
  addInvoice: (invoice: InvoiceData, signature?: string) => void;
  updateInvoice: (id: string, data: Partial<StoredInvoice>) => void;
  deleteInvoice: (id: string) => void;
  getInvoicesByUser: (userId: string) => StoredInvoice[];
  markAsSent: (id: string) => void;
  markAsPaid: (id: string) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isPremium: false,
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isPremium: user?.isPremium || false,
    }),
}));

export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
  invoices: [],
  addInvoice: (data, signature) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const newInvoice: StoredInvoice = {
      id: crypto.randomUUID(),
      userId: user.id,
      data,
      status: 'draft',
      signature,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      invoices: [...state.invoices, newInvoice],
    }));

    return newInvoice;
  },
  updateInvoice: (id, data) => {
    set((state) => ({
      invoices: state.invoices.map((invoice) =>
        invoice.id === id
          ? {
              ...invoice,
              ...data,
              updatedAt: new Date().toISOString(),
            }
          : invoice
      ),
    }));
  },
  deleteInvoice: (id) => {
    set((state) => ({
      invoices: state.invoices.filter((invoice) => invoice.id !== id),
    }));
  },
  getInvoicesByUser: (userId) => {
    return get().invoices.filter((invoice) => invoice.userId === userId);
  },
  markAsSent: (id) => {
    set((state) => ({
      invoices: state.invoices.map((invoice) =>
        invoice.id === id
          ? {
              ...invoice,
              status: 'sent',
              sentAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
          : invoice
      ),
    }));
  },
  markAsPaid: (id) => {
    set((state) => ({
      invoices: state.invoices.map((invoice) =>
        invoice.id === id
          ? {
              ...invoice,
              status: 'paid',
              paidAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
          : invoice
      ),
    }));
  },
}));