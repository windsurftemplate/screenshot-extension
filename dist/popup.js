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

/***/ "./src/popup.ts":
/*!**********************!*\
  !*** ./src/popup.ts ***!
  \**********************/
/***/ (() => {

eval("\ndocument.addEventListener('DOMContentLoaded', () => {\n    const actionButton = document.getElementById('actionButton');\n    const previewImage = document.getElementById('previewImage');\n    const loading = document.getElementById('loading');\n    const error = document.getElementById('error');\n    const noPreview = document.getElementById('noPreview');\n    let isPreviewMode = true;\n    function showError(message) {\n        loading.style.display = 'none';\n        error.textContent = message;\n        error.style.display = 'block';\n        noPreview.style.display = 'block';\n        previewImage.style.display = 'none';\n    }\n    function takeScreenshot() {\n        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {\n            if (!tabs[0]) {\n                showError('No active tab found');\n                return;\n            }\n            chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {\n                if (chrome.runtime.lastError) {\n                    showError(chrome.runtime.lastError.message);\n                    return;\n                }\n                previewImage.src = dataUrl;\n                previewImage.onload = () => {\n                    loading.style.display = 'none';\n                    previewImage.style.display = 'block';\n                    noPreview.style.display = 'none';\n                    // Change to screenshot mode\n                    isPreviewMode = false;\n                    actionButton.textContent = 'Screenshot';\n                    actionButton.classList.add('screenshot');\n                };\n            });\n        });\n    }\n    function downloadScreenshot() {\n        if (!previewImage.src) {\n            showError('No screenshot to download');\n            return;\n        }\n        chrome.downloads.download({\n            url: previewImage.src,\n            filename: 'screenshot.png'\n        }, () => {\n            if (chrome.runtime.lastError) {\n                showError(chrome.runtime.lastError.message);\n                return;\n            }\n            // Reset to preview mode\n            isPreviewMode = true;\n            actionButton.textContent = 'Preview';\n            actionButton.classList.remove('screenshot');\n            previewImage.style.display = 'none';\n            noPreview.style.display = 'block';\n        });\n    }\n    actionButton.addEventListener('click', () => {\n        if (isPreviewMode) {\n            loading.style.display = 'block';\n            error.style.display = 'none';\n            noPreview.style.display = 'none';\n            previewImage.style.display = 'none';\n            takeScreenshot();\n        }\n        else {\n            downloadScreenshot();\n        }\n    });\n});\n\n\n//# sourceURL=webpack://browser-extension/./src/popup.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/popup.ts"]();
/******/ 	
/******/ })()
;