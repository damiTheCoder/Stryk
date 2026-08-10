import React from 'react';

const DisclaimerPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl p-4 md:p-8">
        <div className="uniswap-card">
          <div className="flex items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Risk Disclosure & Disclaimer</h1>
          </div>
          <p className="text-sm text-red-600 font-medium mb-8">Please read this disclaimer carefully before using our services.</p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Market Risks</h2>
            <p className="text-gray-600 leading-relaxed">
              The value of digital assets can be highly volatile and may fluctuate significantly over short periods.
              Past performance is not indicative of future results. You should carefully consider whether trading or
              holding digital assets is suitable for your financial situation and risk tolerance.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Smart Contract Risks</h2>
            <p className="text-gray-600 leading-relaxed">
              Our services may interact with smart contracts that have not been audited and may contain bugs,
              vulnerabilities, or unexpected behavior. You assume all risks associated with interacting with smart
              contracts, including but not limited to loss of funds, transaction failures, and code exploits.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Regulatory Risks</h2>
            <p className="text-gray-600 leading-relaxed">
              The legal and regulatory status of digital assets and blockchain technologies is uncertain and evolving
              in many jurisdictions. Changes in laws, regulations, or enforcement practices may adversely affect your
              ability to use our services or the value of your digital assets.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. No Financial Advice</h2>
            <p className="text-gray-600 leading-relaxed">
              The information provided on our platform is for informational purposes only and does not constitute
              financial, investment, tax, or legal advice. You should consult with qualified professionals before
              making any financial decisions based on information obtained from our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Tax Implications</h2>
            <p className="text-gray-600 leading-relaxed">
              Transactions involving digital assets may have tax consequences. You are solely responsible for
              determining and complying with any applicable tax obligations. We are not responsible for determining
              the tax implications of your transactions, and we recommend consulting a qualified tax advisor.
            </p>
          </section>

          <div className="mt-10 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <p className="text-sm text-yellow-800">
              By using our services, you acknowledge that you have read, understood, and agree to be bound by this
              disclaimer. You further acknowledge that you are assuming all risks associated with using our services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;
