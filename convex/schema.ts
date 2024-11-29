import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const User = {
  email: v.string(),
  clerkId: v.string(),
  imageUrl: v.optional(v.string()),
  first_name: v.optional(v.string()),
  last_name: v.optional(v.string()),
  username: v.union(v.string(), v.null()),
  bio: v.optional(v.string()),
  location: v.optional(v.string()),
  websiteUrl: v.optional(v.string()),
  followersCount: v.number(),
  pushToken: v.optional(v.string()),
};

/**
 * Message schema
 * userId: users 테이블에 대한 외래 키
 * likeCount: 좋아요 수 @기본값 0
 * commentCount: 댓글 수 @기본값 0
 * retweetCount: 리트윗 수 @기본값 0
 * mediaFiles: 미디어 파일 URL 배열
 */
export const Message = {
  userId: v.id("users"),
  threadId: v.optional(v.string()),
  content: v.string(),
  likeCount: v.number(),
  commentCount: v.number(),
  retweetCount: v.number(),
  mediaFiles: v.optional(v.array(v.string())),
  websiteUrl: v.optional(v.string()),
};

/**
 * dashboard.convex.dev 에서 스키마 확인 가능
 */
export default defineSchema({
  users: defineTable(User),
  messages: defineTable(Message),
});
