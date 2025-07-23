import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  samples: [],
  companySamplesInvoices: [],
  manufacturerSamplesInvoices: [],
  samplesFiles: [],
};

const sampleSlice = createSlice({
  name: "sample",
  initialState,
  reducers: {
    addTosamples: (state, action) => {
      state.samples.push({
        ...action.payload,
      });
    },

    removeFromsamples: (state, action) => {
      state.samples = state.samples.filter(
        (sample) => sample.id !== action.payload.id
      );
    },
    clearsamples: (state) => {
      state.samples = [];
    },

    updateSampleStatus: (state, action) => {
      const { sampleId, status, quantity } = action.payload;
      const sample = state.samples.find((s) => s.id === sampleId);
      if (sample) {
        sample.status = status;
      }
      if (quantity) {
        sample.quantity = quantity;
      }
      if (status === "accepted") {
        const UpdatedSample = {
          ...sample,
          entryId: nanoid(10),
        };
        state.companySamplesInvoices.push(UpdatedSample);
        state.manufacturerSamplesInvoices.push(UpdatedSample);
      }
    },
    updateReturnStatus: (state, action) => {
      const sample = state.samples.find((s) => s.id === action.payload);
      if (sample) {
        sample.isReturned = true;
      }
    },

    addToCompanySamplesInvoices: (state, action) => {
      const sampleInvoices = action.payload;
      const forwardedSamplesInvoices = sampleInvoices.map((sample) => ({
        ...sample,
        isForwarded: true,
        entryId: nanoid(10),
      }));
      state.companySamplesInvoices.push(...forwardedSamplesInvoices);
    },
    removeFromCompanySamplesInvoices: (state, action) => {
      const sampleId = action.payload;
      state.companySamplesInvoices = state.companySamplesInvoices.filter(
        (sample) => sample.id !== sampleId
      );
    },

    addToSamplesFiles: (state, action) => {
      const file = action.payload;
      const ids = file.ids;

      state.samplesFiles.push(file);

      state.samples = state.samples.map((sample) => {
        if (ids.includes(sample.id)) {
          return {
            ...sample,
            fileId: file.id,
            fileMeta: {
              fileName: file.fileName,
              createdAt: file.createdAt,
            },
          };
        }
        return sample;
      });
      state.samples.push({
        ...file,
        fileId: file.id,
        type: "fileMarker",
        status: "accepted",
        status: "passed",
      });
    },
  },
});

export const {
  clearsamples,
  removeFromsamples,
  addTosamples,
  updateSampleStatus,
  updateReturnStatus,
  addToSamplesFiles,
  addToCompanySamplesInvoices,
  removeFromCompanySamplesInvoices,
} = sampleSlice.actions;

export default sampleSlice.reducer;
