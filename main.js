// Create a function to initialize the page
function initializePage() {
    // Set up the document language
    document.documentElement.lang = 'en';
    
    // Access the head element of the document
    const head = document.head;

    // Create and append meta element for character set
    const metaCharset = document.createElement('meta');
    metaCharset.setAttribute('charset', 'UTF-8');
    head.appendChild(metaCharset);

    // Create and append meta element for viewport settings
    const metaViewport = document.createElement('meta');
    metaViewport.name = 'viewport';
    metaViewport.content = 'width=device-width, initial-scale=1.0';
    head.appendChild(metaViewport);

    // Create and append title element
    const title = document.createElement('title');
    title.textContent = 'Our FYP Project';
    head.appendChild(title);

    // Create and append style element with CSS rules
    const style = document.createElement('style');
    style.textContent = `
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            flex-direction: column;
        }
        .project-container {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .project-container h1 {
            font-size: 2.5em;
            margin-bottom: 20px;
            color: #333;
        }
        .project-container button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            font-size: 1.2em;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
            width: 100%;
        }
        .project-container button:hover {
            background-color: #45a049;
        }
    `;
    head.appendChild(style);

    // Access the body element of the document
    const body = document.body;

    // Create and append a div element for project container
    const projectContainer = document.createElement('div');
    projectContainer.className = 'project-container';
    body.appendChild(projectContainer);

    // Create and append a header element inside the project container
    const header = document.createElement('header');
    projectContainer.appendChild(header);

    // Create and append an h1 element inside the header
    const h1 = document.createElement('h1');
    h1.textContent = 'Our FYP Project';
    header.appendChild(h1);

    // Create and append the first button inside the project container
    const button1 = document.createElement('button');
    button1.textContent = 'Go to Project Description';
    button1.onclick = () => location.href = 'project_description.html'; // Navigate to project description page
    projectContainer.appendChild(button1);

    // Create and append the second button inside the project container
    const button2 = document.createElement('button');
    button2.textContent = 'Carbon Emission Calculator';
    button2.onclick = () => location.href = 'login.html'; // Navigate to login page
    projectContainer.appendChild(button2);

    // Add an event listener for the DOMContentLoaded event
    document.addEventListener('DOMContentLoaded', () => {
        console.log('Document loaded and ready to go!'); // Log message when the document is fully loaded
    });
}

// Call the function to initialize the page
initializePage();