"use client";
import useAppDispatch from "@/lib/hooks/appDispatch";
import useAppSelector from "@/lib/hooks/appSelector";
import { RootState } from "@/lib/store/store";
import { useEffect, useState } from "react";
import Dropdown from "./DropdownComponent";
import {
  fetchMultipleIndicatorData,
  clearData,
} from "@/lib/store/indicatorSlice";
import TableComponent from "./TableComponent";

const Spinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
  </div>
);

const PopulationTableComponent = () => {
  const dispatch = useAppDispatch();
  const [selectYear, setSelectYear] = useState("2023");
  const {
    data,
    loading = true,
    error,
  } = useAppSelector((state: RootState) => state.indicatorSlice);

  useEffect(() => {
    dispatch(
      fetchMultipleIndicatorData({
        indicators: [
          { title: "Population", value: "SP.POP.TOTL" },
          { title: "Density", value: "EN.POP.DNST" },
          { title: "Growth Rate", value: "SP.POP.GROW" },
          { title: "Life Exp. at Birth", value: "SP.DYN.LE00.IN" },
          { title: "Birth Rate", value: "SP.DYN.CBRT.IN" },
          { title: "Death Rate", value: "SP.DYN.CDRT.IN" },
          { title: "Fertility Rate", value: "SP.DYN.TFRT.IN" },
        ],
        year: selectYear,
        countries: "WLD;CHN;IND;USA;IDN;PAK",
      })
    );
    return () => {
      dispatch(clearData());
    };
  }, [dispatch, selectYear]);

  const sortedPopulation = Object.entries(data)
    .sort((a, b) => Number(b[1].Population[0]) - Number(a[1].Population[0]))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  const startYear = 2023;
  const endYear = 1960;
  const yearsArray = [];

  for (let year = startYear; year >= endYear; year--) {
    yearsArray.push({ title: year.toString(), value: year.toString() });
  }

  return (
    <div className="flex flex-col justify-end mx-12">
      <div className="flex justify-end items-center m-2">
        <Dropdown
          dropdownItems={yearsArray}
          onSelect={(year) => {
            setSelectYear(year.value);
          }}
        />
      </div>

      {loading && <Spinner />}
      {error && (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-red-600">Error: {error}</p>
        </div>
      )}
      {!loading && !error && <TableComponent data={sortedPopulation} />}
    </div>
  );
};

export default PopulationTableComponent;
