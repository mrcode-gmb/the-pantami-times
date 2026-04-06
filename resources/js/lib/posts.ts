type PostLinkable = {
  public_id?: string | null;
  slug?: string | null;
};

export function postHref(post: PostLinkable): string {
  const identifier = post.public_id ?? post.slug;

  if (!identifier) {
    return '#';
  }

  return route('posts.show.full', {
    post: identifier,
  });
}
