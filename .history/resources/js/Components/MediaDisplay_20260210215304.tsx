import React, { useEffect, useMemo, useRef, useState } from "react";
import { getYouTubeThumbnail } from "@/utils/youtube";

interface MediaDisplayProps {
  image?: string | null;
  videoUrl?: string | null;
  title: string;
  className?: string;
  showVideo?: boolean;
  loading?: "lazy" | "eager";
  showControls?: boolean; // NEW
}

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

function extractYouTubeId(url?: string | null) {
  if (!url) return null;
  const m = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
  );
  return m?.[1] ?? null;
}

function loadYouTubeApi(): Promise<void> {
  return new Promise((resolve) => {
    // already loaded
    if (window.YT && window.YT.Player) return resolve();

    // if script already exists, wait until ready
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.youtube.com/iframe_api"]'
    );
    if (existing) {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        resolve();
      };
      return;
    }

    // load script
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);

    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
  });
}

export const MediaDisplay = ({
  image,
  videoUrl,
  title,
  className = "",
  showVideo = true,
  loading = "lazy",
  showControls = true,
}: MediaDisplayProps) => {
  const videoId = useMemo(() => extractYouTubeId(videoUrl), [videoUrl]);
  const containerId = useMemo(
    () => `yt-${videoId ?? "noid"}-${Math.random().toString(36).slice(2)}`,
    [videoId]
  );

  const playerRef = useRef<any>(null);
  const [ready, setReady] = useState(false);

  // Create player when showing video
  useEffect(() => {
    if (!showVideo || !videoId) return;

    let cancelled = false;

    (async () => {
      await loadYouTubeApi();
      if (cancelled) return;

      // create player
      playerRef.current = new window.YT.Player(containerId, {
        videoId,
        playerVars: {
          controls: 0, // hide YouTube controls
          modestbranding: 1,
          rel: 0,
          enablejsapi: 1,
        },
        events: {
          onReady: () => setReady(true),
        },
      });
    })();

    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy?.();
      } catch {}
      playerRef.current = null;
      setReady(false);
    };
  }, [showVideo, videoId, containerId]);

  // ✅ Video rendering
  if (showVideo && videoId) {
    return (
      <div className={`relative ${className}`}>
        {/* Player mounts here */}
        <div id={containerId} className="absolute inset-0 w-full h-full" />

        {/* Custom Controls */}
        {showControls && (
          <div className="absolute bottom-2 left-2 flex gap-2 bg-black/50 p-2 rounded">
            <button
              type="button"
              disabled={!ready}
              className="px-3 py-1 text-white text-sm rounded bg-white/10 disabled:opacity-50"
              onClick={() => playerRef.current?.playVideo?.()}
            >
              Play
            </button>
            <button
              type="button"
              disabled={!ready}
              className="px-3 py-1 text-white text-sm rounded bg-white/10 disabled:opacity-50"
              onClick={() => playerRef.current?.pauseVideo?.()}
            >
              Pause
            </button>
            <button
              type="button"
              disabled={!ready}
              className="px-3 py-1 text-white text-sm rounded bg-white/10 disabled:opacity-50"
              onClick={() => playerRef.current?.stopVideo?.()}
            >
              Stop
            </button>
            <button
              type="button"
              disabled={!ready}
              className="px-3 py-1 text-white text-sm rounded bg-white/10 disabled:opacity-50"
              onClick={() => {
                const t = playerRef.current?.getCurrentTime?.() ?? 0;
                playerRef.current?.seekTo?.(Math.max(t - 10, 0), true);
              }}
            >
              -10s
            </button>
            <button
              type="button"
              disabled={!ready}
              className="px-3 py-1 text-white text-sm rounded bg-white/10 disabled:opacity-50"
              onClick={() => {
                const t = playerRef.current?.getCurrentTime?.() ?? 0;
                playerRef.current?.seekTo?.(t + 10, true);
              }}
            >
              +10s
            </button>
          </div>
        )}
      </div>
    );
  }

  // ✅ Thumbnail priority if videoUrl exists (same as yours)
  if (videoUrl) {
    const thumbnail = getYouTubeThumbnail(videoUrl, "hq");
    if (thumbnail) {
      return (
        <img
          src={thumbnail}
          alt={title}
          loading={loading}
          className={className || "w-full h-full object-cover"}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src.includes("hqdefault")) {
              const mq = getYouTubeThumbnail(videoUrl, "mq");
              if (mq) {
                target.src = mq;
                return;
              }
            }
            const fallback = getYouTubeThumbnail(videoUrl, "default");
            if (fallback && target.src !== fallback) target.src = fallback;
          }}
        />
      );
    }
  }

  // ✅ Image
  if (image) {
    return (
      <img
        src={image}
        alt={title}
        loading={loading}
        className={className || "w-full h-full object-cover"}
      />
    );
  }

  // ✅ Placeholder
  return (
    <div
      className={`bg-gradient-to-br from-[#f0a500]/20 to-[#d99200]/20 flex items-center justify-center ${className}`}
    >
      <svg
        className="w-12 h-12 text-[#f0a500] opacity-40"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  );
};
