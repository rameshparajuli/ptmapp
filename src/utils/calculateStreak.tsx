interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

export const calculateLongestStreak = (tasks: Task[]): number => {
  let maxStreak = 0;
  let currentStreak = 0;

  tasks.forEach((task) => {
    if (task.completed) {
      currentStreak += 1;
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
      }
    } else {
      currentStreak = 0;
    }
  });

  return maxStreak;
};
