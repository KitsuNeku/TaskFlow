import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type TaskFormProps = {
  item: any;
  onToggle: (item: any) => void;
  onDelete: (item: any) => void;
};

export default function TaskItem({ item, onToggle, onDelete }: TaskFormProps) {
  return (
    <View style={styles.TaskRow}>
      <MaterialIcons
        name={item.completed ? "check-box" : "check-box-outline-blank"}
        size={20}
        color={item.completed ? "#2E5BBA" : "#5A6472"}
      />
      <TouchableOpacity
        onPress={() => onToggle(item)}
        onLongPress={() => onDelete(item)}
      ></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  TaskRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  taskText: {
    fontSize: 15,
  },
});
