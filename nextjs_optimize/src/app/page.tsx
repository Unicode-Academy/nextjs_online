import Image from "next/image";
import img01 from "../images/img01.jpg";
export default function HomePage() {
  return (
    <div className="w-[1200px] mx-auto">
      <h1 className="text-3xl font-bold underline">Tối ưu hình ảnh</h1>
      <Image src={img01} width={300} alt="Hình ảnh 01" />
      <Image src={"/img01.jpg"} width={300} height={200} alt="Hình ảnh 02" />
    </div>
  );
}
