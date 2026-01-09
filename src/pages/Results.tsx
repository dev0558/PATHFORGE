/**
 * Results Page Component
 *
 * Displays the quiz results including:
 * - Primary and secondary role matches
 * - Role details (overview, skills, tools, certifications)
 * - 90-day roadmap
 */

import { useState } from 'react';
import type { QuizResult } from '../types';
import { Roadmap } from '../components/Roadmap';
import styles from './Results.module.css';

interface ResultsProps {
  result: QuizResult;
  onReset: () => void;
}

export function Results({ result, onReset }: ResultsProps) {
  const [activeTab, setActiveTab] = useState<'primary' | 'secondary'>('primary');
  const [showRoadmap, setShowRoadmap] = useState(false);

  const activeRole =
    activeTab === 'primary' ? result.primaryRole : result.secondaryRole;

  // Calculate match percentage (simplified)
  const primaryScore = result.scores.find(
    (s) => s.roleId === result.primaryRole.id
  );
  const matchPercentage = primaryScore
    ? Math.min(Math.round((primaryScore.score / 18) * 100), 95)
    : 85;

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
            with your interests and skills.
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

          {/* Role Stats */}
          <div className={styles.roleStats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Salary Range</span>
              <span className={styles.statValue}>{activeRole.salaryRange}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Demand</span>
              <span
                className={`${styles.statValue} ${styles[activeRole.demandLevel]}`}
              >
                {activeRole.demandLevel === 'high'
                  ? 'High Demand'
                  : activeRole.demandLevel === 'growing'
                  ? 'Growing'
                  : 'Moderate'}
              </span>
            </div>
          </div>

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
            <h3 className={styles.sectionTitle}>Recommended Certifications</h3>
            <div className={styles.certList}>
              {activeRole.certifications.map((cert, index) => (
                <div key={index} className={styles.certCard}>
                  <div className={styles.certInfo}>
                    <span className={styles.certName}>{cert.name}</span>
                    <span className={styles.certProvider}>{cert.provider}</span>
                  </div>
                  <span
                    className={`${styles.certLevel} ${styles[cert.level]}`}
                  >
                    {cert.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

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
            {activeRole.title}
          </p>
        </div>
      </main>
    </div>
  );
}
