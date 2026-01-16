import { getYouTubeThumbnail } from '@/utils/youtube';

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
    // Priority: 
    // 1. If showVideo=true and videoUrl exists -> show embedded video
    // 2. If videoUrl exists -> show video thumbnail (video takes priority over image)
    // 3. If image exists -> show image
    // 4. Show placeholder
    
    // If video URL exists and we want to show the video (not just thumbnail)
    if (videoUrl || showVideo) {
        const videoId = videoUrl?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)?.[1];
        if (videoId) {
            return (
                <div className={`relative ${className}`}>
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full absolute inset-0"
                    />
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
