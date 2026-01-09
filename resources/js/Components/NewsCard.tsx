import { Link } from '@inertiajs/react';
import MDEditor from '@uiw/react-md-editor';

interface NewsCardProps {
  image?: string;
  category: string;
  title: string;
  excerpt?: string;
  date?: string;
  slug?: string;
  variant?: "default" | "horizontal" | "compact";
  className?: string;
}

export const NewsCard = ({ 
  image, 
  category, 
  title, 
  excerpt, 
  date,
  slug,
  variant = "default",
  className = ""
}: NewsCardProps) => {

  const CardInnerContent = (
    <>
      {image && variant !== "compact" && (
        <div className={`overflow-hidden rounded ${variant === 'horizontal' ? 'w-32 h-24 flex-shrink-0' : 'aspect-video'}`}>
          {image ? (
            <img 
              src={image.startsWith('http') ? image : `/storage/${image}`} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                // Fallback to a placeholder image if the image fails to load
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/800x450?text=No+Image';
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
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
      <Link href={route('posts.show', slug)} className={articleClasses}>
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