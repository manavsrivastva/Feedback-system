import React, { useState } from 'react';

const FeedbackForm = ({ category }) => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Submitted feedback for ${category}: ${feedback}`);
    // You can replace this with your actual submission logic
    setFeedback("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded">
      <h3 className="text-xl font-semibold mb-2 capitalize">
        {category} Feedback
      </h3>
      <textarea
        className="w-full border p-2 mb-4 rounded"
        rows="4"
        placeholder={`Write your ${category} feedback...`}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default FeedbackForm;
