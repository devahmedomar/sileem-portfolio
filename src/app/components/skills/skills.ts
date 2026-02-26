import {
  Component, OnDestroy, PLATFORM_ID,
  afterNextRender, inject, NgZone
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Skill { name: string; icon: string; level: number; }
interface SkillCategory { title: string; color: string; bg: string; skills: Skill[]; }

@Component({
  selector: 'app-skills',
  standalone: true,
  template: `
    <section id="skills"
             style="position:relative;z-index:1;padding:7rem 0;background:var(--bg-surface);">

      <div class="site-container" style="position:relative;z-index:1;">

        <div class="flex items-center gap-3 mb-3">
          <div class="gold-divider"></div>
          <p class="section-label">03 — Skills</p>
        </div>
        <div class="section-num select-none" style="position:absolute;top:-1rem;right:1rem;">03</div>

        <h2 class="serif font-black mb-3 leading-tight"
            style="font-size:clamp(2rem,4vw,3rem);color:var(--text-primary);">
          Technical <span class="gradient-text">Expertise</span>
        </h2>
        <p class="mb-14" style="color:var(--text-secondary);max-width:38rem;">
          A comprehensive toolkit built over 15+ years of enterprise IT infrastructure management,
          security deployments, and systems administration.
        </p>

        <!-- Category cards grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 skills-grid">
          @for (cat of categories; track cat.title) {
            <div class="skill-category glass rounded-2xl p-6"
                 style="border:1px solid var(--border-subtle);">

              <!-- Category header -->
              <div class="flex items-center gap-3 mb-5">
                <div class="w-2 h-8 rounded-full shrink-0"
                     [style.background]="cat.color">
                </div>
                <h3 class="font-semibold text-sm tracking-wide"
                    [style.color]="cat.color">
                  {{ cat.title }}
                </h3>
              </div>

              <div class="space-y-3">
                @for (skill of cat.skills; track skill.name) {
                  <div class="skill-card flex items-center gap-3 rounded-xl px-3 py-2.5
                               transition-all duration-300 cursor-default"
                       [style.background]="cat.bg">
                    <span class="shrink-0" style="font-size:1.2rem;">{{ skill.icon }}</span>
                    <div class="flex-1 min-w-0">
                      <p class="font-medium text-sm truncate" style="color:var(--text-primary);">
                        {{ skill.name }}
                      </p>
                    </div>
                    <!-- Level dots -->
                    <div class="flex gap-1 flex-shrink-0">
                      @for (dot of [1,2,3,4,5]; track dot) {
                        <span class="w-1.5 h-1.5 rounded-full transition-all duration-300"
                              [style.background]="dot <= skill.level
                                ? cat.color
                                : 'rgba(255,255,255,.1)'">
                        </span>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        </div>

        <!-- Certifications wall -->
        <div class="mt-14 glass rounded-2xl p-8"
             style="border:1px solid rgba(201,168,76,.15);">
          <div class="flex items-center gap-3 mb-6">
            <div class="gold-divider"></div>
            <p class="section-label">17 Industry Certifications</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            @for (cert of certifications; track cert.name) {
              <div class="flex items-center gap-3 rounded-xl p-3"
                   style="background:rgba(255,255,255,.03);border:1px solid var(--border-subtle);">
                <span style="width:8px;height:8px;border-radius:50%;flex-shrink:0;"
                      [style.background]="cert.color">
                </span>
                <div class="min-w-0">
                  <p class="font-medium text-xs truncate" style="color:var(--text-primary);">
                    {{ cert.name }}
                  </p>
                  <p style="font-size:.68rem;color:var(--text-muted);">
                    {{ cert.issuer }} · {{ cert.year }}
                  </p>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Soft skills -->
        <div class="mt-8 glass rounded-2xl p-6"
             style="border:1px solid var(--border-subtle);">
          <p class="section-label mb-4">Professional Skills</p>
          <div class="flex flex-wrap gap-3">
            @for (soft of softSkills; track soft) {
              <span class="text-sm px-4 py-2 rounded-lg"
                    style="background:rgba(201,168,76,.08);
                           border:1px solid rgba(201,168,76,.2);
                           color:var(--accent-gold-light);">
                {{ soft }}
              </span>
            }
          </div>
        </div>

      </div>
    </section>
  `,
})
export class SkillsComponent implements OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private ngZone     = inject(NgZone);
  private cleanup: (() => void) | null = null;

  readonly categories: SkillCategory[] = [
    {
      title: 'Networking & Infrastructure',
      color: '#c9a84c',
      bg: 'rgba(201,168,76,.06)',
      skills: [
        { name: 'Cisco Routers & Switches', icon: '🔵', level: 5 },
        { name: 'VLAN Design & Management', icon: '🔀', level: 5 },
        { name: 'VPN — Site-to-Site & Client', icon: '🔗', level: 5 },
        { name: 'TCP/IP · WAN / LAN',         icon: '🌐', level: 5 },
        { name: 'DNS / DHCP / Group Policy',  icon: '📡', level: 5 },
      ],
    },
    {
      title: 'Security & Firewalls',
      color: '#e87c3e',
      bg: 'rgba(232,124,62,.06)',
      skills: [
        { name: 'Fortinet FortiGate (200B/100D/80C)', icon: '🛡️', level: 5 },
        { name: 'TMG — Internet & Routing Policy',    icon: '🔒', level: 5 },
        { name: 'FortiAnalyzer · GFI Reporting',      icon: '📊', level: 4 },
        { name: 'Kaspersky Security Center',          icon: '🔐', level: 5 },
        { name: 'UTM · IPS · IPSec Configurations',   icon: '🎯', level: 5 },
      ],
    },
    {
      title: 'Systems Administration',
      color: '#a8c5da',
      bg: 'rgba(168,197,218,.06)',
      skills: [
        { name: 'Windows Server 2008 / 2012', icon: '🪟', level: 5 },
        { name: 'Active Directory & GPO',     icon: '📂', level: 5 },
        { name: 'Exchange Server 2010',       icon: '📧', level: 5 },
        { name: 'Office 365 / SharePoint',    icon: '📋', level: 4 },
        { name: 'Windows 7 / 8 Administration', icon: '💻', level: 5 },
      ],
    },
    {
      title: 'Virtualization & Data Center',
      color: '#7eb89a',
      bg: 'rgba(126,184,154,.06)',
      skills: [
        { name: 'VMware vSphere 5.5 (VCP)',   icon: '☁️', level: 5 },
        { name: 'Hyper-V & System Center',    icon: '🖥️', level: 4 },
        { name: 'HP ProLiant / Dell PowerEdge', icon: '🏢', level: 5 },
        { name: 'HP NAS Storage & TAP Library', icon: '💾', level: 5 },
        { name: 'IP Camera / CCTV Systems',   icon: '📷', level: 5 },
      ],
    },
    {
      title: 'SAP & Database Operations',
      color: '#c0a870',
      bg: 'rgba(192,168,112,.06)',
      skills: [
        { name: 'SAP NetWeaver Basis Admin',    icon: '⚙️', level: 4 },
        { name: 'SAP Frontend / GUI Setup',     icon: '🖱️', level: 4 },
        { name: 'MS SQL Server Administration', icon: '🗄️', level: 4 },
        { name: 'Symantec Backup Exec',         icon: '💿', level: 5 },
        { name: 'Website Administration',       icon: '🌍', level: 4 },
      ],
    },
  ];

  readonly certifications = [
    { name: 'MCSE 2012: Server Infrastructure', issuer: 'Microsoft', year: '2014', color: '#c9a84c' },
    { name: 'MCSE 2012: Private Cloud',         issuer: 'Microsoft', year: '2014', color: '#c9a84c' },
    { name: 'MCSE 2012: Messaging',             issuer: 'Microsoft', year: '2014', color: '#c9a84c' },
    { name: 'MCSA 2012: Windows Server',        issuer: 'Microsoft', year: '2012', color: '#c9a84c' },
    { name: 'Server Virtualization Hyper-V',    issuer: 'Microsoft', year: '2013', color: '#c9a84c' },
    { name: 'Enterprise Admin — WS 2008',       issuer: 'Microsoft', year: '2010', color: '#c9a84c' },
    { name: 'Exchange Server 2010 Config',      issuer: 'Microsoft', year: '2010', color: '#c9a84c' },
    { name: 'MCITP: WS2008 Network Infra',      issuer: 'Microsoft', year: '2010', color: '#c9a84c' },
    { name: 'MCITP: WS2008 App Infra',          issuer: 'Microsoft', year: '2010', color: '#c9a84c' },
    { name: 'MCITP: WS2008 Active Directory',   issuer: 'Microsoft', year: '2010', color: '#c9a84c' },
    { name: 'MCITP: Windows 7 Configuration',   issuer: 'Microsoft', year: '2010', color: '#c9a84c' },
    { name: 'CCNA',                             issuer: 'Cisco',     year: '2013', color: '#e87c3e' },
    { name: 'ITIL Foundation',                  issuer: 'APMG',      year: '2015', color: '#a8c5da' },
    { name: 'VMware vSphere 5.5',               issuer: 'VMware',    year: '2014', color: '#7eb89a' },
    { name: 'Network Security Solutions',       issuer: 'Fortinet',  year: '2014', color: '#e87c3e' },
    { name: 'Network Security Tech Foundations',issuer: 'Fortinet',  year: '2013', color: '#e87c3e' },
    { name: 'Symantec Backup Exec',             issuer: 'Symantec',  year: '2013', color: '#c0a870' },
  ];

  readonly softSkills = [
    'Technical Leadership', 'Infrastructure Planning', 'Troubleshooting',
    'Team Supervision', 'IT Risk Management', 'Vendor Management',
    'SLA Compliance', 'Project Execution', 'Documentation',
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
      gsap.fromTo('.skill-category', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, stagger: .12, duration: .7, ease: 'power2.out',
        scrollTrigger: { trigger: '#skills', start: 'top 70%', toggleActions: 'play none none reverse' },
      });
      this.cleanup = () => ScrollTrigger.getAll().forEach(t => t.kill());
    });
  }

  ngOnDestroy() { this.cleanup?.(); }
}
