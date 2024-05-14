const emailTemplate = (URL, title, description) => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>${title}</title>
    
    </head>
    
    <body>
    
        <p>${description}</p>
    
        <p><a href="${URL}">${title}</a></p>
    
    </body>
    
    </html> `;
}

module.exports = emailTemplate;
