// Function to fetch data from server and display it
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display data in the UI
// Function to display data in the UI
function displayData(data) {
    const dataList = document.getElementById('dataList');

    data.forEach(entry => {
        const listItem = document.createElement('div');
        listItem.classList.add('data-item');
        listItem.innerHTML = `
            <h2>${entry.name}</h2>
            <p>Enrollment No: ${entry.enrollmentNo}</p>
            <p>CGPA: ${entry.cgpa}</p>
            <p>Roll No: ${entry.rollNo}</p>
            <p>Date of Birth: ${new Date(entry.dob).toLocaleDateString()}</p>
            <p>LinkedIn: <a href="${entry.linkedin}" target="_blank">${entry.linkedin}</a></p>
            <p>GitHub: <a href="${entry.github}" target="_blank">${entry.github}</a></p>
            <p>Skills: ${entry.skills.join(', ')}</p>
            <p>Skill Scores: ${entry.skillscore.join(', ')}</p>
            <p>Research Papers: ${entry.researchPapers}</p>
            <p>Research Paper URLs: ${entry.researchPaperUrls.join(', ')}</p>
            <p>Patents: ${entry.patents}</p>
            <p>Patent URLs: ${entry.patentUrls.join(', ')}</p>
            <button onclick="showDetails('${entry._id}')">Show Details</button>
        `;
        dataList.appendChild(listItem);
    });
}


// Function to show details of a specific entry
async function showDetails(id) {
    try {
        const response = await fetch(`/api/data/${id}`);
        const entry = await response.json();
        alert(JSON.stringify(entry)); // Replace this with your UI logic to display detailed entry
    } catch (error) {
        console.error('Error fetching entry details:', error);
    }
}

// Call the fetchData function when the page loads
fetchData();
