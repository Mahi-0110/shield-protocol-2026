import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  Hash,
  IndianRupee,
  Calendar,
  Upload,
  CheckCircle2,
  AlertCircle,
  Lock,
  ArrowRight,
  FileImage,
  X,
} from 'lucide-react';
import { PAYMENT_CONFIG } from '../../config/paymentConfig';
import { submitPayment } from '../../services/paymentService';

export interface SubmissionData {
  email: string;
  phone: string;
  transactionId: string;
  amount: number;
  paymentDate: string;
  screenshotName?: string;
  registrationId?: string;
}

interface TransactionFormProps {
  onSubmitSuccess: (data: SubmissionData) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmitSuccess }) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    transactionId: '',
    amount: PAYMENT_CONFIG.registrationFee,
    paymentDate: todayStr,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    const cleanEmail = formData.email.trim();
    const cleanPhone = formData.phone.trim();
    const cleanTxId = formData.transactionId.trim();

    if (!cleanEmail || !/\S+@\S+\.\S+/.test(cleanEmail)) {
      errs.email = 'Please enter a valid registration email address';
    }
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!cleanTxId || cleanTxId.length < 8) {
      errs.transactionId = 'Please enter valid UTR / Transaction ID (min 8-12 digits)';
    }
    if (!formData.amount || Number(formData.amount) <= 0) {
      errs.amount = 'Please enter valid amount';
    }
    if (!selectedFile) {
      errs.screenshot = 'Payment receipt image screenshot is required';
    }
    return errs;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
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
      const cleanEmail = formData.email.trim();
      const cleanPhone = formData.phone.trim();
      const cleanTxId = formData.transactionId.trim();

      const { registrationId } = await submitPayment({
        email: cleanEmail,
        phone: cleanPhone,
        transactionId: cleanTxId,
        amount: Number(formData.amount),
        paymentDate: formData.paymentDate,
        screenshotFile: selectedFile || undefined,
      });

      setLoading(false);
      onSubmitSuccess({
        email: cleanEmail,
        phone: cleanPhone,
        transactionId: cleanTxId,
        amount: Number(formData.amount),
        paymentDate: formData.paymentDate,
        screenshotName: selectedFile ? selectedFile.name : undefined,
        registrationId,
      });
    } catch (err: any) {
      setLoading(false);
      setErrors({ form: err.message || 'Error submitting payment details. Please try again.' });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="glass-card p-6 sm:p-10 border border-blue-primary/30 relative overflow-hidden backdrop-blur-xl bg-bg-secondary/80 rounded-3xl">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-primary via-blue-accent to-blue-primary" />

        {/* Form Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-sora font-bold text-2xl text-white">
              Already Paid? Submit Transaction Details
            </h2>
            <p className="text-muted text-xs sm:text-sm font-outfit mt-1">
              Provide your payment UTR / Transaction reference ID to initiate verification.
            </p>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-primary/10 border border-blue-primary/30 text-blue-accent text-xs font-space">
            <Lock size={13} /> 256-Bit SSL Encrypted
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Field 1: Registration Email */}
            <div>
              <label className="block text-xs font-space font-semibold text-white uppercase tracking-wider mb-2">
                Registration Email <span className="text-blue-accent">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                  <Mail size={17} />
                </div>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3.5 rounded-xl input-cyber text-sm ${
                    errors.email ? 'border-red-500/80 focus:border-red-500' : ''
                  }`}
                />
              </div>
              {errors.email && (
                <span className="text-[11px] font-space text-red-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.email}
                </span>
              )}
            </div>

            {/* Field 2: Phone Number */}
            <div>
              <label className="block text-xs font-space font-semibold text-white uppercase tracking-wider mb-2">
                Phone Number <span className="text-blue-accent">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                  <Phone size={17} />
                </div>
                <input
                  type="tel"
                  required
                  placeholder="+91 82972 93834"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3.5 rounded-xl input-cyber text-sm ${
                    errors.phone ? 'border-red-500/80 focus:border-red-500' : ''
                  }`}
                />
              </div>
              {errors.phone && (
                <span className="text-[11px] font-space text-red-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.phone}
                </span>
              )}
            </div>

            {/* Field 3: Transaction ID (UTR) */}
            <div>
              <label className="block text-xs font-space font-semibold text-white uppercase tracking-wider mb-2">
                Transaction ID (UTR / Reference No.) <span className="text-blue-accent">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                  <Hash size={17} />
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. 405612345678"
                  value={formData.transactionId}
                  onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3.5 rounded-xl input-cyber font-mono text-sm uppercase tracking-wider ${
                    errors.transactionId ? 'border-red-500/80 focus:border-red-500' : ''
                  }`}
                />
              </div>
              {errors.transactionId ? (
                <span className="text-[11px] font-space text-red-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.transactionId}
                </span>
              ) : (
                <span className="text-[11px] font-space text-muted/70 mt-1.5 block">
                  12-digit UTR found in UPI payment receipt details.
                </span>
              )}
            </div>

            {/* Field 4: Amount Paid */}
            <div>
              <label className="block text-xs font-space font-semibold text-white uppercase tracking-wider mb-2">
                Amount Paid ({PAYMENT_CONFIG.currency}) <span className="text-blue-accent">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                  <IndianRupee size={17} />
                </div>
                <input
                  type="number"
                  readOnly
                  value={formData.amount}
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl input-cyber text-sm bg-white/5 font-mono font-bold text-blue-accent cursor-not-allowed"
                />
              </div>
            </div>

            {/* Field 5: Payment Date */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-space font-semibold text-white uppercase tracking-wider mb-2">
                Payment Date <span className="text-blue-accent">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                  <Calendar size={17} />
                </div>
                <input
                  type="date"
                  value={formData.paymentDate}
                  onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl input-cyber text-sm"
                />
              </div>
            </div>
          </div>

          {/* Field 6: Screenshot Upload (Required) */}
          <div>
            <label className="block text-xs font-space font-semibold text-white uppercase tracking-wider mb-2">
              Payment Screenshot <span className="text-blue-accent">* (Required)</span>
            </label>

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer bg-bg-primary/40 ${
                dragActive
                  ? 'border-blue-primary bg-blue-primary/10'
                  : selectedFile
                  ? 'border-success/50 bg-success/5'
                  : errors.screenshot
                  ? 'border-red-500 bg-red-500/5'
                  : 'border-white/10 hover:border-blue-primary/40'
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              {selectedFile ? (
                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-success/10 text-success">
                      <FileImage size={22} />
                    </div>
                    <div className="text-left">
                      <span className="font-space font-semibold text-xs text-white block truncate max-w-xs sm:max-w-md">
                        {selectedFile.name}
                      </span>
                      <span className="text-[11px] text-muted font-mono">
                        {(selectedFile.size / 1024).toFixed(1)} KB • Ready to upload
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                    }}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-muted hover:text-red-400 transition"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <div className="p-3 rounded-2xl bg-blue-primary/10 text-blue-accent mb-2">
                    <Upload size={22} />
                  </div>
                  <span className="font-space font-medium text-xs text-white">
                    Drag and drop payment receipt image, or <span className="text-blue-accent underline">browse</span>
                  </span>
                  <span className="text-[11px] text-muted font-outfit mt-1">
                    Supports PNG, JPG, JPEG up to 5MB
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-8 rounded-2xl glow-btn text-white font-space font-bold text-base flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(14,165,233,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Payment Credentials...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={20} />
                  <span>Verify My Payment</span>
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
