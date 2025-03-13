import React from 'react';
import CompanyCard from './CompanyCard';

function CompanyList({ companies }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map((company) => (
        <CompanyCard key={company.symbol} company={company} />
      ))}
    </div>
  );
}

export default CompanyList;
