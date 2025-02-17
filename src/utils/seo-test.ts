export async function testSEO(url: string) {
  try {
    // Fetch the page
    const response = await fetch(url);
    const html = await response.text();

    // Test results object
    const results = {
      metaTags: {
        title: false,
        description: false,
        viewport: false,
        robots: false,
        googleVerification: false,
      },
      structuredData: {
        organization: false,
        website: false,
        webPage: false,
      },
      hreflang: {
        en: false,
        vi: false,
        zhTW: false,
      },
      canonical: false,
    };

    // Check meta tags
    results.metaTags.title = html.includes('<title>');
    results.metaTags.description = html.includes('name="description"');
    results.metaTags.viewport = html.includes('name="viewport"');
    results.metaTags.robots = html.includes('name="robots"');
    results.metaTags.googleVerification = html.includes('google-site-verification');

    // Check structured data
    const structuredDataMatch = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/gs);
    if (structuredDataMatch) {
      const jsonLD = JSON.parse(structuredDataMatch[0].replace(/<script type="application\/ld\+json">|<\/script>/g, ''));
      if (jsonLD['@graph']) {
        results.structuredData.organization = jsonLD['@graph'].some((item: any) => item['@type'] === 'Organization');
        results.structuredData.website = jsonLD['@graph'].some((item: any) => item['@type'] === 'WebSite');
        results.structuredData.webPage = jsonLD['@graph'].some((item: any) => item['@type'] === 'WebPage');
      }
    }

    // Check hreflang
    results.hreflang.en = html.includes('hrefLang="en"');
    results.hreflang.vi = html.includes('hrefLang="vi"');
    results.hreflang.zhTW = html.includes('hrefLang="zh-TW"');

    // Check canonical
    results.canonical = html.includes('rel="canonical"');

    // Print results
    console.log('\n=== SEO Test Results ===\n');
    
    console.log('Meta Tags:');
    Object.entries(results.metaTags).forEach(([key, value]) => {
      console.log(`${key}: ${value ? '✅' : '❌'}`);
    });

    console.log('\nStructured Data:');
    Object.entries(results.structuredData).forEach(([key, value]) => {
      console.log(`${key}: ${value ? '✅' : '❌'}`);
    });

    console.log('\nHreflang Tags:');
    Object.entries(results.hreflang).forEach(([key, value]) => {
      console.log(`${key}: ${value ? '✅' : '❌'}`);
    });

    console.log('\nCanonical:', results.canonical ? '✅' : '❌');

    return results;
  } catch (error) {
    console.error('Error testing SEO:', error);
    return null;
  }
} 