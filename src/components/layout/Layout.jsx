import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Navbar />

      <main className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
