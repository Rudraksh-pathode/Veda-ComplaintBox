'use client';

import { useState } from 'react';
import { ComplaintForm } from '@/components/complaint-form';
import { Reviews } from '@/components/reviews';
import type { Complaint } from '@/lib/types';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function Home() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  const handleComplaintSubmitted = (newComplaint: Complaint) => {
    setComplaints((prevComplaints) => [newComplaint, ...prevComplaints]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 space-y-12">
        <section id="home" className="pt-20 -mt-20">
          <ComplaintForm onComplaintSubmitted={handleComplaintSubmitted} />
        </section>
        <section id="reviews" className="pt-20 -mt-20">
          <Reviews complaints={complaints} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
