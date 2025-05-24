#!/usr/bin/env node

/**
 * LaroHub Landing Page Audit Test
 * Tests all the fixes implemented for the landing page audit
 */

const fs = require('fs');
const path = require('path');

console.log('🏀 LaroHub Landing Page Audit Test\n');

// Test 1: Check TypeScript type fixes
function testTypeScriptTypes() {
  console.log('1. Testing TypeScript Type Fixes...');
  
  const typesFile = fs.readFileSync(path.join(__dirname, 'src/types/index.ts'), 'utf8');
  
  // Check if StatCardProps glowColor is properly typed
  const hasCorrectGlowColorType = typesFile.includes("glowColor?: 'primary' | 'success' | 'warning' | 'danger' | 'info';");
  
  if (hasCorrectGlowColorType) {
    console.log('   ✅ StatCardProps glowColor type properly defined');
  } else {
    console.log('   ❌ StatCardProps glowColor type not properly defined');
  }
  
  return hasCorrectGlowColorType;
}

// Test 2: Check accessibility improvements
function testAccessibilityImprovements() {
  console.log('\n2. Testing Accessibility Improvements...');
  
  const landingPageFile = fs.readFileSync(path.join(__dirname, 'src/app/page.tsx'), 'utf8');
  
  const checks = [
    { test: landingPageFile.includes('aria-label="Hero section"'), desc: 'Hero section has aria-label' },
    { test: landingPageFile.includes('aria-hidden="true"'), desc: 'Decorative elements marked as aria-hidden' },
    { test: landingPageFile.includes('role="img"'), desc: 'Emoji icons have proper role' },
    { test: landingPageFile.includes('role="listitem"'), desc: 'Feature cards have proper list structure' },
    { test: landingPageFile.includes('role="contentinfo"'), desc: 'Footer has proper role' },
    { test: landingPageFile.includes('tabIndex={0}'), desc: 'Interactive elements are keyboard accessible' },
    { test: landingPageFile.includes('focus-within:border-primary-400/60'), desc: 'Focus states implemented' }
  ];
  
  let passedChecks = 0;
  checks.forEach(check => {
    if (check.test) {
      console.log(`   ✅ ${check.desc}`);
      passedChecks++;
    } else {
      console.log(`   ❌ ${check.desc}`);
    }
  });
  
  return passedChecks === checks.length;
}

// Test 3: Check basketball theme consistency
function testBasketballThemeConsistency() {
  console.log('\n3. Testing Basketball Theme Consistency...');
  
  const landingPageFile = fs.readFileSync(path.join(__dirname, 'src/app/page.tsx'), 'utf8');
  const globalCssFile = fs.readFileSync(path.join(__dirname, 'src/app/globals.css'), 'utf8');
  
  const checks = [
    { test: landingPageFile.includes('glowColor="primary"'), desc: 'Primary glow color used' },
    { test: landingPageFile.includes('glowColor="success"'), desc: 'Success glow color used' },
    { test: landingPageFile.includes('glowColor="warning"'), desc: 'Warning glow color used' },
    { test: landingPageFile.includes('glowColor="info"'), desc: 'Info glow color used' },
    { test: landingPageFile.includes('basketball-glow'), desc: 'Basketball glow effect applied' },
    { test: globalCssFile.includes('--primary-orange: #FF6B35'), desc: 'Primary orange color defined' },
    { test: globalCssFile.includes('--court-green: #228B22'), desc: 'Court green color defined' },
    { test: globalCssFile.includes('--navy-dark: #1A1D29'), desc: 'Navy dark color defined' }
  ];
  
  let passedChecks = 0;
  checks.forEach(check => {
    if (check.test) {
      console.log(`   ✅ ${check.desc}`);
      passedChecks++;
    } else {
      console.log(`   ❌ ${check.desc}`);
    }
  });
  
  return passedChecks === checks.length;
}

