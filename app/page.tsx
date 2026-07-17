"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Leaf, Pencil, Shovel, Sun, Layers, TreePine, Lightbulb, ClipboardCheck, Phone, Mail, MapPin, Star, ArrowRight, Menu, X } from "lucide-react";
import ScrollExpandMedia from "./components/ScrollExpandMedia";
import { NavigationProvider, useNavigation } from "./components/NavigationContext";

const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function VineLine({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [grown, setGrown] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setGrown(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={"relative h-px overflow-hidden " + className} style={{ backgroundColor: dark ? "rgba(247,244,239,0.15)" : "#E8E0D0" }}>
      <div style={{ position: "absolute", inset: 0, backgroundColor: dark ? "#C4A882" : "#4A6741", width: grown ? "100%" : "0%", transition: "width 1.4s cubic-bezier(0.22,1,0.36,1)", transformOrigin: "left" }} />
    </div>
  );
}

const S = {
  inner: { maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(1.5rem,5vw,4rem)", width: "100%", boxSizing: "border-box" as const },
  section: (bg: string) => ({ backgroundColor: bg, padding: "clamp(4rem,8vw,8rem) 0", width: "100%" }),
  eyebrow: { fontFamily: "Cormorant Garamond,Georgia,serif", fontStyle: "italic" as const, color: "#4A6741", fontSize: "1.05rem", letterSpacing: "0.15em", marginBottom: "0.75rem", display: "block" },
  eyebrowGold: { fontFamily: "Cormorant Garamond,Georgia,serif", fontStyle: "italic" as const, color: "#C4A882", fontSize: "1.05rem", letterSpacing: "0.15em", marginBottom: "0.75rem", display: "block" },
  h2Dark: { fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "clamp(2rem,4vw,3.5rem)", lineHeight: 1.12, color: "#1C2B1A", margin: "0 0 2rem" },
  h2Light: { fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "clamp(2rem,4vw,3.5rem)", lineHeight: 1.12, color: "#F7F4EF", margin: "0 0 2rem" },
  body: { fontFamily: "Inter,system-ui,sans-serif", color: "#8C8476", lineHeight: 1.75, fontSize: "0.95rem" },
  bodyLight: { fontFamily: "Inter,system-ui,sans-serif", color: "rgba(247,244,239,0.65)", lineHeight: 1.75, fontSize: "0.95rem" },
};

// ── Nav — utilise navigateTo au lieu de liens href ─────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { navigateTo } = useNavigation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { id: "presentation", label: "L'Atelier" },
    { id: "realisations", label: "Réalisations" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
  ];

  const handleNav = (id: string) => {
    setOpen(false);
    navigateTo(id);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      backgroundColor: scrolled ? "rgba(247,244,239,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.07)" : "none",
      transition: "all 0.5s ease",
    }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(1.5rem,5vw,4rem)", display: "flex", alignItems: "center", justifyContent: "space-between", height: "5rem" }}>
        <button onClick={() => handleNav("presentation")} style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "none", border: "none", cursor: "pointer" }}>
          <Image src="/logo.png" alt="Entre Ciel et Vert" width={46} height={46} style={{ borderRadius: "50%" }} />
          <div className="hide-xs">
            <p style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: scrolled ? "#1C2B1A" : "#F7F4EF", margin: 0 }}>Entre Ciel et Vert</p>
            <p style={{ fontFamily: "Inter,system-ui,sans-serif", fontSize: "0.68rem", letterSpacing: "0.14em", color: scrolled ? "#8C8476" : "rgba(247,244,239,0.7)", margin: 0 }}>Architecte Paysagiste</p>
          </div>
        </button>

        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {links.map(l => (
            <button key={l.id} onClick={() => handleNav(l.id)}
              style={{ fontFamily: "Inter,system-ui,sans-serif", fontSize: "0.8rem", letterSpacing: "0.09em", color: scrolled ? "#1C2B1A" : "rgba(247,244,239,0.9)", background: "none", border: "none", cursor: "pointer", padding: 0, transition: "color 0.3s" }}>
              {l.label}
            </button>
          ))}
          <button onClick={() => handleNav("contact")}
            style={{ marginLeft: "0.5rem", padding: "0.6rem 1.5rem", backgroundColor: "#4A6741", color: "#F7F4EF", fontFamily: "Inter,system-ui,sans-serif", fontSize: "0.8rem", letterSpacing: "0.09em", border: "none", cursor: "pointer", transition: "background 0.3s" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#1C2B1A")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#4A6741")}>
            Devis gratuit
          </button>
        </div>

        <button className="mobile-menu-btn" onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", color: scrolled ? "#1C2B1A" : "#F7F4EF", display: "none" }}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div style={{ backgroundColor: "rgba(247,244,239,0.99)", borderTop: "1px solid #E8E0D0" }}>
          {links.map(l => (
            <button key={l.id} onClick={() => handleNav(l.id)}
              style={{ display: "block", width: "100%", textAlign: "left", padding: "1rem 2rem", fontFamily: "Inter,system-ui,sans-serif", fontSize: "0.88rem", color: "#1C2B1A", background: "none", border: "none", borderBottom: "1px solid #E8E0D0", cursor: "pointer" }}>
              {l.label}
            </button>
          ))}
          <div style={{ padding: "1.25rem 2rem" }}>
            <button onClick={() => handleNav("contact")}
              style={{ display: "block", width: "100%", padding: "0.8rem", backgroundColor: "#4A6741", color: "#F7F4EF", fontFamily: "Inter,system-ui,sans-serif", fontSize: "0.88rem", border: "none", cursor: "pointer" }}>
              Demander un devis gratuit
            </button>
          </div>
        </div>
      )}
      <style>{`
        @media (max-width: 768px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: flex !important; } .hide-xs { display: none; } }
        @media (min-width: 769px) { .mobile-menu-btn { display: none !important; } }
      `}</style>
    </nav>
  );
}

