// JavaScript to handle form submission
document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
  
    // Collect form data
    const formData = {
      enrollmentNo: document.getElementById('enrollmentNo').value,
      cgpa: parseFloat(document.getElementById('cgpa').value),
      name: document.getElementById('name').value,
      rollNo: document.getElementById('rollNo').value,
      dob: document.getElementById('dob').value,
      linkedin: document.getElementById('linkedin').value,
      github: document.getElementById('github').value,
      skills: document.getElementById('skills').value.split(',').map(skill => skill.trim()), // Split skills by comma and trim whitespace

      researchPapers: parseInt(document.getElementById('researchPapers').value) || 0, // Default to 0 if empty
      researchPaperUrls: document.getElementById('researchPaperUrls').value.split(',').map(url => url.trim()),
      patents: parseInt(document.getElementById('patents').value) || 0, // Default to 0 if empty
      patentUrls: document.getElementById('patentUrls').value.split(',').map(url => url.trim())
    };
  
    // Send data to backend (server.js)
    fetch('/submit', { // Change to match the endpoint in server.js
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        alert('Student data submitted successfully!');
        // Optionally, redirect to another page or clear the form
      } else {
        alert('Error submitting data. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error submitting data. Please try again.');
    });
});
