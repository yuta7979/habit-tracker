import { useState, useEffect } from "react";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import HabitCalendar from "./components/HabitCalendar";
import type { Habit } from "./types";

export default function App() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const stored = localStorage.getItem("habits");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const today = new Date();
  const weekdayNames = ["日","月","火","水","木","金","土"];
  const todayStr = `${today.getFullYear()}年${today.getMonth()+1}月${today.getDate()}日(${weekdayNames[today.getDay()]})`;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <h1>Habit Tracker</h1>
      <div style={{ marginTop: "0.5rem", fontSize: "1rem", color:"#666" }}>
        今日: {todayStr}
      </div>
      <HabitForm habits={habits} setHabits={setHabits} />
      <HabitList habits={habits} setHabits={setHabits} />
      <HabitCalendar habits={habits} setHabits={setHabits} />
    </div>
  );
}
