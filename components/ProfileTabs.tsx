import useI18n from "@/i18n/hooks/useI18n";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";

interface ProfileTabsProps {
  onTabChange: (tab: string) => void;
}

const ProfileTabs = ({ onTabChange }: ProfileTabsProps) => {
  const { t } = useI18n();
  const TABS = [
    t("profileTabsThreadsText"),
    t("profileTabsRepliesText"),
    t("profileTabsRepostsText"),
  ] as const;
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const onPressTab = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <View style={styles.container}>
      {TABS.map((tab) => (
        <TouchableOpacity
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          key={tab}
          onPress={() => onPressTab(tab)}
        >
          <Text
            style={[styles.tabText, activeTab === tab && styles.activeTabText]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProfileTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  tab: {
    alignItems: "center",
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingVertical: 12,
  },
  tabText: {
    color: Colors.border,
  },
  activeTabText: {
    color: "black",
    fontWeight: "bold",
  },
  activeTab: {
    borderBottomColor: "black",
  },
});
