import React, { useState } from 'react';

function MultiCheckboxComponent() {
  // Step 1: Initialize state for multiple checkboxes
  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
  });

  // Step 2: Handle change event for checkboxes
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    // Update state based on checkbox name
    setCheckboxes((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Step 3: Render checkboxes and display their states
  return (
    <div>
      <label>
        <input
          type="checkbox"
          name="checkbox1"
          checked={checkboxes.checkbox1}
          onChange={handleCheckboxChange}
        />
        Checkbox 1
      </label>

      <label>
        <input
          type="checkbox"
          name="checkbox2"
          checked={checkboxes.checkbox2}
          onChange={handleCheckboxChange}
        />
        Checkbox 2
      </label>

      <label>
        <input
          type="checkbox"
          name="checkbox3"
          checked={checkboxes.checkbox3}
          onChange={handleCheckboxChange}
        />
        Checkbox 3
      </label>

      <div>
        <h3>Checkbox Status:</h3>
        <p>Checkbox 1 is {checkboxes.checkbox1 ? 'checked' : 'unchecked'}</p>
        <p>Checkbox 2 is {checkboxes.checkbox2 ? 'checked' : 'unchecked'}</p>
        <p>Checkbox 3 is {checkboxes.checkbox3 ? 'checked' : 'unchecked'}</p>
      </div>
    </div>
  );
}

export default MultiCheckboxComponent;
