import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import config from "@/config/config";
import AppProvider from '@/redux/provider';
import MainLayout from "@/layouts/MainLayout"
import { ToastContainer } from "react-toastify";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: config.appName,
  description: "Online Shopping",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <AppProvider>
          <MainLayout>
            <Header />
            <main className="min-h-screen dark:text-white dark:bg-darkBackground light:bg-lightBackground">{children}</main>
            <Footer />
            <ToastContainer
              position="top-right"
              autoClose={2500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              // transition={Bounce} 
              className="cursor-pointer"
              />
          </MainLayout>
        </AppProvider>
      </body>
    </html>
  );
}