function Stats() {
  const items = [
    { value: "20+", label: "années d'expérience" },
    { value: "300+", label: "jardins réalisés" },
    { value: "100%", label: "projets sur mesure" },
    { value: "Île-de-France", label: "& région parisienne" },
  ];
  return (
    <section style={{ ...S.section("#1C2B1A"), padding: "4rem 0" }}>
      <div style={{ ...S.inner, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "2rem", textAlign: "center" }}>
        {items.map((item, i) => (
          <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
            <p style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#C4A882", marginBottom: "0.25rem" }}>{item.value}</p>
            <p style={{ fontFamily: "Inter,system-ui,sans-serif", fontSize: "0.7rem", color: "rgba(247,244,239,0.5)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Presentation() {
  return (
    <section id="presentation" style={S.section("#F7F4EF")}>
      <div style={S.inner}>
        <div className="pres-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem,6vw,6rem)", alignItems: "center" }}>
          <div>
            <span className="reveal" style={S.eyebrow}>L'Atelier</span>
            <h2 className="reveal" style={S.h2Dark}>Un regard singulier<br /><em style={{ fontWeight: 300 }}>sur le vivant.</em></h2>
            <VineLine className="reveal" />
            <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {[
                "Entre Ciel et Vert est né d'une conviction simple : un jardin réussi n'est pas une collection de plantes, c'est un dialogue entre un lieu, une lumière et ceux qui l'habitent.",
                "Alexandre Phelip y consacre depuis plus de vingt ans un regard à la fois technique et sensible. Formé aux grandes traditions de l'architecture paysagère française, il conçoit chaque projet comme une partition vivante — rigoureuse dans sa structure, généreuse dans ses détails.",
                "De la première esquisse à la réception du chantier, vous êtes accompagné à chaque étape, avec une seule exigence : que le résultat vous ressemble."
              ].map((t, i) => <p key={i} className={`reveal reveal-delay-${i + 1}`} style={S.body}>{t}</p>)}
            </div>
          </div>
          <div className="reveal" style={{ position: "relative" }}>
            <div style={{ position: "relative", aspectRatio: "3/4", maxWidth: "400px", marginLeft: "auto" }}>
              <Image src="/alexandre.png" alt="Alexandre Phelip" fill style={{ objectFit: "cover", objectPosition: "top", filter: "grayscale(100%)", transition: "filter 0.7s" }}
                onMouseEnter={e => (e.currentTarget.style.filter = "grayscale(0%)")}
                onMouseLeave={e => (e.currentTarget.style.filter = "grayscale(100%)")} />
              <div style={{ position: "absolute", bottom: "-1.5rem", right: "-1.5rem", width: "75%", height: "75%", border: "1px solid rgba(74,103,65,0.3)", zIndex: -1 }} />
            </div>
            <div style={{ position: "absolute", bottom: "-1rem", left: 0, backgroundColor: "#1C2B1A", padding: "1.25rem 1.75rem", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
              <p style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontStyle: "italic", color: "#C4A882", fontSize: "1.15rem", margin: 0 }}>Alexandre Phelip</p>
              <p style={{ fontFamily: "Inter,system-ui,sans-serif", color: "rgba(247,244,239,0.6)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", margin: "0.2rem 0 0" }}>Architecte Paysagiste</p>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .pres-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

const projets = [
  { img: "/paysagiste.jpg", cat: "Jardin contemporain", title: "Villa privée, Versailles", desc: "Remodelage complet d'un parc — pelouses modelées, allées minérales et topiaires majestueux.", big: true },
  { img: "/entretien-1.jpg", cat: "Parc historique", title: "Domaine classé, Seine-et-Marne", desc: "Restauration d'un jardin à la française autour d'un château du XVIIe siècle.", big: false },
  { img: "/entretien.jpg", cat: "Aménagement extérieur", title: "Résidence, Neuilly", desc: "Jardin d'allée avec topiaires en if et bordures fleuries.", big: false },
  { img: "/paysagiste-1.jpg", cat: "Jardin naturel", title: "Propriété, Essonne", desc: "Jardin en courbes douces, masses végétales libres et cheminements en stabilisé.", big: false },
  { img: "/entretien-2.jpg", cat: "Jardin à l'anglaise", title: "Domaine, Normandie", desc: "Allée de tilleuls conduisant à une rotonde — symétrie classique et intemporelle.", big: false },
];

function Realisations() {
  return (
    <section id="realisations" style={S.section("#E8E0D0")}>
      <div style={S.inner}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="reveal" style={S.eyebrow}>Réalisations</span>
          <h2 className="reveal" style={{ ...S.h2Dark, margin: "0 auto 0" }}>Des jardins qui <em style={{ fontWeight: 300 }}>traversent le temps.</em></h2>
        </div>
        <VineLine className="reveal" />
        <div style={{ marginTop: "3rem", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }} className="gallery-grid">
          {projets.map((p, i) => (
            <div key={i} className="reveal gallery-item" style={{ position: "relative", overflow: "hidden", cursor: "pointer", gridColumn: i === 0 ? "1 / 3" : undefined, aspectRatio: i === 0 ? "16/9" : "4/5", transitionDelay: `${i * 0.08}s` }}>
              <Image src={p.img} alt={p.title} fill style={{ objectFit: "cover", transition: "transform 0.7s" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(28,43,26,0.85) 0%,transparent 60%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "1.5rem" }}>
                <p style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontStyle: "italic", color: "#C4A882", fontSize: "0.85rem", marginBottom: "0.25rem" }}>{p.cat}</p>
                <p style={{ fontFamily: "Cormorant Garamond,Georgia,serif", color: "#F7F4EF", fontSize: "1.2rem", marginBottom: "0.4rem" }}>{p.title}</p>
                <p style={{ fontFamily: "Inter,system-ui,sans-serif", color: "rgba(247,244,239,0.7)", fontSize: "0.8rem", lineHeight: 1.5 }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .gallery-grid { grid-template-columns: 1fr !important; } .gallery-item { grid-column: 1 !important; aspect-ratio: 16/9 !important; } }
      `}</style>
    </section>
  );
}

const services = [
  { icon: Pencil, title: "Conception paysagère", desc: "Étude de site, esquisses, plans définitifs. Chaque jardin commence par une vision partagée." },
  { icon: TreePine, title: "Création de jardins", desc: "Réalisation complète avec des essences sélectionnées pour leur longévité et leur beauté." },
  { icon: Layers, title: "Aménagement de terrasses", desc: "Dallages en pierre naturelle, bois exotiques, pergolas — des espaces pensés pour vivre." },
  { icon: Shovel, title: "Plantations", desc: "Sélection rigoureuse des végétaux adaptés à votre sol, votre exposition et vos envies." },
  { icon: Sun, title: "Maçonnerie paysagère", desc: "Murs en pierre sèche, murets, escaliers et bassins — l'art de minéraliser un jardin." },
  { icon: Lightbulb, title: "Éclairage extérieur", desc: "Mise en lumière subtile pour prolonger la vie du jardin après le coucher du soleil." },
  { icon: ClipboardCheck, title: "Suivi de chantier", desc: "Coordination des entreprises, contrôle qualité et réception. Vous n'avez rien à gérer." },
  { icon: Leaf, title: "Entretien paysager", desc: "Programmes annuels pour que votre jardin reste aussi beau qu'au premier jour." },
];

function Services() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section id="services" style={{ backgroundColor: "#F7F4EF", width: "100%", overflow: "hidden" }}>
      <div className="services-split" style={{ display: "grid", gridTemplateColumns: "42% 58%", minHeight: "100vh" }}>
        <div style={{ position: "relative", minHeight: "600px" }}>
          <Image src="/planter.jpg" alt="Plantation soignée" fill style={{ objectFit: "cover", objectPosition: "center 35%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,transparent 75%,rgba(247,244,239,0.12) 100%)" }} />
        </div>
        <div style={{ backgroundColor: "#F7F4EF", padding: "clamp(3rem,6vw,6rem) clamp(2rem,5vw,5rem)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span className="reveal" style={S.eyebrow}>Nos prestations</span>
          <h2 className="reveal" style={S.h2Dark}>De l'esquisse <em style={{ fontWeight: 300 }}>à l'entretien.</em></h2>
          <p className="reveal" style={{ ...S.body, marginBottom: "2rem" }}>Une offre complète pour accompagner votre projet de bout en bout, avec la même exigence à chaque étape.</p>
          <VineLine className="reveal" />
          <div className="services-grid" style={{ marginTop: "1.75rem", display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1px", backgroundColor: "#E8E0D0" }}>
            {services.map((s, i) => {
              const Icon = s.icon;
              const isHov = hovered === i;
              return (
                <div key={i} className="reveal" onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                  style={{ backgroundColor: isHov ? "#1C2B1A" : "#F7F4EF", padding: "1.4rem", transition: "background 0.4s", transitionDelay: `${i * 0.05}s` }}>
                  <div style={{ width: "2rem", height: "2rem", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: isHov ? "rgba(74,103,65,0.3)" : "#E8E0D0", borderRadius: "50%", marginBottom: "0.8rem", transition: "background 0.4s" }}>
                    <Icon size={14} style={{ color: isHov ? "#C4A882" : "#4A6741", transition: "color 0.4s" }} />
                  </div>
                  <h3 style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "1.05rem", color: isHov ? "#F7F4EF" : "#1C2B1A", marginBottom: "0.4rem", transition: "color 0.4s" }}>{s.title}</h3>
                  <p style={{ fontFamily: "Inter,system-ui,sans-serif", fontSize: "0.75rem", color: isHov ? "rgba(247,244,239,0.65)" : "#8C8476", lineHeight: 1.6, transition: "color 0.4s" }}>{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .services-split { grid-template-columns: 1fr !important; min-height: auto !important; } }
        @media (max-width: 600px) { .services-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

const atouts = [
  { num: "01", title: "Écoute & dialogue", desc: "Chaque projet commence par vous. Votre mode de vie, vos usages, vos désirs — nous les traduisons en espace." },
  { num: "02", title: "Expertise technique", desc: "Maîtrise des sols, des essences, des contraintes climatiques et réglementaires. Rien n'est laissé au hasard." },
  { num: "03", title: "Matériaux nobles", desc: "Pierre naturelle, bois de qualité, végétaux sélectionnés chez les meilleurs pépiniéristes français et européens." },
  { num: "04", title: "Finitions haut de gamme", desc: "Du détail de maçonnerie à la plante de rebord, chaque élément est soigné avec la même rigueur." },
  { num: "05", title: "Respect du vivant", desc: "Gestion raisonnée de l'eau, végétaux adaptés au milieu, sol vivant — nos jardins sont beaux et durables." },
  { num: "06", title: "Accompagnement total", desc: "De la conception à la livraison et au-delà, vous avez un interlocuteur unique pour tout votre projet." },
];

function Pourquoi() {
  return (
    <section style={{ backgroundColor: "#1C2B1A", width: "100%", overflow: "hidden" }}>
      <div className="pourquoi-split" style={{ display: "grid", gridTemplateColumns: "58% 42%", minHeight: "100vh" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(3rem,6vw,6rem) clamp(2rem,5vw,5rem) clamp(3rem,6vw,6rem) clamp(1.5rem,8vw,7rem)" }}>
          <span className="reveal" style={S.eyebrowGold}>Notre engagement</span>
          <h2 className="reveal" style={{ ...S.h2Light, marginBottom: "1.5rem" }}>Pourquoi choisir<br /><em style={{ fontWeight: 300, color: "#C4A882" }}>Entre Ciel et Vert ?</em></h2>
          <VineLine className="reveal" dark />
          <p className="reveal" style={{ ...S.bodyLight, marginTop: "1.5rem", marginBottom: "3rem" }}>
            Un jardin vivant exige bien plus qu'un coup de bêche. Il demande une vision, une méthode et une présence continue — c'est ce que nous vous offrons, du premier rendez-vous à la dernière taille.
          </p>
          <div className="atouts-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "clamp(1.25rem,3vw,2.5rem)" }}>
            {atouts.map((a, i) => (
              <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <p style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "2.4rem", color: "#4A6741", marginBottom: "0.5rem" }}>{a.num}</p>
                <h3 style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "1.2rem", color: "#F7F4EF", marginBottom: "0.5rem" }}>{a.title}</h3>
                <p style={{ fontFamily: "Inter,system-ui,sans-serif", fontSize: "0.8rem", color: "rgba(247,244,239,0.5)", lineHeight: 1.65 }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "relative", minHeight: "600px" }}>
          <Image src="/client.jpg" alt="Client dans son jardin" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left,transparent 65%,rgba(28,43,26,0.5) 100%)" }} />
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .pourquoi-split { grid-template-columns: 1fr !important; min-height: auto !important; } .atouts-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 480px) { .atouts-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function CtaMiddle() {
  return (
    <section style={{ position: "relative", padding: "7rem 0", overflow: "hidden", width: "100%" }}>
      <Image src="/paysagiste.jpg" alt="Jardin" fill style={{ objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(28,43,26,0.82)" }} />
      <div style={{ position: "relative", zIndex: 10, ...S.inner, textAlign: "center" }}>
        <div style={{ maxWidth: "44rem", margin: "0 auto" }}>
          <span className="reveal" style={S.eyebrowGold}>Votre projet mérite mieux qu'un catalogue</span>
          <h2 className="reveal" style={{ ...S.h2Light, fontSize: "clamp(2.2rem,5vw,4rem)" }}>Donnez vie à votre jardin.</h2>
          <p className="reveal reveal-delay-1" style={{ ...S.bodyLight, marginBottom: "2.5rem", color: "rgba(247,244,239,0.75)" }}>
            Discutons ensemble de votre projet paysager. Un premier échange, gratuit et sans engagement, suffit souvent pour tout changer.
          </p>
          <CtaButton />
        </div>
      </div>
    </section>
  );
}

function CtaButton() {
  const { navigateTo } = useNavigation();
  return (
    <button onClick={() => navigateTo("contact")} className="reveal reveal-delay-2"
      style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "1rem 2.5rem", backgroundColor: "#C4A882", color: "#1C2B1A", fontFamily: "Inter,system-ui,sans-serif", fontSize: "0.85rem", letterSpacing: "0.1em", border: "none", cursor: "pointer" }}>
      Demander un devis gratuit <ArrowRight size={14} />
    </button>
  );
}

const temoignages = [
  { name: "Sophie & Bertrand M.", lieu: "Versailles", texte: "Alexandre a transformé notre terrain en friche en un jardin de toute beauté. Il a su capter nos envies dès le premier rendez-vous. Le résultat dépasse tout ce que nous imaginions." },
  { name: "Nathalie R.", lieu: "Neuilly-sur-Seine", texte: "Un professionnel exceptionnel. Ponctuel, à l'écoute et d'une exigence rare. Ma terrasse est méconnaissable. Je recommande les yeux fermés." },
  { name: "Famille Dumont", lieu: "Fontainebleau", texte: "Nous avons confié à Alexandre la restauration d'un jardin à la française. Le travail est d'une précision et d'une élégance remarquables." },
  { name: "Pierre-Alain K.", lieu: "Rueil-Malmaison", texte: "Projet livré dans les délais, budget respecté, équipes sérieuses. Un jardin qui a fait l'admiration de tous nos voisins dès la première saison." },
];

function Temoignages() {
  return (
    <section style={S.section("#E8E0D0")}>
      <div style={S.inner}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="reveal" style={S.eyebrow}>Témoignages</span>
          <h2 className="reveal" style={{ ...S.h2Dark, margin: "0 auto 0" }}>Ce que disent <em style={{ fontWeight: 300 }}>nos clients.</em></h2>
        </div>
        <VineLine className="reveal" />
        <div className="temo-grid" style={{ marginTop: "3rem", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.25rem" }}>
          {temoignages.map((t, i) => (
            <div key={i} className="reveal" style={{ backgroundColor: "#F7F4EF", padding: "2rem", display: "flex", flexDirection: "column", transitionDelay: `${i * 0.1}s` }}>
              <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1.25rem" }}>
                {[1,2,3,4,5].map(j => <Star key={j} size={13} style={{ fill: "#C4A882", color: "#C4A882" }} />)}
              </div>
              <p style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontStyle: "italic", color: "#1C2B1A", fontSize: "1.05rem", lineHeight: 1.6, flex: 1, marginBottom: "1.5rem" }}>&ldquo;{t.texte}&rdquo;</p>
              <div style={{ borderTop: "1px solid #E8E0D0", paddingTop: "1rem" }}>
                <p style={{ fontFamily: "Inter,system-ui,sans-serif", fontSize: "0.85rem", fontWeight: 500, color: "#1C2B1A", margin: 0 }}>{t.name}</p>
                <p style={{ fontFamily: "Inter,system-ui,sans-serif", fontSize: "0.7rem", color: "#8C8476", letterSpacing: "0.1em", margin: "0.2rem 0 0" }}>{t.lieu}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .temo-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 480px) { .temo-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ nom: "", email: "", tel: "", projet: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <section id="contact" style={S.section("#F7F4EF")}>
      <div style={S.inner}>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem,6vw,6rem)", alignItems: "start" }}>
          <div>
            <span className="reveal" style={S.eyebrow}>Contact</span>
            <h2 className="reveal" style={S.h2Dark}>Parlons de<br /><em style={{ fontWeight: 300 }}>votre jardin.</em></h2>
            <VineLine className="reveal" />
            <p className="reveal" style={{ ...S.body, marginTop: "1.5rem", marginBottom: "2.5rem" }}>
              Chaque projet commence par une conversation. Décrivez-nous votre espace, vos envies, votre calendrier — nous vous répondons sous 48 heures.
            </p>
            {[
              { Icon: Phone, label: "Téléphone", val: "+33 (0)1 XX XX XX XX" },
              { Icon: Mail, label: "Email", val: "contact@entrecielvert.fr" },
              { Icon: MapPin, label: "Zone d'intervention", val: "Île-de-France & région parisienne" },
            ].map(({ Icon, label, val }, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.4rem" }}>
                <div style={{ width: "2.5rem", height: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#E8E0D0", borderRadius: "50%", flexShrink: 0 }}>
                  <Icon size={15} style={{ color: "#4A6741" }} />
                </div>
                <div>
                  <p style={{ fontFamily: "Inter,system-ui,sans-serif", fontSize: "0.65rem", color: "#8C8476", letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 0.2rem" }}>{label}</p>
                  <p style={{ fontFamily: "Inter,system-ui,sans-serif", fontSize: "0.9rem", color: "#1C2B1A", margin: 0 }}>{val}</p>
                </div>
              </div>
            ))}
            <div className="reveal reveal-delay-4" style={{ display: "flex", gap: "0.75rem", marginTop: "2rem" }}>
              {[{ Icon: InstagramIcon, label: "Instagram" }, { Icon: FacebookIcon, label: "Facebook" }].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label} style={{ width: "2.5rem", height: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #E8E0D0", color: "#8C8476", textDecoration: "none", transition: "all 0.3s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#4A6741"; (e.currentTarget as HTMLElement).style.color = "#4A6741"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#E8E0D0"; (e.currentTarget as HTMLElement).style.color = "#8C8476"; }}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>
          <div className="reveal reveal-delay-2">
            {submitted ? (
              <div style={{ backgroundColor: "#1C2B1A", padding: "4rem 3rem", textAlign: "center", minHeight: "420px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <Leaf size={40} style={{ color: "#C4A882", marginBottom: "1.5rem" }} />
                <h3 style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "1.75rem", color: "#F7F4EF", marginBottom: "1rem" }}>Merci pour votre message.</h3>
                <p style={{ fontFamily: "Inter,system-ui,sans-serif", color: "rgba(247,244,239,0.65)", fontSize: "0.9rem", lineHeight: 1.7 }}>Alexandre Phelip vous contactera sous 48 heures pour échanger sur votre projet.</p>
              </div>
            ) : (
              <div style={{ backgroundColor: "#1C2B1A", padding: "clamp(2rem,4vw,3.5rem)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {[
                    { name: "nom", label: "Nom & prénom", type: "text", placeholder: "Jean Dupont" },
                    { name: "email", label: "Adresse email", type: "email", placeholder: "jean@email.com" },
                    { name: "tel", label: "Téléphone", type: "tel", placeholder: "+33 6 XX XX XX XX" },
                  ].map(f => (
                    <div key={f.name}>
                      <label style={{ display: "block", fontFamily: "Inter,system-ui,sans-serif", fontSize: "0.65rem", color: "rgba(247,244,239,0.5)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{f.label}</label>
                      <input type={f.type} name={f.name} value={form[f.name as keyof typeof form]} onChange={handleChange} placeholder={f.placeholder}
                        style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(247,244,239,0.2)", color: "#F7F4EF", fontFamily: "Inter,system-ui,sans-serif", fontSize: "0.9rem", padding: "0.75rem 0", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontFamily: "Inter,system-ui,sans-serif", fontSize: "0.65rem", color: "rgba(247,244,239,0.5)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Votre projet</label>
                    <textarea name="projet" value={form.projet} onChange={handleChange} rows={4} placeholder="Décrivez votre espace, vos envies, votre calendrier…"
                      style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(247,244,239,0.2)", color: "#F7F4EF", fontFamily: "Inter,system-ui,sans-serif", fontSize: "0.9rem", padding: "0.75rem 0", outline: "none", resize: "none", boxSizing: "border-box" }} />
                  </div>
                </div>
                <button onClick={() => setSubmitted(true)}
                  style={{ marginTop: "2rem", width: "100%", padding: "1rem", backgroundColor: "#4A6741", color: "#F7F4EF", fontFamily: "Inter,system-ui,sans-serif", fontSize: "0.85rem", letterSpacing: "0.1em", border: "none", cursor: "pointer", transition: "background 0.3s" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#C4A882")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#4A6741")}>
                  Envoyer ma demande
                </button>
                <p style={{ marginTop: "1rem", textAlign: "center", fontFamily: "Inter,system-ui,sans-serif", fontSize: "0.7rem", color: "rgba(247,244,239,0.35)" }}>
                  Réponse garantie sous 48h · Devis gratuit & sans engagement
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; gap: 2rem !important; } }`}</style>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ backgroundColor: "#1C2B1A", borderTop: "1px solid rgba(247,244,239,0.08)", padding: "2.5rem 0" }}>
      <div style={{ ...S.inner, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Image src="/logo.png" alt="Entre Ciel et Vert" width={32} height={32} style={{ borderRadius: "50%", opacity: 0.7 }} />
          <div>
            <p style={{ fontFamily: "Cormorant Garamond,Georgia,serif", color: "rgba(247,244,239,0.7)", fontSize: "0.9rem", margin: 0 }}>Entre Ciel et Vert</p>
            <p style={{ fontFamily: "Inter,system-ui,sans-serif", color: "rgba(247,244,239,0.35)", fontSize: "0.65rem", letterSpacing: "0.15em", margin: 0 }}>Architecte Paysagiste</p>
          </div>
        </div>
        <p style={{ fontFamily: "Inter,system-ui,sans-serif", color: "rgba(247,244,239,0.25)", fontSize: "0.72rem" }}>
          © {new Date().getFullYear()} Entre Ciel et Vert — Tous droits réservés
        </p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Mentions légales", "Confidentialité"].map(l => (
            <a key={l} href="#" style={{ fontFamily: "Inter,system-ui,sans-serif", color: "rgba(247,244,239,0.3)", fontSize: "0.72rem", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function PageContent() {
  useReveal();
  return (
    <>
      <Nav />
      <main style={{ width: "100%", overflowX: "hidden" }}>
        <ScrollExpandMedia
          mediaSrc="/salarie.jpg"
          bgImageSrc="/paysagiste-2.jpg"
          title="Votre jardin, une œuvre vivante."
          scrollToExpand="Faire défiler pour découvrir"
        >
          <Stats />
          <Presentation />
          <Realisations />
          <Services />
          <Pourquoi />
          <CtaMiddle />
          <Temoignages />
          <Contact />
          <Footer />
        </ScrollExpandMedia>
      </main>
    </>
  );
}

export default function Home() {
  return (
    <NavigationProvider>
      <PageContent />
    </NavigationProvider>
  );
}
