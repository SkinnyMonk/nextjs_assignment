import PopulationChartComponent from "@/ui/PopulationChartComponent";
import PopulationTableComponent from "@/ui/PopulationTableComponent";

const Population = () => {
  return (
    <div className="bg-gray-100 p-6">
      <PopulationChartComponent />
      <div className=" h-0.5 bg-gray-300 my-8 mx-12 rounded-lg"></div>
      <PopulationTableComponent />
    </div>
  );
};

export default Population;
