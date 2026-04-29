'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import ScrollReveal from '@/components/ScrollReveal';
import SectionHeader from '@/components/SectionHeader';
import { useLanguage } from '@/contexts/LanguageContext';
import { getImageUrl } from '@/lib/imageUrls';

export default function Admissions() {
  const { t } = useLanguage();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/admissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application');
      }

      toast.success(t('applicationSuccess'));
      reset();
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error.message || t('submissionError') || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Use green ribbon hero variant for admissions (no background image) */}
      {/* Use green ribbon hero variant for admissions (no background image) */}
      <PageHero
        title={t('admissionsTitle')}
        description={t('admissionsDesc')}
        image={null}
        className="hero-admissions"
      />

      <section className="section-spacing">
        <div className="section-container max-w-3xl">
          <ScrollReveal className="surface-card-strong p-8 md:p-10" delay={100}>
            <SectionHeader
              kicker={t('requestInfo')}
              title={t('requestInfo')}
              align="center"
              titleTag="h2"
              className="mb-8"
            />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">{t('fullName')} *</label>
                <input {...register('fullName', { required: true })} className="form-input" placeholder={t('fullName')} />
                {errors.fullName ? <span className="text-xs text-destructive">{t('requiredField')}</span> : null}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">{t('emailAddress')} *</label>
                <input type="email" {...register('emailAddress', { required: true })} className="form-input" placeholder={t('emailAddress')} />
                {errors.emailAddress ? <span className="text-xs text-destructive">{t('requiredField')}</span> : null}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">{t('mobileNumber')} *</label>
                <input {...register('mobileNumber', { required: true })} className="form-input" placeholder={t('mobileNumber')} />
                {errors.mobileNumber ? <span className="text-xs text-destructive">{t('requiredField')}</span> : null}
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">{t('relationToSchool')} *</label>
                  <select {...register('relation', { required: true })} className="form-select">
                    <option value="">-- Select --</option>
                    <option value="parent">{t('parent')}</option>
                    <option value="visitor">{t('visitor')}</option>
                    <option value="other">{t('other')}</option>
                  </select>
                  {errors.relation ? <span className="text-xs text-destructive">{t('requiredField')}</span> : null}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">{t('subject')}</label>
                  <input {...register('subject')} className="form-input" placeholder={t('subject')} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">{t('message')} *</label>
                <textarea {...register('message', { required: true })} rows={5} className="form-textarea resize-none" placeholder={t('message')} />
                {errors.message ? <span className="text-xs text-destructive">{t('requiredField')}</span> : null}
              </div>

              <button type="submit" disabled={isSubmitting} className="button-primary w-full rounded-2xl py-3.5 disabled:cursor-not-allowed disabled:opacity-60">
                {isSubmitting ? 'Submitting...' : t('submitApplication')}
              </button>
            </form>
          </ScrollReveal>

          <p className="mt-6 text-center text-sm text-muted-foreground">{t('applicationReceived')}</p>
        </div>
      </section>
    </Layout>
  );
}
