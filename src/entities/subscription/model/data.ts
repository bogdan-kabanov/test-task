import { SubscriptionCard } from './types';

export const subscriptions: SubscriptionCard[] = [
  {
    id: 'monthly',
    plan: 'monthly',
    title: '1 месяц',
    description: 'Подписка на музыку',
    price: '$10',
  },
  {
    id: 'yearly',
    plan: 'yearly',
    title: '1 год',
    description: 'Подписка на музыку',
    price: '$60',
    originalPrice: '$120',
    discount: '50%',
  },
];
