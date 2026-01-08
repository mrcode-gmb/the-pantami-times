interface NewsCardProps {
  image?: string;
  category: string;
  title: string;
  excerpt?: string;
  date?: string;
  variant?: "default" | "horizontal" | "compact";
}

export const NewsCard = ({ 
  image, 
  category, 
  title, 
  excerpt, 
  date,
  variant = "default" 
}: NewsCardProps) => {
  if (variant === "horizontal") {
    return (
      <article className="card-news flex gap-4 cursor-pointer group">
        {image && (
          <div className="w-32 h-24 flex-shrink-0 overflow-hidden rounded">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <span className="category-tag">{category}</span>
          <h3 className="news-title-sm mt-1 line-clamp-2">{title}</h3>
          {date && <p className="timestamp mt-2">{date}</p>}
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="cursor-pointer group border-b border-border pb-3 last:border-b-0">
        <span className="category-tag">{category}</span>
        <h3 className="news-title-sm mt-1 line-clamp-2">{title}</h3>
        {date && <p className="timestamp mt-2">{date}</p>}
      </article>
    );
  }

  return (
    <article className="card-news cursor-pointer group">
      {image && (
        <div className="aspect-video overflow-hidden rounded-t">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-4">
        <span className="category-tag">{category}</span>
        <h3 className="news-title-md mt-2">{title}</h3>
        {excerpt && (
          <p className="text-muted-foreground text-sm mt-2 line-clamp-3">{excerpt}</p>
        )}
        {date && <p className="timestamp mt-3">{date}</p>}
      </div>
    </article>
  );
};
