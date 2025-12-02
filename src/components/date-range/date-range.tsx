import { ChangeEvent, useEffect, useState } from "react";
import { range } from "lodash";
import "./date-range.css";

type DateRangeProps = {
  value?: string;
  onChange?: (value: { month: number, day: number }) => void;
};

type Month = {
  name: string;
  days: number;
  value: number;
}

export const DateRange = ({ value, onChange }: DateRangeProps) => {
  const months: Month[] = [
    { name: "January", days: 31, value: 0 },
    { name: "February", days: 28, value: 1 },
    { name: "March", days: 31, value: 2 },
    { name: "April", days: 30, value: 3 },
    { name: "May", days: 31, value: 4 },
    { name: "June", days: 30, value: 5 },
    { name: "July", days: 31, value: 6 },
    { name: "August", days: 31, value: 7 },
    { name: "September", days: 30, value: 8 },
    { name: "October", days: 31, value: 9 },
    { name: "November", days: 30, value: 10 },
    { name: "December", days: 31, value: 11 }
  ];

  const [month, setMonth] = useState<Month>();
  const [day, setDay] = useState<number>(-1);

  useEffect(() => {
    if (month && day !== -1 && onChange) {
      onChange({
        month: month.value,
        day: day
      })
    }
  }, [month, day])

  useEffect(() => {
    setDay(-1);
  }, [month]);

  return (
    <>
      <select onChange={(event) => setMonth(months[parseInt(event.target.value)])} value={month?.value}>
        <option value={-1}></option>
        {months.map(month => (
          <option value={month.value}>{month.name}</option>
        ))}
      </select>
      <select onChange={(event) => setDay(parseInt(event.target.value))} value={day}>
        <option value={-1}></option>
        {month?.days && (
          range(1, month.days + 1).map((day) => (
            <option value={day}>{day}</option>
          ))
        )}
      </select>
    </>
  );
};
