const steps = ["ประเภท", "สินค้า", "ไซซ์", "ขนาด", "ติดตั้ง", "ของเสริม"];

export function StepProgress({
  activeStep,
  maxStep,
  onSelectStep,
}: {
  activeStep: number;
  maxStep: number;
  onSelectStep: (step: number) => void;
}) {
  return (
    <div className="sticky top-16 z-20 -mx-4 border-y border-sky-100 bg-white/95 px-4 py-2 backdrop-blur sm:top-20 sm:mx-0 sm:rounded-2xl sm:border sm:px-4">
      <div className="flex gap-1.5 overflow-x-auto">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isDone = index < maxStep;
          const isReachable = index <= maxStep;
          return (
            <button
              type="button"
              key={step}
              disabled={!isReachable}
              onClick={() => onSelectStep(index)}
              className={`flex min-w-max items-center gap-2 rounded-full px-3 py-2 text-xs font-black transition ${
                isActive
                  ? "bg-[#1E2E4F] text-white shadow-sm"
                  : isDone
                    ? "bg-[#eaf4ff] text-[#1E2E4F]"
                    : "bg-slate-100 text-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
              }`}
            >
              <span
                className={`grid h-6 w-6 place-items-center rounded-full text-[11px] ${
                  isActive
                    ? "bg-white text-[#1E2E4F]"
                    : isDone
                      ? "bg-[#314874] text-white"
                      : "bg-white text-slate-400"
                }`}
              >
                {index + 1}
              </span>
              {step}
            </button>
          );
        })}
      </div>
    </div>
  );
}
