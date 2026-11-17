import { useEffect, useMemo, useState } from 'react';
import {
  FILTERS,
  PAGE_SIZE,
  PROJECTS,
  getProjectBadge,
  projectMatchesFilter,
} from '../data/projects';
import { BehanceIcon, FigmaIcon, GlobeIcon, NextIcon, PrevIcon } from './icons';

const LINK_META = [
  { key: 'figma', label: 'Figma', Icon: FigmaIcon },
  { key: 'behance', label: 'Behance', Icon: BehanceIcon },
  { key: 'website', label: 'Website', Icon: GlobeIcon },
];

function resolveProjectLink(project, key) {
  if (key === 'website') {
    return project.links?.website || project.links?.app || project.links?.external || '';
  }
  return project.links?.[key] || '';
}

function openUrl(url) {
  if (!url) return;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function ProjectCard({ project, index, activeFilter }) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, [project.id]);

  const imgClass = [
    'w-full h-48 sm:h-56 md:h-72 object-cover group-hover:scale-105 transition-transform duration-700 ease-out',
    project.imagePosition || '',
  ]
    .filter(Boolean)
    .join(' ');

  const badge = getProjectBadge(project, activeFilter);

  return (
    <article
      className="group"
      role="article"
      aria-labelledby={`project-${project.id}-title`}
      style={{
        opacity: entered ? 1 : 0,
        transform: entered ? 'none' : 'translateY(30px)',
        transition: 'opacity .4s ease, transform .4s ease',
      }}
    >
      <div className="h-full p-[1px] rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] group-hover:from-[#FF8D5E]/40 group-hover:to-[#FF6B6B]/30 transition-all duration-500">
        <div className="h-full flex flex-col bg-[#1c1e22] rounded-2xl overflow-hidden">
          <div className="relative overflow-hidden">
            <img
              src={project.image}
              alt={`${project.title} - ${project.subtitle}`}
              width="600"
              height="400"
              className={imgClass}
              loading={index > 2 ? 'lazy' : undefined}
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider bg-black/50 backdrop-blur-md text-white/90 rounded-full border border-white/10">
                {badge}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <div className="flex items-center gap-3 translate-y-5 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                {LINK_META.map((meta) => {
                  const url = resolveProjectLink(project, meta.key);
                  if (!url) return null;
                  const Icon = meta.Icon;
                  return (
                    <button
                      key={meta.key}
                      type="button"
                      className="w-11 h-11 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full border border-white/15 hover:bg-gradient-to-br hover:from-[#FF8D5E] hover:to-[#FF6B6B] hover:border-transparent transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,141,94,0.35)]"
                      aria-label={`View ${project.title} on ${meta.label}`}
                      title={`View on ${meta.label}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        openUrl(url);
                      }}
                    >
                      <Icon />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="p-5 relative flex-1 flex flex-col">
            <div className="absolute top-0 left-5 right-5 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2
                  id={`project-${project.id}-title`}
                  className="text-lg font-bold text-white mb-1 truncate group-hover:bg-gradient-to-r group-hover:from-[#FF8D5E] group-hover:to-[#FF6B6B] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                >
                  {project.title}
                </h2>
                <p className="text-gray-500 text-sm font-medium">{project.subtitle}</p>
              </div>
            </div>
            {project.description ? (
              <p className="text-gray-600 text-sm mt-2 line-clamp-1">{project.description}</p>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState('All');
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => PROJECTS.filter((project) => projectMatchesFilter(project, filter)),
    [filter],
  );

  const pages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const safePage = page > pages ? pages : page;
  const start = (safePage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  useEffect(() => {
    if (page > pages) setPage(pages);
  }, [page, pages]);

  const filterClass = (name) => {
    const active = filter === name;
    return `px-5 md:px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative ${
      active
        ? 'bg-gradient-to-r from-[#FF8D5E] to-[#FF6B6B] !text-white shadow-[0_4px_20px_rgba(255,107,107,0.3)]'
        : 'bg-white/[0.03] text-gray-400 border border-white/[0.08] hover:text-white hover:bg-white/[0.06] hover:border-white/15'
    }`;
  };

  return (
    <div id="portfolio" className="min-h-screen bg-[#161618] text-white relative overflow-hidden">
      <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-gradient-to-br from-[#FF8D5E]/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-[#FF6B6B]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14 reveal">
          <span className="text-[#FF8D5E] text-sm font-semibold tracking-[0.3em] uppercase mb-3 block">
            My Recent Work
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
            Featured{' '}
            <span className="bg-gradient-to-r from-[#FF8D5E] to-[#FF6B6B] bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#FF8D5E] to-[#FF6B6B] rounded-full mx-auto mb-5" />
          <p className="text-gray-500 max-w-lg mx-auto text-base">
            A curated collection of my design work across web, mobile, gaming, and 3D
          </p>
        </div>
        <div id="filters" className="flex flex-wrap justify-center gap-2.5 mb-14">
          {FILTERS.map((name) => (
            <button
              key={name}
              type="button"
              className={filterClass(name)}
              aria-label={`Filter by ${name}`}
              data-filter={name}
              onClick={() => {
                setFilter(name);
                setPage(1);
              }}
            >
              {name}
            </button>
          ))}
        </div>
        <div id="project-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {visible.map((project, index) => (
            <ProjectCard
              key={`${project.id}-${safePage}-${filter}`}
              project={project}
              index={index}
              activeFilter={filter}
            />
          ))}
        </div>
        <div
          id="pagination"
          className={`flex items-center justify-center${filtered.length > PAGE_SIZE ? ' mt-14' : ''}`}
        >
          {filtered.length > PAGE_SIZE ? (
            <div className="flex items-center gap-4 sm:gap-5">
              <button
                type="button"
                aria-label="Previous page"
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 text-gray-400 hover:bg-white/[0.08] hover:text-white hover:border-[#FF8D5E]/35 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/[0.04] disabled:hover:border-white/10 disabled:hover:text-gray-400 transition-all duration-300"
                disabled={safePage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <PrevIcon />
              </button>

              <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
                {Array.from({ length: pages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    aria-label={`Go to page ${pageNum}`}
                    aria-current={pageNum === safePage ? 'page' : undefined}
                    className={`w-11 h-11 flex items-center justify-center rounded-xl font-medium text-sm transition-all duration-300 ${
                      pageNum === safePage
                        ? 'bg-gradient-to-r from-[#FF8D5E] to-[#FF6B6B] !text-white shadow-[0_4px_18px_rgba(255,107,107,0.35)] scale-[1.02]'
                        : 'bg-transparent text-gray-400 border border-transparent hover:bg-white/[0.06] hover:text-white hover:border-white/10'
                    }`}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                type="button"
                aria-label="Next page"
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 text-gray-400 hover:bg-white/[0.08] hover:text-white hover:border-[#FF8D5E]/35 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/[0.04] disabled:hover:border-white/10 disabled:hover:text-gray-400 transition-all duration-300"
                disabled={safePage === pages}
                onClick={() => setPage((p) => Math.min(pages, p + 1))}
              >
                <NextIcon />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}