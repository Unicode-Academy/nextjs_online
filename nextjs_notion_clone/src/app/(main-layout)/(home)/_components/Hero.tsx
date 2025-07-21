import Image from "next/image";

export default function Hero() {
  return (
    <div className="max-w-5xl mx-auto flex items-center">
      <div className="relative h-[400px] w-[300px] sm:w-[350px] md:w-[400px]">
        <Image
          src={`/documents.png`}
          alt="Documents"
          className="object-contain max-w-full"
          fill
        />
      </div>
      <div className="relative h-[400px] w-[300px] sm:w-[350px] md:w-[400px] hidden sm:block">
        <Image
          src={`/reading.png`}
          alt="Reading"
          className="object-contain max-w-full"
          fill
        />
      </div>
    </div>
  );
}
