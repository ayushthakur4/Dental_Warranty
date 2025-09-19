import React from 'react';
import logo from '../assets/Logo.png';
import watermark from '../assets/watermark.png';

const defaultTerms = [
  'Prosthesis must be inserted by licensed practicing dentist.',
  'Dental prosthesis must be returned with model work & warranty card.',
  'Accidental damage to Crown/Bridge is not covered under warranty.',
  'Repair or replacement of your dental prosthesis at our discretion.',
  'Costs incurred for removal or insertion are not covered.',
  'Repair resulting from accident, neglect, abuse or misuse is excluded.',
];

const BackCard = React.forwardRef(({ backgroundUrl, terms = defaultTerms, title = 'TERMS & CONDITIONS' }, ref) => {
  return (
    <div
      ref={ref}
      className="w-[85.6mm] h-[54.0mm] border border-gray-300 bg-white overflow-hidden rounded-sm relative pt-3 pb-5 px-3 shadow-sm"
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

      {/* Header Section */}
      <div className="relative flex justify-between items-start mb-3 z-10">
        <div className="px-2 py-1 bg-blue-800 text-white text-[9px] font-bold rounded-sm">WARRANTY CARD</div>
        <div className="px-2 py-1 border border-blue-800 text-blue-800 text-[9px] font-bold rounded-sm">{title}</div>
      </div>

      {/* SSDC Logo and Branding */}
      <div className="relative flex justify-center items-center mb-2 z-10">
        <div className="flex items-center text-blue-800 font-bold">
          <img src={logo} alt="SSDC Logo" className="w-5 h-5 mr-1" />
          <div className="text-center leading-tight">
            <div className="text-[11px] font-bold">SSDC HAMIRPUR</div>
            <div className="text-[8px] font-normal">QUALITY FOR BETTER TEETH</div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="relative text-[9px] text-gray-800 space-y-2 z-10">
        <h3 className="text-[10px] font-bold text-blue-800 mb-2 border-b border-gray-200 pb-1">Warranty Terms & Conditions</h3>
        
        <ol className="list-decimal pl-4 space-y-1.5">
          {terms.map((t, i) => (
            <li key={i} className="leading-tight">{t}</li>
          ))}
        </ol>
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute bottom-1 left-1 w-2 h-2 border-l-2 border-b-2 border-blue-300"></div>
      <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-blue-300"></div>
      <div className="absolute top-1 left-1 w-2 h-2 border-l-2 border-t-2 border-blue-300"></div>
      <div className="absolute top-1 right-1 w-2 h-2 border-r-2 border-t-2 border-blue-300"></div>
    </div>
  );
});

export default BackCard;