function makeResizable(element, options = {}) {
    if (!element || element.classList.contains("has-resizer")) return;

    const resizer = document.createElement("div");
    resizer.style.width = "6px";
    resizer.style.cursor = "col-resize";
    resizer.style.position = "absolute";
    resizer.style.top = "0";
    resizer.style.right = "0";
    resizer.style.bottom = "0";
    resizer.style.zIndex = "1000";
    resizer.style.background = "rgba(255,255,255,0.1)";
    resizer.className = "custom-resizer";

    if (options.useHandle) {
        resizer.innerHTML = `
          <div class="split-sash-content flex items-center justify-center absolute z-50 -top-5">
            <span class="border rounded-full p-1 border-gray-500 bg-white dark:bg-[#121212]">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m18 8 4 4-4 4"></path>
                <path d="M2 12h20"></path>
                <path d="m6 8-4 4 4 4"></path>
              </svg>
            </span>
          </div>
        `;
    }

    element.appendChild(resizer);
    element.classList.add("has-resizer");

    resizer.addEventListener("mousedown", function (e) {
        e.preventDefault();
        const startX = e.clientX;
        const startWidth = element.offsetWidth;

        function onMouseMove(e) {
            const newWidth = startWidth + (e.clientX - startX);
            element.style.width = `${newWidth}px`;
        }

        function onMouseUp() {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }

        // Add listeners only while mouse is pressed
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
}

function applyResizers() {
    // === 1. Sidebar Resizer ===
    const target1 = document.querySelector("#root > div:nth-child(1) > div.flex.relative.h-screen.font-dmSans.overflow-hidden.dark\\:bg-\\[\\#0F0F0F\\].opacity-100 > div.relative.h-screen.font-dmSans.md\\:flex.hidden > div.flex.flex-col.bg-\\[\\#000000\\].p-4.w-\\[218px\\].border-zinc-200");

    if (target1) {
        target1.style.width = "17vw";
        target1.style.minWidth = "150px";
        target1.style.maxWidth = "40vw";
        target1.style.position = "relative";
        makeResizable(target1, { useHandle: true });
    }

    // === 2. React Split Resizer ===
    const target2 = document.querySelector(".react-split__sash");
    if (target2 && target2.parentElement) {
        const container2 = target2.parentElement;
        container2.style.position = "relative";
        makeResizable(container2, { useHandle: false });
    }
}

// Observe for DOM changes
const observer = new MutationObserver(() => {
    applyResizers();
});

// Start observing after window is loaded
window.addEventListener("load", () => {
    observer.observe(document.body, { childList: true, subtree: false });
    applyResizers(); // initial run
});

function setupTheoryViewToggle() {
    document.addEventListener("keydown", function (event) {
        if (event.key === "T" || event.key === "t") {
            const allStickyDivs = document.querySelectorAll('div.sticky');
            let checkbox = null;

            allStickyDivs.forEach(div => {
                const labelText = div.querySelector('p')?.textContent.trim();
                if (labelText === 'Theory View') {
                    checkbox = div.querySelector('input[type="checkbox"].peer');
                }
            });

            if (checkbox) {
                checkbox.click(); // Visually toggles + triggers all peer styles
            }
        }

        // === Mark Complete with "C" key ===
        if (event.key === "C" || event.key === "c") {
            const checkbox = document.getElementById("markComplete");
            if (checkbox) {
                checkbox.click(); // Simulates a real user click
            }
        }
    });
}

// Start observing after window is loaded
window.addEventListener("load", () => {
    observer.observe(document.body, { childList: true, subtree: false });
    applyResizers(); // initial run
    setupTheoryViewToggle(); // add this line
});