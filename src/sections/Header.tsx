export function Header() {
  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#1d1d1f' }}>
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <img
          src="/logo.webp"
          alt="Unicorn Logo"
          className="h-12 md:h-16 w-auto object-contain"
        />
      </div>
    </header>
  );
}
