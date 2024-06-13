import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TaskFormScreen, TaskListScreen } from "../screens";

const Stack = createNativeStackNavigator();

function DashboardRoute() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
      }}
      i18nIsDynamicList
      initialRouteName="tasklist"
    >
      <Stack.Screen
        options={{ title: "Add/Update Task" }}
        name="taskform"
        component={TaskFormScreen}
      />
      <Stack.Screen
        options={{ title: "Todo List" }}
        name="tasklist"
        component={TaskListScreen}
      />
    </Stack.Navigator>
  );
}

export default DashboardRoute;
