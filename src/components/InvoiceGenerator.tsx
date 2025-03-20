import React, { useState } from 'react';
import { useAuthStore, useInvoiceStore } from '../lib/store';
import { Building2, User, DollarSign, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InvoiceForm from './InvoiceForm';
import InvoicePreview from './InvoicePreview';
import StepIndicator from './StepIndicator';
import SignatureModal from './SignatureModal';
import { toast } from 'react-hot-toast';

export type InvoiceData = {
  from: {
    businessName: string;
    address: string;
    email: string;
    phone: string;
  };
  to: {
    clientName: string;
    address: string;
    email: string;
    phone: string;
  };
  payment: {
    bankName: string;
    accountNumber: string;
    swiftCode: string;
  };
  details: {
    invoiceNumber: string;
    date: string;
    dueDate: string;
    items: Array<{
      description: string;
      quantity: number;
      rate: number;
      amount: number;
    }>;
  };
};

const InvoiceGenerator = () => {
  const { addInvoice, markAsSent } = useInvoiceStore();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [signature, setSignature] = useState<string>('');
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    from: {
      businessName: '',
      address: '',
      email: '',
      phone: '',
    },
    to: {
      clientName: '',
      address: '',
      email: '',
      phone: '',
    },
    payment: {
      bankName: '',
      accountNumber: '',
      swiftCode: '',
    },
    details: {
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: [
        {
          description: '',
          quantity: 1,
          rate: 0,
          amount: 0,
        },
      ],
    },
  });

  const steps = [
    { icon: Building2, title: 'Business Details' },
    { icon: User, title: 'Client Details' },
    { icon: DollarSign, title: 'Invoice Items' },
    { icon: Send, title: 'Review & Send' },
  ];

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSend = () => {
    setIsSignatureModalOpen(true);
  };

  const handleSignatureCapture = (signatureData: string) => {
    setSignature(signatureData);
    setIsSignatureModalOpen(false);

    // Save invoice and mark as sent
    const newInvoice = addInvoice(invoiceData, signatureData);
    if (newInvoice) {
      markAsSent(newInvoice.id);
      toast.success('Invoice sent successfully!');
      navigate('/dashboard');
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <StepIndicator steps={steps} currentStep={currentStep} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <InvoiceForm
            currentStep={currentStep}
            invoiceData={invoiceData}
            setInvoiceData={setInvoiceData}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSend={handleSend}
          />
        </div>

        <div className="lg:sticky lg:top-6 space-y-6">
          <InvoicePreview
            invoiceData={invoiceData}
            signature={signature}
          />
        </div>
      </div>

      <SignatureModal
        isOpen={isSignatureModalOpen}
        onClose={() => setIsSignatureModalOpen(false)}
        onSignatureCapture={handleSignatureCapture}
      />
    </div>
  );
};

export default InvoiceGenerator;