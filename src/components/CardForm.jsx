import React from 'react';
import { FaUndo, FaTooth, FaUserMd, FaUser, FaBriefcase, FaShieldAlt, FaBarcode, FaCalendarAlt } from 'react-icons/fa';

const CardForm = ({ cardData, setCardData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleToothChange = (quadrant, value) => {
    // Only allow numbers, commas, and spaces
    const sanitizedValue = value.replace(/[^0-9,\s]/g, '');
    setCardData(prevData => ({
      ...prevData,
      [quadrant]: sanitizedValue
    }));
  };

  const formFields = [
    { 
      label: "Date", 
      name: "date", 
      type: "date", 
      placeholder: "Select date",
      icon: <FaCalendarAlt className="text-blue-500" />
    },
    { 
      label: "SL.NO", 
      name: "slNo", 
      type: "text", 
      placeholder: "e.g., 2025-001",
      icon: <FaBarcode className="text-blue-500" />
    },
    { 
      label: "Doctor", 
      name: "doctor", 
      type: "text", 
      placeholder: "Doctor's full name",
      icon: <FaUserMd className="text-blue-500" />
    },
    { 
      label: "Patient", 
      name: "patient", 
      type: "text", 
      placeholder: "Patient's full name",
      icon: <FaUser className="text-blue-500" />
    },
    { 
      label: "Type Of Work", 
      name: "typeOfWork", 
      type: "text", 
      placeholder: "e.g., Crown, Bridge, Implant",
      icon: <FaBriefcase className="text-blue-500" />
    },
    { 
      label: "Warranty", 
      name: "warranty", 
      type: "text", 
      placeholder: "e.g., 2 years, 5 years",
      icon: <FaShieldAlt className="text-blue-500" />
    },
  ];

  const toothQuadrants = [
    { name: "upperRight", label: "Upper Right" },
    { name: "upperLeft", label: "Upper Left" },
    { name: "lowerRight", label: "Lower Right" },
    { name: "lowerLeft", label: "Lower Left" },
  ];

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all fields?")) {
      setCardData({
        date: new Date().toISOString().slice(0, 10),
        slNo: '',
        doctor: '',
        patient: '',
        typeOfWork: '',
        warranty: '',
        upperRight: '',
        upperLeft: '',
        lowerRight: '',
        lowerLeft: '',
      });
    }
  };

  // Calculate completion percentage
  const totalFields = formFields.length + toothQuadrants.length;
  const completedFields = Object.values(cardData).filter(value => value !== '').length;

  return (
    <div className="p-6 rounded-xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 shadow-md">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-blue-800 mb-1">Dental Warranty Card Generator</h2>
        <p className="text-sm text-blue-600">Fill in the details below to create your warranty card</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {formFields.map(field => (
          <div key={field.name} className="relative">
            <label className="block text-sm font-medium text-blue-700 mb-1 flex items-center">
              {field.icon}
              <span className="ml-2">{field.label}</span>
            </label>
            <div className="relative">
              <input
                type={field.type}
                name={field.name}
                value={cardData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                autoComplete="off"
                className="w-full rounded-lg border border-blue-200 bg-white px-4 py-3 pl-10 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-colors"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                {field.icon}
              </div>
            </div>
            {/* Show formatted date preview only for date field */}
            {field.name === 'date' && cardData.date && (
              <p className="mt-1 text-xs text-gray-500">
                Formatted: {new Date(cardData.date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            )}
          </div>
        ))}
        
        {/* Tooth Number Quadrants */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-blue-700 mb-3 flex items-center">
            <FaTooth className="text-blue-500 mr-2" />
            <span>Tooth Numbers (by quadrant)</span>
          </label>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {toothQuadrants.map(quadrant => (
              <div key={quadrant.name} className="bg-white p-3 rounded-lg border border-blue-200 shadow-sm">
                <label className="block text-xs font-medium text-blue-700 mb-1 text-center">
                  {quadrant.label}
                </label>
                <input
                  type="text"
                  value={cardData[quadrant.name] || ''}
                  onChange={(e) => handleToothChange(quadrant.name, e.target.value)}
                  placeholder="e.g., 11,12"
                  className="w-full text-center py-2 border border-blue-200 rounded-md focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                />
              </div>
            ))}
          </div>
          
          <p className="text-xs text-blue-500 mt-2 text-center">
            Enter tooth numbers separated by commas (e.g., 11,12,13)
          </p>
        </div>
      </div>

      <div className="mt-8 pt-5 border-t border-blue-100 flex justify-center">
        <button 
          type="button" 
          onClick={handleReset}
          className="flex items-center px-5 py-2.5 rounded-lg border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
        >
          <FaUndo className="mr-2" />
          Reset All Fields
        </button>
      </div>

      {/* Form Status */}
      <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-700 text-center">
          {completedFields === 0 
            ? "No fields completed yet" 
            : `${completedFields} of ${totalFields} fields completed`
          }
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(completedFields / totalFields) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CardForm;