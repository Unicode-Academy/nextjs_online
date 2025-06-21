export default function ServerComponent() {
  console.log(process.env.APP_NAME);

  return (
    <div>
      <h1 className="text-3xl font-bold">Server Component</h1>
    </div>
  );
}
