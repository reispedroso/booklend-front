export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      {children}
    </div>
  );
}
