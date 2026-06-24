import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (task: string) => void;
};

export default function AddTaskModal({ visible, onClose, onSubmit }: Props) {
  const [task, setText] = useState<string>("");
  function handleSubmit() {
    if (task.trim() === "") return;

    console.log("onSubmit =", onSubmit);

    if (typeof onSubmit !== "function") {
      return;
    }

    console.log("onSubmit:", onSubmit);

    if (typeof onSubmit === "function") {
      onSubmit(task);
    } else {
      console.log("onSubmit is undefined");
    }
    setText("");
  }
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.card} onPress={() => {}}>
          <TextInput
            style={styles.input}
            placeholder="Enter Task"
            value={task}
            onChangeText={setText}
            autoFocus
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 8, width: "80%" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
  },
  cancelText: {
    color: "#2E5BBA",
    fontWeight: "bold",
    paddingVertical: 10,
  },
  addButton: {
    backgroundColor: "#2E5BBA",
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  addText: {
    color: "#fff",
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
});
