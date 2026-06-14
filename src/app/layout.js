import "./globals.css";

export const metadata = {
  title: "The Balm Health Initiative and Social Intervention",
  description: "Improving health outcomes and social wellbeing through innovative healthcare interventions and community-based programs.",
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
