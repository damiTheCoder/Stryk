import { useState } from "react";
import {
  Smartphone,
  CheckCircle2,
  ShieldCheck,
  Info,
  Zap,
  Key,
  CreditCard,
  FileText,
  ChevronDown,
} from "lucide-react";

const LEASE_DEVICES = [
  { id: "1", model: "iPhone 17 Pro Max (256GB)", price: 119, monthly: 119, term: "36 months", image: "/17proMAx.jpeg" },
  { id: "2", model: "iPhone 17 Pro (128GB)", price: 89, monthly: 89, term: "24 months", image: "/17pro.jpeg" },
  { id: "3", model: "iPhone 17 (128GB)", price: 69, monthly: 69, term: "24 months", image: "/17.jpeg" },
  { id: "4", model: "iPhone 16 Pro Max (256GB)", price: 99, monthly: 99, term: "24 months", image: "/16promax.jpeg" },
  { id: "5", model: "iPhone 16 Pro (128GB)", price: 79, monthly: 79, term: "24 months", image: "/16pro.jpeg" },
  { id: "6", model: "iPhone 16 (128GB)", price: 59, monthly: 59, term: "24 months", image: "/16.jpeg" },
  { id: "7", model: "iPhone 15 Pro Max (256GB)", price: 69, monthly: 69, term: "24 months", image: "/15proMax.jpeg" },
  { id: "8", model: "iPhone 15 Pro (128GB)", price: 59, monthly: 59, term: "24 months", image: "/15pro.jpeg" },
  { id: "9", model: "iPhone 15 (128GB)", price: 49, monthly: 49, term: "24 months", image: "/15pro.jpeg" },
  { id: "10", model: "iPhone 14 Pro Max (256GB)", price: 49, monthly: 49, term: "24 months", image: "/14proMax.jpeg" },
  { id: "11", model: "iPhone 14 Pro (128GB)", price: 39, monthly: 39, term: "24 months", image: "/14pro.jpeg" },
  { id: "12", model: "iPhone 14 (128GB)", price: 29, monthly: 29, term: "24 months", image: "/14.jpeg" },
];

const LEASE_TERMS = [
  { label: "12 months", rate: "0% APR" },
  { label: "24 months", rate: "0% APR" },
  { label: "36 months", rate: "4.9% APR" },
];

const LEASE_FAQS = [
  { q: "What is the lease application process?", a: "Select your device, complete your personal details, and submit your application. Most applications are approved within minutes." },
  { q: "Can I pay off my lease early?", a: "Yes. You can pay off your lease early at any time with no prepayment penalties." },
  { q: "What happens at the end of the lease?", a: "You can return the device, upgrade to a new model, or purchase it for a small residual fee." },
  { q: "Do I own the device during the lease?", a: "No, but you have full use of the device and can upgrade once 50% of payments are completed." },
  { q: "Is a credit check required?", a: "A soft credit check is performed — this does not affect your credit score." },
];

