import React, { useState } from 'react';
import {
  Lock,
  ShieldCheck,
  Smartphone,
  Zap,
  AlertCircle,
  Check,
} from 'lucide-react';

export interface PaywallInfo {
  title: string;
  description: string;
  currency: string;
  amount: string;
}

export const MobileMoneyPaywallCard: React.FC<{ paywall: PaywallInfo; onUnlock?: () => void }> = ({ paywall, onUnlock }) => {
  const [tab, setTab] = useState<'new' | 'restore'>('new');
  const [network, setNetwork] = useState<'mtn' | 'airtel'>('mtn');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onUnlock?.();
    }, 1500);
  };

  return (
    <div className="relative mt-8 rounded-2xl bg-white border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 sm:p-8 max-w-xl mx-auto overflow-hidden">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-blue-50/60 blur-3xl pointer-events-none" />

      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200/60 text-amber-600 flex items-center justify-center mb-3 shadow-xs">
          <Lock className="w-5 h-5" />
        </div>

        <h3 className="text-xl sm:text-2xl font-serif text-neutral-900 tracking-tight font-normal leading-snug">
          {paywall.title}
        </h3>

        <p className="text-xs text-neutral-500 mt-2 max-w-md leading-relaxed">
          {paywall.description}
        </p>

        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50/80 border border-amber-200/60 text-xs">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-amber-700">
            One-Time Reader Contribution
          </span>
          <span className="font-semibold text-amber-900">
            {paywall.currency} {paywall.amount}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 p-1 bg-neutral-100 rounded-lg text-xs font-medium mb-6">
        <button
          type="button"
          onClick={() => setTab('new')}
          className={`py-1.5 rounded-md transition-all ${
            tab === 'new'
              ? 'bg-white text-neutral-900 shadow-xs'
              : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          New Access (Mobile Money)
        </button>
        <button
          type="button"
          onClick={() => setTab('restore')}
          className={`py-1.5 rounded-md transition-all ${
            tab === 'restore'
              ? 'bg-white text-neutral-900 shadow-xs'
              : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          Returning Reader (Restore)
        </button>
      </div>

      {tab === 'new' ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="font-semibold uppercase tracking-wider text-neutral-500">
                Select Mobile Money Network
              </span>
              <span className="text-amber-600 flex items-center gap-1 font-mono text-[10px]">
                <Zap className="w-3 h-3" /> Instant USSD push
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setNetwork('mtn')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border text-xs font-semibold transition-all ${
                  network === 'mtn'
                    ? 'border-[#2563eb] bg-blue-50/50 text-blue-900 shadow-xs'
                    : 'border-neutral-200 bg-neutral-50/60 text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-500" />
                <span>MTN MoMo</span>
              </button>

              <button
                type="button"
                onClick={() => setNetwork('airtel')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border text-xs font-semibold transition-all ${
                  network === 'airtel'
                    ? 'border-[#2563eb] bg-blue-50/50 text-blue-900 shadow-xs'
                    : 'border-neutral-200 bg-neutral-50/60 text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-rose-600" />
                <span>Airtel Money</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1">
              Your Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="reader@domain.com"
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-200 focus:outline-hidden focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-neutral-400 bg-neutral-50/40"
              />
            </div>
            <p className="text-[10px] text-neutral-400 mt-1">
              Used to securely associate and restore your lifetime reading pass.
            </p>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1">
              Mobile Money Phone Number
            </label>
            <div className="flex rounded-lg border border-neutral-200 overflow-hidden bg-neutral-50/40 focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <span className="px-3 py-2 text-xs text-neutral-600 bg-neutral-100 border-r border-neutral-200 flex items-center font-mono">
                +256 (UG)
              </span>
              <div className="flex items-center flex-1 px-2.5">
                <Smartphone className="w-3.5 h-3.5 text-neutral-400 mr-2 shrink-0" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="77 123 4567"
                  className="w-full py-2 text-xs bg-transparent focus:outline-hidden font-mono placeholder:text-neutral-400 text-neutral-900"
                />
              </div>
            </div>
            <p className="text-[10px] text-neutral-400 mt-1">
              Direct authorization; standard network tariffs apply.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || submitted}
            className="w-full py-2.5 px-4 rounded-lg bg-[#2563eb] hover:bg-blue-700 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-70 mt-2"
          >
            {isSubmitting ? (
              <span>Authorizing Push...</span>
            ) : submitted ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>USSD Prompt Sent! Check Your Device</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>Pay via Mobile Money &amp; Read Now</span>
              </>
            )}
          </button>

          <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200/50 flex items-start gap-2.5 text-[11px] text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-semibold text-amber-950">Instant Handset Prompt:</span> After clicking, a secure USSD pop-up will appear immediately on your device. Enter your secret Mobile Money PIN to approve the transaction.
            </div>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1">
              Registered Email
            </label>
            <input
              type="email"
              placeholder="reader@domain.com"
              className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-200 focus:outline-hidden focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 bg-neutral-50/40"
            />
          </div>
          <button
            type="button"
            className="w-full py-2.5 px-4 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
          >
            Send Magic Access Link
          </button>
          <p className="text-[11px] text-center text-neutral-400">
            We will email you a secure link to restore all previously unlocked monographs.
          </p>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] text-neutral-400">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> 100% direct creator funding
        </span>
        <span>·</span>
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-neutral-400" /> 256-bit TLS
        </span>
        <span>·</span>
        <span className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-neutral-400" /> Instant Settlement
        </span>
      </div>
    </div>
  );
};
