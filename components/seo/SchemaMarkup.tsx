interface SchemaMarkupProps {
  type: 'Organization' | 'LocalBusiness' | 'JobPosting' | 'FAQPage' | 'Service';
  data: Record<string, unknown>;
}

export function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Pre-built schema for the Global Careers organization.
 */
export function OrganizationSchema() {
  return (
    <SchemaMarkup
      type="Organization"
      data={{
        name: 'Global Careers',
        url: 'https://globalcareers.com',
        logo: 'https://globalcareers.com/logos/AROBAS-2026-GLOBAL-05.png',
        description:
          'Global Careers by Arobas Personnel connects US companies with pre-vetted offshore professionals from 12+ countries, saving 60-80% on talent costs.',
        parentOrganization: {
          '@type': 'Organization',
          name: 'Arobas Personnel',
          url: 'https://arobas.com',
        },
        address: [
          {
            '@type': 'PostalAddress',
            addressLocality: 'Orlando',
            addressRegion: 'FL',
            addressCountry: 'US',
          },
          {
            '@type': 'PostalAddress',
            addressLocality: 'Montréal',
            addressRegion: 'QC',
            addressCountry: 'CA',
          },
        ],
        sameAs: [
          'https://linkedin.com/company/globalcareers',
        ],
      }}
    />
  );
}
