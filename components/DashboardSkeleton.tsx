'use client';

/** Reusable shimmer block */
const Shimmer = ({ className = '', style }: { className?: string; style?: React.CSSProperties }) => (
  <div
    className={`relative overflow-hidden bg-white/[0.04] rounded-2xl ${className}`}
    style={style}
  >
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
  </div>
);

/** KPI Card skeleton */
const KPICardSkeleton = () => (
  <div className="rounded-[24px] lg:rounded-[32px] p-4 lg:p-8 flex flex-col justify-between h-full w-full border border-borderPrimary bg-[#0a0d17]/80 backdrop-blur-xl">
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-2">
        <Shimmer className="h-2.5 w-20 rounded-full" />
        <Shimmer className="h-2 w-14 rounded-full" />
      </div>
      <Shimmer className="h-9 w-9 rounded-xl" />
    </div>
    <Shimmer className="h-8 w-28 rounded-xl mt-4" />
  </div>
);

/** Table row skeleton */
const TableRowSkeleton = () => (
  <tr className="border-b border-white/[0.03]">
    <td className="py-5 pl-4"><Shimmer className="h-3 w-24 rounded-full" /></td>
    {[...Array(5)].map((_, i) => (
      <td key={i} className="py-5 text-center">
        <div className="flex justify-center">
          <Shimmer className="h-3 w-14 rounded-full" />
        </div>
      </td>
    ))}
    <td className="py-5 text-center">
      <div className="flex justify-center">
        <Shimmer className="h-3 w-10 rounded-full" />
      </div>
    </td>
    <td className="py-5 pr-4 text-right">
      <div className="flex justify-end">
        <Shimmer className="h-3 w-16 rounded-full" />
      </div>
    </td>
  </tr>
);

export const DashboardSkeleton = () => {
  return (
    <>
      {/* ── DESKTOP SKELETON (xl 1280px+) ── */}
      <main className="hidden xl:flex w-full h-screen bg-[#0a0a0a] select-none p-2 gap-2 box-border relative font-sans overflow-hidden">
        {/* Sidebar skeleton */}
        <aside className="w-[22%] min-w-[280px] h-full bg-[#0a0a0a] flex flex-col border-r border-borderPrimary px-4 py-8 gap-10">
          {/* Logo */}
          <div className="px-2 flex items-center gap-4">
            <Shimmer className="w-12 h-12 rounded-2xl" />
            <Shimmer className="h-6 w-28 rounded-xl" />
          </div>
          {/* Nav groups */}
          <div className="flex flex-col gap-8">
            {[...Array(2)].map((_, g) => (
              <div key={g} className="flex flex-col gap-3">
                <Shimmer className="h-2.5 w-16 rounded-full ml-4" />
                {[...Array(3)].map((_, i) => (
                  <Shimmer key={i} className="h-10 w-full rounded-2xl" />
                ))}
              </div>
            ))}
          </div>
          {/* Footer */}
          <div className="mt-auto flex flex-col gap-3">
            <Shimmer className="h-14 w-full rounded-2xl" />
            <Shimmer className="h-9 w-full rounded-xl" />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 h-full flex flex-col gap-6 p-4">
          {/* Upper: Chart + KPIs */}
          <section className="w-full h-[52%] flex gap-6 shrink-0">
            <div className="flex-1 h-full border border-borderPrimary rounded-[32px] bg-[#0a0d17]/80 backdrop-blur-xl p-8 flex flex-col gap-4">
              {/* Chart header */}
              <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <Shimmer className="h-3.5 w-36 rounded-full" />
                  <Shimmer className="h-2.5 w-20 rounded-full" />
                </div>
                <Shimmer className="h-3 w-28 rounded-full" />
              </div>
              {/* Bar chart bars */}
              <div className="flex-1 flex items-end gap-8 px-8 pb-4">
                {[80, 55, 40, 22].map((h, i) => (
                  <Shimmer key={i} className="flex-1 rounded-xl" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
            {/* KPI 2x2 */}
            <div className="w-[35%] h-full grid grid-cols-2 grid-rows-2 gap-4">
              {[...Array(4)].map((_, i) => <KPICardSkeleton key={i} />)}
            </div>
          </section>

          {/* Lower: Table */}
          <section className="flex-1 min-h-0 border border-borderPrimary rounded-[32px] bg-[#0a0d17]/80 backdrop-blur-xl p-8 overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-borderPrimary">
                  {['Resource Name', 'Compute', 'Memory', 'Storage', 'Network', 'Graphics', 'Efficiency', 'Total Cost'].map((_, i) => (
                    <th key={i} className="pb-6 text-center first:text-left first:pl-4 last:text-right last:pr-4">
                      <div className={`flex ${i === 0 ? 'justify-start' : i === 7 ? 'justify-end' : 'justify-center'}`}>
                        <Shimmer className="h-2 w-14 rounded-full" />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(4)].map((_, i) => <TableRowSkeleton key={i} />)}
              </tbody>
            </table>
          </section>
        </div>
      </main>

      {/* ── MOBILE / TABLET SKELETON (< 1280px) ── */}
      <div className="xl:hidden flex flex-col bg-[#0a0a0a] font-sans">
        {/* Top nav bar */}
        <div className="w-full bg-[#0a0d17]/80 backdrop-blur-xl border-b border-borderPrimary p-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <Shimmer className="w-10 h-10 rounded-xl" />
            <Shimmer className="h-5 w-24 rounded-lg" />
          </div>
          <Shimmer className="w-10 h-10 rounded-xl" />
        </div>

        <div className="flex flex-col gap-4 p-3 md:p-5 pb-10">
          {/* Chart */}
          <div className="w-full h-[320px] md:h-[400px] border border-borderPrimary rounded-[24px] md:rounded-[32px] bg-[#0a0d17]/80 backdrop-blur-xl p-4 md:p-6 flex flex-col gap-4">
            <div className="flex justify-between">
              <Shimmer className="h-3.5 w-32 rounded-full" />
              <Shimmer className="h-3 w-24 rounded-full" />
            </div>
            <div className="flex-1 flex items-end gap-4 pb-4">
              {[75, 50, 35, 20].map((h, i) => (
                <Shimmer key={i} className="flex-1 rounded-xl" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          {/* KPI 2×2 */}
          <section className="w-full grid grid-cols-2 gap-3 md:gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[150px] md:h-[170px]">
                <KPICardSkeleton />
              </div>
            ))}
          </section>

          {/* Table */}
          <div className="w-full border border-borderPrimary rounded-[24px] md:rounded-[32px] bg-[#0a0d17]/80 backdrop-blur-xl p-4 md:p-6 overflow-x-auto">
            <table className="w-full min-w-[640px] text-xs">
              <thead>
                <tr className="border-b border-borderPrimary">
                  {[...Array(8)].map((_, i) => (
                    <th key={i} className="pb-6 text-center first:text-left first:pl-4 last:text-right last:pr-4">
                      <div className={`flex ${i === 0 ? 'justify-start' : i === 7 ? 'justify-end' : 'justify-center'}`}>
                        <Shimmer className="h-2 w-12 rounded-full" />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(4)].map((_, i) => <TableRowSkeleton key={i} />)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
