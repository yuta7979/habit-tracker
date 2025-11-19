import { useState } from "react";
import type { Habit } from "../types";

interface HabitFormProps {
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
}

const weekdays = ["日","月","火","水","木","金","土"];

export default function HabitForm({ habits, setHabits }: HabitFormProps) {
  const [name, setName] = useState("");
  const [days, setDays] = useState<number[]>([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const toggleDay = (day: number) => {
    setDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || days.length === 0) return;

    const newHabit: Habit = {
      id: Date.now(),
      name,
      days,
      completions: {}, // ←必ず初期化
      startTime: startTime || undefined,
      endTime: endTime || undefined,
      completed: false, // 既存のフィールドも保持
    };

    setHabits([...habits, newHabit]);

    // フォームをリセット
    setName("");
    setDays([]);
    setStartTime("");
    setEndTime("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px", textAlign: "center" }}>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="習慣名"
        style={{ padding: "6px 10px", marginRight: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
      />
      <input
        type="time"
        value={startTime}
        onChange={e => setStartTime(e.target.value)}
        style={{ marginRight: "6px" }}
      />
      <input
        type="time"
        value={endTime}
        onChange={e => setEndTime(e.target.value)}
      />
      <div style={{ marginBottom: "10px" }}>
        {weekdays.map((d, i) => (
          <label key={i} style={{ marginRight: "6px", cursor: "pointer" }}>
            <input type="checkbox" checked={days.includes(i)} onChange={() => toggleDay(i)} />
            {d}
          </label>
        ))}
      </div>
      <button
        type="submit"
        style={{ padding: "6px 12px", borderRadius: "6px", border: "none", backgroundColor: "#4CAF50", color: "#fff", cursor: "pointer" }}
      >
        追加
      </button>
    </form>
  );
}
