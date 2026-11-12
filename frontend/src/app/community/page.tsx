"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Share2,
  PlusCircle,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { SectionContainer } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sampleCommunityPosts } from "@/lib/sample-data";
import { timeAgo, cn } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [posts, setPosts] = useState(sampleCommunityPosts);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("Discussion");
  const [showPostModal, setShowPostModal] = useState(false);
  const [openCommentsFor, setOpenCommentsFor] = useState<string | null>(null);
  const [commentDraft, setCommentDraft] = useState("");
  const [localComments, setLocalComments] = useState<Record<string, string[]>>({});
  const { toast } = useToast();

  const categories = ["All", "Discussion", "Tips & Advice", "Recipes", "Stories", "Salary Transparency"];

  const handleVote = (id: string, delta: number) => {
    setPosts(
      posts.map((p) => {
        if (p.id === id) {
          return { ...p, upvotes: p.upvotes + delta };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId: string) => {
    const draft = commentDraft.trim();
    if (!draft) return;
    setLocalComments((prev) => ({ ...prev, [postId]: [...(prev[postId] || []), draft] }));
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, commentsCount: (p.commentsCount || 0) + 1 } : p)));
    setCommentDraft("");
    toast("Comment posted", { description: "Your take was added to the thread." });
  };

  const handleShare = async (post: { id: string; title: string }) => {
    const url = `${typeof window !== "undefined" ? window.location.origin : ""}/community#${post.id}`;
    try {
      await navigator.clipboard.writeText(url);
      toast("Link copied", { description: "Share the thread anywhere — WhatsApp, X, anywhere." });
    } catch {
      toast("Couldn't copy link", { description: url, variant: "warning" });
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim()) return;

    const newPost = {
      id: "post_" + Date.now(),
      userId: "u1",
      user: {
        id: "u1",
        fullName: "Priya Sharma",
        avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=Priya",
        accountStatus: "ACTIVE" as const,
        emailVerified: true,
        phoneVerified: true,
        capabilities: ["ORDER_FOOD" as const],
        createdAt: new Date().toISOString(),
      },
      title: newPostTitle,
      body: newPostBody,
      category: newPostCategory,
      upvotes: 1,
      downvotes: 0,
      commentsCount: 0,
      createdAt: new Date().toISOString(),
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle("");
    setNewPostBody("");
    setShowPostModal(false);
    toast("Thread published", { description: "Your discussion is live in The Kitchen Table." });
  };

  const filteredPosts = posts.filter(
    (p) => selectedCategory === "All" || p.category === selectedCategory
  );

  return (
    <MainLayout>
      <div className="band-dark bg-noise relative overflow-hidden text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <Badge variant="saffron" className="text-xs font-bold">
                Reddit for Cooking
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight">
                DHANDHA Culinary Community
              </h1>
              <p className="text-sm sm:text-base text-almond-500 max-w-xl">
                Open discussions on cook hiring, salary benchmarks, secret regional recipes,
                and Indian kitchen life.
              </p>
            </div>

            <Button
              onClick={() => setShowPostModal(true)}
              className="font-bold rounded-2xl shadow-lg gap-2 text-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Post</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="sticky top-16 sm:top-20 z-30 bg-surface/95 backdrop-blur-md border-b border-border shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer",
                selectedCategory === cat
                  ? "bg-prussian text-white shadow-xs"
                  : "bg-almond-900/60 text-text-secondary hover:text-prussian hover:bg-almond-800"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <SectionContainer className="pt-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Post Creation Modal */}
          {showPostModal && (
            <div className="p-6 rounded-3xl bg-surface border border-saffron/40 shadow-elevated space-y-4 animate-fade-in">
              <h3 className="font-heading font-bold text-lg text-prussian">
                Start a Discussion in the Community
              </h3>
              <form onSubmit={handleCreatePost} className="space-y-3">
                <input
                  type="text"
                  required
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="Post title or question..."
                  className="w-full h-11 px-3.5 rounded-xl border border-border bg-almond-900/30 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-saffron"
                />
                <textarea
                  rows={4}
                  required
                  value={newPostBody}
                  onChange={(e) => setNewPostBody(e.target.value)}
                  placeholder="Share details, context, questions, or recipe instructions..."
                  className="w-full p-3.5 rounded-xl border border-border bg-almond-900/30 text-xs focus:outline-none focus:ring-2 focus:ring-saffron"
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <select
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value)}
                    className="h-9 px-3 rounded-xl border border-border bg-almond-900/40 text-xs font-bold text-prussian"
                  >
                    <option value="Discussion">Discussion</option>
                    <option value="Tips & Advice">Tips & Advice</option>
                    <option value="Recipes">Recipes</option>
                    <option value="Stories">Stories</option>
                    <option value="Salary Transparency">Salary Transparency</option>
                  </select>

                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPostModal(false)}
                      className="rounded-xl"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      size="sm"
                      className="rounded-xl font-bold"
                    >
                      Post Thread
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Posts Feed (Reddit Layout) */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden border border-border hover:border-prussian hover:shadow-card-hover transition-all rounded-3xl bg-surface flex"
              >
                {/* Left: Reddit style vote column */}
                <div className="w-12 sm:w-14 bg-almond-900/30 border-r border-border flex flex-col items-center py-4 space-y-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleVote(post.id, 1)}
                    className="p-1.5 rounded-lg hover:bg-saffron-subtle hover:text-saffron-dark text-text-secondary transition-colors"
                    aria-label="Upvote"
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                  <span className="font-heading font-extrabold text-xs text-prussian">
                    {post.upvotes}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleVote(post.id, -1)}
                    className="p-1.5 rounded-lg hover:bg-almond-800 text-text-muted transition-colors"
                    aria-label="Downvote"
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Right: Post Content */}
                <div className="p-5 flex-1 space-y-3">
                  <div className="flex items-center gap-2 text-xs">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={post.user?.avatarUrl} />
                      <AvatarFallback>{post.user?.fullName.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="font-bold text-prussian">{post.user?.fullName}</span>
                    <span className="text-text-muted">•</span>
                    <Badge variant="outline" className="text-[10px] py-0 px-2 font-bold">
                      {post.category}
                    </Badge>
                    <span className="text-text-muted">•</span>
                    <span className="text-text-muted">{timeAgo(post.createdAt)}</span>
                  </div>

                  <h2 className="font-heading font-extrabold text-base sm:text-lg text-prussian hover:text-saffron-dark transition-colors cursor-pointer">
                    {post.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                    {post.body}
                  </p>

                  {post.imageUrl && (
                    <div className="rounded-2xl overflow-hidden max-h-80 border border-border mt-2">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="pt-3 border-t border-border flex items-center gap-4 text-xs text-text-secondary">
                    <button
                      type="button"
                      onClick={() => {
                        setOpenCommentsFor(openCommentsFor === post.id ? null : post.id);
                        setCommentDraft("");
                      }}
                      aria-expanded={openCommentsFor === post.id}
                      className="flex items-center gap-1.5 hover:text-prussian font-semibold transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 text-text-muted" />
                      <span>{post.commentsCount || 0} Comments</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleShare(post)}
                      className="flex items-center gap-1.5 hover:text-prussian font-semibold transition-colors"
                    >
                      <Share2 className="w-4 h-4 text-text-muted" />
                      <span>Share</span>
                    </button>
                  </div>

                  {openCommentsFor === post.id && (
                    <div className="animate-fade-in border-t border-border pt-3 space-y-2.5">
                      {(localComments[post.id] || []).map((c, i) => (
                        <div key={i} className="flex items-start gap-2 rounded-2xl bg-almond-900/40 px-3 py-2">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-prussian text-[8px] font-black text-saffron-light">PS</span>
                          <p className="text-[11px] leading-snug text-text-secondary">{c}</p>
                        </div>
                      ))}
                      <form
                        onSubmit={(e) => { e.preventDefault(); handleAddComment(post.id); }}
                        className="flex items-center gap-2"
                      >
                        <input
                          autoFocus
                          value={commentDraft}
                          onChange={(e) => setCommentDraft(e.target.value)}
                          placeholder="Add your take…"
                          aria-label="Write a comment"
                          className="h-9 flex-1 rounded-full border border-border bg-white px-4 text-[11px] font-medium placeholder:text-text-muted focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/25"
                        />
                        <button
                          type="submit"
                          aria-label="Post comment"
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-prussian text-saffron-light transition-transform hover:scale-105 active:scale-95"
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </SectionContainer>
    </MainLayout>
  );
}
