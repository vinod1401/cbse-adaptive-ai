"use client";

import React, { useState } from "react";
import { PlayCircle, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { getTopicVideo, getYouTubeSearchUrl, parseYouTubeId } from "@/lib/topic-videos";

interface TopicVideoProps {
  topicId: string;
  topicTitle?: string;
  /** Start with the player open (used on the practice page). */
  defaultOpen?: boolean;
}

export function TopicVideo({ topicId, topicTitle, defaultOpen = false }: TopicVideoProps) {
  const video = getTopicVideo(topicId, topicTitle);
  const videoId = parseYouTubeId(video.youtube);
  const searchUrl = getYouTubeSearchUrl(video.searchQuery);
  const [open, setOpen] = useState(defaultOpen);

  // No specific video configured: open topic-related results on YouTube.
  if (!videoId) {
    return (
      <a
        href={searchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-xl bg-rose-600/15 hover:bg-rose-600/25 text-rose-300 text-xs font-semibold border border-rose-500/30 transition-colors"
      >
        <PlayCircle className="w-4 h-4" />
        <span>YouTube पर वीडियो देखें</span>
        <ExternalLink className="w-3 h-3 opacity-70" />
      </a>
    );
  }

  return (
    <div className="rounded-xl border border-rose-500/30 bg-slate-950/60 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full py-2 px-4 text-rose-300 text-xs font-semibold hover:bg-rose-600/10 transition-colors"
      >
        <span className="flex items-center gap-2">
          <PlayCircle className="w-4 h-4" />
          वीडियो लेसन देखें (Video Lesson)
        </span>
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && (
        <div className="relative w-full aspect-video bg-black">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
            title={topicTitle ? `${topicTitle} — video lesson` : "Video lesson"}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
