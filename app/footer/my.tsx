import { View, Text, StyleSheet, Pressable, ScrollView, Image, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Foundation from "@expo/vector-icons/Foundation";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function MyPageScreen() {
  const router = useRouter();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 토큰 가져오기
  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      return token;
    } catch (error) {
      return null;
    }
  };

  // 사용자 정보 불러오기
  const fetchUserInfo = async () => {
    try {
      const token = await getToken();

      if (!token) {
        Alert.alert("로그인 필요", "로그인이 필요합니다.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://13.209.202.27:8080/api/auth/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) throw new Error("사용자 정보 조회 실패");

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      Alert.alert("오류", "사용자 정보를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // 로딩 중 화면
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#8B5CF6" />
        <Text style={{ color: "#6B7280", marginTop: 10 }}>사용자 정보를 불러오는 중...</Text>
      </View>
    );
  }

  // 사용자 정보 로드 실패
  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>사용자 정보를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("accessToken");
      router.replace("/login");
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      {/* 상단 프로필 */}
      <View style={styles.profileBox}>
        <Ionicons name="person-circle-outline" size={80} color="#8B5CF6" />
        <Text style={styles.name}>{userData?.name}</Text>
        <Text style={styles.id}>{userData?.phone}</Text>
        <Text style={styles.point}>{userData?.point}P</Text>
      </View>

      {/* 메뉴 버튼 영역 */}
      <View style={styles.menuBox}>
        <Pressable
          style={styles.menuItem}
          onPress={() => {
            router.push("/recent-place");
          }}
        >
          <Ionicons name="location-outline" size={28} color="#2563EB" />
          <Text style={styles.menuText}>최근 방문 거점</Text>
        </Pressable>

        <Pressable
          style={styles.menuItem}
          onPress={() => {
            router.push("/userinfo");
          }}
        >
          <Foundation name="page-edit" size={28} color="#6D28D9" />
          <Text style={styles.menuText}>개인정보수정</Text>
        </Pressable>

        <Pressable style={styles.menuItem} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={30} color="#059669" />
          <Text style={styles.menuText}>로그아웃</Text>
        </Pressable>
      </View>

      {/* 포인트 교환 섹션 */}
      <View style={styles.rewardBox}>
        <Text style={styles.rewardTitle}>포인트 교환</Text>
        <Text style={styles.rewardDesc}>
          종량제 봉투, 기부, 교통카드 충전 중 선택하여 교환할 수 있습니다.
        </Text>

        <View style={styles.rewardPreviewRow}>
          <View style={styles.rewardPreviewItem}>
            <MaterialCommunityIcons name="trash-can-outline" size={28} color="#6B7280" />
            <Text style={styles.rewardText}>종량제 봉투</Text>
          </View>
          <View style={styles.rewardPreviewItem}>
            <MaterialCommunityIcons name="hand-heart-outline" size={28} color="#DC2626" />
            <Text style={styles.rewardText}>기부하기</Text>
          </View>
          <View style={styles.rewardPreviewItem}>
            <MaterialCommunityIcons name="bus" size={28} color="#2563EB" />
            <Text style={styles.rewardText}>교통카드</Text>
          </View>
        </View>

        <Pressable style={styles.exchangeButton} onPress={() => router.push("/reward")}>
          <Text style={styles.exchangeButtonText}>교환하러 가기</Text>
        </Pressable>
      </View>

      {/* 환경 뉴스 슬라이드 */}
      <View style={styles.newsSection}>
        <Text style={styles.sectionTitle}>분리수거 & 환경 캠페인</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.card}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b" }}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>플라스틱 줄이기 캠페인</Text>
            <Text style={styles.cardText}>일회용 컵 대신 텀블러 사용으로 탄소 절감.</Text>
          </View>

          <View style={styles.card}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1501127122-f385ca6ddd9d" }}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>분리배출 꿀팁</Text>
            <Text style={styles.cardText}>헷갈리는 분리수거 방법 정리.</Text>
          </View>

          <View style={styles.card}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1565372918670-0b8e63980b87" }}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>제로웨이스트 실천</Text>
            <Text style={styles.cardText}>작은 실천이 지구를 바꾼다.</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", alignItems: "center", paddingTop: 70 },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileBox: { alignItems: "center", marginBottom: 25 },
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
  rewardBox: {
    padding: 20,
    backgroundColor: "#F9FAFB",
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },
  rewardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4B5563",
    marginBottom: 3,
  },
  rewardDesc: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 15,
  },
  rewardPreviewRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  rewardPreviewItem: { alignItems: "center" },
  rewardText: { marginTop: 5, fontSize: 13, color: "#4B5563" },
  exchangeButton: {
    backgroundColor: "#0bc93779",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  exchangeButtonText: {
    color: "#400f0fd4",
    fontWeight: "600",
    fontSize: 16,
  },
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
