import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaLine, FaPhoneAlt, FaTiktok, FaYoutube } from "react-icons/fa";

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7L7 17M8 7h9v9" />
  </svg>
);

const Footer = () => {
  const navGroups = [
    {
      title: "สินค้า",
      aria: "สินค้า",
      links: [
        { label: "กันสาด", href: "/materials" },
        { label: "โรงจอดรถ", href: "/materials" },
        { label: "งานฝ้า", href: "/materials" },
        { label: "งานระแนง", href: "/materials" },
        { label: "งานเหล็ก", href: "/materials" },
      ],
    },
    {
      title: "เกี่ยวกับเรา",
      aria: "เกี่ยวกับเรา",
      links: [
        { label: "เกี่ยวกับเรา", href: "/about" },
        { label: "ผลงาน", href: "/gallery" },
        { label: "วัสดุ", href: "/materials" },
        { label: "บทความ", href: "/blog" },
      ],
    },
    {
      title: "บริการ",
      aria: "บริการ",
      links: [
        { label: "คำถามที่พบบ่อย", href: "/faq" },
        { label: "ติดต่อเรา", href: "/contact" },
        { label: "ประเมินราคา", href: "/estimate" },
      ],
    },
  ];

  const socials = [
    { label: "Line", href: "https://line.me/R/ti/p/@spkansard", Icon: FaLine, className: "bg-[#06C755] hover:bg-[#05B84E]" },
    { label: "Facebook", href: "https://www.facebook.com/spkansard/", Icon: FaFacebookF, className: "hover:bg-[#1877F2]" },
    { label: "YouTube", href: "https://www.youtube.com/@spkansard", Icon: FaYoutube, className: "hover:bg-[#FF0000]" },
    { label: "TikTok", href: "https://www.tiktok.com/@spkansard?is_from_webapp=1&sender_device=pc", Icon: FaTiktok, className: "hover:bg-black" },
  ];

  return (
    <footer className="mt-auto w-full bg-[#1E2E4F] text-white">
      <div className="mx-auto w-full max-w-[1760px] px-4 pb-24 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1.35fr_0.95fr] lg:gap-14">
          <section className="space-y-6">
            <Link href="/" aria-label="SP Kansard หน้าแรก" className="inline-flex">
              <Image
                src="/images/logo.png"
                alt="SP Kansard"
                width={260}
                height={82}
                className="h-16 w-auto brightness-0 invert sm:h-20"
                loading="lazy"
              />
            </Link>

            <div>
              <h2 className="text-xl font-semibold tracking-normal sm:text-2xl">
                บริษัท เอสพี กันสาด จำกัด
              </h2>
              <p className="mt-3 max-w-md text-sm leading-7 text-white/75">
                ผู้เชี่ยวชาญด้านกันสาด โรงจอดรถ งานฝ้า งานระแนง และงานเหล็กครบวงจร
                ด้วยประสบการณ์กว่า 38 ปี ดูแลลูกค้ามากกว่า 50,000 ราย
              </p>
            </div>

            <a
              href="tel:02-936-8841"
              className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-[#1E2E4F] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              <FaPhoneAlt className="h-4 w-4" />
              <span className="text-lg font-semibold">02-936-8841</span>
            </a>
          </section>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {navGroups.map((group) => (
              <nav key={group.title} aria-label={group.aria}>
                <h3 className="text-base font-semibold">{group.title}</h3>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith("http") ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1.5 text-sm text-white/72 transition hover:text-white"
                        >
                          <span>{link.label}</span>
                          <ArrowIcon className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="inline-flex text-sm text-white/72 transition hover:text-white"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <section className="rounded-lg border border-white/12 bg-white/[0.04] p-5 sm:p-6">
            <h3 className="text-base font-semibold">ติดต่อเรา</h3>
            <div className="mt-4 space-y-3 text-sm leading-6 text-white/78">
              <p>
                28/101 ถ.รัชดา-รามอินทรา แขวงคลองกุ่ม<br />
                เขตบึงกุ่ม กรุงเทพมหานคร 10230
              </p>
              <div className="space-y-1.5">
                <a href="tel:02-936-8841" className="block transition hover:text-white">
                  โทร. 02-936-8841
                </a>
                <p>แฟกซ์. 02-936-8843</p>
                <a href="mailto:spkansards@gmail.com" className="block transition hover:text-white">
                  spkansards@gmail.com
                </a>
                <a
                  href="https://line.me/R/ti/p/@spkansard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition hover:text-white"
                >
                  LINE @spkansard
                </a>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-10 border-t border-white/12 pt-6 sm:mt-12">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              {socials.map(({ label, href, Icon, className }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition hover:-translate-y-0.5 hover:ring-white/25 ${className}`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            <p className="text-sm text-white/65">
              © สงวนลิขสิทธิ์ บริษัท เอสพี กันสาด จำกัด
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
