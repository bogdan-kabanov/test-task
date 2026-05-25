import { z } from 'zod';

export const SubscriptionPlanSchema = z.enum(['monthly', 'yearly']);
export type SubscriptionPlan = z.infer<typeof SubscriptionPlanSchema>;

export interface SubscriptionCard {
  id: string;
  plan: SubscriptionPlan;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  discount?: string;
}
