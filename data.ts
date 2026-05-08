//@ts-ignore
const generatePods = (prefix, baseValue) => [
  { id: `${prefix}-p1`, name: "Pod A", cpu: Math.floor(baseValue * 0.7), ram: Math.floor(baseValue * 0.4), storage: Math.floor(baseValue * 0.1), network: Math.floor(baseValue * 0.1), gpu: 0, efficiency: 15, total: Math.floor(baseValue * 1.3) },
  { id: `${prefix}-p2`, name: "Pod B", cpu: Math.floor(baseValue * 0.2), ram: Math.floor(baseValue * 0.1), storage: Math.floor(baseValue * 0.05), network: Math.floor(baseValue * 0.05), gpu: 0, efficiency: 45, total: Math.floor(baseValue * 0.4) },
  { id: `${prefix}-p3`, name: "Pod C", cpu: Math.floor(baseValue * 0.07), ram: Math.floor(baseValue * 0.05), storage: Math.floor(baseValue * 0.01), network: Math.floor(baseValue * 0.01), gpu: 0, efficiency: 35, total: Math.floor(baseValue * 0.15) },
  { id: `${prefix}-p4`, name: "Pod D", cpu: Math.floor(baseValue * 0.03), ram: Math.floor(baseValue * 0.02), storage: Math.floor(baseValue * 0.01), network: Math.floor(baseValue * 0.01), gpu: 0, efficiency: 70, total: Math.floor(baseValue * 0.07) },
];
//@ts-ignore
const generateNamespaces = (clusterPrefix, clusterTotal) => [
  {
    id: `${clusterPrefix}-ns1`,
    name: "Namespace A",
    cpu: Math.floor(clusterTotal * 0.5),
    ram: Math.floor(clusterTotal * 0.28),
    storage: Math.floor(clusterTotal * 0.05),
    network: Math.floor(clusterTotal * 0.06),
    gpu: Math.floor(clusterTotal * 0.16),
    efficiency: 5,
    total: Math.floor(clusterTotal * 1.4),
    pods: generatePods(`${clusterPrefix}-ns1`, Math.floor(clusterTotal * 0.5))
  },
  {
    id: `${clusterPrefix}-ns2`,
    name: "Namespace B",
    cpu: Math.floor(clusterTotal * 0.3),
    ram: Math.floor(clusterTotal * 0.17),
    storage: Math.floor(clusterTotal * 0.03),
    network: Math.floor(clusterTotal * 0.04),
    gpu: Math.floor(clusterTotal * 0.1),
    efficiency: 20,
    total: Math.floor(clusterTotal * 0.8),
    pods: generatePods(`${clusterPrefix}-ns2`, Math.floor(clusterTotal * 0.3))
  },
  {
    id: `${clusterPrefix}-ns3`,
    name: "Namespace C",
    cpu: Math.floor(clusterTotal * 0.15),
    ram: Math.floor(clusterTotal * 0.08),
    storage: Math.floor(clusterTotal * 0.015),
    network: Math.floor(clusterTotal * 0.02),
    gpu: Math.floor(clusterTotal * 0.05),
    efficiency: 50,
    total: Math.floor(clusterTotal * 0.4),
    pods: generatePods(`${clusterPrefix}-ns3`, Math.floor(clusterTotal * 0.15))
  },
  {
    id: `${clusterPrefix}-ns4`,
    name: "Namespace D",
    cpu: Math.floor(clusterTotal * 0.05),
    ram: Math.floor(clusterTotal * 0.03),
    storage: Math.floor(clusterTotal * 0.005),
    network: Math.floor(clusterTotal * 0.006),
    gpu: Math.floor(clusterTotal * 0.016),
    efficiency: 40,
    total: Math.floor(clusterTotal * 0.14),
    pods: generatePods(`${clusterPrefix}-ns4`, Math.floor(clusterTotal * 0.05))
  },
];

export const Initial_data = [
  {
    id: "cluster-a",
    name: "Cluster A",
    cpu: 2463,
    ram: 1368,
    storage: 246,
    network: 307,
    gpu: 821,
    efficiency: 10,
    total: 6867,
    namespaces: generateNamespaces("ca", 2463)
  },
  {
    id: "cluster-b",
    name: "Cluster B",
    cpu: 2127,
    ram: 1181,
    storage: 212,
    network: 265,
    gpu: 0,
    efficiency: 28,
    total: 5574,
    namespaces: generateNamespaces("cb", 2127)
  },
  {
    id: "cluster-c",
    name: "Cluster C",
    cpu: 1733,
    ram: 962,
    storage: 173,
    network: 216,
    gpu: 577,
    efficiency: 15,
    total: 4664,
    namespaces: generateNamespaces("cc", 1733)
  },
  {
    id: "cluster-d",
    name: "Cluster D",
    cpu: 1171,
    ram: 651,
    storage: 116,
    network: 146,
    gpu: 0,
    efficiency: 48,
    total: 2447,
    namespaces: generateNamespaces("cd", 1171)
  },
];