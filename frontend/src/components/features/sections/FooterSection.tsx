import { ArrowUp } from "lucide-react";


export default function FooterSection() {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }



    return (
        <div id={"Footer"} className="w-full bg-primary-60 text-white pt-12 pb-5 relative">
            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 via-cyan-500 to-emerald-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
                <ArrowUp size={24} />
            </button>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">


                    {/* Navigation Links */}
                    <div className="flex flex-wrap justify-center gap-8 mb-8">
                    {['Home', 'About', 'Skills', 'Education', 'Contact'].map((link) => (
                      <button
                        key={link}
                        onClick={() => {
                          const element = document.getElementById(link.toLowerCase() === 'about' ? 'presentation' : link.toLowerCase() === 'education' ? 'formation' : link.toLowerCase());
                          if (element) element.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-white hover:text-secondary-background transition-colors duration-300"
                      >
                        {link}
                      </button>
                    ))}
                    </div>


                    {/* Divider */}
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"></div>

                    {/* Copyright */}
                    <div className="container mx-auto text-center">
                        <p className="text-sm">
                            &copy; Paul Deveaux | 2025
                        </p>
                    </div>
                </div>
            </div>


        </div>
    );
}