import { Modal, View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function GuideModal({ visible, onClose }: Props) {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Text style={styles.modalTitle}>분리수거 가이드</Text>
            <Text style={styles.modalText}>
              - 플라스틱: 1개당 10P{"\n"}
              - 캔: 1개당 20P{"\n"}
              - 종이: 1개당 5P{"\n"}
              {"\n"}※ 깨끗이 씻어서 배출하면 더 효율적입니다.
            </Text>

            <Text style={styles.modalTitle}>계산 가이드</Text>
            <Text style={styles.modalText}>
              선택한 품목의 개수 × 단가 = 적립 포인트{"\n"}
              {"\n"}예) 플라스틱 3개 → 30P
            </Text>

            <Pressable style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>닫기</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    height: "70%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
  },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  modalText: { fontSize: 14, lineHeight: 20, marginBottom: 20 },
  closeButton: {
    backgroundColor: "#2cd543ff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: { color: "#fff", fontWeight: "700" },
});