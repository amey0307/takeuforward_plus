document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('enableKeydown');
    chrome.storage.sync.get(['enableKeydown'], (result) => {
        checkbox.checked = !!result.enableKeydown;
    });

    checkbox.addEventListener('change', () => {
        chrome.storage.sync.set({ enableKeydown: checkbox.checked });
    });
});