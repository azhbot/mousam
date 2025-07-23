import { cardList } from "../constant/data";
import { products } from "../data/products";


export const getFakeProducts = (
  page = 1,
  itemsPerPage,
  categoryId,
  companyId,
  subCategoryId,
  sortId // Now used as a filter, not sorter
) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredData = products.filter((item) => {
    const matchesCategory = categoryId ? item.categoryId === categoryId : true;
    const matchesSubCategory = subCategoryId ? item.subCategoryId === subCategoryId : true;
    const matchesCompany = companyId ? item.companyId === companyId : true;
    const matchesSortId = sortId ? item.sortId === sortId : true;

    const categoryMatch =
      categoryId && subCategoryId
        ? matchesCategory && matchesSubCategory
        : matchesCategory;

    return categoryMatch && matchesCompany && matchesSortId;
  });

  const paginatedData = filteredData.slice(startIndex, endIndex);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(paginatedData);
    }, 3000);
  });
};
