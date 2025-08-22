'use client';

import { useState, useMemo, startTransition } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { Search } from 'lucide-react';
import type { Complaint, ComplaintCategory } from '@/lib/types';
import { CategoryIcon } from '@/components/icons';
import { ScrollArea } from '@/components/ui/scroll-area';

const categories: ComplaintCategory[] = ["Service", "Product", "Staff", "Environment", "Other"];

export function Dashboard({ complaints }: { complaints: Complaint[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ComplaintCategory | 'all'>('all');

  const filteredComplaints = useMemo(() => {
    return complaints
      .filter((c) =>
        selectedCategory === 'all' ? true : c.category === selectedCategory
      )
      .filter((c) =>
        c.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [complaints, searchTerm, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts = complaints.reduce((acc, complaint) => {
      acc[complaint.category] = (acc[complaint.category] || 0) + 1;
      return acc;
    }, {} as Partial<Record<ComplaintCategory, number>>);

    return categories.map(name => ({ name, count: counts[name] || 0 }));
  }, [complaints]);

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Complaint Dashboard</CardTitle>
          <CardDescription>Review and analyze submitted feedback.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search complaints..."
                className="pl-10 bg-white"
                value={searchTerm}
                onChange={(e) => startTransition(() => setSearchTerm(e.target.value))}
              />
            </div>
            <Select
              onValueChange={(value: ComplaintCategory | 'all') => setSelectedCategory(value)}
              defaultValue="all"
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={categoryCounts} margin={{ top: 20, right: 0, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  contentStyle={{
                    background: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                   <LabelList dataKey="count" position="top" className="fill-foreground" fontSize={12} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h3 className="font-headline text-xl">Recent Complaints ({filteredComplaints.length})</h3>
        {filteredComplaints.length > 0 ? (
          <ScrollArea className="h-[500px] pr-4">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {filteredComplaints.map((c) => (
                <AccordionItem value={c.id} key={c.id} className="border-b-0">
                  <Card className="shadow-md transition-shadow hover:shadow-lg bg-card">
                    <AccordionTrigger className="p-4 text-left hover:no-underline rounded-lg">
                      <div className="flex items-center gap-4 w-full">
                        <div className="p-3 bg-primary/10 rounded-full">
                           <CategoryIcon category={c.category} className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-medium text-base text-card-foreground">{c.summary}</p>
                          <div className="flex items-center gap-2 mt-1">
                             <Badge variant="secondary">{c.category}</Badge>
                             <p className="text-xs text-muted-foreground">
                               {new Date(c.timestamp).toLocaleDateString()}
                             </p>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <p className="text-muted-foreground">{c.text}</p>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        ) : (
          <Card className="flex flex-col items-center justify-center p-12 border-dashed">
            <p className="text-muted-foreground">{complaints.length === 0 ? "No complaints submitted yet. Be the first!" : "No complaints match your filters."}</p>
          </Card>
        )}
      </div>
    </div>
  );
}
