import { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // TODO: 로그인 여부 체크 로직
      const isLoggedIn = false; // 나중에 AsyncStorage나 API 연동으로 교체

      if (isLoggedIn) {
        router.replace("/footer/home"); // 로그인 되어 있으면 홈으로
      } else {
        router.replace("/login"); // 아니면 로그인 페이지로
      }
    }, 3000); // 3초 후 이동

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CHAJAJJU</Text>
      <ActivityIndicator size="large" color="#2e7dff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "800", color: "#2e7dff", marginBottom: 20 },
});