// Remove category check constraint from materials table
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function removeConstraint() {
  console.log('🔧 Attempting to remove category check constraint...');
  console.log('Note: This requires direct SQL access via Supabase Dashboard');
  console.log('\n📝 Please run this SQL command in Supabase SQL Editor:\n');
  console.log('ALTER TABLE materials DROP CONSTRAINT IF EXISTS materials_category_check;\n');
  console.log('🔗 Go to: https://supabase.com/dashboard → SQL Editor');
}

removeConstraint();
