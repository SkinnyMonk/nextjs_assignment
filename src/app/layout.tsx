import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/lib/storeProvider";
import Sidebar from "@/ui/Sidebar";

export const metadata: Metadata = {
  title: "NextJS BoilerPlate",
  description: "Plutus NextJS BoilerPlate for new NextJS projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className="flex bg-white-100 p-6  gap-6 ">
          <div className="min-w-60">
            <Sidebar />
          </div>
          <main className="flex-1">{children}</main>
        </body>
      </html>
    </StoreProvider>
  );
}
