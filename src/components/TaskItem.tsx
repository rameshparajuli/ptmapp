import React from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { deleteTask, editTask } from "../store/tasksSlice";
import { AppDispatch } from "../store";
import Colors from "../../assets/colors";
import Ionicons from "@expo/vector-icons/build/Ionicons";

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

// onPress={() => navigation.navigate("taskform", { task })}

const TaskItem = ({ task, navigation }: { task: Task; navigation: any }) => {
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    // transform: [{ translateX: translateX.value }],
    transform: [{ translateX: 0 }],
  }));

  const dispatch: AppDispatch = useDispatch();

  const handleDelete = () => {
    Alert.alert("Are you sure want to delete?", "", [
      {
        text: "Cancel",
        onPress: () => {
          translateX.value = withSpring(0);
        },
        style: "cancel",
      },
      { text: "OK", onPress: () => dispatch(deleteTask(task.id)) },
    ]);
  };

  const toggleCompleted = () => {
    dispatch(editTask({ ...task, completed: !task.completed }));
  };

  return (
    <Swipeable
      renderRightActions={() => (
        <View style={{ flexDirection: "row" }}>
          <RectButton
            style={[
              styles.deleteButtonContainer,
              { backgroundColor: Colors.app_color },
            ]}
            onPress={() =>
              task.completed ? null : navigation.navigate("taskform", { task })
            }
          >
            <Text style={styles.deleteButtonText}>Edit</Text>
          </RectButton>

          <RectButton
            style={[
              styles.deleteButtonContainer,
              { backgroundColor: Colors.delete_color },
            ]}
            onPress={handleDelete}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </RectButton>
        </View>
      )}
      onSwipeableOpen={() => {
        translateX.value = withSpring(-100);
      }}
      onSwipeableClose={() => {
        translateX.value = withSpring(0);
      }}
    >
      <Animated.View style={[styles.boxContainer, animatedStyle]}>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.titleText,
              { textDecorationLine: task.completed ? "line-through" : "none" },
            ]}
            numberOfLines={1}
          >
            {task.title}
          </Text>

          <Text style={styles.descText} numberOfLines={2}>
            {task.description}
          </Text>
        </View>
        <View style={{ paddingLeft: 20 }}>
          <Pressable
            onPress={toggleCompleted}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          >
            <Ionicons
              name={task.completed ? "radio-button-on" : "radio-button-off"}
              size={30}
              color={Colors.app_color}
            />
          </Pressable>
        </View>
      </Animated.View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: Colors.white,
    borderWidth: 0.2,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderColor: Colors.app_color,
    elevation: 0.1,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  descText: {
    fontSize: 12,
    fontWeight: "400",
    paddingVertical: 5,
  },
  deleteButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    marginBottom: 10,
    padding: 10,
    borderWidth: 0.2,
  },

  deleteButtonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
});

export default React.memo(TaskItem);
