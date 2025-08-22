'use client';

import { useState } from 'react';
import { ComplaintForm } from '@/components/complaint-form';
import { Dashboard } from '@/components/dashboard';
import type { Complaint } from '@/lib/types';

export default function Home() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  const handleComplaintSubmitted = (newComplaint: Complaint) => {
    setComplaints((prevComplaints) => [newComplaint, ...prevComplaints]);
  };

  return (
    <main className="container mx-auto p-4 md:p-8 space-y-8">
      <header className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">VentVerse</h1>
        <p className="text-muted-foreground mt-2 text-lg">Your Voice, Heard Anonymously.</p>
      </header>
      <ComplaintForm onComplaintSubmitted={handleComplaintSubmitted} />
      <Dashboard complaints={complaints} />
    </main>
  );
}
