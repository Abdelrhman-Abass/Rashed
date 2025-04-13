import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Image src="/assets/6164eb5191334f86ff9cdd71e6317a53.png" width={500} height={500} alt="banner"/>
      <Image src="/assets/e3120dc980f208ee6b8a7b09b64ae360.jpg" width={500} height={500} alt="banner"/>
    </div>
  );
}
