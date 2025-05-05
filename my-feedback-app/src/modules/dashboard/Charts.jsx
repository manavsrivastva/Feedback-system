// src/modules/dashboard/Charts.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Cell
} from "recharts";

const bronzeGlow = {
  filter: "drop-shadow(0 0 8px #cd7f32)",
};

const Charts = ({ data }) => {
  const categoryCounts = data.reduce((acc, entry) => {
    acc[entry.category] = (acc[entry.category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(categoryCounts).map(([category, count]) => ({
    category,
    count,
  }));

  const [activeIndex, setActiveIndex] = React.useState(null);

  return (
    <div style={{ marginTop: "3rem", padding: "1rem", backgroundColor: "#0f172a", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)" }}>
      <h3 style={{ textAlign: "center", color: "#0ea5e9", fontFamily: "Poppins", marginBottom: "1rem" }}>
        Feedback Count by Category
      </h3>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          barCategoryGap={25}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="category" stroke="#e2e8f0" />
          <YAxis stroke="#e2e8f0" allowDecimals={false} />
          <Tooltip
  contentStyle={{
    backgroundColor: "#1e293b",  // Dark background
    border: "none",
    borderRadius: "8px",
    color: "#e2e8f0",           // Light text
    fontFamily: "Poppins",
    boxShadow: "0 0 10px #0ea5e9", // Optional glowing shadow
  }}
  cursor={{ fill: "transparent" }} // Removes the light gray hover box
/>

          <Legend />
          <Bar
            dataKey="count"
            fill="#38bdf8"
            radius={[8, 8, 0, 0]}
            animationDuration={1000}
            onMouseOver={(_, index) => setActiveIndex(index)}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                style={index === activeIndex ? bronzeGlow : {}}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
