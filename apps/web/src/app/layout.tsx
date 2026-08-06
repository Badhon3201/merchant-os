import AppProvider from "@/providers/app-provider";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
          <Toaster richColors position="top-right" />
        </AppProvider>
      </body>
    </html>
  );
}