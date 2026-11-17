import { SKILLS } from '../data/skills';

function SkillVisual({ skill }) {
  const wrapClass =
    'w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-300';

  if (skill.kind === 'cursor') {
    return (
      <svg viewBox="0 0 24 24" className={wrapClass} fill="#F2F2F2" aria-hidden="true">
        <path d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23" />
      </svg>
    );
  }

  if (skill.kind === 'claude') {
    return (
      <svg viewBox="0 0 24 24" className={wrapClass} fill="#D97757" aria-hidden="true">
        <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
      </svg>
    );
  }

  if (skill.kind === 'gemini') {
    return (
      <svg viewBox="0 0 24 24" className={wrapClass} aria-hidden="true">
        <defs>
          <linearGradient id="gemini-grad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#4B90FF" />
            <stop offset="0.5" stopColor="#9B72CB" />
            <stop offset="1" stopColor="#D96570" />
          </linearGradient>
        </defs>
        <path
          fill="url(#gemini-grad)"
          d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"
        />
      </svg>
    );
  }

  if (skill.kind === 'perplexity') {
    return (
      <svg viewBox="0 0 24 24" className={wrapClass} fill="#1FB8CD" aria-hidden="true">
        <path d="M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z" />
      </svg>
    );
  }

  return (
    <img
      alt={skill.name}
      width="56"
      height="56"
      className={wrapClass}
      src={skill.src}
    />
  );
}

export default function Skills() {
  return (
    <div
      id="skills"
      className="bg-[#1e2024] w-full flex items-center justify-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-6xl mx-auto text-center">
        <div className="reveal">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
            <span className="bg-gradient-to-r from-[#FF8D5E] to-[#FF6B6B] bg-clip-text text-transparent">
              Working
            </span>{' '}
            <span className="text-white">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#FF8D5E] to-[#FF6B6B] rounded-full mb-6 mx-auto" />
          <p className="text-gray-400 text-base md:text-lg mb-16 max-w-md mx-auto">
            The skills, tools and technologies I am really good at.
          </p>
        </div>
        <div
          className="grid max-w-6xl mx-auto gap-4 sm:gap-6"
          id="skill-list"
          style={{ gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}
        >
          {SKILLS.map((skill) => (
            <div key={skill.name} className="group relative reveal from-scale">
              <div className="relative p-[1px] rounded-xl bg-gradient-to-br from-white/10 to-white/5 hover:from-[#FF8D5E]/50 hover:to-[#FF6B6B]/50 transition-all duration-300">
                <div className="flex flex-col items-center space-y-3 sm:space-y-4 bg-[#1e2024] p-4 sm:p-5 w-full rounded-xl">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-gradient-to-r from-[#FF8D5E] to-[#FF6B6B] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center">
                    <SkillVisual skill={skill} />
                  </div>
                  <h3 className="text-gray-400 text-xs md:text-sm font-medium group-hover:bg-gradient-to-r group-hover:from-[#FF8D5E] group-hover:to-[#FF6B6B] group-hover:bg-clip-text group-hover:text-transparent transition-colors duration-300">
                    {skill.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}