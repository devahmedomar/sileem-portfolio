import {
  Component, OnDestroy, PLATFORM_ID, afterNextRender,
  inject, signal, NgZone
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface NavLink { id: string; label: string; }

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <nav [class]="navClass()"
         style="position:fixed;top:0;left:0;right:0;z-index:1000;transition:all .4s ease;">
      <div class="site-container" style="height:5rem;display:flex;align-items:center;justify-content:space-between;">

        <!-- Logo -->
        <a (click)="scrollTo('home')"
           class="font-bold text-sm tracking-[.18em] select-none uppercase"
           style="cursor:pointer;display:flex;align-items:center;gap:.6rem;">
          <span style="display:inline-flex;align-items:center;justify-content:center;
                       width:34px;height:34px;border-radius:6px;
                       background:linear-gradient(135deg,#c9a84c,#e8c56a);
                       color:#09090c;font-size:.85rem;font-weight:900;letter-spacing:0;">
            MS
          </span>
          <span style="color:var(--text-secondary);letter-spacing:.15em;font-size:.75rem;">
            Mohamed Sileem
          </span>
        </a>

        <!-- Desktop Links -->
        <ul class="hidden md:flex items-center gap-8">
          @for (link of links; track link.id) {
            <li>
              <button (click)="scrollTo(link.id)"
                      [style.color]="activeSection() === link.id ? 'var(--accent-gold)' : 'var(--text-secondary)'"
                      class="text-sm tracking-wide transition-colors duration-200 hover:text-white! relative group"
                      style="font-weight:500;">
                {{ link.label }}
                <span style="position:absolute;bottom:-3px;left:0;height:1.5px;
                             background:var(--gradient-main);border-radius:1px;
                             transition:width .3s ease;"
                      [style.width]="activeSection() === link.id ? '100%' : '0'">
                </span>
              </button>
            </li>
          }
        </ul>

        <!-- Hamburger -->
        <button (click)="menuOpen.set(!menuOpen())"
                class="md:hidden flex flex-col gap-1.25 p-2"
                aria-label="Toggle menu">
          <span class="block h-px w-6 transition-all duration-300"
                [style.background]="'var(--accent-gold)'"
                [style.transform]="menuOpen() ? 'rotate(45deg) translate(4px,4px)' : 'none'">
          </span>
          <span class="block h-px w-6 transition-all duration-300"
                [style.background]="'var(--accent-gold)'"
                [style.opacity]="menuOpen() ? '0' : '1'">
          </span>
          <span class="block h-px w-6 transition-all duration-300"
                [style.background]="'var(--accent-gold)'"
                [style.transform]="menuOpen() ? 'rotate(-45deg) translate(4px,-4px)' : 'none'">
          </span>
        </button>
      </div>

      <!-- Mobile Menu -->
      @if (menuOpen()) {
        <div class="md:hidden glass border-t px-6 py-4 flex flex-col gap-4"
             style="border-color:var(--border-subtle);">
          @for (link of links; track link.id) {
            <button (click)="scrollTo(link.id); menuOpen.set(false)"
                    class="text-left text-sm py-2 transition-colors"
                    [style.color]="activeSection() === link.id ? 'var(--accent-gold)' : 'var(--text-secondary)'">
              {{ link.label }}
            </button>
          }
        </div>
      }
    </nav>
  `,
})
export class NavbarComponent implements OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private ngZone     = inject(NgZone);
  private cleanup: (() => void) | null = null;

  menuOpen      = signal(false);
  activeSection = signal('home');
  scrolled      = signal(false);

  navClass = () => this.scrolled()
    ? 'glass border-b'
    : 'border-b border-transparent';

  readonly links: NavLink[] = [
    { id: 'home',       label: 'Home'       },
    { id: 'about',      label: 'About'      },
    { id: 'skills',     label: 'Skills'     },
    { id: 'experience', label: 'Experience' },
    { id: 'projects',   label: 'Achievements' },
    { id: 'contact',    label: 'Contact'    },
  ];

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.initListeners();
      }
    });
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  private initListeners() {
    this.ngZone.runOutsideAngular(() => {
      const sectionIds = this.links.map(l => l.id);
      const NAV_H = 90;

      const getActive = (): string => {
        let active = sectionIds[0];
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (!el) continue;
          if (el.getBoundingClientRect().top <= NAV_H) {
            active = id;
          }
        }
        return active;
      };

      let lastActive = 'home';
      const onScroll = () => {
        const scrolled = window.scrollY > 60;
        if (scrolled !== this.scrolled()) {
          this.ngZone.run(() => this.scrolled.set(scrolled));
        }
        const active = getActive();
        if (active !== lastActive) {
          lastActive = active;
          this.ngZone.run(() => this.activeSection.set(active));
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      this.cleanup = () => window.removeEventListener('scroll', onScroll);
    });
  }

  ngOnDestroy() { this.cleanup?.(); }
}
