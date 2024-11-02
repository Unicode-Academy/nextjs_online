export default function PostDetail({
  category,
  post,
}: {
  category: string;
  post: string;
}) {
  return (
    <div>
      <h1>Post detail</h1>
      <h2>Category: {category}</h2>
      <h2>Post: {post}</h2>
    </div>
  );
}
