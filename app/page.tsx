"use client"
import { useDashboardData } from "@/hooks/useClusters";
import { DashboardProvider, useDashboard } from "../context/DashboardContext";
import { Charts } from "../components/Charts";
import { DetailedInfo } from "../components/DetailedInfo";
import { SideBar } from "../components/SideBar";
import { KPICard } from "../components/KPICard";
import { MobileNav } from "../components/MobileNav";
import { DashboardSkeleton } from "../components/DashboardSkeleton";
import { motion } from "framer-motion";

// ── Animation timing constants ───────────────────────────────────────────────
const SIDEBAR_DUR     = 1.0;
const CHART_DELAY     = 0.5;
const CHART_DUR       = 1.2;
// KPIs & Table fire at 70% through the chart animation
const SECONDARY_DELAY = CHART_DELAY + CHART_DUR * 0.7; // ≈ 1.34s

const ease = [0.25, 0.46, 0.45, 0.94] as const; // smooth ease-out cubic

export default function Home() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}

function DashboardContent() {
  const { level, clusterId, nsId } = useDashboard();
  const { data: dashboardData, isLoading, isError } = useDashboardData(level, clusterId, nsId);

  if (isLoading) return <DashboardSkeleton />;

  if (isError) return (
    <div className="w-screen h-screen bg-black flex items-center justify-center text-red-500 font-bold text-2xl">
      ERROR FETCHING DATA.
    </div>
  );

  const currentData = dashboardData || [];
  const totalCPU  = currentData.reduce((acc: number, curr: any) => acc + (curr.cpu   || 0), 0);
  const totalRAM  = currentData.reduce((acc: number, curr: any) => acc + (curr.ram   || 0), 0);
  const totalGPU  = currentData.reduce((acc: number, curr: any) => acc + (curr.gpu   || 0), 0);
  const totalAll  = currentData.reduce((acc: number, curr: any) => acc + (curr.total || 0), 0);

  return (
    <>
      {/* ── DESKTOP LAYOUT (xl 1280px+) — with entrance animations ── */}
      <main className="hidden xl:flex w-full h-screen bg-[#0a0a0a] select-none p-2 gap-2 box-border relative font-sans overflow-hidden">
        {/* Atmospheric Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accentPrimary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-accentPrimary/5 rounded-full blur-[100px] pointer-events-none" />

        {/* ① Sidebar — slides in from the left */}
        <motion.div
          className="h-full"
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0,   opacity: 1 }}
          transition={{ duration: SIDEBAR_DUR, ease }}
        >
          <SideBar />
        </motion.div>

        <div className="mainDashboard flex-1 h-full flex flex-col box-border gap-6 p-4 relative z-10 overflow-hidden">

          {/* Upper Half: Chart & KPIs */}
          <section className="upperHalf w-full h-[52%] flex justify-between items-center gap-6 box-border shrink-0">

            {/* ② Chart — scales + fades in */}
            <motion.div
              className="flex-1 h-full bg-bgPrimary/80 backdrop-blur-xl border border-borderPrimary rounded-[32px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden group"
            initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0,  opacity: 1 }}
              transition={{ delay: CHART_DELAY, duration: CHART_DUR, ease }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accentPrimary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Charts data={currentData} />
            </motion.div>

            {/* ③ KPI Cards — slide from left at 70% of chart animation */}
            <motion.div
              className="KPI w-[35%] h-full grid grid-cols-2 grid-rows-2 gap-4"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0,   opacity: 1 }}
              transition={{ delay: SECONDARY_DELAY, duration: 0.9, ease }}
            >
              <KPICard title="Compute"  metricKey="cpu"   totalValue={totalCPU}  />
              <KPICard title="Memory"   metricKey="ram"   totalValue={totalRAM}  />
              <KPICard title="Graphics" metricKey="gpu"   totalValue={totalGPU}  />
              <KPICard title="Workload" metricKey="total" totalValue={totalAll}  />
            </motion.div>
          </section>

          {/* ④ Table — drops from top at same moment as KPI cards */}
          <motion.section
            className="lowerHalf flex-1 w-full min-h-0 box-border bg-bgPrimary/80 backdrop-blur-xl border border-borderPrimary rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-8 flex flex-col justify-center overflow-hidden"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0,   opacity: 1 }}
            transition={{ delay: SECONDARY_DELAY, duration: 1.0, ease }}
          >
            <DetailedInfo data={currentData} />
          </motion.section>
        </div>
      </main>

      {/* ── MOBILE / TABLET LAYOUT (< 1280px) — natural scroll, stacked ── */}
      <div className="xl:hidden flex flex-col bg-[#0a0a0a] font-sans relative">
        {/* Atmospheric Glows */}
        <div className="fixed top-0 left-0 w-[60%] h-[30%] bg-accentPrimary/5 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="fixed bottom-0 right-0 w-[40%] h-[20%] bg-accentPrimary/5 rounded-full blur-[80px] pointer-events-none z-0" />

        {/* Sticky Top Nav */}
        <MobileNav />

        {/* Page Content — natural document flow */}
        <div className="flex flex-col gap-4 p-3 md:p-5 pb-10 relative z-10">

          {/* Chart */}
          <motion.section
            className="w-full h-[320px] md:h-[400px] bg-bgPrimary/80 backdrop-blur-xl border border-borderPrimary rounded-[24px] md:rounded-[32px] p-4 md:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0,  opacity: 1 }}
            transition={{ delay: 0.15, duration: 1.0, ease }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accentPrimary/20 to-transparent" />
            <Charts data={currentData} />
          </motion.section>

          {/* KPI Cards */}
          <motion.section
            className="w-full grid grid-cols-2 gap-3 md:gap-4"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0,   opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.85, ease }}
          >
            <div className="h-[150px] md:h-[170px]"><KPICard title="Compute"  metricKey="cpu"   totalValue={totalCPU}  /></div>
            <div className="h-[150px] md:h-[170px]"><KPICard title="Memory"   metricKey="ram"   totalValue={totalRAM}  /></div>
            <div className="h-[150px] md:h-[170px]"><KPICard title="Graphics" metricKey="gpu"   totalValue={totalGPU}  /></div>
            <div className="h-[150px] md:h-[170px]"><KPICard title="Workload" metricKey="total" totalValue={totalAll}  /></div>
          </motion.section>

          {/* Data Table */}
          <motion.section
            className="w-full bg-bgPrimary/80 backdrop-blur-xl border border-borderPrimary rounded-[24px] md:rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-4 md:p-6"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0,   opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.9, ease }}
          >
            <div className="overflow-x-auto">
              <DetailedInfo data={currentData} />
            </div>
          </motion.section>

        </div>
      </div>
    </>
  );
}
