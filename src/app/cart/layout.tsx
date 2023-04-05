export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <h1 className='text-red-500 text-3xl'>Cart</h1>
      {children}
    </section>
  );
}
