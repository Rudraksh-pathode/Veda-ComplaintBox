'use client';

import { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import type { Complaint } from '@/lib/types';
import { CategoryIcon } from '@/components/icons';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


export function Reviews({ complaints }: { complaints: Complaint[] }) {
  const staffComplaints = useMemo(() => {
    return complaints.filter(c => c.category === 'Staff');
  }, [complaints]);


  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Reviews about Staff</CardTitle>
        <CardDescription>See what others are saying about our staff.</CardDescription>
      </CardHeader>
      <CardContent>
        {staffComplaints.length > 0 ? (
          <ScrollArea className="h-[500px] pr-4">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {staffComplaints.map((c) => (
                <AccordionItem value={c.id} key={c.id} className="border-b-0">
                  <Card className="shadow-md transition-shadow hover:shadow-lg bg-card">
                    <AccordionTrigger className="p-4 text-left hover:no-underline rounded-lg">
                      <div className="flex items-start gap-4 w-full">
                         <Avatar>
                          <AvatarImage src={`https://placehold.co/40x40.png`} />
                          <AvatarFallback>{c.name?.charAt(0) ?? 'A'}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-left">
                          <p className="font-semibold text-base text-card-foreground">{c.name}</p>
                          <p className="font-medium text-sm text-card-foreground mt-1">{c.summary}</p>
                          <div className="flex items-center gap-2 mt-2">
                             <Badge variant="secondary">{c.category}</Badge>
                             <p className="text-xs text-muted-foreground">
                               {new Date(c.timestamp).toLocaleDateString()}
                             </p>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-0">
                      <p className="text-muted-foreground pl-14">{c.text}</p>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        ) : (
          <Card className="flex flex-col items-center justify-center p-12 border-dashed">
            <p className="text-muted-foreground">No complaints about staff have been submitted yet.</p>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
