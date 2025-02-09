import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useUserProfile from "@/hooks/useUserProfile";
import { Colors } from "@/constants/Colors";
import { Fragment } from "react";
import useI18n from "@/i18n/hooks/useI18n";

interface UserProfileProps {
  userId: string;
}

const UserProfile = ({ userId }: UserProfileProps) => {
  const { userProfile } = useUserProfile();
  const { t } = useI18n();
  const profile = useQuery(api.users.getUserById, {
    userId: userId as Id<"users">,
  });
  const isSelf = userId === userProfile?._id;

  return (
    <View style={styles.container}>
      <View style={styles.profileWrapper}>
        <View style={styles.profileNameField}>
          <Text style={styles.name}>
            {profile?.first_name} {profile?.last_name}
          </Text>
          <Text style={styles.username}>@{profile?.username}</Text>
        </View>
        <Image style={styles.image} source={{ uri: profile?.imageUrl }} />
      </View>
      <Text style={styles.bio}>{profile?.bio ?? "No Bio"}</Text>
      <Text>
        {profile?.followersCount} • {profile?.websiteUrl ?? "No website"}
      </Text>

      <View style={styles.buttonWrapper}>
        {isSelf ? (
          <Fragment>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>
                {t("profileEditButtonText")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>
                {t("profileShareButtonText")}
              </Text>
            </TouchableOpacity>
          </Fragment>
        ) : (
          <Fragment>
            <TouchableOpacity style={styles.fullButton}>
              <Text style={styles.fullButtonText}>
                {t("userProfileFollowButtonText")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fullButton}>
              <Text style={styles.fullButtonText}>
                {t("userProfileMentionButtonText")}
              </Text>
            </TouchableOpacity>
          </Fragment>
        )}
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileNameField: {
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  username: {
    fontSize: 14,
    color: "gray",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  bio: {
    fontSize: 14,
    marginVertical: 16,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 16,
    marginTop: 16,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: "bold",
  },
  fullButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#000",
  },
  fullButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
