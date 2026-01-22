
import React from 'react';

export const COLORS = {
  forest: '#1a2e1a',
  emerald: '#2d5a27',
  meridaOrange: '#d35400',
  gold: '#d4af37',
  cream: '#fefae0',
  wispBlue: '#93c5fd'
};

export const DETAILS = {
  birthdayGirl: 'Valentina',
  age: 10,
  date: 'Sábado 24 de Enero, 2026',
  location: 'Mr Joy - Mall de los Andes',
  time: '2:40 PM',
  theme: 'Brave (Valiente)',
  whatsappNumber: '593939094893'
};

export const CelticKnot = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10C65 10 75 20 75 35C75 50 65 60 50 60C35 60 25 50 25 35C25 20 35 10 50 10Z" stroke="currentColor" strokeWidth="2" />
    <path d="M50 90C35 90 25 80 25 65C25 50 35 40 50 40C65 40 75 50 75 65C75 80 65 90 50 90Z" stroke="currentColor" strokeWidth="2" />
    <path d="M15 50C15 35 25 25 40 25C55 25 65 35 65 50C65 65 55 75 40 75C25 75 15 65 15 50Z" stroke="currentColor" strokeWidth="2" />
    <path d="M85 50C85 65 75 75 60 75C45 75 35 65 35 50C35 35 45 25 60 25C75 25 85 35 85 50Z" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const ArrowIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="5" x2="5" y2="19" />
    <polyline points="15 5 19 5 19 9" />
  </svg>
);
