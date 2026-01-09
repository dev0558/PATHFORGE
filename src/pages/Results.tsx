/**
 * Results Page Component
 *
 * Displays the quiz results including:
 * - Primary and secondary role matches
 * - Location-specific insights (salary, demand, employers)
 * - Role details (overview, skills, tools, certifications)
 * - 90-day roadmap
 */

import { useState, useEffect } from 'react';
import type { QuizResult, Location, LocationInsights } from '../types';
import { Roadmap } from '../components/Roadmap';
import { getLocationInsights, isGeminiConfigured } from '../services/gemini';
import styles from './Results.module.css';

interface ResultsProps {
  result: QuizResult;
  location: Location;
  onReset: () => void;
}

export function Results({ result, location, onReset }: ResultsProps) {
  const [activeTab, setActiveTab] = useState<'primary' | 'secondary'>('primary');
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [locationInsights, setLocationInsights] = useState<LocationInsights | null>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(true);

  const activeRole =
    activeTab === 'primary' ? result.primaryRole : result.secondaryRole;

  // Calculate match percentage (simplified)
  const primaryScore = result.scores.find(
    (s) => s.roleId === result.primaryRole.id
  );
  const matchPercentage = primaryScore
    ? Math.min(Math.round((primaryScore.score / 18) * 100), 95)
    : 85;

  // Fetch location insights when role or location changes
  useEffect(() => {
    async function fetchInsights() {
      setIsLoadingInsights(true);
      const insights = await getLocationInsights(activeRole, location);
      setLocationInsights(insights);
      setIsLoadingInsights(false);
    }
    fetchInsights();
  }, [activeRole, location]);

  if (showRoadmap) {
    return (
      <Roadmap
        role={activeRole}
        onBack={() => setShowRoadmap(false)}
        onReset={onReset}
      />
    );
  }

  return (
    <div className={styles.results}>
      {/* Header */}
      <header className={styles.header}>
        <button className="btn btn-ghost" onClick={onReset}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.54302 3 5.53521 5.00972 4 8M4 8V3M4 8H9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Start Over
        </button>
        {/* Location Badge */}
        <div className={styles.locationBadge}>
          <span className={styles.locationFlag}>{location.flag}</span>
          <span className={styles.locationName}>{location.name}</span>
        </div>
      </header>

      {/* Results Content */}
      <main className={styles.content}>
        {/* Congratulations Section */}
        <section className={styles.heroSection}>
          <div className={styles.badge}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Your results are ready
          </div>
          <h1 className={styles.heroTitle}>Your Best-Fit Career Path</h1>
          <p className={styles.heroSubtitle}>
            Based on your responses, we've identified the roles that align best
            with your interests and skills in <strong>{location.name}</strong>.
          </p>
        </section>

        {/* Role Toggle */}
        <div className={styles.roleToggle}>
          <button
            className={`${styles.toggleButton} ${
              activeTab === 'primary' ? styles.active : ''
            }`}
            onClick={() => setActiveTab('primary')}
          >
            <span className={styles.toggleLabel}>Best Match</span>
            <span className={styles.toggleRole}>
              {result.primaryRole.title}
            </span>
          </button>
          <button
            className={`${styles.toggleButton} ${
              activeTab === 'secondary' ? styles.active : ''
            }`}
            onClick={() => setActiveTab('secondary')}
          >
            <span className={styles.toggleLabel}>Also Consider</span>
            <span className={styles.toggleRole}>
              {result.secondaryRole.title}
            </span>
          </button>
        </div>

        {/* Role Details Card */}
        <div className={styles.roleCard} key={activeRole.id}>
          {/* Role Header */}
          <div className={styles.roleHeader}>
            <div className={styles.roleInfo}>
              <h2 className={styles.roleTitle}>{activeRole.title}</h2>
              <p className={styles.roleShortDesc}>
                {activeRole.shortDescription}
              </p>
            </div>
            <div className={styles.matchBadge}>
              <span className={styles.matchPercent}>
                {activeTab === 'primary' ? matchPercentage : matchPercentage - 12}%
              </span>
              <span className={styles.matchLabel}>match</span>
            </div>
          </div>

          {/* Location-Specific Stats */}
          <div className={styles.roleStats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>
                Salary in {location.name}
              </span>
              <span className={styles.statValue}>
                {isLoadingInsights ? (
                  <span className={styles.loading}>Loading...</span>
                ) : (
                  locationInsights?.salaryRange || activeRole.salaryRange
                )}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>
                Demand in {location.name}
              </span>
              <span
                className={`${styles.statValue} ${
                  styles[locationInsights?.demandLevel || activeRole.demandLevel]
                }`}
              >
                {isLoadingInsights ? (
                  <span className={styles.loading}>Loading...</span>
                ) : (
                  <>
                    {locationInsights?.demandLevel === 'high'
                      ? 'High Demand'
                      : locationInsights?.demandLevel === 'growing'
                      ? 'Growing'
                      : locationInsights?.demandLevel === 'low'
                      ? 'Low'
                      : 'Moderate'}
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Top Employers in Region */}
          {locationInsights && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                Top Employers in {location.name}
              </h3>
              <div className={styles.employerList}>
                {locationInsights.topEmployers.map((employer, index) => (
                  <span key={index} className={styles.employerTag}>
                    {employer}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Job Market Trends */}
          {locationInsights && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                Job Market Trends
              </h3>
              <p className={styles.marketTrends}>
                {locationInsights.jobMarketTrends}
              </p>
            </div>
          )}

          {/* Overview */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>About This Role</h3>
            <p className={styles.overview}>{activeRole.overview}</p>
          </div>

          {/* Why This Fits */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Why This Fits You</h3>
            <ul className={styles.fitList}>
              {activeRole.whyFits.map((reason, index) => (
                <li key={index} className={styles.fitItem}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          {/* Local Tips */}
          {locationInsights && locationInsights.tips.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                Tips for {location.name}
              </h3>
              <ul className={styles.tipsList}>
                {locationInsights.tips.map((tip, index) => (
                  <li key={index} className={styles.tipItem}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Key Skills to Develop</h3>
            <div className={styles.tagList}>
              {activeRole.skills.map((skill, index) => (
                <span key={index} className={styles.tag}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Common Tools</h3>
            <div className={styles.tagList}>
              {activeRole.tools.map((tool, index) => (
                <span key={index} className={`${styles.tag} ${styles.toolTag}`}>
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              Recommended Certifications
              {locationInsights && (
                <span className={styles.certSubtitle}>
                  {' '}(valued in {location.name})
                </span>
              )}
            </h3>
            <div className={styles.certList}>
              {(locationInsights?.localCertifications ||
                activeRole.certifications.map(c => c.name)
              ).slice(0, 4).map((certName, index) => {
                const cert = activeRole.certifications.find(
                  c => c.name === certName
                );
                return (
                  <div key={index} className={styles.certCard}>
                    <div className={styles.certInfo}>
                      <span className={styles.certName}>{certName}</span>
                      {cert && (
                        <span className={styles.certProvider}>{cert.provider}</span>
                      )}
                    </div>
                    {cert && (
                      <span
                        className={`${styles.certLevel} ${styles[cert.level]}`}
                      >
                        {cert.level}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visa Info */}
          {locationInsights?.visaInfo && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Work Permit Info</h3>
              <p className={styles.visaInfo}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {locationInsights.visaInfo}
              </p>
            </div>
          )}
        </div>

        {/* Gemini Attribution */}
        {isGeminiConfigured() && (
          <div className={styles.aiAttribution}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Location insights powered by Gemini AI
          </div>
        )}

        {/* CTA to Roadmap */}
        <div className={styles.roadmapCta}>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => setShowRoadmap(true)}
          >
            View Your 90-Day Roadmap
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <p className={styles.ctaHint}>
            Get a step-by-step plan to start your journey as a{' '}
            {activeRole.title} in {location.name}
          </p>
        </div>
      </main>
    </div>
  );
}
