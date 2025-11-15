import { View, Text, StyleSheet, Pressable, ScrollView, Image,  ActivityIndicator,Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export default function MyPageScreen() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);


  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      console.log("👉 SecureStore에서 불러온 JWT:", token);
      return token;
    } catch (error) {
      console.error("토큰 불러오기 실패:", error);
      return null;
    }
  };

  // ✅ 사용자 정보 가져오기
  const fetchUserInfo = async () => {
    try {
      const token = await getToken();

      if (!token) {
        Alert.alert("로그인 필요", "로그인 정보가 없습니다.");
        return;
      }

      const response = await fetch("http://13.209.202.27:8080/api/auth/me", {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      if (!response.ok) throw new Error("로그인 정보 조회 실패");

      const data = await response.json();
      console.log("✅ 응답 받은 사용자 정보:", data);
      setUserData(data);
    } catch (error) {
      console.error("에러:", error);
      Alert.alert("오류", "사용자 정보를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#8B5CF6" />
        <Text>로딩 중...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.center}>
        <Text>사용자 정보를 찾을 수 없습니다.</Text>
      </View>
    );
  }
 /*export default function MyPageScreen() {*/
  return (
    <View style={styles.container}>
      {/* 상단 프로필 */}
      <View style={styles.profileBox}>
        <Ionicons name="person-circle-outline" size={80} color="#8B5CF6" />
        <Text style={styles.name}>{userData.id}</Text>
        <Text style={styles.id}>{userData.phone}</Text>
        <Text style={styles.point}>포인트: 2,340P</Text>
      </View>

      {/* 메뉴 버튼 영역 */}
      <View style={styles.menuBox}>
        <Pressable
          style={styles.menuItem}
          onPress={() => {
            // router.push("/point-history");
          }}
        >
          <Ionicons name="wallet-outline" size={28} color="#6D28D9" />
          <Text style={styles.menuText}>포인트 내역</Text>
        </Pressable>

        <Pressable
          style={styles.menuItem}
          onPress={() => {
            // router.push("/recycle-history");
          }}
        >
          <Ionicons name="leaf-outline" size={28} color="#059669" />
          <Text style={styles.menuText}>분리수거 내역</Text>
        </Pressable>

        <Pressable
          style={styles.menuItem}
          onPress={() => {
            // router.push("/recent-place");
          }}
        >
          <Ionicons name="location-outline" size={28} color="#2563EB" />
          <Text style={styles.menuText}>최근 방문 거점</Text>
        </Pressable>
      </View>

      {/* 🔽 분리수거 관련 뉴스 / 캠페인 슬라이드 🔽 */}
      <View style={styles.newsSection}>
        <Text style={styles.sectionTitle}>♻️ 분리수거 & 환경 캠페인</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.card}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b" }}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>플라스틱 줄이기 캠페인</Text>
            <Text style={styles.cardText}>일회용 컵 대신 텀블러 사용으로 탄소 절감!</Text>
          </View>

          <View style={styles.card}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1501127122-f385ca6ddd9d" }}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>분리배출 꿀팁</Text>
            <Text style={styles.cardText}>헷갈리는 분리수거, 올바른 방법을 알아보세요!</Text>
          </View>

          <View style={styles.card}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1565372918670-0b8e63980b87" }}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>제로웨이스트 실천</Text>
            <Text style={styles.cardText}>작은 실천이 지구를 바꿉니다 🌍</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", alignItems: "center", paddingTop: 80 },
  profileBox: { alignItems: "center", marginBottom: 40 },
  name: { fontSize: 22, fontWeight: "800", color: "#111827", marginTop: 8 },
  id: { fontSize: 14, color: "#6B7280", marginTop: 2 },
  point: { fontSize: 16, color: "#4B5563", marginTop: 4 },
  menuBox: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  menuItem: {
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 20,
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  menuText: { marginTop: 8, fontSize: 13, fontWeight: "600", color: "#374151" },
  newsSection: { width: "100%", height: "30%", paddingLeft: 24 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 17,
  },
  card: {
    backgroundColor: "#fff",
    width: 220,
    marginRight: 16,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  cardImage: { width: "100%", height: 120 },
  cardTitle: { fontSize: 14, fontWeight: "700", margin: 8, color: "#1F2937" },
  cardText: { fontSize: 12, color: "#6B7280", marginHorizontal: 8, marginBottom: 10 },
    center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});