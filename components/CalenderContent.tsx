export default function CalenderContent() {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();
  const year = now.getFullYear();

  const monthNames = [
    'january','february','march','april','may','june',
    'july','august','september','october','november','december'
  ];

  const firstDayRaw = new Date(year, month, 1).getDay();
  const firstDayMon = firstDayRaw === 0 ? 6 : firstDayRaw - 1;
  const dayIndex = firstDayMon + day - 1;
  const row = Math.floor(dayIndex / 7);
  const col = dayIndex % 7;

  const gridTop = 24;
  const rowHeight = 10.4;
  const gridLeft = 4.8;
  const colWidth = 12.9;

  const circleLeft = gridLeft + (col + 0.5) * colWidth;
  const circleTop = gridTop + (row + 0.5) * rowHeight;

  return (
    <div className="relative select-none">
      <img src={`/${monthNames[month]}.png`} className="w-full" alt={monthNames[month]} />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "11%",
          aspectRatio: "1 / 1",
          backgroundColor: "rgba(255, 80, 80, 0.35)",
          border: "3px solid rgba(255, 50, 50, 0.7)",
          top: `${circleTop}%`,
          left: `${circleLeft}%`,
          transform: "translate(-50%, 0)",
        }}
      />
    </div>
  );
}