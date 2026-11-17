import { useEffect, useRef, useState } from 'react';
import { Behance, Download, Dribbble, Facebook, LinkedIn } from './icons';

const RESUME_FILE = '/resume.pdf';
const RESUME_DOWNLOAD_NAME = 'Md Asadujjaman Mahfuz Resume for 𝗣𝗿𝗼𝗱𝘂𝗰𝘁 𝗗𝗲𝘀𝗶𝗴𝗻𝗲𝗿.pdf';

const SOCIAL = [
  {
    title: 'Facebook',
    href: 'https://www.facebook.com/MdasadujjamanMahfuz/',
    Icon: Facebook,
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/md-asadujjaman-mahfuz-190475225/',
    Icon: LinkedIn,
  },
  {
    title: 'Behance',
    href: 'https://www.behance.net/asadmahfuz',
    Icon: Behance,
  },
  {
    title: 'Dribble',
    href: 'https://dribbble.com/101ASAD',
    Icon: Dribbble,
  },
];

async function downloadResume() {
  const response = await fetch(RESUME_FILE);
  if (!response.ok) throw new Error('Resume unavailable');
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = RESUME_DOWNLOAD_NAME;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function fitHeroRole(nameEl, roleEl) {
  if (!nameEl || !roleEl) return;

  roleEl.style.fontSize = '';
  const nameStyle = getComputedStyle(nameEl);
  const baseSize = parseFloat(nameStyle.fontSize);
  if (!baseSize) return;

  const range = document.createRange();
  const textNode = nameEl.firstChild;
  if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return;
  range.selectNodeContents(textNode);
  const lines = [...range.getClientRects()];
  const nameBox = nameEl.getBoundingClientRect();
  const targetWidth = Math.min(
    lines[0] ? lines[0].width : nameBox.width,
    nameBox.width || Number.POSITIVE_INFINITY,
  );
  if (!targetWidth) return;

  const measure = (size) => {
    const span = document.createElement('span');
    span.style.cssText = `position:absolute;visibility:hidden;white-space:nowrap;font:${nameStyle.fontStyle} ${getComputedStyle(roleEl).fontWeight} ${size}px/${nameStyle.lineHeight} ${nameStyle.fontFamily};letter-spacing:${getComputedStyle(roleEl).letterSpacing};`;
    span.textContent = roleEl.textContent.trim();
    document.body.appendChild(span);
    const width = span.getBoundingClientRect().width;
    span.remove();
    return width;
  };

  let lo = baseSize * 0.55;
  let hi = Math.min(baseSize * 1.35, baseSize * (window.innerWidth < 640 ? 1.05 : 1.35));
  let best = baseSize;
  for (let i = 0; i < 20; i += 1) {
    const mid = (lo + hi) / 2;
    const width = measure(mid);
    best = mid;
    if (Math.abs(width - targetWidth) < 0.5) break;
    if (width < targetWidth) lo = mid;
    else hi = mid;
  }
  roleEl.style.fontSize = `${best.toFixed(2)}px`;
}

export default function Hero({ onNavClick }) {
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const [cvBusy, setCvBusy] = useState(false);

  useEffect(() => {
    const run = () => fitHeroRole(nameRef.current, roleRef.current);
    run();
    window.addEventListener('resize', run);
    document.fonts?.ready?.then(run);
    return () => window.removeEventListener('resize', run);
  }, []);

  const onDownloadCv = async (event) => {
    event.preventDefault();
    if (cvBusy) return;
    setCvBusy(true);
    try {
      await downloadResume();
    } catch {
      window.open(RESUME_FILE, '_blank', 'noopener,noreferrer');
    } finally {
      setCvBusy(false);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-[#212428] pt-20 sm:pt-24 md:pt-28 lg:pt-16 xl:pt-20 pb-3 sm:pb-5 md:pb-6"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)] pointer-events-none" />
      <div
        className="absolute top-[18%] left-[12%] -translate-x-1/3 -translate-y-1/3 w-[min(70vw,450px)] sm:w-[550px] aspect-square rounded-full bg-gradient-to-br from-[#FF8D5E] to-[#FF6B6B] blur-[100px] sm:blur-[130px] pointer-events-none"
        style={{ opacity: 0.18 }}
      />
      <div
        className="absolute top-1/2 right-[8%] -translate-y-1/2 w-[min(65vw,400px)] sm:w-[500px] aspect-square rounded-full bg-gradient-to-tr from-[#FF8D5E] via-[#FF6B6B]/60 to-transparent blur-[110px] sm:blur-[140px] pointer-events-none"
        style={{ opacity: 0.16 }}
      />
      <div className="absolute -bottom-10 right-0 w-[min(55vw,300px)] aspect-square rounded-full bg-[#54A7C3]/8 blur-[100px] sm:blur-[120px] pointer-events-none" />
      <div
        className="absolute right-4 sm:right-8 lg:right-12 xl:right-16 top-20 sm:top-24 lg:top-24 h-[55%] lg:h-[70%] max-h-[calc(100svh-180px)] w-auto select-none pointer-events-none z-0 hidden lg:block"
        style={{ opacity: 0.18 }}
      >
        <img
          alt=""
          width="849"
          height="1788"
          className="h-full w-auto object-contain brightness-125"
          src="/images/bannerBg.00b49efe.png"
          aria-hidden="true"
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex-1 flex items-center justify-center relative z-10 py-2 sm:py-4 md:py-6 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-10 lg:gap-8 xl:gap-12 items-center w-full">
          {/* Copy */}
          <div className="w-full lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-3.5 sm:gap-4 md:gap-5 mt-1 sm:mt-2 lg:mt-4">
            <div className="space-y-1.5 sm:space-y-2.5 w-full max-w-2xl lg:max-w-none flex flex-col items-center lg:items-start">
              <p
                className="text-[11px] sm:text-sm md:text-base font-medium tracking-[0.22em] sm:tracking-[0.25em] uppercase"
                style={{ color: '#B8B8B8' }}
              >
                Hello, I&apos;m
              </p>
              <div className="hero-identity mx-auto lg:mx-0">
                <h1
                  ref={nameRef}
                  className="hero-name text-[clamp(1.7rem,1.1rem+3.2vw,3.75rem)] text-white font-extrabold tracking-tight leading-[1.12] sm:leading-[1.15]"
                >
                  Md. Asadujjaman Mahfuz
                </h1>
                <h2
                  ref={roleRef}
                  className="hero-role text-[clamp(1.7rem,1.1rem+3.2vw,3.75rem)] font-black bg-gradient-to-r from-[#FF8D5E] via-[#FF7A59] to-[#FF6B6B] bg-clip-text text-transparent leading-[1.08] sm:leading-[1.1] tracking-tight pb-0.5 sm:pb-1"
                >
                  Product Designer
                </h2>
              </div>
            </div>

            <p
              className="text-[13px] sm:text-base md:text-lg max-w-[34rem] leading-relaxed font-normal px-1 sm:px-0"
              style={{ color: '#B8B8B8' }}
            >
              Crafting human-centered digital products with 3+ years of experience across web, mobile,
              and interactive platforms. I combine user research, design strategy, and agile execution to
              transform complex workflows into seamless, business-driven solutions.
            </p>

            <div className="flex items-center justify-center lg:justify-start pt-2 sm:pt-3 md:pt-4 w-full">
              <a
                href={RESUME_FILE}
                download={RESUME_DOWNLOAD_NAME}
                onClick={onDownloadCv}
                aria-busy={cvBusy}
                className="cv-btn bg-gradient-to-r from-[#FF7A57] via-[#FF6C62] to-[#FF5E6A] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl text-[15px] sm:text-lg font-bold shadow-[0_6px_25px_rgba(255,100,90,0.45)] hover:shadow-[0_10px_32px_rgba(255,100,90,0.65)] transition-all duration-300 flex items-center gap-2.5 sm:gap-3 cursor-pointer w-full sm:w-auto max-w-xs sm:max-w-none justify-center"
              >
                <Download style={{ color: '#ffffff' }} />
                <span className="text-white" style={{ color: '#ffffff' }}>
                  {cvBusy ? 'Downloading...' : 'Download CV'}
                </span>
              </a>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 pt-2 sm:pt-3 justify-center lg:justify-start flex-wrap">
              <span className="text-xs uppercase tracking-wider text-gray-500 font-medium hidden sm:inline-block mr-1">
                Follow:
              </span>
              {SOCIAL.map(({ title, href, Icon }) => (
                <a
                  key={title}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={title}
                  aria-label={title}
                  className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/[0.04] border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-[#FF8D5E]/40 hover:shadow-[0_0_15px_rgba(255,141,94,0.25)] transition-all duration-300"
                  href={href}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Portrait */}
          <div className="w-full lg:col-span-5 flex items-center justify-center relative mt-2 sm:mt-4 lg:mt-0">
            <div className="relative w-[min(78vw,280px)] sm:w-[min(70vw,360px)] md:w-[min(58vw,400px)] lg:w-[min(100%,460px)] xl:w-[500px] flex items-center justify-center mx-auto">
              <div className="absolute inset-0 m-auto w-[92%] aspect-square max-w-[440px] rounded-full border border-white/[0.07] pointer-events-none" />
              <div className="absolute inset-0 m-auto w-[76%] aspect-square max-w-[370px] rounded-full border border-dashed border-[#FF8D5E]/20 pointer-events-none" />
              <div className="absolute inset-0 m-auto w-[80%] aspect-square max-w-[400px] rounded-full bg-gradient-to-tr from-[#FF8D5E]/25 via-[#FF6B6B]/15 to-transparent blur-3xl pointer-events-none" />

              <div className="relative z-10 w-full flex justify-center items-end float-portrait">
                <div
                  className="relative w-[88%] sm:w-[90%] lg:w-[92%]"
                  style={{
                    maskImage:
                      'linear-gradient(to bottom, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 98%)',
                    WebkitMaskImage:
                      'linear-gradient(to bottom, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 98%)',
                  }}
                >
                  <img
                    alt="Md. Asadujjaman Mahfuz - UX/UI Designer"
                    width="900"
                    height="1000"
                    className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.65)]"
                    src="/images/profileImage.e9dfdee2.png"
                    decoding="async"
                  />
                </div>
              </div>

              <div className="float-badge absolute bottom-6 sm:bottom-10 md:bottom-12 right-0 sm:right-1 lg:-right-2 xl:-right-4 bg-[#1a1d21]/90 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl px-2.5 py-2 sm:px-4 sm:py-3 shadow-[0_12px_32px_rgba(0,0,0,0.5)] flex items-center gap-2 sm:gap-3 z-20 pointer-events-none max-w-[calc(100%-0.5rem)]">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#FF8D5E] to-[#FF6B6B] flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,107,107,0.4)] shrink-0">
                  <span className="text-[11px] sm:text-sm font-black">3+</span>
                </div>
                <div className="text-left min-w-0">
                  <span className="text-[11px] sm:text-sm font-bold text-white block leading-tight">
                    Years Experience
                  </span>
                  <span className="text-[9px] sm:text-xs text-gray-400 font-medium block leading-tight">
                    Crafting Products
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center pt-1 sm:pt-2 pb-1 sm:pb-2 z-10 shrink-0">
        <a
          aria-label="Scroll down to About section"
          className="group flex flex-col items-center gap-1 sm:gap-1.5 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            onNavClick?.('about');
          }}
        >
          <span className="text-[9px] sm:text-[11px] font-medium tracking-[0.22em] sm:tracking-[0.25em] uppercase text-gray-400 group-hover:text-[#FF8D5E] transition-colors">
            Scroll to explore
          </span>
          <div className="w-5 h-7 sm:h-8 rounded-full border border-white/20 group-hover:border-[#FF8D5E]/60 flex items-start justify-center p-1 transition-colors">
            <div className="scroll-dot w-1.5 h-1.5 rounded-full bg-gradient-to-b from-[#FF8D5E] to-[#FF6B6B]" />
          </div>
        </a>
      </div>
    </section>
  );
}
