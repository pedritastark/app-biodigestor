import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center p-4 text-white">
      <div className="text-center animate-fade-in">
        <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-bold">Analizando sus datos...</h2>
        <p>Estamos calculando la viabilidad de su proyecto.</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
