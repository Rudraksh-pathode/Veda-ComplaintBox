
'use client';

import { useState, useRef } from 'react';
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
import type { ShoutOut } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Heart } from 'lucide-react';

interface ShoutOutFormProps {
  onShoutOutSubmitted: (shoutOut: ShoutOut) => void;
}

function ShoutOutForm({ onShoutOutSubmitted }: ShoutOutFormProps) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to || !message) {
      toast({
        title: 'Error',
        description: 'Please fill out all fields.',
        variant: 'destructive',
      });
      return;
    }
    const newShoutOut: ShoutOut = {
      id: crypto.randomUUID(),
      from,
      to,
      message,
      timestamp: new Date(),
    };
    onShoutOutSubmitted(newShoutOut);
    toast({
      title: 'Success!',
      description: 'Your shout-out has been submitted.',
    });
    formRef.current?.reset();
    setFrom('');
    setTo('');
    setMessage('');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg mt-8">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Give a Shout-out!</CardTitle>
        <CardDescription>Recognize a fellow community member.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fromName">Your Name</Label>
              <Input
                id="fromName"
                name="fromName"
                placeholder="Your Name"
                required
                className="bg-white"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="toName">Their Name</Label>
              <Input
                id="toName"
                name="toName"
                placeholder="Their Name"
                required
                className="bg-white"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="shoutOutMessage">Message</Label>
            <Textarea
              id="shoutOutMessage"
              name="shoutOutMessage"
              placeholder="Write a positive message..."
              rows={4}
              required
              className="bg-white"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            Submit Shout-out
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}


interface ShoutOutsProps {
  shoutOuts: ShoutOut[];
  onShoutOutSubmitted: (shoutOut: ShoutOut) => void;
}

export function ShoutOuts({ shoutOuts, onShoutOutSubmitted }: ShoutOutsProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Community Shout-outs</CardTitle>
        <CardDescription>See what positive things people are saying about each other.</CardDescription>
      </CardHeader>
      <CardContent>
        {shoutOuts.length > 0 ? (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {shoutOuts.map((so) => (
                <Card key={so.id} className="shadow-md bg-card p-4">
                   <div className="flex items-start gap-4 w-full">
                     <Avatar>
                        <AvatarImage src={`https://placehold.co/40x40.png`} />
                        <AvatarFallback>{so.from.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-base text-card-foreground">
                          {so.from} <span className="font-normal text-muted-foreground">to</span> {so.to}
                        </p>
                        <p className="text-sm text-card-foreground mt-1 flex items-center gap-2">
                          <Heart className="h-4 w-4 text-red-500" /> <em>"{so.message}"</em>
                        </p>
                         <p className="text-xs text-muted-foreground mt-2">
                            {new Date(so.timestamp).toLocaleDateString()}
                         </p>
                      </div>
                    </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <Card className="flex flex-col items-center justify-center p-12 border-dashed">
            <p className="text-muted-foreground">Be the first to give a shout-out!</p>
          </Card>
        )}
         <ShoutOutForm onShoutOutSubmitted={onShoutOutSubmitted} />
      </CardContent>
    </Card>
  );
}
