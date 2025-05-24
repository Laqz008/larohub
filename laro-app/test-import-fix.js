#!/usr/bin/env node

/**
 * Test script to verify the import fix for users.ts service
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Testing Import Fix for users.ts service\n');

function testImportFix() {
  console.log('1. Checking users.ts service import...');
  
  const usersServicePath = path.join(__dirname, 'src/lib/api/services/users.ts');
  
  if (!fs.existsSync(usersServicePath)) {
    console.log('   ❌ users.ts service file not found');
    return false;
  }
  
  const usersServiceContent = fs.readFileSync(usersServicePath, 'utf8');
  
  // Check if the correct import is present
  const hasCorrectImport = usersServiceContent.includes("import { apiClient, withCache, withRetry } from '../client';");
  
  // Check if the incorrect import is NOT present
  const hasIncorrectImport = usersServiceContent.includes("import { withCache, withRetry } from '../utils';");
  
  if (hasCorrectImport && !hasIncorrectImport) {
    console.log('   ✅ users.ts service has correct import from client module');
    return true;
  } else if (hasIncorrectImport) {
    console.log('   ❌ users.ts service still has incorrect import from utils module');
    return false;
  } else {
    console.log('   ❌ users.ts service missing required imports');
    return false;
  }
}

function testOtherServices() {
  console.log('\n2. Checking other services for consistency...');
  
  const servicesDir = path.join(__dirname, 'src/lib/api/services');
  const serviceFiles = ['games.ts', 'teams.ts', 'courts.ts', 'auth.ts'];
  
  let allConsistent = true;
  
  serviceFiles.forEach(file => {
    const filePath = path.join(servicesDir, file);
    
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check if they import from client (not utils)
      const importsFromClient = content.includes("from '../client'");
      const importsFromUtils = content.includes("from '../utils'");
      
      if (importsFromClient && !importsFromUtils) {
        console.log(`   ✅ ${file} has consistent imports`);
      } else if (importsFromUtils) {
        console.log(`   ❌ ${file} has incorrect import from utils`);
        allConsistent = false;
      } else {
        console.log(`   ⚠️  ${file} doesn't use withCache/withRetry (OK)`);
      }
    }
  });
  
  return allConsistent;
}

function testClientModule() {
  console.log('\n3. Checking client module exports...');
  
  const clientPath = path.join(__dirname, 'src/lib/api/client.ts');
  
  if (!fs.existsSync(clientPath)) {
    console.log('   ❌ client.ts file not found');
    return false;
  }
  
  const clientContent = fs.readFileSync(clientPath, 'utf8');
  
  const exportsWithCache = clientContent.includes('export const withCache');
  const exportsWithRetry = clientContent.includes('export const withRetry');
  const exportsApiClient = clientContent.includes('export const apiClient');
  
  if (exportsWithCache && exportsWithRetry && exportsApiClient) {
    console.log('   ✅ client.ts exports all required functions');
    return true;
  } else {
    console.log('   ❌ client.ts missing required exports');
    console.log(`      withCache: ${exportsWithCache}`);
    console.log(`      withRetry: ${exportsWithRetry}`);
    console.log(`      apiClient: ${exportsApiClient}`);
    return false;
  }
}

// Run all tests
async function runAllTests() {
  const results = [
    testImportFix(),
    testOtherServices(),
    testClientModule()
  ];
  
  const passedTests = results.filter(result => result).length;
  const totalTests = results.length;
  
  console.log('\n' + '='.repeat(50));
  console.log('🔧 IMPORT FIX TEST RESULTS');
  console.log('='.repeat(50));
  
  if (passedTests === totalTests) {
    console.log(`✅ ALL TESTS PASSED (${passedTests}/${totalTests})`);
    console.log('🎉 Import fix is working correctly!');
    console.log('📱 Dashboard should now compile without import errors.');
  } else {
    console.log(`❌ SOME TESTS FAILED (${passedTests}/${totalTests})`);
    console.log('🔧 Please review the failed tests and fix the issues.');
  }
  
  console.log('='.repeat(50));
  
  return passedTests === totalTests;
}

// Execute tests
runAllTests().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('Test execution failed:', error);
  process.exit(1);
});
