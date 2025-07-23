import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderProducts: [],
    verifiedOrderProducts: [],
    verifiedOrdersFiles: [],
    returnedAndCancelledVerifiedOrders: [],
    returnedAndCancelledVerifiedOrdersFiles: [],
    companyOrderInvoices: [],
    manufacturerOrderInvoices: [],
  },
  reducers: {
    addOrderProduct(state, action) {
      state.orderProducts.push(action.payload); // PUSH instead of replace
    },
    removeOrderProduct(state, action) {
      const productIdToRemove = action.payload;
      state.orderProducts = state.orderProducts.filter(
        (product) => product.id !== productIdToRemove.id
      );
    },
    clearOrderSummary(state) {
      state.orderProducts = [];
    },
    manageOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const orderToUpdate = state.orderProducts.find(
        (order) => order.id === orderId
      );
      if (orderToUpdate) {
        orderToUpdate.status = status;
      }
    },

    addToVerifiedOrderProducts: (state, action) => {
      const order = action.payload;

      if (!order || !order.quantity || order.quantity <= 0) return;

      const lotCount = Math.floor(order.quantity / 1000);
      const groupId = order.id; // original order's ID becomes groupId

      const generatedLots = Array.from({ length: lotCount }, (_, index) => ({
        ...order,
        id: nanoid(),
        groupId,
        lotNumber: index + 1,
        entryId: nanoid(10),
        orderPositionInGroup: `${index + 1}/${lotCount}`,
      }));

      state.verifiedOrderProducts.push(...generatedLots);
      state.manufacturerOrderInvoices.push(...generatedLots);
      state.companyOrderInvoices.push(...generatedLots);
    },

    changeOrderProductQuantity: (state, action) => {
      const { orderId, quantity } = action.payload;
      const orderToUpdate = state.orderProducts.find(
        (order) => order.id === orderId
      );
      if (orderToUpdate) {
        orderToUpdate.quantity = quantity;
        orderToUpdate.status = "accepted";
      }
    },

    addToCompanyOrderInvoices: (state, action) => {
      const addingOrderInvoices = action.payload;
      const forwardedOrderInvoices = addingOrderInvoices.map((order) => ({
        ...order,
        isForwarded: true,
        entryId: nanoid(10),
      }));
      state.companyOrderInvoices.push(...forwardedOrderInvoices);
    },

    addToManufacturerOrderInvoices: (state, action) => {
      const addingOrderInvoices = action.payload;
      const forwardedOrderInvoices = addingOrderInvoices.map((order) => ({
        ...order,
        isForwarded: true, // Mark as forwarded
        entryId: nanoid(10),
      }));
      state.manufacturerOrderInvoices.push(...forwardedOrderInvoices);
    },

    addToReturnedAndCancelledVerifiedOrders: (state, action) => {
      const groupId = action.payload;

      const newReturnAndCancelledVerifiedOrders =
        state.verifiedOrderProducts.filter(
          (order) => order.groupId === groupId
        );
      state.verifiedOrderProducts = state.verifiedOrderProducts.filter(
        (order) => order.groupId !== groupId
      );

      // Push to returnedAndCancelledVerifiedOrders
      state.returnedAndCancelledVerifiedOrders.push(
        ...newReturnAndCancelledVerifiedOrders
      );

      // Update original order status
      const orderToUpdate = state.orderProducts.find(
        (order) => order.id === groupId
      );
      if (orderToUpdate) {
        orderToUpdate.status = "acceptedAndCancelled";
      }
    },

    addToVerifiedOrdersFiles: (state, action) => {
      const file = action.payload; // { id, fileName, createdAt, ids }
      const ids = file.ids;

      // 1. Add file metadata to the files array
      state.verifiedOrdersFiles.push(file);

      // 2. Update matching orders with file reference
      state.verifiedOrderProducts = state.verifiedOrderProducts.map((order) => {
        if (ids.includes(order.id)) {
          return {
            ...order,
            fileId: file.id,
            fileMeta: {
              fileName: file.fileName,
              createdAt: file.createdAt,
            },
          };
        }
        return order;
      });

      // 3. Add a file marker object to the end of the list for UI
      state.verifiedOrderProducts.push({
        type: "fileMarker",
        ...file,
        fileId: file.id,
      });
    },

    addToReturnedAndCancelledVerifiedOrdersFiles: (state, action) => {
      const file = action.payload;
      const ids = file.ids;

      // 1. Add the file metadata to the file list
      state.returnedAndCancelledVerifiedOrdersFiles.push(file);

      // 2. Update the matching orders
      state.returnedAndCancelledVerifiedOrders =
        state.returnedAndCancelledVerifiedOrders.map((order) => {
          if (ids.includes(order.id)) {
            return {
              ...order,
              fileId: file.id,
              fileMeta: {
                fileName: file.fileName,
                createdAt: file.createdAt,
              },
            };
          }
          return order;
        });
    },

    clearReturnedAndCancelledVerifiedOrders: (state, action) => {
      state.returnedAndCancelledVerifiedOrders = [];
    },
  },
});

export const {
  addOrderProduct,
  removeOrderProduct,
  manageOrderStatus,
  clearOrderSummary,
  addToVerifiedOrderProducts,
  addToVerifiedOrdersFiles,
  changeOrderProductQuantity,
  addToCompanyOrderInvoices,
  addToManufacturerOrderInvoices,
  addToReturnedAndCancelledVerifiedOrders,
  clearReturnedAndCancelledVerifiedOrders,
  addToReturnedAndCancelledVerifiedOrdersFiles,
} = orderSlice.actions;

export default orderSlice.reducer;
