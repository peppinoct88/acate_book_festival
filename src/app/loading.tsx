/** Stato di caricamento durante la navigazione: uno scheletro nella forma delle pagine interne. */
export default function Loading() {
  return (
    <div className="container-festival animate-pulse pt-16 pb-24" aria-busy="true" aria-live="polite">
      <span className="visually-hidden">Caricamento…</span>
      <div className="h-3 w-40 rounded-full bg-ink/10" />
      <div className="mt-8 h-14 w-[min(32rem,90%)] rounded-2xl bg-ink/10" />
      <div className="mt-4 h-14 w-[min(22rem,70%)] rounded-2xl bg-ink/[0.07]" />
      <div className="mt-10 space-y-3">
        <div className="h-4 w-[min(40rem,95%)] rounded-full bg-ink/[0.07]" />
        <div className="h-4 w-[min(36rem,90%)] rounded-full bg-ink/[0.07]" />
        <div className="h-4 w-[min(30rem,80%)] rounded-full bg-ink/[0.07]" />
      </div>
    </div>
  );
}
