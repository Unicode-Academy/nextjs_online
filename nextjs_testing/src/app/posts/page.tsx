export default async function PostPage() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post: { id: number; title: string; body: string }) => (
        <div key={post.id}>
          <h2 data-testid="post-title">{post.title}</h2>
          <p data-testid="post-body">{post.body}</p>
        </div>
      ))}
    </div>
  );
}
