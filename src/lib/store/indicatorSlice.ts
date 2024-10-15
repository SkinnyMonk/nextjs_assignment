import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface IndicatorValue {
  title: string;
  value: number | null;
}

interface CountryIndicatorData {
  [indicator: string]: IndicatorValue[];
}

interface IndicatorState {
  data: { [country: string]: CountryIndicatorData };
  loading: boolean;
  error: string | null;
}

const initialState: IndicatorState = {
  data: {},
  loading: false,
  error: null,
};

export const fetchMultipleIndicatorData = createAsyncThunk<
  { [country: string]: CountryIndicatorData },
  {
    indicators: { title: string; value: string }[];
    year: string;
    countries: string;
  },
  { state: RootState }
>(
  "indicatorSlice/fetchMultipleIndicatorData",
  async ({ indicators, year, countries }) => {
    const fetchPromises = indicators.map((indicator) =>
      fetch(
        `https://api.worldbank.org/v2/country/${countries}/indicator/${indicator.value}?date=${year}&format=json&per_page=10`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Failed to fetch data for indicator: ${indicator.title}`
            );
          }
          return response.json();
        })
        .then((data) => {
          return data[1].reduce(
            (
              acc: { [country: string]: IndicatorValue[] },
              item: { country: { value: string }; value: string | null }
            ) => {
              const countryName = item.country.value;
              const indicatorValue =
                item.value !== null ? parseFloat(item.value) : null;

              if (!acc[countryName]) {
                acc[countryName] = [];
              }
              acc[countryName][indicator.title] = indicatorValue;
              return acc;
            },
            {}
          );
        })
    );

    const results = await Promise.all(fetchPromises);

    const combinedResults = results.reduce(
      (acc: { [country: string]: CountryIndicatorData }, countryData) => {
        for (const country in countryData) {
          if (!acc[country]) {
            acc[country] = {};
          }
          for (const indicator in countryData[country]) {
            if (!acc[country][indicator]) {
              acc[country][indicator] = [];
            }
            acc[country][indicator].push(countryData[country][indicator]);
          }
        }
        return acc;
      },
      {}
    );

    return combinedResults;
  }
);

const indicatorSlice = createSlice({
  name: "indicatorSlice",
  initialState,
  reducers: {
    clearData: (state) => {
      state.data = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMultipleIndicatorData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMultipleIndicatorData.fulfilled,
        (
          state,
          action: PayloadAction<{ [country: string]: CountryIndicatorData }>
        ) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchMultipleIndicatorData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch indicator data";
      });
  },
});

export const { clearData } = indicatorSlice.actions;

export default indicatorSlice.reducer;
