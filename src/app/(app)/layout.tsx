'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { SocketProvider } from '@/hooks/useSocket';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/context/AuthContext';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Don't show sidebar on auth pages
  const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/forgot-password';

  return (
    <html lang="en">
      <head>
        <title>NextTalkWeb - Modern Chat Application</title>
        <meta name="description" content="A modern chat application built with Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gradient-to-br from-gray-900 via-gray-950 to-black">
        <SessionProvider> 
          <AuthProvider>
            <SocketProvider>
              <div className="relative h-screen flex overflow-hidden">
                {/* Background elements for futuristic design */}
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
                  {/* Gradient blobs */}
                  <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-purple-700/20 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
                  <div className="absolute top-1/2 right-0 w-1/4 h-1/4 bg-indigo-700/30 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                  <div className="absolute bottom-0 left-1/4 w-1/3 h-1/3 bg-cyan-700/20 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                  
                  {/* Animated grid background */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-25"></div>
                </div>
                
                {!isAuthPage && !isMobile && <Sidebar />}
                
                <main className={`flex-1 flex flex-col h-screen overflow-hidden ${!isAuthPage && !isMobile ? 'ml-0' : ''}`}>
                  {!isAuthPage && <Navbar />}
                  {children}
                </main>
              </div>
            </SocketProvider>
          </AuthProvider>
        </SessionProvider>
        
        
        {/* Add this style to your global CSS or here for animations */}
        <style jsx global>{`
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          .animate-blob {
            animation: blob 25s infinite alternate;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          
          /* Apply scrollbar styling */
          ::-webkit-scrollbar {
            width: 5px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: rgba(139, 92, 246, 0.5);
            border-radius: 10px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(139, 92, 246, 0.8);
          }
        `}</style>
      </body>
    </html>
  );
}