export default function HudPanel({ title, children, className = "" }) {
  return (
    <section
      className={`hud-border flex flex-col rounded-sm bg-black/60 backdrop-blur-sm ${className}`}
    >
      <header className="border-b border-jarvis-teal/20 px-3 py-2">
        <h2 className="font-hud text-[10px] font-semibold uppercase tracking-[0.25em] text-jarvis-teal/90">
          {title}
        </h2>
      </header>
      <div className="flex-1 overflow-hidden p-3">{children}</div>
    </section>
  );
}
