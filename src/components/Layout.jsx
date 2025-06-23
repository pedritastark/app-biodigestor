// src/components/Layout.jsx

import React from 'react';
import logoMinisterio from '../assets/logo_ministerio.png'; 

const Layout = ({ children }) => {
  return (

    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-gray-50 font-inter">
      <header className="bg-white shadow-md p-4 w-full sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">
            Evaluador de Viabilidad de Biodigestores - Secretaría de Agricultura
          </h1>
          <img src={logoMinisterio} alt="Logo Ministerio de Agricultura" className="h-12" />
        </div>
      </header>
      
      {/* El <main> ahora es un item de la parrilla. Lo hacemos flex para poder centrar su contenido. */}
      <main className="w-full flex flex-col">
        {children}
      </main>

      <footer className="bg-gray-800 text-white text-center p-3 text-sm">
        <p>© 2025 - Un proyecto para la Secretaría de Agricultura</p>
      </footer>
    </div>
  );
};

export default Layout;