export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[rgba(0,0,0,0.3)] backdrop-blur-md py-8 mt-32">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-400">
        
        {/* Copyright */}
        <p className="text-center md:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="text-[#A1E077] font-semibold tracking-wide">
            AstroView
          </span>
          . All rights reserved.
        </p>

        {/* Links adicionais */}
        <div className="flex gap-6">
          <a
            href="/privacy"
            className="hover:text-[#A1E077] transition-colors duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="hover:text-[#A1E077] transition-colors duration-300"
          >
            Terms of Use
          </a>
          <a
            href="/contact"
            className="hover:text-[#A1E077] transition-colors duration-300"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
