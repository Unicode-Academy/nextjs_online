import PostDetail from "./_components/PostDetail";
import PostList from "./_components/PostList";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <>{slug ? <PostDetail post={slug[0]} /> : <PostList />}</>;
}
