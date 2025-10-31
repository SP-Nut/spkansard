export interface Review {
  id: number;
  rating: number;
  comment: string;
  customerName: string;
  location: string;
  initial: string;
  colorClass: string;
}

export const reviews: Review[] = [
  {
    id: 1,
    rating: 5,
    comment: "คุณภาพเยี่ยม ทีมงานมืออาชีพ ราคาเป็นธรรม แนะนำเลย",
    customerName: "คุณกิตติศักดิ์",
    location: "ลาดพร้าว",
    initial: "ก",
    colorClass: "var(--brand-600)"
  },
  {
    id: 2,
    rating: 5,
    comment: "โรงจอดรถสวยงาม แข็งแรงทนทาน บริการดีเยี่ยม",
    customerName: "คุณสุนีย์",
    location: "รามอินทรา",
    initial: "ส",
    colorClass: "var(--brand-500)"
  },
  {
    id: 3,
    rating: 5,
    comment: "วัสดุดี ราคาไม่แพง ติดตั้งรวดเร็ว สะอาดเรียบร้อย",
    customerName: "คุณวิชัย",
    location: "บางนา",
    initial: "ว",
    colorClass: "var(--brand-700)"
  },
  {
    id: 4,
    rating: 5,
    comment: "กันสาดกระจกโค้งสวยมาก ทีมติดตั้งมืออาชีพ",
    customerName: "คุณนันทนา",
    location: "เอกมัย",
    initial: "น",
    colorClass: "var(--brand-500)"
  },
  {
    id: 5,
    rating: 5,
    comment: "โรงจอดรถ 4 คัน แข็งแรงดี ราคาคุ้มค่า",
    customerName: "คุณอนุชา",
    location: "สาทร",
    initial: "อ",
    colorClass: "var(--brand-600)"
  },
  {
    id: 6,
    rating: 5,
    comment: "ใช้บริการหลายครั้ง คุณภาพคงที่ ไว้ใจได้",
    customerName: "คุณปรีชา",
    location: "บางกะปิ",
    initial: "ป",
    colorClass: "var(--brand-700)"
  },
  {
    id: 7,
    rating: 5,
    comment: "กันสาดโพลีคาร์บอเนตใส สวยงาม กันแดดได้ดี",
    customerName: "คุณสมชาย",
    location: "พระโขนง",
    initial: "ส",
    colorClass: "var(--brand-600)"
  },
  {
    id: 8,
    rating: 5,
    comment: "ติดตั้งโรงจอดรถ 2 คัน งานเรียบร้อย ราคาดี",
    customerName: "คุณจิราพร",
    location: "มีนบุรี",
    initial: "จ",
    colorClass: "var(--brand-500)"
  },
  {
    id: 9,
    rating: 5,
    comment: "กันสาดหน้าบ้านสไตล์โมเดิร์น ประทับใจมาก",
    customerName: "คุณธนพล",
    location: "สุขุมวิท",
    initial: "ธ",
    colorClass: "var(--brand-700)"
  },
  {
    id: 10,
    rating: 5,
    comment: "วัสดุเมทัลชีทคุณภาพดี ทนทานแน่นอน",
    customerName: "คุณรัตนา",
    location: "ท่าพระ",
    initial: "ร",
    colorClass: "var(--brand-600)"
  },
  {
    id: 11,
    rating: 5,
    comment: "ระแนงไม้สังเคราะห์สวย ติดตั้งไว ทีมงานดี",
    customerName: "คุณพิชัย",
    location: "รัชดา",
    initial: "พ",
    colorClass: "var(--brand-500)"
  },
  {
    id: 12,
    rating: 5,
    comment: "กันสาดอลูมิเนียมเหมาะกับบ้าน งานละเอียด",
    customerName: "คุณมนัสวี",
    location: "ดอนเมือง",
    initial: "ม",
    colorClass: "var(--brand-700)"
  },
  {
    id: 13,
    rating: 5,
    comment: "โรงจอดรถหลังคาโค้ง ดีไซน์สวย คุ้มค่าเงิน",
    customerName: "คุณสุรชัย",
    location: "หัวหมาก",
    initial: "ส",
    colorClass: "var(--brand-600)"
  },
  {
    id: 14,
    rating: 5,
    comment: "ฝ้าระบายอากาศคุณภาพดี ช่วยลดความร้อน",
    customerName: "คุณอรุณี",
    location: "พระราม 9",
    initial: "อ",
    colorClass: "var(--brand-500)"
  },
  {
    id: 15,
    rating: 5,
    comment: "กันสาดไวนิลทนทาน สีสวย ราคาเหมาะสม",
    customerName: "คุณวิภาวี",
    location: "ลาดกระบัง",
    initial: "ว",
    colorClass: "var(--brand-700)"
  },
  {
    id: 16,
    rating: 5,
    comment: "งานเหล็กโครงสร้างแข็งแรง มั่นใจในคุณภาพ",
    customerName: "คุณณัฐพล",
    location: "บางแค",
    initial: "ณ",
    colorClass: "var(--brand-600)"
  },
  {
    id: 17,
    rating: 5,
    comment: "โรงจอดรถหลังคาคู่ ดูหรูหรา ติดตั้งเร็ว",
    customerName: "คุณปิยะพร",
    location: "แจ้งวัฒนะ",
    initial: "ป",
    colorClass: "var(--brand-500)"
  },
  {
    id: 18,
    rating: 5,
    comment: "กันสาดกระจกขุ่นสวยงาม กันแดดได้ดีมาก",
    customerName: "คุณชัยวัฒน์",
    location: "ตลิ่งชัน",
    initial: "ช",
    colorClass: "var(--brand-700)"
  },
  {
    id: 19,
    rating: 5,
    comment: "วัสดุชินโคไลท์เบา แต่แข็งแรง ติดตั้งง่าย",
    customerName: "คุณศิริพร",
    location: "นวมินทร์",
    initial: "ศ",
    colorClass: "var(--brand-600)"
  },
  {
    id: 20,
    rating: 5,
    comment: "กันสาดเลื่อนสะดวก ระบบดี ใช้งานได้ดี",
    customerName: "คุณเกรียงไกร",
    location: "วงศ์สว่าง",
    initial: "ก",
    colorClass: "var(--brand-500)"
  },
  {
    id: 21,
    rating: 5,
    comment: "โรงจอดรถ 6 คัน โครงสร้างมั่นคง ประทับใจ",
    customerName: "คุณบุญชู",
    location: "คันนายาว",
    initial: "บ",
    colorClass: "var(--brand-700)"
  },
  {
    id: 22,
    rating: 5,
    comment: "ระแนงอลูมิเนียมสไตล์มินิมอล สวยเรียบหรู",
    customerName: "คุณทิพวรรณ",
    location: "ศรีนครินทร์",
    initial: "ท",
    colorClass: "var(--brand-600)"
  },
  {
    id: 23,
    rating: 5,
    comment: "กันสาดหน้าทางเดินกว้าง ทนแดดทนฝน",
    customerName: "คุณประดิษฐ์",
    location: "บางบอน",
    initial: "ป",
    colorClass: "var(--brand-500)"
  },
  {
    id: 24,
    rating: 5,
    comment: "ติดฝ้าทั้งบ้าน งานสวย ทีมติดตั้งดี",
    customerName: "คุณสุภาพร",
    location: "ราษฎร์บูรณะ",
    initial: "ส",
    colorClass: "var(--brand-700)"
  },
  {
    id: 25,
    rating: 5,
    comment: "โรงจอดรถหลังคากระจกใส สว่างสวยงาม",
    customerName: "คุณวรรณา",
    location: "บางขุนเทียน",
    initial: "ว",
    colorClass: "var(--brand-600)"
  },
  {
    id: 26,
    rating: 5,
    comment: "กันสาดทางเข้าบ้านสวย ได้ใบเสร็จครบถ้วน",
    customerName: "คุณเจษฎา",
    location: "ประเวศ",
    initial: "เ",
    colorClass: "var(--brand-500)"
  }
];
