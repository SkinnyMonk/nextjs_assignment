import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import millify from "millify";

Chart.register(...registerables);

interface DataItem {
  date: string;
  value: number | null;
}

interface LineChartProps {
  data: DataItem[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");

    const gradientLine = ctx?.createLinearGradient(0, 0, 0, ctx.canvas.height);
    gradientLine?.addColorStop(0, "rgba(166, 79, 241, 1)");
    gradientLine?.addColorStop(1, "rgba(166, 79, 241, 0.1)");

    const chartData = {
      labels: data.map((item) => item.date),
      datasets: [
        {
          data: data.map((item) => item.value),
          borderColor: "rgb(166,79,241)",
          backgroundColor: gradientLine,
          fill: true,
          tension: 0,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            drawBorder: false,
            display: false,
          },

          beginAtZero: true,
          ticks: {
            callback: function (tickValue: string | number) {
              return millify(Number(tickValue), { space: true });
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          useHTML: true,
          backgroundColor: "white",
          titleColor: "black",
          bodyFont: {
            family: "Arial",
            size: 12,
            lineHeight: 1.2,
          },
          callbacks: {
            label: function () {
              const additionalInfo = "World 2";
              const additionalInfo1 = "India 3";
              const additionalInfo2 = "China 5";
              const additionalInfo3 = "USA 6";
              const additionalInfo4 = "Pakistan 4";

              return [
                additionalInfo,
                additionalInfo1,
                additionalInfo2,
                additionalInfo3,
                additionalInfo4,
              ];
            },
          },
        },
      },
    };

    if (ctx) {
      const lineChart = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: options,
      });

      return () => lineChart.destroy();
    }
  }, [data]);

  return (
    <div className="relative min-w-full min-h-full">
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineChart;
