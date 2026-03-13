import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Global Careers',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-28 pb-16">
      <div className="container max-w-3xl prose prose-invert prose-sm">
        <h1 className="holographic-title text-3xl font-heading font-bold mb-8">Privacy Policy</h1>
        <p className="text-text-gray">Last updated: January 2026</p>

        <h2>1. Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you fill out a contact form, book a consultation, use our savings calculator, or apply as a candidate. This may include your name, email address, phone number, company name, and hiring requirements.</p>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Respond to your inquiries and provide our staffing services</li>
          <li>Match candidates with open positions</li>
          <li>Send follow-up communications about our services</li>
          <li>Improve our website and user experience</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2>3. Information Sharing</h2>
        <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with our parent company, Arobas Personnel, for the purpose of providing our services. We may also share information with service providers who assist in operating our website and conducting our business.</p>

        <h2>4. Data Security</h2>
        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

        <h2>5. Cookies</h2>
        <p>Our website uses cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though this may affect some features of our site.</p>

        <h2>6. Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at privacy@globalcareers.com.</p>

        <h2>7. Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please contact us at:<br />
        Global Careers (a division of Arobas Personnel)<br />
        Orlando, FL<br />
        privacy@globalcareers.com</p>
      </div>
    </main>
  );
}
