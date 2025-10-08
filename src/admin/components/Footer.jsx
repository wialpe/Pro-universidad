import React from 'react'

export default function Footer() {
  return (
    <footer className="sticky-footer bg-white mt-auto shadow-sm">
      <div className="container my-auto">
        <div className="text-center my-auto">
          <span className="text-muted">
            Copyright &copy; Sistema Educativo {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}

