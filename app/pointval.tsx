import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";

export default function PointResult() {
  const router = useRouter();
  const { place, item, earned, total, claimId, signature } = useLocalSearchParams();

  // ✅ DB 저장 요청
  useEffect(() => {
    const saveClaim = async () => {
      try {
        const res = await fetch("http://13.209.202.27:8080/recycle-history/save-claim", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ claimId, signature }),
        });

        const msg = await res.text();
        if (res.ok) {
          console.log("✅ save-claim 성공:", msg);
        } else {
          console.error("❌ save-claim 실패:", msg);
          Alert.alert("저장 실패", "포인트 적립 내역을 저장하지 못했습니다.");
        }
      } catch (error) {
        console.error("⚠️ save-claim 요청 중 오류:", error);
        Alert.alert("서버 오류", "네트워크 연결을 확인해주세요.");
      }
    };

    // 파라미터가 있을 때만 실행
    if (claimId && signature) {
      saveClaim();
    }
  }, [claimId, signature]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>포인트 적립 완료 🎉</Text>

      <View style={styles.card}>
        <Text style={styles.text}>🏠 거점: {place}</Text>
        <Text style={styles.text}>📦 품목: {item}</Text>
        <Text style={styles.text}>💰 적립 포인트: {earned} P</Text>
      </View>

      <Pressable
        style={styles.homeButton}
        onPress={() => router.push("/footer/points")}
      >
        <Text style={styles.homeText}>포인트 메인으로 돌아가기</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", paddingTop: 150 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  card: {
    width: "90%",
    borderWidth: 2,
    borderColor: "#2e7dff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  text: { fontSize: 16, color: "#333", marginVertical: 5 },
  total: { fontWeight: "bold", color: "#1b4cff" },
  homeButton: {
    backgroundColor: "#2e7dff",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 40,
  },
  homeText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});