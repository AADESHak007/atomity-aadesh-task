import { getClusters, getNameSpaces, getPods } from "@/services/api"
import { useQuery } from "@tanstack/react-query"
import {Initial_data} from '@/data' ;

export const useDashboardData = (level: 'clusters' | 'namespaces' | 'pods', clusterId?: string | null, nsId?: string | null) => {
    return useQuery({
        queryKey: ['dashboard', level, clusterId, nsId],
        queryFn: async () => {
            if (level === 'clusters') {
                return await getClusters();
            }
            if (level === 'namespaces' && clusterId) {
                const data = await getNameSpaces(clusterId);
                return data.namespaces; // Extract the array for the chart
            }
            if (level === 'pods' && clusterId && nsId) {
                const data = await getPods(clusterId, nsId);
                return data.pods; // Extract the array for the chart
            }
            return [];
        },
        placeholderData : level === 'clusters' ? Initial_data : undefined,
        enabled: level === 'clusters' || (level === 'namespaces' && !!clusterId) || (level === 'pods' && !!clusterId && !!nsId),
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    })
}