export function FloatingBg() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full bg-[#c9a96a]/[0.04] blur-[140px] animate-float-slow" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-[#c98a85]/[0.03] blur-[150px] animate-float-slow" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-0 left-1/3 w-[420px] h-[420px] rounded-full bg-[#c9a96a]/[0.03] blur-[130px] animate-float-slow" style={{ animationDelay: "4s" }} />
    </div>
  );
}

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/8801700000000"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-24 lg:bottom-6 right-4 lg:right-6 z-50 w-13 h-13 w-12 h-12 rounded-full grid place-items-center bg-[#25D366] shadow-lg shadow-black/40 hover:scale-105 transition"
      aria-label="WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor"><path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.46 0 .11 5.35.11 11.93c0 2.1.55 4.16 1.6 5.97L0 24l6.27-1.65a11.93 11.93 0 0 0 5.77 1.47h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.18-3.46-8.41ZM12.05 21.5h-.01a9.5 9.5 0 0 1-4.84-1.33l-.35-.21-3.72.98 1-3.63-.23-.37a9.49 9.49 0 0 1-1.46-5.05c0-5.25 4.27-9.52 9.52-9.52 2.54 0 4.93.99 6.73 2.79a9.46 9.46 0 0 1 2.79 6.73c-.01 5.25-4.28 9.52-9.43 9.52Zm5.51-7.13c-.3-.15-1.78-.88-2.06-.98s-.48-.15-.68.15-.78.98-.96 1.18-.35.22-.65.07c-.3-.15-1.27-.47-2.42-1.5-.89-.79-1.5-1.77-1.67-2.07s-.02-.46.13-.6c.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.64-.93-2.24-.25-.59-.5-.51-.68-.52h-.58c-.2 0-.52.07-.79.37s-1.03 1-1.03 2.44 1.05 2.84 1.2 3.04c.15.2 2.07 3.17 5.02 4.45.7.3 1.25.48 1.68.61.7.22 1.34.19 1.84.12.56-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35Z"/></svg>
    </a>
  );
}
