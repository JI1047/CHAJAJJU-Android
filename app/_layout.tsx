import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Sidebar from "../components/Sidebar";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
      <Drawer
      drawerContent={() => <Sidebar />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: 240 },
        drawerType: "slide",
      }}
    >
      <Drawer.Screen name="(footer)" options={{ title: "메인" }} />
    </Drawer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}