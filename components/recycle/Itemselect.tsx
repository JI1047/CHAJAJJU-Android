import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";

export default function Contents() {
  const items = [
    { name: "플라스틱", rate: 10 },
    { name: "캔", rate: 20 },
    { name: "종이", rate: 5 },
  ];

  const [selected, setSelected] = useState<{ [key: string]: { checked: boolean; qty: number } }>(
    items.reduce((acc, item) => {
      acc[item.name] = { checked: false, qty: 1 };
      return acc;
    }, {} as { [key: string]: { checked: boolean; qty: number } })
  );

  // 총합 계산
  const totalPoints = items.reduce((sum, item) => {
    const { checked, qty } = selected[item.name];
    return checked ? sum + qty * item.rate : sum;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>품목별 선택</Text>

      {items.map((item) => (
        <View key={item.name} style={styles.row}>
          {/* 체크박스 */}
          <Checkbox
            value={selected[item.name].checked}
            onValueChange={(newValue) =>
              setSelected((prev) => ({
                ...prev,
                [item.name]: { ...prev[item.name], checked: newValue },
              }))
            }
            style={styles.checkbox}
          />

          {/* 품목명 */}
          <Text style={styles.label}>{item.name}</Text>

          {/* 개수 선택 */}
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={selected[item.name].qty}
              onValueChange={(qty) =>
                setSelected((prev) => ({
                  ...prev,
                  [item.name]: { ...prev[item.name], qty },
                }))
              }
              style={{ height: 60, width: 100 }} // 👈 넓이 줄이기
            >
              {[...Array(10)].map((_, i) => (
                <Picker.Item key={i + 1} label={`${i + 1}`} value={i + 1} />
              ))}
            </Picker>
          </View>

          {/* 포인트 */}
          <Text style={styles.points}>
            {selected[item.name].checked ? `+${selected[item.name].qty * item.rate}P` : ""}
          </Text>
        </View>
      ))}

      {/* 총합 표시 */}
      <Text style={styles.total}>총 적립 포인트: {totalPoints} P</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20, left: 20 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 6,
  },
  checkbox: { marginRight: 8 },
  label: { fontSize: 16, flex: 1 },
  pickerBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginRight: 8,

  },
  points: { fontSize: 14, fontWeight: "600", color: "#2e7dff", minWidth: 50 },
  total: { fontSize: 18, fontWeight: "700", marginTop: 20, color: "#2e7dff" },
});