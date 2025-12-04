import { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

export default function InstructorChart({ courses }) {
  const [currChart, setCurrChart] = useState("students");

  // Generate random colors for chart slices
  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
      colors.push(color);
    }
    return colors;
  };

  // Handle edge case (no courses)
  if (!courses || courses.length === 0) {
    return (
      <div className="flex h-[300px] md:h-[400px] items-center justify-center bg-richblack-800 rounded-xl text-richblack-200">
        No course data available.
      </div>
    );
  }

  // Data for "Students" chart
  const chartDataStudents = {
    labels: courses.map((course) => course.courseName || "Unnamed Course"),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled || 0),
        backgroundColor: generateRandomColors(courses.length),
        borderColor: "#1E1E1E",
        borderWidth: 2,
      },
    ],
  };

  // Data for "Income" chart
  const chartIncomeData = {
    labels: courses.map((course) => course.courseName || "Unnamed Course"),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated || 0),
        backgroundColor: generateRandomColors(courses.length),
        borderColor: "#1E1E1E",
        borderWidth: 2,
      },
    ],
  };

  // Chart.js configuration
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1200,
      easing: "easeOutQuart",
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#FFFFFF",
          font: { size: 13 },
          boxWidth: 15,
          boxHeight: 15,
        },
      },
      tooltip: {
        backgroundColor: "#222",
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        bodyColor: "#FFF",
        borderColor: "#444",
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="flex flex-col flex-1 rounded-xl bg-richblack-800 p-6  hover: transition-all duration-300">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <p className="text-xl font-semibold text-richblack-5">Visualize Data</p>

        {/* Chart Switch Buttons */}
        <div className="flex gap-2">
          {["students", "income"].map((type) => (
            <button
              key={type}
              onClick={() => setCurrChart(type)}
              className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-all duration-200 ${
                currChart === type
                  ? "bg-yellow-50 text-richblack-900 font-semibold"
                  : "bg-richblack-700 text-yellow-50 hover:bg-richblack-600"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[430px] flex items-center justify-center">
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  );
}
