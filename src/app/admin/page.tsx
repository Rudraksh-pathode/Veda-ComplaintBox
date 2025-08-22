
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Dashboard } from '@/components/dashboard';
import type { Complaint } from '@/lib/types';
import { Button } from '@/components/ui/button';


// Sample initial complaints with names for admin view
const initialComplaints: Complaint[] = [
  {
    id: '1',
    name: 'Rudraksh',
    text: 'The Wi-Fi in the library is very slow and unreliable. It is difficult to study and complete assignments.',
    category: 'Infrastructure',
    summary: 'Poor Wi-Fi in library',
    timestamp: new Date('2024-05-20T10:00:00Z'),
  },
  {
    id: '2',
    name: 'Neha',
    text: 'A professor was consistently late to lectures and ended classes early, which affected my learning.',
    category: 'Academics',
    summary: 'Professor punctuality issues',
    timestamp: new Date('2024-05-21T14:30:00Z'),
  },
  {
    id: '3',
    name: 'Uvaish',
    text: "I was subjected to verbal harassment by a group of senior students near the hostel.",
    category: 'Harassment',
    summary: 'Verbal harassment by seniors',
    timestamp: new Date('2024-05-22T09:00:00Z'),
  },
    {
    id: '4',
    name: 'Anonymous',
    text: "The new curriculum for the computer science department is not well-structured and misses key topics.",
    category: 'Academics',
    summary: 'Poorly structured CS curriculum',
    timestamp: new Date('2024-05-23T11:00:00Z'),
  },
];


export default function AdminPage() {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);

  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);


  if (loading || !user) {
    return (
        <div className="flex h-screen items-center justify-center">
            <p>Loading...</p>
        </div>
    );
  }
  
  // In a real app, you would fetch complaints from a database.
  // We'll use local state for this example.
  // We are also assuming that if a user is logged in, they are an admin.
  // In a real app, you would have role-based access control.
  
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
       <header className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-left">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2 text-lg">Welcome, {user.email}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={logout}>Logout</Button>
        </div>
      </header>
      <Dashboard complaints={complaints} />
    </div>
  );
}
