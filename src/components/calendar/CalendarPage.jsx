import CalendarGrid from "./CalendarGrid";
import useDateRange from "../../hooks/useDateRange";
import NotesPanel from "../notes/NotesPanel";
import { format, addMonths, subMonths } from "date-fns";
import { useEffect, useRef, useState } from "react";
import januaryImage from "../../hero/january.jpg";
import februaryImage from "../../hero/february.jpg";
import marchImage from "../../hero/march.jpg";
import aprilImage from "../../hero/april.jpg";
import mayImage from "../../hero/may.jpg";
import juneImage from "../../hero/june.jpg";
import julyImage from "../../hero/july.jpg";
import augustImage from "../../hero/august.jpg";
import septemberImage from "../../hero/september.jpg";
import octoberImage from "../../hero/october.jpg";
import novemberImage from "../../hero/november.jpg";
import decemberImage from "../../hero/december.jpg";

const monthImages = [
  januaryImage,
  februaryImage,
  marchImage,
  aprilImage,
  mayImage,
  juneImage,
  julyImage,
  augustImage,
  septemberImage,
  octoberImage,
  novemberImage,
  decemberImage,
];

function CalendarPage() {
  const { startDate, endDate, handleDateClick, clearSelection } = useDateRange();
  const [viewDate, setViewDate] = useState(new Date());
  const [isMonthVisible, setIsMonthVisible] = useState(true);
  const hasMountedRef = useRef(false);
  const today = new Date();

  const handlePrevMonth = () => setViewDate((prev) => subMonths(prev, 1));
  const handleNextMonth = () => setViewDate((prev) => addMonths(prev, 1));
  const handleToday = () => setViewDate(new Date());
  const heroImage = monthImages[viewDate.getMonth()];
  const heroMonthLabel = format(viewDate, "MMMM");

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    setIsMonthVisible(false);

    const frame = requestAnimationFrame(() => {
      setIsMonthVisible(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [viewDate]);

  return (
    <main className="mx-auto my-5 w-[min(920px,90vw)] overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-[0_24px_60px_rgba(52,37,28,0.2)] backdrop-blur-sm">
      <section className="relative min-h-80 overflow-hidden">
        <img
          src={heroImage}
          alt={`${heroMonthLabel} hero`}
          className={
            "h-80 w-full object-cover transition-all duration-500 " +
            (isMonthVisible ? "scale-[1.03] opacity-100" : "scale-[1.08] opacity-0")
          }
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#0b1a1cb3] to-[#0b1a1c33]" />
        <div className="absolute bottom-6 left-6 text-white">
          <p className="m-0 text-[0.72rem] tracking-widest uppercase opacity-90">Plan Your Month</p>
          <h2 className="my-2 font-[Fraunces] text-[clamp(1.8rem,2vw+1rem,2.6rem)] leading-tight">
            {format(viewDate, "MMMM yyyy")}
          </h2>
          <p className="m-0 w-fit rounded-full border border-white/35 bg-white/15 px-3.5 py-2 text-sm">
            Today: {format(today, "EEEE, MMM d")}
          </p>
        </div>
      </section>

      <section className="grid gap-3 p-4 md:grid-cols-[1.55fr_1fr] md:gap-4 md:p-4">
        <CalendarGrid
          viewDate={viewDate}
          today={today}
          startDate={startDate}
          endDate={endDate}
          onDateClick={handleDateClick}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onToday={handleToday}
          onClearSelection={clearSelection}
          isMonthVisible={isMonthVisible}
        />

        <NotesPanel viewDate={viewDate} />
      </section>
    </main>
  );
}

export default CalendarPage;
