import React from 'react';
// import logoMinisterio from '../assets/logo_ministerio.png';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-inter">
      <header className="bg-white shadow-md p-4 w-full sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center">
          {/* <img src={logoMinisterio} alt="Logo Ministerio" className="h-12 mr-4" /> */}
          <div className="w-12 h-12 bg-green-800 mr-4 rounded-full flex items-center justify-center text-white font-bold">UM</div>
          <h1 className="text-xl font-bold text-gray-800">Evaluador de Viabilidad de Biodigestores - UMATA</h1>
        </div>
      </header>
      <main className="flex-grow w-full">
        {children}
      </main>
      <footer className="bg-gray-800 text-white text-center p-3 text-sm">
        <p>© 2025 - Un proyecto para la Asistencia Técnica Agropecuaria</p>
      </footer>
    </div>
  );
};

export default Layout;
