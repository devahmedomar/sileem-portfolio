import { Component, OnDestroy, PLATFORM_ID, afterNextRender, inject, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cursor',
  standalone: true,
  template: `
    <div class="cursor-dot"
         style="position:fixed;top:0;left:0;width:7px;height:7px;border-radius:50%;
                background:var(--accent-gold);pointer-events:none;z-index:9999;
                transform:translate(-50%,-50%);
                transition:transform .15s,opacity .15s;will-change:transform;">
    </div>
    <div class="cursor-ring"
         style="position:fixed;top:0;left:0;width:30px;height:30px;border-radius:50%;
                border:1.5px solid rgba(201,168,76,.55);pointer-events:none;z-index:9998;
                transform:translate(-50%,-50%);will-change:transform;">
    </div>
  `,
})
export class CursorComponent implements OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private cleanup: (() => void) | null = null;

  constructor() {
    afterNextRender(async () => {
      if (isPlatformBrowser(this.platformId)) {
        await this.init();
      }
    });
  }

  private async init() {
    const { gsap } = await import('gsap');

    const dot  = document.querySelector('.cursor-dot')  as HTMLElement | null;
    const ring = document.querySelector('.cursor-ring') as HTMLElement | null;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { x: -100, y: -100 });

    const onMove = (e: MouseEvent) => {
      gsap.to(dot,  { x: e.clientX, y: e.clientY, duration: 0.08 });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power2.out' });
    };

    const onEnter = () => {
      gsap.to(ring, { scale: 2,   opacity: 0.4, duration: 0.25 });
      gsap.to(dot,  { scale: 0.4, opacity: 0,   duration: 0.25 });
    };
    const onLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.25 });
      gsap.to(dot,  { scale: 1, opacity: 1, duration: 0.25 });
    };

    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('mousemove', onMove);

      const attachHovers = () => {
        document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
          el.addEventListener('mouseenter', onEnter);
          el.addEventListener('mouseleave', onLeave);
        });
      };
      attachHovers();

      const observer = new MutationObserver(attachHovers);
      observer.observe(document.body, { childList: true, subtree: true });

      this.cleanup = () => {
        window.removeEventListener('mousemove', onMove);
        observer.disconnect();
      };
    });
  }

  ngOnDestroy() { this.cleanup?.(); }
}
