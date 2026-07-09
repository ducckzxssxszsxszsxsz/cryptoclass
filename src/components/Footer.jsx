import React from "react";
import { Link } from "react-router-dom";
import { BarChart3, Hexagon, Shield } from "lucide-react";
import { t } from "../i18n";

const Footer = () => {
  return (
    <footer className="bg-kempat border-t border-tombol/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 text-base font-bold gradient-text">
              <BarChart3 className="w-4 h-4 text-tombol" />
              {t("nav.brand")}
            </Link>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed max-w-xs">{t("footer.desc")}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-tombol uppercase tracking-wider mb-4">{t("footer.menu")}</p>
            <ul className="space-y-2.5">
              {[{ to: "/", label: t("footer.home") }, { to: "/classview", label: t("footer.courses") }, { to: "/posting", label: t("footer.community") }].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-gray-500 hover:text-tombol transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-tombol uppercase tracking-wider mb-4">{t("footer.account")}</p>
            <ul className="space-y-2.5">
              <li><Link to="/login" className="text-sm text-gray-500 hover:text-tombol transition-colors">{t("footer.login")}</Link></li>
              <li><Link to="/register" className="text-sm text-gray-500 hover:text-tombol transition-colors">{t("footer.register")}</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-tombol uppercase tracking-wider mb-4">{t("footer.web3")}</p>
            <ul className="space-y-2.5">
              {[
                { icon: Hexagon, label: t("footer.metamask") },
                { icon: Shield, label: t("footer.cryptoPayments") },
                { icon: Hexagon, label: t("footer.onChainCert") },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-2 text-sm text-gray-500">
                  <item.icon className="w-3 h-3 text-tombol/50" /> {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-tombol/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} {t("footer.copyright")}</p>
          <span className="flex items-center gap-1.5 text-xs text-gray-600">
            <Hexagon className="w-3 h-3 text-tombol/50" /> {t("footer.tagline")}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;