import DayCell from "./DayCell";
import { format } from "date-fns";

function CalendarGrid({
  viewDate,
  today,
  startDate,
  endDate,
  onDateClick,
  onPrevMonth,
  onNextMonth,
  onToday,
  onClearSelection,
  isMonthVisible,
}) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const trailingDays = (7 - ((firstDay + daysInMonth) % 7)) % 7;

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  for (let i = 0; i < trailingDays; i++) {
    days.push(null);
  }

  return (
    <section
      className={
        "rounded-2xl border border-[#d8d2ca] bg-white/90 p-3.5 transition-all duration-300 " +
        (isMonthVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-1 opacity-0")
      }
    >
      <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2.5">
        <h3 className="m-0 font-[Fraunces] text-[1.65rem] leading-tight text-[#1e1b18]">
          {format(viewDate, "MMMM yyyy")}
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrevMonth}
            className="rounded-lg border border-[#d8d2ca] bg-white px-2.5 py-1 text-xs font-semibold tracking-wide text-[#3b332a] uppercase transition hover:border-[#bfb6ab] hover:bg-[#f8f4ee]"
            aria-label="Go to previous month"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={onToday}
            className="rounded-lg border border-[#0f766e] bg-[#0f766e] px-2.5 py-1 text-xs font-bold tracking-wide text-white uppercase transition hover:bg-[#0b5e58]"
            aria-label="Go to current month"
          >
            Today
          </button>
          <button
            type="button"
            onClick={onNextMonth}
            className="rounded-lg border border-[#d8d2ca] bg-white px-2.5 py-1 text-xs font-semibold tracking-wide text-[#3b332a] uppercase transition hover:border-[#bfb6ab] hover:bg-[#f8f4ee]"
            aria-label="Go to next month"
          >
            Next
          </button>
        </div>
      </div>

      <p className="mb-2.5 text-[0.78rem] text-[#6a5c4f] md:text-xs">
        Select a start and end date
      </p>

      <div className="grid grid-cols-7 gap-1.5">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            className="text-center text-[0.68rem] font-bold tracking-[0.06em] text-[#6a5c4f] uppercase"
          >
            {d}
          </div>
        ))}

        {days.map((date, index) => (
          <DayCell
            key={index}
            date={date}
            today={today}
            startDate={startDate}
            endDate={endDate}
            onClick={onDateClick}
          />
        ))}
      </div>

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={onClearSelection}
          disabled={!startDate && !endDate}
          className="rounded-lg border border-[#d8d2ca] bg-white px-2.5 py-1 text-xs font-semibold tracking-wide text-[#3b332a] uppercase transition enabled:hover:border-[#bfb6ab] enabled:hover:bg-[#f8f4ee] disabled:cursor-not-allowed disabled:opacity-45"
          aria-label="Clear selected date range"
        >
          Clear Selection
        </button>
      </div>
    </section>
  );
}

export default CalendarGrid;
