import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
  Pressable,
} from "react-native";
import Animated from "react-native-reanimated";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

import { RootState, AppDispatch } from "../store";
import { loadTasks } from "../store/tasksSlice";
import { TaskItem } from "../components";
import { calculateLongestStreak } from "../utils/calculateStreak";
import Colors from "../../assets/colors";

const TaskListScreen = ({ navigation }: { navigation: any }) => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch: AppDispatch = useDispatch();
  const [count, setCount] = useState({ streak: 0, completed: 0 });

  const styles = useStyles();

  useEffect(() => {
    const loadTasksFromStorage = async () => {
      try {
        const tasksString = await AsyncStorage.getItem("tasks");
        if (tasksString) {
          dispatch(loadTasks(JSON.parse(tasksString)));
        }
      } catch (error) {
        __DEV__ &&
          console.error("Error loading tasks from AsyncStorage", error);
      }
    };
    loadTasksFromStorage();
  }, [dispatch]);

  useEffect(() => {
    setCount({
      streak: calculateLongestStreak(tasks).maxStreak,
      completed: calculateLongestStreak(tasks).totalCompleted,
    });
  }, [tasks]);

  const onRefresh = () => {
    dispatch(loadTasks(tasks));
  };

  return (
    <Animated.View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          numberOfLines={2}
          style={[
            styles.streakText,
            {
              textAlign: "left",
            },
          ]}
        >
          Completed: {count.completed}
        </Text>
        <Text
          numberOfLines={2}
          style={[
            styles.streakText,
            {
              textAlign: "right",
            },
          ]}
        >
          Max.Streak: {count.streak}
        </Text>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(task) => task.id.toString()}
        renderItem={({ item }) => (
          <TaskItem task={item} navigation={navigation} />
        )}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        style={styles.taskList}
      />

      <View style={styles.fabContainer}>
        <Pressable
          onPress={() => navigation.navigate("taskform")}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
            },
            styles.fabIcon,
          ]}
        >
          <Ionicons name={"add-outline"} size={30} color={Colors.white} />
        </Pressable>
      </View>
    </Animated.View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 0,
      backgroundColor: "#f8f9fa",
      padding: 20,
      // borderWidth: 1,
    },
    streakText: {
      fontSize: 18,
      fontWeight: "bold",
      marginVertical: 10,
      flex: 1,
    },
    taskList: {
      marginTop: 10,
    },
    fabContainer: { position: "absolute", right: 50, bottom: 50 },
    fabIcon: {
      borderWidth: 0.5,
      padding: 13,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.app_color,
      borderColor: Colors.app_color,
      elevation: 1,
    },
  });
};

export default TaskListScreen;
