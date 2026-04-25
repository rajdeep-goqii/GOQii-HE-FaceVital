import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Globe,
  Clock,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const RevealSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.section
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.section>
);

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: "sachin@goqii.com",
      subtext: "Typical response within 24 hours"
    }
  ];

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      {/* Hero Section */}
      <RevealSection className="px-6 mb-24">
        <div className="max-w-4xl mx-auto text-center mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 mb-8">
            <MessageSquare className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Contact Us</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-950 mb-8 font-display leading-tight">
            How can we <br />
            <span className="text-emerald-500">help you?</span>
          </h1>
          <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            Have questions about our technology, enterprise solutions, or partnership opportunities? We're here to help.
          </p>
        </div>
      </RevealSection>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16">
        {/* Contact Information */}
        <div className="lg:col-span-5 space-y-12">
          <RevealSection>
            <h2 className="text-3xl font-bold text-slate-950 mb-8 font-display">Get in Touch</h2>
            <div className="space-y-8">
              {contactInfo.map((info, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all duration-500 shadow-sm">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-950 mb-1">{info.title}</h3>
                    <p className="text-slate-900 font-medium mb-1">{info.details}</p>
                    <p className="text-slate-500 text-sm font-light">{info.subtext}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>

          <RevealSection className="bg-slate-50 rounded-[32px] p-8 border border-slate-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-slate-950 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                Data Privacy
              </h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Your message is encrypted and your information is handled with the highest security standards. We never share your data with third parties.
              </p>
            </div>
          </RevealSection>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <RevealSection className="bg-white rounded-[40px] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-8 md:p-12">
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key="success"
                  className="py-12 text-center"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-950 mb-4 font-display">Message Sent!</h3>
                  <p className="text-slate-500 text-lg font-light mb-8 max-w-sm mx-auto">
                    Thank you for reaching out. A team member will get back to you shortly.
                  </p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="text-emerald-600 font-bold flex items-center gap-2 mx-auto hover:gap-3 transition-all"
                  >
                    Send another message <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all text-slate-950"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                      <input 
                        required 
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all text-slate-950"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Company</label>
                      <input 
                        type="text" 
                        placeholder="Optional"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all text-slate-950"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Subject</label>
                      <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all text-slate-950 appearance-none">
                        <option>General Inquiry</option>
                        <option>Enterprise Solutions</option>
                        <option>Partnership</option>
                        <option>Technical Support</option>
                        <option>Media & Press</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Message</label>
                    <textarea 
                      required 
                      rows={6}
                      placeholder="Tell us how we can help..."
                      className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-4 px-6 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all text-slate-950 resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <button 
                      disabled={formState === 'submitting'}
                      className="w-full bg-slate-950 text-white rounded-2xl py-5 font-bold flex items-center justify-center gap-3 hover:bg-slate-900 transition-all disabled:opacity-50"
                    >
                      {formState === 'submitting' ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </RevealSection>
        </div>
      </div>

      {/* Map or Global Presence Section */}
      <RevealSection className="mt-32 px-6">
        <div className="max-w-7xl mx-auto bg-slate-950 rounded-[48px] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh opacity-20" />
          <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 font-display">Global Presence</h2>
              <p className="text-slate-100 text-lg font-normal leading-relaxed mb-10">
                With a presence in over 14 regions globally, we are building a world where checking your health is as simple as looking into your camera.
              </p>
              <div className="flex flex-wrap gap-12">
                {[
                  { label: "Regions", val: "14+" },
                  { label: "Languages", val: "22" },
                  { label: "Office Hubs", val: "5" }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-4xl font-bold text-emerald-400 mb-1">{stat.val}</div>
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/contact-image.png"
                alt="Global health presence — world map with network connections"
                className="w-full h-auto block"
                style={{ display: 'block' }}
                loading="eager"
              />
            </div>
          </div>
        </div>
      </RevealSection>
    </div>
  );
}
