"use client";
import { useEffect, useState } from "react";
import useAppDispatch from "@/lib/hooks/appDispatch";
import useAppSelector from "@/lib/hooks/appSelector";
import { RootState } from "@/lib/store/store";
import { fetchPopulationData, clearData } from "@/lib/store/populationSlice";
import LineChart from "./LineChart";
import Dropdown from "./DropdownComponent";

const Spinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
  </div>
);

const PopulationChartComponent = () => {
  const dispatch = useAppDispatch();
  const [selectedIndicator, setSelectedIndicator] = useState("SP.POP.TOTL");
  const [selectedRange, setSelectedRange] = useState(5);
  const { data, loading, error } = useAppSelector(
    (state: RootState) => state.populationSlice
  );

  useEffect(() => {
    dispatch(
      fetchPopulationData({
        indi: selectedIndicator,
        minYear: (2023 - selectedRange).toString(),
      })
    );

    return () => {
      dispatch(clearData());
    };
  }, [dispatch, selectedIndicator, selectedRange]);

  return (
    <div>
      <div className="flex justify-between mb-4 ">
        <Dropdown
          dropdownItems={[
            { title: "Population", value: "SP.POP.TOTL" },
            { title: "Population Density", value: "EN.POP.DNST" },
            { title: "Growth Rate", value: "SP.POP.GROW" },
            { title: "Life Expectancy at Birth", value: "SP.DYN.LE00.IN" },
            { title: "Birth Rate", value: "SP.DYN.CBRT.IN" },
            { title: "Death Rate", value: "SP.DYN.CDRT.IN" },
            { title: "Fertility Rate", value: "SP.DYN.TFRT.IN" },
          ]}
          onSelect={(item) => setSelectedIndicator(item.value)}
        />
        <Dropdown
          dropdownItems={[
            { title: "5 yrs", value: "5" },
            { title: "10 yrs", value: "10" },
            { title: "20 yrs", value: "20" },
            { title: "50 yrs", value: "50" },
            { title: "100 yrs", value: "100" },
          ]}
          onSelect={(item) => setSelectedRange(parseInt(item.value))}
        />
      </div>
      {loading && <Spinner />}
      {error && (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-red-600">Error: {error}</p>
        </div>
      )}
      {!loading && !error && (
        <div className="flex justify-center w-10/12 mx-auto">
          <LineChart
            data={data.map((item) => ({ ...item, value: item.value ?? 0 }))}
          />
        </div>
      )}
    </div>
  );
};

export default PopulationChartComponent;
