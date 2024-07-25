// Create a function to initialize the page
function initializePage() {
    // Set up the document structure
    document.documentElement.lang = 'en';
    
    // Set up the head element
    const head = document.head;

    // Meta elements
    const metaCharset = document.createElement('meta');
    metaCharset.setAttribute('charset', 'UTF-8');
    head.appendChild(metaCharset);

    const metaViewport = document.createElement('meta');
    metaViewport.name = 'viewport';
    metaViewport.content = 'width=device-width, initial-scale=1.0';
    head.appendChild(metaViewport);

    // Title element
    const title = document.createElement('title');
    title.textContent = 'Our FYP Project';
    head.appendChild(title);

    // Style element
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

    // Set up the body element
    const body = document.body;

    // Project container
    const projectContainer = document.createElement('div');
    projectContainer.className = 'project-container';
    body.appendChild(projectContainer);

    // Header
    const header = document.createElement('header');
    projectContainer.appendChild(header);

    const h1 = document.createElement('h1');
    h1.textContent = 'Our FYP Project';
    header.appendChild(h1);

    // Buttons
    const button1 = document.createElement('button');
    button1.textContent = 'Go to Project Description';
    button1.onclick = () => location.href = '/projectdescription';
    projectContainer.appendChild(button1);

    const button2 = document.createElement('button');
    button2.textContent = 'Carbon Emission Calculator';
    button2.onclick = () => location.href = '/login';
    projectContainer.appendChild(button2);

    // Add event listener for DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => {
        console.log('Document loaded and ready to go!');
    });
}

// Initialize the page
initializePage();