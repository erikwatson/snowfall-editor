import { useDispatch, useSelector } from "react-redux";
import { Control } from "../../control/control";
import { ControlGroup } from "../../controlGroup/controlGroup";
import { Select } from "../../select/select";
import { CheckBox } from "../../checkbox/checkbox";
import type { RootState, AppDispatch } from "../../../store";
import {
  setEndDay,
  setEndMonth,
  setScheduleEnabled,
  setStartDay,
  setStartMonth,
} from "../../../features/config/schedule.slice";

const dateMap: Record<string, { days: number }> = {
  january: { days: 31 },
  february: { days: 29 },
  march: { days: 31 },
  april: { days: 30 },
  may: { days: 31 },
  june: { days: 30 },
  july: { days: 31 },
  august: { days: 31 },
  september: { days: 30 },
  october: { days: 31 },
  november: { days: 30 },
  december: { days: 31 },
};

// Use zero-based month numbers in Redux: January = 0, December = 11.
const months = Object.keys(dateMap);

const getDays = (month: number | null) => {
  if (month === null) return [];

  const monthName = months[month];
  const count = dateMap[monthName]?.days ?? 0;

  return Array.from({ length: count }, (_, index) => index + 1);
};

export const ScheduleSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const schedule = useSelector((state: RootState) => state.userSchedule);

  const clearStartDay = () => dispatch(setStartDay(null));
  const clearEndDay = () => dispatch(setEndDay(null));

  const monthOptions = (
    <>
      <option value="">Select a month</option>
      {months.map((month, index) => (
        <option key={month} value={index}>
          {month.charAt(0).toUpperCase() + month.slice(1)}
        </option>
      ))}
    </>
  );

  const dayOptions = (month: number | null) => (
    <>
      <option value="">Select a day</option>
      {getDays(month).map((day) => (
        <option key={day} value={day}>
          {day}
        </option>
      ))}
    </>
  );

  return (
    <>
      <h2>Schedule settings</h2>
      <p>These will only be exported if they're enabled and everything is set.</p>

      <ControlGroup>
        <Control
          name="Enable"
          tooltip="Should snowfall only run at a certain time of the year?"
          value={schedule.enabled}
          reset={() => dispatch(setScheduleEnabled(false))}
          showOutput={false}
          onChange={(event) => {
            const checked = (event.target as HTMLInputElement).checked;
            dispatch(setScheduleEnabled(checked));
          }}
        >
          <CheckBox />
        </Control>

        {schedule.enabled && (
          <>
            <Control
              name="Start month"
              tooltip="The month to start from"
              value={schedule.from.month ?? ""}
              reset={() => dispatch(setStartMonth(null))}
              onChange={(event) => {
                const value = event.target.value;
                dispatch(setStartMonth(value === "" ? null : Number(value)));
              }}
            >
              <Select>{monthOptions}</Select>
              {/* <Select></Select> */}
            </Control>

            {schedule.from.month !== null && (
              <Control
                name="Start day"
                tooltip="The day to start from"
                value={schedule.from.day ?? ""}
                reset={clearStartDay}
                onChange={(event) => {
                  const value = event.target.value;
                  dispatch(setStartDay(value === "" ? null : Number(value)));
                }}
              >
                <Select>{dayOptions(schedule.from.month)}</Select>
              </Control>
            )}

            {schedule.from.month !== null && schedule.from.day !== null && (
              <Control
                name="End month"
                tooltip="The month to end on"
                value={schedule.to.month ?? ""}
                reset={() => dispatch(setEndMonth(null))}
                onChange={(event) => {
                  const value = event.target.value;
                  dispatch(setEndMonth(value === "" ? null : Number(value)));
                }}
              >
                <Select>{monthOptions}</Select>
              </Control>
            )}

            {schedule.from.month !== null &&
              schedule.from.day !== null &&
              schedule.to.month !== null && (
                <Control
                  name="End day"
                  tooltip="The day to end on"
                  value={schedule.to.day ?? ""}
                  reset={clearEndDay}
                  onChange={(event) => {
                    const value = event.target.value;
                    dispatch(setEndDay(value === "" ? null : Number(value)));
                  }}
                >
                  <Select>{dayOptions(schedule.to.month)}</Select>
                </Control>
              )}
          </>
        )}
      </ControlGroup>
    </>
  );
};