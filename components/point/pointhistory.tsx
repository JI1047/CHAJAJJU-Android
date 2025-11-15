import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PointsScreen() {
  // 더미 데이터 (나중에 API 연동 가능)
  const pointHistory = [
    { id: 1, date: "2025-09-27", place: "강남역 거점", item: "플라스틱", points: 50 },
    { id: 2, date: "2025-09-25", place: "홍대입구 거점", item: "캔", points: 30 },
    { id: 3, date: "2025-09-20", place: "잠실 거점", item: "종이", points: 20 },
  ];

  return (
    <View style={styles.container}>
      {/* 포인트 이력 */}
      <Text style={styles.historyTitle}>📜 포인트 적립 이력</Text>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 40 }}>
        {pointHistory.map((history) => (
          <View key={history.id} style={styles.historyCard}>
            <Text style={styles.historyDate}>{history.date}</Text>
            <Text style={styles.historyPlace}>{history.place}</Text>
            <Text style={styles.historyItem}>품목: {history.item}</Text>
            <Text style={styles.historyPoints}>+{history.points} P</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // 이력
  historyTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  scroll: { flex: 1 },
  historyCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fafafa",
  },
  historyDate: { fontSize: 14, color: "#666" },
  historyPlace: { fontSize: 16, fontWeight: "600", marginTop: 4 },
  historyItem: { fontSize: 14, marginTop: 2 },
  historyPoints: { fontSize: 16, fontWeight: "bold", color: "#2e7dff", marginTop: 4 },
});