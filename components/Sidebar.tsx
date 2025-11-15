import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Sidebar() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>CHAJAJJU</Text>

      <Link href="/footer/points" style={styles.item}>
        <MaterialCommunityIcons name="wallet" size={18} />  포인트
      </Link>
      <Link href="/footer/recycle" style={styles.item}>
        <Ionicons name="calculator" size={18} />  분리수거
      </Link>
      <Link href="/footer/my" style={styles.item}>
        <Ionicons name="person-circle" size={18} />  MY
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 56, paddingHorizontal: 16, gap: 12, backgroundColor: "#fff" },
  logo: { fontSize: 20, fontWeight: "800", marginBottom: 8 },
  item: { fontSize: 16, paddingVertical: 10, gap: 8, flexDirection: "row", alignItems: "center" },
});