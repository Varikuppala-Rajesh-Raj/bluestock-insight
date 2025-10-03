import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CompanyProfile {
  id: string;
  ownerId: string;
  companyName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  website?: string;
  logoUrl?: string;
  bannerUrl?: string;
  industry: string;
  foundedDate?: string;
  description?: string;
  socialLinks?: Record<string, string>;
}

interface CompanyState {
  currentCompany: CompanyProfile | null;
  companies: CompanyProfile[];
  loading: boolean;
}

const initialState: CompanyState = {
  currentCompany: null,
  companies: [],
  loading: false,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCurrentCompany: (state, action: PayloadAction<CompanyProfile>) => {
      state.currentCompany = action.payload;
    },
    setCompanies: (state, action: PayloadAction<CompanyProfile[]>) => {
      state.companies = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setCurrentCompany, setCompanies, setLoading } = companySlice.actions;
export default companySlice.reducer;
