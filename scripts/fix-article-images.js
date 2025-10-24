const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function fixArticleImages() {
  try {
    console.log('🔍 Fetching articles...');
    
    // Get all articles
    const { data: articles, error } = await supabase
      .from('articles')
      .select('*');

    if (error) {
      console.error('Error fetching articles:', error);
      return;
    }

    if (!articles || articles.length === 0) {
      console.log('No articles found');
      return;
    }

    console.log(`Found ${articles.length} article(s)`);

    for (const article of articles) {
      let content = article.content;
      let updated = false;

      // Pattern 1: Next.js Image Optimization URL
      const nextImagePattern1 = /http:\/\/[^\/]+:\d+\/_next\/image\?url=([^&]+)&[^"'\s]*/g;
      const nextImagePattern2 = /http:\/\/[^\/]+:\d+\/_next\/image\?url=([^&]+)&[^"'\s]*/g;
      
      if (nextImagePattern1.test(content)) {
        content = content.replace(nextImagePattern2, (match, encodedUrl) => {
          const decodedUrl = decodeURIComponent(encodedUrl);
          console.log(`  Replacing: ${match}`);
          console.log(`  With: ${decodedUrl}`);
          updated = true;
          return decodedUrl;
        });
      }

      // Pattern 2: localhost URLs
      const localhostPattern1 = /http:\/\/192\.168\.[^\/]+:\d+\/_next\/image\?url=([^&]+)&[^"'\s]*/g;
      const localhostPattern2 = /http:\/\/192\.168\.[^\/]+:\d+\/_next\/image\?url=([^&]+)&[^"'\s]*/g;
      
      if (localhostPattern1.test(content)) {
        content = content.replace(localhostPattern2, (match, encodedUrl) => {
          const decodedUrl = decodeURIComponent(encodedUrl);
          console.log(`  Replacing localhost: ${match}`);
          console.log(`  With: ${decodedUrl}`);
          updated = true;
          return decodedUrl;
        });
      }

      if (updated) {
        console.log(`✏️  Updating article: ${article.title}`);
        
        const { error: updateError } = await supabase
          .from('articles')
          .update({ content })
          .eq('id', article.id);

        if (updateError) {
          console.error(`  ❌ Error updating article ${article.id}:`, updateError);
        } else {
          console.log(`  ✅ Successfully updated`);
        }
      } else {
        console.log(`✓ Article "${article.title}" - no changes needed`);
      }
    }

    console.log('\n✅ Done!');
  } catch (error) {
    console.error('Error:', error);
  }
}

fixArticleImages();
