import type { Habit } from "../types";

interface HabitListProps {
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
}

const weekdays = ["日","月","火","水","木","金","土"];

export default function HabitList({ habits, setHabits }: HabitListProps) {
  const todayIndex = new Date().getDay();

  const deleteHabit = (id: number) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {habits.map(habit => {
        const isToday = habit.days.includes(todayIndex);
        return (
          <li
            key={habit.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              marginBottom: "10px",
              backgroundColor: isToday ? "#fff" : "#f0f0f0",
              borderRadius: "6px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              opacity: isToday ? 1 : 0.5,
            }}
          >
            <div style={{ fontWeight: "bold", color: "#333" }}>
              {habit.name} ({habit.days.map(d => weekdays[d]).join("・")})
            </div>
            <button
              onClick={() => deleteHabit(habit.id)}
              style={{
                backgroundColor: "#ff4d4f",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              削除
            </button>
          </li>
        );
      })}
    </ul>
  );
}
