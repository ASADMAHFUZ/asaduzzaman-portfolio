export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer relative overflow-hidden">
      <section className="footer-brand relative">
        <button
          id="back-to-top"
          type="button"
          className="footer-top-btn"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src="/images/footer/arrow-up.svg"
            alt=""
            width="20"
            height="20"
            className="footer-top-arrow"
          />
        </button>
        <h2 className="footer-mega-name select-none" aria-hidden="true">
          ASADUJJAMAN
        </h2>
        <div className="footer-brand-fade" aria-hidden="true" />
      </section>

      <div className="footer-copy-bar">
        <p>
          © All rights reserved by Asadujjaman Mahfuz{' '}
          <span id="year" className="sr-only">
            {year}
          </span>
        </p>
      </div>
    </footer>
  );
}