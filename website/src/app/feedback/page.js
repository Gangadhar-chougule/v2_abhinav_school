'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function Feedback() {
  const { t } = useLanguage();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    console.log('Feedback Submitted:', data);
    toast.success(t('feedbackSuccess'));
    reset();
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <main className="flex-grow pt-24 pb-16">
        <div className="section-container max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              {t('feedbackTitle')}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('feedbackDesc')}
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <label className="text-sm font-medium text-foreground">{t('mobileNumber')} *</label>
                  <input
                    {...register('mobileNumber', { required: true })}
                    className="w-full h-11 px-4 rounded-lg border border-input bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder={t('mobileNumber')}
                  />
                  {errors.mobileNumber && <span className="text-destructive text-xs">{t('requiredField')}</span>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t('emailAddress')}</label>
                <input
                  type="email"
                  {...register('emailAddress')}
                  className="w-full h-11 px-4 rounded-lg border border-input bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder={t('emailAddress')}
                />
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
                    <option value="donor">{t('donor')}</option>
                    <option value="other">{t('other')}</option>
                  </select>
                  {errors.relation && <span className="text-destructive text-xs">{t('requiredField')}</span>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{t('feedbackType')} *</label>
                  <select
                    {...register('feedbackType', { required: true })}
                    className="w-full h-11 px-4 rounded-lg border border-input bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                  >
                    <option value="">-- Select --</option>
                    <option value="suggestion">{t('suggestion')}</option>
                    <option value="complaint">{t('complaint')}</option>
                    <option value="appreciation">{t('appreciation')}</option>
                  </select>
                  {errors.feedbackType && <span className="text-destructive text-xs">{t('requiredField')}</span>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t('rating')} *</label>
                <div className="flex gap-4">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <label key={num} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={num}
                        {...register('rating', { required: true })}
                        className="text-primary focus:ring-primary accent-primary w-4 h-4 cursor-pointer"
                      />
                      <span>{num}</span>
                    </label>
                  ))}
                </div>
                {errors.rating && <span className="text-destructive text-xs">{t('requiredField')}</span>}
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
                className="w-full h-12 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : t('submit')}
              </button>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
}
