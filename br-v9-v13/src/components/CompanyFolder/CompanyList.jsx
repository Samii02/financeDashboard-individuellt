import React from 'react';
import CompanyCard from './CompanyCard';

function CompanyList({ companies }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map((company) => (
        <article key={company.symbol} className="border p-4 rounded-lg shadow-md">
          <CompanyCard company={company} />
        </article>
      ))}
    </section>
  );
}

export default CompanyList;
