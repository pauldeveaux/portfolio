import type {Metadata} from "next";
import {Plus_Jakarta_Sans, Inter, Poppins} from "next/font/google";
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

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
    title: "Paul Deveaux | Développeur Fullstack & IA",
    description: "Portfolio de Paul Deveaux, développeur fullstack et IA. Découvrez mes projets, compétences et parcours.",
    alternates: {
        canonical: "https://paul-deveaux.fr",
    },
    openGraph: {
        title: "Paul Deveaux | Développeur Fullstack & IA",
        description: "Portfolio de Paul Deveaux, développeur fullstack et IA. Découvrez mes projets, compétences et parcours.",
        url: "https://paul-deveaux.fr",
        siteName: "Paul Deveaux",
        images: [{url: "https://paul-deveaux.fr/og-image.png", width: 1200, height: 630}],
        locale: "fr_FR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Paul Deveaux | Développeur Fullstack & IA",
        description: "Portfolio de Paul Deveaux, développeur fullstack et IA. Découvrez mes projets, compétences et parcours.",
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
            className={`${plusJakartaSans.variable} ${inter.variable} ${poppins.variable} antialiased`}
        >
        <head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            "@context": "https://schema.org",
                            "@type": "WebSite",
                            "name": "Paul Deveaux",
                            "url": "https://paul-deveaux.fr"
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "Person",
                            "name": "Paul Deveaux",
                            "url": "https://paul-deveaux.fr",
                            "jobTitle": "Développeur Fullstack & IA",
                            "sameAs": ["https://github.com/pauldeveaux"]
                        }
                    ])
                }}
            />
        </head>
        <GoogleTagManager gtmId="GTM-PPF7XDZN"/>
        <body
        >
        {children}
        </body>
        </html>
    );
}
