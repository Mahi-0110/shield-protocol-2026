import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, CheckCircle2, AlertCircle, Hash, Calendar, IndianRupee, Upload, ShieldCheck, Lock, ArrowRight } from 'lucide-react';
import { PAYMENT_CONFIG } from '../../config/paymentConfig';
import { submitPayment } from '../../services/paymentService';
import { findRegistration } from '../../services/registrationService';

interface VerifyUTRModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (data: any) => void;
}

const VerifyUTRModal: React.FC<VerifyUTRModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [lookupQuery, setLookupQuery] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [paymentDate, setPaymentDate] = useState(todayStr);
  const [amount] = useState(PAYMENT_CONFIG.registrationFee);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedData, setSubmittedData] = useState<any | null>(null);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!lookupQuery.trim()) {
      errs.lookupQuery = 'Please enter your Registration ID, Email, or Mobile Number';
    }
    if (!transactionId || transactionId.trim().length < 8) {
      errs.transactionId = 'Please enter a valid 12-digit UTR / Reference ID';
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      // 1. Check if existing registration exists
      const existingReg = await findRegistration(lookupQuery.trim());

      if (!existingReg) {
        setLoading(false);
        setErrors({
          lookupQuery: 'No registration record found for this Email / Phone / Registration ID. Please register first or check your details.'
        });
        return;
      }

      // 2. Submit payment verification for existing registration
      const { payment, registrationId } = await submitPayment({
        email: existingReg.email,
        phone: existingReg.phone,
        transactionId: transactionId.trim(),
        amount,
        paymentDate,
        screenshotFile: selectedFile || undefined,
        registrationId: existingReg.registration_id
      });

      setLoading(false);
      const successPayload = {
        registrationId,
        participantName: existingReg.full_name,
        email: existingReg.email,
        phone: existingReg.phone,
        utrNumber: transactionId.trim(),
        amount,
        paymentDate,
        status: 'PENDING_VERIFICATION'
      };

      setSubmittedData(successPayload);
      if (onSuccess) onSuccess(successPayload);

    } catch (err: any) {
      setLoading(false);
      setErrors({ form: err.message || 'Error submitting UTR verification. Please try again.' });
    }
  };

  const handleReset = () => {
    setLookupQuery('');
    setTransactionId('');
    setSelectedFile(null);
    setErrors({});
    setSubmittedData(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-lg bg-[#051329] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(14,165,233,0.3)] my-8 text-white font-outfit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => {
              handleReset();
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted hover:text-white transition cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Title Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-sora font-bold text-xl text-white">
                Submit Payment UTR Verification
              </h3>
              <p className="text-xs text-cyan-300/80 font-space mt-0.5">
                Verify existing registration with UTR transaction ID
              </p>
            </div>
          </div>

          {submittedData ? (
            /* Success Confirmation Screen */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                <CheckCircle2 size={32} />
              </div>

              <div>
                <h4 className="font-sora font-bold text-2xl text-white">
                  UTR Submitted Successfully!
                </h4>
                <p className="text-muted text-sm mt-1">
                  Your payment verification request has been queued for admin approval.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-bg-primary/80 border border-white/10 space-y-2 text-left font-space text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-muted">Registration ID:</span>
                  <span className="font-bold text-cyan-400">{submittedData.registrationId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-muted">Participant Name:</span>
                  <span className="text-white">{submittedData.participantName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-muted">UTR / Transaction ID:</span>
                  <span className="font-mono text-cyan-300">{submittedData.utrNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-muted">Amount Submitted:</span>
                  <span className="font-mono text-emerald-400 font-bold">₹{submittedData.amount}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted">Status:</span>
                  <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[10px] uppercase font-bold">
                    Pending Admin Approval
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  handleReset();
                  onClose();
                }}
                className="w-full py-3.5 rounded-xl bg-cyan-500 text-white font-space font-bold text-sm shadow-lg hover:bg-cyan-400 transition cursor-pointer"
              >
                Done & Close
              </button>
            </div>
          ) : (
            /* UTR Submission Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.form && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-space flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{errors.form}</span>
                </div>
              )}

              {/* Field 1: Registration Search Query */}
              <div>
                <label className="block text-xs font-space font-semibold text-white uppercase tracking-wider mb-1.5">
                  Registration ID / Email / Phone <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                    <Search size={16} />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SP2026-000001 or registered email"
                    value={lookupQuery}
                    onChange={(e) => setLookupQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl input-cyber text-sm ${errors.lookupQuery ? 'border-red-500' : ''
                      }`}
                  />
                </div>
                {errors.lookupQuery ? (
                  <span className="text-[11px] font-space text-red-400 mt-1 block">
                    {errors.lookupQuery}
                  </span>
                ) : (
                  <span className="text-[10px] text-muted font-space mt-1 block">
                    Enter the Email, Phone, or Registration ID used during registration.
                  </span>
                )}
              </div>

              {/* Field 2: UTR Transaction ID */}
              <div>
                <label className="block text-xs font-space font-semibold text-white uppercase tracking-wider mb-1.5">
                  UTR / Reference Transaction ID <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                    <Hash size={16} />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 405612345678 (12 digits)"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl input-cyber font-mono text-sm uppercase tracking-wider ${errors.transactionId ? 'border-red-500' : ''
                      }`}
                  />
                </div>
                {errors.transactionId ? (
                  <span className="text-[11px] font-space text-red-400 mt-1 block">
                    {errors.transactionId}
                  </span>
                ) : (
                  <span className="text-[10px] text-muted font-space mt-1 block">
                    12-digit UTR found in GPay, PhonePe, Paytm, or Bank UPI receipt.
                  </span>
                )}
              </div>

              {/* Field 3 & 4: Amount & Date */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-space font-semibold text-white uppercase tracking-wider mb-1.5">
                    Amount Paid
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                      <IndianRupee size={15} />
                    </div>
                    <input
                      type="number"
                      readOnly
                      value={amount}
                      className="w-full pl-10 pr-3 py-3 rounded-xl input-cyber text-sm bg-white/5 font-mono font-bold text-cyan-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-space font-semibold text-white uppercase tracking-wider mb-1.5">
                    Payment Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                      <Calendar size={15} />
                    </div>
                    <input
                      type="date"
                      value={paymentDate}
                      onChange={(e) => setPaymentDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 rounded-xl input-cyber text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Field 5: Screenshot Upload */}
              <div>
                <label className="block text-xs font-space font-semibold text-white uppercase tracking-wider mb-1.5">
                  Payment Receipt Image <span className="text-muted text-[10px] lowercase">(optional)</span>
                </label>
                <div className="relative border border-dashed border-white/20 rounded-xl p-3 text-center bg-white/5">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {selectedFile ? (
                    <div className="flex items-center justify-between text-xs text-emerald-400 font-space px-2">
                      <span className="truncate max-w-[200px]">{selectedFile.name}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                        }}
                        className="text-red-400 hover:underline text-[10px]"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-xs text-muted font-space">
                      <Upload size={14} className="text-cyan-400" />
                      <span>Upload payment screenshot</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Security info */}
              <div className="flex items-center gap-1.5 text-[11px] text-muted font-space pt-1">
                <Lock size={12} className="text-cyan-400 shrink-0" />
                <span>256-Bit SSL Encrypted UTR Verification</span>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-space font-bold text-sm shadow-[0_0_25px_rgba(14,165,233,0.5)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying Registration & UTR...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={18} />
                      <span>Submit UTR For Verification</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default VerifyUTRModal;

