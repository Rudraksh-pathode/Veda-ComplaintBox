'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { submitComplaintAction } from '@/app/actions';
import type { Complaint, ComplaintCategory } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const categories: ComplaintCategory[] = ["Infrastructure", "Harassment", "Academics", "Ragging", "Other"];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
      {pending ? 'Submitting...' : 'Submit Anonymously'}
    </Button>
  );
}

interface ComplaintFormProps {
  onComplaintSubmitted: (complaint: Complaint) => void;
}

export function ComplaintForm({ onComplaintSubmitted }: ComplaintFormProps) {
  const [state, formAction] = useFormState(submitComplaintAction, null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [category, setCategory] = useState<ComplaintCategory | ''>('');


  useEffect(() => {
    if (state?.data) {
      toast({
        title: 'Success!',
        description: 'Your complaint has been submitted.',
      });
      onComplaintSubmitted(state.data);
      formRef.current?.reset();
      setCategory('');
    } else if (state?.error) {
      toast({
        title: 'Error',
        description: state.error,
        variant: 'destructive',
      });
    }
  }, [state, onComplaintSubmitted, toast]);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Submit a Complaint</CardTitle>
        <CardDescription>Your feedback is anonymous and helps us improve.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
           <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select name="category" required value={category} onValueChange={(value) => setCategory(value as ComplaintCategory)}>
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
             {state?.errors?.category && (
              <p className="text-sm text-destructive">{state.errors.category[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="complaintText">Your Complaint or Comment</Label>
            <Textarea
              id="complaintText"
              name="complaintText"
              placeholder="Please describe your issue in detail..."
              rows={6}
              required
              className="bg-white"
            />
            {state?.errors?.complaintText && (
              <p className="text-sm text-destructive">{state.errors.complaintText[0]}</p>
            )}
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
