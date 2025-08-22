'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ComplaintForm } from '@/components/complaint-form';
import { Reviews } from '@/components/reviews';
import type { Complaint } from '@/lib/types';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  const handleComplaintSubmitted = (newComplaint: Complaint) => {
    setComplaints((prevComplaints) => [newComplaint, ...prevComplaints]);
  };

  return (
    <main className="container mx-auto p-4 md:p-8 space-y-8">
      <header className="flex justify-between items-center">
        <div className="text-left">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">VentVerse</h1>
          <p className="text-muted-foreground mt-2 text-lg">Your Voice, Heard Anonymously.</p>
        </div>
        <Link href="/login" passHref>
          <Button variant="outline">Admin Login</Button>
        </Link>
      </header>
      <ComplaintForm onComplaintSubmitted={handleComplaintSubmitted} />
      <Reviews complaints={complaints} />
    </main>
  );
}
