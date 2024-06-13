import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const SafeArea = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaView>{children}</SafeAreaView>;
};

export default SafeArea;
