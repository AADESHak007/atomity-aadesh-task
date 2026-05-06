import axios from 'axios'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000",
    headers: {
        "Content-Type": "application/json",
    }
})

export const getClusters = async () => {
    try {
        const response = await api.get('/clusters')
        return response.data;
    } catch (error) {
        console.error("Fetch clusters error:", error);
        throw error;
    }
}

export const getNameSpaces = async (clusterId: string) => {
    try {
        const response = await api.get(`/clusters/${clusterId}`)
        return response.data;
    } catch (error) {
        console.error("Fetch namespaces error:", error);
        throw error;
    }
}

export const getPods = async (clusterId: string, nsId: string) => {
    try {
        const response = await api.get(`/clusters/${clusterId}/namespaces/${nsId}`)
        return response.data
    } catch (error) {
        console.error("Fetch pods error:", error);
        throw error;
    }
}