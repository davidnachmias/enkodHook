// Mock User entity for testing purposes
export const User = {
  // Simulate fetching the current user (returns a Promise)
  me: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          full_name: 'Guest User',
          email: 'guest@example.com'
        });
      }, 200); // Simulate async delay
    });
  }
};
