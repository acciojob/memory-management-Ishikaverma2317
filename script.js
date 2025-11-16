import React, { useState, useEffect } from "react";

export default function MemoryManagement() {
  const [elements, setElements] = useState([]); // stores generated divs as array
  const [memoryUsageMB, setMemoryUsageMB] = useState(0);

  // Function to update memory usage display
  function updateMemoryUsage() {
    if (performance && performance.memory) {
      const usedMB = performance.memory.usedJSHeapSize / (1024 * 1024);
      setMemoryUsageMB(usedMB.toFixed(2));
    } else {
      // If performance.memory not supported, show 0 or N/A
      setMemoryUsageMB("N/A");
    }
  }

  // Call updateMemoryUsage on mount and then every 1 second
  useEffect(() => {
    updateMemoryUsage();
    const interval = setInterval(updateMemoryUsage, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle generate button click
  const handleGenerate = () => {
    // Generate an array with 10,000 elements
    const newElements = Array.from({ length: 10000 }, (_, i) => i);

    setElements(newElements);

    // Update memory usage after a short delay so DOM updates
    setTimeout(() => {
      if (performance && performance.memory) {
        const usedMB = performance.memory.usedJSHeapSize / (1024 * 1024);
        setMemoryUsageMB(usedMB.toFixed(2));

        if (usedMB > 50) {
          alert(
            "Memory usage exceeded 50 MB. Consider removing elements to reduce memory consumption."
          );
        }
      }
    }, 100);
  };

  // Handle remove button click
  const handleRemove = () => {
    setElements([]);
    // Update memory usage shortly after removing elements
    setTimeout(() => {
      updateMemoryUsage();
    }, 100);
  };

  return (
    <div>
      <button id="generate" onClick={handleGenerate}>
        Generate Elements
      </button>
      <button id="remove" onClick={handleRemove}>
        Remove Elements
      </button>

      <p id="memory-usage">Memory Usage: {memoryUsageMB} MB</p>

      <div id="container">
        {elements.map((i) => (
          <div key={i}>Item {i + 1}</div>
        ))}
      </div>
    </div>
  );
}
