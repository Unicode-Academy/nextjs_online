import About from "./_components/About";
import Service from "./_components/Service";
import Title from "./_components/Title";

export default function Home() {
  console.log(`Ok chưa?`);
  return (
    <div>
      <Title title="Chào mừng bạn đến với Unicode Academy" />
      <About />
      <Service />
    </div>
  );
}
