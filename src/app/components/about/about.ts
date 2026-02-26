import {
  Component, OnDestroy, PLATFORM_ID,
  afterNextRender, inject, NgZone
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Stat { value: string; label: string; note: string; }

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section id="about"
             style="position:relative;z-index:1;padding:7rem 0;background:var(--bg-primary);">

      <div class="site-container" style="position:relative;z-index:1;">

        <!-- Section label -->
        <div class="flex items-center gap-3 mb-3">
          <div class="gold-divider"></div>
          <p class="section-label">02 — About</p>
        </div>

        <!-- Big section number -->
        <div class="section-num select-none" style="position:absolute;top:-1rem;right:1rem;">02</div>

        <!-- Grid: Left bio | Right credentials card -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <!-- LEFT: bio -->
          <div class="about-left">
            <h2 class="serif font-black mb-2 leading-tight"
                style="font-size:clamp(2rem,4vw,3rem);color:var(--text-primary);">
              Building Resilient Networks,
            </h2>
            <h2 class="serif font-black mb-6 leading-tight gradient-text"
                style="font-size:clamp(2rem,4vw,3rem);">
              Securing Enterprise Infrastructure
            </h2>

            <p class="mb-5 leading-relaxed" style="color:var(--text-secondary);">
              Based in <span style="color:var(--text-primary);font-weight:600;">Cairo, Egypt</span>,
              I'm an IT Infrastructure Section Head with over
              <span style="color:var(--accent-gold);font-weight:600;">15 years</span> of hands-on
              experience managing enterprise networks, data centers, and security systems at
              Wadi El Nile Cement — one of Egypt's leading cement producers.
            </p>
            <p class="mb-10 leading-relaxed" style="color:var(--text-secondary);">
              From designing multi-site Cisco networks and deploying Fortinet firewall solutions,
              to administering SAP NetWeaver systems and Windows Server infrastructure — I bring
              end-to-end IT ownership across networking, security, virtualization, and operations.
              Holder of <span style="color:var(--accent-gold);font-weight:600;">17 industry certifications</span>
              including MCSE 2012, CCNA, ITIL Foundation, VMware vSphere, and Fortinet NSE.
            </p>

            <!-- Stats -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              @for (stat of stats; track stat.label) {
                <div class="glass rounded-xl p-4 text-center about-stat"
                     style="border:1px solid rgba(201,168,76,.12);">
                  <p class="font-black gradient-text mb-1"
                     style="font-size:1.75rem;">{{ stat.value }}</p>
                  <p class="font-semibold text-sm mb-0.5" style="color:var(--text-primary);">
                    {{ stat.label }}
                  </p>
                  <p style="font-size:.65rem;color:var(--text-muted);">
                    {{ stat.note }}
                  </p>
                </div>
              }
            </div>
          </div>

          <!-- RIGHT: professional profile card -->
          <div class="about-right">
            <div class="glass rounded-2xl overflow-hidden"
                 style="border:1px solid rgba(201,168,76,.15);">

              <!-- Card header -->
              <div class="flex items-center gap-3 px-6 py-4"
                   style="background:rgba(201,168,76,.06);border-bottom:1px solid rgba(201,168,76,.12);">
                <div style="width:38px;height:38px;border-radius:8px;flex-shrink:0;
                            background:linear-gradient(135deg,#c9a84c,#e8c56a);
                            display:flex;align-items:center;justify-content:center;
                            font-size:.85rem;font-weight:900;color:#09090c;">
                  MS
                </div>
                <div>
                  <p class="font-semibold text-sm" style="color:var(--text-primary);">
                    Mohamed Sileem
                  </p>
                  <p style="font-size:.72rem;color:var(--accent-gold);">
                    IT Infrastructure Section Head
                  </p>
                </div>
              </div>

              <!-- Current role -->
              <div class="px-6 py-5" style="border-bottom:1px solid var(--border-subtle);">
                <p style="font-size:.68rem;color:var(--text-muted);letter-spacing:.15em;text-transform:uppercase;margin-bottom:.75rem;">
                  Current Position
                </p>
                <div class="flex items-start gap-3">
                  <div style="width:8px;height:8px;border-radius:50%;background:var(--accent-emerald);
                              flex-shrink:0;margin-top:.35rem;
                              box-shadow:0 0 8px rgba(16,185,129,.5);">
                  </div>
                  <div>
                    <p class="font-semibold text-sm" style="color:var(--text-primary);">
                      Sr. System & Network Security Administrator
                    </p>
                    <p style="font-size:.8rem;color:var(--text-secondary);margin-top:.2rem;">
                      Wadi El Nile Cement Co. · Oct 2010 – Present
                    </p>
                    <span style="display:inline-block;margin-top:.5rem;font-size:.68rem;
                                 padding:.2rem .7rem;border-radius:50px;
                                 background:rgba(201,168,76,.1);color:var(--accent-gold);
                                 border:1px solid rgba(201,168,76,.25);">
                      15+ Years
                    </span>
                  </div>
                </div>
              </div>

              <!-- Key Expertise areas -->
              <div class="px-6 py-5" style="border-bottom:1px solid var(--border-subtle);">
                <p style="font-size:.68rem;color:var(--text-muted);letter-spacing:.15em;text-transform:uppercase;margin-bottom:.85rem;">
                  Core Expertise
                </p>
                <div class="flex flex-wrap gap-2">
                  @for (area of expertise; track area) {
                    <span style="font-size:.75rem;padding:.3rem .75rem;border-radius:6px;
                                 background:rgba(255,255,255,.04);color:var(--text-secondary);
                                 border:1px solid var(--border-subtle);">
                      {{ area }}
                    </span>
                  }
                </div>
              </div>

              <!-- Top certifications -->
              <div class="px-6 py-5" style="border-bottom:1px solid var(--border-subtle);">
                <p style="font-size:.68rem;color:var(--text-muted);letter-spacing:.15em;text-transform:uppercase;margin-bottom:.85rem;">
                  Key Certifications (17 Total)
                </p>
                <div class="space-y-2">
                  @for (cert of topCerts; track cert.name) {
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <span style="width:5px;height:5px;border-radius:50%;
                                     background:var(--accent-gold);flex-shrink:0;">
                        </span>
                        <span style="font-size:.8rem;color:var(--text-secondary);">{{ cert.name }}</span>
                      </div>
                      <span style="font-size:.7rem;color:var(--text-muted);">{{ cert.issuer }}</span>
                    </div>
                  }
                </div>
              </div>

            </div>

            <!-- Social links -->
            <div class="flex items-center gap-4 mt-5">
              <a href="https://www.linkedin.com/in/mohamed-sileem-3193b8106/" target="_blank" rel="noopener"
                 class="glass rounded-xl flex items-center gap-2 text-sm
                        transition-all duration-300"
                 style="padding:.85rem 1.5rem;color:var(--text-secondary);border:1px solid var(--border-subtle);"
                 onmouseover="this.style.color='var(--accent-gold)';this.style.borderColor='rgba(201,168,76,.3)'"
                 onmouseout="this.style.color='var(--text-secondary)';this.style.borderColor='var(--border-subtle)'">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
                LinkedIn
              </a>
              <a href="mailto:M.sileem@wadielnilecem.com"
                 class="glass rounded-xl flex items-center gap-2 text-sm
                        transition-all duration-300"
                 style="padding:.85rem 1.5rem;color:var(--text-secondary);border:1px solid var(--border-subtle);"
                 onmouseover="this.style.color='var(--accent-gold)';this.style.borderColor='rgba(201,168,76,.3)'"
                 onmouseout="this.style.color='var(--text-secondary)';this.style.borderColor='var(--border-subtle)'">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Email
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  `,
})
export class AboutComponent implements OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private ngZone     = inject(NgZone);
  private cleanup: (() => void) | null = null;

  readonly stats: Stat[] = [
    { value: '15+', label: 'Years',           note: 'IT experience'         },
    { value: '3',   label: 'Companies',       note: 'full-time positions'   },
    { value: '17+', label: 'Certifications',  note: 'Microsoft · Cisco · more' },
    { value: '∞',   label: 'Uptime',          note: 'is the standard'       },
  ];

  readonly expertise = [
    'Network Design', 'Fortinet Security', 'Cisco Routing',
    'SAP NetWeaver', 'VMware vSphere', 'Windows Server',
    'Active Directory', 'Data Center', 'TMG Gateway',
  ];

  readonly topCerts = [
    { name: 'MCSE 2012: Server Infrastructure',  issuer: 'Microsoft'  },
    { name: 'MCSE 2012: Private Cloud',          issuer: 'Microsoft'  },
    { name: 'MCSE 2012: Messaging',              issuer: 'Microsoft'  },
    { name: 'CCNA',                              issuer: 'Cisco'      },
    { name: 'ITIL Foundation',                   issuer: 'APMG'       },
    { name: 'VMware vSphere 5.5',                issuer: 'VMware'     },
  ];

  constructor() {
    afterNextRender(async () => {
      if (isPlatformBrowser(this.platformId)) {
        await this.initAnimations();
      }
    });
  }

  private async initAnimations() {
    const { gsap }          = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    this.ngZone.runOutsideAngular(() => {
      gsap.fromTo('.about-left', { opacity: 0, x: -60 }, {
        opacity: 1, x: 0, duration: .9, ease: 'power3.out',
        scrollTrigger: { trigger: '#about', start: 'top 75%', toggleActions: 'play none none reverse' },
      });
      gsap.fromTo('.about-right', { opacity: 0, x: 60 }, {
        opacity: 1, x: 0, duration: .9, ease: 'power3.out',
        scrollTrigger: { trigger: '#about', start: 'top 75%', toggleActions: 'play none none reverse' },
      });
      gsap.fromTo('.about-stat', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, stagger: .12, duration: .6, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '.about-stat', start: 'top 85%', toggleActions: 'play none none reverse' },
      });

      this.cleanup = () => ScrollTrigger.getAll().forEach(t => t.kill());
    });
  }

  ngOnDestroy() { this.cleanup?.(); }
}
