import React, { useState } from "react";
import { getEventByCategoriesAndDate } from "../Features/AllEventFeature";
import { useDispatch } from "react-redux";

const cetegories = ["sports", "music", "arts", "technology", "food", "other"];

const FilterEvents = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [cetegory, setCetegory] = useState("");

  const dispatch = useDispatch();

  const handleFilterChange = () => {
    if (cetegory || (fromDate && toDate)) {
      dispatch(getEventByCategoriesAndDate({ cetegory, fromDate, toDate }));
    } else {
      alert("Please select a category or a date range");
    }
  };

  return (
    // Use w-full and horizontal padding to stretch across the viewport
    <div className="w-full px-4 bg-white p-6 rounded-lg shadow-md">
      {/* Flex container to distribute fields equally */}
      <div className="flex items-center justify-between space-x-4">
        {/* Category Field */}
        <div className="flex flex-col flex-1">
          <label className="text-gray-700 font-medium mb-1">Category</label>
          <select
            onChange={(e) => setCetegory(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            {cetegories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* From Date Field */}
        <div className="flex flex-col flex-1">
          <label className="text-gray-700 font-medium mb-1">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* To Date Field */}
        <div className="flex flex-col flex-1">
          <label className="text-gray-700 font-medium mb-1">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Apply Filter Button */}
        <div className="flex flex-col justify-end flex-1">
          <button
            onClick={handleFilterChange}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 whitespace-nowrap"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterEvents;
