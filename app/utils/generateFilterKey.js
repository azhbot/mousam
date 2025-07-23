export const generateFilterKey = ({ categoryId, companyId, subCategoryId, sortId }) => {
    return `category=${categoryId ?? ""}&company=${companyId ?? ""}&sub=${subCategoryId ?? ""}&sort=${sortId ?? ""}`;
  };
  