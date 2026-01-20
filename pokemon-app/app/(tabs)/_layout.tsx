import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="reanimated"
        options={{
          tabBarLabel: "Reanimated",
          headerTitle: "Reanimated",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="bedroom-baby" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Favorite",
          headerTitle: "My Favorite Pokemon",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          tabBarLabel: "Pokemon List",
          headerTitle: "Pokemon List",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="list" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          tabBarLabel: "Camera",
          headerTitle: "Camera",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="camera" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          tabBarLabel: "Pokemon map",
          headerTitle: "Pokemon map",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="map" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
