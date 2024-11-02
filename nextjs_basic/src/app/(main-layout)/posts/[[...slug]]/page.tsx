import PostDetail from "./_components/PostDetail";
import PostList from "./_components/PostList";

export default async function PostDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  return (
    <>
      {slug ? <PostDetail category={slug[0]} post={slug[1]} /> : <PostList />}
    </>
  );
}
