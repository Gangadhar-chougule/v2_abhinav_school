'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Heart, BookOpen, Utensils, Home, Pill, Gift } from 'lucide-react';

export default function Donation() {
  const { t } = useLanguage();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const purposes = [
    { id: 'studentCare', icon: <Heart className="w-6 h-6 text-rose-500" />, key: 'studentCare' },
    { id: 'foodSupport', icon: <Utensils className="w-6 h-6 text-orange-500" />, key: 'foodSupport' },
    { id: 'educationMaterial', icon: <BookOpen className="w-6 h-6 text-blue-500" />, key: 'educationMaterial' },
    { id: 'hostelSupport', icon: <Home className="w-6 h-6 text-emerald-500" />, key: 'hostelSupport' },
    { id: 'medicalSupport', icon: <Pill className="w-6 h-6 text-purple-500" />, key: 'medicalSupport' },
    { id: 'generalDonation', icon: <Gift className="w-6 h-6 text-indigo-500" />, key: 'generalDonation' },
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    console.log('Donation Expected:', data);
    toast.success(t('thankYou'));
    reset();
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <main className="flex-grow pt-24 pb-16">
        <div className="section-container">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              {t('donationTitle')}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('donationDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {purposes.map((purpose) => (
              <div key={purpose.id} className="bg-card rounded-2xl p-6 shadow-sm border border-border flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {purpose.icon}
                </div>
                <h3 className="font-heading font-semibold text-lg">{t(purpose.key)}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Donation Form */}
            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
              <h2 className="text-2xl font-heading font-semibold mb-6">{t('donationTitle')}</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{t('donorName')} *</label>
                  <input
                    {...register('donorName', { required: true })}
                    className="w-full h-11 px-4 rounded-lg border border-input bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder={t('donorName')}
                  />
                  {errors.donorName && <span className="text-destructive text-xs">{t('requiredField')}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t('mobileNumber')} *</label>
                    <input
                      {...register('mobileNumber', { required: true })}
                      className="w-full h-11 px-4 rounded-lg border border-input bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder={t('mobileNumber')}
                    />
                    {errors.mobileNumber && <span className="text-destructive text-xs">{t('requiredField')}</span>}
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t('amount')} *</label>
                    <input
                      type="number"
                      {...register('amount', { required: true, min: 1 })}
                      className="w-full h-11 px-4 rounded-lg border border-input bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="e.g. 1000"
                    />
                    {errors.amount && <span className="text-destructive text-xs">{t('requiredField')}</span>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t('donationPurpose')} *</label>
                    <select
                      {...register('donationPurpose', { required: true })}
                      className="w-full h-11 px-4 rounded-lg border border-input bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                    >
                      <option value="">-- Select --</option>
                      {purposes.map(p => (
                        <option key={p.id} value={p.id}>{t(p.key)}</option>
                      ))}
                    </select>
                    {errors.donationPurpose && <span className="text-destructive text-xs">{t('requiredField')}</span>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{t('message')}</label>
                  <textarea
                    {...register('message')}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder={t('message')}
                  />
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

            {/* Payment Details */}
            <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20 flex flex-col h-full">
               <div className="flex-1">
                  <h3 className="text-xl font-heading font-semibold mb-6 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    {t('bankDetails')}
                  </h3>

                  <div className="bg-background rounded-xl p-6 shadow-sm mb-6 space-y-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">{t('accountName')}</span>
                      <span className="font-semibold text-foreground">Sant Dnyaneshwar Shikshan Sanstha</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">{t('accountNumber')}</span>
                      <span className="font-mono font-medium text-foreground">XXXX XXXX XXXX XXXX</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">{t('ifscCode')}</span>
                        <span className="font-mono font-medium text-foreground">XXXX0000000</span>
                      </div>
                      <div className="flex flex-col">
                         <span className="text-xs text-muted-foreground uppercase tracking-wider">{t('bankName')}</span>
                         <span className="font-medium text-foreground">State Bank of India</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-heading font-semibold mb-4">{t('upiId')}</h3>
                  <div className="bg-background rounded-xl p-4 shadow-sm mb-6 flex items-center justify-between">
                     <span className="font-mono font-medium text-foreground">ngo@sbi</span>
                  </div>

                  <div className="flex flex-col items-center justify-center p-6 bg-background rounded-xl shadow-sm border-2 border-dashed border-border mb-6">
                     <div className="w-40 h-40 bg-muted/50 rounded-lg flex items-center justify-center mb-4">
                        <span className="text-sm text-muted-foreground text-center px-4">{t('scanQrToDonate')}</span>
                     </div>
                  </div>
               </div>

               <div className="mt-auto">
                 <p className="text-sm text-muted-foreground text-center italic bg-background/50 p-4 rounded-lg">
                   * {t('receiptNote')}
                 </p>
               </div>
            </div>

          </div>
        </div>
      </main>
    </Layout>
  );
}
