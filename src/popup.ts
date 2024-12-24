document.addEventListener('DOMContentLoaded', () => {
    const actionButton = document.getElementById('actionButton') as HTMLButtonElement;
    const previewImage = document.getElementById('previewImage') as HTMLImageElement;
    const loading = document.getElementById('loading') as HTMLElement;
    const error = document.getElementById('error') as HTMLElement;
    const noPreview = document.getElementById('noPreview') as HTMLElement;
    let isPreviewMode = true;

    function showError(message: string): void {
        loading.style.display = 'none';
        error.textContent = message;
        error.style.display = 'block';
        noPreview.style.display = 'block';
        previewImage.style.display = 'none';
    }

    function takeScreenshot(): void {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (!tabs[0]?.id) {
                showError('No active tab found');
                return;
            }

            chrome.tabs.captureVisibleTab(tabs[0].windowId ?? chrome.windows.WINDOW_ID_CURRENT, {format: 'png'}, (dataUrl) => {
                if (chrome.runtime.lastError) {
                    showError(chrome.runtime.lastError.message || 'Unknown error');
                    return;
                }

                if (dataUrl) {
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
                }
            });
        });
    }

    function downloadScreenshot(): void {
        if (!previewImage.src) {
            showError('No screenshot to download');
            return;
        }

        chrome.downloads.download({
            url: previewImage.src,
            filename: 'screenshot.png'
        }, () => {
            if (chrome.runtime.lastError) {
                showError(chrome.runtime.lastError.message || 'Download failed');
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
