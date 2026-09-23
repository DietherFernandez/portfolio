export interface Project {
  slug: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  status: 'ACTIVE DEVELOPMENT' | 'COMPLETED' | 'PROTOTYPE' | 'WEBSITE';
  technologies: string[];
  features: string[];
  screenshots: string[];
  links?: {
    live?: string;
    repo?: string;
    docs?: string;
  };
}

export const projects: Project[] = [
  {
    slug: 'netdesk',
    name: 'NetDesk',
    category: 'PC Rental Management System',
    description: 'A browser and Windows-based PC rental management system designed for computer shops.',
    longDescription: 'NetDesk is a comprehensive management solution for PC rental businesses. It features a dual-architecture consisting of a main control dashboard for administrators to manage sessions, monitor PC status, and track payments, and a lightweight Windows PC agent that runs on rental machines to handle session locking and timing.',
    status: 'ACTIVE DEVELOPMENT',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'React', 'Electron'],
    features: [
      'Centralized PC management dashboard',
      'Rental session timing and automation',
      'Windows PC agent for session control',
      'Real-time PC status monitoring',
      'Payment and financial record tracking',
      'Session history and analytics'
    ],
    screenshots: [],
    links: {
      live: 'https://netdesk-phi.vercel.app/',
    }
  },
  {
    slug: 'brgy-connect',
    name: 'Brgy Connect',
    category: 'Barangay Service Platform',
    description: 'A web platform for barangay services where residents can access services and submit requests.',
    longDescription: 'Brgy Connect streamlines the administrative processes of a barangay. It provides a portal for residents to request documents and services, and a robust administrative backend for staff to manage requests, templates, and resident information.',
    status: 'COMPLETED',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    features: [
      'Resident account and profile management',
      'Multi-role access (Resident, Staff, Admin)',
      'Digital service request submission',
      'Dynamic document template generation',
      'Administrative request processing workflow',
      'Resident database management'
    ],
    screenshots: [],
    links: {}
  },
  {
    slug: 'diether-grain-system',
    name: 'Diether Grain System',
    category: 'Rice Dealer Business Website',
    description: 'A website concept and system for a local rice dealer business.',
    longDescription: 'A professional digital presence for a local rice dealer, focusing on business information, product cataloging, and content management to improve customer reach and visibility.',
    status: 'WEBSITE',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    features: [
      'Business information showcase',
      'Product catalog display',
      'Editable content system',
      'Responsive business landing page'
    ],
    screenshots: [],
    links: {}
  },
  {
    slug: 'ebet',
    name: 'Ebet',
    category: 'Small Eatery Website',
    description: 'A simple website concept for a small eatery focused on lutong ulam.',
    longDescription: 'A minimalist digital menu and information site for a small eatery, designed to present business hours, location, and food offerings clearly to potential customers.',
    status: 'WEBSITE',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    features: [
      'Digital menu presentation',
      'Business information showcase',
      'Contact and location details',
      'Responsive mobile-first design'
    ],
    screenshots: [],
    links: {}
  }
];
