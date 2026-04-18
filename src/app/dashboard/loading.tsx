export default function DashboardLoading() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-primary/10 border-t-primary rounded-full animate-spin" />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/20">
          Syncing Grid
        </span>
      </div>
    </div>
  );
}
