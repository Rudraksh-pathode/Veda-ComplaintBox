'use client';

import { useEffect, useRef, useState, useActionState, use } from 'react';
import { useFormStatus } from 'react-dom';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { submitComplaintAction } from '@/app/actions';
import type { Complaint, ComplaintCategory } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Hourglass } from 'lucide-react';

const categories: ComplaintCategory[] = ["Infrastructure", "Harassment", "Academics", "Ragging", "Other"];

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending || disabled} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
      {pending ? 'Submitting...' : 'Submit Anonymously'}
    </Button>
  );
}

interface ComplaintFormProps {
  onComplaintSubmitted: (complaint: Complaint) => void;
}

const COOLDOWN_HOURS = 24;

export function ComplaintForm({ onComplaintSubmitted }: ComplaintFormProps) {
  const [state, formAction] = useActionState(submitComplaintAction, { error: null, data: null });
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [category, setCategory] = useState<ComplaintCategory | ''>('');
  const [cooldownTime, setCooldownTime] = useState(0);

  useEffect(() => {
    const lastSubmission = localStorage.getItem('lastComplaintTimestamp');
    if (lastSubmission) {
      const remainingTime = new Date(lastSubmission).getTime() + COOLDOWN_HOURS * 60 * 60 * 1000 - Date.now();
      if (remainingTime > 0) {
        setCooldownTime(remainingTime);
      }
    }
  }, []);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldownTime > 0) {
      timer = setInterval(() => {
        setCooldownTime(prev => prev - 1000);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldownTime]);

  useEffect(() => {
    if (state?.data) {
      toast({
        title: 'Success!',
        description: 'Your complaint has been submitted.',
      });
      onComplaintSubmitted(state.data);
      formRef.current?.reset();
      setCategory('');
      const submissionTime = new Date().toISOString();
      localStorage.setItem('lastComplaintTimestamp', submissionTime);
      setCooldownTime(COOLDOWN_HOURS * 60 * 60 * 1000);
    } else if (state?.error) {
      toast({
        title: 'Error',
        description: state.error,
        variant: 'destructive',
      });
    }
  }, [state, onComplaintSubmitted, toast]);

  const isFormDisabled = cooldownTime > 0;
  const hoursLeft = Math.floor(cooldownTime / (1000 * 60 * 60));
  const minutesLeft = Math.floor((cooldownTime % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Submit a Complaint</CardTitle>
        <CardDescription>Your feedback is anonymous and helps us improve.</CardDescription>
      </CardHeader>
      <CardContent>
        {isFormDisabled ? (
          <Alert>
            <Hourglass className="h-4 w-4" />
            <AlertTitle>Spam Protection Enabled</AlertTitle>
            <AlertDescription>
              You have recently submitted a complaint. Please wait approximately {hoursLeft}h {minutesLeft}m before submitting another one.
            </AlertDescription>
          </Alert>
        ) : (
          <form ref={formRef} action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" required value={category} onValueChange={(value) => setCategory(value as ComplaintCategory)} disabled={isFormDisabled}>
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
                disabled={isFormDisabled}
              />
              {state?.errors?.complaintText && (
                <p className="text-sm text-destructive">{state.errors.complaintText[0]}</p>
              )}
            </div>
            <SubmitButton disabled={isFormDisabled} />
          </form>
        )}
      </CardContent>
    </Card>
  );
}
