import {useUser} from "@clerk/clerk-expo";
import {useQuery} from "convex/react";
import {getUserByClerkId} from "@/convex/users";
import {api} from "@/convex/_generated/api";

const useUserProfile = () => {
    const { user } = useUser();
    const clerkId = user?.id;
    const userProfile = useQuery(api.users.getUserByClerkId, { clerkId });

    return { userProfile}
}

export default useUserProfile