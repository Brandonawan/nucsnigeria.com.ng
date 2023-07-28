const totalSubscriptionsElement = document.getElementById('totalSubscriptions');

// Make the HTTP request to get the total count
fetch('/newsletter/count')
  .then(response => response.json())
  .then(data => {
    const totalSubscriptions = data.totalSubscriptions;
    // Display the count on the UI
    totalSubscriptionsElement.textContent = ` ${totalSubscriptions}`;
  })
  .catch(error => console.error(error));