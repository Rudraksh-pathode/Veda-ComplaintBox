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
    {
    id: '4',
    name: 'Anonymous',
    text: "The new coffee machine is great, but the product quality is not consistent.",
    category: 'Product',
    summary: 'Inconsistent coffee quality',
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
       <header className="flex justify-between items-center">
        <div className="text-left">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2 text-lg">Welcome, {user.email}</p>
        </div>
        <Button variant="outline" onClick={logout}>Logout</Button>
      </header>
      <Dashboard complaints={complaints} />
    </div>
  );
}
