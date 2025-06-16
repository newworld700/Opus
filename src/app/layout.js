import './globals.css'
import Providers from './Providers';

export default function AdminLayout({ children }) {

  return (
    <html lang="en">
    <Providers>
      <body>{children}</body>
      </Providers>
    </html>
  );
}