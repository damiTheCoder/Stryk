import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl p-4 md:p-8">
        <div className="uniswap-card animate-drop-in">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: August 2026</p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed">
              We collect information that you provide directly to us, including your name, email address, phone number,
              and any other information you choose to provide. We also automatically collect certain information when
              you use our services, such as your IP address, browser type, and usage data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. How We Use Information</h2>
            <p className="text-gray-600 leading-relaxed">
              We use the information we collect to provide, maintain, and improve our services, to communicate with
              you, and to personalize your experience. We may also use your information to send you updates, security
              alerts, and administrative messages, or for research and analytics purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Data Sharing</h2>
            <p className="text-gray-600 leading-relaxed">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your
              consent, except as described in this policy. We may share your information with trusted service providers
              who assist us in operating our services, conducting business, or serving our users.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal data from
              unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the
              Internet or method of electronic storage is completely secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed">
              You have the right to access, correct, or delete your personal information. You may also object to
              processing or request data portability. To exercise any of these rights, please contact us using the
              information provided below. We will respond to your request within 30 days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Cookies</h2>
            <p className="text-gray-600 leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience, analyze trends, and
              administer our services. You can set your browser to refuse all cookies or to alert you when cookies are
              being sent. However, some features of our services may not function properly without cookies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Contact Information</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions or concerns about this Privacy Policy, please contact our Data Protection
              Officer at{' '}
              <span className="text-blue-600">privacy@example.com</span> or visit our office at 123 Privacy Street,
              Data City, DC 10101.
            </p>
          </section>

          <div className="mt-10 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              We are committed to protecting your privacy and ensuring the security of your personal information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
