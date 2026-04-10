'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  Database, 
  LayoutTemplate, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Users, 
  Zap, 
  Award, 
  BarChart3, 
  PlusCircle, 
  Play, 
  X, 
  Lock 
} from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#2F308C]/10 font-sans overflow-x-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 inset-x-0 h-[800px] w-full bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none"></div>
      <div className="absolute top-[-5%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#2F308C]/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/5 blur-[100px] pointer-events-none"></div>

      {/* Navigation */}
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="flex h-20 items-center justify-between px-6 md:px-12 mx-auto max-w-[1440px]">
          <div className="flex items-center gap-3">
            <Link href="/" className="relative h-10 w-36 transition-opacity hover:opacity-90">
               <Image 
                  src="/logo-color.svg" 
                  alt="Akij Resource Logo" 
                  fill 
                  className="object-contain"
                  priority
               />
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <Link href="#features" className="text-sm font-semibold text-slate-600 hover:text-[#2F308C] transition-colors font-sans">Features</Link>
            <Link href="#process" className="text-sm font-semibold text-slate-600 hover:text-[#2F308C] transition-colors font-sans">How it Works</Link>
            <Link href="#video" className="text-sm font-semibold text-slate-600 hover:text-[#2F308C] transition-colors font-sans">Platform Demo</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="https://github.com/aqibmehedi007/Manage_Online_Exam" target="_blank" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 transition-all text-xs font-bold text-slate-600">
              <GithubIcon className="h-4 w-4" />
              Source Code
            </Link>
            <Link href="/auth/login" className="hidden sm:block">
               <button className="px-5 py-2 rounded-full text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
                 Log In
               </button>
            </Link>
            <Link href="/auth/register">
               <button className="px-7 py-2.5 rounded-full bg-[#2F308C] text-white hover:bg-[#1e1f5c] transition-all text-sm font-bold shadow-lg shadow-[#2F308C]/20 active:scale-95">
                 Get Started
               </button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="px-6 md:px-12 mx-auto max-w-[1440px] grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center pt-16 pb-24 md:pt-24 md:pb-32">
           
           {/* Hero Copy */}
           <div className="space-y-8 text-center lg:text-left">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-[#2F308C] text-[11px] font-bold uppercase tracking-widest shadow-sm">
               <span className="flex h-2 w-2 rounded-full bg-[#2F308C] animate-pulse"></span>
               Enterprise Assessment Ecosystem
             </div>
             
             <h1 className="text-5xl md:text-[5rem] font-bold leading-[1.05] tracking-tight text-slate-900">
               Integrity Driven <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F308C] to-blue-600 font-extrabold">Performance.</span>
             </h1>
             
             <p className="text-lg md:text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
               Akij Resource's custom-built evaluation engine. Professional proctoring, AI-driven analytics, and seamless candidate scaling in one unified platform.
             </p>
             
             <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
                <Link href="/auth/register" className="w-full sm:w-auto">
                  <button className="w-full h-15 px-10 rounded-full bg-[#2F308C] hover:bg-[#1e1f5c] transition-all font-bold text-white shadow-2xl shadow-[#2F308C]/30 flex items-center justify-center gap-2 group text-lg">
                    Launch Platform
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="#video" className="w-full sm:w-auto">
                  <button className="w-full h-15 px-8 rounded-full bg-white hover:bg-slate-50 border border-slate-200 transition-all font-bold text-slate-700 flex items-center justify-center gap-3 shadow-sm text-lg">
                    Watch Demo
                  </button>
                </Link>
             </div>

             <div className="flex items-center justify-center lg:justify-start gap-8 pt-6">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-12 w-12 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm relative">
                      <Image 
                        src="/avatar.png" 
                        alt="User" 
                        fill
                        className="rounded-full object-cover" 
                      />
                    </div>
                  ))}
                  <div className="h-12 w-12 rounded-full border-2 border-white bg-[#2F308C] text-white flex items-center justify-center text-[10px] font-bold shadow-sm relative z-10">
                    +500
                  </div>
                </div>
                <div className="text-sm text-slate-500 font-semibold">
                   Trusted by <span className="text-slate-900">Akij Teams</span> nationwide
                </div>
             </div>
           </div>

           {/* Hero Graphic */}
           <div className="relative w-full h-[480px] md:h-[680px] order-first lg:order-last">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/40 to-indigo-100/40 rounded-full blur-[100px] -z-10 scale-95"></div>
              
              <div className="relative w-full h-full rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-200 bg-white p-2">
                 <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-slate-50">
                    <Image 
                       src="/hero-light.png" 
                       alt="Assessment Platform Dashboard" 
                       fill
                       sizes="(max-width: 768px) 100vw, 50vw"
                       className="object-cover"
                       priority
                    />
                 </div>
                 
                 {/* Premium Floating Elements */}
                 <div className="absolute top-12 -right-4 lg:-right-12 bg-white/95 backdrop-blur-md border border-slate-200/50 p-6 rounded-[2.5rem] shadow-2xl hidden md:block animate-bounce-slow z-20">
                    <div className="flex items-center gap-4">
                       <div className="h-12 w-12 rounded-2xl bg-blue-50 text-[#2F308C] flex items-center justify-center shadow-inner">
                          <CheckCircle2 className="h-7 w-7" />
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Security Score</p>
                          <p className="text-base font-black text-slate-900 tracking-tight">Enterprise Locked</p>
                       </div>
                    </div>
                 </div>

                 <div className="absolute bottom-12 -left-4 lg:-left-12 bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-2xl max-w-[320px] hidden md:block hover:-translate-y-2 transition-transform duration-500 cursor-default z-20">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="h-12 w-12 rounded-2xl bg-blue-50 text-[#2F308C] flex items-center justify-center">
                          <ShieldCheck className="h-7 w-7" />
                       </div>
                       <h3 className="font-bold text-lg text-slate-900 font-black">AI Proctoring</h3>
                    </div>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                       Proprietary behavior analysis detects unauthorized assistance and anomalous activity instantly.
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-[#2F308C]">
           <div className="px-6 md:px-12 mx-auto max-w-[1440px] grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
              <div className="space-y-2">
                 <p className="text-4xl md:text-5xl font-black text-white">50k+</p>
                 <p className="text-blue-200 text-sm font-bold uppercase tracking-widest">Exams Taken</p>
              </div>
              <div className="space-y-2">
                 <p className="text-4xl md:text-5xl font-black text-white">99.9%</p>
                 <p className="text-blue-200 text-sm font-bold uppercase tracking-widest">Uptime Record</p>
              </div>
              <div className="space-y-2">
                 <p className="text-4xl md:text-5xl font-black text-white">15+</p>
                 <p className="text-blue-200 text-sm font-bold uppercase tracking-widest">Business Units</p>
              </div>
              <div className="space-y-2">
                 <p className="text-4xl md:text-5xl font-black text-white">2.5k+</p>
                 <p className="text-blue-200 text-sm font-bold uppercase tracking-widest">Active Proctors</p>
              </div>
           </div>
        </section>

        {/* Platform Demo Section */}
        <section id="video" className="py-32 bg-slate-50 relative overflow-hidden">
           <div className="px-6 md:px-12 mx-auto max-w-[1440px]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                 <div className="space-y-8">
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1]">
                       The Future of <br/> 
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F308C] to-blue-600">Testing Technology.</span>
                    </h2>
                    <p className="text-xl text-slate-600 font-medium leading-relaxed">
                       Experience the fluidity of our interface. Designed for the web but performing like native software. Our platform handles thousands of concurrent sessions without a hitch.
                    </p>
                    <ul className="space-y-4">
                       {[
                         "Real-time result calculation",
                         "Automatic session recording",
                         "Comprehensive candidate audit trails",
                         "Dynamic question banking"
                       ].map((item, i) => (
                         <li key={i} className="flex items-center gap-4 text-slate-700 font-bold">
                            <div className="h-6 w-6 rounded-full bg-blue-50 text-[#2F308C] flex items-center justify-center">
                               <CheckCircle2 className="h-4 w-4" />
                            </div>
                            {item}
                         </li>
                       ))}
                    </ul>
                 </div>
                 
                 <div 
                    onClick={() => setIsModalOpen(true)}
                    className="relative aspect-video rounded-[3rem] overflow-hidden border-[12px] border-white shadow-2xl group cursor-pointer group"
                 >
                    <div className="absolute inset-0 bg-[#2F308C]/40 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <div className="h-20 w-20 rounded-full bg-white text-[#2F308C] flex items-center justify-center shadow-xl scale-90 group-hover:scale-100 transition-transform duration-300">
                          <Play className="h-10 w-10 fill-[#2F308C] ml-1" />
                       </div>
                    </div>
                    {/* Autoplay Video Section */}
                    <video 
                       autoPlay 
                       muted 
                       loop 
                       playsInline 
                       className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    >
                       <source src="/demo.mp4" type="video/mp4" />
                    </video>
                 </div>
              </div>
           </div>
        </section>

        {/* Feature Highlights Grid */}
        <section id="features" className="px-6 md:px-12 mx-auto max-w-[1440px] py-32">
           <div className="text-center mb-24 space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#2F308C] text-xs font-bold uppercase tracking-[0.2em]">Our Capabilities</div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900">Enterprise Core Features</h2>
              <p className="text-slate-500 font-medium max-w-2xl mx-auto text-xl leading-relaxed">
                Precision engineering for high-stakes evaluations at scale.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Feature 1 */}
              <div className="bg-white border border-slate-100 rounded-[3rem] p-12 hover:border-[#2F308C]/40 hover:shadow-2xl hover:shadow-slate-100 transition-all group relative overflow-hidden">
                 <div className="h-20 w-20 rounded-3xl bg-blue-50 text-[#2F308C] flex items-center justify-center mb-10 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-sm font-black text-2xl">
                    <LayoutTemplate className="h-10 w-10" />
                 </div>
                 <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight font-sans">Modular Control</h3>
                 <p className="text-slate-500 text-lg leading-relaxed font-medium">
                   Granular permission management for distinct user classes. From super-admins to department proctors.
                 </p>
              </div>

              {/* Feature 2 - Highlighted */}
              <div className="bg-white border border-slate-100 rounded-[3rem] p-12 hover:border-[#2F308C]/40 hover:shadow-2xl hover:shadow-slate-100 transition-all group relative overflow-hidden ring-4 ring-blue-50/50">
                 <div className="h-20 w-20 rounded-3xl bg-[#2F308C] text-white flex items-center justify-center mb-10 group-hover:-rotate-6 group-hover:scale-110 transition-all duration-500 shadow-xl shadow-blue-200">
                    <Zap className="h-10 w-10 fill-white" />
                 </div>
                 <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight font-sans">Instant Processing</h3>
                 <p className="text-slate-500 text-lg leading-relaxed font-medium">
                   Sub-second grading for MCQ sessions and automatic leaderboard generation for competitive assessments.
                 </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white border border-slate-100 rounded-[3rem] p-12 hover:border-[#2F308C]/40 hover:shadow-2xl hover:shadow-slate-100 transition-all group relative overflow-hidden">
                 <div className="h-20 w-20 rounded-3xl bg-blue-50 text-[#2F308C] flex items-center justify-center mb-10 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-sm">
                    <BarChart3 className="h-10 w-10" />
                 </div>
                 <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight font-sans">Deep Analytics</h3>
                 <p className="text-slate-500 text-lg leading-relaxed font-medium">
                   Visualize talent trends across the entire conglomerate with our consolidated data visualization suite.
                 </p>
              </div>
           </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-32 border-t border-slate-100">
           <div className="px-6 md:px-12 mx-auto max-w-[1440px]">
              <div className="flex flex-col lg:flex-row gap-20 items-center">
                 <div className="lg:w-1/2 space-y-12">
                    <div className="space-y-4">
                       <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-extrabold shadow-sm">Seamless Workflow</h2>
                       <p className="text-lg text-slate-500 font-medium leading-relaxed font-sans">
                          Getting your assessment live takes minutes, not days.
                       </p>
                    </div>

                    <div className="space-y-12">
                       <div className="flex gap-8 group">
                          <div className="flex-shrink-0 h-14 w-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xl font-bold group-hover:bg-[#2F308C] transition-colors">1</div>
                          <div>
                             <h4 className="text-xl font-black text-slate-900 mb-2 underline decoration-[#2F308C]/20 decoration-4 font-sans">Configure & Setup</h4>
                             <p className="text-slate-500 font-medium">Import your question bank or use our AI generator to build a custom exam payload.</p>
                          </div>
                       </div>
                       <div className="flex gap-8 group">
                          <div className="flex-shrink-0 h-14 w-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xl font-bold group-hover:bg-[#2F308C] transition-colors">2</div>
                          <div>
                             <h4 className="text-xl font-black text-slate-900 mb-2 underline decoration-[#2F308C]/20 decoration-4 font-sans">Onboard Candidates</h4>
                             <p className="text-slate-500 font-medium">Batch invite thousands of candidates via secure, expiring portal links.</p>
                          </div>
                       </div>
                       <div className="flex gap-8 group">
                          <div className="flex-shrink-0 h-14 w-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xl font-bold group-hover:bg-[#2F308C] transition-colors">3</div>
                          <div>
                             <h4 className="text-xl font-black text-slate-900 mb-2 underline decoration-[#2F308C]/20 decoration-4 font-sans">Monitor & Score</h4>
                             <p className="text-slate-500 font-medium">Real-time supervision with instant result exports and behavioral compliance reports.</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="lg:w-1/2 w-full grid grid-cols-2 gap-6">
                    <div className="space-y-6">
                       <div className="h-64 rounded-[3rem] bg-blue-50/50 p-10 flex flex-col justify-between border border-blue-100 hover:shadow-xl transition-all group">
                          <div className="h-14 w-14 rounded-2xl bg-[#2F308C]/10 flex items-center justify-center">
                            <PlusCircle className="h-8 w-8 text-[#2F308C] group-hover:scale-110 transition-transform" />
                          </div>
                          <div className="space-y-2">
                             <p className="text-lg font-black text-slate-900">Scalable Banks</p>
                             <p className="text-xs text-slate-500 font-medium">Support for 100k+ question nodes.</p>
                          </div>
                       </div>
                       <div className="h-80 rounded-[3rem] bg-[#0F172A] p-10 flex flex-col justify-between text-white hover:bg-black transition-colors border border-white/5">
                          <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center">
                            <Lock className="h-8 w-8 text-blue-400" />
                          </div>
                          <div>
                             <p className="text-5xl font-black mb-4 tracking-tighter text-blue-400">200%</p>
                             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-tight">Faster Internal <br/> Evaluation Cycle</p>
                          </div>
                       </div>
                    </div>
                    <div className="space-y-6 pt-12">
                       {/* Refined Enterprise Card */}
                       <div className="h-80 rounded-[3rem] p-10 flex flex-col justify-between text-white shadow-2xl transition-all hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg, #2F308C 0%, #0F172A 100%)' }}>
                          <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center">
                            <Award className="h-8 w-8 text-blue-200" />
                          </div>
                          <div>
                             <p className="text-2xl font-black leading-tight mb-2">Enterprise Proctoring</p>
                             <p className="text-sm font-medium text-blue-100/80">Certified for high-stakes governmental & industrial testing.</p>
                          </div>
                       </div>
                       <div className="h-64 rounded-[3rem] bg-slate-50 p-10 flex flex-col justify-between border border-slate-200 hover:shadow-xl transition-all">
                          <div className="h-14 w-14 rounded-2xl bg-[#2F308C]/5 flex items-center justify-center">
                            <Globe className="h-8 w-8 text-[#2F308C]" />
                          </div>
                          <div className="space-y-2">
                             <p className="text-lg font-black text-slate-900">Multi-Location</p>
                             <p className="text-xs text-slate-500 font-medium">Sync results across different business units globally.</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 px-6">
           <div className="max-w-[1440px] mx-auto rounded-[4rem] bg-[#0F172A] p-12 md:p-24 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-blue-600/10 to-transparent pointer-events-none"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10 max-w-3xl space-y-10">
                 <h2 className="text-4xl md:text-7xl font-black text-white leading-tight">
                    Elevate Your <br/> 
                    <span className="text-blue-400 font-serif italic font-normal">Talent Pipeline.</span>
                 </h2>
                 <p className="text-xl text-slate-400 font-medium leading-relaxed">
                    Ready to deploy the most advanced assessment engine in Bangladesh? Request a consultation or start for free.
                 </p>
                 <div className="flex flex-col sm:flex-row gap-6 pt-6">
                    <Link href="/auth/register">
                       <button className="h-16 px-12 rounded-full bg-white text-slate-900 font-black text-lg hover:bg-blue-50 transition-all shadow-2xl">
                          Get Started Now
                       </button>
                    </Link>
                    <Link href="mailto:info@akijresource.com">
                       <button className="h-16 px-12 rounded-full bg-slate-800 text-white font-black text-lg hover:bg-slate-700 transition-all border border-slate-700">
                          Contact Sales
                       </button>
                    </Link>
                 </div>
              </div>
           </div>
        </section>
      </main>

      {/* Modern Footer */}
      <footer className="border-t border-slate-100 bg-white relative z-10 pt-24 pb-12">
        <div className="px-6 md:px-12 mx-auto max-w-[1440px]">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-20 pb-20">
            <div className="space-y-8 max-w-sm">
               <Image 
                  src="/logo-color.svg" 
                  alt="Akij Resource Logo" 
                  width={180} 
                  height={50} 
                  className="object-contain"
               />
               <p className="text-slate-500 text-lg font-medium leading-relaxed">
                 Driving the next generation of industrial intelligence through data-driven talent evaluation.
               </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16 md:gap-32">
               <div className="space-y-6">
                  <h4 className="font-black text-slate-900 text-sm uppercase tracking-[0.2em]">Ecosystem</h4>
                  <ul className="space-y-4 text-sm text-slate-500 font-bold">
                     <li className="hover:text-[#2F308C] cursor-pointer transition-colors">Candidate Hub</li>
                     <li className="hover:text-[#2F308C] cursor-pointer transition-colors">Employer Portal</li>
                     <li className="hover:text-[#2F308C] cursor-pointer transition-colors">Question Engine</li>
                     <li className="hover:text-[#2F308C] cursor-pointer transition-colors">Live Proctoring</li>
                  </ul>
               </div>
               <div className="space-y-6">
                  <h4 className="font-black text-slate-900 text-sm uppercase tracking-[0.2em]">Governance</h4>
                  <ul className="space-y-4 text-sm text-slate-500 font-bold">
                     <li className="hover:text-[#2F308C] cursor-pointer transition-colors">Privacy Shield</li>
                     <li className="hover:text-[#2F308C] cursor-pointer transition-colors">Ethical AI Charter</li>
                     <li className="hover:text-[#2F308C] cursor-pointer transition-colors">Regulatory Compliance</li>
                  </ul>
               </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="flex flex-col md:flex-row items-center gap-6">
                <p className="text-slate-400 text-sm font-bold tracking-tight">
                  © 2026 Akij Resource. Standardized Talent Architecture.
                </p>
                <div className="h-1 w-1 bg-slate-300 rounded-full hidden md:block"></div>
                <p className="text-slate-400 text-sm font-medium">Headquarters: Dhaka, Bangladesh</p>
             </div>
             <div className="flex items-center gap-10 text-xs font-black text-slate-400 uppercase tracking-widest">
                <span className="flex items-center gap-2 hover:text-slate-900 transition-colors cursor-pointer">
                   Network Status: OK
                </span>
                <span className="flex items-center gap-2 hover:text-slate-900 transition-colors cursor-pointer">
                   Support ID: #AR-X7
                </span>
             </div>
          </div>
        </div>
      </footer>

      {/* Video Lightbox Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-4 md:p-10 animate-in fade-in duration-300">
           <button 
             onClick={() => setIsModalOpen(false)}
             className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 p-3 rounded-full hover:bg-white/20 z-[210]"
           >
             <X className="h-8 w-8" />
           </button>
           
           <div className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(47,48,140,0.3)] border border-white/10">
              <video 
                 controls 
                 autoPlay 
                 className="w-full h-full object-contain"
              >
                 <source src="/demo.mp4" type="video/mp4" />
                 Your browser does not support the video tag.
              </video>
           </div>
           
           <div className="absolute inset-0 -z-10" onClick={() => setIsModalOpen(false)}></div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 6s ease-in-out infinite;
        }
        html {
           scroll-behavior: smooth;
        }
      `}} />
    </div>
  );
}
