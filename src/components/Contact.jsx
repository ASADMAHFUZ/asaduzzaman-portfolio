import { useRef, useState } from 'react';
import { Behance, Dribbble, EmailIcon, Facebook, LinkedIn, LocationIcon, PhoneIcon, SendIcon } from './icons';
import DinoGame from './DinoGame';

const CONTACT_EMAIL = 'mdasadujjaman101@gmail.com';

const fieldChecks = {
  name: (value) => (!value.trim() ? 'Please input your name!' : ''),
  email: (value) => {
    if (!value.trim()) return 'Please input your email!';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email!';
    return '';
  },
  message: (value) => (!value.trim() ? 'Please input your message!' : ''),
};

export default function Contact({ showToast }) {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const paint = (field, message) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
    const input = { name: nameRef, email: emailRef, message: messageRef }[field]?.current;
    input?.classList.toggle('is-invalid', Boolean(message));
  };

  const openMailBackup = (payload) => {
    const mailSubject = encodeURIComponent(
      payload.subject || `Portfolio message from ${payload.name}`,
    );
    const mailBody = encodeURIComponent(
      `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${mailSubject}&body=${mailBody}`;
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const name = nameRef.current?.value ?? '';
    const email = emailRef.current?.value ?? '';
    const subject = document.getElementById('subject')?.value ?? '';
    const message = messageRef.current?.value ?? '';

    let valid = true;
    const values = { name, email, message };
    (['name', 'email', 'message']).forEach((field) => {
      const msg = fieldChecks[field](values[field]);
      paint(field, msg);
      if (msg) valid = false;
    });
    if (!valid) return;

    const payload = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    };

    setSending(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));

      if (data.success) {
        showToast('success', 'Message sent! Check mdasadujjaman101@gmail.com');
        formRef.current?.reset();
        setErrors({ name: '', email: '', message: '' });
        [nameRef, emailRef, messageRef].forEach((ref) =>
          ref.current?.classList.remove('is-invalid'),
        );
      } else if (data.activation) {
        showToast('error', data.message || 'Activate FormSubmit from your Gmail first, then try again.');
      } else {
        showToast('error', data.message || 'Email service blocked. Opening your mail app as backup...');
        setTimeout(() => openMailBackup(payload), 900);
      }
    } catch {
      showToast('error', 'Local API not running. Opening mail app backup...');
      setTimeout(() => openMailBackup(payload), 900);
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    'form-field ant-input !bg-white/[0.03] !border-white/[0.08] !text-white placeholder:!text-gray-600 hover:!border-[#FF8D5E]/30 focus:!border-[#FF8D5E] focus:!shadow-[0_0_0_2px_rgba(255,141,94,0.08)] !px-5 !py-3.5 !rounded-xl';

  return (
    <div id="contact" className="contactUsBg w-full relative overflow-hidden">
      <div className="contactUsBg-overlay" aria-hidden="true" />
      <div className="absolute top-20 left-10 w-[350px] h-[350px] rounded-full bg-gradient-to-br from-[#FF8D5E]/8 to-transparent blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-20 right-10 w-[300px] h-[300px] rounded-full bg-gradient-to-tl from-[#FF6B6B]/8 to-transparent blur-[100px] pointer-events-none z-0" />
      <div className="relative z-10 max-w-7xl mx-auto py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="text-[#FF8D5E] text-sm font-semibold tracking-[0.3em] uppercase mb-3 block">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
            Let&apos;s Work{' '}
            <span className="bg-gradient-to-r from-[#FF8D5E] to-[#FF6B6B] bg-clip-text text-transparent">
              Together
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#FF8D5E] to-[#FF6B6B] rounded-full mx-auto mb-5" />
          <p className="text-gray-500 max-w-lg mx-auto text-base">
            Have a project in mind or just want to say hello? Drop me a message and I&apos;ll get back to
            you soon.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          <div className="lg:col-span-2 flex flex-col reveal from-left">
            <div className="p-[1px] rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] flex-1">
              <div className="bg-[#161618]/80 backdrop-blur-md rounded-2xl p-7 sm:p-8 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Contact Information</h3>
                  <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                    Feel free to reach out through any of these channels. I&apos;m always open to discussing
                    new projects and opportunities.
                  </p>
                  <div className="space-y-5">
                    <a
                      href="mailto:Mdasadujjaman101@gmail.com"
                      className="flex items-center gap-4 group/item cursor-pointer"
                    >
                      <div className="contact-icon-box w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <EmailIcon />
                      </div>
                      <div>
                        <span className="text-gray-400 text-xs font-semibold uppercase tracking-[0.15em] block mb-1">
                          Email
                        </span>
                        <span className="text-white text-sm sm:text-base font-medium group-hover/item:text-[#FF8D5E] transition-colors duration-300 break-all sm:break-normal">
                          Mdasadujjaman101@gmail.com
                        </span>
                      </div>
                    </a>
                    <a href="tel:+8801953512253" className="flex items-center gap-4 group/item cursor-pointer">
                      <div className="contact-icon-box w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <PhoneIcon />
                      </div>
                      <div>
                        <span className="text-gray-400 text-xs font-semibold uppercase tracking-[0.15em] block mb-1">
                          Phone
                        </span>
                        <span className="text-white text-sm sm:text-base font-medium group-hover/item:text-[#FF8D5E] transition-colors duration-300">
                          +880 1953 512253
                        </span>
                      </div>
                    </a>
                    <div className="flex items-center gap-4 group/item cursor-pointer">
                      <div className="contact-icon-box w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <LocationIcon />
                      </div>
                      <div>
                        <span className="text-gray-400 text-xs font-semibold uppercase tracking-[0.15em] block mb-1">
                          Location
                        </span>
                        <span className="text-white text-sm sm:text-base font-medium group-hover/item:text-[#FF8D5E] transition-colors duration-300">
                          Dhaka, Bangladesh
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-10 pt-6 border-t border-white/[0.08]">
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                    Follow Me
                  </p>
                  <div className="flex gap-3.5">
                    <a
                      href="https://www.facebook.com/MdasadujjamanMahfuz/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="contact-social-btn w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                    >
                      <Facebook className="text-lg sm:text-xl" height="1em" width="1em" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/md-asadujjaman-mahfuz-190475225/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="contact-social-btn w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                    >
                      <LinkedIn className="text-lg sm:text-xl" height="1em" width="1em" />
                    </a>
                    <a
                      href="https://www.behance.net/asadmahfuz"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Behance"
                      className="contact-social-btn w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                    >
                      <Behance className="text-lg sm:text-xl" height="1em" width="1em" />
                    </a>
                    <a
                      href="https://dribbble.com/101ASAD"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Dribble"
                      className="contact-social-btn w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                    >
                      <Dribbble className="text-lg sm:text-xl" height="1em" width="1em" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 reveal from-right">
            <div className="p-[1px] rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.03]">
              <div className="bg-[#161618]/80 backdrop-blur-md rounded-2xl p-7 sm:p-8 md:p-10">
                <h3 className="text-xl font-bold text-white mb-1">Send a Message</h3>
                <p className="text-gray-600 text-sm mb-8">Fill in the form below and I&apos;ll respond within 24 hours</p>
                <form id="contact-form" ref={formRef} noValidate onSubmit={onSubmit}>
                  <input
                    type="text"
                    name="_honey"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                    style={{ display: 'none' }}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <input
                        ref={nameRef}
                        className={inputClass}
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your Name"
                        aria-label="Your Name"
                        required
                        onInput={(e) => paint('name', fieldChecks.name(e.target.value))}
                      />
                      <p id="name-error" className="field-error">
                        {errors.name}
                      </p>
                    </div>
                    <div>
                      <input
                        ref={emailRef}
                        className={inputClass}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        aria-label="Your Email"
                        required
                        onInput={(e) => paint('email', fieldChecks.email(e.target.value))}
                      />
                      <p id="email-error" className="field-error">
                        {errors.email}
                      </p>
                    </div>
                  </div>
                  <div className="mb-5">
                    <input
                      className={inputClass}
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Subject (Optional)"
                      aria-label="Subject (Optional)"
                    />
                  </div>
                  <div className="mb-8">
                    <textarea
                      ref={messageRef}
                      className={`${inputClass} !resize-none`}
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell me about your project..."
                      aria-label="Tell me about your project..."
                      required
                      onInput={(e) => paint('message', fieldChecks.message(e.target.value))}
                    />
                    <p id="message-error" className="field-error">
                      {errors.message}
                    </p>
                  </div>
                  <button
                    id="send-btn"
                    type="submit"
                    disabled={sending}
                    className="!border-none !px-5 !py-3.5 !rounded-xl !font-semibold !text-base !h-[54px] w-full sm:w-auto !text-white hover:!text-white"
                    style={{
                      background: 'linear-gradient(135deg, #FF8D5E, #FF6B6B)',
                      color: '#ffffff',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 20px rgba(255, 107, 107, 0.3)',
                      height: '54px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <SendIcon />
                    <span id="send-label" style={{ color: '#ffffff' }}>
                      {sending ? 'Sending...' : 'Send Message'}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DinoGame />
    </div>
  );
}