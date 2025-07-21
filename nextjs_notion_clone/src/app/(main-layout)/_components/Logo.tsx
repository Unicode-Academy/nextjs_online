import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex gap-2 items-center justify-center sm:justify-start">
      <Image src={`/logo.svg`} alt="Logo Jotion" width={40} height={40} />
      <span className="font-semibold">Jotion</span>
    </div>
  );
}
