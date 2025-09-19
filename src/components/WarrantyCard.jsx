import React from 'react';
import logo from '../assets/Logo.png';
import watermark from '../assets/watermark.png';

const WarrantyCard = React.forwardRef(({ cardData }, ref) => {
  const formatDate = (dateString) => {
    if (!dateString) return '....................';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '....................';
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return '....................';
    }
  };

  return (
    <div
      ref={ref}
      className="w-[85.6mm] h-[54.0mm] border border-gray-300 flex bg-white overflow-hidden rounded-sm shadow-sm relative"
    >
      {/* Watermark Background */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover pointer-events-none"
        style={{
          backgroundImage: `url(${watermark})`,
          opacity: 0.20,
          zIndex: 0,
        }}
      ></div>

      {/* Left Blue Stripe */}
      <div className="relative w-[7mm] h-full bg-gradient-to-b from-blue-800 to-blue-600 flex items-center justify-center rotate-180 text-white font-semibold tracking-wide text-[10px] px-1 [writing-mode:vertical-rl] z-10">
        <span className="tracking-widest">WARRANTY CARD</span>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1 p-2 flex flex-col z-10">
        {/* Header with new text and logo */}
        <div className="flex justify-between items-start mb-2">
          <div className="text-left">
            <h1 className="text-[15px] font-bold text-blue-800 uppercase tracking-wide">
              SSDC
            </h1>
            <div className="text-[10px] font-normal text-blue-800 leading-tight">
              QUALITY FOR BETTER TEETH
            </div>
            <div className="h-px w-12 bg-blue-300 mt-1"></div>
          </div>
          {/* Only logo at top right */}
          <img src={logo} alt="SSDC Logo" className="w-5 h-5" />
        </div>

        {/* Patient Information */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[10px] mb-2">
          <div className="flex items-center">
            <span className="w-16 font-semibold text-gray-700">Date:</span>
            <span className="flex-1 border-b border-dotted border-gray-400 pb-0.5 font-medium text-gray-900">
              {formatDate(cardData.date)}
            </span>
          </div>

          <div className="flex items-center">
            <span className="w-16 font-semibold text-gray-700">SR.NO:</span>
            <span className="flex-1 border-b border-dotted border-gray-400 pb-0.5 font-medium text-gray-900">
              {cardData.slNo || '....................'}
            </span>
          </div>

          <div className="flex items-center">
            <span className="w-16 font-semibold text-gray-700">Doctor:</span>
            <span className="flex-1 border-b border-dotted border-gray-400 pb-0.5 font-medium text-gray-900">
              {cardData.doctor || '....................'}
            </span>
          </div>

          <div className="flex items-center">
            <span className="w-16 font-semibold text-gray-700">Patient:</span>
            <span className="flex-1 border-b border-dotted border-gray-400 pb-0.5 font-medium text-gray-900">
              {cardData.patient || '....................'}
            </span>
          </div>
        </div>

        {/* Work Information */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[10px] mb-2">
          <div className="flex items-center col-span-2">
            <span className="w-16 font-semibold text-gray-700">Work Type:</span>
            <span className="flex-1 border-b border-dotted border-gray-400 pb-0.5 font-medium text-gray-900">
              {cardData.typeOfWork || '....................'}
            </span>
          </div>

          <div className="flex items-center">
            <span className="w-16 font-semibold text-gray-700">Warranty:</span>
            <span className="flex-1 border-b border-dotted border-gray-400 pb-0.5 font-medium text-gray-900">
              {cardData.warranty || '....................'}
            </span>
          </div>

          {/* Tooth Number Section */}
          <div className="flex items-center col-span-2">
            <span className="w-16 font-semibold text-gray-700">Tooth No:</span>
            <div className="flex-1 flex border border-gray-300 rounded-sm h-6">
              <div className="flex-1 flex flex-col border-r border-gray-300">
                <div className="h-3 border-b border-gray-300 text-center text-[8px] flex items-center justify-center">
                  Upper Right
                </div>
                <div className="h-3 text-center text-[8px] flex items-center justify-center">
                  {cardData.upperRight || '...'}
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <div className="h-3 border-b border-gray-300 text-center text-[8px] flex items-center justify-center">
                  Upper Left
                </div>
                <div className="h-3 text-center text-[8px] flex items-center justify-center">
                  {cardData.upperLeft || '...'}
                </div>
              </div>
              <div className="flex-1 flex flex-col border-l border-r border-gray-300">
                <div className="h-3 border-b border-gray-300 text-center text-[8px] flex items-center justify-center">
                  Lower Right
                </div>
                <div className="h-3 text-center text-[8px] flex items-center justify-center">
                  {cardData.lowerRight || '...'}
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <div className="h-3 border-b border-gray-300 text-center text-[8px] flex items-center justify-center">
                  Lower Left
                </div>
                <div className="h-3 text-center text-[8px] flex items-center justify-center">
                  {cardData.lowerLeft || '...'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="mt-auto pt-1 border-t border-dashed border-gray-300">
          <p className="text-[8px] text-gray-600 text-center">
            This warranty covers defects in materials and workmanship. Present this card for any warranty claims.
          </p>
          <p className="text-[7px] text-gray-500 text-center mt-0.5">
            Terms and conditions apply. Not valid without official stamp.
          </p>
        </div>

        {/* Signature Area */}
        <div className="flex justify-between mt-1">
          <div className="text-[8px] text-gray-600">
            <div className="h-4 border-b border-dotted border-gray-400 w-20"></div>
            <span>Patient Signature</span>
          </div>
          <div className="text-[8px] text-gray-600">
            <div className="h-4 border-b border-dotted border-gray-400 w-20"></div>
            <span>Doctor Signature</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default WarrantyCard;
