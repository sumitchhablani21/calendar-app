import { useState } from "react";

export default function useDateRange() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const clearSelection = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const handleDateClick = (date) => {
    // First click
    if (!startDate) {
      setStartDate(date);
      return;
    }

    // Second click
    if (!endDate) {
      if (date < startDate) {
        // swap
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
      return;
    }

    // Reset
    setStartDate(date);
    setEndDate(null);
  };

  return {
    startDate,
    endDate,
    handleDateClick,
    clearSelection,
  };
}
