'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  User,
  Phone,
  Mail,
  School,
  Send
} from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp/whatsappHelper';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function AdmissionsFunnel() {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<{ id: string; parentName: string } | null>(null);

  // Form State
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [studentName, setStudentName] = useState('');
  const [currentClass, setCurrentClass] = useState('Class 6');
  const [classSeeking, setClassSeeking] = useState('Class 7');
  const [previousSchool, setPreviousSchool] = useState('');
  const [preferredContactTime, setPreferredContactTime] = useState('Evening (4 PM - 7 PM)');
  const [preferredVisitDate, setPreferredVisitDate] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const classOptions = [
    'Primary (Class 1 to 5)',
    'Class 1',
    'Class 2',
    'Class 3',
    'Class 4',
    'Class 5',
    'Class 6',
    'Class 7',
    'Class 8',
    'Class 9',
    'Class 10'
  ];

  const handleNext = () => {
    setErrorMsg('');
    if (step === 1) {
      if (!parentName.trim() || !phone.trim()) {
        setErrorMsg('Please enter parent/guardian name and contact phone number.');
        return;
      }
    } else if (step === 2) {
      if (!studentName.trim()) {
        setErrorMsg('Please enter prospective student name.');
        return;
      }
    }
    setStep((prev) => Math.min(4, prev + 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        parentName,
        phone,
        email: email || 'not-provided@example.com',
        studentName,
        currentClass,
        classSeeking,
        previousSchool,
        preferredContactTime,
        preferredVisitDate,
        notes
      };

      const res = await fetch('/api/admissions/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.enquiry) {
        setSubmittedData({
          id: data.enquiry.id,
          parentName: data.enquiry.parentName
        });
      } else {
        setErrorMsg(data.error || 'Failed to submit admission enquiry. Please try again.');
      }
    } catch {
      setErrorMsg('Network error. Please try again or reach out directly on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="admissions" className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-transparent text-slate-800 scroll-mt-24">
      {/* Subtle background glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Section Header Card with Frosted Backing */}
        <ScrollReveal direction="down">
          <div className="text-center mb-12 p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-white/80 shadow-xl shadow-sky-900/5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-amber-500/10 border border-sky-400/40 text-xs font-bold uppercase tracking-widest text-[#002B66] mb-4 shadow-sm">
              <GraduationCap className="w-4 h-4 text-[#00A3E0]" />
              <span>ADMISSIONS 2026–2027</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#002B66] mb-4">
              YOUR CHILD'S JOURNEY <span className="bg-gradient-to-r from-blue-600 via-[#00A3E0] to-purple-600 bg-clip-text text-transparent">STARTS HERE</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed max-w-2xl mx-auto">
              Secure a foundation of academic clarity, ethical character, and joyful exploration at Vidyadhari High School. Fill out our streamlined enquiry to receive personalized admissions counseling.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-700 font-semibold">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                No application fee for enquiry
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                Personalized campus walkthrough
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                Response within 24 business hours
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Wizard Card with Glow */}
        <ScrollReveal direction="up" delay={150}>
          <div className="p-8 sm:p-12 rounded-3xl bg-white/90 backdrop-blur-md border-2 border-white/80 shadow-2xl relative card-glow-blue overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#002B66] via-[#00A3E0] to-purple-600" />
          {submittedData ? (
            /* Submission Success State */
            <div className="text-center py-8 space-y-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-sky-50 border-2 border-[#00A3E0] mx-auto flex items-center justify-center text-[#00A3E0]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <div className="text-xs uppercase tracking-widest text-[#00A3E0] font-bold">
                  ENQUIRY REGISTERED SUCCESSFULLY
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#002B66] mt-1 mb-2">
                  Thank You, {submittedData.parentName}
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto font-normal">
                  Our admissions team will contact you shortly to answer your questions and coordinate your family's campus visit.
                </p>
              </div>

              {/* Reference ID Badge */}
              <div className="inline-block p-4 rounded-xl bg-sky-50 border border-sky-200 shadow-sm">
                <div className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold">
                  Your Unique Tracking ID
                </div>
                <div className="font-mono text-xl font-bold text-[#002B66] tracking-wider mt-0.5">
                  {submittedData.id}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href={buildWhatsAppUrl(`Hello Admissions, I have submitted enquiry ${submittedData.id} for my child and would like to confirm receipt.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#002B66] hover:bg-[#001D47] shadow-lg shadow-[#002B66]/20 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-[#00A3E0]" />
                  <span>Notify Admissions on WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    setSubmittedData(null);
                    setStep(1);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold text-[#002B66] hover:bg-sky-50 bg-white border-2 border-sky-200"
                >
                  Submit Another Enquiry
                </button>
              </div>
            </div>
          ) : (
            /* Multi-Step Form */
            <form onSubmit={handleSubmit}>
              {/* Stepper Progress Indicator */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-sky-100">
                {[
                  { num: 1, label: 'Parent Details' },
                  { num: 2, label: 'Student Details' },
                  { num: 3, label: 'Preferences' },
                  { num: 4, label: 'Review & Submit' }
                ].map((s) => (
                  <div key={s.num} className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        step === s.num
                          ? 'bg-[#002B66] text-white shadow-md shadow-[#002B66]/20'
                          : step > s.num
                          ? 'bg-emerald-600 text-white'
                          : 'bg-sky-50 text-slate-400 border border-sky-200'
                      }`}
                    >
                      {step > s.num ? '✓' : s.num}
                    </div>
                    <span
                      className={`hidden sm:inline text-xs font-bold ${
                        step === s.num ? 'text-[#002B66]' : 'text-slate-400'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {errorMsg && (
                <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                  ⚠️ {errorMsg}
                </div>
              )}

              {/* STEP 1: Parent Details */}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="text-xs uppercase tracking-wider text-[#00A3E0] font-bold">
                    Step 1 — Parent / Guardian Information
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#002B66] mb-1">
                      Parent / Guardian Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder="e.g. Ramesh Reddy"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8FAFC] border border-sky-200 text-sm text-slate-800 placeholder-slate-400 focus:border-[#00A3E0] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#002B66] mb-1">
                      Mobile Number (WhatsApp Enabled) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98490 12345"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8FAFC] border border-sky-200 text-sm text-slate-800 placeholder-slate-400 focus:border-[#00A3E0] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#002B66] mb-1">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="parent@example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8FAFC] border border-sky-200 text-sm text-slate-800 placeholder-slate-400 focus:border-[#00A3E0] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Student Details */}
              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="text-xs uppercase tracking-wider text-[#00A3E0] font-bold">
                    Step 2 — Prospective Student Profile
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#002B66] mb-1">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Aditya Reddy"
                      className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-sky-200 text-sm text-slate-800 placeholder-slate-400 focus:border-[#00A3E0] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#002B66] mb-1">
                        Current Class
                      </label>
                      <select
                        value={currentClass}
                        onChange={(e) => setCurrentClass(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-sky-200 text-sm text-slate-800 focus:border-[#00A3E0] focus:bg-white focus:outline-none"
                      >
                        {classOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-white text-slate-800">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#002B66] mb-1">
                        Class Seeking Admission Into *
                      </label>
                      <select
                        value={classSeeking}
                        onChange={(e) => setClassSeeking(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-sky-200 text-sm text-slate-800 focus:border-[#00A3E0] focus:bg-white focus:outline-none"
                      >
                        {classOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-white text-slate-800">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#002B66] mb-1">
                      Current / Previous School Name (Optional)
                    </label>
                    <div className="relative">
                      <School className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={previousSchool}
                        onChange={(e) => setPreviousSchool(e.target.value)}
                        placeholder="e.g. School in Warangal or Bhimaram"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8FAFC] border border-sky-200 text-sm text-slate-800 placeholder-slate-400 focus:border-[#00A3E0] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Preferences */}
              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="text-xs uppercase tracking-wider text-[#00A3E0] font-bold">
                    Step 3 — Walkthrough & Counseling Preferences
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#002B66] mb-1">
                        Preferred Campus Visit Date
                      </label>
                      <input
                        type="date"
                        value={preferredVisitDate}
                        onChange={(e) => setPreferredVisitDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-sky-200 text-sm text-slate-800 focus:border-[#00A3E0] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#002B66] mb-1">
                        Preferred Call / Contact Time
                      </label>
                      <select
                        value={preferredContactTime}
                        onChange={(e) => setPreferredContactTime(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-sky-200 text-sm text-slate-800 focus:border-[#00A3E0] focus:bg-white focus:outline-none"
                      >
                        <option value="Morning (9 AM - 12 PM)" className="bg-white">Morning (9 AM - 12 PM)</option>
                        <option value="Afternoon (12 PM - 4 PM)" className="bg-white">Afternoon (12 PM - 4 PM)</option>
                        <option value="Evening (4 PM - 7 PM)" className="bg-white">Evening (4 PM - 7 PM)</option>
                        <option value="Anytime on WhatsApp" className="bg-white">Anytime on WhatsApp</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#002B66] mb-1">
                      Specific Questions or Child's Interests (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Inquiring about science lab activities, sports facilities, or transport options in Vidyadhari Colony..."
                      className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-sky-200 text-sm text-slate-800 placeholder-slate-400 focus:border-[#00A3E0] focus:bg-white focus:outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: Summary & Confirmation */}
              {step === 4 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="text-xs uppercase tracking-wider text-[#00A3E0] font-bold">
                    Step 4 — Review Your Application Details
                  </div>

                  <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-sky-100">
                      <span className="text-slate-500 font-medium">Parent Name:</span>
                      <span className="font-bold text-[#002B66]">{parentName}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-sky-100">
                      <span className="text-slate-500 font-medium">Mobile Phone:</span>
                      <span className="font-bold text-[#002B66]">{phone}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-sky-100">
                      <span className="text-slate-500 font-medium">Student Name:</span>
                      <span className="font-bold text-[#002B66]">{studentName}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-sky-100">
                      <span className="text-slate-500 font-medium">Class Seeking:</span>
                      <span className="font-bold text-[#00A3E0]">{classSeeking}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500 font-medium">Contact Preference:</span>
                      <span className="text-slate-700 font-semibold">{preferredContactTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Your contact details are kept strictly confidential by school administration.</span>
                  </div>
                </div>
              )}

              {/* Nav buttons */}
              <div className="mt-8 pt-6 border-t border-sky-100 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((prev) => Math.max(1, prev - 1))}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-50 border border-sky-200 text-xs font-bold text-[#002B66] hover:bg-sky-100"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#002B66] hover:bg-[#001D47] shadow-lg shadow-[#002B66]/20 transition-all"
                  >
                    <span>Proceed to Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#00A3E0]" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#002B66] via-[#003B8E] to-[#002B66] hover:brightness-110 shadow-xl shadow-[#002B66]/25 disabled:opacity-50 transition-all"
                  >
                    <Send className="w-4 h-4 text-cyan-300" />
                    <span>{isSubmitting ? 'Registering Enquiry...' : 'Submit Admission Enquiry'}</span>
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </ScrollReveal>
    </div>
  </section>
);
}
