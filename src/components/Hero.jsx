import { useEffect, useRef } from 'react';
import { Behance, Download, Dribbble, Facebook, LinkedIn } from './icons';

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
  const targetWidth = lines[0] ? lines[0].width : nameEl.getBoundingClientRect().width;
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

  let lo = baseSize * 0.7;
  let hi = baseSize * 1.35;
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

  useEffect(() => {
    const run = () => fitHeroRole(nameRef.current, roleRef.current);
    run();
    window.addEventListener('resize', run);
    document.fonts?.ready?.then(run);
    return () => window.removeEventListener('resize', run);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#212428] pt-24 sm:pt-28 lg:pt-20 pb-4 sm:pb-6"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)] pointer-events-none" />
      <div
        className="absolute top-1/4 left-1/4 -translate-x-1/3 -translate-y-1/3 w-[450px] sm:w-[550px] h-[450px] sm:h-[550px] rounded-full bg-gradient-to-br from-[#FF8D5E] to-[#FF6B6B] blur-[130px] pointer-events-none"
        style={{ opacity: 0.18 }}
      />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] rounded-full bg-gradient-to-tr from-[#FF8D5E] via-[#FF6B6B]/60 to-transparent blur-[140px] pointer-events-none"
        style={{ opacity: 0.16 }}
      />
      <div className="absolute -bottom-10 right-0 w-[300px] h-[300px] rounded-full bg-[#54A7C3]/8 blur-[120px] pointer-events-none" />
      <div
        className="absolute right-4 sm:right-8 lg:right-12 xl:right-16 top-20 sm:top-24 lg:top-24 h-[60%] sm:h-[65%] lg:h-[70%] max-h-[calc(100vh-200px)] w-auto select-none pointer-events-none z-0 hidden lg:block"
        style={{ opacity: 0.18 }}
      >
        <img
          alt="Watermark Typography"
          width="849"
          height="1788"
          className="h-full w-auto object-contain brightness-125"
          src="/images/bannerBg.00b49efe.png"
        />
      </div>
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex-1 flex items-center justify-center relative z-10 my-auto py-4 sm:py-6 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center w-full">
          <div className="w-full lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-4 sm:gap-5 mt-3 sm:mt-4 lg:mt-6">
            <div className="space-y-1.5 sm:space-y-2.5 w-full">
              <p
                className="text-xs sm:text-sm md:text-base font-medium tracking-[0.25em] uppercase"
                style={{ color: '#B8B8B8' }}
              >
                Hello, I&apos;m
              </p>
              <div className="hero-identity">
                <h1
                  ref={nameRef}
                  className="hero-name text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-white font-extrabold tracking-tight leading-[1.15]"
                >
                  Md. Asadujjaman Mahfuz
                </h1>
                <h2
                  ref={roleRef}
                  className="hero-role text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black bg-gradient-to-r from-[#FF8D5E] via-[#FF7A59] to-[#FF6B6B] bg-clip-text text-transparent leading-[1.1] tracking-tight pb-1"
                >
                  Product Designer
                </h2>
              </div>
            </div>
            <p
              className="text-sm sm:text-base md:text-lg max-w-xl leading-relaxed font-normal"
              style={{ color: '#B8B8B8' }}
            >
              Crafting human-centered digital products with 3+ years of experience across web, mobile,
              and interactive platforms. I combine user research, design strategy, and agile execution to
              transform complex workflows into seamless, business-driven solutions.
            </p>
            <div className="flex items-center justify-center lg:justify-start pt-3 sm:pt-4">
              <a
                href="/resume.pdf"
                download="Md Asadujjaman Mahfuz Resume for 𝗣𝗿𝗼𝗱𝘂𝗰𝘁 𝗗𝗲𝘀𝗶𝗴𝗻𝗲𝗿.pdf"
                className="cv-btn bg-gradient-to-r from-[#FF7A57] via-[#FF6C62] to-[#FF5E6A] text-white px-7 sm:px-8 py-3.5 sm:py-3.5 rounded-2xl text-base sm:text-lg font-bold shadow-[0_6px_25px_rgba(255,100,90,0.45)] hover:shadow-[0_10px_32px_rgba(255,100,90,0.65)] transition-all duration-300 flex items-center gap-3 cursor-pointer"
              >
                <Download style={{ color: '#ffffff' }} />
                <span className="text-white" style={{ color: '#ffffff' }}>
                  Download CV
                </span>
              </a>
            </div>
            <div className="flex items-center gap-2.5 sm:gap-3 pt-3 justify-center lg:justify-start">
              <span className="text-xs uppercase tracking-wider text-gray-500 font-medium hidden sm:inline-block mr-1">
                Follow:
              </span>
              <a
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                aria-label="Facebook"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-[#FF8D5E]/40 hover:shadow-[0_0_15px_rgba(255,141,94,0.25)] transition-all duration-300"
                href="https://www.facebook.com/MdasadujjamanMahfuz/"
              >
                <Facebook />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                aria-label="LinkedIn"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-[#FF8D5E]/40 hover:shadow-[0_0_15px_rgba(255,141,94,0.25)] transition-all duration-300"
                href="https://www.linkedin.com/in/md-asadujjaman-mahfuz-190475225/"
              >
                <LinkedIn />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                title="Behance"
                aria-label="Behance"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-[#FF8D5E]/40 hover:shadow-[0_0_15px_rgba(255,141,94,0.25)] transition-all duration-300"
                href="https://www.behance.net/asadmahfuz"
              >
                <Behance />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                title="Dribble"
                aria-label="Dribble"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-[#FF8D5E]/40 hover:shadow-[0_0_15px_rgba(255,141,94,0.25)] transition-all duration-300"
                href="https://dribbble.com/101ASAD"
              >
                <Dribbble />
              </a>
            </div>
          </div>
          <div className="w-full lg:col-span-5 flex items-center justify-center relative mt-6 lg:mt-0">
            <div className="relative w-[300px] sm:w-[380px] md:w-[420px] lg:w-[460px] xl:w-[500px] flex items-center justify-center">
              <div className="absolute inset-0 m-auto w-[290px] h-[290px] sm:w-[380px] sm:h-[380px] lg:w-[440px] lg:h-[440px] rounded-full border border-white/[0.07] pointer-events-none" />
              <div className="absolute inset-0 m-auto w-[240px] h-[240px] sm:w-[310px] sm:h-[310px] lg:w-[370px] lg:h-[370px] rounded-full border border-dashed border-[#FF8D5E]/20 pointer-events-none" />
              <div className="absolute inset-0 m-auto w-[250px] h-[250px] sm:w-[330px] sm:h-[330px] lg:w-[400px] lg:h-[400px] rounded-full bg-gradient-to-tr from-[#FF8D5E]/25 via-[#FF6B6B]/15 to-transparent blur-3xl pointer-events-none" />
              <div className="relative z-10 w-full flex justify-center items-end float-portrait">
                <div
                  className="relative w-[260px] sm:w-[330px] md:w-[370px] lg:w-[420px] xl:w-[460px]"
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
                  />
                </div>
              </div>
              <div className="float-badge absolute bottom-12 -right-2 sm:right-2 lg:-right-4 bg-[#1a1d21]/90 backdrop-blur-md border border-white/10 rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-[0_12px_32px_rgba(0,0,0,0.5)] flex items-center gap-3 z-20 pointer-events-none">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#FF8D5E] to-[#FF6B6B] flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,107,107,0.4)]">
                  <span className="text-xs sm:text-sm font-black">3+</span>
                </div>
                <div className="text-left">
                  <span className="text-xs sm:text-sm font-bold text-white block">Years Experience</span>
                  <span className="text-[10px] sm:text-xs text-gray-400 font-medium block">
                    Crafting Products
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center pt-2 pb-2 z-10">
        <a
          aria-label="Scroll down to About section"
          className="group flex flex-col items-center gap-1.5 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            onNavClick?.('about');
          }}
        >
          <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-gray-400 group-hover:text-[#FF8D5E] transition-colors">
            Scroll to explore
          </span>
          <div className="w-5 h-8 rounded-full border border-white/20 group-hover:border-[#FF8D5E]/60 flex items-start justify-center p-1 transition-colors">
            <div className="scroll-dot w-1.5 h-1.5 rounded-full bg-gradient-to-b from-[#FF8D5E] to-[#FF6B6B]" />
          </div>
        </a>
      </div>
    </section>
  );
}