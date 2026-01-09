/**
 * Loading Skeleton Component
 *
 * Provides visual feedback while content is loading.
 * Uses animated gradient shimmer effect.
 */

import styles from './LoadingSkeleton.module.css';

interface LoadingSkeletonProps {
  variant?: 'text' | 'title' | 'card' | 'badge' | 'stat';
  width?: string;
  height?: string;
  className?: string;
}

export function LoadingSkeleton({
  variant = 'text',
  width,
  height,
  className = '',
}: LoadingSkeletonProps) {
  const variantClass = styles[variant] || styles.text;

  return (
    <div
      className={`${styles.skeleton} ${variantClass} ${className}`}
      style={{ width, height }}
      aria-label="Loading..."
      role="status"
    />
  );
}

// Pre-built skeleton layouts for common use cases
export function InsightsSkeleton() {
  return (
    <div className={styles.insightsContainer}>
      <div className={styles.statRow}>
        <LoadingSkeleton variant="stat" />
        <LoadingSkeleton variant="stat" />
      </div>
      <div className={styles.section}>
        <LoadingSkeleton variant="text" width="120px" />
        <div className={styles.tagRow}>
          <LoadingSkeleton variant="badge" width="100px" />
          <LoadingSkeleton variant="badge" width="120px" />
          <LoadingSkeleton variant="badge" width="90px" />
          <LoadingSkeleton variant="badge" width="110px" />
        </div>
      </div>
      <div className={styles.section}>
        <LoadingSkeleton variant="text" width="140px" />
        <LoadingSkeleton variant="card" />
      </div>
    </div>
  );
}

export function RoleCardSkeleton() {
  return (
    <div className={styles.roleCardContainer}>
      <div className={styles.roleHeader}>
        <div className={styles.roleInfo}>
          <LoadingSkeleton variant="title" width="200px" />
          <LoadingSkeleton variant="text" width="280px" />
        </div>
        <LoadingSkeleton variant="badge" width="72px" height="72px" />
      </div>
      <InsightsSkeleton />
    </div>
  );
}
