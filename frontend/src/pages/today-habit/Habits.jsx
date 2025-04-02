import React, { useEffect, useState } from "react";
import styles from "@today-habit/Habits.module.css";
import { getHabitDone, patchHabitDone } from "@api/today-habit/habitDone.api";
import { getHabits } from "@api/today-habit/habit.api";
import { postHabitDone } from "../../api/today-habit/habitDone.api";

function Habits({ studyId, refresh }) {
  const [habits, setHabits] = useState([]);
  const [habitCheck, setHabitCheck] = useState([]);
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });
  const handleClick = async (habitId) => {
    try {
      const habitDone = await getHabitDone(habitId, today);
      if (habitDone) {
        const updateHabitDone = await patchHabitDone(habitDone[0].id, {
          isDone: !habitDone[0].isDone,
        });
        setHabitCheck((prev) =>
          prev.map((habit) =>
            habit.habitId === habitId
              ? { ...habit, isDone: !habit.isDone }
              : habit
          )
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLoad = async () => {
    const result = await getHabits(studyId);
    const checked = await Promise.all(
      result.map(async (habit) => {
        const habitDone = await getHabitDone(habit.id, today);
        let isDone = false;
        const data = { isDone, dayOfWeek: today };
        if (habitDone.length === 0) {
          await postHabitDone(habit.id, data);
        }

        if (habitDone.length >= 1) {
          isDone = habitDone[0].isDone;
        }
        return { habitId: habit.id, isDone };
      })
    );

    setHabits(result);
    setHabitCheck(checked);
  };

  useEffect(() => {
    handleLoad();
  }, [refresh]);

  return (
    <div className={styles.habitList}>
      {habits.length === 0 ? (
        <p className={styles.noHabitText}>
          아직 습관이 없어요 <br /> 목록 수정을 눌러 습관을 생성해보세요{" "}
        </p>
      ) : (
        habits.map((habit) => (
          <button
            key={habit.id}
            onClick={() => handleClick(habit.id)}
            className={
              habitCheck.find((h) => h.habitId === habit.id)?.isDone
                ? styles.habitChecked
                : styles.habitUnchecked
            }
          >
            {habit.title}
          </button>
        ))
      )}
    </div>
  );
}

export default Habits;
