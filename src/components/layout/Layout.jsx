import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Navbar />
      <main className="p-6">{children}</main>
    </div>
  );
}
