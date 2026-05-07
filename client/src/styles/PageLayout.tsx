import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function PageLayout({ children }: Props) {
  return (
    <div
      className="
        min-h-screen
        bg-background-primary
        text-text-primary
        flex
        flex-col
      "
    >
      <main
        className="
          flex-1
          w-full
          max-w-7xl
          mx-auto
          px-6
          py-8
        "
      >
        {children}
      </main>

      <footer
        className="
          border-t
          border-border-primary
          py-6
          text-center
          text-sm
          text-text-muted
        "
      >
        © 2026 Aurum. All rights reserved.
      </footer>
    </div>
  );
}
