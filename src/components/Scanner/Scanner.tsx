import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, RefreshCw, ShieldAlert, Cpu } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { ScanState, AnalysisResult, SkinType } from '../../types';
import { GoogleGenAI } from '@google/genai';

interface ScannerProps {
  onValidated: (result: AnalysisResult) => void;
}

export const Scanner: React.FC<ScannerProps> = ({ onValidated }) => {
  const { colors } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setScanState('scanning');
      // Auto-start verification after a short delay for better UX
      setTimeout(() => captureAndVerify(), 1000);
    } catch (err) {
      console.error(err);
      setErrorMessage('Camera access restricted. Please upload a high-resolution biometric photo.');
      setScanState('error');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScanState('scanning');
      captureAndVerify();
    }
  };

  const captureAndVerify = async () => {
    setProgress(0);
    setScanState('scanning');

    // Simulate analysis phase
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 10;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        performAIValidation();
      }
      setProgress(currentProgress);
    }, 100);
  };

  const performAIValidation = async () => {
    setTimeout(() => {
      // Always succeed as requested
      setScanState('success');
      
      const types: SkinType[] = ['hydration', 'protection', 'recovery'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      const concerns: Record<string, string> = {
        hydration: 'Transepidermal Water Loss Detected',
        protection: 'UV-Induced Oxidative Stress Identified',
        recovery: 'Cellular Barrier Compromise Noted'
      };

      const result: AnalysisResult = {
        skinType: randomType,
        matchScore: 92 + Math.random() * 7,
        concern: concerns[randomType]
      };

      setTimeout(() => onValidated(result), 1500);
    }, 800);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-square rounded-3xl overflow-hidden border border-white/10 bg-black group">
      {/* Viewfinder */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className={`w-full h-full object-cover grayscale opacity-60 transition-opacity duration-1000 ${scanState === 'scanning' ? 'opacity-90' : ''}`}
      />

      {/* Wireframe Overlay */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[70%] h-[70%] border-2 border-white/20 rounded-[40%] relative">
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute inset-0 border border-white/40 rounded-[40%]" 
          />
          {/* Facial Anchor Points */}
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/50 rounded-full" />
          <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-white/50 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/50 rounded-full" />
        </div>
      </div>

      {/* Scan Line */}
      {scanState === 'scanning' && (
        <motion.div
          initial={{ top: '0%' }}
          animate={{ top: '100%' }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px] bg-white/50 shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10"
        />
      )}

      {/* Controls / State Overlays */}
      <div className="absolute inset-x-0 bottom-12 flex flex-col items-center gap-6 px-8 z-20">
        <AnimatePresence mode="wait">
          {scanState === 'idle' && (
            <div className="flex flex-col items-center gap-4">
              <motion.button
                key="start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={startCamera}
                className="flex items-center gap-2 px-8 py-3 bg-white text-black font-mono text-sm tracking-widest uppercase rounded-full hover:bg-white/80 transition-colors"
              >
                <Camera size={18} />
                Initialize Biometric Link
              </motion.button>
              
              <label className="group flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-full cursor-pointer hover:bg-white/10 transition-all font-mono text-[9px] uppercase tracking-widest opacity-60 hover:opacity-100">
                <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                <span>Upload Scan Data</span>
              </label>
            </div>
          )}

          {scanState === 'scanning' && (
            <motion.div
              key="progress"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full space-y-2"
            >
              <div className="flex justify-between font-mono text-[10px] tracking-widest opacity-50 uppercase">
                <span>Analyzing Dermal Data</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-[1px] bg-white/10">
                <motion.div
                  className="h-full bg-white shadow-[0_0_10px_white]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>
          )}

          {scanState === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full p-6 bg-red-950/20 backdrop-blur-md border border-red-500/30 rounded-2xl flex flex-col items-center text-center gap-4"
            >
              <ShieldAlert className="text-red-500" size={32} />
              <div className="space-y-1">
                <p className="font-mono text-xs text-red-500 uppercase tracking-tighter">System Alert</p>
                <p className="text-sm font-medium text-white max-w-xs">{errorMessage}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setScanState('idle')}
                  className="flex items-center gap-2 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors text-xs font-mono uppercase"
                >
                  <RefreshCw size={14} />
                  Retry
                </button>
                <label className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full cursor-pointer hover:bg-white/90 transition-colors text-xs font-mono uppercase">
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                  Upload Data
                </label>
              </div>
            </motion.div>
          )}

          {scanState === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 px-8 py-3 bg-white text-black rounded-full"
            >
              <Cpu size={18} />
              <span className="font-mono text-sm uppercase tracking-widest font-bold">Verification Complete</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Manual Verification Trigger if active */}
      {scanState === 'scanning' && progress === 0 && (
         <button
            onClick={captureAndVerify}
            className="absolute inset-0 w-full h-full cursor-pointer z-0"
         />
      )}
    </div>
  );
};
