/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'espresso' | 'filter' | 'signature' | 'pastry';
  tags: string[];
  badge?: string;
  isPopular?: boolean;
}

export interface CoffeeQuizAnswers {
  tasteNote: string;
  roastPreference: string;
  bodyType: string;
}

export interface RecommendationResult {
  id: string;
  beanName: string;
  origin: string;
  description: string;
  tasteNotes: string[];
  roastLevel: 'Light' | 'Medium' | 'Dark' | 'Medium-Light';
  recommendedMethod: string;
  brewRatio: string;
  brewTemp: string;
  grindSize: string;
}

export interface TableReservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  tableType: 'window' | 'bar' | 'lounge' | 'patio';
  specialRequests?: string;
  createdAt: string;
}
