import React from 'react';

const COLOR_HEX_FALLBACK = {
  primary:   '#4e73df',
  success:   '#1cc88a',
  info:      '#36b9cc',
  warning:   '#f6c23e',
  danger:    '#e74a3b',
  secondary: '#858796',
};

export default function Card({ title, value, icon, color = 'primary' }) {
  const hex = COLOR_HEX_FALLBACK[color] || COLOR_HEX_FALLBACK.primary;

  // Intentamos usar la var de BS5 si existe; si no, usamos el fallback
  const borderColor = `var(--bs-${color}, ${hex})`;

  return (
    <div className="col-xl-3 col-md-6 mb-4">
      <div
        className={`card border-left-${color} shadow h-100 py-2`}
        style={{ borderLeft: `4px solid ${borderColor}` }}
      >
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}>
                {title}
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">{value}</div>
            </div>
            <div className="col-auto">
              <i className={`fas ${icon} fa-2x text-gray-300`}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
