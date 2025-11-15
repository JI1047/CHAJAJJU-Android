// app/login.js (또는 app/LoginForm.js)

import React, { useState} from "react";
import { View, TextInput, Text, Pressable, Alert, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

export default function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // ✅ 로컬 로그인
  const handleLogin = async () => {
    try {
  const res = await fetch("http://13.209.202.27:8080/api/auth/local-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: id, password }),
  });

  if (res.ok) {
    const data = await res.json();
    await SecureStore.setItemAsync("accessToken", data.jwt);
    // ✅ 토큰 저장
    await SecureStore.setItemAsync("accessToken", data.jwt);
    console.log("🔥 accessToken 저장 완료");

    // ✅ 저장 즉시 확인
    const checkToken = await SecureStore.getItemAsync("accessToken");
    console.log("🟢 SecureStore에 저장된 토큰:", checkToken);
    router.push("/footer/home");
  } else {
    Alert.alert("로그인 실패", "아이디 또는 비밀번호가 틀렸습니다.");
  }
} catch (error) {
  console.error("로그인 에러:", error);
}
  };

  // ✅ 소셜 로그인 리디렉션 (웹처럼 직접 이동은 불가능)
  {/*const socialLogin = (provider) => {
    Alert.alert(`${provider} 로그인`, "모바일에서는 WebView 또는 SDK로 연동해야 합니다.");
  };

  // ✅ 소셜 로그인 리디렉션 후 토큰 발급 (URL 파라미터 처리)
  const params = useLocalSearchParams();
  useEffect(() => {
    if (params.token) {
      AsyncStorage.setItem("accessToken", params.token);
      console.log("🔥 accessToken:", params.token);
      router.push("/footer/home");
    }
  }, [params]);*/}

  return (
     <View style={styles.container}>
      <TextInput
        placeholder="ID"
        value={id}
        onChangeText={setId}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />

      <Pressable style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>로그인하기</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/Signup")}>
        <Text style={{ color: "#4B7BE5", marginBottom: 10 }}>회원가입하기</Text>
      </Pressable>

      <View style={styles.socialContainer}>
        <Pressable style={[styles.socialButton, { backgroundColor: "#FEE500" }]}>
          <Text style={[styles.socialText, { color: "#000" }]}>카카오로 로그인</Text>
        </Pressable>

        <Pressable
          style={[
            styles.socialButton,
            { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ccc" },
          ]}
        >
          <Text style={[styles.socialText, { color: "#000" }]}>구글로 로그인</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "#4B7BE5",
    paddingVertical: 12,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    marginBottom: 10,
  },
  loginText: { color: "#fff", fontWeight: "bold" },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 40,
    gap: 12,
  },
  socialButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  socialText: { fontSize: 15, fontWeight: "600" },
});