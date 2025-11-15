const generateBtn = document.getElementById("generate");
const removeBtn = document.getElementById("remove");
const memoryUsageText = document.getElementById("memory-usage");
const container = document.getElementById("container");

// Update heap memory usage
function updateMemory() {
    if (performance && performance.memory) {
        const used = performance.memory.usedJSHeapSize; // in bytes
        const usedMB = used / (1024 * 1024);

        memoryUsageText.textContent = `Memory Usage: ${usedMB.toFixed(2)} MB`;

        // Alert if memory exceeds 50 MB
        if (used > 50 * 1024 * 1024) {
            alert("Memory usage exceeded 50 MB!");
        }
    }
}

// Generate 10,000 div elements
generateBtn.addEventListener("click", () => {
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < 10000; i++) {
        const div = document.createElement("div");
        div.textContent = `Item ${i + 1}`;
        fragment.appendChild(div);
    }

    container.appendChild(fragment);

    setTimeout(updateMemory, 50); // slight delay so DOM gets updated
});

// Remove all generated elements
removeBtn.addEventListener("click", () => {
    container.innerHTML = "";
    setTimeout(updateMemory, 50);
});

// Initial memory check
updateMemory();
