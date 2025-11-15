import { Tabs } from "expo-router/tabs";
import { useColorScheme } from "react-native";
import { Ionicons,  MaterialCommunityIcons } from "@expo/vector-icons";


export default function RootLayout() {
  const scheme = useColorScheme();
  
  
  return (

    

    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: scheme === "dark" ? "#2cd5439e" : "#38e15fff",
        tabBarInactiveTintColor: "#9aa0a6",
        tabBarStyle: { height: 80, paddingTop: 6, paddingBottom: 8 },
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
     
      }}
    >

      <Tabs.Screen
              name="home"
              options={{
                title: "홈",
                tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
              }}
            />

      <Tabs.Screen
        name="points"
        options={{
          title: "포인트",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="star-four-points"  color={color} size={size} />,
        }}
      />

       <Tabs.Screen
        name="recycle"
        options={{
          title: "분리수거",
          tabBarIcon: ({ color, size }) => <Ionicons name="calculator" color={color} size={size} />,
        }}
      />
     
      <Tabs.Screen
        name="my"
        options={{
          title: "MY",
          tabBarIcon: ({ color, size }) => <Ionicons name="person-circle" color={color} size={size} />,
        }}
      />
    </Tabs>
  );

}
