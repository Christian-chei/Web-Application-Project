document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('destinationSelect');
  const destinations = document.querySelectorAll('.destination');

  function showDestination(selectedValue) {
    destinations.forEach(dest => {
      if (selectedValue === 'all' || dest.id === selectedValue) {
        dest.style.display = 'block';
      } else {
        dest.style.display = 'none';
      }
    });
  }

  // Show all destinations initially
  showDestination('all');

  // Listen to dropdown changes
  select.addEventListener('change', (e) => {
    showDestination(e.target.value);
  });
});
