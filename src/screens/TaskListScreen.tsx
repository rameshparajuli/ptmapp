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
  const [streak, setStreak] = useState(0);

  const styles = useStyles();

  useEffect(() => {
    const loadTasksFromStorage = async () => {
      try {
        const tasksString = await AsyncStorage.getItem("tasks");
        if (tasksString) {
          dispatch(loadTasks(JSON.parse(tasksString)));
        }
      } catch (error) {
        console.error("Error loading tasks from AsyncStorage", error);
      }
    };
    loadTasksFromStorage();
  }, [dispatch]);

  useEffect(() => {
    setStreak(calculateLongestStreak(tasks));
  }, [tasks]);

  const onRefresh = () => {
    dispatch(loadTasks(tasks));
  };

  return (
    <Animated.View style={styles.container}>
      <Text style={styles.streakText}>Completed: {streak}</Text>
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
      textAlign: "right",
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
