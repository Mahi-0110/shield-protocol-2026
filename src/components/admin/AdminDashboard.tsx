import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  IndianRupee,
  Search,
  Filter,
  Download,
  Eye,
  LogOut,
  ArrowLeft,
  ExternalLink,
  FileImage,
  RefreshCw,
  AlertTriangle,
  Mail,
} from 'lucide-react';
import {
  getAdminStats,
  getParticipantsList,
  getPaymentsList,
  approvePayment,
  rejectPayment,
  exportParticipantsCSV,
  adminLogout,
} from '../../services/adminService';
import { RegistrationRecord, PaymentRecord, AdminStats } from '../../types/database';
import ShieldLogo from '../ui/ShieldLogo';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  const [stats, setStats] = useState<AdminStats>({
    totalRegistrations: 0,
    pendingApprovals: 0,
    confirmedParticipants: 0,
    totalCollectedFee: 0,
    rejectedPayments: 0,
  });

  const [participants, setParticipants] = useState<RegistrationRecord[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Selected Detail Modal
  const [selectedParticipant, setSelectedParticipant] = useState<RegistrationRecord | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [customEmailNote, setCustomEmailNote] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const statsData = await getAdminStats();
      setStats(statsData);

      const partsData = await getParticipantsList({ searchQuery, statusFilter });
      setParticipants(partsData);

      const paysData = await getPaymentsList();
      setPayments(paysData);
    } catch (err) {
      console.error('Error loading admin dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchQuery, statusFilter]);

  const handleViewParticipant = (participant: RegistrationRecord) => {
    setSelectedParticipant(participant);
    const pay = payments.find((p) => p.registration_id === participant.registration_id);
    setSelectedPayment(pay || null);
    setShowRejectForm(false);
    setRejectReason('');
    setCustomEmailNote('');
  };

  const handleApprove = async () => {
    if (!selectedParticipant) return;
    setActionLoading(true);
    try {
      await approvePayment(
        selectedPayment?.id || '',
        selectedParticipant.registration_id,
        'Admin Organizer',
        customEmailNote,
        selectedParticipant
      );
      await loadData();
      setSelectedParticipant(null);
      setSelectedPayment(null);
      setCustomEmailNote('');
    } catch (err) {
      console.error('Approval failed:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!selectedParticipant) return;
    setActionLoading(true);
    try {
      await rejectPayment(
        selectedPayment?.id || '',
        selectedParticipant.registration_id,
        'Admin Organizer',
        rejectReason,
        selectedParticipant
      );
      await loadData();
      setSelectedParticipant(null);
      setSelectedPayment(null);
    } catch (err) {
      console.error('Rejection failed:', err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary text-white font-outfit p-4 sm:p-8 relative overflow-x-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-10 pointer-events-none" />

      {/* Top Header */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <ShieldLogo size={42} animated glow />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-sora font-extrabold text-xl sm:text-2xl text-white">
                Admin Verification Dashboard
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-primary/10 border border-blue-primary/30 text-blue-accent text-[10px] font-space font-semibold uppercase">
                Live Console
              </span>
            </div>
            <p className="text-xs text-muted font-space">
              The Shield Protocol 2026 • Supabase Database Control & Manual Payment Verification
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => exportParticipantsCSV()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 text-xs font-space font-semibold transition-all cursor-pointer"
          >
            <Download size={14} /> Export CSV
          </button>

          <button
            onClick={onBackToSite}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/10 text-muted hover:text-white text-xs font-space transition-all cursor-pointer"
          >
            <ArrowLeft size={14} /> Public Website
          </button>

          <button
            onClick={() => {
              adminLogout();
              onBackToSite();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-space transition-all cursor-pointer"
          >
            <LogOut size={14} /> Exit Admin
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* KPI Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-card p-5 border border-white/10 rounded-2xl">
            <div className="flex items-center justify-between text-muted mb-2">
              <span className="text-xs font-space font-semibold uppercase">Total Registrations</span>
              <Users size={18} className="text-blue-accent" />
            </div>
            <div className="font-sora font-extrabold text-2xl sm:text-3xl text-white">
              {stats.totalRegistrations}
            </div>
          </div>

          <div className="glass-card p-5 border border-amber-500/30 rounded-2xl bg-amber-500/5">
            <div className="flex items-center justify-between text-amber-400 mb-2">
              <span className="text-xs font-space font-semibold uppercase">Pending Verification</span>
              <Clock size={18} />
            </div>
            <div className="font-sora font-extrabold text-2xl sm:text-3xl text-amber-400">
              {stats.pendingApprovals}
            </div>
          </div>

          <div className="glass-card p-5 border border-emerald-500/30 rounded-2xl bg-emerald-500/5">
            <div className="flex items-center justify-between text-emerald-400 mb-2">
              <span className="text-xs font-space font-semibold uppercase">Confirmed Attendees</span>
              <CheckCircle2 size={18} />
            </div>
            <div className="font-sora font-extrabold text-2xl sm:text-3xl text-emerald-400">
              {stats.confirmedParticipants}
            </div>
          </div>

          <div className="glass-card p-5 border border-blue-primary/30 rounded-2xl bg-blue-primary/5">
            <div className="flex items-center justify-between text-blue-accent mb-2">
              <span className="text-xs font-space font-semibold uppercase">Verified Revenue</span>
              <IndianRupee size={18} />
            </div>
            <div className="font-sora font-extrabold text-2xl sm:text-3xl text-white">
              ₹{stats.totalCollectedFee.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="glass-card p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search by ID, Name, Email, Phone, College..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted/60 text-xs font-outfit focus:outline-none focus:border-blue-primary"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto">
            <Filter size={14} className="text-muted shrink-0" />
            <span className="text-xs font-space text-muted shrink-0">Filter Status:</span>
            {['ALL', 'CONFIRMED', 'PAYMENT_SUBMITTED', 'PARTIAL', 'REJECTED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-space font-medium transition-all shrink-0 cursor-pointer ${
                  statusFilter === st
                    ? 'bg-blue-primary text-white shadow-[0_0_15px_rgba(14,165,233,0.5)]'
                    : 'glass text-muted hover:text-white border border-white/10'
                }`}
              >
                {st}
              </button>
            ))}

            <button
              onClick={loadData}
              className="p-2 rounded-xl glass border border-white/10 text-muted hover:text-white transition-all cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Participants Table */}
        <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-outfit">
              <thead className="bg-white/5 text-muted font-space uppercase tracking-wider text-[11px] border-b border-white/10">
                <tr>
                  <th className="p-4">Reg ID</th>
                  <th className="p-4">Participant Details</th>
                  <th className="p-4">College & Dept</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {participants.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-muted font-space">
                      No matching participant records found.
                    </td>
                  </tr>
                ) : (
                  participants.map((p) => {
                    const pay = payments.find((pm) => pm.registration_id === p.registration_id);
                    return (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-mono font-bold text-blue-accent">
                          {p.registration_id}
                        </td>
                        <td className="p-4">
                          <div className="font-semibold text-white">{p.full_name}</div>
                          <div className="text-muted text-[11px]">{p.email} • {p.phone}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-white font-medium">{p.department}</div>
                          <div className="text-muted text-[11px]">{p.year}</div>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-space font-semibold uppercase inline-block ${
                              p.status === 'CONFIRMED'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : p.status === 'PAYMENT_SUBMITTED'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                                : p.status === 'REJECTED'
                                ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                                : 'bg-blue-primary/10 text-blue-accent border border-blue-primary/30'
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="p-4">
                          {pay ? (
                            <div>
                              <div className="font-mono text-white text-[11px]">UTR: {pay.utr_number}</div>
                              <div className="text-emerald-400 font-bold text-[11px]">₹{pay.amount}</div>
                            </div>
                          ) : (
                            <span className="text-muted italic text-[11px]">No proof uploaded</span>
                          )}
                        </td>
                        <td className="p-4 text-muted text-[11px]">
                          {new Date(p.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleViewParticipant(p)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glow-btn text-white text-xs font-space font-semibold cursor-pointer"
                          >
                            <Eye size={12} /> View & Verify
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Verification Drawer / Modal */}
      <AnimatePresence>
        {selectedParticipant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl bg-bg-primary/80 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl glass-card p-6 sm:p-8 rounded-3xl border border-blue-primary/40 shadow-[0_0_50px_rgba(14,165,233,0.3)] my-8"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <span className="text-xs font-space text-blue-accent uppercase tracking-wider font-semibold">
                    Payment Verification Detail
                  </span>
                  <h2 className="font-sora font-extrabold text-2xl text-white">
                    {selectedParticipant.full_name}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedParticipant(null)}
                  className="p-2 text-muted hover:text-white glass rounded-xl border border-white/10"
                >
                  <XCircle size={20} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6 font-outfit text-sm">
                {/* Left: Participant Info */}
                <div className="space-y-3 glass p-5 rounded-2xl border border-white/5">
                  <h3 className="font-space text-xs font-semibold text-muted uppercase tracking-wider">
                    Participant Details
                  </h3>
                  <div>
                    <span className="text-xs text-muted block">Registration ID</span>
                    <span className="font-mono font-bold text-blue-accent text-base">
                      {selectedParticipant.registration_id}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-muted block">Email & Phone</span>
                    <span className="text-white block">{selectedParticipant.email}</span>
                    <span className="text-white block">{selectedParticipant.phone}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted block">Department & Year</span>
                    <span className="text-white block">{selectedParticipant.department} ({selectedParticipant.year})</span>
                  </div>
                </div>

                {/* Right: Payment & UTR Info */}
                <div className="space-y-3 glass p-5 rounded-2xl border border-white/5">
                  <h3 className="font-space text-xs font-semibold text-muted uppercase tracking-wider">
                    Submitted Transaction Proof
                  </h3>
                  {selectedPayment ? (
                    <>
                      <div>
                        <span className="text-xs text-muted block">UTR / Reference Number</span>
                        <span className="font-mono font-extrabold text-emerald-400 text-lg">
                          {selectedPayment.utr_number}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <span className="text-xs text-muted block">Amount Paid</span>
                          <span className="font-bold text-white">₹{selectedPayment.amount}</span>
                        </div>
                        <div>
                          <span className="text-xs text-muted block">Payment Date</span>
                          <span className="text-white">{selectedPayment.payment_date}</span>
                        </div>
                      </div>

                      {/* Screenshot Preview */}
                      <div>
                        <span className="text-xs text-muted block mb-1">Screenshot Proof</span>
                        {selectedPayment.payment_screenshot ? (
                          <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-black/40 h-40 flex items-center justify-center">
                            <img
                              src={selectedPayment.payment_screenshot}
                              alt="Payment Proof"
                              className="max-h-full max-w-full object-contain"
                            />
                            <a
                              href={selectedPayment.payment_screenshot}
                              target="_blank"
                              rel="noreferrer"
                              className="absolute inset-0 bg-bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-space text-xs font-bold"
                            >
                              <ExternalLink size={16} /> Open High-Res Image
                            </a>
                          </div>
                        ) : (
                          <div className="p-4 rounded-xl bg-white/5 text-muted text-xs font-space text-center">
                            No screenshot image attached
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="p-6 text-center text-muted text-xs font-space">
                      No payment transaction record submitted yet.
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              {showRejectForm ? (
                <div className="space-y-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/30">
                  <label className="block text-xs font-space text-red-400 font-semibold uppercase">
                    Reason for Rejection (Included in Email #4)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Invalid UTR number / Blurred screenshot"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="w-full p-3 rounded-xl bg-bg-secondary border border-red-500/40 text-white text-xs font-outfit focus:outline-none"
                  />
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowRejectForm(false)}
                      className="px-4 py-2 rounded-xl glass text-xs font-space text-muted"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleReject}
                      disabled={actionLoading}
                      className="px-5 py-2 rounded-xl bg-red-500 text-white text-xs font-space font-bold hover:bg-red-600 transition"
                    >
                      {actionLoading ? 'Rejecting...' : 'Confirm Rejection'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div>
                    <label className="block text-xs font-space font-semibold text-emerald-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Mail size={14} /> Custom Email Note / Special Instructions for Participant (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Welcome! Please report to Hall B at 8:30 AM with your college photo ID. Team seat reserved."
                      value={customEmailNote}
                      onChange={(e) => setCustomEmailNote(e.target.value)}
                      className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-outfit focus:outline-none focus:border-emerald-500/50 resize-none placeholder:text-muted/50"
                    />
                    <span className="text-[10px] text-muted font-space block mt-1">
                      This custom note will be included directly in the participant's Confirmation Email (#3).
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-2">
                    <button
                      onClick={() => setShowRejectForm(true)}
                      disabled={actionLoading}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl glass border border-red-500/40 text-red-400 hover:bg-red-500/10 font-space font-bold text-xs transition cursor-pointer"
                    >
                      Reject Payment
                    </button>

                    <button
                      onClick={handleApprove}
                      disabled={actionLoading}
                      className="w-full sm:w-auto px-8 py-3 rounded-xl glow-btn text-white font-space font-bold text-xs shadow-[0_0_20px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {actionLoading ? (
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <CheckCircle2 size={16} />
                          <span>Approve Payment & Confirm Registration</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
