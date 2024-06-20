import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    userId: v.string(),
    content: v.optional(v.string()),
    isArchived: v.boolean(),
    isPublished: v.boolean(),
    coverImage: v.optional(v.string()),
    parentDocument: v.optional(v.id("documents")),
    icon: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId" ,"parentDocument"]),
})
