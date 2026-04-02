import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, RadialBarChart, RadialBar } from 'recharts';

const lineData = [
  { name: '00:00', score: 120 },
  { name: '01:00', score: 170 },
  { name: '02:00', score: 95 },
  { name: '03:00', score: 145 },
  { name: '04:00', score: 190 },
  { name: '05:00', score: 160 },
  { name: '06:00', score: 230 },
];

const radialData = [{ name: 'HP', value: 80 }];
const socialLinks = {
  instagram: 'https://www.instagram.com/bee_thevillan?igsh=NDF3N2hhZDYwMmF2&utm_source=qr',
  tiktok: 'https://www.tiktok.com/@thecaptaintrq',
  facebook: 'https://www.facebook.com/share/1FgEX3sSvg/?mibextid=wwXIfr',
};

const plans = [
  { name: 'Free', price: '$3.1/day', features: ['Get Started'], accent: 'bg-cyan/40' },
  { name: 'Premium', price: '$9/month', features: ['Enhanced stats', 'Priority support'], accent: 'bg-electric-purple/40' },
  { name: 'Pro', price: '$19/month', features: ['Full HUD', 'Team tools', 'Early access'], accent: 'bg-lime/30' },
];

function App() {
  const [hudActive, setHudActive] = useState(false);
  const [bgImage, setBgImage] = useState(null);

  const [payment, setPayment] = useState({ card: '', expiry: '', cvv: '' });
  const [cardType, setCardType] = useState('Unknown');
  const [paymentMessage, setPaymentMessage] = useState('');

  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState('');

  const backgroundStyle = useMemo(() => {
    return bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' } : {};
  }, [bgImage]);

  function maskCard(number) {
    return number.replace(/\D/g, '').slice(0, 16);
  }

  function handleCardChange(e) {
    const raw = maskCard(e.target.value);
    setPayment((prev) => ({ ...prev, card: raw }));
    if (raw.startsWith('4')) setCardType('Visa');
    else if (raw.startsWith('5')) setCardType('MasterCard');
    else setCardType('Unknown');
  }

  function handleExpiry(e) {
    let digits = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (digits.length > 2) digits = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    setPayment((prev) => ({ ...prev, expiry: digits }));
  }

  function handleCvv(e) {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 3);
    setPayment((prev) => ({ ...prev, cvv: digits }));
  }

  function submitPayment(e) {
    e.preventDefault();
    if (!payment.card || payment.card.length < 13) return setPaymentMessage('Enter valid card number.');
    if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) return setPaymentMessage('Expiration must be MM/YY');
    if (!/^\d{3}$/.test(payment.cvv)) return setPaymentMessage('CVV must be 3 digits');

    setPaymentMessage('Processing...');

    setTimeout(() => {
      setPaymentMessage('Payment confirmed: transaction completed successfully. Details securely sent to bank endpoint (simulated).');
      setPayment({ card: '', expiry: '', cvv: '' });
      setCardType('Unknown');
    }, 1100);
  }

  function submitContact(e) {
    e.preventDefault();
    if (!contact.name || !contact.email || !contact.message) {
      setContactStatus('Please fill every field.');
      return;
    }
    setContactStatus('Sending...');
    setTimeout(() => {
      setContactStatus('Message sent to your email (via mailto link simulation).');
      setContact({ name: '', email: '', message: '' });
      window.location.href = `mailto:your-email@example.com?subject=${encodeURIComponent('Game Site Contact')} &body=${encodeURIComponent(contact.message)}`;
    }, 800);
  }

  return (
    <div className="min-h-screen text-white" style={{ ...backgroundStyle }}>
      <div className="fixed inset-0 pointer-events-none scanline opacity-25" />
      <div className="backdrop-blur-lg bg-midnight/60 min-h-screen p-4">
        <header className="flex items-center justify-between border border-cyan/30 p-3 rounded-2xl shadow-glow mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan shadow-glow flex items-center justify-center text-black font-bold">S</div>
            <div>
              <h1 className="font-black text-lg tracking-widest">SteamPadlock</h1>
              <p className="text-xs text-cyan/70">HUD Command Center</p>
            </div>
          </div>
          <nav className="flex items-center gap-2">
            {['Home', 'Dashboard', 'Shop', 'Support'].map((item) => (
              <button key={item} className="px-3 py-1 text-xs border border-cyan/40 rounded-lg hover:bg-cyan/20 transition flicker">{item}</button>
            ))}
            <button className="px-3 py-1 text-xs border border-electric-purple/40 rounded-lg bg-electric-purple/10">Admin</button>
          </nav>
        </header>

        <main className="space-y-6">
          <section className="rounded-3xl border border-lime/25 bg-navy/70 shadow-glow p-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h2 className="text-3xl font-extrabold flicker">Hero Mode: Digital Fortress</h2>
                <p className="text-sm text-cyan/80 mt-1">A premium gaming portal with a cyber HUD experience, subscription management, secure checkout, and live stats in one panel.</p>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wide text-cyan/90">Set Portrait Background</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => setBgImage(reader.result);
                    reader.readAsDataURL(file);
                  }}
                  className="block text-xs text-slate-300"
                />
              </div>
            </div>
          </section>

          <div className="grid lg:grid-cols-4 gap-4">
            <div className="lg:col-span-1 rounded-2xl border border-cyan/30 bg-navy/75 p-4 shadow-glow">
              <button
                onClick={() => setHudActive((p) => !p)}
                className="w-full mb-4 px-4 py-2 bg-cyan/20 border border-cyan rounded-lg hover:scale-[1.01] transition"
              >
                Toggle HUD
              </button>
              <ul className="space-y-2">
                {['Overview', 'Quests', 'Inventory', 'Settings'].map((item) => (
                  <li key={item} className="rounded-lg border border-cyan/20 p-2 hover:border-cyan/70 transition">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <AnimatePresence>
              {hudActive && (
                <motion.section
                  className="lg:col-span-3 rounded-2xl border border-electric-purple/40 bg-navy/80 p-4 shadow-glow"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="grid grid-cols-3 gap-2 w-full">
                      {['System Health', 'Ping', 'User Profile'].map((item) => (
                        <div key={item} className="border border-cyan/30 rounded-xl p-2 text-xs text-center bg-slate-900/45">
                          <strong className="block text-cyan font-semibold">{item}</strong>
                          <span className="text-white/80">{item === 'Ping' ? '24 ms' : item === 'System Health' ? '93%' : 'Commander'}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid xl:grid-cols-3 gap-4">
                    <motion.div className="col-span-2 rounded-xl border border-cyan/30 p-4 bg-black/20 backdrop-blur-sm" whileHover={{ y: -4 }}>
                      <h3 className="uppercase tracking-wide text-cyan text-xs">Game Stats</h3>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={lineData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#0affff" opacity={0.2} />
                            <XAxis dataKey="name" stroke="#9ff" fontSize={11} />
                            <YAxis stroke="#9ff" fontSize={11} />
                            <Tooltip />
                            <Line type="monotone" dataKey="score" stroke="#01f5f5" strokeWidth={2} dot={{ r: 3 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </motion.div>

                    <motion.div className="rounded-xl border border-lime/30 p-4 bg-black/25 backdrop-blur-sm" whileHover={{ y: -3 }}>
                      <h3 className="uppercase tracking-wide text-lime text-xs">Active Quests</h3>
                      <ul className="mt-3 space-y-2 text-sm">
                        <li className="flex justify-between"><span>Hack the mainframe</span><span className="text-cyan">43%</span></li>
                        <li className="flex justify-between"><span>Collect energy cores</span><span className="text-lime">7/10</span></li>
                        <li className="flex justify-between"><span>Secure the bridge</span><span className="text-electric-purple">Active</span></li>
                      </ul>
                      <div className="mt-4 h-28">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadialBarChart cx="50%" cy="50%" innerRadius="65%" outerRadius="100%" barSize={18} data={radialData}>
                            <RadialBar minAngle={15} background clockWise={true} dataKey="value" fill="#4ade80" />
                            <Tooltip />
                          </RadialBarChart>
                        </ResponsiveContainer>
                      </div>
                    </motion.div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>

          <section className="rounded-2xl border border-blue-200/20 bg-navy/80 p-4 shadow-glow">
            <div className="grid lg:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-bold mb-3">Secure Checkout</h3>
                <form onSubmit={submitPayment} className="space-y-3">
                  <label className="block text-xs uppercase tracking-wider text-cyan/80">Card Number ({cardType})</label>
                  <input
                    type="text"
                    value={payment.card}
                    onChange={handleCardChange}
                    placeholder="4xxx xxxx xxxx xxxx"
                    className="w-full rounded-lg border border-cyan/40 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan"
                  />

                  <label className="block text-xs uppercase tracking-wider text-cyan/80">Expiration (MM/YY)</label>
                  <input
                    type="text"
                    value={payment.expiry}
                    onChange={handleExpiry}
                    placeholder="MM/YY"
                    className="w-1/2 rounded-lg border border-cyan/40 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan"
                  />

                  <label className="block text-xs uppercase tracking-wider text-cyan/80">CVV</label>
                  <input
                    type="password"
                    value={payment.cvv}
                    onChange={handleCvv}
                    placeholder="123"
                    className="w-1/3 rounded-lg border border-cyan/40 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan"
                  />

                  <button type="submit" className="px-4 py-2 rounded-lg border border-lime/40 bg-lime/20 hover:bg-lime/30 transition">Confirm Payment</button>
                  <p className="text-xs text-zinc-300">(Sensitive data is not displayed and is sent via secure bank endpoint simulation.)</p>
                  <p className="text-sm text-cyan font-semibold">{paymentMessage}</p>
                </form>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Subscription Plans</h3>
                <div className="grid gap-3">
                  {plans.map((plan) => (
                    <div key={plan.name} className={`rounded-xl border border-cyan/20 p-4 ${plan.accent}`}>
                      <p className="text-xs text-cyan uppercase">{plan.name}</p>
                      <h4 className="text-2xl font-bold mt-1">{plan.price}</h4>
                      <ul className="mt-2 text-sm list-disc ml-4">
                        {plan.features.map((f) => (<li key={f}>{f}</li>))}
                      </ul>
                      <button className="mt-3 px-3 py-1 rounded-md border border-white/20 hover:bg-cyan/20 transition">Choose {plan.name}</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-fuchsia-500/20 bg-navy/70 p-4 shadow-glow">
            <h3 className="text-xl font-bold mb-3">Support & Contact</h3>
            <form onSubmit={submitContact} className="grid md:grid-cols-2 gap-3">
              <input
                type="text"
                value={contact.name}
                placeholder="Name"
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                className="rounded-lg border border-cyan/40 bg-transparent p-2"
              />
              <input
                type="email"
                value={contact.email}
                placeholder="Email"
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                className="rounded-lg border border-cyan/40 bg-transparent p-2"
              />
              <textarea
                value={contact.message}
                placeholder="Message"
                onChange={(e) => setContact({ ...contact, message: e.target.value })}
                className="rounded-lg border border-cyan/40 bg-transparent p-2 md:col-span-2"
                rows={4}
              />
              <button type="submit" className="md:col-span-2 py-2 rounded-lg border border-cyan/40 bg-cyan/15">Send</button>
              <p className="md:col-span-2 text-sm text-lime">{contactStatus}</p>
            </form>
          </section>

          <footer className="rounded-2xl border border-gray-500/20 bg-navy/80 p-4 shadow-glow flex flex-wrap justify-between items-center gap-3">
            <div>
              <p className="text-sm text-cyan">Follow us on</p>
              <div className="flex items-center gap-2 mt-2">
                <a href="https://www.facebook.com/share/1FgEX3sSvg/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="text-xs border border-cyan/50 rounded px-2 py-1">Facebook</a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-xs border border-cyan/50 rounded px-2 py-1">Twitter</a>
                <a href="https://www.instagram.com/bee_thevillan?igsh=NDF3N2hhZDYwMmF2&utm_source=qr" target="_blank" rel="noreferrer" className="text-xs border border-cyan/50 rounded px-2 py-1">Instagram</a>
                <a href="https://www.tiktok.com/@thecaptaintrq" target="_blank" rel="noreferrer" className="text-xs border border-cyan/50 rounded px-2 py-1">TikTok</a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="text-xs border border-cyan/50 rounded px-2 py-1">GitHub</a>
              </div>
            </div>
            <div className="text-right text-xs text-slate-300">© 2026 SteamPadlock. Secure Checkout & Subscription Dashboard</div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
