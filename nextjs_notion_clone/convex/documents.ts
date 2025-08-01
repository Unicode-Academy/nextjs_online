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
  args: {
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const userId = identity.subject;
    const documents = await ctx.db
      .query("documents")
      // .filter((q) => {
      //   if (!args.parentDocument) {
      //     return true;
      //   }
      //   return q.eq(q.field("parentDocument"), args.parentDocument);
      // })
      // .filter((q) => q.eq(q.field("userId"), userId))
      .withIndex("byUserAndParent", (q) => {
        return q.eq("userId", userId).eq("parentDocument", args.parentDocument);
      })
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();
    return documents;
  },
});
