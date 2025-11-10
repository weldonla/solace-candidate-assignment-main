import type { Metadata } from "next";
import { Inter, Lato, Roboto_Slab } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

const inter = Inter({ subsets: ["latin"] });
const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto-slab",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Solace Candidate Assignment",
  description: "Show us what you got",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${lato.variable} ${robotoSlab.variable}`}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
