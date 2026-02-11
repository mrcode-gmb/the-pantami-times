import { useEffect, useRef, useState } from 'react';
import { getYouTubeThumbnail } from '@/utils/youtube';

declare global {
    interface Window {
        YT?: any;
        onYouTubeIframeAPIReady?: () => void;
    }
}

let youTubeApiPromise: Promise<void> | null = null;

const loadYouTubeApi = () => {
    if (typeof window === 'undefined') return Promise.resolve();
    if (window.YT?.Player) return Promise.resolve();
    if (!youTubeApiPromise) {
        youTubeApiPromise = new Promise((resolve) => {
            const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
            if (existingScript) {
                const prevReady = window.onYouTubeIframeAPIReady;
                window.onYouTubeIframeAPIReady = () => {
                    prevReady?.();
                    resolve();
                };
                return;
            }

            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScript = document.getElementsByTagName('script')[0];
            if (firstScript?.parentNode) {
                firstScript.parentNode.insertBefore(tag, firstScript);
            } else {
                document.head.appendChild(tag);
            }

            window.onYouTubeIframeAPIReady = () => resolve();
        });
    }
    return youTubeApiPromise;
};

const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

interface MediaDisplayProps {
    image?: string | null;
    videoUrl?: string | null;
    title: string;
    className?: string;
    showVideo?: boolean; // If true, show embedded video; if false, show thumbnail
    loading?: 'lazy' | 'eager';
}

