import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";

export default function UserInfo() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getToken = async () => {
    try {
      return await SecureStore.getItemAsync("accessToken");
    } catch (error) {
      console.error("토큰 불러오기 실패:", error);
      return null;
    }
  };

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      if (!token) {
        Alert.alert("로그인 필요", "로그인 후 이용해주세요.");
        return;
      }

      const res = await fetch("http://13.209.202.27:8080/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("서버 요청 실패");

      const data = await res.json();
      console.log("✅ 사용자 정보:", data);
      setUser(data);
    } catch (error) {
      console.error("사용자 정보 요청 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ 화면이 다시 포커스될 때마다 호출
  useFocusEffect(
    useCallback(() => {
      console.log("📲 UserInfo 화면 포커스 → /me 다시 요청");
      fetchUserInfo();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2e7dff" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>사용자 정보를 불러오지 못했습니다.</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.username}>{user.name}님 포인트</Text>
      <Text style={styles.points}>
        <MaterialCommunityIcons
          name="star-four-points"
          size={20}
          color="#0c0c0cff"
        />{" "}
        {user.point} P
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  username: { fontSize: 20, fontWeight: "700", marginLeft: 10 },
  points: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2cd5439e",
    padding: 5,
    marginLeft: 10,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
