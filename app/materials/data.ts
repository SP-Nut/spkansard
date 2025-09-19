// Material types and data for materials page
export interface Material {
  id: string;
  name: string;
  category: 'โปร่งแสง' | 'ทึบแสง' | 'ระแนง' | 'ฝ้า' | 'รางน้ำ';
  subcategory?: string;
  thickness?: string;
  description: string;
  features: string[];
  pros: string[];
  considerations: string[];
  colors: string[];
  pricePerSqm: {
    S: number;
    M: number;
    L: number;
    XL: number;
    XXL?: number;
    M_Plus?: number;
  };
  images: string[];
  specifications: {
    [key: string]: string;
  };
  isPopular?: boolean;
}

export const materialsData: Material[] = [
  // โปร่งแสง
  {
    id: "shinkolite-prime-10mm",
    name: "หลังคาอะคริลิค Shinkolite รุ่น Prime หนา 10 มม.",
    category: "โปร่งแสง",
    subcategory: "อะคริลิค",
    thickness: "10 มม.",
    description: "หลังคาอะคริลิคคุณภาพพรีเมียม ให้แสงธรรมชาติสวยงาม ทนทานต่อสภาพอากาศ",
    features: ["ให้แสงธรรมชาติ 85%", "ป้องกันรังสี UV 99%", "ทนความร้อนสูง", "ไม่เปลี่ยนสี", "ติดตั้งง่าย"],
    pros: ["ความใสสูง", "ทนทานมาก", "ไม่เหลือง", "ป้องกัน UV ดี"],
    considerations: ["ราคาสูง", "ต้องดูแลความสะอาด", "อาจมีเสียงฝนดัง"],
    colors: ["ใส", "ฟ้าอ่อน", "เขียวอ่อน", "บรอนซ์"],
    pricePerSqm: { S: 8350, M: 8890, L: 9100, XL: 10300, M_Plus: 15900 },
    images: ["/herosection/01.jpg", "/herosection/02.jpg", "/herosection/03.jpg"],
    specifications: {
      "หนา": "10 มม.",
      "น้ำหนัก": "4.8 กก./ตร.ม.",
      "การส่องแสง": "85%",
      "การป้องกัน UV": "99%",
      "อุณหภูมิทำงาน": "-40°C ถึง +120°C"
    },
    isPopular: true
  },
  {
    id: "shinkolite-heat-cut-6mm",
    name: "หลังคาอะคริลิค Shinkolite รุ่น Heat Cut/Nature หนา 6 มม. เคลือบสารป้องกัน UV",
    category: "โปร่งแสง",
    subcategory: "อะคริลิค",
    thickness: "6 มม.",
    description: "อะคริลิคเคลือบพิเศษป้องกัน UV และความร้อน",
    features: ["เคลือบป้องกัน UV", "ลดความร้อน", "ใสเงางาม", "ทนทาน", "ไม่เปลี่ยนสี"],
    pros: ["ป้องกันความร้อนดี", "เคลือบ UV", "ราคาเหมาะสม"],
    considerations: ["หนาน้อยกว่ารุ่น Prime", "ต้องดูแลพิเศษ"],
    colors: ["ใส", "ฟ้าอ่อน", "เขียวอ่อน"],
    pricePerSqm: { S: 5550, M: 5700, L: 5900, XL: 6100, M_Plus: 11900 },
    images: ["/herosection/02.jpg", "/herosection/03.jpg", "/herosection/04.jpg"],
    specifications: {
      "หนา": "6 มม.",
      "น้ำหนัก": "2.9 กก./ตร.ม.",
      "การส่องแสง": "82%",
      "การป้องกัน UV": "99%",
      "การลดความร้อน": "30%"
    }
  },
  {
    id: "polycarbonate-6mm",
    name: "หลังคาโพลีคาร์บอเนต Polycarbonate หนา 6 มม.",
    category: "โปร่งแสง",
    subcategory: "โพลีคาร์บอเนต",
    thickness: "6 มม.",
    description: "หลังคาโพลีคาร์บอเนตคุณภาพดี ราคาเหมาะสม เหมาะสำหรับงานทั่วไป",
    features: ["ให้แสงธรรมชาติ 80%", "ป้องกันรังสี UV 98%", "น้ำหนักเบา", "ดัดโค้งได้", "ราคาประหยัด"],
    pros: ["ราคาดี", "น้ำหนักเบา", "ดัดโค้งได้", "ติดตั้งง่าย"],
    considerations: ["อาจขุ่นตามเวลา", "ทนแรงกระแทกน้อยกว่าอะคริลิค", "อายุการใช้งานสั้นกว่า"],
    colors: ["ใส", "ฟ้า", "เขียว", "บรอนซ์", "โอปอล"],
    pricePerSqm: { S: 1800, M: 1900, L: 2000, XL: 2100, XXL: 3300, M_Plus: 4400 },
    images: ["/herosection/02.jpg", "/herosection/03.jpg", "/herosection/04.jpg"],
    specifications: {
      "หนา": "6 มม.",
      "น้ำหนัก": "0.7 กก./ตร.ม.",
      "การส่องแสง": "80%",
      "การป้องกัน UV": "98%",
      "อุณหภูมิทำงาน": "-40°C ถึง +120°C"
    },
    isPopular: true
  },
  {
    id: "polycarbonate-10mm",
    name: "หลังคาโพลีคาร์บอเนต Polycarbonate หนา 10 มม.",
    category: "โปร่งแสง",
    subcategory: "โพลีคาร์บอเนต",
    thickness: "10 มม.",
    description: "โพลีคาร์บอเนตหนาพิเศษ ทนทานมากขึ้น",
    features: ["ให้แสงธรรมชาติ 85%", "ป้องกันรังสี UV 99%", "หนาพิเศษ", "ทนแรงกระแทกสูง", "ฉนวนเสียงดี"],
    pros: ["หนามาก", "ทนทาน", "ฉนวนเสียงดี"],
    considerations: ["ราคาสูงกว่า 6 มม.", "น้ำหนักมากขึ้น"],
    colors: ["ใส", "ฟ้า", "เขียว", "บรอนซ์"],
    pricePerSqm: { S: 2150, M: 2250, L: 2350, XL: 2450, XXL: 3700, M_Plus: 4800 },
    images: ["/herosection/03.jpg", "/herosection/04.jpg", "/herosection/05.jpg"],
    specifications: {
      "หนา": "10 มม.",
      "น้ำหนัก": "1.2 กก./ตร.ม.",
      "การส่องแสง": "85%",
      "การป้องกัน UV": "99%",
      "ทนแรงกระแทก": "สูง"
    }
  },
  {
    id: "fiberglass-dlite-15mm",
    name: "หลังคาไฟเบอร์กลาส ลอนเรียบ D-Lite หนา 1.5 มม.",
    category: "โปร่งแสง",
    subcategory: "ไฟเบอร์กลาส",
    thickness: "1.5 มม.",
    description: "ไฟเบอร์กลาสลอนเรียบ เหมาะสำหรับงานประหยัด",
    features: ["ราคาประหยัด", "น้ำหนักเบา", "ทนสภาพอากาศ", "ติดตั้งง่าย", "ให้แสงพอเหมาะ"],
    pros: ["ราคาถูก", "เบา", "ทนทาน", "สีหลากหลาย"],
    considerations: ["ใสน้อยกว่าอะคริลิค", "อาจเปราะกว่า"],
    colors: ["ใส", "เขียว", "ฟ้า", "เทาอัลลอยด์"],
    pricePerSqm: { S: 3100, M: 3200, L: 3400, XL: 3600, XXL: 4600, M_Plus: 6400 },
    images: ["/herosection/04.jpg", "/herosection/05.jpg", "/herosection/01.jpg"],
    specifications: {
      "หนา": "1.5 มม.",
      "น้ำหนัก": "2.1 กก./ตร.ม.",
      "การส่องแสง": "70%",
      "รูปทรง": "ลอนเรียบ",
      "ทนสภาพอากาศ": "ดี"
    }
  },

  // ทึบแสง
  {
    id: "aluminum-roof-3mm",
    name: "หลังคาอลูมิเนียมรูฟ Aluminum Roof หนา 3 มม.",
    category: "ทึบแสง",
    subcategory: "อลูมิเนียม",
    thickness: "3 มม.",
    description: "หลังคาอลูมิเนียมคุณภาพสูง ไม่เป็นสนิม ทนทานมาก",
    features: ["ไม่เป็นสนิม", "น้ำหนักเบา", "ทนทานมาก", "สวยงาม", "ไม่ต้องบำรุงรักษา"],
    pros: ["ไม่เป็นสนิม", "สวยงาม", "ทนทาน", "ไม่ต้องทาสี"],
    considerations: ["ราคาสูง", "เสียงฝนดัง", "ขยายตัวเมื่อร้อน"],
    colors: ["เงิน", "ขาว", "เทาดำ", "บรอนซ์"],
    pricePerSqm: { S: 3650, M: 3850, L: 4050, XL: 4250, M_Plus: 9100 },
    images: ["/herosection/05.jpg", "/herosection/01.jpg", "/herosection/02.jpg"],
    specifications: {
      "หนา": "3 มม.",
      "น้ำหนัก": "8.1 กก./ตร.ม.",
      "การป้องกันแสงแดด": "100%",
      "การป้องกันสนิม": "100%",
      "อายุการใช้งาน": "25+ ปี"
    },
    isPopular: true
  },
  {
    id: "vinyl-dream-roof-6mm",
    name: "หลังคาไวนิล รุ่นดรีมรูฟ Vinyl Dream Roof ท้องเรียบ คลิป-ล็อค หนา 6 มม.",
    category: "ทึบแสง",
    subcategory: "ไวนิล",
    thickness: "6 มม.",
    description: "ไวนิลคุณภาพสูง ระบบคลิปล็อค ติดตั้งง่าย",
    features: ["ระบบคลิป-ล็อค", "ท้องเรียบ", "ทนสภาพอากาศ", "ไม่ซึม", "สีสวย"],
    pros: ["ติดตั้งง่าย", "ไม่ซึม", "สวยงาม", "ราคาเหมาะสม"],
    considerations: ["อาจขยายตัวเมื่อร้อน", "ต้องใช้อุปกรณ์พิเศษ"],
    colors: ["แดง", "เขียว", "ฟ้า", "เทา", "น้ำตาล"],
    pricePerSqm: { S: 2750, M: 2850, L: 2900, XL: 2900, XXL: 4300, M_Plus: 6000 },
    images: ["/herosection/01.jpg", "/herosection/02.jpg", "/herosection/03.jpg"],
    specifications: {
      "หนา": "6 มม.",
      "น้ำหนัก": "3.6 กก./ตร.ม.",
      "การป้องกันแสงแดด": "100%",
      "ระบบติดตั้ง": "คลิป-ล็อค",
      "ความทนทาน": "ดีมาก"
    }
  },
  {
    id: "metal-sheet-035mm",
    name: "หลังคาเมทัลชีท หนา 0.35 มม.",
    category: "ทึบแสง",
    subcategory: "เมทัลชีท",
    thickness: "0.35 มม.",
    description: "หลังคาเมทัลชีทมาตรฐาน ทนทาน ราคาประหยัด เหมาะสำหรับงานทั่วไป",
    features: ["ป้องกันแสงแดด 100%", "ทนสนิม", "ติดตั้งเร็ว", "หลากสี", "ราคาประหยัด"],
    pros: ["ราคาถูก", "ติดตั้งง่าย", "สีหลากหลาย", "ทนทาน"],
    considerations: ["เสียงฝนดัง", "ร้อนในตอนกลางวัน", "อาจเป็นสนิมได้"],
    colors: ["แดง", "เขียว", "ฟ้า", "เทา", "น้ำตาล", "ครีม"],
    pricePerSqm: { S: 1500, M: 1600, L: 1700, XL: 1800, XXL: 3000, M_Plus: 4100 },
    images: ["/herosection/04.jpg", "/herosection/05.jpg", "/herosection/01.jpg"],
    specifications: {
      "หนา": "0.35 มม.",
      "น้ำหนัก": "3.5 กก./ตร.ม.",
      "การป้องกันแสงแดด": "100%",
      "การกันสนิม": "Galvanized",
      "อุณหภูมิทำงาน": "-20°C ถึง +80°C"
    },
    isPopular: true
  },
  {
    id: "metal-sheet-sandwich-035mm",
    name: "หลังคาเมทัลชีท หนา 0.35 มม. แผ่นแซนวิช ติดฉนวน PU หนา 25 มม.",
    category: "ทึบแสง",
    subcategory: "เมทัลชีท",
    thickness: "0.35 มม. + ฉนวน 25 มม.",
    description: "เมทัลชีทแซนวิชพร้อมฉนวน PU ลดความร้อนและเสียง",
    features: ["ฉนวนกันความร้อน", "ลดเสียง", "ติดตั้งง่าย", "ป้องกันแสงแดด 100%", "ประหยัดพลังงาน"],
    pros: ["กันความร้อนดี", "ลดเสียงรบกวน", "ประหยัดไฟ", "ติดตั้งเร็ว"],
    considerations: ["ราคาสูงกว่าธรรมดา", "หนาขึ้น", "น้ำหนักเพิ่ม"],
    colors: ["แดง", "เขียว", "ฟ้า", "เทา", "ขาว"],
    pricePerSqm: { S: 2150, M: 2250, L: 2350, XL: 2450, XXL: 3700, M_Plus: 4800 },
    images: ["/herosection/03.jpg", "/herosection/04.jpg", "/herosection/05.jpg"],
    specifications: {
      "หนา": "0.35 มม. + PU 25 มม.",
      "น้ำหนัก": "10 กก./ตร.ม.",
      "ฉนวนความร้อน": "ดีมาก",
      "ลดเสียง": "50%",
      "ประหยัดพลังงาน": "30%"
    }
  },

  // ระแนง
  {
    id: "steel-wood-pattern-battens",
    name: "ระแนงเหล็กลายไม้ Aron",
    category: "ระแนง",
    subcategory: "เหล็กลายไม้",
    description: "ระแนงเหล็กลายไม้สวยงาม ทนทาน เหมือนไม้จริง",
    features: ["ลายไม้สวยงาม", "ทนทานกว่าไม้จริง", "ไม่ปลวก", "ไม่เป็นสนิม", "ดูแลง่าย"],
    pros: ["สวยเหมือนไม้จริง", "ทนทานมาก", "ไม่มีปลวก", "ไม่ต้องทาสี"],
    considerations: ["ราคาสูง", "ต้องติดตั้งโดยช่างชำนาญ"],
    colors: ["ไม้สักทอง", "ไม้เชอร์รี่", "ไม้วอลนัท", "ไม้โอ๊ค"],
    pricePerSqm: { S: 3500, M: 3500, L: 3500, XL: 3500 },
    images: ["/herosection/02.jpg", "/herosection/03.jpg", "/herosection/04.jpg"],
    specifications: {
      "วัสดุ": "เหล็กเคลือบลายไม้",
      "น้ำหนัก": "15 กก./ตร.ม.",
      "ขนาดระแนง": "150 มม.",
      "ระยะห่าง": "100-200 มม.",
      "การป้องกันสนิม": "100%"
    }
  },
  {
    id: "aluminum-battens",
    name: "ระแนงอลูมิเนียม Aluminum Battens",
    category: "ระแนง",
    subcategory: "อลูมิเนียม",
    description: "ระแนงอลูมิเนียมทนทาน ไม่เป็นสนิม เหมาะสำหรับการปรับแสงและลม",
    features: ["ไม่เป็นสนิม", "น้ำหนักเบา", "ปรับแสงได้", "ดูแลง่าย", "ทนทาน"],
    pros: ["ไม่เป็นสนิม", "สวยงาม", "ปรับแสงได้", "ทนทาน"],
    considerations: ["ราคาสูงกว่าเหล็ก", "การติดตั้งต้องละเอียด"],
    colors: ["เงิน", "ขาว", "ดำ", "บรอนซ์"],
    pricePerSqm: { S: 1800, M: 1800, L: 1800, XL: 1800 },
    images: ["/herosection/03.jpg", "/herosection/04.jpg", "/herosection/05.jpg"],
    specifications: {
      "วัสดุ": "อลูมิเนียม",
      "น้ำหนัก": "2.5 กก./ตร.ม.",
      "ขนาดระแนง": "100 มม.",
      "ระยะห่าง": "150 มม.",
      "การป้องกันสนิม": "100%"
    },
    isPopular: true
  },
  {
    id: "vinyl-strip-10mm",
    name: "ระแนงไวนิล Vinyl Strip หนา 10 มม.",
    category: "ระแนง",
    subcategory: "ไวนิล",
    thickness: "10 มม.",
    description: "ระแนงไวนิลคุณภาพ ทนทาน ราคาเหมาะสม",
    features: ["ทนสภาพอากาศ", "ไม่ซีก", "ไม่ลอก", "หลากสี", "ราคาดี"],
    pros: ["ราคาเหมาะสม", "ทนทาน", "สีสวย", "ไม่ต้องบำรุง"],
    considerations: ["อาจซีกถ้าแดดจัด", "การติดตั้งต้องระวัง"],
    colors: ["ขาว", "ครีม", "เทา", "น้ำตาล", "แดง"],
    pricePerSqm: { S: 2600, M: 2600, L: 2600, XL: 2600 },
    images: ["/herosection/04.jpg", "/herosection/05.jpg", "/herosection/01.jpg"],
    specifications: {
      "หนา": "10 มม.",
      "น้ำหนัก": "4 กก./ตร.ม.",
      "ขนาดระแนง": "100 มม.",
      "ทนสภาพอากาศ": "ดี",
      "อายุการใช้งาน": "15+ ปี"
    }
  }
];
