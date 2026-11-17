import { SERVICES } from '../data/services';
import { SERVICE_ICONS } from './icons';

export default function About() {
  return (
    <div id="about" className="bg-[#1a1d21] w-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#FF8D5E]/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#FF6B6B]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="w-full max-w-7xl mx-auto py-24 px-6 sm:px-8 lg:px-8 relative z-10">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-16">
            {SERVICES.map((service) => {
              const Icon = SERVICE_ICONS[service.icon];
              return (
                <div key={service.title} className="service-card group relative reveal from-scale h-full">
                  <div className="p-[1px] rounded-2xl bg-gradient-to-br from-white/10 to-white/5 group-hover:from-[#FF8D5E]/50 group-hover:to-[#FF6B6B]/50 transition-all duration-500 h-full">
                    <div className="bg-[#1a1c1e] rounded-2xl p-6 h-full text-center relative overflow-hidden flex flex-col">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-[#FF8D5E] to-[#FF6B6B] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#FF8D5E]/10 to-[#FF6B6B]/10 flex items-center justify-center group-hover:from-[#FF8D5E]/20 group-hover:to-[#FF6B6B]/20 transition-all duration-300">
                        {Icon ? <Icon /> : null}
                      </div>
                      <h4 className="text-white font-semibold text-base mb-2 group-hover:bg-gradient-to-r group-hover:from-[#FF8D5E] group-hover:to-[#FF6B6B] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {service.title}
                      </h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}