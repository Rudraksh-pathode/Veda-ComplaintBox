
'use client';

import { useState, useCallback } from 'react';
import { ComplaintForm } from '@/components/complaint-form';
import type { Complaint } from '@/lib/types';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Reviews } from '@/components/reviews';

// Sample initial complaints with names
const initialComplaints: Complaint[] = [
  {
    id: 'user-1-a',
    name: 'Anonymous',
    text: 'The Wi-Fi in the library is incredibly fast and reliable. It is a joy to study and complete assignments here.',
    category: 'Infrastructure',
    summary: 'Great Wi-Fi in library',
    timestamp: new Date('2024-05-20T10:00:00Z'),
  },
  {
    id: 'user-2-b',
    name: 'Anonymous',
    text: 'A professor was consistently engaging and made the lectures very interesting, which greatly helped my learning.',
    category: 'Academics',
    summary: 'Engaging and punctual professor',
    timestamp: new Date('2024-05-21T14:30:00Z'),
  },
  {
    id: 'user-3-c',
    name: 'Anonymous',
    text: "I received a lot of support from senior students near the hostel, which made me feel very welcome.",
    category: 'Harassment',
    summary: 'Supportive seniors',
    timestamp: new Date('2024-05-22T09:00:00Z'),
  },
];


export default function Home() {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);

  const handleComplaintSubmitted = useCallback((newComplaint: Complaint) => {
    const complaintWithId = {
      ...newComplaint,
      id: crypto.randomUUID(),
    };
    setComplaints((prevComplaints) => [complaintWithId, ...prevComplaints]);
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
        <section id="reviews">
            <Reviews complaints={complaints} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
