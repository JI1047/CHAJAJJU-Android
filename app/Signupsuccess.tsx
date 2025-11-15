import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function SignupSuccess() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입 완료 🎉</Text>
      <Text style={styles.message}>
        회원가입이 성공적으로 완료되었습니다.{"\n"}
        최초 로그인 후 서비스를 이용하실 수 있습니다.
      </Text>

      <Pressable 
        style={styles.loginButton} 
        onPress={() => router.replace("/login")}
      >
        <Text style={styles.loginButtonText}>로그인 하러 가기</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#fff", 
    padding: 20 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "800", 
    marginBottom: 16, 
    color: "#2cd543ff" 
  },
  message: { 
    fontSize: 16, 
    textAlign: "center", 
    marginBottom: 30, 
    lineHeight: 22, 
    color: "#444" 
  },
  loginButton: {
    backgroundColor: "#0d9f20e1",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButtonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "600" 
  },
});