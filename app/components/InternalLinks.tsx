'use client';

import Link from 'next/link';
import { FaArrowRight, FaHome, FaImages, FaQuestionCircle, FaPhone, FaClipboardList } from 'react-icons/fa';

interface RelatedLink {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface InternalLinksProps {
  currentPage?: string;
  showTitle?: boolean;
}

export default function InternalLinks({ currentPage, showTitle = true }: InternalLinksProps) {
  const allLinks: RelatedLink[] = [
    {
      href: '/',
      title: 'หน้าแรก',
      description: 'ดูบริการและผลงานของเรา',
      icon: <FaHome className="w-5 h-5" />
    },
    {
      href: '/portfolio',
      title: 'ผลงาน',
      description: 'ชมผลงานกันสาดและโรงจอดรถ',
      icon: <FaClipboardList className="w-5 h-5" />
    },
    {
      href: '/gallery',
      title: 'แกลลอรี่',
      description: 'รูปภาพผลงานทั้งหมด',
      icon: <FaImages className="w-5 h-5" />
    },
    {
      href: '/materials',
      title: 'วัสดุ',
      description: 'ข้อมูลวัสดุและคุณภาพ',
      icon: <FaClipboardList className="w-5 h-5" />
    },
    {
      href: '/faq',
      title: 'คำถามที่พบบ่อย',
      description: 'คำถามและคำตอบเกี่ยวกับบริการ',
      icon: <FaQuestionCircle className="w-5 h-5" />
    },
    {
      href: '/contact',
      title: 'ติดต่อเรา',
      description: 'ปรึกษาและขอใบเสนอราคา',
      icon: <FaPhone className="w-5 h-5" />
    }
  ];

  // Filter out current page and limit to 4 links
  const relatedLinks = allLinks
    .filter(link => link.href !== currentPage)
    .slice(0, 4);

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              หน้าที่เกี่ยวข้อง
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              เรียนรู้เพิ่มเติมเกี่ยวกับบริการและผลงานของเรา
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-blue-500 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="text-blue-600 group-hover:text-blue-700">
                  {link.icon}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                  {link.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                {link.description}
              </p>
              <div className="flex items-center text-blue-600 group-hover:text-blue-700 text-sm font-medium">
                <span>ดูเพิ่มเติม</span>
                <FaArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}