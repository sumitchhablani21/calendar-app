function DayCell({ date, today, startDate, endDate, onClick }) {
  if (!date) return <div className="min-h-13" />;

  const isSameDay = (d1, d2) =>
    d1 && d2 && d1.toDateString() === d2.toDateString();

  const isInRange = startDate && endDate && date > startDate && date < endDate;

  const isStart = isSameDay(date, startDate);
  const isEnd = isSameDay(date, endDate);
  const isToday = isSameDay(date, today);

  const baseClass =
    "relative min-h-13 cursor-pointer rounded-lg border font-inherit text-inherit transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8dc9c4]";

  let stateClass = "border-[#e8e2d9] bg-white hover:border-[#d0cabf] hover:shadow-[0_12px_20px_rgba(73,53,34,0.12)]";

  if (isStart || isEnd) {
    stateClass =
      "scale-[1.03] border-[#0f766e] bg-[#0f766e] text-white shadow-[0_12px_24px_rgba(15,118,110,0.35)] ring-1 ring-[#0f766e]/35 motion-safe:animate-[pulse_0.4s_ease-out_1]";
  } else if (isInRange) {
    stateClass = "border-[#8dc9c4] bg-[#d6f0ee] shadow-[inset_0_0_0_1px_#b7dfdb] motion-safe:animate-[pulse_0.3s_ease-out_1]";
  }

  const todayClass = isToday ? " border-[#ea580c]" : "";

  return (
    <button
      type="button"
      className={baseClass + " " + stateClass + todayClass}
      onClick={() => onClick(date)}
      aria-label={date.toDateString()}
    >
      <span className="inline-block pt-0.5 text-[0.92rem] font-semibold">{date.getDate()}</span>
      {isToday && (
        <span
          className={
            "absolute bottom-2 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full " +
            (isStart || isEnd ? "bg-white" : "bg-[#ea580c]")
          }
        />
      )}
    </button>
  );
}

export default DayCell;
