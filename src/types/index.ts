export interface Hospital {
  id: string;
  name: string;
  location: string;
  distance: string;
  rating: number;
  services: string[];
  timings: string;
  address: string;
  image?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  reviews: number;
  bio: string;
  education: string;
  languages: string[];
  image?: string;
}

export interface Article {
  id: string;
  category: string;
  title: string;
  author: string;
  readTime: string;
  content: string;
  image?: string;
}

export interface Reminder {
  id: string;
  type: string;
  task: string;
  time: string;
  status: string;
  urgency: string;
  notes: string;
}

export interface MedicalRecord {
  id: string;
  title: string;
  pet: string;
  date: string;
  type: string;
  size: string;
  doctorNotes: string;
}

export interface Appointment {
  id: string;
  type: string;
  status: string;
  doctor: string;
  pet: string;
  date: string;
  time: string;
  reason: string;
  joinLink?: string;
  clinicAddress?: string;
  image?: string;
}
