import React, { useState } from 'react';
import FeedbackForm from './FeedbackForm';

const FeedbackSelector = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Select Feedback Category</h2>
      <select
        className="border p-2 rounded w-full mb-6"
        value={selectedCategory}
        onChange={handleChange}
      >
        <option value="">-- Select Category --</option>
        <option value="product">Product</option>
        <option value="service">Service</option>
        <option value="website">Website</option>
        <option value="support">Support</option>
        <option value="other">Other</option>
      </select>

      {selectedCategory && <FeedbackForm category={selectedCategory} />}
    </div>
  );
};

export default FeedbackSelector;
