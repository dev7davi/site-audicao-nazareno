import React from 'react';

export const ProcessTimeline = () => {
  const steps = [
    { num: 1, label: 'Inscrição Online' },
    { num: 2, label: 'Audição Prática' },
    { num: 3, label: 'Entrevista Pastoral' },
    { num: 4, label: 'Integração' }
  ];
  
  return (
    <div className="process-timeline">
      {steps.map((step) => (
        <div key={step.num} className="timeline-item completed">
          <div className="timeline-dot">0{step.num}</div>
          <p>{step.label}</p>
        </div>
      ))}
    </div>
  );
};
