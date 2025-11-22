import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

export default function SignupBody() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("MALE");
  const [birth, setBirth] = useState("");
  const [address, setAddress] = useState("");

  // ✅ 이메일 중복 확인
  const handleCheckEmail = async () => {
    try {
      const res = await fetch(
        `http://13.209.202.27:8080/api/auth/check-email?email=${email}`
      );

      if (res.ok) {
        const data = await res.text();
        setMessage(data || "사용 가능한 이메일입니다.");
      } else if (res.status === 409) {
        const text = await res.text();
        setMessage(text || "이미 사용 중인 이메일입니다.");
      } else {
        setMessage("서버 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("이메일 중복 확인 실패:", error);
      setMessage("서버와의 연결에 실패했습니다.");
    }
  };

  // ✅ 회원가입
  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert("비밀번호 불일치", "비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const res = await fetch("http://13.209.202.27:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name,
          phone,
          gender,
          birth,
          address,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("회원가입 성공:", data);
        Alert.alert("회원가입 완료", "회원가입이 성공적으로 완료되었습니다!");
        router.push("/Signupsuccess");
      } else {
        Alert.alert("회원가입 실패", "입력 정보를 확인해주세요.");
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
      Alert.alert("서버 오류", "잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <Pressable
      onPress={() => router.push("/login")}
      style={{ position: "absolute", top: 40, left: 20, padding: 8 }}
    >
      <Text style={{ fontSize: 18 }}>←</Text>
    </Pressable>

      <View style={styles.container}>
        <Text style={styles.title}>회원가입</Text>

        {/* 이메일 + 중복확인 */}
        <View style={styles.row}>
          <TextInput
            placeholder="이메일(ID)"
            value={email}
            onChangeText={setEmail}
            style={[styles.input, { flex: 1, marginRight: 8 }]}
          />
          <Pressable style={styles.checkButton} onPress={handleCheckEmail}>
            <Text style={styles.checkButtonText}>중복확인</Text>
          </Pressable>
        </View>

        {message ? <Text style={styles.message}>{message}</Text> : null}

        {/* 비밀번호 */}
        <TextInput
          placeholder="비밀번호 (영문, 숫자, 특수문자 포함 8자 이상)"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <TextInput
          placeholder="비밀번호 확인"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
        />

        {/* 이름 */}
        <TextInput
          placeholder="이름"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        {/* 전화번호 */}
        <TextInput
          placeholder="전화번호"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
        />

        {/* 성별 선택 */}
        <View style={styles.genderContainer}>
          <Pressable
            style={[
              styles.genderButton,
              gender === "MALE" && styles.genderSelected,
            ]}
            onPress={() => setGender("MALE")}
          >
            <Text
              style={[
                styles.genderText,
                gender === "MALE" && styles.genderTextSelected,
              ]}
            >
              남자
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.genderButton,
              gender === "FEMALE" && styles.genderSelected,
            ]}
            onPress={() => setGender("FEMALE")}
          >
            <Text
              style={[
                styles.genderText,
                gender === "FEMALE" && styles.genderTextSelected,
              ]}
            >
              여자
            </Text>
          </Pressable>
        </View>

        {/* 생년월일 */}
        <TextInput
          placeholder="생년월일 (YYYY-MM-DD)"
          value={birth}
          onChangeText={setBirth}
          style={styles.input}
        />

        {/* 주소 */}
        <TextInput
          placeholder="주소"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
        />

        {/* 회원가입 버튼 */}
        <Pressable style={styles.submitButton} onPress={handleSignup}>
          <Text style={styles.submitButtonText}>회원가입</Text>
        </Pressable>
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingVertical: 30,
  },
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 25,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: Platform.OS === "ios" ? 14 : 10,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  checkButton: {
    backgroundColor: "#4B7BE5",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  checkButtonText: { color: "#fff", fontWeight: "bold", fontSize: 13 },
  message: {
    color: "#333",
    fontSize: 13,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  genderSelected: {
    backgroundColor: "#4B7BE5",
    borderColor: "#4B7BE5",
  },
  genderText: { fontSize: 15, color: "#333" },
  genderTextSelected: { color: "#fff", fontWeight: "bold" },
  submitButton: {
    backgroundColor: "#4B7BE5",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