export const MediaDisplay = ({ 
    image, 
    videoUrl, 
    title, 
    className = '',
    showVideo = true,
    loading = 'lazy'
}: MediaDisplayProps) => {
    const playerContainerRef = useRef<HTMLDivElement | null>(null);
    const playerRef = useRef<any>(null);
    const [isReady, setIsReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // Priority: 
    // 1. If showVideo=true and videoUrl exists -> show embedded video
    // 2. If videoUrl exists -> show video thumbnail (video takes priority over image)
    // 3. If image exists -> show image
    // 4. Show placeholder
    
    const videoId = videoUrl?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)?.[1];

    useEffect(() => {
        if (!showVideo || !videoId) return;

        let active = true;

        loadYouTubeApi().then(() => {
            if (!active || !playerContainerRef.current || !window.YT?.Player) return;

            if (playerRef.current?.destroy) {
                playerRef.current.destroy();
                playerRef.current = null;
            }

            playerRef.current = new window.YT.Player(playerContainerRef.current, {
                videoId,
                playerVars: {
                    controls: 0,
                    modestbranding: 1,
                    rel: 0,
                    playsinline: 1,
                    iv_load_policy: 3,
                    enablejsapi: 1,
                    origin: window.location.origin
                },
                events: {
                    onReady: (event: any) => {
                        if (!active) return;
                        setIsReady(true);
                        setDuration(event.target.getDuration?.() ?? 0);
                        setIsMuted(event.target.isMuted?.() ?? false);
                    },
                    onStateChange: (event: any) => {
                        if (!active) return;
                        const state = event.data;
                        const isPlayState = state === window.YT.PlayerState.PLAYING;
                        setIsPlaying(isPlayState);
                    }
                }
            });
        });

        return () => {
            active = false;
            if (playerRef.current?.destroy) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
            setIsReady(false);
            setIsPlaying(false);
            setCurrentTime(0);
            setDuration(0);
        };
    }, [showVideo, videoId]);

    useEffect(() => {
        if (!isReady) return;
        const intervalId = window.setInterval(() => {
            const player = playerRef.current;
            if (!player?.getCurrentTime) return;
            setCurrentTime(player.getCurrentTime());
            const nextDuration = player.getDuration?.() ?? 0;
            if (nextDuration && nextDuration !== duration) {
                setDuration(nextDuration);
            }
        }, 500);

        return () => window.clearInterval(intervalId);
    }, [isReady, duration]);

    const handlePlayPause = () => {
        const player = playerRef.current;
        if (!player?.getPlayerState) return;
        const state = player.getPlayerState();
        if (state === window.YT.PlayerState.PLAYING) {
            player.pauseVideo?.();
        } else {
            player.playVideo?.();
        }
    };

    const handleMuteToggle = () => {
        const player = playerRef.current;
        if (!player) return;
        if (player.isMuted?.()) {
            player.unMute?.();
            setIsMuted(false);
        } else {
            player.mute?.();
            setIsMuted(true);
        }
    };

    const handleSeek = (value: number) => {
        const player = playerRef.current;
        if (!player?.seekTo || !duration) return;
        const nextTime = (value / 100) * duration;
        player.seekTo(nextTime, true);
        setCurrentTime(nextTime);
    };

    // If video URL exists and we want to show the video (not just thumbnail)
    if (videoUrl && showVideo) {
        if (videoId) {
            const progressValue = duration ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;
            return (
                <div className={`relative ${className}`}>
                    <div ref={playerContainerRef} className="w-full h-full absolute inset-0" />
                    <div className="absolute inset-0 flex flex-col justify-end pointer-events-none">
                        <div className="bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 pointer-events-auto">
                            <div className="flex items-center gap-3 text-white">
                                <button
                                    type="button"
                                    onClick={handlePlayPause}
                                    className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 transition flex items-center justify-center"
                                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                                    disabled={!isReady}
                                >
                                    {isPlaying ? (
                                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                            <rect x="6" y="5" width="4" height="14" rx="1" />
                                            <rect x="14" y="5" width="4" height="14" rx="1" />
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleMuteToggle}
                                    className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 transition flex items-center justify-center"
                                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                                    disabled={!isReady}
                                >
                                    {isMuted ? (
                                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                            <path d="M4 9v6h4l5 5V4L8 9H4z" />
                                            <path d="M16 9l4 4m0-4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                            <path d="M4 9v6h4l5 5V4L8 9H4z" />
                                            <path d="M16 8c1.5 1.5 1.5 6.5 0 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            <path d="M19 6c2.5 2.5 2.5 9.5 0 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    )}
                                </button>
                                <div className="flex-1">
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        value={progressValue}
                                        onChange={(e) => handleSeek(Number(e.target.value))}
                                        className="w-full h-1 accent-[#f0a500]"
                                        aria-label="Seek video"
                                        disabled={!isReady || !duration}
                                    />
                                </div>
                                <div className="text-xs tabular-nums text-white/80 w-20 text-right">
                                    {formatTime(currentTime)} / {formatTime(duration)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
    
    // If video URL exists, show thumbnail (takes priority over image)
    if (videoUrl) {
        const thumbnail = getYouTubeThumbnail(videoUrl, 'hq'); // Use 'hq' for better compatibility
        if (thumbnail) {
            return (
                <img 
                    src={thumbnail} 
                    alt={title}
                    loading={loading}
                    className={className || 'w-full h-full object-cover'}
                    onError={(e) => {
                        // Fallback to medium quality, then default quality if high quality fails
                        const target = e.target as HTMLImageElement;
                        if (target.src.includes('hqdefault')) {
                            const mqThumbnail = getYouTubeThumbnail(videoUrl, 'mq');
                            if (mqThumbnail) {
                                target.src = mqThumbnail;
                                return;
                            }
                        }
                        const fallbackThumbnail = getYouTubeThumbnail(videoUrl, 'default');
                        if (fallbackThumbnail && target.src !== fallbackThumbnail) {
                            target.src = fallbackThumbnail;
                        }
                    }}
                />
            );
        }
    }
    
    // If image exists
    if (image) {
        return (
            <img 
                src={image} 
                alt={title}
                loading={loading}
                className={className || 'w-full h-full object-cover'}
            />
        );
    }
    
    // Placeholder
    return (
        <div className={`bg-gradient-to-br from-[#f0a500]/20 to-[#d99200]/20 flex items-center justify-center ${className}`}>
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
