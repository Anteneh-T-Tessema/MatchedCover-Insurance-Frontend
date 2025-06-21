import MGASmartQuote from '@/components/MGASmartQuote';

export default function MGADemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <MGASmartQuote />
    </div>
  );
}

export const metadata = {
  title: 'MGA + AI Smart Quote Demo | MatchedCover',
  description: 'Experience the hybrid MGA + AI sweet spot with our smart quote engine featuring AI-powered underwriting, carrier optimization, and profit maximization.',
  keywords: ['MGA', 'AI underwriting', 'insurance', 'smart quotes', 'carrier partnerships', 'insurtech'],
};
