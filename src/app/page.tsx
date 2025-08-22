'use client';

import { useState } from 'react';
import { ComplaintForm } from '@/components/complaint-form';
import { Reviews } from '@/components/reviews';
import type { Complaint } from '@/lib/types';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

// Sample initial complaints with names
const initialComplaints: Complaint[] = [
  {
    id: '1',
    name: 'Rudraksh',
    text: 'The service at the front desk was very slow. I had to wait for 20 minutes just to get a simple question answered.',
    category: 'Staff',
    summary: 'Slow service at the front desk',
    timestamp: new Date('2024-05-20T10:00:00Z'),
  },
  {
    id: '2',
    name: 'Neha',
    text: 'A staff member was rude to me when I asked for directions. This is not the kind of behavior I expect.',
    category: 'Staff',
    summary: 'Rude staff member',
    timestamp: new Date('2024-05-21T14:30:00Z'),
  },
  {
    id: '3',
    name: 'Uvaish',
    text: "I witnessed a staff member being extremely helpful to an elderly person, which was great to see. We need more people like them.",
    category: 'Staff',
    summary: 'Helpful staff member',
    timestamp: new Date('2024-05-22T09:00:00Z'),
  },
];


export default function Home() {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);

  const handleComplaintSubmitted = (newComplaint: Complaint) => {
    setComplaints((prevComplaints) => [newComplaint, ...prevComplaints]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 space-y-12">
        <section id="home" className="pt-20 -mt-20">
          <div className="mt-20">
             <ComplaintForm onComplaintSubmitted={handleComplaintSubmitted} />
          </div>
        </section>
        <section id="reviews" className="pt-20 -mt-20">
          <Reviews complaints={complaints} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
