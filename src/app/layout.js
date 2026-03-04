import './globals.css';

export const metadata = {
  title: 'Meal Plan Semanal',
  description: 'Planificador de comidas semanal con prep dominical',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#0a0a0a',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
