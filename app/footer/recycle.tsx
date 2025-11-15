import { View, Text, StyleSheet, StatusBar, Pressable   } from "react-native";
import { useState } from "react";
import Contents from "../../components/recycle/Itemselect";
import GuideModal from "../../components/recycle/guidemodal";


export default function RecycleCalcScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  

  return (
         <View style={styles.container}>
               <StatusBar hidden={false} barStyle="light-content" />
               <View style={styles.header}>
                 <Text style={styles.serviceTitle}>CHAJAJJU</Text>
               </View>

                <Text style={styles.title}>♻️ 분리수거 계산</Text>

        {/* 가이드 버튼 */}
      <Pressable style={styles.guideButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.guideButtonText}>📖 분리수거 포인트 적립 가이드</Text>
      </Pressable>

      {/* 모달 */}
      <GuideModal visible={modalVisible} onClose={() => setModalVisible(false)} />
                 

      {/* 품목 선택 + 결과 */}
      <Contents />
      </View> 
     
  );
}

const styles = StyleSheet.create({
   container: { flex: 1, padding: 5, gap: 20,  backgroundColor: "#fff"},
   header: {
    
    height: 50,                 // 상단 높이 20px
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 8,
    marginTop:30,
     borderBottomWidth: 2,
    borderBottomColor: "#2cd5431b"
  },

  serviceTitle: {
    fontSize: 20,               // 글자 크기 15pt
    fontWeight: "800",
    color: "#2cd5439e",
  },

  title: { fontSize: 20, fontWeight: "700", left: 10, },
  guideButton: {
    backgroundColor: "#defae863",
    padding: 10,
    borderRadius: 8,
 
  },
  guideButtonText: { color: "#000000ff", fontSize: 16, fontWeight: "600" },
});
