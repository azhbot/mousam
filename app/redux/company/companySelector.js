import { createSelector } from "@reduxjs/toolkit";

// Basic selector to get the companies array from the store
export const selectCompanies = (state) => state.company.companies;
export const selectSavedCompanies = (state) => state.company.savedCompanies;

// Memoized selector that returns a Map of companies by ID
export const selectCompanyMap = createSelector(
  [selectCompanies],
  (companies) => {
    return companies?.reduce((map, company) => {
      map.set(company.id, company);
      return map;
    }, new Map());
  }
);

// Memoized selector that returns a Set of saved company IDs for fast lookup
export const selectSavedCompanyIdSet = createSelector(
  [selectSavedCompanies],
  (savedCompanies) => {
    return new Set(savedCompanies.map((company) => company.id));
  }
);

// Memoized selector that returns a Map of companies by ID
// export const selectCompanyMap = createSelector(
//   [selectCompanies],
//   (companies) => {
//     const map = new Map();
//     companies?.forEach((c) => map.set(c.id, c));
//     return map;
//   }
// );
