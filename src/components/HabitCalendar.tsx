import { useState } from "react";
import type { Habit } from "../types";

interface HabitCalendarProps {
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
}

const cellStyle = {
  padding: "6px",
  minWidth: "70px",
  minHeight: "40px",
  textAlign: "center" as const,
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontSize: "12px",
  whiteSpace: "nowrap" as const,
};
const headerCellStyle = {
  ...cellStyle,
  fontWeight: 600,
  backgroundColor: "#f0f4f8",
};
const weekdays = ["日","月","火","水","木","金","土"];

export default function HabitCalendar({ habits, setHabits }: HabitCalendarProps) {
  const [startOfWeek, setStartOfWeek] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - d.getDay());
    return d;
  });

  // 日付単位のチェック反映
  const toggleCompletion = (habit: Habit, dateStr: string) => {
    const newCompletions = { ...(habit.completions || {}) };
    newCompletions[dateStr] = !newCompletions[dateStr];
    setHabits(habits.map(h => h.id === habit.id ? { ...h, completions: newCompletions } : h));
  };

  const getDaysOfWeek = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
  };

  const days = getDaysOfWeek();
  const today = new Date();

  return (
    <div style={{ overflowX: "auto", marginTop: "20px" }}>
      {/* 週移動ボタン */}
      <div style={{ marginBottom: "10px", textAlign: "center" }}>
        <button
          onClick={() => setStartOfWeek(prev => { const d = new Date(prev); d.setDate(d.getDate() - 7); return d; })}
        >
          ◀ 前の週
        </button>
        <button
          onClick={() => setStartOfWeek(prev => { const d = new Date(prev); d.setDate(d.getDate() + 7); return d; })}
          style={{ marginLeft: "10px" }}
        >
          次の週 ▶
        </button>
      </div>

      <table style={{ borderCollapse: "collapse", tableLayout: "fixed", width: "100%" }}>
        <thead>
          <tr>
            <th style={headerCellStyle}>習慣</th>
            {days.map(d => (
              <th
                key={d.toDateString()}
                style={{
                  ...headerCellStyle,
                  backgroundColor: d.toDateString() === today.toDateString() ? "#ffeaa7" : headerCellStyle.backgroundColor,
                }}
              >
                {d.getMonth()+1}/{d.getDate()}({weekdays[d.getDay()]})
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {habits.map(habit => (
            <tr key={habit.id}>
              <td style={cellStyle}>{habit.name}</td>
              {days.map(d => {
                const dateStr = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
                const done = habit.completions?.[dateStr];
                const isSetDay = habit.days.includes(d.getDay());

                // 表示内容
                const displayText = done
                  ? "✔"
                  : isSetDay
                  ? `${habit.startTime || "--:--"}${habit.endTime ? `〜${habit.endTime}` : ""}`
                  : "";

                return (
                  <td
                    key={dateStr}
                    style={{
                      ...cellStyle,
                      backgroundColor: done
                        ? "#4CAF50"
                        : isSetDay
                        ? "#a0d4ff"
                        : "#fff",
                      cursor: isSetDay ? "pointer" : "default",
                    }}
                    onClick={() => {
                      if (!isSetDay) return; // 非設定日は無効
                      toggleCompletion(habit, dateStr);
                    }}
                  >
                    {displayText}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
