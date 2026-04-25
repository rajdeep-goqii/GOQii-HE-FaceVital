import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Book,
  Camera,
  Activity,
  Shield,
  User,
  ChevronRight,
  AlertCircle,
  Mail,
  ArrowRight,
  HelpCircle,
  Lightbulb,
  X,
  CheckCircle2,
  Info
} from 'lucide-react';

const HELP_CONTENT: Record<string, any> = {
  "How to start a scan": {
    shortAnswer: "Open the scan feature, look into your camera, and follow on-screen instructions.",
    sections: [
      {
        title: "Steps to Follow",
        items: [
          "1. Click on “Start Scan”",
          "2. Allow camera access",
          "3. Position your face within the frame",
          "4. Stay still for 30 seconds"
        ]
      },
      {
        title: "Tips",
        items: [
          "Keep your face clearly visible",
          "Maintain a neutral expression",
          "Avoid moving during the scan"
        ]
      }
    ],
    cta: { text: "Still Need Help? Contact us", url: "/contact" }
  },
  "Device requirements": {
    shortAnswer: "Any modern smartphone or device with a front camera works.",
    sections: [
      {
        title: "Supported Devices",
        items: [
          "Smartphones (Android & iOS)",
          "Laptops with webcam",
          "Tablets with camera"
        ]
      },
      {
        title: "Requirements",
        items: [
          "Stable internet connection",
          "Working front camera",
          "Updated browser (Chrome, Safari, etc.)"
        ]
      },
      {
        title: "Best Experience",
        items: [
          "Use a high-quality camera device",
          "Ensure good lighting"
        ]
      }
    ]
  },
  "Setup guide": {
    shortAnswer: "Set up your environment before starting the scan for best results.",
    sections: [
      {
        title: "Before You Start",
        items: [
          "Sit in a well-lit area",
          "Keep your phone at eye level",
          "Ensure your face is clearly visible"
        ]
      },
      {
        title: "During the Scan",
        items: [
          "Stay still",
          "Avoid talking",
          "Follow on-screen guidance"
        ]
      },
      {
        title: "Common Mistakes to Avoid",
        items: [
          "Low lighting",
          "Moving your head",
          "Camera not aligned"
        ]
      }
    ]
  },
  "Face not detected": {
    shortAnswer: "Your face may not be clearly visible or properly aligned with the camera.",
    sections: [
      { 
        title: "Possible Reasons", 
        items: ["Poor lighting conditions", "Face not centered in the frame", "Camera blocked or unclear"] 
      },
      {
        title: "How to Fix",
        items: ["Move to a well-lit area", "Position your face inside the frame guide", "Keep your camera clean and unobstructed"]
      },
      {
        title: "Pro Tip",
        items: ["Look directly into the camera and keep your face steady."]
      }
    ]
  },
  "Lighting issues": {
    shortAnswer: "Good lighting is required for accurate face scanning.",
    sections: [
      {
        title: "Common Problems",
        items: ["Dim or low lighting", "Strong backlight (light behind you)", "Uneven shadows on your face"]
      },
      {
        title: "How to Fix",
        items: ["Face a light source (window or lamp)", "Avoid sitting with light behind you", "Ensure your face is evenly lit"]
      },
      {
        title: "Pro Tip",
        items: ["Natural daylight works best for accurate results."]
      }
    ]
  },
  "Scan failed": {
    shortAnswer: "The scan may fail due to movement, lighting, or device issues.",
    sections: [
      {
        title: "Possible Reasons",
        items: ["Moving during the scan", "Poor lighting conditions", "Unstable internet connection", "Device performance issues"]
      },
      {
        title: "How to Fix",
        items: ["Stay still during the scan", "Improve lighting conditions", "Check your internet connection", "Restart and try again"]
      },
      {
        title: "Pro Tip",
        items: ["Hold your device steady and avoid distractions during the scan."]
      }
    ]
  },
  "What is health score?": {
    shortAnswer: "A summary of your vital signals compared to normal ranges.",
    sections: [{ title: "Details", items: ["Derived from HRV, Heart Rate, and Stress indices", "Higher scores indicate better systemic balance", "Monitor trends over time for best insights"] }]
  },
  "How accurate is it?": {
    shortAnswer: "Our technology uses rPPG which is clinically validated for research.",
    sections: [{ title: "Validation", items: ["95% correlation with medical-grade pulse oximeters", "Tested across diverse skin tones and ages", "Optimized for consumer-grade hardware"] }]
  },
  "What do results mean?": {
    shortAnswer: "Results indicate your current physiological state.",
    sections: [{ title: "Guidance", items: ["Low stress means your nervous system is balanced", "High recovery suggests readiness for peak performance", "Results are for wellness purposes, not diagnosis"] }]
  },
  "Is my data safe?": {
    shortAnswer: "We use edge processing and total encryption.",
    sections: [{ title: "Security", items: ["Face data is never stored, only metrics", "End-to-end industry standard encryption", "GDPR and HIPAA aligned privacy"] }]
  },
  "Where is data stored?": {
    shortAnswer: "Your health data remains under your total control.",
    sections: [{ title: "Storage", items: ["Primary processing happens on-device", "Cloud syncing is optional and encrypted", "No PII is shared with third parties"] }]
  },
  "Do you share data?": {
    shortAnswer: "Your privacy is our priority. We nunca share PII.",
    sections: [{ title: "Policy", items: ["Zero third-party data selling", "Aggregated data only used for research if opted-in", "You can delete all your data at any time"] }]
  },
  "Login issues": {
    shortAnswer: "Ensure you are using the correct credentials and a stable connection.",
    sections: [{ title: "Solutions", items: ["Check your internet connection", "Verify your user email", "Clear browser cache and cookies"] }]
  },
  "Reset password": {
    shortAnswer: "You can request a password reset via the login screen.",
    sections: [{ title: "Steps", items: ["Click 'Forgot Password' on login", "Enter your registered email address", "Follow instructions sent to your inbox"] }]
  },
  "Account setup": {
    shortAnswer: "Setting up your account is quick and secure.",
    sections: [{ title: "Steps", items: ["Register with your email", "Complete your basic health profile", "Start your first scan"] }]
  }
};

