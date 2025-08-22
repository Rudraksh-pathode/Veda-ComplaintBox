'use client';

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


export function Reviews({ complaints }: { complaints: Complaint[] }) {

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Reviews</CardTitle>
        <CardDescription>See what others are saying.</CardDescription>
      </CardHeader>
      <CardContent>
        {complaints.length > 0 ? (
          <ScrollArea className="h-[500px] pr-4">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {complaints.map((c) => (
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
            <p className="text-muted-foreground">No complaints submitted yet. Be the first!</p>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
