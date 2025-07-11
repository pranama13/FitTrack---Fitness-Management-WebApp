import React from 'react';
import { Github, Linkedin, Instagram, Facebook } from 'lucide-react';

const TikTokIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11.38 2.019a2.5 2.5 0 0 1 2.24 2.24V11a2.5 2.5 0 0 1-2.5 2.5H9.5a2.5 2.5 0 0 1-2.5-2.5V8.5a2.5 2.5 0 0 1 2.5-2.5h1.88"/>
        <path d="M15.5 8.5a4.5 4.5 0 0 1 4.5 4.5v0a4.5 4.5 0 0 1-4.5 4.5H3"/>
    </svg>
);

const Footer = () => {
    const socialLinks = [
        { name: 'GitHub', href: 'https://github.com/pranama13', icon: <Github /> },
        { name: 'LinkedIn', href: 'https://www.linkedin.com/in/pranama-lakshan', icon: <Linkedin /> },
        { name: 'Instagram', href: 'https://www.instagram.com/pranama01/#', icon: <Instagram /> },
        { name: 'Facebook', href: 'https://web.facebook.com/profile.php?id=61565964247571&mibextid=qi2Omg&rdid=YV0zWEfe91f6WaHJ&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2FgmXYAKRxAVVthRTp%2F%3Fmibextid%3Dqi2Omg%26_rdc%3D1%26_rdr#', icon: <Facebook /> },
        { name: 'TikTok', href: 'https://www.tiktok.com/@_pranama?_t=8rxhie95y8x&_r=1', icon: <TikTokIcon /> },
    ];

    return (
        <footer className="w-full py-8 bg-black/30 backdrop-blur-sm border-t border-slate-800">
            <div className="container mx-auto px-4 text-center text-gray-400">
                <p className="text-lg font-semibold text-white">Created by Pranama Lakshan</p>
                <p className="mt-2 text-sm">Reach out for suggestions and collaborations.</p>
                <div className="flex justify-center gap-6 my-4">
                    {socialLinks.map((link) => (
                        <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400 transition-colors" aria-label={link.name}>
                            {link.icon}
                        </a>
                    ))}
                </div>
                <p className="text-xs">&copy; {new Date().getFullYear()} FitFlow. All Rights Reserved.</p>
            </div>
        </footer>
    );
};
export default Footer;