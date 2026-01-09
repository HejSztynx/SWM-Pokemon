import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, Tabs } from "expo-router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1,
    },
  },
});

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="list" />
    </Tabs>
  );
}
