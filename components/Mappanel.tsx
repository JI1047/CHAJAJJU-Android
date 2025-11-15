import { View, Text, StyleSheet } from "react-native";

export default function MapPanel() {
  return (
    <View >
       <Text style={styles.placeholder}>여기에 지도(API 연동)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                   // 부모(View)의 남은 공간 다 차지
    borderWidth: 2,
    borderColor: "#2e7dff",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  placeholder: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2e7dff",
  },
});