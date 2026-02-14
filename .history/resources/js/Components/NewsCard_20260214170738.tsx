import { Link } from '@inertiajs/react';
import MDEditor from '@uiw/react-md-editor';
import { MediaDisplay } from './MediaDisplay';

interface NewsCardProps {
  image?: string;
  videoUrl?: string;
  category: string;
  title: string;
  public_id: string;
  excerpt?: string;
  date?: string;
  slug?: string;
  variant?: "default" | "horizontal" | "compact";
  className?: string;
}

export const NewsCard = ({ 
  image, 
  videoUrl,
  category, 
  title, 
  public_id,
  excerpt, 
  date,
  slug,
  variant = "default",
  className = ""
}: NewsCardProps) => {

  const CardInnerContent = (
    <>
      {(image || videoUrl) && variant !== "compact" && (
        <div className={`overflow-hidden rounded ${variant === 'horizontal' ? 'w-32 h-24 flex-shrink-0' : 'aspect-video'}`}>
          <MediaDisplay
            image={image}
            videoUrl={videoUrl}
            title={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            showVideo={false}
          />
        </div>
      )}
      <div className={variant === 'horizontal' ? 'flex-1 min-w-0' : (variant === 'default' ? 'p-4' : '')}>
        <span className="category-tag">{category}</span>
        <h3 className={`news-title-sm mt-1 line-clamp-2`}>{title}</h3>
        {excerpt && variant === 'default' && (
          <div className="text-muted-foreground text-sm mt-2 line-clamp-3"><MDEditor.Markdown source={excerpt} /></div>
        )}
        {date && <p className="timestamp mt-2">{date}</p>}
      </div>
    </>
  );

  const articleClasses = `card-news group cursor-pointer ${variant === 'horizontal' ? 'flex gap-4' : ''} ${variant === 'compact' ? 'border-b border-border pb-3 last:border-b-0' : ''} ${className || ''}`;

  if (slug) {
    return (
      <Link href={route('posts.show.full', public_id)} className={articleClasses}>
        {CardInnerContent}
      </Link>
    );
  }

  return (
    <article className={articleClasses}>
      {CardInnerContent}
    </article>
  );
};