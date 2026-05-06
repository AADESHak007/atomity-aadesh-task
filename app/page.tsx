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
    <main className="w-full h-screen flex bg-black overflow-hidden select-none p-2 gap-2 box-border">
      <SideBar />

      <div className="mainDashboard flex-1 h-full flex flex-col overflow-hidden box-border gap-4 p-2">
        
        <section className='upperHalf w-full h-[58%] flex justify-between items-center overflow-hidden gap-4 box-border'>
          {/* Chart Single Box */}
          <div className="flex-1 h-full bg-bgPrimary border border-borderPrimary rounded-[32px] p-6 shadow-xl">
            <Charts data={currentData} />
          </div>

          <div className='KPI w-[35%] h-full grid grid-cols-2 grid-rows-2 gap-4'>
            <KPICard title="CPU Usage" metricKey="cpu" totalValue={totalCPU} />
            <KPICard title="RAM Usage" metricKey="ram" totalValue={totalRAM} />
            <KPICard title="GPU Usage" metricKey="gpu" totalValue={totalGPU} />
            <KPICard title="Total Resources" metricKey="total" totalValue={totalAll} />
          </div>
        </section>

        {/* Detailed Info Single Box */}
        <section className="lowerHalf flex-1 w-full min-h-0 box-border overflow-hidden bg-bgPrimary border border-borderPrimary rounded-[32px] shadow-xl p-4">
          <div className="w-full h-full overflow-y-auto no-scrollbar">
            <DetailedInfo data={currentData} />
          </div>
        </section>
      </div>
    </main>
  );
}
