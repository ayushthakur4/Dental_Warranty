import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import CardForm from './components/CardForm';
import WarrantyCard from './components/WarrantyCard';
import BackCard from './components/BackCard';
import * as htmlToImage from 'html-to-image';

function App() {
  const [cardData, setCardData] = useState({
    date: new Date().toISOString().slice(0,10),
    slNo: '',
    doctor: '',
    patient: '',
    typeOfWork: '',
    warranty: '',
    toothNo: '',
  });

  const [activeTab, setActiveTab] = useState('front');
  const componentRef = useRef();
  const backRef = useRef();
  
  // Developer info
  const DEV_NAME = 'Ayush Thakur';
  const DEV_EMAIL = 'thakurayush9550@gmail.com';

  // Convert mm to CSS pixels
  const mmToCssPx = (mm) => (mm / 25.4) * 96;

  // Helper: render a DOM node to JPEG
  const renderNodeToJpeg = async (node, widthMm, heightMm, bg = '#FFFFFF', pixelRatio = 3, quality = 0.95) => {
    const cssW = Math.round(mmToCssPx(widthMm));
    const cssH = Math.round(mmToCssPx(heightMm));
    return await htmlToImage.toJpeg(node, {
      pixelRatio,
      canvasWidth: cssW,
      canvasHeight: cssH,
      backgroundColor: bg,
      width: cssW,
      height: cssH,
      quality,
      style: {
        transform: 'none',
        WebkitTransform: 'none',
        position: 'static',
        left: '0',
        top: '0',
        width: `${cssW}px`,
        height: `${cssH}px`,
        zoom: '1',
      },
    });
  };

  const handlePrint = useReactToPrint({
    content: () => activeTab === 'front' ? componentRef.current : backRef.current,
    documentTitle: 'WarrantyCard',
    pageStyle: `
      @page { size: 85.6mm 54.0mm; margin: 0; }
      html, body { margin: 0; padding: 0; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    `,
  });

  const exportJpeg = async () => {
    const node = activeTab === 'front' ? componentRef.current : backRef.current;
    if (!node) return;
    
    const WIDTH_MM = 85.6;
    const HEIGHT_MM = 54.0;
    const dataUrl = await renderNodeToJpeg(node, WIDTH_MM, HEIGHT_MM, '#FFFFFF', 3, 0.95);
    const link = document.createElement('a');
    link.download = `warranty-${activeTab}-${Date.now()}.jpeg`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between p-4 mb-6 bg-white rounded-xl shadow-md">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center text-lg font-bold mr-3">
              <ToothIcon />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Dental Warranty Card Generator</h1>
              <p className="text-sm text-gray-600">Create professional dental warranty cards</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="hidden md:flex flex-col items-end mr-4">
              <span className="text-sm font-medium text-gray-700">{DEV_NAME}</span>
              <a href={`mailto:${DEV_EMAIL}`} className="text-xs text-blue-600 hover:underline">{DEV_EMAIL}</a>
            </div>
            <a
              href={`mailto:${DEV_EMAIL}`}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium shadow-md hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              Contact
            </a>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form Panel */}
          <div className="w-full lg:w-1/3">
            <CardForm cardData={cardData} setCardData={setCardData} />
            
            <div className="mt-6 p-5 bg-white rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Export Options</h3>
              
              <div className="flex mb-4 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('front')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'front' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'}`}
                >
                  Front Side
                </button>
                <button
                  onClick={() => setActiveTab('back')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'back' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'}`}
                >
                  Back Side
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={handlePrint}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium shadow-md hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center"
                >
                  <PrinterIcon className="mr-2" />
                  Print {activeTab === 'front' ? 'Front' : 'Back'}
                </button>
                
                <button
                  onClick={exportJpeg}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium shadow-md hover:from-purple-600 hover:to-purple-700 transition-all flex items-center justify-center"
                >
                  <DownloadIcon className="mr-2" />
                  Save as JPEG
                </button>
              </div>
            </div>
          </div>

          {/* Card Preview */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Card Preview</h2>
              
              <div className="flex justify-center">
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="scale-90 md:scale-100 origin-top">
                    {activeTab === 'front' ? (
                      <WarrantyCard ref={componentRef} cardData={cardData} />
                    ) : (
                      <BackCard ref={backRef} />
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center text-sm text-gray-500">
                <p>Standard ID card size: 85.6mm × 54.0mm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// SVG Icons
const ToothIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 13C7 13 6.3 13.4 5.5 13.4C4.7 13.4 4 13 4 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 10C17 10 16.3 10.4 15.5 10.4C14.7 10.4 14 10 14 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 14C17 14 16.3 14.4 15.5 14.4C14.7 14.4 14 14 14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 10C10 10 9.3 10.4 8.5 10.4C7.7 10.4 7 10 7 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 14C10 14 9.3 14.4 8.5 14.4C7.7 14.4 7 14 7 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 10V14C22 17 20 19 17 19H7C4 19 2 17 2 14V10C2 7 4 5 7 5H17C20 5 22 7 22 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PrinterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9V3H18V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 17H4C3.46957 17 2.96086 16.7893 2.58579 16.4142C2.21071 16.0391 2 15.5304 2 15V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V15C22 15.5304 21.7893 16.0391 21.4142 16.4142C21.0391 16.7893 20.5304 17 20 17H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 13H6V21H18V13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default App;