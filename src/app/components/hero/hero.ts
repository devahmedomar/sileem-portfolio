import {
  Component, OnDestroy, PLATFORM_ID,
  afterNextRender, inject, NgZone
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <!-- Hero Section -->
    <section id="home"
             style="position:relative;min-height:100vh;display:flex;
                    align-items:center;overflow:hidden;
                    background-color:var(--bg-primary);">

      <!-- CSS decorative background -->
      <div class="hero-bg-pattern" style="z-index:0;"></div>

      <!-- Thin gold vertical accent line -->
      <div style="position:absolute;left:0;top:0;bottom:0;width:3px;z-index:1;
                  background:linear-gradient(to bottom,transparent 5%,var(--accent-gold) 40%,var(--accent-gold-light) 60%,transparent 95%);
                  opacity:.35;">
      </div>

      <!-- Bottom fade into next section -->
      <div style="position:absolute;bottom:0;left:0;right:0;height:180px;
                  background:linear-gradient(to bottom,transparent,var(--bg-primary));
                  pointer-events:none;z-index:2;">
      </div>

      <div class="site-container" style="position:relative;z-index:3;padding-top:6rem;padding-bottom:4rem;">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <!-- LEFT: text content -->
          <div>

            <!-- Pre-title with gold line -->
            <div class="hero-pretitle flex items-center gap-3 mb-6" style="opacity:0;">
              <div class="gold-divider"></div>
              <p class="section-label">IT Infrastructure Section Head</p>
            </div>

            <!-- Name -->
            <h1 class="hero-name serif font-black leading-none mb-5"
                style="font-size:clamp(3rem,7vw,5.5rem);opacity:0;">
              <span class="block" style="color:var(--text-primary);">Mohamed</span>
              <span class="block gradient-text">Sileem</span>
            </h1>

            <!-- Typewriter row -->
            <div class="hero-title flex items-center gap-2 mb-7"
                 style="font-size:clamp(1rem,2.2vw,1.3rem);opacity:0;color:var(--text-secondary);">
              <span class="typewriter-text" style="font-weight:500;min-width:2ch;">&nbsp;</span>
              <span class="typewriter-cursor" style="color:var(--accent-gold);font-weight:300;">|</span>
            </div>

            <!-- Bio -->
            <p class="hero-desc leading-relaxed mb-10 max-w-xl"
               style="color:var(--text-secondary);font-size:1.05rem;opacity:0;">
              Over <span style="color:var(--text-primary);font-weight:600;">15 years</span> leading enterprise
              IT infrastructure at Wadi El Nile Cement — from Cisco network design and Fortinet security
              deployments to SAP administration and data center virtualization. Holder of
              <span style="color:var(--accent-gold);font-weight:600;">17+ industry certifications</span>.
            </p>

            <!-- CTAs -->
            <div class="hero-cta flex flex-wrap gap-4" style="opacity:0;">
              <a href="#contact"
                 class="inline-flex items-center gap-2 rounded-lg font-semibold text-sm
                        transition-all duration-300"
                 style="padding:1rem 2.5rem;background:linear-gradient(135deg,#c9a84c,#e8c56a);
                        color:#09090c;box-shadow:0 0 0 rgba(201,168,76,0);"
                 onmouseover="this.style.transform='scale(1.04)';this.style.boxShadow='0 0 28px rgba(201,168,76,.4)'"
                 onmouseout="this.style.transform='scale(1)';this.style.boxShadow='0 0 0 rgba(201,168,76,0)'">
                Get in Touch
              </a>
              <a href="#experience"
                 class="inline-flex items-center gap-2 rounded-lg font-semibold text-sm
                        transition-all duration-300 glass"
                 style="padding:1rem 2.5rem;color:var(--accent-gold);
                        border:1px solid rgba(201,168,76,.35);"
                 onmouseover="this.style.background='rgba(201,168,76,.07)'"
                 onmouseout="this.style.background='var(--bg-card)'">
                View Experience
              </a>
            </div>

          </div>

          <!-- RIGHT: magazine cover photo -->
          <div class="hero-photo-wrap hidden md:flex justify-center items-center"
               style="opacity:0;">

            <div style="position:relative;width:100%;max-width:400px;">

              <!-- Offset decorative rectangle behind (bottom-right) -->
              <div style="position:absolute;bottom:-14px;right:-14px;
                          width:100%;height:100%;border-radius:14px;
                          border:1px solid rgba(201,168,76,.2);
                          pointer-events:none;">
              </div>

              <!-- Ambient glow -->
              <div style="position:absolute;inset:-50px;
                          background:radial-gradient(circle at 60% 40%,rgba(201,168,76,.13) 0%,transparent 65%);
                          filter:blur(24px);pointer-events:none;
                          animation:photoPulse 6s ease-in-out infinite;">
              </div>

              <!-- Photo card -->
              <div style="position:relative;border-radius:12px;overflow:hidden;
                          height:clamp(440px,56vh,540px);
                          border:1px solid rgba(201,168,76,.28);
                          box-shadow:0 32px 80px rgba(0,0,0,.55);">

                <!-- Photo -->
                <img src="1625323066116.jfif" alt="Mohamed Sileem"
                     style="width:100%;height:100%;object-fit:cover;object-position:center 12%;">

                <!-- Dark gradient from bottom -->
                <div style="position:absolute;inset:0;
                            background:linear-gradient(to bottom,
                              transparent 38%,
                              rgba(9,9,12,.55) 65%,
                              rgba(9,9,12,.97) 100%);
                            pointer-events:none;">
                </div>

                <!-- Gold corner bracket — top left -->
                <div style="position:absolute;top:16px;left:16px;
                            width:28px;height:28px;pointer-events:none;
                            border-top:2px solid var(--accent-gold);
                            border-left:2px solid var(--accent-gold);">
                </div>
                <!-- Gold corner bracket — top right -->
                <div style="position:absolute;top:16px;right:16px;
                            width:28px;height:28px;pointer-events:none;
                            border-top:2px solid var(--accent-gold);
                            border-right:2px solid var(--accent-gold);">
                </div>

                <!-- Bottom content overlay -->
                <div style="position:absolute;bottom:0;left:0;right:0;padding:1.5rem 1.5rem 1.4rem;">

                  <!-- Status row -->
                  <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:1rem;">
                    <span style="width:7px;height:7px;border-radius:50%;flex-shrink:0;
                                 background:var(--accent-gold);display:inline-block;
                                 animation:statusPing 1.8s ease-out infinite;">
                    </span>
                    <span style="font-size:.68rem;font-weight:700;letter-spacing:.18em;
                                 text-transform:uppercase;color:var(--accent-gold);">
                      IT Infrastructure Section Head
                    </span>
                  </div>

                  <!-- Gold divider -->
                  <div style="height:1px;background:rgba(201,168,76,.3);margin-bottom:1rem;"></div>

                  <!-- Cert chips -->
                  <div style="display:flex;flex-wrap:wrap;gap:.45rem;">
                    <span style="font-size:.62rem;font-weight:700;letter-spacing:.07em;
                                 padding:.25rem .65rem;border-radius:5px;
                                 background:rgba(201,168,76,.15);color:var(--accent-gold);
                                 border:1px solid rgba(201,168,76,.32);">CCNA</span>
                    <span style="font-size:.62rem;font-weight:700;letter-spacing:.07em;
                                 padding:.25rem .65rem;border-radius:5px;
                                 background:rgba(168,197,218,.1);color:#a8c5da;
                                 border:1px solid rgba(168,197,218,.25);">MCSE 2012</span>
                    <span style="font-size:.62rem;font-weight:700;letter-spacing:.07em;
                                 padding:.25rem .65rem;border-radius:5px;
                                 background:rgba(192,168,112,.1);color:#c0a870;
                                 border:1px solid rgba(192,168,112,.25);">ITIL</span>
                    <span style="font-size:.62rem;font-weight:700;letter-spacing:.07em;
                                 padding:.25rem .65rem;border-radius:5px;
                                 background:rgba(232,124,62,.1);color:#e87c3e;
                                 border:1px solid rgba(232,124,62,.25);">Fortinet NSE</span>
                    <span style="font-size:.62rem;font-weight:700;letter-spacing:.07em;
                                 padding:.25rem .65rem;border-radius:5px;
                                 background:rgba(126,184,154,.1);color:#7eb89a;
                                 border:1px solid rgba(126,184,154,.25);">VMware</span>
                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="scroll-indicator" style="position:absolute;bottom:2rem;left:50%;
                  transform:translateX(-50%);display:flex;flex-direction:column;
                  align-items:center;gap:.5rem;opacity:0;">
        <span class="section-label" style="font-size:.6rem;">Scroll</span>
        <div class="scroll-pulse" style="width:1px;height:44px;
             background:linear-gradient(to bottom,var(--accent-gold),transparent);">
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent implements OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private ngZone     = inject(NgZone);
  private twTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    afterNextRender(async () => {
      if (isPlatformBrowser(this.platformId)) {
        await this.initGsap();
        this.initTypewriter();
      }
    });
  }

  private async initGsap() {
    const { gsap } = await import('gsap');
    const tl = gsap.timeline({ delay: .3 });
    tl.fromTo('.hero-pretitle',   { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: .7, ease: 'power3.out' })
      .fromTo('.hero-name',       { opacity: 0, y: 40  }, { opacity: 1, y: 0, duration: .85, ease: 'power3.out' }, '-=.3')
      .fromTo('.hero-title',      { opacity: 0, y: 20  }, { opacity: 1, y: 0, duration: .6,  ease: 'power2.out' }, '-=.4')
      .fromTo('.hero-desc',       { opacity: 0, y: 20  }, { opacity: 1, y: 0, duration: .6,  ease: 'power2.out' }, '-=.35')
      .fromTo('.hero-cta',        { opacity: 0, y: 18  }, { opacity: 1, y: 0, duration: .5,  ease: 'power2.out' }, '-=.3')
      .fromTo('.hero-photo-wrap', { opacity: 0, scale: .88, x: 50 }, { opacity: 1, scale: 1, x: 0, duration: 1, ease: 'power3.out' }, '-=.9')
      .fromTo('.scroll-indicator',{ opacity: 0 }, { opacity: 1, duration: .6 }, '-=.2');
  }

  private initTypewriter() {
    const roles = [
      'IT Infrastructure Section Head',
      'Sr. Network Security Administrator',
      'CCNA · MCSE · ITIL Certified',
      '15+ Years in Enterprise IT',
    ];
    let ri = 0, ci = 0, deleting = false;
    const el = document.querySelector('.typewriter-text') as HTMLElement | null;
    if (!el) return;

    const tick = () => {
      const word = roles[ri];
      el.textContent = deleting ? word.slice(0, --ci) : word.slice(0, ++ci);

      if (!deleting && ci === word.length) {
        deleting = true;
        this.twTimeout = setTimeout(tick, 2000);
        return;
      }
      if (deleting && ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
      }
      this.twTimeout = setTimeout(tick, deleting ? 38 : 80);
    };
    tick();
  }

  ngOnDestroy() {
    if (this.twTimeout) clearTimeout(this.twTimeout);
  }
}
