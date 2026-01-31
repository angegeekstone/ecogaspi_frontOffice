import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  hasNext,
  hasPrev,
  onPageChange,
  itemsPerPage,
}) => {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
      <div className="text-sm text-gray-700 mb-4 sm:mb-0">
        Affichage de <span className="font-medium">{Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}</span> à{' '}
        <span className="font-medium">
          {Math.min(currentPage * itemsPerPage, totalItems)}
        </span>{' '}
        sur <span className="font-medium">{totalItems}</span> résultats
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrev}
          className={`relative inline-flex items-center px-4 py-2 rounded-md border text-sm font-medium ${
            hasPrev
              ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
              : 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed'
          }`}
        >
          Précédent
        </button>

        <div className="flex items-center space-x-1">
          {pageNumbers.map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              className={`relative inline-flex items-center px-4 py-2 rounded-md border text-sm font-medium ${
                page === currentPage
                  ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                  : 'border-gray-300 text-gray-500 hover:bg-gray-50'
              } ${
                typeof page === 'string' ? 'cursor-default' : 'cursor-pointer'
              }`}
              disabled={typeof page === 'string'}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext}
          className={`relative inline-flex items-center px-4 py-2 rounded-md border text-sm font-medium ${
            hasNext
              ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
              : 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed'
          }`}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};