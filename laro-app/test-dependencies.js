// Test script to verify dependencies are working
console.log('Testing dependencies...');

try {
  // Test react-hot-toast
  const toast = require('react-hot-toast');
  console.log('✅ react-hot-toast loaded successfully');
} catch (error) {
  console.log('❌ react-hot-toast failed:', error.message);
}

try {
  // Test socket.io
  const { Server } = require('socket.io');
  console.log('✅ socket.io loaded successfully');
} catch (error) {
  console.log('❌ socket.io failed:', error.message);
}

try {
  // Test Next.js
  const next = require('next');
  console.log('✅ Next.js loaded successfully');
} catch (error) {
  console.log('❌ Next.js failed:', error.message);
}

console.log('Dependency test completed!');
