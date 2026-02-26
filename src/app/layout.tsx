import type { Metadata } from 'next';
import '@/styles/globals.css';
import { inter, interTight } from '@/utils/fonts';

export const metadata: Metadata = {
  title: 'Mundo Pet',
  description:
    'Aqui você pode ver todos os clientes e serviços agendados para hoje',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${interTight.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
