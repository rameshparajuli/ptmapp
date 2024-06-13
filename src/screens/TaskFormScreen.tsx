import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../store/tasksSlice";
import { AppDispatch } from "../store";
import Colors from "../../assets/colors";

const TaskFormScreen = ({
  route,
  navigation,
}: {
  // need to implement types of route and navigation
  route: any;
  navigation: any;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { task } = route.params || {};
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [error, setError] = useState("");
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

  const handleSave = () => {
    if (title.trim() === "") {
      setError("Title is required");
      return;
    }

    if (task) {
      dispatch(editTask({ ...task, title, description }));
    } else {
      dispatch(
        addTask({
          id: Date.now().toString(),
          title,
          description,
          completed: false,
        })
      );
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={(text) => {
          setTitle(text);
          if (text.trim() !== "") setError("");
        }}
        mode="outlined"
        error={error !== ""}
        outlineColor={isTitleFocused ? Colors.border_color : Colors.app_color}
        style={styles.input}
        onFocus={() => setIsTitleFocused(true)}
        onBlur={() => setIsTitleFocused(false)}
      />
      {error !== "" && <Text style={styles.errorText}>{error}</Text>}
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        mode="outlined"
        outlineColor={
          isDescriptionFocused ? Colors.border_color : Colors.app_color
        }
        style={[styles.input, styles.textArea]}
        onFocus={() => setIsDescriptionFocused(true)}
        onBlur={() => setIsDescriptionFocused(false)}
        multiline
      />
      <Button
        mode="contained"
        uppercase
        onPress={handleSave}
        style={styles.button}
      >
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.white,
  },
  input: {
    marginBottom: 16,
    borderColor: Colors.app_color,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    padding: 10,
    borderRadius: 4,
    backgroundColor: "#f5f5f5",
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
    backgroundColor: Colors.app_color,
    borderRadius: 0,
    paddingVertical: 5,
  },
});

export default TaskFormScreen;
