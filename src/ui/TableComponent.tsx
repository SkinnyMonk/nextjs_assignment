import millify from "millify";
import React from "react";

interface TableComponentProps {
  data: Record<string, Record<string, number | string | null>>;
}

const TableComponent: React.FC<TableComponentProps> = ({ data }) => {
  if (!data || Object.keys(data).length === 0) return null;

  const columns = Object.keys(data[Object.keys(data)[0]]);

  return (
    <div className="overflow-x-auto ">
      <table className="">
        <thead className="">
          <tr>
            <th className="px-4 py-2 border-b font-normal text-gray-700 text-sm text-left">
              Country
            </th>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-4 py-2 border-b text-gray-700 text-sm font-normal text-left"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([country, metrics], rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b font-normal text-gray-500 text-left">
                {country}
              </td>
              {columns.map((col, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-2 border-b font-normal text-gray-500 text-left"
                >
                  {metrics[col] !== null && metrics[col] != 0
                    ? `${millify(Number(metrics[col]))}${
                        col.includes("Rate") ? "%" : ""
                      }`
                    : "N/A"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
