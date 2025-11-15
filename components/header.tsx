import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

type Props = { title?: string };

export default function Header({ title = "CHAJAJJU" }: Props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={styles.menuBtn}
      >
        <Ionicons name="menu" size={24} color="#333" />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor:  "#ffffffff",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ffffffff",
    paddingHorizontal: 12,
  },
  menuBtn: { marginRight: 20 },
  title: { fontSize: 18, fontWeight: "700" },
});
