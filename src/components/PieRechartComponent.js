import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
const PieRechartComponent = (pieDataFromEmpWrapper) =>  {
   let COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];

   let pieData = pieDataFromEmpWrapper.data;

   let totalExpenditure = 0.0
   for (let index = 0; index < pieData.length; index++) {
      const element = pieData[index];
      totalExpenditure += element["value"]
   }

   let CustomTooltip = ({ active, payload, label }) => {
      if (active) {
         return (
         <div
            className="custom-tooltip"
            style={{
               backgroundColor: "#ffff",
               padding: "5px",
               border: "1px solid #cccc"
            }}
         >
            <label>
               {`${payload[0].name}: ${payload[0].value}$, 
                  ${Math.round((100*payload[0].value)/totalExpenditure)}%`
               }
            </label>
         </div>
      );
   }
   return null;
};
// render() {
   return (
      <PieChart width={730} height={300}>
      <Pie
         data={pieData}
         color="#000000"
         dataKey="value"
         nameKey="name"
         cx="50%"
         cy="50%"
         outerRadius={120}
         fill="#8884d8"
      >
         {pieData.map((entry, index) => (
            <Cell
               key={`cell-${index}`}
               fill={COLORS[index % COLORS.length]}
            />
         ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      </PieChart>
      );
   // }
}
export default PieRechartComponent;