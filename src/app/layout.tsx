import Providers from './Context';
import './globals.css';
import NavBar from './NavBar';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-[url("/img/BBQBackground.jpg")] bg-cover bg-no-repeat bg-center bg-fixed'>
        <Providers>
          <NavBar />
          <main className='bg-orange-500/[.4] bg-fixed min-h-screen dark:bg-black/[.70]'>
            <section className='opacity-100'>
              <br />
              {children}
            </section>
          </main>
        </Providers>
      </body>
    </html>
  );
}
