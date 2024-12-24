/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content.ts":
/*!************************!*\
  !*** ./src/content.ts ***!
  \************************/
/***/ (() => {

eval("\n// Function to get computed styles for an element\nfunction getElementStyles(element) {\n    const styles = window.getComputedStyle(element);\n    const importantStyles = {};\n    // List of important style properties we want to capture\n    const styleProps = [\n        'display', 'position', 'width', 'height', 'margin', 'padding',\n        'background-color', 'color', 'font-family', 'font-size',\n        'border', 'border-radius', 'box-shadow', 'flex', 'grid',\n        'transform', 'opacity', 'z-index', 'text-align'\n    ];\n    styleProps.forEach(prop => {\n        const value = styles.getPropertyValue(prop);\n        if (value && value !== 'none' && value !== 'normal' && value !== '0px') {\n            importantStyles[prop] = value;\n        }\n    });\n    return importantStyles;\n}\n// Function to get HTML with inline styles\nfunction getHTMLWithStyles(node = document.body, isRoot = true) {\n    var _a;\n    // Skip script tags and hidden elements\n    if (node instanceof HTMLElement) {\n        if (node.tagName === 'SCRIPT' || node.style.display === 'none') {\n            return '';\n        }\n    }\n    let html = '';\n    // Handle text nodes\n    if (node.nodeType === Node.TEXT_NODE) {\n        const text = ((_a = node.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';\n        if (text) {\n            html += text;\n        }\n        return html;\n    }\n    // Handle element nodes\n    if (node.nodeType === Node.ELEMENT_NODE && node instanceof HTMLElement) {\n        const tag = node.tagName.toLowerCase();\n        const styles = getElementStyles(node);\n        // Start tag\n        html += '<' + tag;\n        // Add id if exists\n        if (node.id) {\n            html += ` id=\"${node.id}\"`;\n        }\n        // Add classes if exist\n        if (node.className) {\n            html += ` class=\"${node.className}\"`;\n        }\n        // Add inline styles\n        if (Object.keys(styles).length > 0) {\n            const styleStr = Object.entries(styles)\n                .map(([prop, value]) => `${prop}: ${value}`)\n                .join('; ');\n            html += ` style=\"${styleStr}\"`;\n        }\n        html += '>';\n        // Add newline and indent for better formatting\n        if (node.children.length > 0) {\n            html += '\\n';\n        }\n        // Process child nodes\n        Array.from(node.childNodes).forEach(child => {\n            const childHtml = getHTMLWithStyles(child, false);\n            if (childHtml) {\n                html += '  ' + childHtml.split('\\n').join('\\n  ') + '\\n';\n            }\n        });\n        // Close tag\n        html += '</' + tag + '>';\n        // Add doctype and html/head tags if this is the root element\n        if (isRoot) {\n            const doctype = '<!DOCTYPE html>\\n';\n            const head = document.head.outerHTML;\n            html = doctype + '<html>\\n' + head + '\\n' + html + '\\n</html>';\n        }\n    }\n    return html;\n}\n// Initialize message listener\nchrome.runtime.onMessage.addListener((request, sender, sendResponse) => {\n    console.log('Received message:', request); // Debug log\n    if (request.type === 'SCRAPE_PAGE') {\n        try {\n            console.log('Starting page scrape...'); // Debug log\n            const completeHTML = getHTMLWithStyles(document.documentElement, true);\n            console.log('Scraping complete'); // Debug log\n            sendResponse({\n                success: true,\n                data: completeHTML\n            });\n        }\n        catch (error) {\n            console.error('Scraping error:', error); // Debug log\n            sendResponse({\n                success: false,\n                error: error instanceof Error ? error.message : 'Failed to scrape page'\n            });\n        }\n    }\n    return true; // Keep the message channel open for async response\n});\n\n\n//# sourceURL=webpack://browser-extension/./src/content.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/content.ts"]();
/******/ 	
/******/ })()
;