// Function to update images dynamically based on input
function updateImage(cellNumber) {
    const imageInputId = `image${cellNumber}`;
    const imageSrc = document.getElementById(imageInputId).value;

    const imageElementId = `image-${cellNumber}`;
    document.getElementById(imageElementId).src = imageSrc;

    // Adjust heights after the image loads
    adjustCellHeights();
}

// Function to ensure all cells have equal height
function adjustCellHeights() {
    // Get all cell elements
    const cells = document.querySelectorAll('td');

    // Reset height to auto to measure the natural height
    cells.forEach(cell => {
        cell.style.height = 'auto';
    });

    // Find the maximum height of all cells
    let maxHeight = 0;
    cells.forEach(cell => {
        const cellHeight = cell.offsetHeight;
        if (cellHeight > maxHeight) {
            maxHeight = cellHeight;
        }
    });

    // Set all cells to the maximum height
    cells.forEach(cell => {
        cell.style.height = `${maxHeight}px`;
    });
}

// Function to download the current HTML and CSS content
function downloadHtmlFile() {
    // Get the table content
    const tableHtml = document.getElementById('contentTable').outerHTML;

    // Create the CSS styles
    const styles = `
        <style>
            body {
                margin: 0;
                padding: 0;
            }
            table {
                border-spacing: 16px; /* Updated border-spacing to 16px */
                border-collapse: separate; /* Keep borders separate for spacing */
                max-width: 600px;
                width: 100%;
                background-color: #D0E6FF;
                margin: 0 auto;
            }
            td {
                padding: 16px;
                vertical-align: top;
                text-align: left;
                width: 50%;
                min-height: 100px;
                word-wrap: break-word; /* Allow long words to wrap */
                overflow-wrap: break-word; /* Prevent overflow of long words */
                overflow: hidden; /* Prevent overflowing text */
                white-space: normal; /* Allow normal line breaking */
                word-break: break-all; /* Break long words */
                hyphens: auto; /* Enable hyphenation */
            }
            .cell-1 {
                background-color: #0056b3;
                color: white;
            }
            .content-cell {
                background-color: #F0F8FF;
            }
            .image {
                width: 100%;
                height: auto;
                object-fit: contain;
                display: block;
                margin: 0 auto;
            }
            @media only screen and (max-width: 480px) {
                td {
                    display: block;
                    width: 100%;
                }
                img {
                    width: 100% !important;
                    height: auto !important;
                    object-fit: contain;
                }
            }
        </style>
    `;

    // Create the complete HTML document
    // Remove contenteditable attributes from the cells for the downloaded file
    const nonEditableTableHtml = tableHtml.replace(/contenteditable="true"/g, 'contenteditable="false"');

    const completeHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Downloaded Table</title>
            ${styles}
        </head>
        <body>
            ${nonEditableTableHtml}
        </body>
        </html>
    `;

    // Create a blob with the complete HTML content
    const blob = new Blob([completeHtml], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'email_template.html';

    // Trigger the download
    link.click();
}

// Add event listeners to each content-editable cell for text changes
document.querySelectorAll('[contenteditable="true"]').forEach(cell => {
    cell.addEventListener('input', adjustCellHeights);
});

// Call adjustCellHeights when the window is resized to ensure responsiveness
window.addEventListener('resize', adjustCellHeights);

// Call adjustCellHeights after DOM content is loaded
window.addEventListener('DOMContentLoaded', adjustCellHeights);
