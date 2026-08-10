import React from 'react';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl p-4 md:p-8">
        <div className="uniswap-card">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: August 2026</p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing or using our services, you agree to be bound by these Terms of Service. If you do not agree
              to these terms, please do not use our services. We reserve the right to modify these terms at any time,
              and your continued use of the services constitutes acceptance of the updated terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Eligibility</h2>
            <p className="text-gray-600 leading-relaxed">
              You must be at least 18 years of age and have the legal capacity to enter into these terms. By using our
              services, you represent and warrant that you meet all eligibility requirements and that your use does not
              violate any applicable laws or regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
            <p className="text-gray-600 leading-relaxed">
              You are responsible for maintaining the confidentiality of your account information and for all activities
              that occur under your account. You agree to notify us immediately of any unauthorized use of your account
              or any other breach of security known to you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Prohibited Activities</h2>
            <p className="text-gray-600 leading-relaxed">
              You may not use our services for any unlawful purpose, to solicit others to perform unlawful acts, or to
              violate any applicable laws or regulations. Prohibited activities include but are not limited to fraud,
              money laundering, manipulation of market prices, or any activity that disrupts or damages our systems.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed">
              All content, features, and functionality of our services, including but not limited to text, graphics,
              logos, and software, are the exclusive property of our company and are protected by international
              copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              In no event shall our company, its directors, officers, employees, or agents be liable for any indirect,
              incidental, special, consequential, or punitive damages, including without limitation, loss of profits,
              data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Governing Law</h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction
              in which our company is registered, without regard to its conflict of law principles. Any disputes arising
              from these terms shall be resolved exclusively in the courts of that jurisdiction.
            </p>
          </section>

          <div className="mt-10 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              If you have any questions about these Terms of Service, please contact us at{' '}
              <span className="text-blue-600">legal@example.com</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
