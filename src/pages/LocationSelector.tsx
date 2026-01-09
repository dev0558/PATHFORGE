/**
 * Location Selector Page Component
 *
 * Allows users to select their location for localized career insights.
 */

import type { Location } from '../types';
import { getAllLocations } from '../data';
import styles from './LocationSelector.module.css';

interface LocationSelectorProps {
  onSelect: (location: Location) => void;
  onBack: () => void;
}

export function LocationSelector({ onSelect, onBack }: LocationSelectorProps) {
  const locations = getAllLocations();

  return (
    <div className={styles.locationSelector}>
      {/* Header */}
      <header className={styles.header}>
        <button className="btn btn-ghost" onClick={onBack}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>
      </header>

      {/* Content */}
      <main className={styles.content}>
        <div className={styles.heroSection}>
          <div className={styles.icon}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M2 12H22"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <h1 className={styles.title}>Select Your Location</h1>
          <p className={styles.subtitle}>
            We'll customize salary ranges, job market insights, and top
            employers based on your region.
          </p>
        </div>

        {/* Location Grid */}
        <div className={styles.locationGrid}>
          {locations.map((location, index) => (
            <button
              key={location.id}
              className={styles.locationCard}
              onClick={() => onSelect(location)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className={styles.flag}>{location.flag}</span>
              <span className={styles.name}>{location.name}</span>
              <span className={styles.currency}>{location.currency}</span>
              <svg
                className={styles.arrow}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>

        {/* Skip option */}
        <div className={styles.skipSection}>
          <button
            className="btn btn-ghost"
            onClick={() =>
              onSelect({
                id: 'usa',
                name: 'United States',
                flag: '🇺🇸',
                currency: 'USD',
                currencySymbol: '$',
              })
            }
          >
            Skip - Use US as default
          </button>
        </div>
      </main>
    </div>
  );
}
