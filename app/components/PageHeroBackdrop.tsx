import Image from 'next/image';

const photos = {
  modern: { src: '/herosection/กันสาด บ้านสไตล์โมเดิร์น.webp', position: '56% 60%' },
  minimal: { src: '/herosection/กันสาดเรียบๆ ทันสมัย.webp', position: '50% 55%' },
  premium: { src: '/herosection/กันสาดหรู โมเดิร์น.webp', position: '52% 58%' },
};

export default function PageHeroBackdrop({ photo }: { photo: keyof typeof photos }) {
  const { src, position } = photos[photo];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <Image src={src} alt="" fill sizes="100vw" preload className="object-cover"
        style={{ objectPosition: position }} />
      <div className="absolute inset-0 bg-linear-to-b from-[#101927]/36 via-[#101927]/52 to-[#101927]/43" />
    </div>
  );
}
