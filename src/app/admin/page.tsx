
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Dashboard } from '@/components/dashboard';
import type { Complaint } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { summarizeComplaintsAction } from '@/app/actions';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Sparkles } from 'lucide-react';


// Sample initial complaints with names for admin view
const initialComplaints: Complaint[] = [
  {
    id: 'admin-1-d',
    name: 'Rudraksh',
    text: 'The Wi-Fi in the library is exceptionally fast and reliable, making it a great place to study and complete assignments.',
    category: 'Infrastructure',
    summary: 'Excellent Wi-Fi in library',
    timestamp: new Date('2024-05-20T10:00:00Z'),
  },
  {
    id: 'admin-2-e',
    name: 'Neha',
    text: 'Professor Sharma is always punctual and uses the full class time effectively, which has greatly enhanced my learning experience.',
    category: 'Academics',
    summary: 'Professor punctuality is commendable',
    timestamp: new Date('2024-05-21T14:30:00Z'),
  },
  {
    id: 'admin-3-f',
    name: 'Uvaish',
    text: "The senior students are very welcoming and have created a friendly environment in the hostel. They are always ready to help.",
    category: 'Harassment',
    summary: 'Seniors are very supportive',
    timestamp: new Date('2024-05-22T09:00:00Z'),
  },
    {
    id: 'admin-4-g',
    name: 'Anonymous',
    text: "The new curriculum for the computer science department is well-structured and covers all the key topics needed for the industry.",
    category: 'Academics',
    summary: 'Well-structured CS curriculum',
    timestamp: new Date('2024-05-23T11:00:00Z'),
  },
];


export default function AdminPage() {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [isSummaryDialogOpen, setIsSummaryDialogOpen] = useState(false);
  const [summary, setSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    const result = await summarizeComplaintsAction(complaints);
    if (result.data) {
      setSummary(result.data);
      setIsSummaryDialogOpen(true);
    } else {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
    }
    setIsGenerating(false);
  };

  if (loading || !user) {
    return (
        <div className="flex h-screen items-center justify-center">
            <p>Loading...</p>
        </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
       <header className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-left">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2 text-lg">Welcome, {user.email}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleGenerateSummary} disabled={isGenerating}>
            <Sparkles className="mr-2 h-4 w-4" />
            {isGenerating ? 'Generating...' : 'Generate AI Summary'}
          </Button>
          <Button variant="outline" onClick={logout}>Logout</Button>
        </div>
      </header>
      <Dashboard complaints={complaints} />
      <AlertDialog open={isSummaryDialogOpen} onOpenChange={setIsSummaryDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>AI-Generated Complaint Summary</AlertDialogTitle>
            <AlertDialogDescription className="text-left whitespace-pre-wrap">
              {summary}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
