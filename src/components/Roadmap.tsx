/**
 * Roadmap Component
 *
 * Displays the 90-day learning roadmap for a career role.
 * Organized into 3 months with tasks and resources for each.
 */

import type { CareerRole, RoadmapMonth } from '../types';
import styles from './Roadmap.module.css';

interface RoadmapProps {
  role: CareerRole;
  onBack: () => void;
  onReset: () => void;
}

interface MonthCardProps {
  month: RoadmapMonth;
  monthNumber: number;
}

function MonthCard({ month, monthNumber }: MonthCardProps) {
  const monthLabels = ['Month 1', 'Month 2', 'Month 3'];
  const monthColors = ['#22c55e', '#eab308', '#6366f1'];

  return (
    <div
      className={styles.monthCard}
      style={{ '--month-color': monthColors[monthNumber - 1] } as React.CSSProperties}
    >
      <div className={styles.monthHeader}>
        <span
          className={styles.monthLabel}
          style={{ color: monthColors[monthNumber - 1] }}
        >
          {monthLabels[monthNumber - 1]}
        </span>
        <h3 className={styles.monthTitle}>{month.title}</h3>
        <p className={styles.monthFocus}>{month.focus}</p>
      </div>

      <div className={styles.monthContent}>
        {/* Tasks */}
        <div className={styles.taskSection}>
          <h4 className={styles.sectionLabel}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 11L12 14L22 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Tasks to Complete
          </h4>
          <ul className={styles.taskList}>
            {month.tasks.map((task, index) => (
              <li key={index} className={styles.taskItem}>
                <span className={styles.taskCheckbox} />
                {task}
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className={styles.resourceSection}>
          <h4 className={styles.sectionLabel}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Recommended Resources
          </h4>
          <ul className={styles.resourceList}>
            {month.resources.map((resource, index) => (
              <li key={index} className={styles.resourceItem}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 3H21V9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 14L21 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {resource}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Roadmap({ role, onBack, onReset }: RoadmapProps) {
  return (
    <div className={styles.roadmap}>
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
          Back to Results
        </button>
        <button className="btn btn-ghost" onClick={onReset}>
          Start Over
        </button>
      </header>

      {/* Content */}
      <main className={styles.content}>
        {/* Hero */}
        <section className={styles.heroSection}>
          <div className={styles.badge}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 2V8H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 13H8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 17H8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 9H8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Your Personal Roadmap
          </div>
          <h1 className={styles.heroTitle}>
            90-Day Path to <span className={styles.roleHighlight}>{role.title}</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Follow this structured plan to build the skills and knowledge needed
            to start your career as a {role.title}. Focus on one month at a
            time.
          </p>
        </section>

        {/* Timeline */}
        <section className={styles.timeline}>
          <div className={styles.timelineLine} />

          <MonthCard month={role.roadmap.month1} monthNumber={1} />
          <MonthCard month={role.roadmap.month2} monthNumber={2} />
          <MonthCard month={role.roadmap.month3} monthNumber={3} />
        </section>

        {/* Tips */}
        <section className={styles.tipsSection}>
          <h3 className={styles.tipsTitle}>Tips for Success</h3>
          <div className={styles.tipsList}>
            <div className={styles.tip}>
              <div className={styles.tipIcon}>
                <svg
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
                    d="M12 6V12L16 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <h4>Dedicate 1-2 hours daily</h4>
                <p>Consistency beats intensity. Small daily progress adds up.</p>
              </div>
            </div>
            <div className={styles.tip}>
              <div className={styles.tipIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="9"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h4>Join the community</h4>
                <p>Connect with others on Discord, Reddit, and Twitter/X.</p>
              </div>
            </div>
            <div className={styles.tip}>
              <div className={styles.tipIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 20H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.5 3.50001C16.8978 3.10219 17.4374 2.87869 18 2.87869C18.2786 2.87869 18.5544 2.93356 18.8118 3.04017C19.0692 3.14677 19.303 3.30303 19.5 3.50001C19.697 3.697 19.8532 3.93085 19.9598 4.18822C20.0665 4.44559 20.1213 4.72144 20.1213 5.00001C20.1213 5.27859 20.0665 5.55444 19.9598 5.81181C19.8532 6.06918 19.697 6.30303 19.5 6.50001L7 19L3 20L4 16L16.5 3.50001Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h4>Document everything</h4>
                <p>Build your portfolio as you learn. Write about your journey.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className={styles.finalCta}>
          <p>Ready to begin? Start with Month 1 and build momentum!</p>
          <button className="btn btn-secondary" onClick={onReset}>
            Take the Quiz Again
          </button>
        </section>
      </main>
    </div>
  );
}
