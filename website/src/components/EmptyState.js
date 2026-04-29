import { Calendar } from 'lucide-react';

export default function EmptyState({
  icon: Icon = Calendar,
  title = 'No items available',
  description = 'Please check back again soon.',
  className = '',
}) {
  return (
    <div className={`mx-auto flex max-w-xl flex-col items-center rounded-[1.75rem] border border-secondary/10 bg-white/80 px-6 py-10 text-center shadow-[0_18px_40px_rgba(33,150,243,0.08)] ${className}`.trim()}>
      <span className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-secondary/10 text-secondary">
        <Icon size={30} />
      </span>
      <h3 className="heading-sub text-slate-900">{title}</h3>
      <p className="body-text mt-3">{description}</p>
    </div>
  );
}
