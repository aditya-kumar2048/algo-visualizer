import React from 'react';
import { useStore } from '../../store/useStore';
import { CheckCircle2, XCircle, X } from 'lucide-react';

export const SearchResultModal = () => {
  const searchResult = useStore((state) => state.searchResult);
  const setSearchResult = useStore((state) => state.setSearchResult);
  const searchTarget = useStore((state) => state.searchTarget);

  if (!searchResult) return null;

  let title = '';
  let message = null;
  let isSuccess = false;

  if (searchResult.title) {
    title = searchResult.title;
    message = searchResult.message;
    isSuccess = searchResult.success !== false;
  } else if (searchResult.found !== undefined) {
    isSuccess = searchResult.found;
    title = isSuccess ? 'Target Found!' : 'Not Found';
    message = isSuccess ? (
      <>Element <span className="text-purple-400 font-bold">{searchTarget}</span> was found at index <span className="text-purple-400 font-bold">{searchResult.index}</span>.</>
    ) : (
      <>Element <span className="text-red-400 font-bold">{searchTarget}</span> is not present in the array.</>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-auto">
      <div className="glass-panel p-8 max-w-sm w-full mx-4 flex flex-col items-center relative transform transition-all animate-in fade-in zoom-in duration-300">
        <button 
          onClick={() => setSearchResult(null)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          <>
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400 shadow-[0_0_30px_rgba(192,132,252,0.3)]">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 text-center">{title}</h2>
            <p className="text-gray-300 text-center mb-6">
              {message}
            </p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4 text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <XCircle size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 text-center">{title}</h2>
            <p className="text-gray-300 text-center mb-6">
              {message}
            </p>
          </>
        )}

        <button 
          onClick={() => setSearchResult(null)}
          className="glass-button w-full py-3 bg-blue-500/20 hover:bg-blue-500/40 text-white font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
};
