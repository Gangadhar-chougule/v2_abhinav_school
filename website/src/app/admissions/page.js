'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function Admissions() {
  const { t } = useLanguage();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
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
      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative h-[30vh] md:h-[40vh] overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
                {t('admissionsTitle')}
              </h1>
              <p className="text-primary-foreground/90 text-lg md:text-xl max-w-2xl mx-auto">
                {t('admissionsDesc')}
              </p>
            </div>
          </div>
        </section>

        <div className="section-container max-w-3xl">
          <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-8 text-center">
              {t('requestInfo')}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t('fullName')} *</label>
                <input
                  {...register('fullName', { required: true })}
                  className="w-full h-11 px-4 rounded-lg border border-input bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder={t('fullName')}
                />
                {errors.fullName && <span className="text-destructive text-xs">{t('requiredField')}</span>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t('emailAddress')} *</label>
                <input
                  type="email"
                  {...register('emailAddress', { required: true })}
                  className="w-full h-11 px-4 rounded-lg border border-input bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder={t('emailAddress')}
                />
                {errors.emailAddress && <span className="text-destructive text-xs">{t('requiredField')}</span>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t('mobileNumber')} *</label>
                <input
                  {...register('mobileNumber', { required: true })}
                  className="w-full h-11 px-4 rounded-lg border border-input bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder={t('mobileNumber')}
                />
                {errors.mobileNumber && <span className="text-destructive text-xs">{t('requiredField')}</span>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{t('relationToSchool')} *</label>
                  <select
                    {...register('relation', { required: true })}
                    className="w-full h-11 px-4 rounded-lg border border-input bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                  >
                    <option value="">-- Select --</option>
                    <option value="parent">{t('parent')}</option>
                    <option value="visitor">{t('visitor')}</option>
                    <option value="other">{t('other')}</option>
                  </select>
                  {errors.relation && <span className="text-destructive text-xs">{t('requiredField')}</span>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{t('subject')}</label>
                  <input
                    {...register('subject')}
                    className="w-full h-11 px-4 rounded-lg border border-input bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder={t('subject')}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t('message')} *</label>
                <textarea
                  {...register('message', { required: true })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  placeholder={t('message')}
                />
                {errors.message && <span className="text-destructive text-xs">{t('requiredField')}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : t('submitApplication')}
              </button>
            </form>
          </div>

          <p className="text-center text-muted-foreground text-sm mt-6">
            {t('applicationReceived')}
          </p>
        </div>
      </main>
    </Layout>
  );
}
