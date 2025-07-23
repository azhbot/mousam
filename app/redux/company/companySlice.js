import { createSlice } from "@reduxjs/toolkit";
import { images } from "../../constant/images";
import { companies } from "../../data/companies";

const initialState = {
  companies: companies,
  savedCompanies: [],
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    addCompany: (state, action) => {
      state.companies.push(action.payload);
    },

    setSavedCompanies: (state, action) => {
      state.savedCompanies = action.payload;
    },
    toggleSavedCompany: (state, action) => {
      const company = action.payload;
      const index = state.savedCompanies.findIndex(
        (savedCompany) => savedCompany.id === company.id
      );

      if (index === -1) {
        // Company not saved — add it
        state.savedCompanies.push(company);
      } else {
        // Company already saved — remove it
        state.savedCompanies.splice(index, 1);
      }
    },
    updateNextOrderGroupNumber: (state, action) => {
      const companyId = action.payload;
      const company = state.companies.find((c) => c.id === companyId);

      if (company) {
        company.nextOrderGroupNumber =
          company.nextOrderGroupNumber >= 999999
            ? 1
            : company.nextOrderGroupNumber + 1;
      }
    },

    updateNextSampleNumber: (state, action) => {
      const companyId = action.payload;
      const company = state.companies.find((c) => c.id === companyId);

      if (company) {
        company.nextSampleNumber =
          company.nextSampleNumber >= 999999 ? 1 : company.nextSampleNumber + 1;
      }
    },
  },
});

export const {
  addCompany,
  setSavedCompanies,
  toggleSavedCompany,
  updateNextOrderGroupNumber,
  updateNextSampleNumber,
} = companySlice.actions;

export default companySlice.reducer;
