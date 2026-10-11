import { useEffect } from "react";
import "./snowfall.css";
import snowfall, { DEFAULT_CONTAINER_ID, Types } from "@erikwatson/snowfall";

type ScheduleDate = {
  month: number | null;
  day: number | null;
};

type SnowfallProps = {
  config: Types.UserConfig;
  schedule?: {
    enabled: boolean;
    from: ScheduleDate;
    to: ScheduleDate;
  };
};

const isValidDate = (
  month: number | null | undefined,
  day: number | null | undefined,
): boolean => {
  if (month == null || day == null) return false;

  const date = new Date(Date.UTC(2024, month, day));

  return (
    month >= 0 &&
    month <= 11 &&
    day >= 1 &&
    date.getUTCMonth() === month &&
    date.getUTCDate() === day
  );
};

const isWithinSchedule = (
  from: ScheduleDate,
  to: ScheduleDate,
): boolean => {
  if (
    from.month == null ||
    from.day == null ||
    to.month == null ||
    to.day == null
  ) {
    return false;
  }

  const today = new Date();
  const current = (today.getMonth() + 1) * 100 + today.getDate();
  const start = (from.month + 1) * 100 + from.day;
  const end = (to.month + 1) * 100 + to.day;

  // Supports schedules that cross the end of the calendar year.
  return start <= end
    ? current >= start && current <= end
    : current >= start || current <= end;
};

export const Snowfall = ({ config, schedule }: SnowfallProps) => {
  const hasValidSchedule =
    schedule?.enabled === true &&
    isValidDate(schedule.from.month, schedule.from.day) &&
    isValidDate(schedule.to.month, schedule.to.day);

  const isSnowfallPaused =
    hasValidSchedule &&
    schedule !== undefined &&
    !isWithinSchedule(schedule.from, schedule.to);

  useEffect(() => {
    const snowfallConfig: Types.UserConfig = {
      ...config,
      attachTo: DEFAULT_CONTAINER_ID,
    };

    snowfall.stop();

    if (hasValidSchedule && schedule) {
      const librarySchedule: Types.UserSchedule = {
        from: {
          month: schedule.from.month! + 1,
          day: schedule.from.day!,
        },
        to: {
          month: schedule.to.month! + 1,
          day: schedule.to.day!,
        },
      };

      snowfall.schedule(librarySchedule, snowfallConfig);
    } else {
      // Run continuously if scheduling is disabled or either date is incomplete.
      snowfall.start(snowfallConfig);
    }

    return () => {
      snowfall.stop();
    };
  }, [config, schedule, hasValidSchedule]);

  return (
    <div className="snowfall-preview">
      <div id={DEFAULT_CONTAINER_ID} />

      {isSnowfallPaused && (
        <div className="snowfall-notice" role="status">
          <strong>Snowfall is disabled</strong>
          <span>
            Today's date is outside of your scheduled range.
          </span>
        </div>
      )}
    </div>
  );
};
