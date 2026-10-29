'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Users,
  CalendarCheck,
  FileText,
  BarChart3,
  LogOut,
  Search,
  Download,
  Clock,
  Phone,
  MessageSquare,
  Save
} from 'lucide-react';
import { AdmissionEnquiry, CampusVisitBooking, LeadStatus, SchoolSettings } from '@/lib/db/types';
import VidyadhariLogo from '@/components/brand/VidyadhariLogo';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'leads' | 'visits' | 'cms' | 'analytics'>('leads');
  const [isLoading, setIsLoading] = useState(true);

  // Leads state
  const [enquiries, setEnquiries] = useState<AdmissionEnquiry[]>([]);
  const [visits, setVisits] = useState<CampusVisitBooking[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // CMS state
  const [cmsSettings, setCmsSettings] = useState<SchoolSettings | null>(null);
  const [cmsSuccess, setCmsSuccess] = useState('');

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/admin/leads');
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries || []);
        setVisits(data.visits || []);
        setMetrics(data.metrics || null);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    }
  };

  const fetchCMS = async () => {
    try {
      const res = await fetch('/api/admin/cms');
      if (res.ok) {
        const data = await res.json();
        setCmsSettings(data.settings);
      }
    } catch (err) {
      console.error('Error fetching CMS:', err);
    }
  };

  useEffect(() => {
    Promise.all([fetchLeads(), fetchCMS()]).finally(() => setIsLoading(false));
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: LeadStatus) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'enquiry', id, status: newStatus })
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleSaveCMS = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmsSettings) return;

    try {
      const res = await fetch('/api/admin/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection: 'settings', data: cmsSettings })
      });
      if (res.ok) {
        setCmsSuccess('School settings updated and published successfully.');
        setTimeout(() => setCmsSuccess(''), 4000);
      }
    } catch (err) {
      console.error('Failed to save settings:', err);
    }
  };

  const exportCSV = () => {
    const headers = ['ID', 'Parent Name', 'Phone', 'Student Name', 'Class Seeking', 'Status', 'Date', 'Notes'];
    const rows = enquiries.map(e => [
      e.id,
      `"${e.parentName}"`,
      `"${e.phone}"`,
      `"${e.studentName}"`,
      `"${e.classSeeking}"`,
      e.status,
      e.createdAt,
      `"${(e.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Vidyadhari_Admissions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Debounced search state & pagination
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setCurrentPage(1);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredEnquiries = enquiries.filter(e => {
    const matchesSearch =
      !debouncedSearchQuery ||
      e.parentName.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      e.studentName.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      e.id.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      e.phone.includes(debouncedSearchQuery);

    const matchesStatus = statusFilter === 'ALL' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredEnquiries.length / pageSize));
  const paginatedEnquiries = filteredEnquiries.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const leadStatuses: LeadStatus[] = [
    'NEW',
    'CONTACTED',
    'FOLLOW-UP',
    'CAMPUS VISIT',
    'QUALIFIED',
    'CONVERTED',
    'LOST'
  ];

  return (
    <div className="min-h-screen bg-[#F0F7FF] text-slate-800 flex flex-col">
      {/* Admin Top Header */}
      <header className="bg-white border-b-2 border-sky-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4">
          <VidyadhariLogo size="sm" showText={false} />
          <div>
            <div className="font-serif font-bold tracking-wider text-base text-[#002B66] flex items-center gap-2">
              <span>VIDYADHARI CMS & ADMISSIONS DESK</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-mono font-bold">
                Live
              </span>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
              Campus Lead Funnel • Bhimaram, Telangana
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#002B66] hover:text-[#00A3E0] font-bold hover:underline"
          >
            <span>View Public Website</span>
            <span>↗</span>
          </Link>

          <button
            onClick={() => router.push('/admin/login')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-xs text-[#002B66] font-semibold border border-sky-200 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Admin Navigation Tabs */}
      <div className="bg-white border-b border-sky-200 px-6">
        <div className="flex space-x-6 overflow-x-auto">
          {[
            { id: 'leads', label: 'Admission Enquiries', icon: Users, count: enquiries.length },
            { id: 'visits', label: 'Campus Visits', icon: CalendarCheck, count: visits.length },
            { id: 'cms', label: 'School CMS Content', icon: FileText },
            { id: 'analytics', label: 'Conversion Funnel', icon: BarChart3 }
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 px-1 border-b-2 font-bold text-xs tracking-wider uppercase flex items-center gap-2 whitespace-nowrap transition-colors ${
                  isCurrent
                    ? 'border-[#002B66] text-[#002B66]'
                    : 'border-transparent text-slate-500 hover:text-[#002B66]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      isCurrent
                        ? 'bg-sky-100 text-[#002B66] font-bold'
                        : 'bg-sky-50 text-slate-500'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {/* Animated Loading Skeletons */}
        {isLoading && (
          <div className="space-y-6 animate-pulse">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-20 rounded-xl bg-white border border-sky-100 shadow-sm p-4 flex flex-col justify-between">
                  <div className="h-3 w-16 bg-slate-200 rounded" />
                  <div className="h-6 w-12 bg-slate-200 rounded" />
                </div>
              ))}
            </div>
            <div className="h-96 rounded-2xl bg-white border border-sky-100 shadow-sm p-6 space-y-4">
              <div className="h-8 w-48 bg-slate-200 rounded" />
              <div className="h-12 w-full bg-slate-100 rounded-xl" />
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-10 w-full bg-slate-100 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: ADMISSION ENQUIRIES */}
        {!isLoading && activeTab === 'leads' && (
          <div className="space-y-6 animate-fade-in">
            {/* Quick Metrics Bar */}
            {metrics && (
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                <div className="p-4 rounded-xl bg-white border border-sky-200 shadow-sm">
                  <div className="text-[11px] text-slate-500 font-semibold">Total Enquiries</div>
                  <div className="text-xl font-serif font-bold text-[#002B66] mt-1">{metrics.totalEnquiries}</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-sky-200 shadow-sm">
                  <div className="text-[11px] text-[#00A3E0] font-semibold">New / Uncontacted</div>
                  <div className="text-xl font-serif font-bold text-[#002B66] mt-1">{metrics.newEnquiries}</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-sky-200 shadow-sm">
                  <div className="text-[11px] text-amber-600 font-semibold">Follow-Up Pending</div>
                  <div className="text-xl font-serif font-bold text-[#002B66] mt-1">{metrics.followUp}</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-sky-200 shadow-sm">
                  <div className="text-[11px] text-[#002B66] font-semibold">Campus Walkthroughs</div>
                  <div className="text-xl font-serif font-bold text-[#002B66] mt-1">{metrics.campusVisits}</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-sky-200 shadow-sm">
                  <div className="text-[11px] text-emerald-600 font-semibold">Admissions Converted</div>
                  <div className="text-xl font-serif font-bold text-[#002B66] mt-1">{metrics.converted}</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-sky-200 shadow-sm">
                  <div className="text-[11px] text-slate-500 font-semibold">Conversion Rate</div>
                  <div className="text-xl font-serif font-bold text-[#002B66] mt-1">{metrics.conversionRate}</div>
                </div>
              </div>
            )}

            {/* Filter Bar & Export */}
            <div className="p-4 rounded-xl bg-white border border-sky-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search parent, student, phone or ID..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#F8FAFC] border border-sky-200 text-xs text-slate-800 placeholder-slate-400 focus:border-[#00A3E0] focus:bg-white focus:outline-none"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-[#F8FAFC] border border-sky-200 text-xs text-slate-800 focus:border-[#00A3E0] focus:bg-white focus:outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  {leadStatuses.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={exportCSV}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 text-xs font-bold text-[#002B66] transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-[#00A3E0]" />
                <span>Export CSV</span>
              </button>
            </div>

            {/* Enquiries Table */}
            <div className="rounded-2xl bg-white border border-sky-200 overflow-x-auto shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-sky-50 border-b border-sky-200 text-[#002B66] font-mono text-[11px] uppercase tracking-wider font-bold">
                    <th className="py-3 px-4">Lead ID</th>
                    <th className="py-3 px-4">Parent & Contact</th>
                    <th className="py-3 px-4">Student & Seeking</th>
                    <th className="py-3 px-4">Created Date</th>
                    <th className="py-3 px-4">Status & Action</th>
                    <th className="py-3 px-4">Contact Buttons</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-100">
                  {filteredEnquiries.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500">
                        No admission enquiries found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    paginatedEnquiries.map((enq) => (
                      <tr key={enq.id} className="hover:bg-sky-50/50 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-[#002B66]">
                          {enq.id}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-[#002B66]">{enq.parentName}</div>
                          <div className="text-slate-500 text-[11px]">{enq.phone}</div>
                          {enq.email && enq.email !== 'not-provided@example.com' && (
                            <div className="text-slate-400 text-[10px]">{enq.email}</div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-slate-800 font-medium">{enq.studentName}</div>
                          <div className="text-[11px] text-[#00A3E0] font-bold">Seeking: {enq.classSeeking}</div>
                          <div className="text-[10px] text-slate-500">Current: {enq.currentClass}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-500 text-[11px]">
                          {new Date(enq.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={enq.status}
                            onChange={(e) => handleUpdateStatus(enq.id, e.target.value as LeadStatus)}
                            className="px-2.5 py-1 rounded bg-[#F8FAFC] border border-sky-200 text-xs font-semibold text-slate-800 focus:border-[#00A3E0] focus:bg-white focus:outline-none"
                          >
                            {leadStatuses.map(st => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <a
                              href={`tel:${enq.phone}`}
                              className="p-1.5 rounded bg-sky-50 hover:bg-sky-100 text-[#002B66] border border-sky-200"
                              title="Call parent"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded bg-sky-100 hover:bg-sky-200 text-[#002B66] border border-sky-300"
                              title="Chat on WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Table Pagination Bar */}
              {totalPages > 1 && (
                <div className="p-3 bg-sky-50/70 border-t border-sky-200 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">
                    Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredEnquiries.length)} of {filteredEnquiries.length} leads
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={currentPage <= 1}
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className="px-2.5 py-1 rounded-lg bg-white border border-sky-200 text-[#002B66] font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-sky-100 transition-colors"
                    >
                      Previous
                    </button>
                    <span className="text-slate-700 font-mono font-bold">
                      {currentPage} / {totalPages}
                    </span>
                    <button
                      type="button"
                      disabled={currentPage >= totalPages}
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className="px-2.5 py-1 rounded-lg bg-white border border-sky-200 text-[#002B66] font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-sky-100 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: CAMPUS VISITS */}
        {activeTab === 'visits' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-4 rounded-xl bg-white border border-sky-200 shadow-sm flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#002B66]">
                Scheduled Campus Walkthroughs
              </h3>
              <span className="text-xs text-[#00A3E0] font-bold">{visits.length} appointments booked</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visits.map((v) => (
                <div key={v.id} className="p-6 rounded-2xl bg-white border border-sky-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#002B66] font-bold">{v.id}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                      {v.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif text-base font-bold text-[#002B66]">{v.parentName}</h4>
                    <p className="text-xs text-slate-500">Student: {v.studentName} ({v.classSeeking})</p>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">Phone: {v.phone}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-sky-50 border border-sky-100 space-y-1 text-xs">
                    <div className="flex items-center gap-2 text-slate-700">
                      <CalendarCheck className="w-3.5 h-3.5 text-[#00A3E0]" />
                      <span>Date: <strong className="text-[#002B66]">{v.visitDate}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-[#00A3E0]" />
                      <span>Time: <strong className="text-[#002B66]">{v.visitTimeSlot}</strong></span>
                    </div>
                  </div>

                  {v.message && (
                    <p className="text-xs text-slate-500 italic">"{v.message}"</p>
                  )}

                  <div className="pt-2 flex items-center gap-2">
                    <a
                      href={`tel:${v.phone}`}
                      className="flex-1 text-center py-2 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 text-xs font-bold text-[#002B66]"
                    >
                      Call Parent
                    </a>
                    <a
                      href={`https://wa.me/${v.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 rounded-lg bg-[#002B66] text-white hover:bg-[#001D47] text-xs font-bold shadow-sm"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CONTENT CMS */}
        {activeTab === 'cms' && cmsSettings && (
          <form onSubmit={handleSaveCMS} className="space-y-6 max-w-3xl animate-fade-in">
            <div className="p-6 rounded-2xl bg-white border border-sky-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-sky-100 pb-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#002B66]">
                    School Identity & Contact Settings
                  </h3>
                  <p className="text-xs text-slate-500">
                    Update public website branding without developer redeployments.
                  </p>
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#002B66] hover:bg-[#001D47] shadow-md transition-all"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Publish Updates</span>
                </button>
              </div>

              {cmsSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold">
                  ✓ {cmsSuccess}
                </div>
              )}

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#002B66] font-semibold mb-1">Official School Name</label>
                  <input
                    type="text"
                    value={cmsSettings.schoolName}
                    onChange={(e) => setCmsSettings({ ...cmsSettings, schoolName: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#F8FAFC] border border-sky-200 text-slate-800 focus:border-[#00A3E0] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#002B66] font-semibold mb-1">Hero Primary Headline</label>
                  <input
                    type="text"
                    value={cmsSettings.heroHeadline}
                    onChange={(e) => setCmsSettings({ ...cmsSettings, heroHeadline: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#F8FAFC] border border-sky-200 text-slate-800 focus:border-[#00A3E0] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#002B66] font-semibold mb-1">Hero Supporting Line</label>
                  <input
                    type="text"
                    value={cmsSettings.heroSupportingLine}
                    onChange={(e) => setCmsSettings({ ...cmsSettings, heroSupportingLine: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#F8FAFC] border border-sky-200 text-slate-800 focus:border-[#00A3E0] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#002B66] font-semibold mb-1">Public Phone (Verified)</label>
                    <input
                      type="text"
                      value={cmsSettings.phone}
                      onChange={(e) => setCmsSettings({ ...cmsSettings, phone: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-[#F8FAFC] border border-sky-200 text-slate-800 focus:border-[#00A3E0] focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#002B66] font-semibold mb-1">Admissions Phone</label>
                    <input
                      type="text"
                      value={cmsSettings.admissionsPhone}
                      onChange={(e) => setCmsSettings({ ...cmsSettings, admissionsPhone: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-[#F8FAFC] border border-sky-200 text-slate-800 focus:border-[#00A3E0] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#002B66] font-semibold mb-1">Campus Location Address (Verified)</label>
                  <input
                    type="text"
                    value={cmsSettings.locationAddress}
                    onChange={(e) => setCmsSettings({ ...cmsSettings, locationAddress: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#F8FAFC] border border-sky-200 text-slate-800 focus:border-[#00A3E0] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#002B66] font-semibold mb-1">Announcement Banner</label>
                  <input
                    type="text"
                    value={cmsSettings.announcementBanner}
                    onChange={(e) => setCmsSettings({ ...cmsSettings, announcementBanner: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#F8FAFC] border border-sky-200 text-slate-800 focus:border-[#00A3E0] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#002B66] font-semibold mb-1">Instagram Profile URL</label>
                  <input
                    type="text"
                    value={cmsSettings.instagramUrl}
                    onChange={(e) => setCmsSettings({ ...cmsSettings, instagramUrl: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#F8FAFC] border border-sky-200 text-slate-800 focus:border-[#00A3E0] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </form>
        )}

        {/* TAB 4: ANALYTICS & CONVERSION FUNNEL */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl bg-white border border-sky-200 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-[#002B66] mb-2">
                Admissions Conversion Funnel Performance
              </h3>
              <p className="text-xs text-slate-500">
                Visualizing parent progression from first website visit to confirmed enrollment.
              </p>

              <div className="mt-8 space-y-4 max-w-2xl">
                {[
                  { step: '1. Website Visitors', count: '100%', color: 'bg-[#002B66]' },
                  { step: '2. Engaged Campus Explorers (3D / Hotspots)', count: '64%', color: 'bg-[#003B8E]' },
                  { step: '3. Admissions Page / Visit Form Reached', count: '38%', color: 'bg-[#0284C7]' },
                  { step: '4. Qualified Enquiries Submitted', count: '18%', color: 'bg-[#00A3E0]' },
                  { step: '5. In-Person Campus Walkthroughs', count: '12%', color: 'bg-[#38BDF8]' },
                  { step: '6. Confirmed School Admissions', count: '8%', color: 'bg-emerald-500' }
                ].map((funnel, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-700 font-semibold">{funnel.step}</span>
                      <span className="font-mono text-[#002B66] font-bold">{funnel.count}</span>
                    </div>
                    <div className="h-2.5 w-full bg-sky-100 rounded-full overflow-hidden">
                      <div className={`h-full ${funnel.color} rounded-full`} style={{ width: funnel.count }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
