import type {Metadata} from "next";
import {Geist, Geist_Mono, Comic_Neue, Inter} from "next/font/google";
import "../components/style/globals.css";
import "react-vertical-timeline-component/style.min.css";
import {GoogleTagManager} from "@next/third-parties/google";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


const comicNeue = Comic_Neue({
    variable: "--font-comic-neue",
    subsets: ["latin"],
    weight: ["400", "700"],
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
            className={`${geistSans.variable} ${geistMono.variable} ${comicNeue.variable} ${inter.variable} antialiased`}
        >
        <GoogleTagManager gtmId="GTM-PPF7XDZN"/>
        <body
        >
        {children}
        </body>
        </html>
    );
}