export default function LeasePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    income: "",
    deviceId: LEASE_DEVICES[0].id,
    term: LEASE_TERMS[1].label,
    agreed: false,
  });
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeLeaseDeviceId, setActiveLeaseDeviceId] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const selectedDevice = LEASE_DEVICES.find((d) => d.id === formData.deviceId) || LEASE_DEVICES[0];
  const selectedTerm = LEASE_TERMS.find((t) => t.label === formData.term) || LEASE_TERMS[1];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const steps = [
    { num: 1, label: "Select Device", icon: Smartphone },
    { num: 2, label: "Your Details", icon: FileText },
    { num: 3, label: "Review & Apply", icon: CheckCircle2 },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white dark:bg-black transition-colors">
        <div className="mx-auto max-w-7xl w-full px-3 pt-0 pb-6 lg:px-6 lg:pt-6 lg:pb-6 space-y-1 md:space-y-4">
          <div className="px-3 pt-3 pb-6 lg:p-6">
            <div className="uniswap-card p-8 flex flex-col items-center justify-center text-center animate-drop-in">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 mb-4">
                <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Application Submitted</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                Your lease application for the <span className="font-semibold text-gray-900 dark:text-white">{selectedDevice.model}</span> has been submitted. We'll review it and get back to you within 24 hours.
              </p>
              <div className="mt-6 rounded-xl bg-gray-50 dark:bg-zinc-800 p-4 w-full max-w-sm">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500 dark:text-gray-400">Monthly Payment</span>
                  <span className="font-semibold text-gray-900 dark:text-white">${selectedDevice.monthly}/mo</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Term</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{selectedTerm.label}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <div className="mx-auto max-w-7xl w-full px-3 pt-0 pb-6 lg:px-6 lg:pt-6 lg:pb-6 space-y-1 md:space-y-4">
        <div className="px-3 pt-3 pb-6 lg:p-6">
          <header>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Apply for Lease</h1>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Get the latest device with flexible payment terms. No upfront cost.</p>
          </header>

          <div className="flex items-center gap-4 py-4 animate-drop-in">
            {steps.map((s, idx) => (
              <div key={s.num} className="flex items-center gap-2">
                <div className={`flex items-center justify-center h-8 w-8 rounded-full text-sm font-semibold ${step >= s.num ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-zinc-800 text-gray-500"}`}>
                  {step > s.num ? <CheckCircle2 className="h-4 w-4" /> : s.num}
                </div>
                <span className={`text-sm font-medium ${step >= s.num ? "text-gray-900 dark:text-white" : "text-gray-400"}`}>{s.label}</span>
                {idx < steps.length - 1 && <div className="w-8 h-px bg-gray-200 dark:bg-zinc-800 mx-2" />}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <section className="lg:col-span-2 space-y-6">
              <div className="uniswap-card p-6 space-y-5 animate-drop-in">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Key className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    {step === 1 ? "Select Device & Term" : step === 2 ? "Personal Information" : "Review Application"}
                  </h2>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                    Step {step} of 3
                  </span>
                </div>

                {step === 1 && (
                  <div className="space-y-5">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Choose Your Device</label>
                      {activeLeaseDeviceId && (() => {
                        const activeDevice = LEASE_DEVICES.find((d) => d.id === activeLeaseDeviceId);
                        if (!activeDevice) return null;
                        return (
                          <div className="flex justify-center mb-4">
                            <img
                              src={activeDevice.image}
                              alt={activeDevice.model}
                              className="h-56 w-auto object-contain border-2 border-black rounded-xl"
                            />
                          </div>
                        );
                      })()}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {LEASE_DEVICES.map((device) => (
                          <button
                            key={device.id}
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, deviceId: device.id }));
                              setActiveLeaseDeviceId((prev) => (prev === device.id ? null : device.id));
                            }}
                            className={`flex items-center justify-between rounded-xl p-4 text-left transition ${
                              formData.deviceId === device.id
                                ? "bg-blue-50 dark:bg-blue-950/40 ring-2 ring-blue-600"
                                : "bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700"
                            }`}
                          >
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{device.model}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{device.term}</p>
                            </div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">${device.monthly}/mo</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Lease Term</label>
                      <div className="grid grid-cols-3 gap-3">
                        {LEASE_TERMS.map((term) => (
                          <button
                            key={term.label}
                            onClick={() => setFormData((prev) => ({ ...prev, term: term.label }))}
                            className={`rounded-xl p-3 text-center transition ${
                              formData.term === term.label
                                ? "bg-blue-50 dark:bg-blue-950/40 ring-2 ring-blue-600"
                                : "bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700"
                            }`}
                          >
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{term.label}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{term.rate}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-4">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                          No upfront payment required. Lease starts after approval.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="uniswap-input"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="uniswap-input"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                          className="uniswap-input"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Monthly Income (USD)</label>
                        <input
                          type="number"
                          name="income"
                          value={formData.income}
                          onChange={handleChange}
                          placeholder="5000"
                          className="uniswap-input"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Address</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="123 Main St"
                          className="uniswap-input"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="New York"
                          className="uniswap-input"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Zip Code</label>
                        <input
                          type="text"
                          name="zip"
                          value={formData.zip}
                          onChange={handleChange}
                          placeholder="10001"
                          className="uniswap-input"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Country</label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          placeholder="United States"
                          className="uniswap-input"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-5">
                      <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-3">Lease Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Device</span>
                          <span className="font-medium text-gray-900 dark:text-white">{selectedDevice.model}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Term</span>
                          <span className="font-medium text-gray-900 dark:text-white">{selectedTerm.label} ({selectedTerm.rate})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Monthly Payment</span>
                          <span className="font-medium text-gray-900 dark:text-white">${selectedDevice.monthly}/mo</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Total Cost</span>
                          <span className="font-medium text-gray-900 dark:text-white">${(selectedDevice.monthly * (parseInt(selectedTerm.label) || 24)).toLocaleString()}</span>
                        </div>
                        <div className="border-t border-blue-200 dark:border-blue-800 pt-2 mt-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Applicant</span>
                            <span className="font-medium text-gray-900 dark:text-white">{formData.fullName || "—"}</span>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-gray-600 dark:text-gray-400">Email</span>
                            <span className="font-medium text-gray-900 dark:text-white">{formData.email || "—"}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreed"
                        checked={formData.agreed}
                        onChange={handleChange}
                        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        I agree to the lease terms and conditions. I understand this is a financing agreement and I am responsible for monthly payments. Early payoff is available at any time.
                      </span>
                    </label>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  {step > 1 && (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="flex-1 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 py-3 text-sm font-semibold text-gray-900 dark:text-white transition"
                    >
                      Back
                    </button>
                  )}
                  <button
                    onClick={step < 3 ? handleNext : handleSubmit}
                    disabled={isSubmitting || (step === 3 && !formData.agreed)}
                    className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-500 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {isSubmitting ? "Submitting..." : step === 3 ? "Submit Application" : "Continue"}
                  </button>
                </div>
              </div>

              <div className="uniswap-card p-6 animate-drop-in">
                <h2 className="uniswap-section-title mb-4">How Leasing Works</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center text-center p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/50">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-sm font-bold mb-3">1</div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Apply Online</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Select your device and fill in your details</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/50">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-sm font-bold mb-3">2</div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Get Approved</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Soft credit check, instant decision</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/50">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-sm font-bold mb-3">3</div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Receive Device</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Ships within 3-5 business days</p>
                  </div>
                </div>
              </div>
            </section>

            <aside className="space-y-6">
              <div className="uniswap-card p-6 animate-drop-in">
                <h2 className="uniswap-section-title mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Lease Details
                </h2>
                <div className="rounded-2xl bg-gray-50 dark:bg-zinc-800">
                  <div className="flex items-center justify-between p-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Selected Device</span>
                    <Smartphone className="h-4 w-4 text-gray-400" />
                  </div>
                  <p className="px-4 text-sm font-semibold text-gray-900 dark:text-white">{selectedDevice.model}</p>
                  <div className="mx-4 mt-3 mb-4">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-zinc-800">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Monthly</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">${selectedDevice.monthly}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-zinc-800 mt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Term</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{selectedTerm.label}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="uniswap-card p-6 animate-drop-in">
                <h2 className="uniswap-section-title mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  FAQs
                </h2>
                <div className="space-y-2">
                  {LEASE_FAQS.map((item, idx) => (
                    <div key={item.q} className={`rounded-xl bg-gray-50 dark:bg-zinc-800/50 overflow-hidden ${activeFaq === idx ? "ring-1 ring-blue-200 dark:ring-blue-800" : ""}`}>
                      <button
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full flex items-center justify-between p-3 text-left"
                      >
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 pr-2">{item.q}</span>
                        <ChevronDown className={`h-4 w-4 text-gray-400 shrink-0 transition-transform ${activeFaq === idx ? "rotate-180" : ""}`} />
                      </button>
                      {activeFaq === idx && (
                        <div className="px-3 pb-3">
                          <p className="text-xs text-gray-500 dark:text-gray-400">{item.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="uniswap-card p-6 animate-drop-in">
                <h2 className="uniswap-section-title mb-3 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  Protection
                </h2>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Soft credit check — no impact on score</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Early payoff with no penalties</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Device protection plan included</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
