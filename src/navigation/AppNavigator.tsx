import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { RootState } from "../store";
import DashboardRoute from "../navigation/Dashboard";
import SettingRoute from "./Settings";
import Colors from "../../assets/colors";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const isDarkTheme = useSelector(
    (state: RootState) => state.theme.isDarkTheme
  );
  return (
    <NavigationContainer
      fallback={
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={Colors.app_color} />
        </View>
      }
      theme={isDarkTheme ? DarkTheme : DefaultTheme}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            // paddingVertical: 7,
            // height: Dimensions.get("screen").height * 0.09,
            // elevation: 0,
          },

          tabBarLabelStyle: {
            // flex: 1,
            // justifyContent: "center",
            // textAlign: "center",
            // textAlignVertical: "center",
          },

          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === "home") {
              iconName = "home-outline";
            } else if (route.name === "settingroute") {
              iconName = "settings-outline";
            } else {
              iconName = "home";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          options={{ title: "Home" }}
          name="home"
          component={DashboardRoute}
        />
        <Tab.Screen
          i18nIsDynamicList
          options={{ title: "Settings" }}
          name="settingroute"
          component={SettingRoute}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppNavigator;
