export default function SectionHeader({
  kicker,
  title,
  subtitle,
  align = 'left',
  titleTag: TitleTag = 'h2',
  className = '',
}) {
  const alignmentClass = align === 'center' ? 'text-center mx-auto' : '';

  return (
    <div className={`${alignmentClass} ${className}`.trim()}>
      {kicker ? <span className="section-kicker">{kicker}</span> : null}
      {title ? <TitleTag className="heading-section mb-4 text-slate-900">{title}</TitleTag> : null}
      {subtitle ? <p className="body-large max-w-2xl">{subtitle}</p> : null}
    </div>
  );
}
