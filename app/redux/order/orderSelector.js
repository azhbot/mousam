export const selectOrderState = (state) => state.order;
export const selectOrderProducts = (state) => state.order.orderProducts;
export const selectVerifiedOrderProducts = (state) =>
  state.order.verifiedOrderProducts;
export const selectVerifiedOrdersFiles = (state) =>
  state.order.verifiedOrdersFiles;
export const selectCompayOrderInvoices = (state) =>
  state.order.companyOrderInvoices;
export const selectManufacturerInvoices = (state) =>
  state.order.manufacturerOrderInvoices;
export const selectReturnedAndCancelledVerifiedOrders = (state) =>
  state.order.returnedAndCancelledVerifiedOrders;
export const selectReturnedAndCancelledVerifiedOrdersFiles = (state) =>
  state.order.returnedAndCancelledVerifiedOrdersFiles;
