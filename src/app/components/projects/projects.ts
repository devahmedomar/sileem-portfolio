import {
  Component, OnDestroy, PLATFORM_ID,
  afterNextRender, inject, NgZone
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Achievement {
  title: string;
  description: string;
  tags: string[];
  icon: string;
  color: string;
  border: string;
  status: 'live' | 'certified' | 'ongoing';
}

@Component({
  selector: 'app-projects',
  standalone: true,
  template: `
    <section id="projects"
             style="position:relative;z-index:1;padding:7rem 0;background:var(--bg-surface);">

      <div class="site-container" style="position:relative;z-index:1;">

        <div class="flex items-center gap-3 mb-3">
          <div class="gold-divider"></div>
          <p class="section-label">05 — Key Achievements</p>
        </div>
        <div class="section-num select-none" style="position:absolute;top:-1rem;right:1rem;">05</div>

        <h2 class="serif font-black mb-3 leading-tight"
            style="font-size:clamp(2rem,4vw,3rem);color:var(--text-primary);">
          Enterprise <span class="gradient-text">Deployments</span> &amp; Milestones
        </h2>
        <p class="mb-14" style="color:var(--text-secondary);max-width:40rem;">
          Key infrastructure projects and deployments delivered throughout 15+ years
          at Wadi El Nile Cement and beyond.
        </p>

        <!-- Achievements grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (item of achievements; track item.title) {
            <div class="project-card glass rounded-2xl flex flex-col relative overflow-hidden
                         transition-all duration-300"
                 style="padding:2rem 2rem 1.75rem;border:1px solid var(--border-subtle);min-height:340px;"
                 (mousemove)="onCardMove($event)"
                 (mouseleave)="onCardLeave($event)"
                 onmouseover="this.style.borderColor='rgba(201,168,76,.22)'"
                 onmouseout="this.style.borderColor='var(--border-subtle)'">

              <!-- Shine layer -->
              <div class="card-shine rounded-2xl"></div>

              <!-- Icon -->
              <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 shrink-0"
                   [style.background]="item.color"
                   [style.border]="'1px solid ' + item.border">
                {{ item.icon }}
              </div>

              <!-- Status badge -->
              <span class="absolute top-5 right-5 text-xs px-2.5 py-1 rounded-full"
                    [style.background]="statusBg(item.status)"
                    [style.color]="statusColor(item.status)"
                    [style.border]="'1px solid ' + statusBorder(item.status)">
                {{ statusLabel(item.status) }}
              </span>

              <!-- Content -->
              <h3 class="font-bold text-base mb-3" style="color:var(--text-primary);">
                {{ item.title }}
              </h3>
              <p class="text-sm leading-relaxed flex-1 mb-5"
                 style="color:var(--text-secondary);">
                {{ item.description }}
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2">
                @for (tag of item.tags; track tag) {
                  <span class="text-xs px-2 py-0.5 rounded"
                        style="background:rgba(255,255,255,.04);color:var(--text-muted);
                               border:1px solid var(--border-subtle);">
                    {{ tag }}
                  </span>
                }
              </div>
            </div>
          }
        </div>

        <p class="text-center mt-12 text-sm" style="color:var(--text-muted);">
          15+ years of continuous infrastructure delivery at Wadi El Nile Cement
        </p>

      </div>
    </section>
  `,
})
export class ProjectsComponent implements OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private ngZone     = inject(NgZone);
  private cleanup: (() => void) | null = null;

  readonly achievements: Achievement[] = [
    {
      title: 'Enterprise Network Design & Implementation',
      description:
        'Designed and deployed the full network infrastructure at Wadi El Nile Cement — Cisco routing & switching, multi-site VLAN segmentation, WAN connectivity, and IP address management across plant facilities.',
      tags: ['Cisco CCNA', 'Routing', 'Switching', 'VLANs', 'WAN', 'TCP/IP'],
      icon: '🔵',
      color: 'rgba(201,168,76,.1)',
      border: 'rgba(201,168,76,.25)',
      status: 'live',
    },
    {
      title: 'Fortinet Security & TMG Gateway Deployment',
      description:
        'Deployed Fortinet FortiGate firewalls (FG 200B, 100D, 80C) with Active Directory integration, IPSec VPN site-to-site, UTM policies, and TMG for ISP load balancing, failover, and internet policy enforcement.',
      tags: ['Fortinet', 'TMG', 'IPSec VPN', 'UTM', 'FortiAnalyzer', 'GFI'],
      icon: '🛡️',
      color: 'rgba(232,124,62,.1)',
      border: 'rgba(232,124,62,.25)',
      status: 'live',
    },
    {
      title: 'Windows Server 2012 Infrastructure (MCSE)',
      description:
        'Built and administers the complete Windows Server 2012 environment — Active Directory, DNS, DHCP, Group Policy, Exchange Server 2010, Office 365 integration, and network file sharing for the entire organization.',
      tags: ['MCSE 2012', 'Active Directory', 'Exchange', 'DNS', 'DHCP', 'GPO'],
      icon: '🪟',
      color: 'rgba(168,197,218,.1)',
      border: 'rgba(168,197,218,.25)',
      status: 'live',
    },
    {
      title: 'Data Center & Backup Infrastructure',
      description:
        'Set up and manages the corporate data center with HP ProLiant & Dell PowerEdge servers, HP NAS Storage, TAP Library, and Symantec Backup Exec — ensuring enterprise-grade data protection and recovery.',
      tags: ['HP ProLiant', 'Dell PowerEdge', 'NAS Storage', 'Symantec Backup', 'TAP Library'],
      icon: '🏢',
      color: 'rgba(126,184,154,.1)',
      border: 'rgba(126,184,154,.25)',
      status: 'live',
    },
    {
      title: 'SAP NetWeaver Basis Administration',
      description:
        'Administers the SAP system at Wadi El Nile Cement — hardware sizing, OS and database configuration, SAP Logon Pad setup, system monitoring via SAP Service Manager, and client/system copy operations.',
      tags: ['SAP NetWeaver', 'SAP Basis', 'MS SQL Server', 'System Monitor', 'SAP GUI'],
      icon: '⚙️',
      color: 'rgba(192,168,112,.1)',
      border: 'rgba(192,168,112,.25)',
      status: 'live',
    },
    {
      title: 'VMware vSphere Virtualization',
      description:
        'Implemented VMware vSphere 5.5 virtualization across the data center — consolidating physical server workloads, configuring virtual machines, and managing the hypervisor environment for optimal resource utilization.',
      tags: ['VMware vSphere 5.5', 'VCP', 'Virtualization', 'Data Center', 'Hyper-V'],
      icon: '☁️',
      color: 'rgba(201,168,76,.08)',
      border: 'rgba(201,168,76,.2)',
      status: 'certified',
    },
  ];

  statusBg(s: string)     { return s === 'live' ? 'rgba(16,185,129,.1)'   : s === 'certified' ? 'rgba(201,168,76,.1)' : 'rgba(168,197,218,.1)'; }
  statusColor(s: string)  { return s === 'live' ? '#34d399'               : s === 'certified' ? 'var(--accent-gold)'  : '#a8c5da'; }
  statusBorder(s: string) { return s === 'live' ? 'rgba(16,185,129,.28)'  : s === 'certified' ? 'rgba(201,168,76,.28)': 'rgba(168,197,218,.25)'; }
  statusLabel(s: string)  { return s === 'live' ? '● Active'              : s === 'certified' ? '★ Certified'         : '◆ Delivered'; }

  onCardMove(e: MouseEvent) {
    const card = (e.currentTarget as HTMLElement);
    const rect = card.getBoundingClientRect();
    const cx   = (e.clientX - rect.left) / rect.width;
    const cy   = (e.clientY - rect.top)  / rect.height;
    const rx   = (cy - .5) * -10;
    const ry   = (cx - .5) *  10;
    card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    card.style.setProperty('--mx', `${cx * 100}%`);
    card.style.setProperty('--my', `${cy * 100}%`);
  }
  onCardLeave(e: MouseEvent) {
    const card = e.currentTarget as HTMLElement;
    card.style.transform = 'perspective(700px) rotateX(0) rotateY(0) scale(1)';
  }

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
      gsap.fromTo('.project-card', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, stagger: .12, duration: .7, ease: 'power3.out',
        scrollTrigger: { trigger: '#projects', start: 'top 70%', toggleActions: 'play none none reverse' },
      });
      this.cleanup = () => ScrollTrigger.getAll().forEach(t => t.kill());
    });
  }

  ngOnDestroy() { this.cleanup?.(); }
}
