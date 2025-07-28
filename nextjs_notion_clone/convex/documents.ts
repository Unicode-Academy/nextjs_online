import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const userId = identity.subject;
    ctx.db.insert("documents", {
      title: args.title,
      userId,
      parentDocument: args.parentDocument,
      isArchived: false,
      isPublished: false,
    });
  },
});

export const get = query({
  handler: async (ctx) => {
    const documents = await ctx.db.query("documents").collect();
    return documents;
  },
});
