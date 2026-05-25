import AsyncStorage from '@react-native-async-storage/async-storage';
import { z } from 'zod';

const PurchaseSchema = z.object({
  purchased: z.boolean(),
  plan: z.enum(['monthly', 'yearly']).nullable(),
  purchasedAt: z.string().nullable(),
});

export type Purchase = z.infer<typeof PurchaseSchema>;

const STORAGE_KEY = 'user_purchase';

export async function getPurchase(): Promise<Purchase> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return { purchased: false, plan: null, purchasedAt: null };
    const parsed = JSON.parse(raw);
    return PurchaseSchema.parse(parsed);
  } catch {
    return { purchased: false, plan: null, purchasedAt: null };
  }
}

export async function savePurchase(plan: 'monthly' | 'yearly'): Promise<Purchase> {
  const purchase: Purchase = {
    purchased: true,
    plan,
    purchasedAt: new Date().toISOString(),
  };
  PurchaseSchema.parse(purchase);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(purchase));
  return purchase;
}
