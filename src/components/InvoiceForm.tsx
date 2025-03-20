import React from 'react';
import { InvoiceData } from '../App';
import { Plus, Trash2, Building2, User, DollarSign, Send, CreditCard } from 'lucide-react';

type Props = {
  currentStep: number;
  invoiceData: InvoiceData;
  setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceData>>;
  onNext: () => void;
  onPrevious: () => void;
  onSend: () => void;
};

const InvoiceForm: React.FC<Props> = ({
  currentStep,
  invoiceData,
  setInvoiceData,
  onNext,
  onPrevious,
  onSend,
}) => {
  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        items: [
          ...prev.details.items,
          { description: '', quantity: 1, rate: 0, amount: 0 },
        ],
      },
    }));
  };

  const removeItem = (index: number) => {
    setInvoiceData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        items: prev.details.items.filter((_, i) => i !== index),
      },
    }));
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    setInvoiceData((prev) => {
      const newItems = [...prev.details.items];
      newItems[index] = {
        ...newItems[index],
        [field]: value,
        amount:
          field === 'quantity' || field === 'rate'
            ? Number(value) *
              (field === 'quantity'
                ? newItems[index].rate
                : newItems[index].quantity)
            : newItems[index].amount,
      };
      return {
        ...prev,
        details: {
          ...prev.details,
          items: newItems,
        },
      };
    });
  };

  const renderBusinessDetails = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Business Details</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Name
          </label>
          <input
            type="text"
            placeholder="Enter your business name"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={invoiceData.from.businessName}
            onChange={(e) =>
              setInvoiceData((prev) => ({
                ...prev,
                from: { ...prev.from, businessName: e.target.value },
              }))
            }
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            placeholder="Enter business address"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={invoiceData.from.address}
            onChange={(e) =>
              setInvoiceData((prev) => ({
                ...prev,
                from: { ...prev.from, address: e.target.value },
              }))
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter business email"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={invoiceData.from.email}
            onChange={(e) =>
              setInvoiceData((prev) => ({
                ...prev,
                from: { ...prev.from, email: e.target.value },
              }))
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            placeholder="Enter business phone"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={invoiceData.from.phone}
            onChange={(e) =>
              setInvoiceData((prev) => ({
                ...prev,
                from: { ...prev.from, phone: e.target.value },
              }))
            }
          />
        </div>

        <div className="col-span-2 pt-4 border-t">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Payment Details</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bank Name
              </label>
              <input
                type="text"
                placeholder="Enter bank name"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={invoiceData.payment.bankName}
                onChange={(e) =>
                  setInvoiceData((prev) => ({
                    ...prev,
                    payment: { ...prev.payment, bankName: e.target.value },
                  }))
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Number
              </label>
              <input
                type="text"
                placeholder="Enter account number"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={invoiceData.payment.accountNumber}
                onChange={(e) =>
                  setInvoiceData((prev) => ({
                    ...prev,
                    payment: { ...prev.payment, accountNumber: e.target.value },
                  }))
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SWIFT Code
              </label>
              <input
                type="text"
                placeholder="Enter SWIFT code"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={invoiceData.payment.swiftCode}
                onChange={(e) =>
                  setInvoiceData((prev) => ({
                    ...prev,
                    payment: { ...prev.payment, swiftCode: e.target.value },
                  }))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClientDetails = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-600 p-2 rounded-lg">
          <User className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Client Details</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client Name
          </label>
          <input
            type="text"
            placeholder="Enter client name"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={invoiceData.to.clientName}
            onChange={(e) =>
              setInvoiceData((prev) => ({
                ...prev,
                to: { ...prev.to, clientName: e.target.value },
              }))
            }
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            placeholder="Enter client address"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={invoiceData.to.address}
            onChange={(e) =>
              setInvoiceData((prev) => ({
                ...prev,
                to: { ...prev.to, address: e.target.value },
              }))
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter client email"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={invoiceData.to.email}
            onChange={(e) =>
              setInvoiceData((prev) => ({
                ...prev,
                to: { ...prev.to, email: e.target.value },
              }))
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            placeholder="Enter client phone"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={invoiceData.to.phone}
            onChange={(e) =>
              setInvoiceData((prev) => ({
                ...prev,
                to: { ...prev.to, phone: e.target.value },
              }))
            }
          />
        </div>
      </div>
    </div>
  );

  const renderInvoiceItems = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-600 p-2 rounded-lg">
          <DollarSign className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Invoice Items</h2>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700 mb-2">
          <div className="col-span-5">Description</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-2 text-center">Rate</div>
          <div className="col-span-2 text-center">Amount</div>
          <div className="col-span-1"></div>
        </div>

        {invoiceData.details.items.map((item, index) => (
          <div key={index} className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-5">
              <input
                type="text"
                placeholder="Item description"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={item.description}
                onChange={(e) => updateItem(index, 'description', e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <input
                type="number"
                min="1"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
                value={item.quantity}
                onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
              />
            </div>
            <div className="col-span-2">
              <input
                type="number"
                min="0"
                step="0.01"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
                value={item.rate}
                onChange={(e) => updateItem(index, 'rate', Number(e.target.value))}
              />
            </div>
            <div className="col-span-2">
              <div className="w-full p-2.5 bg-gray-50 rounded-lg text-center">
                ${item.amount.toFixed(2)}
              </div>
            </div>
            <div className="col-span-1 flex justify-center">
              <button
                onClick={() => removeItem(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={addItem}
          className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Item
        </button>
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Send className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Review & Send</h2>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
        <h3 className="text-lg font-medium text-blue-900 mb-3">Ready to Send</h3>
        <p className="text-blue-700">
          Please review your invoice details in the preview. When you're ready, click
          the Send button to generate and send the invoice.
        </p>
        <ul className="mt-4 space-y-2 text-blue-700">
          <li>• All required information has been filled</li>
          <li>• Invoice items have been added</li>
          <li>• Preview looks correct</li>
        </ul>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return renderBusinessDetails();
      case 1:
        return renderClientDetails();
      case 2:
        return renderInvoiceItems();
      case 3:
        return renderReview();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {renderContent()}
      <div className="flex justify-between pt-6 border-t">
        {currentStep > 0 && (
          <button
            onClick={onPrevious}
            className="px-6 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Previous
          </button>
        )}
        {currentStep < 3 && (
          <button
            onClick={onNext}
            className="ml-auto px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        )}
        {currentStep === 3 && (
          <button
            onClick={onSend}
            className="ml-auto px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            Send Invoice
          </button>
        )}
      </div>
    </div>
  );
};

export default InvoiceForm;