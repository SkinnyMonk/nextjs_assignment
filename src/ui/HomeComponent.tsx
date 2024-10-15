"use client";
import useAppDispatch from "@/lib/hooks/appDispatch";
import useAppSelector from "@/lib/hooks/appSelector";
import { RootState } from "@/lib/store/store";
import { fetchPopulationData, clearData } from "@/lib/store/populationSlice";
import { useEffect } from "react";
import millify from "millify";
import LineChart from "./LineChart";
import { fetchMultipleIndicatorData } from "@/lib/store/indicatorSlice";

const HomeComponent = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(
    (state: RootState) => state.populationSlice
  );
  const areaOfLand = 148939000;

  useEffect(() => {
    dispatch(fetchPopulationData({ indi: "SP.POP.TOTL", minYear: "1960" }));
    return () => {
      dispatch(clearData());
    };
  }, [dispatch]);

  const { data: indicatorData } = useAppSelector(
    (state: RootState) => state.indicatorSlice
  );

  useEffect(() => {
    dispatch(
      fetchMultipleIndicatorData({
        indicators: [
          { title: "Population", value: "SP.POP.TOTL" },
          { title: "Population Density", value: "EN.POP.DNST" },
          { title: "Growth Rate", value: "SP.POP.GROW" },
          { title: "Life Expectancy at Birth", value: "SP.DYN.LE00.IN" },
        ],
        year: "2023",
        countries: "WLD",
      })
    );
    return () => {
      dispatch(clearData());
    };
  }, [dispatch]);
  const population = parseInt(
    indicatorData["World"]?.Population?.toString() || "0",
    10
  );
  const growthRate = parseFloat(
    indicatorData["World"]?.["Growth Rate"]?.toString() || "0"
  );
  const lifeExp = parseFloat(
    indicatorData["World"]?.["Life Expectancy at Birth"]?.toString() || "0"
  );
  const popChange = population * (growthRate / (100 + growthRate)) || 0;
  const avgDensity =
    parseInt(
      indicatorData["World"]?.["Population Density"]?.toString() || "0",
      10
    ) || population / areaOfLand;
  const Spinner = () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );

  return (
    <div className="flex flex-col justify-between ">
      <div className="flex justify-between  gap-4 mb-8 ">
        <div className="flex-1 rounded-xl text-center bg-gray-100 p-8">
          <h2 className="text-sm text-gray-500 mb-2">World Population</h2>
          <h1 className="text-4xl font-medium text-black">
            {indicatorData["World"] && indicatorData["World"].Population != null
              ? millify(population, { space: true })
              : 0}
          </h1>
        </div>
        <div className="flex-1 rounded-xl  text-center bg-gray-100 p-8 ">
          <h2 className="text-sm text-gray-500 mb-2">Average Density</h2>
          <h1 className="text-4xl font-medium text-black">
            {millify(avgDensity)} p/sqkm
          </h1>
        </div>
      </div>

      <div className="flex justify-between rounded-xl bg-gray-100 flex-wrap py-16 ">
        <div className="flex flex-col justify-between p-8 min-w-72">
          <div className="text-left">
            <h2 className="text-sm text-gray-500 mb-2">Total Population</h2>
            <p className="text-4xl font-medium text-black mb-3">
              {indicatorData["World"] &&
              indicatorData["World"].Population != null
                ? millify(population, { space: true })
                : 0}
            </p>
            <p className="text-sm text-gray-500 mb-2">Change in last year </p>
            <h1 className="text-4xl font-medium text-black mb-3">
              {growthRate !== 0 ? (
                <>
                  {growthRate > 0 ? "+" : "-"}
                  {millify(popChange, { space: true })}
                </>
              ) : (
                0
              )}
            </h1>
            <p className="text-sm text-gray-500 mb-2">
              Life Expectancy at Birth{" "}
            </p>
            <h1 className="text-4xl font-medium text-black mb-3">
              {lifeExp !== 0 ? `${lifeExp} Yrs` : "N/A"}
            </h1>
          </div>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-full font-bold">
            Dive Deeper
          </button>
        </div>

        {loading && <Spinner />}
        {error && (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-red-600">Error: {error}</p>
          </div>
        )}
        {!loading && !error && (
          <div className="w-7/12 ">
            <LineChart
              data={data.map((item) => ({ ...item, value: item.value ?? 0 }))}
            />
          </div>
        )}
        <div className="h-0.5 bg-gray-300 w-full  m-12"></div>
      </div>
    </div>
  );
};

export default HomeComponent;
