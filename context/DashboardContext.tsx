import { createContext, useContext, useState } from "react";


type Level = "clusters" | "namespaces" | "pods";

interface DashboardState {
    level: Level;
    clusterId: string | null;
    nsId: string | null;
    hoveredData: any | null;
}

interface DashboardContextType extends DashboardState {
    drillDown: (id: string) => void;
    goBack: () => void;
    setHoveredData: (data: any | null) => void;
    reset: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<DashboardState>({
        level: 'clusters',
        clusterId: null,
        nsId: null,
        hoveredData: null
    });

    const drillDown = (id: string) => {
        setState(prev => {
            if (prev.level === 'clusters') return { ...prev, level: 'namespaces', clusterId: id, hoveredData: null };
            if (prev.level === 'namespaces') return { ...prev, level: 'pods', nsId: id, hoveredData: null };
            return prev;
        });
    };

    const goBack = () => {
        setState(prev => {
            if (prev.level === 'pods') return { ...prev, level: 'namespaces', nsId: null };
            if (prev.level === 'namespaces') return { ...prev, level: 'clusters', clusterId: null };
            return prev;
        });
    };

    const setHoveredData = (data: any | null) => setState(prev => ({ ...prev, hoveredData: data }));
    const reset = () => setState({ level: 'clusters', clusterId: null, nsId: null, hoveredData: null });


    return (
    <DashboardContext.Provider value={{ ...state, drillDown, goBack, setHoveredData, reset }}>
      {children}
    </DashboardContext.Provider>
  );

}

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) throw new Error('useDashboard must be used within a DashboardProvider');
  return context;
};