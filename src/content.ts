interface ElementStyles {
    [key: string]: string;
}

// Function to get computed styles for an element
function getElementStyles(element: HTMLElement): ElementStyles {
    const styles = window.getComputedStyle(element);
    const importantStyles: ElementStyles = {};
    
    // List of important style properties we want to capture
    const styleProps = [
        'display', 'position', 'width', 'height', 'margin', 'padding',
        'background-color', 'color', 'font-family', 'font-size',
        'border', 'border-radius', 'box-shadow', 'flex', 'grid',
        'transform', 'opacity', 'z-index', 'text-align'
    ];
    
    styleProps.forEach(prop => {
        const value = styles.getPropertyValue(prop);
        if (value && value !== 'none' && value !== 'normal' && value !== '0px') {
            importantStyles[prop] = value;
        }
    });
    
    return importantStyles;
}

// Function to get HTML with inline styles
function getHTMLWithStyles(node: Node = document.body, isRoot: boolean = true): string {
    // Skip script tags and hidden elements
    if (node instanceof HTMLElement) {
        if (node.tagName === 'SCRIPT' || node.style.display === 'none') {
            return '';
        }
    }
    
    let html = '';
    
    // Handle text nodes
    if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent?.trim() || '';
        if (text) {
            html += text;
        }
        return html;
    }
    
    // Handle element nodes
    if (node.nodeType === Node.ELEMENT_NODE && node instanceof HTMLElement) {
        const tag = node.tagName.toLowerCase();
        const styles = getElementStyles(node);
        
        // Start tag
        html += '<' + tag;
        
        // Add id if exists
        if (node.id) {
            html += ` id="${node.id}"`;
        }
        
        // Add classes if exist
        if (node.className) {
            html += ` class="${node.className}"`;
        }
        
        // Add inline styles
        if (Object.keys(styles).length > 0) {
            const styleStr = Object.entries(styles)
                .map(([prop, value]) => `${prop}: ${value}`)
                .join('; ');
            html += ` style="${styleStr}"`;
        }
        
        html += '>';
        
        // Add newline and indent for better formatting
        if (node.children.length > 0) {
            html += '\n';
        }
        
        // Process child nodes
        Array.from(node.childNodes).forEach(child => {
            const childHtml = getHTMLWithStyles(child, false);
            if (childHtml) {
                html += '  ' + childHtml.split('\n').join('\n  ') + '\n';
            }
        });
        
        // Close tag
        html += '</' + tag + '>';
        
        // Add doctype and html/head tags if this is the root element
        if (isRoot) {
            const doctype = '<!DOCTYPE html>\n';
            const head = document.head.outerHTML;
            html = doctype + '<html>\n' + head + '\n' + html + '\n</html>';
        }
    }
    
    return html;
}

// Initialize message listener
chrome.runtime.onMessage.addListener((
    request: { type: string },
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: { success: boolean; data?: string; error?: string }) => void
) => {
    console.log('Received message:', request); // Debug log
    
    if (request.type === 'SCRAPE_PAGE') {
        try {
            console.log('Starting page scrape...'); // Debug log
            const completeHTML = getHTMLWithStyles(document.documentElement, true);
            console.log('Scraping complete'); // Debug log
            
            sendResponse({ 
                success: true, 
                data: completeHTML
            });
        } catch (error) {
            console.error('Scraping error:', error); // Debug log
            sendResponse({ 
                success: false, 
                error: error instanceof Error ? error.message : 'Failed to scrape page'
            });
        }
    }
    return true; // Keep the message channel open for async response
});
