'use client';

import { Check, Sparkles, Zap, Crown } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
  buttonText: string;
  buttonStyle: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for exploring career paths",
    features: [
      "Unlimited roadmap generations",
      "AI-powered career analysis",
      "Interactive visualization",
      "Download as PNG image",
      "Skills & milestones mapping"
    ],
    icon: <Zap className="h-6 w-6" />,
    buttonText: "Get Started Free",
    buttonStyle: "bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
  },
  {
    id: "pro",
    name: "Pro",
    price: "$9",
    period: "month",
    description: "For serious career planners",
    features: [
      "Everything in Free",
      "Save unlimited roadmaps",
      "Export to PDF & SVG",
      "Priority AI processing",
      "Personalized recommendations",
      "Email support"
    ],
    icon: <Crown className="h-6 w-6" />,
    popular: true,
    buttonText: "Coming Soon",
    buttonStyle: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
  }
];

export default function Pricing() {
  const handleClick = (tierId: string) => {
    if (tierId === "free") {
      // Scroll to search input
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 relative">
      <div className="absolute inset-0 bg-white/30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl md:text-5xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600 text-lg">
              Start planning your career path today. No credit card required.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
            {pricingTiers.map((tier) => (
              <div
                key={tier.id}
                className="relative"
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className={`h-full rounded-2xl p-8 transition-all duration-300 hover:shadow-xl ${
                  tier.popular 
                    ? 'border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg' 
                    : 'border border-slate-200 bg-white hover:border-blue-200 shadow-md'
                }`}>
                  {/* Header */}
                  <div className="text-center pb-6 border-b border-slate-100">
                    <div className="flex items-center justify-center mb-4">
                      <div className={`p-3 rounded-full ${
                        tier.popular ? 'bg-blue-100' : 'bg-slate-100'
                      }`}>
                        <div className={tier.popular ? 'text-blue-600' : 'text-slate-600'}>
                          {tier.icon}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-800">
                      {tier.name}
                    </h3>
                    
                    <div className="mt-4 space-y-1">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-5xl font-bold text-slate-800">
                          {tier.price}
                        </span>
                        {tier.period && (
                          <span className="text-slate-500 text-lg">
                            / {tier.period}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-slate-600">
                        {tier.description}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="py-6 space-y-4">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <div className={`mt-0.5 p-1 rounded-full ${
                          tier.popular ? 'bg-blue-100' : 'bg-slate-100'
                        }`}>
                          <Check className={`h-3 w-3 ${
                            tier.popular ? 'text-blue-600' : 'text-slate-600'
                          }`} />
                        </div>
                        <span className="text-slate-600 text-sm leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Button */}
                  <div className="pt-4">
                    <button
                      onClick={() => handleClick(tier.id)}
                      disabled={tier.id === "pro"}
                      className={`w-full h-12 rounded-lg text-lg font-medium transition-all duration-200 ${tier.buttonStyle} ${
                        tier.id === "pro" ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                    >
                      {tier.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="text-center space-y-4 pt-8">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Instant access
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Cancel anytime
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
