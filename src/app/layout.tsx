import type { Metadata } from 'next';
import '@/styles/globals.css';
import { inter, interTight } from '@/utils/fonts';
import { Toaster } from 'sonner';
import { Header } from '@/components/header';

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
        <Header />
        <div className="max-w-3xl mx-auto">
          <main className="flex-1 flex flex-col mt-12">
            {children}
            <Toaster position="top-right" />
          </main>
        </div>
      </body>
    </html>
  );
}