const HelpDetailPopup = ({ topic, onClose }: { topic: string; onClose: () => void }) => {
  const content = HELP_CONTENT[topic];
  if (!content) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6">
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        />
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-white rounded-[32px] overflow-hidden shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
        >
          <div className="p-8 md:p-12">
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>

            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest mb-4">
                <Info className="w-3 h-3" />
                Help Topic
              </div>
              <h3 className="text-3xl font-bold text-slate-950 mb-4 font-display">{topic}</h3>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-600 text-sm italic font-light">
                {content.shortAnswer}
              </div>
            </div>

            <div className="space-y-8 overflow-y-auto max-h-[50vh] pr-2 custom-scrollbar">
              {content.sections.map((section: any, i: number) => {
                const isSpecial = section.title.toLowerCase().includes('tip');
                return (
                  <div key={i} className={isSpecial ? 'bg-amber-50/50 p-6 rounded-2xl border border-amber-100/50' : ''}>
                    <h4 className={`text-xs font-bold uppercase tracking-[0.2em] mb-4 ${isSpecial ? 'text-amber-600' : 'text-slate-400'}`}>
                      {section.title}
                    </h4>
                    <ul className="space-y-3">
                      {section.items.map((item: string, j: number) => (
                        <li key={j} className="flex items-start gap-3">
                          {isSpecial ? (
                            <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          )}
                          <span className={`${isSpecial ? 'text-amber-900' : 'text-slate-700'} text-sm font-light leading-relaxed`}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {content.cta && (
              <div className="mt-10 pt-8 border-t border-slate-100">
                <Link 
                  to={content.cta.url} 
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 text-white hover:bg-slate-900 transition-colors group"
                  onClick={onClose}
                >
                  <span className="font-medium">{content.cta.text}</span>
                  <ArrowRight className="w-5 h-5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
  );
};

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

export default function HelpCenterPage({ onOpenScan }: { onOpenScan: () => void }) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const topics = [
    {
      title: "Getting Started",
      icon: Book,
      color: "text-blue-500",
      bg: "bg-blue-50",
      border: "group-hover:border-blue-200",
      links: ["How to start a scan", "Device requirements", "Setup guide"]
    },
    {
      title: "Face Scan Issues",
      icon: Camera,
      color: "text-amber-500",
      bg: "bg-amber-50",
      border: "group-hover:border-amber-200",
      links: ["Face not detected", "Lighting issues", "Scan failed"]
    },
    {
      title: "Results & Insights",
      icon: Activity,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      border: "group-hover:border-emerald-200",
      links: ["What is health score?", "How accurate is it?", "What do results mean?"]
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      color: "text-purple-500",
      bg: "bg-purple-50",
      border: "group-hover:border-purple-200",
      links: ["Is my data safe?", "Where is data stored?", "Do you share data?"]
    },
    {
      title: "Account & Access",
      icon: User,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
      border: "group-hover:border-indigo-200",
      links: ["Login issues", "Reset password", "Account setup"]
    }
  ];

  const faqs = [
    {
      q: "How does the face scan work?",
      a: "Our technology detects subtle signals from your face to estimate key health metrics."
    },
    {
      q: "How long does the scan take?",
      a: "The scan takes around 30 seconds."
    },
    {
      q: "Is this medically accurate?",
      a: "It is based on clinically validated methods but is not a diagnostic tool."
    },
    {
      q: "Do I need any device?",
      a: "No, just your smartphone camera."
    }
  ];

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      {/* Hero / Search Section */}
      <RevealSection className="px-6 mb-24">
        <div className="max-w-4xl mx-auto text-center mt-12 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 mb-8">
            <HelpCircle className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Support</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-950 mb-8 font-display leading-tight">
            How can we <span className="text-emerald-500">help you?</span>
          </h1>
        </div>
      </RevealSection>

      {/* Popular Topics Box Grid */}
      <RevealSection className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-950 font-display">Popular Topics</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {topics.map((topic, i) => (
              <div key={i} className={`p-8 rounded-[32px] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group ${topic.border}`}>
                <div className={`w-14 h-14 rounded-2xl ${topic.bg} flex items-center justify-center mb-6`}>
                  <topic.icon className={`w-7 h-7 ${topic.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-950 mb-6 font-display">{topic.title}</h3>
                <ul className="space-y-3">
                  {topic.links.map((link, j) => (
                    <li key={j}>
                      <button
                        type="button"
                        onClick={() => setSelectedTopic(link)}
                        className="w-full flex items-center gap-2 py-2 px-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-all duration-200 text-left group/link"
                      >
                        <ChevronRight className={`w-4 h-4 shrink-0 ${topic.color} opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all`} />
                        <span className="text-slate-700 font-medium group-hover/link:text-slate-950 transition-colors underline-offset-2 group-hover/link:underline">
                          {link}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* FAQs */}
      <RevealSection className="py-24 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-950 mb-4 font-display">Frequently Asked Questions</h2>
          <p className="text-slate-500 font-light">Quick answers to common questions about our technology.</p>
        </div>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h4 className="text-lg font-bold text-slate-950 mb-3">{faq.q}</h4>
              <p className="text-slate-600 font-light leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      {/* Troubleshooting & Contact section */}
      <RevealSection className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-24">
          {/* Troubleshooting */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-amber-50 rounded-xl">
                <AlertCircle className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-2xl font-bold font-display text-slate-950">Troubleshooting</h3>
            </div>
            <p className="text-slate-600 font-light mb-8">Having trouble scanning? Try these quick fixes:</p>
            <ul className="space-y-4">
              {[
                "Ensure good lighting",
                "Keep your face steady",
                "Position your face within the frame"
              ].map((fix, i) => (
                <li key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <Lightbulb className="w-5 h-5 text-emerald-500" />
                  <span className="text-slate-700">{fix}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-50 rounded-xl">
                <Mail className="w-6 h-6 text-indigo-500" />
              </div>
              <h3 className="text-2xl font-bold font-display text-slate-950">Need More Help?</h3>
            </div>
            <p className="text-slate-600 font-light mb-8">Can't find what you're looking for? Our team is here to assist you with installation and integration.</p>
            
            <Link to="/contact" className="group block p-6 bg-slate-950 rounded-2xl border border-slate-800 hover:border-emerald-500 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Support</div>
                  <div className="text-white text-lg font-medium group-hover:text-emerald-400 transition-colors">Contact Us</div>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          </div>
        </div>
      </RevealSection>

      {/* CTA */}
      <RevealSection className="py-32 px-6 text-center bg-slate-50">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-950 mb-10 font-display">Start Your Health Check</h2>
        <button 
          onClick={onOpenScan}
          className="bg-brand-primary text-slate-950 px-10 py-5 rounded-2xl font-bold shadow-[0_10px_30px_rgba(0,245,160,0.2)] hover:scale-105 active:scale-95 transition-all text-lg flex items-center justify-center gap-3 mx-auto"
        >
          Start Scan <ArrowRight className="w-5 h-5" />
        </button>
      </RevealSection>

      {/* Help Topic Popup */}
      <AnimatePresence>
        {selectedTopic && (
          <HelpDetailPopup 
            topic={selectedTopic} 
            onClose={() => setSelectedTopic(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
