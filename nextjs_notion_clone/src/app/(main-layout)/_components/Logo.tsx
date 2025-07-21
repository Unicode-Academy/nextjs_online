import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex gap-2 items-center justify-center sm:justify-start">
      <Image
        src={`/logo.svg`}
        className="dark:hidden"
        alt="Logo Jotion"
        width={40}
        height={40}
      />
      <Image
        src={`/logo-dark.svg`}
        className="hidden dark:block"
        alt="Logo Jotion"
        width={40}
        height={40}
      />
      <span className="font-semibold">Jotion</span>
    </div>
  );
}
