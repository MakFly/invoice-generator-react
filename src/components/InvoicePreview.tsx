import React from 'react';
import { InvoiceData } from '../App';
import { Building2 } from 'lucide-react';

type Props = {
  invoiceData: InvoiceData;
  signature?: string;
};

const InvoicePreview: React.FC<Props> = ({ invoiceData, signature }) => {
  const total = invoiceData.details.items.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      {/* En-tête */}
      <div className="flex justify-between items-start border-b border-gray-200 pb-8">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-3 rounded-lg">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{invoiceData.from.businessName || 'Your Business Name'}</h1>
            <p className="text-sm text-gray-500 mt-1">{invoiceData.from.address}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-blue-600 mb-2">INVOICE</div>
          <div className="text-sm text-gray-600">
            <div className="mb-1">
              <span className="font-medium">Invoice No:</span> {invoiceData.details.invoiceNumber}
            </div>
            <div className="mb-1">
              <span className="font-medium">Date:</span> {invoiceData.details.date}
            </div>
            <div>
              <span className="font-medium">Due Date:</span> {invoiceData.details.dueDate}
            </div>
          </div>
        </div>
      </div>

      {/* Informations client et entreprise */}
      <div className="grid grid-cols-2 gap-12 py-8 border-b border-gray-200">
        <div>
          <h2 className="text-sm font-semibold text-gray-500 mb-3">FROM</h2>
          <div className="space-y-1">
            <p className="font-medium">{invoiceData.from.businessName}</p>
            <p className="text-gray-600">{invoiceData.from.address}</p>
            <p className="text-gray-600">{invoiceData.from.email}</p>
            <p className="text-gray-600">{invoiceData.from.phone}</p>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-500 mb-3">BILL TO</h2>
          <div className="space-y-1">
            <p className="font-medium">{invoiceData.to.clientName}</p>
            <p className="text-gray-600">{invoiceData.to.address}</p>
            <p className="text-gray-600">{invoiceData.to.email}</p>
            <p className="text-gray-600">{invoiceData.to.phone}</p>
          </div>
        </div>
      </div>

      {/* Tableau des prestations */}
      <div className="py-8 border-b border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="text-sm text-gray-600">
              <th className="py-3 pl-4 text-left bg-gray-50 rounded-l-lg">Description</th>
              <th className="py-3 text-right bg-gray-50">Quantity</th>
              <th className="py-3 text-right bg-gray-50">Rate</th>
              <th className="py-3 pr-4 text-right bg-gray-50 rounded-r-lg">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {invoiceData.details.items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="py-4 pl-4">{item.description}</td>
                <td className="py-4 text-right">{item.quantity}</td>
                <td className="py-4 text-right">${item.rate.toFixed(2)}</td>
                <td className="py-4 pr-4 text-right">${item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totaux */}
      <div className="py-6 border-b border-gray-200">
        <div className="flex justify-end">
          <div className="w-64">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Tax (0%):</span>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="flex justify-between py-3 text-lg font-bold border-t border-gray-200">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pied de page */}
      <div className="pt-8 space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Payment Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-medium">Bank Name:</p>
              <p>{invoiceData.payment.bankName || 'Not specified'}</p>
            </div>
            <div>
              <p className="font-medium">Account Number:</p>
              <p>{invoiceData.payment.accountNumber || 'Not specified'}</p>
            </div>
            <div>
              <p className="font-medium">SWIFT Code:</p>
              <p>{invoiceData.payment.swiftCode || 'Not specified'}</p>
            </div>
            <div>
              <p className="font-medium">Due Date:</p>
              <p>{invoiceData.details.dueDate}</p>
            </div>
          </div>
        </div>

        {signature && (
          <div className="border-t pt-6">
            <div className="text-sm text-gray-600 mb-2">Authorized Signature:</div>
            <img src={signature} alt="Signature" className="max-h-20" />
          </div>
        )}

        <div className="text-xs text-gray-500 text-center pt-4 border-t">
          <p>This invoice was generated electronically and is valid without a physical signature.</p>
          <p className="mt-1">All payments should be made within {new Date(invoiceData.details.dueDate).getDate() - new Date(invoiceData.details.date).getDate()} days of invoice date.</p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;