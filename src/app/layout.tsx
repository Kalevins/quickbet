"use client";

import { Suspense } from "react";
import { Poppins } from "next/font/google";

import {
  DarkModeProvider,
  LoadingScreenProvider,
  ModalLoginProvider,
  AuthProvider,
} from "@/contexts";
import { LoadingScreen, Header, Loading } from "@/components";
import styles from "./styles.module.css";
import "@/styles/globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "900"],
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Quickbet",
//   description: "Prueba tecnica",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Suspense fallback={<Loading />}>
          <LoadingScreenProvider>
            <AuthProvider>
              <DarkModeProvider>
                <ModalLoginProvider>
                  <div className={styles.layoutContainer}>
                    <Header />
                    {children}
                  </div>
                  <LoadingScreen />
                </ModalLoginProvider>
              </DarkModeProvider>
            </AuthProvider>
          </LoadingScreenProvider>
        </Suspense>
      </body>
    </html>
  );
}
