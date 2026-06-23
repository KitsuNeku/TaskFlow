import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { supabase } from "../../lib/supabase";
import TaskItem from "./TaskItem";

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const { data, error } = await supabase.from("tasks").select("*");
    if (error) {
      console.error("Error fetching tasks:", error.message);
      return;
    }
    setTasks((data ?? []) as Task[]);
  }

  async function addTask() {
    if (task.trim() === "") return;
    const { error } = await supabase
      .from("tasks")
      .insert([{ title: task, completed: false }]);
    if (error) {
      console.error("Error adding task:", error.message);
      return;
    }
    setTask("");
    loadTasks();
  }

  async function toggleTask(item: Task) {
    const { error } = await supabase
      .from("tasks")
      .update({ completed: !item.completed })
      .eq("id", item.id);
    if (error) {
      console.error("Error updating task:", error.message);
      return;
    }
    loadTasks();
  }

  async function deleteTask(item: Task) {
    const { error } = await supabase.from("tasks").delete().eq("id", item.id);
    if (error) {
      console.error("Error deleting task:", error.message);
      return;
    }
    loadTasks();
  }

  return (
    <View style={styles.container}>
      <View style={headerStyles.header}>
        <Text style={headerStyles.title}>Taskflow</Text>
      </View>

      <FlatList<Task>
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem item={item} onToggle={toggleTask} onDelete={deleteTask} />
        )}
      />
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
});
