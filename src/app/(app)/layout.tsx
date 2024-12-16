import Navbar from "@/components/Navbar";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}


// // app/layout.tsx
// import AuthProvider from "@/context/AuthProvider";
// // import "@/globals.css"; // Your global styles

// export default function RootLayout({
//   children, // This is where page content gets injected
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <>
//       {/* Ensure <html> is at the highest level */}
//       <html lang="en">
//         <body>
//           <AuthProvider>{children}</AuthProvider> {/* Wrap children with AuthProvider */}
//         </body>
//       </html>
//     </>
//   );
// }
