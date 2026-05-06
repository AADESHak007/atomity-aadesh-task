"use client"
import { useDashboardData } from "@/hooks/useClusters";
import { DashboardProvider, useDashboard } from "../context/DashboardContext";
import { Charts } from "../components/Charts";
import { DetailedInfo } from "../components/DetailedInfo";
import { SideBar } from "../components/SideBar";
import { KPICard } from "../components/KPICard";
import { ArrowLeft, Loader2 } from "lucide-react";

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

  if (isLoading) return (
    <div className="w-screen h-screen bg-black flex items-center justify-center text-accentPrimary font-bold text-2xl animate-pulse">
      LOADING...
    </div>
  );

  if (isError) return (
    <div className="w-screen h-screen bg-black flex items-center justify-center text-red-500 font-bold text-2xl">
      ERROR FETCHING DATA.
    </div>
  );

  const currentData = dashboardData || [];
  const totalCPU = currentData.reduce((acc: number, curr: any) => acc + (curr.cpu || 0), 0);
  const totalRAM = currentData.reduce((acc: number, curr: any) => acc + (curr.ram || 0), 0);
  const totalGPU = currentData.reduce((acc: number, curr: any) => acc + (curr.gpu || 0), 0);
  const totalAll = currentData.reduce((acc: number, curr: any) => acc + (curr.total || 0), 0);

  return (
    <main className="w-full h-screen flex bg-[#0a0a0a] overflow-hidden select-none p-2 gap-2 box-border relative font-sans">
      {/* Atmospheric Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accentPrimary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-accentPrimary/5 rounded-full blur-[100px] pointer-events-none" />

      <SideBar />

      <div className="mainDashboard flex-1 h-full flex flex-col overflow-hidden box-border gap-6 p-4 relative z-10">

        <section className='upperHalf w-full h-[52%] flex justify-between items-center overflow-hidden gap-6 box-border'>
          {/* Chart Single Box */}
          <div className="flex-1 h-full bg-bgPrimary/80 backdrop-blur-xl border border-borderPrimary rounded-[32px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accentPrimary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Charts data={currentData} />
          </div>

          <div className='KPI w-[35%] h-full grid grid-cols-2 grid-rows-2 gap-4'>
            <KPICard title="Compute" metricKey="cpu" totalValue={totalCPU} />
            <KPICard title="Memory" metricKey="ram" totalValue={totalRAM} />
            <KPICard title="Graphics" metricKey="gpu" totalValue={totalGPU} />
            <KPICard title="Workload" metricKey="total" totalValue={totalAll} />
          </div>
        </section>

        {/* Detailed Info Single Box */}
        <section className="lowerHalf flex-1 w-full min-h-0 box-border bg-bgPrimary/80 backdrop-blur-xl border border-borderPrimary rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-8 flex flex-col justify-center">
          <DetailedInfo data={currentData} />
        </section>
      </div>
    </main>
  );
}
