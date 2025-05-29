
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface NavigationProps {
  onBack?: () => void;
  title: string;
  showBack?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ onBack, title, showBack = false }) => {
  return (
    <nav className="bg-white shadow-sm border-b p-4">
      <div className="max-w-4xl mx-auto flex items-center">
        {showBack && onBack && (
          <button 
            onClick={onBack}
            className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        <div className="ml-auto">
          {/* Logo placeholder */}
          <div className="w-8 h-8 bg-blue-500 rounded"></div>
        </div>
      </div>
    </nav>
  );
};
