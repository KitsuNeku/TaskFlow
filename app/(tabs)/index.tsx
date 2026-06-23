import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  function handleAddTask() {
    if (task.trim() === "") return;
    setTasks([
      ...tasks,
      { id: Date.now().toString(), text: task, completed: false },
    ]);
    setTask("");
  }
  useEffect(() => {
    console.log("Component Mounted!");
  }, []);
  return (
    <View style={styles.container}>
      <View style={headerStyles.header}>
        <Text style={headerStyles.title}>Taskflow</Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter Task"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <MaterialIcons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.taskRow}>
        <MaterialIcons
          name="check-box-outline-blank"
          size={20}
          color="#5A6472"
        />
        <Text style={styles.taskText}>Study React Native </Text>
      </View>
      <View style={styles.taskRow}>
        <MaterialIcons
          name="check-box-outline-blank"
          size={20}
          color="#5A6472"
        />
        <Text style={styles.taskText}>Finish Assignment</Text>
      </View>

      {tasks.map((item) => (
        <View key={item.id} style={styles.taskRow}>
          <MaterialIcons
            name={item.completed ? "check-box" : "check-box-outline-blank"}
            size={20}
            color={item.completed ? "#2E5BBA" : "#5A6472"}
          />
          <Text style={styles.taskText}>{item.text}</Text>
        </View>
      ))}
    </View>
  );
}
const headerStyles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2A44",
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#2E5BBA",
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  taskText: {
    fontSize: 15,
  },
});
