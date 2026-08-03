import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Shield,
  ArrowRight,
  User,
  Mail,
  Phone,
  BookOpen,
  Calendar,
  Lock,
  Sparkles,
  Upload,
  Hash,
  IndianRupee,
  CheckCircle2,
  Copy,
  Check,
  FileImage,
  AlertCircle,
  QrCode,
} from 'lucide-react';
import { createRegistration } from '../../services/registrationService';
import { submitPayment } from '../../services/paymentService';
import { RegistrationRecord } from '../../types/database';
import { PAYMENT_CONFIG, getPhonePeUpiUrl, getGPayUpiUrl, getPaytmUpiUrl } from '../../config/paymentConfig';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (record: RegistrationRecord) => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const todayStr = new Date().toISOString().split('T')[0];

  // Flow Step: 1 = Pay Fee First, 2 = Enter Registration Details & UTR, 3 = Confirmation State
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    year: '3rd Year',
    transactionId: '',
    paymentDate: todayStr,
  });

  const [deptChoice, setDeptChoice] = useState('');
  const [cseSection, setCseSection] = useState('A');
  const [otherDeptText, setOtherDeptText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [copiedUpi, setCopiedUpi] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [createdRecord, setCreatedRecord] = useState<RegistrationRecord | null>(null);
  const [submittedUtr, setSubmittedUtr] = useState('');

  if (!isOpen) return null;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(PAYMENT_CONFIG.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errs.email = 'Valid Email Address is required';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      errs.phone = 'Valid 10-digit Phone Number is required';
    }
    if (!deptChoice) {
      errs.department = 'Please select a Department';
    } else if (deptChoice === 'Others' && !otherDeptText.trim()) {
      errs.department = 'Please enter your department name';
    }

    if (!formData.transactionId.trim() || formData.transactionId.trim().length < 8) {
      errs.transactionId = 'Valid UTR / Reference Transaction ID is required (min 8-12 digits)';
    }

    // Payment Screenshot is MANDATORY
    if (!selectedFile) {
      errs.screenshot = 'Payment Screenshot proof is required';
    }

    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateStep2();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    let finalDepartment = '';
    if (deptChoice === 'CSE') {
      finalDepartment = `CSE - Section ${cseSection}`;
    } else if (deptChoice === 'AIML') {
      finalDepartment = 'AIML (Artificial Intelligence & Machine Learning)';
    } else if (deptChoice === 'CS') {
      finalDepartment = 'CS (Cyber Security)';
    } else if (deptChoice === 'Others') {
      finalDepartment = otherDeptText.trim();
    }

    try {
      // 1. Create registration record
      const regRecord = await createRegistration({
        full_name: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        department: finalDepartment,
        year: formData.year,
        status: 'PAYMENT_SUBMITTED',
        payment_status: 'SUBMITTED',
      });

      // 2. Submit payment record linked with UTR & mandatory screenshot
      await submitPayment({
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        transactionId: formData.transactionId.trim(),
        amount: PAYMENT_CONFIG.registrationFee,
        paymentDate: formData.paymentDate,
        screenshotFile: selectedFile || undefined,
        registrationId: regRecord.registration_id,
      });

      setLoading(false);
      setCreatedRecord(regRecord);
      setSubmittedUtr(formData.transactionId.trim());
      setStep(3);

      if (onSuccess) onSuccess(regRecord);
    } catch (err: any) {
      setLoading(false);
      setErrors({ form: err.message || 'An error occurred during submission. Please try again.' });
    }
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      year: '3rd Year',
      transactionId: '',
      paymentDate: todayStr,
    });
    setDeptChoice('');
    setCseSection('A');
    setOtherDeptText('');
    setSelectedFile(null);
    setErrors({});
    setCreatedRecord(null);
    setSubmittedUtr('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-xl bg-bg-primary/85">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl glass-card p-6 sm:p-8 border border-blue-primary/40 rounded-3xl shadow-[0_0_50px_rgba(14,165,233,0.3)] my-8 text-white font-outfit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => {
              handleReset();
              onClose();
            }}
            className="absolute top-4 right-4 p-2.5 text-muted hover:text-white glass rounded-xl border border-white/10 hover:border-blue-primary/40 transition-all cursor-pointer z-10"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-blue-primary/10 border border-blue-primary/30 text-blue-accent">
              <Shield size={24} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-primary/10 text-blue-accent text-[10px] font-space font-semibold uppercase tracking-wider mb-1">
                <Sparkles size={10} /> Step {step} of 2
              </div>
              <h2 className="font-sora font-extrabold text-xl sm:text-2xl text-white">
                {step === 1 && 'Step 1: Pay Registration Fee'}
                {step === 2 && 'Step 2: Enter Registration & UTR Details'}
                {step === 3 && 'Registration Submitted!'}
              </h2>
            </div>
          </div>

          {/* STEP 1: PAY FEE FIRST */}
          {step === 1 && (
            <div className="space-y-6">
              <p className="text-muted text-xs sm:text-sm font-outfit leading-relaxed">
                Scan the official UPI QR code below or copy our UPI ID to pay the registration fee of{' '}
                <strong className="text-white font-bold">₹{PAYMENT_CONFIG.registrationFee}</strong>. After making payment, keep your 12-digit UTR/Reference ID and payment screenshot ready to complete registration.
              </p>

              {/* Fee & UPI Card */}
              <div className="glass p-5 rounded-2xl border border-blue-primary/30 relative overflow-hidden bg-bg-secondary/60 space-y-4">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* QR Code Graphic Display */}
                  <div className="relative shrink-0 p-4 bg-white rounded-3xl shadow-2xl border-2 border-blue-primary/40 flex flex-col items-center">
                    <img
                      src="/qr_code.jpeg"
                      alt="UPI QR Code"
                      className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-xl"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="mt-2 flex items-center gap-1.5 text-xs font-space font-bold text-gray-900">
                      <QrCode size={14} className="text-blue-primary" /> Scan to Pay ₹{PAYMENT_CONFIG.registrationFee}
                    </div>
                  </div>

                  {/* Payment Details Column */}
                  <div className="space-y-3 w-full font-space text-xs">
                    <div>
                      <span className="text-muted block text-[10px] uppercase tracking-wider">Amount Payable</span>
                      <span className="font-sora font-bold text-2xl text-blue-accent flex items-center gap-1">
                        <IndianRupee size={20} />
                        {PAYMENT_CONFIG.registrationFee}
                      </span>
                    </div>

                    <div>
                      <span className="text-muted block text-[10px] uppercase tracking-wider">Official UPI ID</span>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-cyan-300 font-mono text-xs select-all">
                          {PAYMENT_CONFIG.upiId}
                        </code>
                        <button
                          type="button"
                          onClick={handleCopyUpi}
                          className="px-2.5 py-1.5 rounded-lg bg-blue-primary/20 hover:bg-blue-primary/30 text-blue-accent border border-blue-primary/40 transition flex items-center gap-1 text-[11px] cursor-pointer"
                        >
                          {copiedUpi ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                          <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <span className="text-muted block text-[10px] uppercase tracking-wider">Payee Name</span>
                      <span className="text-white font-medium block">{PAYMENT_CONFIG.payeeName}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Payment Apps */}
                <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] text-muted font-space">Pay via any UPI App:</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={getGPayUpiUrl()}
                      className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-white border border-white/10 transition font-space"
                    >
                      GPay
                    </a>
                    <a
                      href={getPhonePeUpiUrl()}
                      className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-white border border-white/10 transition font-space"
                    >
                      PhonePe
                    </a>
                    <a
                      href={getPaytmUpiUrl()}
                      className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-white border border-white/10 transition font-space"
                    >
                      Paytm
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Button to Step 2 */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-4 px-8 rounded-2xl glow-btn text-white font-space font-bold text-base flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(14,165,233,0.5)] hover:scale-[1.01] transition cursor-pointer"
                >
                  <span>I Have Paid — Continue to Enter UTR & Details</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: ENTER REGISTRATION INFO & UTR DETAILS */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4 text-sm font-outfit">
              {errors.form && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-space flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{errors.form}</span>
                </div>
              )}

              {/* Participant Personal Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-space font-semibold uppercase tracking-wider text-cyan-400 border-b border-white/10 pb-1">
                  1. Participant Information
                </h3>

                <div className="grid sm:grid-cols-2 gap-3">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-space text-muted mb-1">
                      Full Name <span className="text-blue-accent">*</span>
                    </label>
                    <div className="relative">
                      <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Alex Morgan"
                        className={`w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border ${
                          errors.fullName ? 'border-red-500' : 'border-white/10'
                        } text-white placeholder:text-muted/40 focus:outline-none focus:border-blue-primary text-xs`}
                      />
                    </div>
                    {errors.fullName && <span className="text-[10px] text-red-400 font-space mt-0.5 block">{errors.fullName}</span>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-space text-muted mb-1">
                      Email Address <span className="text-blue-accent">*</span>
                    </label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex@example.com"
                        className={`w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border ${
                          errors.email ? 'border-red-500' : 'border-white/10'
                        } text-white placeholder:text-muted/40 focus:outline-none focus:border-blue-primary text-xs`}
                      />
                    </div>
                    {errors.email && <span className="text-[10px] text-red-400 font-space mt-0.5 block">{errors.email}</span>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-space text-muted mb-1">
                      Phone / WhatsApp <span className="text-blue-accent">*</span>
                    </label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 82972 93834"
                        className={`w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border ${
                          errors.phone ? 'border-red-500' : 'border-white/10'
                        } text-white placeholder:text-muted/40 focus:outline-none focus:border-blue-primary text-xs`}
                      />
                    </div>
                    {errors.phone && <span className="text-[10px] text-red-400 font-space mt-0.5 block">{errors.phone}</span>}
                  </div>

                  {/* Academic Year */}
                  <div>
                    <label className="block text-xs font-space text-muted mb-1">
                      Academic Year <span className="text-blue-accent">*</span>
                    </label>
                    <div className="relative">
                      <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-bg-secondary border border-white/10 text-white focus:outline-none focus:border-blue-primary text-xs appearance-none"
                      >
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="Postgraduate">Postgraduate</option>
                        <option value="Professional / Other">Professional / Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Department Selection */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-space text-muted mb-1">
                      Department / Branch <span className="text-blue-accent">*</span>
                    </label>
                    <div className="relative">
                      <BookOpen size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                      <select
                        value={deptChoice}
                        onChange={(e) => setDeptChoice(e.target.value)}
                        required
                        className={`w-full pl-9 pr-3 py-2 rounded-xl bg-bg-secondary border ${
                          errors.department ? 'border-red-500' : 'border-white/10'
                        } text-white focus:outline-none focus:border-blue-primary text-xs appearance-none`}
                      >
                        <option value="">Select Department</option>
                        <option value="CSE">CSE (Computer Science & Engineering)</option>
                        <option value="AIML">AIML (Artificial Intelligence & Machine Learning)</option>
                        <option value="CS">CS (Cyber Security)</option>
                        <option value="Others">Others (Enter Manually)</option>
                      </select>
                    </div>
                    {errors.department && <span className="text-[10px] text-red-400 font-space mt-0.5 block">{errors.department}</span>}
                  </div>

                  {deptChoice === 'CSE' && (
                    <div>
                      <label className="block text-xs font-space text-muted mb-1">
                        CSE Section <span className="text-blue-accent">*</span>
                      </label>
                      <select
                        value={cseSection}
                        onChange={(e) => setCseSection(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-bg-secondary border border-white/10 text-white focus:outline-none focus:border-blue-primary text-xs appearance-none"
                      >
                        <option value="A">Section A</option>
                        <option value="B">Section B</option>
                        <option value="C">Section C</option>
                      </select>
                    </div>
                  )}

                  {deptChoice === 'Others' && (
                    <div>
                      <label className="block text-xs font-space text-muted mb-1">
                        Enter Department <span className="text-blue-accent">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={otherDeptText}
                        onChange={(e) => setOtherDeptText(e.target.value)}
                        placeholder="Enter department name"
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted/40 focus:outline-none focus:border-blue-primary text-xs"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Details & UTR Section */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-space font-semibold uppercase tracking-wider text-cyan-400 border-b border-white/10 pb-1">
                  2. Payment Verification Details (₹{PAYMENT_CONFIG.registrationFee})
                </h3>

                <div className="grid sm:grid-cols-2 gap-3">
                  {/* UTR / Transaction ID */}
                  <div>
                    <label className="block text-xs font-space text-muted mb-1">
                      UTR / Reference No. <span className="text-blue-accent">*</span>
                    </label>
                    <div className="relative">
                      <Hash size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                      <input
                        type="text"
                        name="transactionId"
                        required
                        value={formData.transactionId}
                        onChange={handleChange}
                        placeholder="e.g. 405612345678"
                        className={`w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border ${
                          errors.transactionId ? 'border-red-500' : 'border-white/10'
                        } text-white font-mono text-xs uppercase tracking-wider focus:outline-none focus:border-blue-primary`}
                      />
                    </div>
                    {errors.transactionId ? (
                      <span className="text-[10px] text-red-400 font-space mt-0.5 block">{errors.transactionId}</span>
                    ) : (
                      <span className="text-[9px] text-muted font-space mt-0.5 block">12-digit UTR found in UPI receipt.</span>
                    )}
                  </div>

                  {/* Payment Date */}
                  <div>
                    <label className="block text-xs font-space text-muted mb-1">
                      Payment Date <span className="text-blue-accent">*</span>
                    </label>
                    <div className="relative">
                      <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                      <input
                        type="date"
                        name="paymentDate"
                        value={formData.paymentDate}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Mandatory Payment Screenshot Upload */}
                <div>
                  <label className="block text-xs font-space text-muted mb-1">
                    Payment Screenshot Proof <span className="text-blue-accent">* (Required)</span>
                  </label>
                  <div
                    className={`relative border border-dashed rounded-xl p-3 text-center transition-all bg-white/5 ${
                      errors.screenshot ? 'border-red-500/80 bg-red-500/5' : selectedFile ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-white/20 hover:border-blue-primary/40'
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />

                    {selectedFile ? (
                      <div className="flex items-center justify-between text-xs text-emerald-400 font-space px-2">
                        <div className="flex items-center gap-2 truncate max-w-[260px]">
                          <FileImage size={16} />
                          <span className="truncate">{selectedFile.name}</span>
                        </div>
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
                        <Upload size={15} className="text-blue-accent" />
                        <span>Upload payment receipt image (PNG, JPG)</span>
                      </div>
                    )}
                  </div>
                  {errors.screenshot && <span className="text-[10px] text-red-400 font-space mt-0.5 block">{errors.screenshot}</span>}
                </div>
              </div>

              {/* Form Buttons */}
              <div className="pt-3 flex items-center justify-between gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl glass border border-white/10 text-xs font-space text-muted hover:text-white transition"
                >
                  ← Back to Payment Info
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glow-btn text-white font-space font-bold text-xs shadow-[0_0_25px_rgba(14,165,233,0.5)] hover:scale-[1.02] transition cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting Registration & UTR...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Registration & UTR</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: SUBMISSION SUCCESS & CONFIRMATION */}
          {step === 3 && createdRecord && (
            <div className="space-y-6 text-center py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                <CheckCircle2 size={32} />
              </div>

              <div>
                <h3 className="font-sora font-bold text-2xl text-white">
                  Registration Submitted!
                </h3>
                <p className="text-muted text-xs sm:text-sm mt-1 max-w-md mx-auto">
                  Your registration is under manual verification. We will confirm your registration through email once approved.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-bg-primary/80 border border-white/10 space-y-2 text-left font-space text-xs max-w-md mx-auto">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-muted">Registration ID:</span>
                  <span className="font-bold text-cyan-400">{createdRecord.registration_id}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-muted">Participant Name:</span>
                  <span className="text-white">{createdRecord.full_name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-muted">Email Address:</span>
                  <span className="text-white">{createdRecord.email}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-muted">UTR / Reference ID:</span>
                  <span className="font-mono text-cyan-300">{submittedUtr}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-muted">Amount Paid:</span>
                  <span className="font-mono text-emerald-400 font-bold">₹{PAYMENT_CONFIG.registrationFee}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted">Verification Status:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[10px] uppercase font-bold">
                    Under Manual Verification
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-primary/10 border border-blue-primary/20 text-blue-accent text-xs font-outfit max-w-md mx-auto flex items-center justify-center gap-2">
                <Lock size={14} className="shrink-0" />
                <span>Our admin will verify your payment details and send your official confirmation email shortly.</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  handleReset();
                  onClose();
                }}
                className="w-full max-w-md mx-auto py-3.5 rounded-xl bg-cyan-500 text-white font-space font-bold text-sm shadow-lg hover:bg-cyan-400 transition cursor-pointer"
              >
                Done & Close
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RegistrationModal;
