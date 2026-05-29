const faqs = [
  {
    question: "ราคานี้เป็นราคาจริงเลยไหม?",
    answer: "เป็นราคาประเมินเบื้องต้นจากข้อมูลวัสดุและบริการที่เลือก ราคาสุดท้ายต้องตรวจรายละเอียดหน้างานก่อนยืนยัน",
  },
  {
    question: "ต้องตรวจหน้างานก่อนหรือไม่?",
    answer: "ควรตรวจหน้างานก่อนทุกครั้ง เพื่อดูโครงสร้างเดิม ระยะติดตั้ง พื้นที่ทำงาน และรายละเอียดที่อาจมีผลต่อราคา",
  },
  {
    question: "งานไร้เสาทำได้ทุกบ้านไหม?",
    answer: "ไม่เสมอไป งานไร้เสาต้องดูความแข็งแรงของโครงสร้างเดิมและรูปแบบการยึดก่อน",
  },
  {
    question: "ถ้าไม่รู้ขนาดพื้นที่ต้องทำยังไง?",
    answer: "กรอกขนาดประมาณการก่อน หรือส่งรูปหน้างานให้ทีมงานช่วยประเมินเบื้องต้นได้",
  },
  {
    question: "ทำไมงานฝ้าเลือกได้เฉพาะ L+?",
    answer: "ระบบเดิมกำหนดให้งานฝ้าเป็นตัวเลือกสำหรับไซซ์ L+ เท่านั้น เพื่อให้สอดคล้องกับโครงสร้างราคา",
  },
  {
    question: "ขอใบเสนอราคาก่อนได้ไหม?",
    answer: "ได้ สามารถส่งผลประเมินพร้อมข้อมูลติดต่อ ทีมงานจะติดต่อกลับเพื่อทำใบเสนอราคาแบบละเอียด",
  },
];

export function EstimateFAQ() {
  return (
    <section className="mx-auto max-w-4xl px-4 pb-24 pt-4 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#314874]">FAQ</p>
        <h2 className="mt-2 text-3xl font-black text-[#1E2E4F]">คำถามที่พบบ่อย</h2>
      </div>
      <div className="space-y-3">
        {faqs.map((faq) => (
          <details key={faq.question} className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <summary className="cursor-pointer list-none text-base font-black text-slate-950">
              <span className="flex items-center justify-between gap-4">
                {faq.question}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#eaf4ff] text-[#314874] transition group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
