// src/components/Heading/index.tsx
import { type ReactNode } from 'react'; // Adicionamos 'type' aqui!

type HeadingProps = {
  children: ReactNode;
}

export function Heading({ children }: HeadingProps) {
  return (
    <h1 style={{ textAlign: 'center', color: '#FFF', margin: '20px 0' }}>
      {children}
    </h1>
  );
}