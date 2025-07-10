export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1>PRIVATE ROUTES</h1>
      {children}
    </div>
  );
}
