import Image from "next/image";
import Link from "next/link";
import GithubIcon from "@/components/icons/GithubIcon";
import { ShieldCheck, Database, LayoutTemplate, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-indigo-500/30 font-sans overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 inset-x-0 h-[500px] w-full bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none"></div>

      {/* Navigation */}
      <nav className="relative z-50 flex h-20 items-center justify-between px-6 md:px-12 mx-auto max-w-[1440px]">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-28 bg-white/5 rounded-lg p-1 backdrop-blur-md">
             {/* Using the default logo from the project if available, otherwise stylized text */}
             <span className="font-black text-xl tracking-tight text-white pl-2">AKIJ<span className="text-indigo-400">.</span></span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="https://github.com/aqibmehedi007/Manage_Online_Exam" 
            target="_blank"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-700/50 hover:bg-slate-800/50 hover:border-slate-600 transition-all text-sm font-bold text-slate-300"
          >
            <GithubIcon className="h-4 w-4" />
            View Source
          </Link>
          <Link href="/auth/login">
             <button className="px-6 py-2.5 rounded-xl bg-white text-[#0f172a] hover:bg-slate-200 transition-colors text-sm font-black shadow-[0_0_20px_rgba(255,255,255,0.1)]">
               Sign In
             </button>
          </Link>
        </div>
      </nav>

      <main className="relative z-10 pt-20 pb-32">
        {/* Hero Section */}
        <section className="px-6 md:px-12 mx-auto max-w-[1440px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[70vh]">
           
           {/* Hero Copy */}
           <div className="space-y-8 text-center lg:text-left">
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest">
               <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
               Production Ready v1.0
             </div>
             
             <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400">
               Next-Gen Quality <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Assessments.</span>
             </h1>
             
             <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
               A high-fidelity evaluation platform featuring proctoring logs, multi-role dashboards, and seamless offline resilience. Built on a modern Next.js 16 and Prisma architecture.
             </p>
             
             <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
                <Link href="/auth/register" className="w-full sm:w-auto">
                  <button className="w-full h-14 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-500 transition-all font-bold text-white shadow-[0_0_40px_rgba(79,70,229,0.3)] flex items-center justify-center gap-2 group">
                    Get Started Free
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="https://github.com/aqibmehedi007/Manage_Online_Exam" target="_blank" className="w-full sm:w-auto">
                  <button className="w-full h-14 px-8 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition-all font-bold text-white flex items-center justify-center gap-3">
                    <GithubIcon className="h-5 w-5" />
                    GitHub Source
                  </button>
                </Link>
             </div>
           </div>

           {/* Hero Graphic */}
           <div className="relative w-full h-[400px] md:h-[600px] animate-[float_6s_ease-in-out_infinite]">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-full blur-[100px] -z-10"></div>
              {/* Premium abstract graphic generated earlier */}
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl shadow-indigo-900/50 bg-[#0f172a]/50 backdrop-blur-3xl flex items-center justify-center">
                 <Image 
                    src="/hero.png" 
                    alt="Assessment Platform Graphic" 
                    fill 
                    className="object-cover opacity-90 scale-105"
                    priority
                 />
                 {/* Glassmorphism Floating Element */}
                 <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 bg-white/10 border border-white/20 backdrop-blur-xl p-4 md:p-6 rounded-2xl shadow-2xl max-w-[280px]">
                    <div className="flex items-center gap-3 mb-2">
                       <ShieldCheck className="h-6 w-6 text-emerald-400" />
                       <h3 className="font-bold text-sm md:text-base text-white">Proctoring Active</h3>
                    </div>
                    <p className="text-xs md:text-sm text-slate-300 font-medium">System detecting behavioral patterns and tab switching anomalies securely.</p>
                 </div>
              </div>
           </div>
        </section>

        {/* Feature Highlights Grid */}
        <section className="px-6 md:px-12 mx-auto max-w-[1440px] mt-32">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-white">Professional Grade Features</h2>
              <p className="text-slate-400 mt-4 font-medium max-w-xl mx-auto">Engineered to exceed expectations with a robust full-stack architecture.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-8 hover:bg-slate-800/50 transition-colors group">
                 <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   <LayoutTemplate className="h-6 w-6" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-3">Multi-Role Architecture</h3>
                 <p className="text-slate-400 text-sm leading-relaxed">
                   Dedicated interfaces for Super Admins, Employers, and Candidates. Complete with complex data aggregation and role-based routing.
                 </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-8 hover:bg-slate-800/50 transition-colors group">
                 <div className="h-14 w-14 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   <ShieldCheck className="h-6 w-6" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-3">Integrity & Proctoring</h3>
                 <p className="text-slate-400 text-sm leading-relaxed">
                   Real-time tracking of fullscreen exits and tab switching. Dedicated results center provides employers with instant candidate integrity scores.
                 </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-8 hover:bg-slate-800/50 transition-colors group">
                 <div className="h-14 w-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   <Database className="h-6 w-6" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-3">Prisma + MySQL Edge</h3>
                 <p className="text-slate-400 text-sm leading-relaxed">
                   Fully persistent datastore utilizing Prisma ORM. Complete database seeding providing 50+ candidates and professional-grade exam metrics.
                 </p>
              </div>
           </div>
        </section>
      </main>

      {/* Modern Footer */}
      <footer className="border-t border-slate-800 bg-[#020617] relative z-10 pt-16 pb-8">
        <div className="px-6 md:px-12 mx-auto max-w-[1440px] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
             <span className="font-black text-xl tracking-tight text-white">AKIJ<span className="text-indigo-400">.</span></span>
             <p className="text-slate-500 text-xs mt-2 font-medium">© 2026 Assessment Platform. Complete Frontend Engineer Task.</p>
          </div>
          <div className="flex gap-4">
             <Link href="https://github.com/aqibmehedi007/Manage_Online_Exam" target="_blank" className="text-slate-500 hover:text-white transition-colors">
               <GithubIcon className="h-5 w-5" />
             </Link>
          </div>
        </div>
      </footer>

      {/* Global Inline Styles for float animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}} />
    </div>
  );
}
