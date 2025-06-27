#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🔍 MERN Estate Setup Checker\n');

// Check if required files exist
const requiredFiles = [
  'package.json',
  'client/package.json',
  'api/index.js'
];

const optionalFiles = [
  '.env',
  'client/.env.local'
];

console.log('📁 Checking required files...');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} - Found`);
  } else {
    console.log(`❌ ${file} - Missing`);
  }
});

console.log('\n📁 Checking optional files...');
optionalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} - Found`);
  } else {
    console.log(`⚠️  ${file} - Missing (create this for proper setup)`);
  }
});

// Check package.json scripts
console.log('\n📦 Checking package.json scripts...');
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  if (pkg.scripts && pkg.scripts.dev) {
    console.log('✅ Backend dev script - Found');
  } else {
    console.log('❌ Backend dev script - Missing');
  }
} catch (error) {
  console.log('❌ Cannot read package.json');
}

// Check client package.json
console.log('\n📦 Checking client package.json...');
try {
  const clientPkg = JSON.parse(fs.readFileSync('client/package.json', 'utf8'));
  if (clientPkg.scripts && clientPkg.scripts.dev) {
    console.log('✅ Frontend dev script - Found');
  } else {
    console.log('❌ Frontend dev script - Missing');
  }
} catch (error) {
  console.log('❌ Cannot read client/package.json');
}

console.log('\n🚀 Next Steps:');
console.log('1. Create .env file with MongoDB connection string');
console.log('2. Create client/.env.local with Firebase API key');
console.log('3. Run: npm install');
console.log('4. Run: cd client && npm install');
console.log('5. Start backend: npm run dev');
console.log('6. Start frontend: cd client && npm run dev');
console.log('\n🌟 Your beautiful MERN Estate app will be ready!');