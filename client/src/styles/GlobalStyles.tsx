import React from 'react';

type Props = {
  children: React.ReactNode;
};

const GlobalStyles = ({ children }: Props) => {
  return (
    <div
      className="
        min-h-screen
        bg-base
        text-primary
        transition-colors
        duration-300
        antialiased
        font-sans
      "
    >
      {children}
    </div>
  );
};

export default GlobalStyles;
