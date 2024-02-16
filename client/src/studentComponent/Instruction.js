import React from 'react'

export default function Instruction() {
  return (
    <div className='instruction-main-container'>
      <div className="instruction-container">
      <h1>Instructions</h1>
      <ul>
        <li>Number of Questions: 5</li>
        <li>Duration: 30 minutes</li>
        <li>Do not switch tabs during the test</li>
        <li>Read each question carefully before answering.</li>
        <li>Review your answers before submitting the test.</li>
        <li>Submit the test before the timer expires.</li>
        <li>Do not use any external resources or assistance during the test.</li>
      </ul>
      <p>All the best!</p>
      <button className="start-test-button">Start Test</button>
    </div>
    </div>
  )
}
