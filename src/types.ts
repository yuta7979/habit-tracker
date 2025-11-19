export interface Habit {
  id: number;
  name: string;
  completed: boolean;   // 従来のチェック用（HabitList などで使う）
  days: number[];       // 0=日曜, 1=月曜, … 6=土曜
  startTime?: string;   // "07:00"
  endTime?: string;     // "07:30"

  // 追加：カレンダー上で日ごとの完了状態を管理
  completions?: { [date: string]: boolean };
}
