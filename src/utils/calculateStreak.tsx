interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

export const calculateLongestStreak = (
  tasks: Task[]
): { maxStreak: number; totalCompleted: number } => {
  let maxStreak = 0;
  let currentStreak = 0;

  let totalCompleted = 0;

  tasks.forEach((task) => {
    if (task.completed) {
      currentStreak += 1;
      totalCompleted += 1;
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
      }
    } else {
      currentStreak = 0;
    }
  });

  return { maxStreak, totalCompleted };
};
