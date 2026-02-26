import {
  Component, OnDestroy, PLATFORM_ID,
  afterNextRender, inject, NgZone
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Experience {
  role: string;
  company: string;
  period: string;
  duration: string;
  type: string;
  location: string;
  highlights: string[];
  tags: string[];
  side: 'left' | 'right';
  current?: boolean;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  template: `
    <section id="experience"
             style="position:relative;z-index:1;padding:7rem 0;background:var(--bg-primary);">

      <div class="site-container" style="position:relative;z-index:1;">

        <div class="flex items-center gap-3 mb-3">
          <div class="gold-divider"></div>
          <p class="section-label">04 — Experience</p>
        </div>
        <div class="section-num select-none" style="position:absolute;top:-1rem;right:1rem;">04</div>

        <h2 class="serif font-black mb-3 leading-tight"
            style="font-size:clamp(2rem,4vw,3rem);color:var(--text-primary);">
          A Career Built on <span class="gradient-text">Reliability</span>
        </h2>
        <p class="mb-16" style="color:var(--text-secondary);max-width:40rem;">
          20 years of progressive IT leadership — from hands-on network administration
          to managing enterprise infrastructure as a Section Head.
        </p>

        <!-- Timeline -->
        <div class="relative">

          <!-- Central vertical line (desktop) -->
          <div class="timeline-line hidden lg:block absolute"
               style="left:50%;top:0;bottom:0;width:1px;transform:translateX(-50%);">
          </div>

          <div class="space-y-12 lg:space-y-0">
            @for (exp of experiences; track exp.company; let i = $index) {
              <div class="exp-card relative lg:flex lg:items-start"
                   [class]="exp.side === 'right' ? 'lg:flex-row-reverse' : ''"
                   [style.margin-bottom]="i < experiences.length - 1 ? '4rem' : '0'">

                <!-- Card -->
                <div class="exp-card-inner glass rounded-2xl lg:w-[45%] transition-all duration-300"
                     style="padding:2rem 2.25rem 1.75rem;border:1px solid var(--border-subtle);">

                  <!-- Header -->
                  <div class="flex items-start justify-between mb-4 gap-3">
                    <div>
                      <h3 class="font-bold text-lg mb-1" style="color:var(--text-primary);">
                        {{ exp.role }}
                      </h3>
                      <p class="font-semibold" style="color:var(--accent-gold);">
                        {{ exp.company }}
                      </p>
                    </div>
                    @if (exp.current) {
                      <span class="text-xs px-2.5 py-1 rounded-full shrink-0"
                            style="background:rgba(16,185,129,.12);color:#34d399;
                                   border:1px solid rgba(16,185,129,.28);">
                        ● Current
                      </span>
                    }
                  </div>

                  <!-- Meta row -->
                  <div class="flex flex-wrap gap-x-4 gap-y-1 mb-5 text-xs"
                       style="color:var(--text-muted);">
                    <span>📅 {{ exp.period }}</span>
                    <span>⏱ {{ exp.duration }}</span>
                    <span>📍 {{ exp.location }}</span>
                    <span>💼 {{ exp.type }}</span>
                  </div>

                  <!-- Highlights -->
                  <ul class="space-y-2 mb-5">
                    @for (h of exp.highlights; track h) {
                      <li class="flex items-start gap-2 text-sm leading-relaxed"
                          style="color:var(--text-secondary);">
                        <span style="color:var(--accent-gold);margin-top:.25rem;flex-shrink:0;">▹</span>
                        {{ h }}
                      </li>
                    }
                  </ul>

                  <!-- Tags -->
                  <div class="flex flex-wrap gap-2">
                    @for (tag of exp.tags; track tag) {
                      <span class="text-xs px-2.5 py-1 rounded-lg"
                            style="background:rgba(201,168,76,.07);color:rgba(201,168,76,.85);
                                   border:1px solid rgba(201,168,76,.18);">
                        {{ tag }}
                      </span>
                    }
                  </div>
                </div>

                <!-- Timeline dot (desktop) -->
                <div class="hidden lg:flex items-center justify-center w-[10%]"
                     style="padding-top:1.5rem;">
                  <div class="w-4 h-4 rounded-full"
                       style="background:var(--gradient-main);
                              box-shadow:0 0 14px rgba(201,168,76,.5);
                              border:2px solid var(--bg-primary);">
                  </div>
                </div>

                <!-- Empty spacer -->
                <div class="hidden lg:block lg:w-[45%]"></div>
              </div>
            }
          </div>
        </div>

      </div>
    </section>
  `,
})
export class ExperienceComponent implements OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private ngZone     = inject(NgZone);
  private cleanup: (() => void) | null = null;

  readonly experiences: Experience[] = [
    {
      role: 'IT Infrastructure Section Head / Sr. System & Network Security Administrator',
      company: 'Wadi El Nile Cement Co.',
      period: 'Oct 2010 – Present',
      duration: '15+ Years',
      type: 'Full-time',
      location: 'Cairo, Egypt',
      current: true,
      side: 'left',
      highlights: [
        'Lead the full IT infrastructure strategy — network design, security architecture, server environments, and data center operations across the cement plant.',
        'Deploy and manage Fortinet FortiGate firewalls (FG 200B, 100D, 80C) with AD integration, IPSec VPN, UTM, and FortiAnalyzer monitoring.',
        'Administer SAP NetWeaver Basis including hardware sizing, system monitoring, client/system copy, and SAP Frontend configuration.',
        'Manage Windows Server 2008/2012 environments with Active Directory, DNS, DHCP, Group Policy, Exchange Server 2010, and Office 365.',
        'Oversee TMG deployment for internet policy, ISP load balancing & failover, VPN site-to-site, and server publishing.',
        'Manage HP ProLiant & Dell PowerEdge servers, HP NAS storage, TAP Library, and Symantec Backup Exec for enterprise data protection.',
        'Deploy and maintain IP camera/CCTV systems integrated with the network infrastructure.',
        'Administer company websites: energya.com (Energya Holding) and wadielnilecem.com.',
      ],
      tags: ['Cisco', 'Fortinet', 'Windows Server', 'SAP Basis', 'VMware', 'TMG', 'Active Directory', 'Exchange', 'Kaspersky'],
    },
    {
      role: 'IT Assistant Manager',
      company: 'Rajac Language Schools',
      period: 'Jan 2009 – Oct 2010',
      duration: '1 yr 10 mos',
      type: 'Full-time',
      location: 'Ismailya · Minya · Hurghada, Egypt',
      side: 'right',
      highlights: [
        'Managed IT operations across three school branches in Ismailya, Minya, and Hurghada.',
        'Designed and maintained network infrastructure, server environments, and user systems for administrative and academic staff.',
        'Oversaw hardware procurement, software installations, and IT support for all campuses.',
        'Implemented network security policies and user access control across the school network.',
      ],
      tags: ['Network Administration', 'Windows Server', 'IT Management', 'Multi-site', 'Hardware'],
    },
    {
      role: 'System & Network Administrator',
      company: 'BBA Food House (Wessaya – Sbaroo)',
      period: 'May 2006 – Jan 2009',
      duration: '2 yrs 9 mos',
      type: 'Full-time',
      location: 'Egypt',
      side: 'left',
      highlights: [
        'Maintained and supported the company\'s network infrastructure, servers, and workstations.',
        'Installed and configured computer hardware, networking equipment, and POS systems.',
        'Handled day-to-day IT support, system troubleshooting, and user assistance.',
        'Administered Windows Server environments and managed data backup procedures.',
      ],
      tags: ['System Administration', 'Networking', 'Hardware', 'Windows Server', 'Technical Support'],
    },
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
      document.querySelectorAll('.exp-card').forEach((card, i) => {
        const fromX = i % 2 === 0 ? -60 : 60;
        gsap.fromTo(card, { opacity: 0, x: fromX }, {
          opacity: 1, x: 0, duration: .8, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none reverse' },
        });
      });
      this.cleanup = () => ScrollTrigger.getAll().forEach(t => t.kill());
    });
  }

  ngOnDestroy() { this.cleanup?.(); }
}
