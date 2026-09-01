import type {Metadata} from "next";
import {Plus_Jakarta_Sans, Inter} from "next/font/google";
import "../components/style/globals.css";
import "react-vertical-timeline-component/style.min.css";
import {GoogleTagManager} from "@next/third-parties/google";


const plusJakartaSans = Plus_Jakarta_Sans({
    variable: "--font-plus-jakarta-sans",
    subsets: ["latin"],
    weight: ["400", "600", "700", "800"],
})

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: ["400", "600", "700"],
})

export const metadata: Metadata = {
    title: "Portfolio - Paul Deveaux",
    description: "Portfolio de Paul Deveaux, ingénieur en intelligence artificielle, présentant ses projets et réalisations.",
    alternates: {
        canonical: "https://paul-deveaux.fr",
    },
    openGraph: {
        title: "Portfolio - Paul Deveaux",
        description: "Portfolio de Paul Deveaux, ingénieur en intelligence artificielle, présentant ses projets et réalisations.",
        url: "https://paul-deveaux.fr",
        siteName: "Paul Deveaux",
        images: [{url: "https://paul-deveaux.fr/og-image.png", width: 1200, height: 630}],
        locale: "fr_FR",
        type: "website",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="fr"
            className={`${plusJakartaSans.variable} ${inter.variable} antialiased`}
        >
        <GoogleTagManager gtmId="GTM-PPF7XDZN"/>
        <body
        >
        {children}
        </body>
        </html>
    );
}
