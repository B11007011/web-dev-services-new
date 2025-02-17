import { testSEO } from '../utils/seo-test';

async function runTests() {
  const domains = [
    'http://localhost:3000',
    'https://en.tecxmate.com',
    'https://vi.tecxmate.com',
    'https://tw.tecxmate.com'
  ];

  console.log('Starting SEO tests...\n');

  for (const domain of domains) {
    console.log(`Testing ${domain}...`);
    await testSEO(domain);
    console.log('\n-------------------\n');
  }
}

runTests(); 