import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Id } from "@/convex/_generated/dataModel";
import useUserProfile from "@/hooks/useUserProfile";
import { Colors } from "@/constants/Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import UserProfile from "@/components/UserProfile";
import React, { Fragment } from "react";
import useI18n from "@/i18n/hooks/useI18n";
import ProfileTabs from "@/components/ProfileTabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ProfileProps {
  userId?: Id<"users">;
  isShowBackButton?: boolean;
}

const Profile = ({ userId, isShowBackButton }: ProfileProps) => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const { t } = useI18n();
  const { signOut } = useAuth();
  const { userProfile } = useUserProfile();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <FlatList
        data={[]}
        renderItem={({ item }) => <Text>{item}</Text>}
        ListEmptyComponent={
          <Text style={styles.tabContentText}>{t("emptyThreadsText")}</Text>
        }
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.border,
            }}
          />
        )}
        ListHeaderComponent={
          <Fragment>
            <View style={styles.header}>
              {isShowBackButton ? (
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => router.back()}
                >
                  <Ionicons name={"chevron-back"} size={24} color={"black"} />
                  <Text>Back</Text>
                </TouchableOpacity>
              ) : (
                <MaterialCommunityIcons
                  name={"web"}
                  size={24}
                  color={"black"}
                />
              )}
              <View style={styles.headerIcon}>
                <Ionicons name={"logo-instagram"} size={24} color={"black"} />
                <TouchableOpacity onPress={() => signOut}>
                  <Ionicons
                    name={"log-out-outline"}
                    size={24}
                    color={"black"}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {userId && <UserProfile userId={userId} />}
            {!userId && userProfile && <UserProfile userId={userProfile._id} />}
            <ProfileTabs onTabChange={() => {}} />
          </Fragment>
        }
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  headerIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tabContentText: {
    fontSize: 17,
    textAlign: "center",
    color: Colors.border,
    marginVertical: 16,
  },
});
