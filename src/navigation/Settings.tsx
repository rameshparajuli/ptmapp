import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingsScreen } from "../screens";

const Stack = createNativeStackNavigator();

function SettingRoute() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
      }}
      initialRouteName="setting"
    >
      <Stack.Screen
        options={{ title: "Setting" }}
        name="setting"
        component={SettingsScreen}
      />
    </Stack.Navigator>
  );
}

export default SettingRoute;
