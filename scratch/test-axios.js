try {
    const axios = require('axios');
    console.log('Axios version:', axios.version || 'unknown');
    console.log('Successfully resolved axios');
} catch (e) {
    console.error('Failed to resolve axios:', e.message);
}