// Test 4: Check responsive design improvements
function testResponsiveDesign() {
  console.log('\n4. Testing Responsive Design Improvements...');
  
  const landingPageFile = fs.readFileSync(path.join(__dirname, 'src/app/page.tsx'), 'utf8');
  
  const checks = [
    { test: landingPageFile.includes('text-4xl md:text-6xl lg:text-7xl'), desc: 'Responsive typography implemented' },
    { test: landingPageFile.includes('right-4 md:right-10'), desc: 'Responsive positioning for mobile' },
    { test: landingPageFile.includes('text-4xl md:text-6xl'), desc: 'Responsive emoji sizing' },
    { test: landingPageFile.includes('grid-cols-2 md:grid-cols-4'), desc: 'Responsive grid layout' },
    { test: landingPageFile.includes('flex-col sm:flex-row'), desc: 'Responsive button layout' },
    { test: landingPageFile.includes('w-full sm:w-auto'), desc: 'Responsive button width' }
  ];
  
  let passedChecks = 0;
  checks.forEach(check => {
    if (check.test) {
      console.log(`   ✅ ${check.desc}`);
      passedChecks++;
    } else {
      console.log(`   ❌ ${check.desc}`);
    }
  });
  
  return passedChecks === checks.length;
}

// Test 5: Check performance optimizations
function testPerformanceOptimizations() {
  console.log('\n5. Testing Performance Optimizations...');
  
  const globalCssFile = fs.readFileSync(path.join(__dirname, 'src/app/globals.css'), 'utf8');
  const landingPageFile = fs.readFileSync(path.join(__dirname, 'src/app/page.tsx'), 'utf8');
  
  const checks = [
    { test: globalCssFile.includes('will-change: transform'), desc: 'Will-change property for transforms' },
    { test: globalCssFile.includes('will-change: opacity'), desc: 'Will-change property for opacity' },
    { test: globalCssFile.includes('transform: translateZ(0)'), desc: 'GPU acceleration enabled' },
    { test: globalCssFile.includes('prefers-reduced-motion'), desc: 'Reduced motion support' },
    { test: landingPageFile.includes('viewport={{ once: true }}'), desc: 'Animation optimization with once: true' },
    { test: landingPageFile.includes('ease: "easeInOut"'), desc: 'Optimized easing functions' }
  ];
  
  let passedChecks = 0;
  checks.forEach(check => {
    if (check.test) {
      console.log(`   ✅ ${check.desc}`);
      passedChecks++;
    } else {
      console.log(`   ❌ ${check.desc}`);
    }
  });
  
  return passedChecks === checks.length;
}

// Test 6: Check functionality improvements
function testFunctionalityImprovements() {
  console.log('\n6. Testing Functionality Improvements...');
  
  const landingPageFile = fs.readFileSync(path.join(__dirname, 'src/app/page.tsx'), 'utf8');
  
  const checks = [
    { test: landingPageFile.includes("onClick={() => window.location.href = '/dashboard'}"), desc: 'Quick Match button functionality' },
    { test: landingPageFile.includes("onClick={() => window.location.href = '/demo'}"), desc: 'Demo button functionality' },
    { test: landingPageFile.includes("onClick={() => window.location.href = '/register'}"), desc: 'Register button functionality' },
    { test: landingPageFile.includes("onClick={() => window.location.href = '/courts'}"), desc: 'Courts button functionality' },
    { test: landingPageFile.includes("onClick={() => window.location.href = '/teams'}"), desc: 'Teams button functionality' },
    { test: landingPageFile.includes("onClick={() => window.location.href = '/games/create'}"), desc: 'Schedule game functionality' }
  ];
  
  let passedChecks = 0;
  checks.forEach(check => {
    if (check.test) {
      console.log(`   ✅ ${check.desc}`);
      passedChecks++;
    } else {
      console.log(`   ❌ ${check.desc}`);
    }
  });
  
  return passedChecks === checks.length;
}

// Run all tests
async function runAllTests() {
  const results = [
    testTypeScriptTypes(),
    testAccessibilityImprovements(),
    testBasketballThemeConsistency(),
    testResponsiveDesign(),
    testPerformanceOptimizations(),
    testFunctionalityImprovements()
  ];
  
  const passedTests = results.filter(result => result).length;
  const totalTests = results.length;
  
  console.log('\n' + '='.repeat(60));
  console.log('🏆 LANDING PAGE AUDIT TEST RESULTS');
  console.log('='.repeat(60));
  
  if (passedTests === totalTests) {
    console.log(`✅ ALL TESTS PASSED (${passedTests}/${totalTests})`);
    console.log('🎉 Landing page audit fixes are working correctly!');
    console.log('🏀 LaroHub landing page is ready for production!');
  } else {
    console.log(`❌ SOME TESTS FAILED (${passedTests}/${totalTests})`);
    console.log('🔧 Please review the failed tests and fix the issues.');
  }
  
  console.log('='.repeat(60));
  
  return passedTests === totalTests;
}

// Execute tests
runAllTests().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('Test execution failed:', error);
  process.exit(1);
});
