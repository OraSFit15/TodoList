// This is just a loader for the TypeScript compiled code
// Make sure NODE_ENV is set for development mode
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Just require the compiled TypeScript file
require('../../dist/main/main');

