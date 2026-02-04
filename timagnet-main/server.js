import('./server/index.js')
  .then(() => console.log('Server module loaded successfully'))
  .catch(err => {
    console.error('Failed to load server module:', err);
    process.exit(1);
  });
