import {
  Component, OnDestroy, PLATFORM_ID,
  afterNextRender, inject, NgZone
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <section id="contact"
             style="position:relative;z-index:1;padding:7rem 0 4rem;background:var(--bg-primary);">

      <div class="site-container" style="position:relative;z-index:1;">

        <div class="flex items-center gap-3 mb-3">
          <div class="gold-divider"></div>
          <p class="section-label">06 — Contact</p>
        </div>
        <div class="section-num select-none" style="position:absolute;top:-1rem;right:1rem;">06</div>

        <h2 class="serif font-black mb-4 leading-tight contact-title"
            style="font-size:clamp(2rem,4vw,3rem);color:var(--text-primary);">
          Let's Connect &amp; <span class="gradient-text">Collaborate</span>
        </h2>
        <p class="mb-14 contact-sub" style="color:var(--text-secondary);max-width:40rem;">
          Whether you have an IT infrastructure challenge, a project to discuss, or just want
          to connect — reach out and I'll respond promptly.
        </p>

        <!-- Contact cards -->
        <div class="contact-info max-w-2xl mx-auto space-y-4">

          @for (item of contactItems; track item.label) {
            <a [href]="item.href" [target]="item.external ? '_blank' : '_self'"
               rel="noopener"
               class="glass rounded-xl p-4 flex items-center gap-4
                      transition-all duration-300 group block"
               style="border:1px solid var(--border-subtle);"
               onmouseover="this.style.borderColor='rgba(201,168,76,.3)';this.style.transform='translateX(6px)'"
               onmouseout="this.style.borderColor='var(--border-subtle)';this.style.transform='translateX(0)'">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
                   style="background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.22);">
                {{ item.icon }}
              </div>
              <div>
                <p class="text-xs mb-0.5" style="color:var(--text-muted);letter-spacing:.12em;text-transform:uppercase;">
                  {{ item.label }}
                </p>
                <p class="font-semibold text-sm" style="color:var(--text-primary);">
                  {{ item.value }}
                </p>
              </div>
              <svg class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                   width="14" height="14" viewBox="0 0 24 24" fill="none"
                   stroke="var(--accent-gold)" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          }

          <!-- WhatsApp CTA -->
          <a href="https://wa.me/201274881111" target="_blank" rel="noopener"
             class="flex items-center justify-center gap-3 rounded-2xl font-semibold
                    text-white transition-all duration-300 w-full"
             style="padding:1.2rem 2rem;background:linear-gradient(135deg,#25d366,#128c7e);
                    box-shadow:0 0 0 rgba(37,211,102,0);"
             onmouseover="this.style.transform='scale(1.02)';this.style.boxShadow='0 0 32px rgba(37,211,102,.4)'"
             onmouseout="this.style.transform='scale(1)';this.style.boxShadow='0 0 0 rgba(37,211,102,0)'">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp · +20 12 748 81111
          </a>

          <!-- Location / availability -->
          <div class="glass rounded-xl p-5" style="border:1px solid rgba(201,168,76,.18);">
            <div class="flex items-center gap-3 mb-2">
              <span class="w-2 h-2 rounded-full"
                    style="background:var(--accent-gold);
                           box-shadow:0 0 8px rgba(201,168,76,.5);
                           animation:statusPing 2s ease-out infinite;">
              </span>
              <span class="text-xs font-semibold"
                    style="color:var(--accent-gold);letter-spacing:.12em;text-transform:uppercase;">
                Open to Opportunities
              </span>
            </div>
            <p class="text-sm" style="color:var(--text-secondary);">
              📍 Cairo, Egypt &nbsp;·&nbsp; IT Infrastructure &amp; Network Security roles
            </p>
            <p class="text-sm mt-1" style="color:var(--text-secondary);">
              🌐 Arabic (Native) &nbsp;·&nbsp; English (Professional)
            </p>
          </div>

        </div>

      </div>

      <!-- Footer -->
      <div class="site-container"
           style="margin-top:5rem;padding-top:2rem;border-top:1px solid var(--border-subtle);
                  position:relative;z-index:1;">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-xs" style="color:var(--text-muted);">
            Portfolio of
            <span style="color:var(--accent-gold);">Mohamed Sileem</span>
            · {{ year }}
          </p>
          <p class="text-xs" style="color:var(--text-muted);">
            CCNA · MCSE 2012 · ITIL · Fortinet NSE · VMware vSphere · SAP Basis
          </p>
        </div>
      </div>

    </section>
  `,
})
export class ContactComponent implements OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private ngZone     = inject(NgZone);
  private cleanup: (() => void) | null = null;

  year = new Date().getFullYear();

  readonly contactItems = [
    {
      icon: '✉️', label: 'Email',
      value: 'M.sileem@wadielnilecem.com',
      href: 'mailto:M.sileem@wadielnilecem.com',
      external: false,
    },
    {
      icon: '💼', label: 'LinkedIn',
      value: 'linkedin.com/in/mohamed-sileem-3193b8106',
      href: 'https://www.linkedin.com/in/mohamed-sileem-3193b8106/',
      external: true,
    },
    {
      icon: '📱', label: 'Phone',
      value: '+20 12 748 81111',
      href: 'tel:+201274881111',
      external: false,
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
      gsap.fromTo('.contact-title, .contact-sub', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, stagger: .15, duration: .7, ease: 'power2.out',
        scrollTrigger: { trigger: '#contact', start: 'top 75%', toggleActions: 'play none none reverse' },
      });
      gsap.fromTo('.contact-info', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: .8, ease: 'power3.out',
        scrollTrigger: { trigger: '#contact', start: 'top 70%', toggleActions: 'play none none reverse' },
      });
      this.cleanup = () => ScrollTrigger.getAll().forEach(t => t.kill());
    });
  }

  ngOnDestroy() { this.cleanup?.(); }
}
