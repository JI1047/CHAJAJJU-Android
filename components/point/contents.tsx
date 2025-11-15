import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator, Alert } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import * as SecureStore from "expo-secure-store";

export default function UserPoint() {
  const router = useRouter();
  const [pointHistory, setPointHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ JWT 토큰 불러오기
  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      console.log("🟢 SecureStore에서 불러온 토큰:", token);
      return token;
    } catch (error) {
      console.error("토큰 불러오기 실패:", error);
      return null;
    }
  };

  // ✅ 포인트 내역 불러오기
  const fetchPointHistory = async () => {
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert("로그인 필요", "로그인 후 이용해주세요.");
        return;
      }

      const response = await fetch("http://13.209.202.27:8080/recycle-history/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("서버 요청 실패");
      }

      const data = await response.json();
      console.log("✅ 서버 응답:", data);
      setPointHistory(data);
    } catch (error) {
      console.error("포인트 내역 조회 실패:", error);
      Alert.alert("오류", "포인트 내역을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

useFocusEffect(
  useCallback(() => {
    console.log("📲 포인트 페이지 다시 포커스됨 → 내역 새로 요청");
    fetchPointHistory();
  }, [])
);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2e7dff" />
        <Text>불러오는 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => router.push("/camera")}>
        <Ionicons name="camera" size={20} color="#fff" />
        <Text style={styles.text}>포인트 적립하기</Text>
      </Pressable>

      <Text style={styles.historyTitle}>
        <FontAwesome5 name="history" size={24} color="black" /> 포인트 적립 이력
      </Text>

      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 40 }}>
        {pointHistory.length === 0 ? (
          <Text style={{ textAlign: "center", color: "#666", marginTop: 20 }}>
            적립 내역이 없습니다.
          </Text>
        ) : (
          pointHistory.map((history) => (
            <View key={history.id} style={styles.historyCard}>
              <Text style={styles.historyDate}>{history.date}</Text>
              <Text style={styles.historyPlace}>{history.place}</Text>
              <Text style={styles.historyItem}>품목: {history.item}</Text>
              <Text style={styles.historyPoints}>+{history.points} P</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 5, gap: 20, backgroundColor: "#fff" },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2e7dff",
    borderRadius: 8,
    padding: 20,
    bottom: 10,
  },
  text: { color: "#fff", fontSize: 16, fontWeight: "600", marginLeft: 8 },
  historyTitle: { fontSize: 18, fontWeight: "700" },
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
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
