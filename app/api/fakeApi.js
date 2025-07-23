// fakeApi.js
const allItems = Array.from({ length: 100 }, (_, index) => ({
    id: index.toString(),
    name: `Item ${index + 1}`,
    image: 'https://via.placeholder.com/150',
  }));
  
  export const fakeFetchItems = (page = 1, limit = 10) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * limit;
        const end = start + limit;
        const items = allItems.slice(start, end);
        resolve(items);
      }, 3000); // simulate network delay
    });
  };
  