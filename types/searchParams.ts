import { z } from 'zod';
import { searchSchema } from '@/app/utils/zod';

// this type appeared frequently enough that I decided to make this a separate type.
// for z.infer<typeof formSchema>, its cousin, I decided to not make it a type.
export type SearchParams = z.infer<typeof searchSchema>;