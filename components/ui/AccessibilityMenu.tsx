'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accessibility, ChevronUp, Type, Contrast, ZoomIn, X } from 'lucide-react';

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Apply accessibility settings
  useEffect(() => {
    // Font size
    document.documentElement.style.fontSize = `${fontSize}rem`;
    
    // High contrast
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    // Reduced motion
    if (reducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
    
    // Save settings to localStorage
    localStorage.setItem('accessibility', JSON.stringify({
      fontSize,
      highContrast,
      reducedMotion
    }));
  }, [fontSize, highContrast, reducedMotion]);
  
  // Load saved settings
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility');
    if (savedSettings) {
      const { fontSize: savedFontSize, highContrast: savedHighContrast, reducedMotion: savedReducedMotion } = JSON.parse(savedSettings);
      setFontSize(savedFontSize);
      setHighContrast(savedHighContrast);
      setReducedMotion(savedReducedMotion);
    }
  }, []);
  
  return (
    <>
      {/* Accessibility Button */}
      <button
        aria-label="Accessibility Options"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        {isOpen ? <X size={24} /> : <Accessibility size={24} />}
      </button>
      
      {/* Accessibility Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-4 z-50 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4"
            role="dialog"
            aria-labelledby="accessibility-title"
          >
            <h2 id="accessibility-title" className="text-lg font-bold mb-4">Accessibility Options</h2>
            
            {/* Font Size */}
            <div className="mb-4">
              <label className="flex items-center justify-between mb-2">
                <span className="flex items-center">
                  <Type className="mr-2 h-4 w-4" />
                  Font Size
                </span>
                <span className="text-sm text-gray-500">{Math.round(fontSize * 100)}%</span>
              </label>
              <div className="flex items-center">
                <button
                  aria-label="Decrease Font Size"
                  onClick={() => setFontSize(Math.max(0.8, fontSize - 0.1))}
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-l-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                  disabled={fontSize <= 0.8}
                >
                  -
                </button>
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-2 bg-primary"
                    style={{ width: `${((fontSize - 0.8) / 0.8) * 100}%` }}
                  ></div>
                </div>
                <button
                  aria-label="Increase Font Size"
                  onClick={() => setFontSize(Math.min(1.6, fontSize + 0.1))}
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-r-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                  disabled={fontSize >= 1.6}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* High Contrast */}
            <div className="mb-4">
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`flex items-center justify-between w-full p-3 rounded-lg ${
                  highContrast ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                <span className="flex items-center">
                  <Contrast className="mr-2 h-4 w-4" />
                  High Contrast
                </span>
                <span className={`w-10 h-6 rounded-full p-1 ${highContrast ? 'bg-white/20' : 'bg-gray-300 dark:bg-gray-600'}`}>
                  <motion.div
                    animate={{ x: highContrast ? 16 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="w-4 h-4 bg-white rounded-full shadow-md"
                  />
                </span>
              </button>
            </div>
            
            {/* Reduced Motion */}
            <div className="mb-4">
              <button
                onClick={() => setReducedMotion(!reducedMotion)}
                className={`flex items-center justify-between w-full p-3 rounded-lg ${
                  reducedMotion ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                <span className="flex items-center">
                  <ZoomIn className="mr-2 h-4 w-4" />
                  Reduced Motion
                </span>
                <span className={`w-10 h-6 rounded-full p-1 ${reducedMotion ? 'bg-white/20' : 'bg-gray-300 dark:bg-gray-600'}`}>
                  <motion.div
                    animate={{ x: reducedMotion ? 16 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="w-4 h-4 bg-white rounded-full shadow-md"
                  />
                </span>
              </button>
            </div>
            
            {/* Reset Button */}
            <button
              onClick={() => {
                setFontSize(1);
                setHighContrast(false);
                setReducedMotion(false);
              }}
              className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 mt-2"
            >
              Reset to Default
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
