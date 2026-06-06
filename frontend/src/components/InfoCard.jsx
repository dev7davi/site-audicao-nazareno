import React from 'react';

export const InfoCard = ({ icon: Icon, title, description, items }) => {
  return (
    <div className="info-card">
      <div className="card-header">
        <Icon className="card-icon" size={32} />
        <h3>{title}</h3>
      </div>
      {description && <p className="card-description">{description}</p>}
      {items && (
        <ul className="card-items">
          {items.map((item, idx) => (
            <li key={idx}>
              <span className="item-dot"></span>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
