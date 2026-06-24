import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { supabase } from "../../lib/supabase";
import TaskItem from "../../components/TaskItem";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function HomeScreen() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();
  const [ModalVisible, setModalVisible] = useState(false);
  function handleOpenModal() {
    setModalVisible(true);
  }
  function handleOpenAddTask() {
    router.push("/(tabs)/TaskForm");
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleSubmitTask(title: string) {
    const { error } = await supabase
      .from("tasks")
      .insert([{ title, completed: false }]);
    if (error) {
      console.error("Error submitting task:", error.message);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to submit task",
      });
      return;
    }
    setModalVisible(false);
    loadTasks();
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Task added successfully",
    });
  }
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
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to delete task",
      });
      return;
    }
    loadTasks();
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Task deleted successfully",
    });
  }

  return (
    <>
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
    </>
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
