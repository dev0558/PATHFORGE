/**
 * Locations Data
 *
 * This file contains all supported locations for PathForge.
 * Each location includes currency info and display properties.
 */

import type { Location } from '../types';

export const LOCATIONS: Location[] = [
  {
    id: 'uae',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    currency: 'AED',
    currencySymbol: 'د.إ',
  },
  {
    id: 'usa',
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    currencySymbol: '£',
  },
  {
    id: 'india',
    name: 'India',
    flag: '🇮🇳',
    currency: 'INR',
    currencySymbol: '₹',
  },
  {
    id: 'singapore',
    name: 'Singapore',
    flag: '🇸🇬',
    currency: 'SGD',
    currencySymbol: 'S$',
  },
  {
    id: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    currency: 'AUD',
    currencySymbol: 'A$',
  },
  {
    id: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    currency: 'CAD',
    currencySymbol: 'C$',
  },
  {
    id: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    currency: 'EUR',
    currencySymbol: '€',
  },
  {
    id: 'saudi-arabia',
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    currency: 'SAR',
    currencySymbol: '﷼',
  },
];

/**
 * Get a location by its ID
 */
export function getLocationById(locationId: string): Location | undefined {
  return LOCATIONS.find((loc) => loc.id === locationId);
}

/**
 * Get all available locations
 */
export function getAllLocations(): Location[] {
  return LOCATIONS;
}
