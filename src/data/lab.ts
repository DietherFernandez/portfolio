export interface LabItem {
  id: string;
  title: string;
  category: string;
  description: string;
  status: 'EXPERIMENT' | 'PROTOTYPE' | 'EXPLORING' | 'PAUSED';
  technologies: string[];
  date?: string;
  link?: string;
}

export const labItems: LabItem[] = [
  {
    id: 'desktop-control',
    title: 'Desktop Control',
    category: 'System Interaction',
    description: 'Exploring how web applications can communicate with desktop clients via local APIs and sockets.',
    status: 'PROTOTYPE',
    technologies: ['Node.js', 'WebSockets', 'Electron'],
    date: '2024',
  },
  {
    id: 'remote-pc-control',
    title: 'Remote PC Control',
    category: 'Systems Engineering',
    description: 'Exploring remote monitoring and interaction for rental computers and workstations.',
    status: 'EXPLORING',
    technologies: ['React', 'Rust', 'gRPC'],
    date: '2024',
  },
  {
    id: 'ui-system-experiments',
    title: 'UI System Experiments',
    category: 'Interface Design',
    description: 'Testing different approaches to practical desktop/web interfaces focusing on utility and density.',
    status: 'EXPERIMENT',
    technologies: ['Tailwind CSS', 'Next.js', 'Framer Motion'],
    date: '2024',
  },
];
