'use client';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function EventsListSkeleton({ count = 3 }) {
  return (
    <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f8fafc">
      <div className="grid gap-6">
        {[...Array(count)].map((_, idx) => (
          <div key={idx} className="surface-card overflow-hidden">
            <Skeleton height={224} />
            <div className="space-y-3 p-6">
              <Skeleton height={24} width="70%" />
              <Skeleton height={16} width="35%" />
              <Skeleton height={16} count={2} />
            </div>
          </div>
        ))}
      </div>
    </SkeletonTheme>
  );
}

export function StaffTableSkeleton({ rows = 6 }) {
  return (
    <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f8fafc">
      {[...Array(rows)].map((_, idx) => (
        <tr key={idx} className="border-b border-border/70 bg-white/70">
          <td className="px-4 py-4"><Skeleton height={16} width={24} /></td>
          <td className="px-4 py-4"><Skeleton height={16} width={220} /></td>
          <td className="px-4 py-4"><Skeleton height={16} width={180} /></td>
          <td className="px-4 py-4"><Skeleton height={16} width={130} /></td>
        </tr>
      ))}
    </SkeletonTheme>
  );
}
