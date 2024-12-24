document.addEventListener('DOMContentLoaded', () => {
    const actionButton = document.getElementById('actionButton');
    const previewImage = document.getElementById('previewImage');
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const noPreview = document.getElementById('noPreview');
    let isPreviewMode = true;

    function showError(message) {
        loading.style.display = 'none';
        error.textContent = message;
        error.style.display = 'block';
        noPreview.style.display = 'block';
        previewImage.style.display = 'none';
    }

    function takeScreenshot() {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (!tabs[0]) {
                showError('No active tab found');
                return;
            }

            chrome.tabs.captureVisibleTab(null, {format: 'png'}, (dataUrl) => {
                if (chrome.runtime.lastError) {
                    showError(chrome.runtime.lastError.message);
                    return;
                }

                previewImage.src = dataUrl;
                previewImage.onload = () => {
                    loading.style.display = 'none';
                    previewImage.style.display = 'block';
                    noPreview.style.display = 'none';
                    
                    // Change to screenshot mode
                    isPreviewMode = false;
                    actionButton.textContent = 'Screenshot';
                    actionButton.classList.add('screenshot');
                };
            });
        });
    }

    function downloadScreenshot() {
        if (!previewImage.src) {
            showError('No screenshot to download');
            return;
        }

        chrome.downloads.download({
            url: previewImage.src,
            filename: 'screenshot.png'
        }, () => {
            if (chrome.runtime.lastError) {
                showError(chrome.runtime.lastError.message);
                return;
            }

            // Reset to preview mode
            isPreviewMode = true;
            actionButton.textContent = 'Preview';
            actionButton.classList.remove('screenshot');
            previewImage.style.display = 'none';
            noPreview.style.display = 'block';
        });
    }

    actionButton.addEventListener('click', () => {
        if (isPreviewMode) {
            loading.style.display = 'block';
            error.style.display = 'none';
            noPreview.style.display = 'none';
            previewImage.style.display = 'none';
            takeScreenshot();
        } else {
            downloadScreenshot();
        }
    });
});
