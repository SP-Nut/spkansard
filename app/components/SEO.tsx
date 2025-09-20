import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  type?: 'website' | 'article' | 'service';
}

export default function SEO({
  title = "เอสพี กันสาด - รับออกแบบ ผลิต กันสาด และโรงจอดรถ อันดับ 1 ในไทย",
  description = "SP Kansard ผู้นำด้านกันสาดและโรงจอดรถมากกว่า 35 ปี ให้บริการครบวงจร ออกแบบติดตั้งกันสาดคุณภาพ รับประกัน 5 ปี ทีมงานมืออาชีพ",
  keywords = "กันสาด, โรงจอดรถ, SP Kansard, กันสาดบ้าน, โรงจอดรถสำเร็จรูป, กันแดด, กันฝน, ติดตั้งกันสาด",
  canonicalUrl = "https://www.spkansard.co",
  ogImage = "/images/logo.png",
  type = "website"
}: SEOProps) {
  const fullTitle = title.includes('SP') ? title : `${title} | SP Kansard`;
  
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="author" content="SP Kansard" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="SP Kansard" />
      <meta property="og:locale" content="th_TH" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@spkansard" />
      
      {/* Additional SEO tags */}
      <meta name="geo.region" content="TH" />
      <meta name="geo.placename" content="Bangkok" />
      <meta name="geo.position" content="13.7563;100.5018" />
      <meta name="ICBM" content="13.7563, 100.5018" />
      
      {/* Business specific */}
      <meta name="business.location" content="28/101 ถ.รัชดา-รามอินทรา, บึงกุ่ม, กรุงเทพมหานคร 10230" />
      <meta name="business.phone" content="+66-2-936-8841" />
      <meta name="business.hours" content="Mo-Fr 08:00-17:00, Sa 08:00-16:00" />
    </Head>
  );
}