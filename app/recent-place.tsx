import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

export default function RecentPlace() {
  const router = useRouter();
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 요일 계산
  const getDayName = (dateStr) => {
    const day = new Date(dateStr).getDay();
    const korean = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    return korean[day];
  };

  // 사용자 기록 불러오기
  const fetchHistory = async () => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      if (!token) {
        Alert.alert("로그인 필요", "로그인 정보가 없습니다.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://13.209.202.27:8080/recycle-history/user", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) throw new Error("불러오기 실패");

      const data = await response.json();

      // 날짜 정제
      const refined = data.map((item) => ({
        id: item.id,
        place: item.place,
        date: item.date.split("T")[0], // yyyy-MM-dd
        day: getDayName(item.date),
      }));

      setHistoryList(refined);
    } catch (error) {
      Alert.alert("오류", "최근 방문 기록을 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#8B5CF6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.push("/footer/my")}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </Pressable>

      <Text style={styles.title}>최근 방문 거점</Text>

      <ScrollView style={styles.listContainer}>
        {historyList.length === 0 ? (
          <Text style={{ textAlign: "center", color: "#6B7280" }}>기록이 없습니다.</Text>
        ) : (
          historyList.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.placeName}>{item.place}</Text>
              <Text style={styles.dateText}>
                {item.date} · {item.day}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 20,
    padding: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 20,
    textAlign: "center",
  },
  listContainer: {
    marginTop: 10,
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  placeName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  dateText: {
    marginTop: 6,
    fontSize: 15,
    color: "#6B7280",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
