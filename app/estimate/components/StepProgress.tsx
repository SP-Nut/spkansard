const steps = ["ประเภท", "สินค้า", "ไซซ์", "ขนาด", "ติดตั้ง", "ของเสริม"];

export function StepProgress({ currentStep }: { currentStep: number }) {
  return (
    <div className="sticky top-16 z-20 -mx-4 border-y border-sky-100 bg-white/95 px-4 py-3 backdrop-blur sm:top-20 sm:mx-0 sm:rounded-3xl sm:border sm:px-5">
      <div className="flex gap-2 overflow-x-auto">
        {steps.map((step, index) => {
          const active = index <= currentStep;
          return (
            <div
              key={step}
              className={`flex min-w-max items-center gap-2 rounded-full px-3 py-2 text-xs font-black transition ${
                active ? "bg-[#e7f7ff] text-[#30318B]" : "bg-slate-100 text-slate-500"
              }`}
            >
              <span
                className={`grid h-6 w-6 place-items-center rounded-full text-[11px] ${
                  active ? "bg-[#00A2EA] text-white" : "bg-white text-slate-400"
                }`}
              >
                {index + 1}
              </span>
              {step}
            </div>
          );
        })}
      </div>
    </div>
  );
}
