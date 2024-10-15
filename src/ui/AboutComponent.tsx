import Image from "next/image";

const AboutPopDop = () => {
  return (
    <section className=" py-12 px-6 bg-gray-100 gap-6">
      <Image
        src="/dd.png"
        alt="PopDop Logo"
        width={400}
        height={400}
        className="mx-auto "
      />

      <div className="text-left">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">About PopDop</h2>
        <p className="text-lg text-gray-600 mb-4">
          PopDop is a dynamic and innovative company specializing in the
          visualization of population-related data. We provide actionable
          insights by transforming complex demographic information into
          easy-to-understand charts, tables, and infographics.
        </p>

        <div className="flex flex-wrap justify-center mt-8">
          <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Data Visualization
              </h3>
              <p className="text-gray-600">
                Transform complex data into beautiful charts and tables.
              </p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Custom Reports
              </h3>
              <p className="text-gray-600">
                Get detailed demographic reports tailored to your needs.
              </p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Interactive Tools
              </h3>
              <p className="text-gray-600">
                Explore population trends through interactive visual tools.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPopDop;
