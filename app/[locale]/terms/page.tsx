import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — Global Careers',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-28 pb-16">
      <div className="container max-w-3xl prose prose-invert prose-sm">
        <h1 className="holographic-title text-3xl font-heading font-bold mb-8">Terms of Service</h1>
        <p className="text-text-gray">Last updated: January 2026</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using the Global Careers website and services, you accept and agree to be bound by the terms and conditions of this agreement.</p>

        <h2>2. Services</h2>
        <p>Global Careers, a division of Arobas Personnel, provides offshore staffing services including direct hire placements and managed talent-on-demand solutions. Our services connect US companies with pre-vetted professionals from international markets.</p>

        <h2>3. Placement Guarantee</h2>
        <p>Direct hire placements are covered by a 6-month replacement guarantee. If a placed candidate leaves or is terminated for performance reasons within 6 months of their start date, we will source a replacement at no additional cost. This guarantee is subject to timely payment of all fees.</p>

        <h2>4. Fees and Payment</h2>
        <p>Direct hire fees are due upon successful placement of a candidate. Talent on Demand fees are billed monthly in advance. All fees are in US dollars unless otherwise specified. Late payments may incur interest at 1.5% per month.</p>

        <h2>5. Confidentiality</h2>
        <p>Both parties agree to maintain the confidentiality of all proprietary information shared during the engagement. Candidate information provided by Global Careers is confidential and may not be shared with third parties.</p>

        <h2>6. Limitation of Liability</h2>
        <p>Global Careers&apos; liability shall not exceed the fees paid by the client in the 12 months preceding the claim. We are not liable for indirect, incidental, or consequential damages.</p>

        <h2>7. Governing Law</h2>
        <p>These terms shall be governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of law provisions.</p>

        <h2>8. Contact Us</h2>
        <p>For questions about these Terms of Service, please contact us at:<br />
        Global Careers (a division of Arobas Personnel)<br />
        Orlando, FL<br />
        legal@globalcareers.com</p>
      </div>
    </main>
  );
}
