import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-complaint.ts';
import '@/ai/flows/suggest-solutions.ts';
import '@/ai/flows/categorize-complaint.ts';