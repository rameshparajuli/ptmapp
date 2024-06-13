import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toggleTheme } from "../store/themeSlice";
import { changeLanguage } from "../store/languageSlice";
import { RootState } from "../store";

const SettingsScreen = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(
    (state: RootState) => state.theme.isDarkTheme
  );
  const language = useSelector((state: RootState) => state.language.language);

  const [isEnglish, setIsEnglish] = useState(language === "en");

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  // it is not working for now, have to implement with Appconfiguration and run at first:

  const handleLanguageChange = () => {
    const newLanguage = isEnglish ? "np" : "en";
    setIsEnglish(!isEnglish);
    dispatch(changeLanguage(newLanguage));
    i18n.changeLanguage(newLanguage);
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>{t("Dark Theme")}</Text>
        <Switch value={isDarkTheme} onValueChange={handleThemeChange} />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>
          {t("Language")}: {isEnglish ? "English" : "Nepali"}
        </Text>
        <Switch value={isEnglish} onValueChange={handleLanguageChange} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  settingText: {
    fontSize: 18,
  },
});

export default SettingsScreen;
