import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";
import { httpRouter } from "convex/server";

/**
 * @url https://cautious-okapi-971.convex.cloud
 * @url https://cautious-okapi-971.convex.site
 */
const http = httpRouter();

export const handleClerkWebhook = httpAction(async (ctx, request) => {
  const { data, type } = await request.json();

  switch (type) {
    case "user.created":
      await ctx.runMutation(internal.users.createUser, {
        clerkId: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email_addresses[0].email_address,
        imageUrl: data.image_url,
        username: data.username,
        followersCount: 0,
      });

      break;
    case "user.updated":
      console.log("User updated", data);
      break;
    case "user.deleted":
      console.log("User deleted", data);
      break;
    default:
      console.log("Unknown type", type);
  }
  return new Response();
});

/**
 * https://cautious-okapi-971.convex.site/clerk-users-webhook
 */
http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: handleClerkWebhook,
});

export default http;
