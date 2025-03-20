import React, { useRef, useState } from 'react';
import SignaturePad from 'react-signature-canvas';
import { X, Pen, Type, Key } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSignatureCapture: (signature: string) => void;
};

type TabType = 'draw' | 'type' | 'docusign';

const fonts = [
  { name: 'Signature', family: "'Dancing Script', cursive" },
  { name: 'Elegant', family: "'Great Vibes', cursive" },
  { name: 'Professional', family: "'Alex Brush', cursive" },
];

const SignatureModal: React.FC<Props> = ({ isOpen, onClose, onSignatureCapture }) => {
  const [activeTab, setActiveTab] = useState<TabType>('draw');
  const [typedSignature, setTypedSignature] = useState('');
  const [selectedFont, setSelectedFont] = useState(fonts[0]);
  const signaturePadRef = useRef<SignaturePad>(null);

  if (!isOpen) return null;

  const handleDrawingComplete = () => {
    if (signaturePadRef.current) {
      const dataUrl = signaturePadRef.current.toDataURL();
      onSignatureCapture(dataUrl);
    }
  };

  const handleTypedSignatureComplete = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = 600;
      canvas.height = 200;
      ctx.font = `48px ${selectedFont.family}`;
      ctx.fillStyle = 'black';
      ctx.fillText(typedSignature, 50, 100);
      onSignatureCapture(canvas.toDataURL());
    }
  };

  const handleDocuSignAuth = async () => {
    // Pour l'instant, nous affichons juste un message
    alert('DocuSign integration will be implemented in a future update.');
  };

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add Your Signature</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="border-b">
          <div className="flex">
            <button
              className={`flex items-center gap-2 px-4 py-2 border-b-2 ${
                activeTab === 'draw'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500'
              }`}
              onClick={() => setActiveTab('draw')}
            >
              <Pen className="w-4 h-4" />
              Draw
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 border-b-2 ${
                activeTab === 'type'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500'
              }`}
              onClick={() => setActiveTab('type')}
            >
              <Type className="w-4 h-4" />
              Type
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 border-b-2 ${
                activeTab === 'docusign'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500'
              }`}
              onClick={() => setActiveTab('docusign')}
            >
              <Key className="w-4 h-4" />
              DocuSign
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'draw' && (
            <div className="space-y-4">
              <div className="border rounded-lg">
                <SignaturePad
                  ref={signaturePadRef}
                  canvasProps={{
                    className: 'w-full h-64',
                    style: { width: '100%', height: '256px' }
                  }}
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={clearSignature}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Clear
                </button>
                <button
                  onClick={handleDrawingComplete}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Signature
                </button>
              </div>
            </div>
          )}

          {activeTab === 'type' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Type your signature
                </label>
                <input
                  type="text"
                  value={typedSignature}
                  onChange={(e) => setTypedSignature(e.target.value)}
                  className="w-full p-2 border rounded"
                  style={{ fontFamily: selectedFont.family }}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Choose a style
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {fonts.map((font) => (
                    <button
                      key={font.name}
                      onClick={() => setSelectedFont(font)}
                      className={`p-3 border rounded text-center ${
                        selectedFont === font
                          ? 'border-blue-500 bg-blue-50'
                          : 'hover:bg-gray-50'
                      }`}
                      style={{ fontFamily: font.family }}
                    >
                      {typedSignature || 'Preview'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleTypedSignatureComplete}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Signature
                </button>
              </div>
            </div>
          )}

          {activeTab === 'docusign' && (
            <div className="space-y-4">
              <p className="text-gray-600">
                Connect with DocuSign to use your official electronic signature.
              </p>
              <button
                onClick={handleDocuSignAuth}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <Key className="w-5 h-5" />
                Connect with DocuSign
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignatureModal;