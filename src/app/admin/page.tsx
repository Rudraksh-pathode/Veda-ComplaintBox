'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Dashboard } from '@/components/dashboard';
import type { Complaint } from '@/lib/types';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
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
