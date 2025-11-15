import {View, Text, StyleSheet, StatusBar } from "react-native";
import Header from "../../components/point/userpoint";
import Contents from "../../components/point/contents";
import Menu from "../../components/point/pointhistory";

export default function PointsScreen() {
 return (
     <View style={styles.container}>
           <StatusBar hidden={false} barStyle="light-content" />
           <View style={styles.header}>
             <Text style={styles.serviceTitle}>CHAJAJJU</Text>
           </View>
       <Header />
       <Contents />

     </View>
   );
 }
 
 const styles = StyleSheet.create({
   container: { flex: 1, padding: 5, gap: 20, backgroundColor: "#fff"},
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
 });