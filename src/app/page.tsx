
'use client';

import { useState, useCallback } from 'react';
import { ComplaintForm } from '@/components/complaint-form';
import { Reviews } from '@/components/reviews';
import type { Complaint, ShoutOut } from '@/lib/types';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ShoutOuts } from '@/components/shout-outs';

// Sample initial complaints with names
const initialComplaints: Complaint[] = [
  {
    id: 'user-1-a',
    name: 'Anonymous',
    text: 'The Wi-Fi in the library is very slow and unreliable. It is difficult to study and complete assignments.',
    category: 'Infrastructure',
    summary: 'Poor Wi-Fi in library',
    timestamp: new Date('2024-05-20T10:00:00Z'),
  },
  {
    id: 'user-2-b',
    name: 'Anonymous',
    text: 'A professor was consistently late to lectures and ended classes early, which affected my learning.',
    category: 'Academics',
    summary: 'Professor punctuality issues',
    timestamp: new Date('2024-05-21T14:30:00Z'),
  },
  {
    id: 'user-3-c',
    name: 'Anonymous',
    text: "I was subjected to verbal harassment by a group of senior students near the hostel.",
    category: 'Harassment',
    summary: 'Verbal harassment by seniors',
    timestamp: new Date('2024-05-22T09:00:00Z'),
  },
];

const initialShoutOuts: ShoutOut[] = [
    {
    id: '1',
    from: 'Rudraksh',
    to: 'Neha',
    message: 'Thanks for helping me with the project, you are a lifesaver!',
    timestamp: new Date('2024-05-24T10:00:00Z'),
  },
  {
    id: '2',
    from: 'Neha',
    to: 'Uvaish',
    message: 'Great presentation today! You really nailed it.',
    timestamp: new Date('2024-05-24T11:30:00Z'),
  },
  {
    id: '3',
    from: 'Uvaish',
    to: 'Rudraksh',
    message: 'I appreciate you staying late to help finish the report. Thanks!',
    timestamp: new Date('2024-05-24T12:00:00Z'),
  },
];


export default function Home() {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [shoutOuts, setShoutOuts] = useState<ShoutOut[]>(initialShoutOuts);

  const handleComplaintSubmitted = useCallback((newComplaint: Complaint) => {
    const complaintWithId = {
      ...newComplaint,
      id: crypto.randomUUID(),
    };
    setComplaints((prevComplaints) => [complaintWithId, ...prevComplaints]);
  }, []);
  
  const handleShoutOutSubmitted = useCallback((newShoutOut: ShoutOut) => {
    setShoutOuts((prevShoutOuts) => [newShoutOut, ...prevShoutOuts]);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 space-y-12">
        <section id="home" className="pt-20 -mt-20">
          <div className="mt-20">
             <ComplaintForm onComplaintSubmitted={handleComplaintSubmitted} />
          </div>
        </section>
         <section id="shout-outs" className="pt-20 -mt-20">
          <ShoutOuts shoutOuts={shoutOuts} onShoutOutSubmitted={handleShoutOutSubmitted} />
        </section>
        <section id="reviews" className="pt-20 -mt-20">
          <Reviews complaints={complaints} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
