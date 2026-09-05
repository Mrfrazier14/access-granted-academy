import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type ChoiceSeed = { text: string; isCorrect?: boolean };
type QuestionSeed = { prompt: string; choices: ChoiceSeed[] };
type QuizSeed = { title: string; questions: QuestionSeed[] };
type LessonSeed = { slug: string; title: string; content: string; quiz?: QuizSeed };
type ModuleSeed = { slug: string; title: string; summary: string; lessons: LessonSeed[] };
type TrackSeed = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  order: number;
  modules: ModuleSeed[];
};

const itNetworkingTrack: TrackSeed = {
  slug: "it-networking",
  title: "IT & Networking Fundamentals",
  tagline: "The foundation every IT and security career is built on",
  description:
    "Start here if you're new to tech. Covers how computers and operating systems actually work, core networking concepts, and real help desk skills.",
  icon: "server",
  order: 1,
  modules: [
    {
      slug: "computer-os-basics",
      title: "Computer & OS Basics",
      summary: "What's actually happening inside the machine.",
      lessons: [
        {
          slug: "hardware-fundamentals",
          title: "Hardware Fundamentals: Inside a Computer",
          content: `
            <p>Before you can troubleshoot or secure a system, it helps to know what's physically inside it. Every general-purpose computer is built around the same core components:</p>
            <ul>
              <li><strong>CPU (Central Processing Unit)</strong> — the "brain" that executes instructions. Speed is measured in GHz, and modern CPUs have multiple <strong>cores</strong> that let them work on several tasks at once.</li>
              <li><strong>RAM (Random Access Memory)</strong> — fast, temporary storage for whatever the computer is actively working on. RAM is wiped when the machine powers off — that's why unsaved work disappears after a crash.</li>
              <li><strong>Storage (SSD/HDD)</strong> — long-term storage that persists after shutdown. SSDs (solid-state drives) have no moving parts and are much faster than older HDDs (hard disk drives), which store data on spinning magnetic platters.</li>
              <li><strong>Motherboard</strong> — the circuit board that connects every component together and lets them communicate.</li>
              <li><strong>Power Supply Unit (PSU)</strong> — converts electricity from the wall into the specific voltages each component needs.</li>
            </ul>
            <p>A simple way to think about the relationship between these: the CPU does the "thinking," RAM is the desk it's working on (fast, but cleared when you leave), and storage is the filing cabinet (slower, but keeps things permanently). This mental model comes up constantly in IT support — for example, "the computer is slow" often means it's run out of RAM and is swapping to much-slower storage.</p>
          `,
        },
        {
          slug: "operating-systems-command-line",
          title: "Operating Systems & the Command Line",
          content: `
            <p>The <strong>operating system (OS)</strong> — Windows, macOS, or Linux — is the software layer that manages hardware and lets other programs run. It handles memory allocation, file storage, device drivers, and security permissions, so individual applications don't have to manage the hardware directly.</p>
            <p>Every IT and security professional eventually needs to work in a <strong>command line interface (CLI)</strong> instead of clicking through menus, because it's faster, scriptable, and often the only option on a remote server. A few commands that exist (in some form) across almost every OS:</p>
            <ul>
              <li><code>ls</code> (Linux/macOS) or <code>dir</code> (Windows) — list files in a directory.</li>
              <li><code>cd</code> — change the current directory.</li>
              <li><code>ping</code> — test whether a remote host is reachable over the network.</li>
              <li><code>ipconfig</code> (Windows) or <code>ifconfig</code>/<code>ip addr</code> (Linux/macOS) — view network configuration.</li>
              <li><code>ps</code> / Task Manager — view currently running processes.</li>
            </ul>
            <p>Linux in particular is worth extra attention: most servers, cloud infrastructure, and security tools run on Linux, and its file permission system (read/write/execute per user, group, and "everyone else") is a foundational concept you'll see again when studying access control in cybersecurity.</p>
          `,
          quiz: {
            title: "Computer & OS Basics Quiz",
            questions: [
              {
                prompt: "Which component loses its contents when the computer powers off?",
                choices: [
                  { text: "SSD" },
                  { text: "HDD" },
                  { text: "RAM", isCorrect: true },
                  { text: "The motherboard" },
                ],
              },
              {
                prompt: "What is the main job of an operating system?",
                choices: [
                  { text: "To manage hardware and let other programs run", isCorrect: true },
                  { text: "To physically power the CPU" },
                  { text: "To replace the need for a CPU" },
                  { text: "To connect to Wi-Fi only" },
                ],
              },
              {
                prompt: "Why do IT and security professionals rely on the command line?",
                choices: [
                  { text: "It's required to turn on the computer" },
                  { text: "It's faster, scriptable, and often the only option on remote servers", isCorrect: true },
                  { text: "It only works on Windows" },
                  { text: "It replaces the need for an operating system" },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      slug: "networking-essentials",
      title: "Networking Essentials",
      summary: "How devices find and talk to each other.",
      lessons: [
        {
          slug: "ip-addresses-subnets-dns",
          title: "IP Addresses, Subnets, and DNS",
          content: `
            <p>Every device on a network needs an address so other devices know where to send data — that's an <strong>IP address</strong> (e.g., <code>192.168.1.10</code>). A few core concepts:</p>
            <ul>
              <li><strong>Private vs. public IPs</strong> — addresses like <code>192.168.x.x</code> or <code>10.x.x.x</code> are private, used only inside a local network (like your home). Your router translates between your private IPs and a single public IP visible to the internet, using a process called <strong>NAT (Network Address Translation)</strong>.</li>
              <li><strong>Subnets</strong> — a way of dividing a network into smaller sections. A subnet mask (e.g., <code>255.255.255.0</code>) determines which part of an IP address identifies the network vs. the specific device.</li>
              <li><strong>DHCP (Dynamic Host Configuration Protocol)</strong> — automatically assigns IP addresses to devices when they join a network, instead of requiring manual configuration.</li>
              <li><strong>DNS (Domain Name System)</strong> — translates human-friendly domain names (like <code>google.com</code>) into IP addresses computers actually use to connect. DNS is often described as "the phonebook of the internet."</li>
            </ul>
            <p>Understanding this flow matters for both IT support and security: when a user says "the internet is down," the actual problem could be at any layer — no IP address assigned (DHCP issue), can't resolve domain names (DNS issue), or no route to the outside world (routing/NAT issue) — and knowing this model helps you narrow it down quickly.</p>
          `,
        },
        {
          slug: "ports-protocols-troubleshooting",
          title: "Common Ports, Protocols, and Troubleshooting Tools",
          content: `
            <p>Beyond an IP address, network communication also needs a <strong>port</strong> — a number that identifies which specific service on a device should receive the data. A few you'll see constantly:</p>
            <ul>
              <li><strong>Port 80 (HTTP)</strong> and <strong>Port 443 (HTTPS)</strong> — standard web traffic.</li>
              <li><strong>Port 22 (SSH)</strong> — secure remote command-line access to a server.</li>
              <li><strong>Port 53 (DNS)</strong> — domain name resolution.</li>
              <li><strong>Port 3389 (RDP)</strong> — Windows Remote Desktop.</li>
            </ul>
            <p>When something's not working, a small set of tools covers most first-line troubleshooting:</p>
            <ul>
              <li><code>ping</code> — confirms basic connectivity to a host.</li>
              <li><code>tracert</code> (Windows) / <code>traceroute</code> (Linux/macOS) — shows every network hop between you and a destination, useful for finding where a connection is failing.</li>
              <li><code>nslookup</code> / <code>dig</code> — manually queries DNS to confirm a domain resolves correctly.</li>
              <li><code>netstat</code> — shows active network connections and which ports are in use on a machine.</li>
            </ul>
            <p>Knowing which port a service normally uses is also a security fundamental — unexpected open ports, or traffic on unusual ports, is one of the first things analysts check when investigating a potentially compromised system.</p>
          `,
          quiz: {
            title: "Networking Essentials Quiz",
            questions: [
              {
                prompt: "What does DNS primarily do?",
                choices: [
                  { text: "Assigns private IP addresses automatically" },
                  { text: "Translates domain names into IP addresses", isCorrect: true },
                  { text: "Encrypts all network traffic" },
                  { text: "Physically connects network cables" },
                ],
              },
              {
                prompt: "Which port is standard for HTTPS traffic?",
                choices: [
                  { text: "22" },
                  { text: "80" },
                  { text: "443", isCorrect: true },
                  { text: "3389" },
                ],
              },
              {
                prompt: "Which tool shows every network hop between you and a destination?",
                choices: [
                  { text: "ping" },
                  { text: "traceroute / tracert", isCorrect: true },
                  { text: "netstat" },
                  { text: "DHCP" },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      slug: "it-support-skills",
      title: "IT Support Skills",
      summary: "The practical, people-facing side of IT work.",
      lessons: [
        {
          slug: "help-desk-ticketing-customer-service",
          title: "Help Desk Ticketing & Customer Service",
          content: `
            <p>Most IT careers start at the help desk, and technical skill is only half the job — how you communicate with frustrated, non-technical users matters just as much. A few practices that separate strong help desk techs from the rest:</p>
            <ul>
              <li><strong>Active listening</strong> — let the user fully describe the problem before jumping to a solution. What they think is broken and what's actually broken are often different things.</li>
              <li><strong>Clear, jargon-free communication</strong> — explain what you're doing and why, in terms the user understands, especially before taking an action like a restart that will interrupt their work.</li>
              <li><strong>Good ticket documentation</strong> — every ticketing system (Zendesk, Jira Service Management, ServiceNow, etc.) exists so the next person — including future you — can see what was tried and why. A ticket with "fixed it" and no detail is nearly useless six months later.</li>
              <li><strong>Prioritization</strong> — tickets are usually triaged by urgency and impact (a single user's minor issue vs. an outage affecting the whole company), not just first-come-first-served.</li>
            </ul>
            <p>A useful troubleshooting habit: always confirm the fix actually worked from the user's perspective before closing a ticket — "it should be fixed" and "the user confirms it's fixed" are not the same thing.</p>
          `,
        },
        {
          slug: "intro-active-directory-user-management",
          title: "Intro to Active Directory & User Management",
          content: `
            <p><strong>Active Directory (AD)</strong> is Microsoft's system for managing users, computers, and permissions across an organization's network — if you work IT or security at almost any mid-size or larger company, you'll run into it. Core concepts:</p>
            <ul>
              <li><strong>Domain</strong> — a collection of users and computers managed centrally, instead of each machine having its own separate local accounts.</li>
              <li><strong>User accounts</strong> — each employee gets one identity used to log into their computer, email, and other company systems (single sign-on).</li>
              <li><strong>Groups</strong> — users are organized into groups (e.g., "Finance," "IT Admins"), and permissions are granted to groups rather than individuals — much easier to manage at scale.</li>
              <li><strong>Organizational Units (OUs)</strong> — a way of organizing accounts and computers hierarchically, often mirroring company departments, so policies can be applied to a whole department at once.</li>
              <li><strong>Group Policy</strong> — centrally-managed settings (password requirements, software restrictions, screen lock timers) pushed out to every computer in a domain or OU.</li>
            </ul>
            <p>This directly connects to security: the <strong>principle of least privilege</strong> — giving users only the access they actually need for their job, not more — is usually enforced through exactly this kind of group and permission structure. Misconfigured AD permissions are one of the most common ways attackers escalate privileges after an initial breach.</p>
          `,
          quiz: {
            title: "IT Support Skills Quiz",
            questions: [
              {
                prompt: "Why is thorough ticket documentation important?",
                choices: [
                  { text: "It's only needed for legal reasons" },
                  { text: "So future support staff (including yourself) understand what was tried and why", isCorrect: true },
                  { text: "It replaces the need for customer communication" },
                  { text: "Tickets are deleted after closing, so it doesn't matter" },
                ],
              },
              {
                prompt: "In Active Directory, why are permissions typically assigned to groups instead of individual users?",
                choices: [
                  { text: "Individual permissions aren't supported" },
                  { text: "It's far easier to manage access at scale", isCorrect: true },
                  { text: "Groups are required for internet access" },
                  { text: "It disables Group Policy" },
                ],
              },
              {
                prompt: "What does the 'principle of least privilege' mean?",
                choices: [
                  { text: "Give every user administrator access by default" },
                  { text: "Give users only the access they need for their job, nothing more", isCorrect: true },
                  { text: "Remove all permissions from every account" },
                  { text: "Only IT staff should have any account at all" },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      slug: "cloud-virtualization-basics",
      title: "Cloud & Virtualization Basics",
      summary: "How modern infrastructure actually runs.",
      lessons: [
        {
          slug: "intro-virtualization-vms",
          title: "Intro to Virtualization & Virtual Machines",
          content: `
            <p><strong>Virtualization</strong> lets one physical computer run multiple independent "virtual machines" (VMs), each with its own OS, as if it were a separate physical computer. A <strong>hypervisor</strong> is the software layer that makes this possible by sharing the underlying CPU, RAM, and storage across VMs.</p>
            <ul>
              <li><strong>Type 1 hypervisors</strong> (e.g., VMware ESXi, Microsoft Hyper-V, KVM) run directly on hardware — used in data centers and cloud providers.</li>
              <li><strong>Type 2 hypervisors</strong> (e.g., VirtualBox, VMware Workstation) run as an application on top of a normal OS — common for labs and testing on a personal laptop.</li>
            </ul>
            <p>Virtualization is why cloud computing exists at all: instead of buying and racking physical servers, a company can rent a slice of someone else's hardware as a VM. It's also central to security testing — tools like Kali Linux or a deliberately vulnerable practice machine are almost always run as VMs, so you can experiment freely and simply delete/reset the VM if something goes wrong, without touching your real computer.</p>
            <p>A related, lighter-weight concept is <strong>containers</strong> (e.g., Docker) — instead of virtualizing an entire OS, containers package an application with just what it needs to run, sharing the host OS's kernel. Containers start faster and use fewer resources than full VMs, which is why they've become the standard way to deploy modern applications.</p>
          `,
        },
        {
          slug: "intro-cloud-computing",
          title: "Intro to Cloud Computing",
          content: `
            <p>"The cloud" is really just someone else's data center, rented out on demand. The three major providers — <strong>AWS</strong>, <strong>Microsoft Azure</strong>, and <strong>Google Cloud (GCP)</strong> — all offer the same basic idea in different packaging. Cloud services are usually grouped into three models:</p>
            <ul>
              <li><strong>IaaS (Infrastructure as a Service)</strong> — you rent raw virtual machines, storage, and networking, and manage the OS and everything above it yourself (e.g., AWS EC2, Azure Virtual Machines).</li>
              <li><strong>PaaS (Platform as a Service)</strong> — the provider manages the OS and runtime, you just deploy your application code (e.g., Azure App Service, AWS Elastic Beanstalk).</li>
              <li><strong>SaaS (Software as a Service)</strong> — fully managed software you use directly, like Microsoft 365 or Google Workspace.</li>
            </ul>
            <p>The main appeal of cloud computing is <strong>elasticity</strong> — you can scale resources up during high demand and back down afterward, paying only for what you use, instead of buying enough physical hardware to handle your busiest possible day year-round.</p>
            <p>Cloud computing also shifts security responsibility rather than eliminating it — this is called the <strong>Shared Responsibility Model</strong>. The provider secures the underlying infrastructure (physical data centers, hypervisors), but you're still responsible for securing what you put on top: your VM's OS patches, your application code, your access controls, and how you configure storage permissions. Most real-world cloud breaches come from customer misconfiguration, not the provider's infrastructure being hacked.</p>
          `,
          quiz: {
            title: "Cloud & Virtualization Basics Quiz",
            questions: [
              {
                prompt: "What is the main role of a hypervisor?",
                choices: [
                  { text: "It encrypts network traffic" },
                  { text: "It lets one physical machine run multiple virtual machines", isCorrect: true },
                  { text: "It replaces the need for an operating system" },
                  { text: "It is only used for gaming" },
                ],
              },
              {
                prompt: "In the Shared Responsibility Model, who is typically responsible for patching YOUR application code and configuring YOUR storage permissions correctly?",
                choices: [
                  { text: "The cloud provider, always" },
                  { text: "You, the customer", isCorrect: true },
                  { text: "No one — cloud resources patch themselves" },
                  { text: "Only the hypervisor vendor" },
                ],
              },
              {
                prompt: "Which cloud service model gives you managed runtime so you just deploy application code?",
                choices: [
                  { text: "IaaS" },
                  { text: "PaaS", isCorrect: true },
                  { text: "SaaS" },
                  { text: "None of these" },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      slug: "systems-administration",
      title: "Systems Administration",
      summary: "Keeping systems running, patched, and recoverable.",
      lessons: [
        {
          slug: "managing-users-permissions-filesystems",
          title: "Managing Users, Permissions & File Systems",
          content: `
            <p>On Linux systems — which power most servers and cloud infrastructure — every file has an owner (a user) and a group, plus a set of permissions controlling who can <strong>r</strong>ead, <strong>w</strong>rite, or e<strong>x</strong>ecute it. Running <code>ls -l</code> shows this as a string like <code>-rwxr-xr--</code>, broken into three groups of three: permissions for the owner, the group, and everyone else.</p>
            <ul>
              <li><code>chmod</code> — changes a file's permissions (e.g., <code>chmod 755 script.sh</code>).</li>
              <li><code>chown</code> — changes which user/group owns a file.</li>
              <li><code>sudo</code> — temporarily run a single command with administrator (root) privileges, instead of permanently logging in as root — a direct application of least privilege.</li>
            </ul>
            <p>User management follows the same logic as Active Directory from a system level: each person gets their own account (never share logins — it destroys accountability), and permissions are granted as narrowly as the job requires. A sysadmin's daily work is largely this: provisioning accounts, adjusting permissions, and making sure no one has more access than they need — because every unnecessary permission is one more thing an attacker could abuse if that account is ever compromised.</p>
          `,
        },
        {
          slug: "backups-patching-disaster-recovery",
          title: "Backups, Patching, and Disaster Recovery Basics",
          content: `
            <p>Three unglamorous habits prevent more real-world disasters than almost anything else in IT:</p>
            <ul>
              <li><strong>Backups</strong> — regular, tested copies of important data stored somewhere separate from the original (ideally following the <strong>3-2-1 rule</strong>: 3 copies, on 2 different types of media, with 1 copy off-site). A backup you've never tested restoring is not a real backup.</li>
              <li><strong>Patching</strong> — regularly applying security updates to operating systems and software. Most large-scale breaches exploit vulnerabilities that already had a patch available — the failure wasn't a lack of a fix, it was a delay in applying it.</li>
              <li><strong>Disaster recovery (DR) planning</strong> — a documented plan for restoring operations after a major incident (ransomware, hardware failure, natural disaster). Two key metrics: <strong>RTO (Recovery Time Objective)</strong> — how long you can be down, and <strong>RPO (Recovery Point Objective)</strong> — how much data loss (measured in time) is acceptable.</li>
            </ul>
            <p>Ransomware response is the clearest modern example of why all three matter together: with tested, isolated backups and a rehearsed DR plan, a ransomware infection is a bad afternoon of restoring from backup. Without them, it can be a company-ending event.</p>
          `,
          quiz: {
            title: "Systems Administration Quiz",
            questions: [
              {
                prompt: "What does the 3-2-1 backup rule recommend?",
                choices: [
                  { text: "3 backups per day" },
                  { text: "3 copies of data, on 2 media types, with 1 copy off-site", isCorrect: true },
                  { text: "Backups only once every 3 months" },
                  { text: "1 copy is always enough if it's encrypted" },
                ],
              },
              {
                prompt: "Why is patching important even when systems seem to be working fine?",
                choices: [
                  { text: "It makes the UI look nicer" },
                  { text: "Most breaches exploit known vulnerabilities a patch already fixed", isCorrect: true },
                  { text: "It's only cosmetic and doesn't affect security" },
                  { text: "Patches are optional and rarely relevant" },
                ],
              },
              {
                prompt: "What does RTO (Recovery Time Objective) measure?",
                choices: [
                  { text: "How much data loss is acceptable" },
                  { text: "How long the business can tolerate being down", isCorrect: true },
                  { text: "How many backups to keep" },
                  { text: "The speed of the network" },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      slug: "it-career-path",
      title: "IT Career & Certifications Path",
      summary: "Turning these fundamentals into a real career.",
      lessons: [
        {
          slug: "it-career-certification-roadmap",
          title: "Building an IT Career: Certification Roadmap",
          content: `
            <p>Most successful IT careers follow a recognizable pattern: hands-on help desk or support experience, paired with certifications that validate what you've learned. A common early roadmap:</p>
            <ul>
              <li><strong>CompTIA A+</strong> — foundational hardware, OS, and troubleshooting knowledge. The traditional entry point into IT.</li>
              <li><strong>CompTIA Network+</strong> — builds on A+ with deeper networking concepts (the IP addressing, subnetting, and protocols covered earlier in this track).</li>
              <li><strong>CompTIA Security+</strong> — the standard entry-level cybersecurity certification, often required for many government and contractor security roles.</li>
            </ul>
            <p>From there, career paths typically branch based on interest: deeper into security (SOC analyst, penetration testing, GRC), into systems/cloud administration (Linux, AWS/Azure certifications), or into networking (Cisco's CCNA and beyond). What matters most early on isn't picking the "perfect" path — it's building genuine hands-on experience (a home lab, volunteer IT work, an internship) alongside whichever certification you're studying for, since employers consistently value demonstrated hands-on ability over a certification alone.</p>
          `,
        },
        {
          slug: "documentation-automation-scripting-basics",
          title: "Documentation, Automation, and Scripting Basics for IT",
          content: `
            <p>As IT professionals grow past entry-level tasks, one skill consistently separates them from their peers: the ability to automate repetitive work instead of doing it by hand every time. You don't need to become a full software engineer — basic scripting goes a long way:</p>
            <ul>
              <li><strong>Bash</strong> (Linux/macOS) and <strong>PowerShell</strong> (Windows) let you automate routine tasks — bulk-creating user accounts, checking disk space across many servers, or restarting a service on a schedule.</li>
              <li><strong>Good documentation</strong> is what makes automation safe to rely on — a script with no comments or README explaining what it does and why becomes a liability the moment its author leaves or forgets.</li>
              <li><strong>Version control (Git)</strong> isn't just for developers — many IT teams now track their infrastructure scripts and configuration in Git too, so changes are reviewable and reversible.</li>
            </ul>
            <p>This is also where IT and software engineering skills start to overlap — the discipline of "infrastructure as code" (managing servers and configuration through version-controlled scripts instead of manual clicking) is one of the most in-demand skills across both IT operations and DevOps roles today.</p>
          `,
          quiz: {
            title: "IT Career & Certifications Path Quiz",
            questions: [
              {
                prompt: "Which CompTIA certification is generally considered the traditional entry point into IT?",
                choices: [
                  { text: "Security+" },
                  { text: "A+", isCorrect: true },
                  { text: "Network+" },
                  { text: "CMMC-RP" },
                ],
              },
              {
                prompt: "What is the main benefit of automating repetitive IT tasks with scripts?",
                choices: [
                  { text: "It removes the need for any documentation" },
                  { text: "It saves time and reduces human error on repeated work", isCorrect: true },
                  { text: "It's required to get an IT job" },
                  { text: "It only works for security tasks" },
                ],
              },
              {
                prompt: "What do employers consistently value alongside certifications?",
                choices: [
                  { text: "Certifications alone are always sufficient" },
                  { text: "Demonstrated hands-on experience", isCorrect: true },
                  { text: "Avoiding any scripting knowledge" },
                  { text: "Working only with Windows systems" },
                ],
              },
            ],
          },
        },
      ],
    },
  ],
};

const cybersecurityTrack: TrackSeed = {
  slug: "cybersecurity",
  title: "Cybersecurity Fundamentals",
  tagline: "Think like a defender (and an attacker)",
  description:
    "A hands-on introduction to cybersecurity — covering core concepts, network security, and the frameworks security analysts use every day.",
  icon: "shield",
  order: 2,
  modules: [
    {
      slug: "security-foundations",
      title: "Security Foundations",
      summary: "The core concepts every security professional builds on.",
      lessons: [
        {
          slug: "what-is-cybersecurity",
          title: "What Is Cybersecurity? The CIA Triad",
          content: `
            <p>Cybersecurity is the practice of protecting systems, networks, and data from unauthorized access, damage, or disruption. Almost every decision a security professional makes comes back to three core goals, known as the <strong>CIA Triad</strong>:</p>
            <ul>
              <li><strong>Confidentiality</strong> — only authorized people can access the data. Encryption, access controls, and authentication all protect confidentiality.</li>
              <li><strong>Integrity</strong> — data hasn't been tampered with or corrupted, whether by an attacker or an accident. Hashing and checksums help verify integrity.</li>
              <li><strong>Availability</strong> — systems and data are accessible when needed. Backups, redundancy, and DDoS protection all support availability.</li>
            </ul>
            <p>Every security control you'll learn about — firewalls, encryption, multi-factor authentication, backups — exists to protect one or more sides of this triad. When you're evaluating a new vulnerability or designing a defense, ask yourself: <em>which part of the CIA triad is at risk here?</em></p>
            <p>It's also useful to understand the flip side: <strong>risk</strong>. Security isn't about eliminating all risk (that's impossible) — it's about identifying what could go wrong, how likely it is, how bad the impact would be, and then applying controls that bring that risk down to an acceptable level.</p>
          `,
        },
        {
          slug: "common-threats",
          title: "Common Threats & Attack Vectors",
          content: `
            <p>Attackers have a wide toolbox, but most attacks fall into a handful of common categories:</p>
            <ul>
              <li><strong>Phishing</strong> — tricking a person into clicking a malicious link, opening an infected attachment, or handing over credentials, usually via email or text message.</li>
              <li><strong>Malware</strong> — malicious software including viruses, worms, ransomware, and spyware, designed to damage systems or steal data.</li>
              <li><strong>Social engineering</strong> — manipulating people (not systems) into breaking normal security procedures, often by impersonating a trusted person or authority.</li>
              <li><strong>Man-in-the-middle (MITM)</strong> — intercepting communication between two parties, often on unsecured networks, to eavesdrop or alter data in transit.</li>
              <li><strong>SQL injection</strong> — inserting malicious database queries through an application's input fields to read or modify data it shouldn't have access to.</li>
              <li><strong>Denial of Service (DoS/DDoS)</strong> — flooding a system with traffic or requests until it can no longer serve legitimate users, directly attacking availability.</li>
            </ul>
            <p>Notice that these threats target different parts of the CIA triad. Phishing and SQL injection usually target confidentiality. Ransomware targets both confidentiality and availability. DDoS attacks target availability directly. Understanding <em>what</em> an attack targets helps you understand <em>why</em> a particular defense works against it.</p>
          `,
          quiz: {
            title: "Security Foundations Quiz",
            questions: [
              {
                prompt: "Which part of the CIA Triad is a DDoS attack primarily targeting?",
                choices: [
                  { text: "Confidentiality" },
                  { text: "Integrity" },
                  { text: "Availability", isCorrect: true },
                  { text: "Authentication" },
                ],
              },
              {
                prompt: "Tricking an employee into clicking a malicious email link is an example of:",
                choices: [
                  { text: "SQL injection" },
                  { text: "Phishing", isCorrect: true },
                  { text: "A firewall bypass" },
                  { text: "A checksum failure" },
                ],
              },
              {
                prompt: "Encrypting a file so only authorized users can read it primarily protects:",
                choices: [
                  { text: "Availability" },
                  { text: "Confidentiality", isCorrect: true },
                  { text: "Non-repudiation only" },
                  { text: "Physical security" },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      slug: "network-security-basics",
      title: "Network Security Basics",
      summary: "How networks communicate, and how to secure that communication.",
      lessons: [
        {
          slug: "how-networks-communicate",
          title: "How Networks Communicate: TCP/IP Basics",
          content: `
            <p>Every request you make on the internet — loading a webpage, sending an email, streaming a video — travels through layers of networking protocols, most commonly described using the <strong>TCP/IP model</strong>:</p>
            <ul>
              <li><strong>Application layer</strong> — the protocols apps actually use, like HTTP/HTTPS, DNS, and SMTP.</li>
              <li><strong>Transport layer</strong> — TCP (reliable, ordered delivery) or UDP (fast, no delivery guarantee) break data into segments and manage delivery.</li>
              <li><strong>Internet layer</strong> — IP addresses and routing get your data across networks to the right destination.</li>
              <li><strong>Network access layer</strong> — the physical and data-link protocols (Ethernet, Wi-Fi) that move bits across a local network.</li>
            </ul>
            <p>A useful way to understand security tools is to ask which layer they operate at. A firewall filtering by IP address and port is working at the internet/transport layer. A web application firewall inspecting HTTP requests is working at the application layer. Attacks and defenses exist at every layer, so a strong security posture needs controls at multiple layers — this is called <strong>defense in depth</strong>.</p>
          `,
        },
        {
          slug: "firewalls-vpns-segmentation",
          title: "Firewalls, VPNs, and Segmentation",
          content: `
            <p>Once you understand how data moves across a network, you can start applying controls to protect it:</p>
            <ul>
              <li><strong>Firewalls</strong> — filter traffic based on rules (source/destination IP, port, protocol). Modern firewalls can also inspect traffic content (next-gen firewalls / web application firewalls).</li>
              <li><strong>VPNs (Virtual Private Networks)</strong> — create an encrypted tunnel between two points, so traffic crossing an untrusted network (like public Wi-Fi) stays confidential.</li>
              <li><strong>Network segmentation</strong> — dividing a network into smaller zones (e.g., separating guest Wi-Fi from internal servers) so that if one zone is compromised, the attacker can't automatically reach every other zone.</li>
              <li><strong>Zero Trust</strong> — a modern security model that assumes no user or device should be trusted by default, even if it's already inside the network perimeter — every request is verified.</li>
            </ul>
            <p>These controls work together. A firewall might block unauthorized inbound connections, a VPN protects data leaving the network, and segmentation limits how far an attacker can move if they do get in (this lateral movement limitation is a key goal of segmentation).</p>
          `,
          quiz: {
            title: "Network Security Basics Quiz",
            questions: [
              {
                prompt: "Which TCP/IP layer do IP addresses and routing belong to?",
                choices: [
                  { text: "Application layer" },
                  { text: "Transport layer" },
                  { text: "Internet layer", isCorrect: true },
                  { text: "Network access layer" },
                ],
              },
              {
                prompt: "What is the main security benefit of network segmentation?",
                choices: [
                  { text: "It makes Wi-Fi faster" },
                  { text: "It limits how far an attacker can move after a breach", isCorrect: true },
                  { text: "It replaces the need for firewalls" },
                  { text: "It encrypts all outbound traffic" },
                ],
              },
              {
                prompt: "A VPN primarily protects data by:",
                choices: [
                  { text: "Blocking all inbound connections" },
                  { text: "Creating an encrypted tunnel for data in transit", isCorrect: true },
                  { text: "Scanning files for malware" },
                  { text: "Segmenting internal servers" },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      slug: "practical-security-skills",
      title: "Practical Security Skills",
      summary: "Authentication practices and the frameworks analysts use daily.",
      lessons: [
        {
          slug: "password-security-authentication",
          title: "Password Security & Authentication",
          content: `
            <p>Authentication answers the question "are you who you say you are?" It's built on one or more of three factors:</p>
            <ul>
              <li><strong>Something you know</strong> — a password or PIN.</li>
              <li><strong>Something you have</strong> — a phone, hardware key, or authenticator app.</li>
              <li><strong>Something you are</strong> — a fingerprint or face scan (biometrics).</li>
            </ul>
            <p><strong>Multi-Factor Authentication (MFA)</strong> combines two or more of these factors, so a stolen password alone isn't enough to compromise an account. This is one of the single highest-impact security controls an individual or organization can enable.</p>
            <p>On the password side, best practices have shifted over the years. Current guidance favors:</p>
            <ul>
              <li>Long, unique passwords (or passphrases) for every account — reused passwords mean one breach compromises many accounts.</li>
              <li>A password manager to generate and store unique passwords, since no one can memorize dozens of strong passwords.</li>
              <li>Passwords are never stored in plain text on well-designed systems — they're <strong>hashed</strong> (run through a one-way function) and often <strong>salted</strong> (a random value added before hashing) so that even if a database is stolen, the original passwords aren't directly exposed.</li>
            </ul>
          `,
        },
        {
          slug: "intro-mitre-attack",
          title: "Intro to the MITRE ATT&CK Framework",
          content: `
            <p><strong>MITRE ATT&CK</strong> is a globally accessible knowledge base of real-world adversary tactics and techniques, organized into a matrix. It's one of the most widely used frameworks in the security industry — you'll see it referenced in SOC tooling, threat intel reports, and incident response playbooks.</p>
            <p>ATT&CK is organized around <strong>tactics</strong> (the attacker's goal at a given stage, like "Initial Access" or "Privilege Escalation") and <strong>techniques</strong> (the specific method used to achieve that goal, like "Phishing" or "Exploitation of Remote Services"). A few example tactics, in a rough attack lifecycle order:</p>
            <ul>
              <li><strong>Initial Access</strong> — how the attacker first gets into the environment (e.g., phishing).</li>
              <li><strong>Execution</strong> — running malicious code on a target system.</li>
              <li><strong>Persistence</strong> — maintaining access even after a reboot or credential change.</li>
              <li><strong>Privilege Escalation</strong> — gaining higher-level permissions than originally obtained.</li>
              <li><strong>Lateral Movement</strong> — moving from one system to another inside the network.</li>
              <li><strong>Exfiltration</strong> — stealing data out of the environment.</li>
            </ul>
            <p>When a Security Operations Center (SOC) analyst investigates an alert, mapping the observed activity to specific ATT&CK techniques helps them understand what stage of an attack they're looking at, and what the attacker is likely to try next.</p>
          `,
          quiz: {
            title: "Practical Security Skills Quiz",
            questions: [
              {
                prompt: "Multi-Factor Authentication (MFA) is effective because it:",
                choices: [
                  { text: "Requires more than one type of proof of identity", isCorrect: true },
                  { text: "Encrypts the entire network" },
                  { text: "Replaces the need for passwords entirely" },
                  { text: "Only works on biometric devices" },
                ],
              },
              {
                prompt: "Why are passwords hashed instead of stored in plain text?",
                choices: [
                  { text: "Hashing makes login faster" },
                  { text: "So a stolen database doesn't directly expose the original passwords", isCorrect: true },
                  { text: "It's required for MFA to work" },
                  { text: "It compresses the database size" },
                ],
              },
              {
                prompt: "In MITRE ATT&CK, moving from one compromised system to another inside a network is called:",
                choices: [
                  { text: "Initial Access" },
                  { text: "Exfiltration" },
                  { text: "Lateral Movement", isCorrect: true },
                  { text: "Persistence" },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      slug: "application-web-security",
      title: "Application & Web Security",
      summary: "Where most real-world breaches actually happen.",
      lessons: [
        {
          slug: "owasp-top-10-overview",
          title: "OWASP Top 10 Overview",
          content: `
            <p>The <strong>OWASP Top 10</strong> is the most widely referenced list of critical web application security risks, maintained by the Open Worldwide Application Security Project and updated periodically based on real-world data. It's the closest thing the industry has to a "most important vulnerabilities" checklist. A few consistently at the top:</p>
            <ul>
              <li><strong>Broken Access Control</strong> — users able to act outside their intended permissions, e.g., accessing another user's data by changing an ID in a URL.</li>
              <li><strong>Injection</strong> (including SQL injection) — untrusted input gets interpreted as code/commands by the application or database.</li>
              <li><strong>Cryptographic Failures</strong> — sensitive data exposed due to weak or missing encryption, both at rest and in transit.</li>
              <li><strong>Security Misconfiguration</strong> — default credentials left in place, unnecessary features enabled, overly detailed error messages leaking system information.</li>
              <li><strong>Vulnerable and Outdated Components</strong> — using libraries or frameworks with known, unpatched vulnerabilities.</li>
            </ul>
            <p>The OWASP Top 10 is valuable for two different audiences: developers use it as a checklist of what to guard against while building, and security analysts/pentesters use it as a checklist of what to test for. Whichever side you're on, it's one of the highest-value lists to be genuinely familiar with in this field.</p>
          `,
        },
        {
          slug: "secure-coding-basics",
          title: "Secure Coding Basics for Developers",
          content: `
            <p>Most of the OWASP Top 10 can be significantly reduced with a handful of consistent coding habits:</p>
            <ul>
              <li><strong>Never trust user input</strong> — validate and sanitize everything coming from a user, even data that "should" already be safe (like values from a dropdown, which a user can still manipulate directly via the network request).</li>
              <li><strong>Use parameterized queries</strong>, never string-concatenate user input directly into a SQL query — this is the single most effective defense against SQL injection.</li>
              <li><strong>Enforce access control server-side</strong> — check permissions on every request on the backend, never rely on hiding a button in the UI as your only protection.</li>
              <li><strong>Keep dependencies updated</strong> — regularly update libraries and frameworks, and use tools that alert you to known vulnerabilities in your dependencies.</li>
              <li><strong>Fail securely</strong> — error messages shown to users should be generic ("Something went wrong"), while detailed technical errors go only to internal logs, never to the end user.</li>
            </ul>
            <p>The common thread across all of these: security isn't a separate feature you bolt on at the end — it's a set of habits applied continuously while you write ordinary application code.</p>
          `,
          quiz: {
            title: "Application & Web Security Quiz",
            questions: [
              {
                prompt: "What is 'Broken Access Control' in the OWASP Top 10?",
                choices: [
                  { text: "A server that is physically broken" },
                  { text: "Users able to act outside their intended permissions", isCorrect: true },
                  { text: "A slow database query" },
                  { text: "An expired SSL certificate" },
                ],
              },
              {
                prompt: "What is the most effective defense against SQL injection?",
                choices: [
                  { text: "Hiding the database behind a firewall only" },
                  { text: "Using parameterized queries instead of string-concatenating input", isCorrect: true },
                  { text: "Showing detailed SQL errors to the user" },
                  { text: "Disabling HTTPS" },
                ],
              },
              {
                prompt: "Where should access control (permission checks) always be enforced?",
                choices: [
                  { text: "Only in the front-end UI" },
                  { text: "On the server, for every request", isCorrect: true },
                  { text: "Only during initial login" },
                  { text: "It doesn't need to be enforced if the UI hides the option" },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      slug: "security-operations",
      title: "Security Operations",
      summary: "What a SOC analyst actually does day to day.",
      lessons: [
        {
          slug: "siem-logging-alert-triage",
          title: "SIEM, Logging, and Alert Triage Basics",
          content: `
            <p>A <strong>SIEM (Security Information and Event Management)</strong> platform collects logs from across an organization's systems — firewalls, servers, endpoints, applications — into one place, so security analysts can search across everything at once instead of checking dozens of systems individually. Common SIEM platforms include Splunk, Microsoft Sentinel, and Elastic Security.</p>
            <p>A typical SOC (Security Operations Center) analyst's day revolves around <strong>alert triage</strong>:</p>
            <ul>
              <li>The SIEM generates an alert based on a rule (e.g., "5 failed logins followed by a success" or "unusual outbound data transfer").</li>
              <li>The analyst investigates: is this expected behavior, a false positive, or a real threat? This usually means checking related logs, the user/device history, and threat intelligence sources.</li>
              <li>The analyst assigns a <strong>severity</strong> and either closes the alert (false positive, with notes for tuning the rule) or escalates it into a formal incident.</li>
            </ul>
            <p>A huge part of this job is dealing with <strong>alert fatigue</strong> — a poorly tuned SIEM can generate hundreds of low-value alerts a day, burying the real threats. Learning to write and refine detection rules so alerts are high-signal is one of the most valuable skills a SOC analyst develops over time.</p>
          `,
        },
        {
          slug: "incident-response-lifecycle",
          title: "Incident Response Lifecycle",
          content: `
            <p>When an alert is confirmed as a real security incident, response follows a well-established lifecycle (commonly based on NIST's framework):</p>
            <ul>
              <li><strong>Preparation</strong> — having tools, playbooks, and trained people ready before an incident happens (the work you do on a quiet Tuesday is what makes a 3am incident survivable).</li>
              <li><strong>Detection &amp; Analysis</strong> — identifying that an incident is occurring and understanding its scope.</li>
              <li><strong>Containment</strong> — stopping the incident from spreading further, e.g., isolating an infected machine from the network.</li>
              <li><strong>Eradication</strong> — removing the actual cause (malware, unauthorized access, a vulnerable configuration).</li>
              <li><strong>Recovery</strong> — safely restoring affected systems to normal operation.</li>
              <li><strong>Lessons Learned</strong> — a post-incident review documenting what happened and how to prevent it (or respond faster) next time.</li>
            </ul>
            <p>A common mistake outside of trained teams is jumping straight to eradication (e.g., wiping a machine) before containment and analysis are complete — which can destroy evidence needed to understand how the attacker got in, and means you might not close the actual entry point they used.</p>
          `,
          quiz: {
            title: "Security Operations Quiz",
            questions: [
              {
                prompt: "What is the main purpose of a SIEM platform?",
                choices: [
                  { text: "To encrypt all company email" },
                  { text: "To collect and centralize logs so analysts can search and correlate across systems", isCorrect: true },
                  { text: "To replace the need for firewalls" },
                  { text: "To automatically fix all vulnerabilities" },
                ],
              },
              {
                prompt: "What is 'alert fatigue' in a SOC?",
                choices: [
                  { text: "Analysts getting tired from too many low-value alerts, risking missed real threats", isCorrect: true },
                  { text: "A SIEM running out of storage" },
                  { text: "A firewall blocking too much traffic" },
                  { text: "A type of malware" },
                ],
              },
              {
                prompt: "In the incident response lifecycle, what comes before Eradication?",
                choices: [
                  { text: "Lessons Learned" },
                  { text: "Recovery" },
                  { text: "Containment", isCorrect: true },
                  { text: "Nothing — Eradication is always first" },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      slug: "grc-and-career",
      title: "Governance, Risk & Compliance, and Your Career",
      summary: "The frameworks employers expect you to know, and how to break in.",
      lessons: [
        {
          slug: "common-compliance-frameworks",
          title: "Common Compliance Frameworks",
          content: `
            <p>Beyond technical controls, organizations must often prove their security practices meet external standards — this is the world of <strong>Governance, Risk, and Compliance (GRC)</strong>. A few frameworks that come up constantly:</p>
            <ul>
              <li><strong>NIST Cybersecurity Framework (CSF)</strong> — a widely used, flexible framework organized around five functions: Identify, Protect, Detect, Respond, Recover.</li>
              <li><strong>ISO 27001</strong> — an international standard for information security management systems, often required for companies doing business globally.</li>
              <li><strong>CMMC (Cybersecurity Maturity Model Certification)</strong> — required for companies in the U.S. Department of Defense supply chain, with maturity levels reflecting how rigorously security controls are implemented and verified.</li>
              <li><strong>SOC 2</strong> — an audit framework many SaaS companies pursue to prove to customers that they handle data securely.</li>
            </ul>
            <p>You don't need to memorize every control in every framework to start a GRC-adjacent career — what matters is understanding that these frameworks exist to translate "we are secure" from a vague claim into something independently verifiable, and that compliance and actual security, while related, aren't the same thing: it's possible to be compliant on paper while still having real gaps, which is exactly why frameworks keep evolving.</p>
          `,
        },
        {
          slug: "cybersecurity-career-roadmap",
          title: "Building a Career in Cybersecurity: Certifications Roadmap",
          content: `
            <p>Cybersecurity careers branch in several directions, but most successful paths share a similar early foundation: IT fundamentals, hands-on practice, and stacking certifications that match the direction you want to go.</p>
            <ul>
              <li><strong>CompTIA Security+</strong> — the standard entry-level cert, often a baseline requirement for government/contractor roles.</li>
              <li><strong>SOC analyst path</strong> — Security+ → hands-on SIEM/detection practice → certifications like Splunk or vendor-specific SOC training.</li>
              <li><strong>Offensive security path</strong> (penetration testing) — Security+ → hands-on labs (like the coding and lab exercises in this Academy) → certifications like CompTIA PenTest+ or OSCP as you advance.</li>
              <li><strong>GRC path</strong> — Security+ → certifications like CISM or CRISC as you gain experience, often paired with strong writing and communication skills.</li>
            </ul>
            <p>Across every path, the same advice holds: build a home lab, practice consistently (this is exactly why hands-on coding problems and quizzes matter more than passively reading), and don't wait for a "perfect" resume to start applying — most people break into the field through a help desk or junior analyst role and grow from there.</p>
          `,
          quiz: {
            title: "Governance, Risk & Compliance Quiz",
            questions: [
              {
                prompt: "What are the five functions of the NIST Cybersecurity Framework?",
                choices: [
                  { text: "Buy, Install, Configure, Monitor, Delete" },
                  { text: "Identify, Protect, Detect, Respond, Recover", isCorrect: true },
                  { text: "Plan, Build, Test, Deploy, Retire" },
                  { text: "Scan, Patch, Audit, Report, Archive" },
                ],
              },
              {
                prompt: "Is being 'compliant' with a framework always the same as being fully secure?",
                choices: [
                  { text: "Yes, compliance guarantees there are no security gaps" },
                  { text: "No — compliance and actual security are related but not identical", isCorrect: true },
                  { text: "Compliance frameworks don't relate to security at all" },
                  { text: "Only ISO 27001 guarantees full security" },
                ],
              },
              {
                prompt: "What is a common entry-level certification shared across most cybersecurity career paths?",
                choices: [
                  { text: "OSCP" },
                  { text: "CompTIA Security+", isCorrect: true },
                  { text: "CISM" },
                  { text: "CMMC Level 3 only" },
                ],
              },
            ],
          },
        },
      ],
    },
  ],
};

const softwareEngineeringTrack: TrackSeed = {
  slug: "software-engineering",
  title: "Software Engineering & Full Stack Dev",
  tagline: "From how the web works to shipping real code",
  description:
    "A practical path through full stack fundamentals — how the web works, front end vs. back end, and the engineering practices that separate hobby code from professional software.",
  icon: "code",
  order: 3,
  modules: [
    {
      slug: "programming-foundations",
      title: "Programming Foundations",
      summary: "The building blocks behind every application you'll ever build.",
      lessons: [
        {
          slug: "how-the-web-works",
          title: "How the Web Works: Client-Server & HTTP",
          content: `
            <p>Almost every app you use is built on the same basic pattern: a <strong>client</strong> (your browser or phone app) sends a request to a <strong>server</strong>, and the server sends back a response. This is the <strong>client-server model</strong>.</p>
            <p>That communication almost always happens over <strong>HTTP</strong> (HyperText Transfer Protocol), or its encrypted version, <strong>HTTPS</strong>. A few core pieces of HTTP you'll use constantly as a developer:</p>
            <ul>
              <li><strong>Methods</strong> — <code>GET</code> (retrieve data), <code>POST</code> (create data), <code>PUT/PATCH</code> (update data), <code>DELETE</code> (remove data).</li>
              <li><strong>Status codes</strong> — <code>200</code> (success), <code>201</code> (created), <code>400</code> (bad request), <code>401</code> (not authenticated), <code>404</code> (not found), <code>500</code> (server error).</li>
              <li><strong>Headers</strong> — metadata about the request/response, like content type or authentication tokens.</li>
              <li><strong>Body</strong> — the actual data being sent, often formatted as JSON.</li>
            </ul>
            <p>When you visit a website, your browser sends a <code>GET</code> request for an HTML page. When you submit a form, your browser typically sends a <code>POST</code> request with the form data in the body. Understanding this request/response cycle is the foundation for everything else in web development — front end, back end, and APIs all build on it.</p>
          `,
        },
        {
          slug: "variables-functions-control-flow",
          title: "Variables, Functions & Control Flow",
          content: `
            <p>Regardless of which language you use, almost all programming logic is built from the same small set of concepts:</p>
            <ul>
              <li><strong>Variables</strong> — named containers that store a value (a number, string, object, etc.) so you can reference and reuse it.</li>
              <li><strong>Functions</strong> — reusable blocks of logic that take input (parameters), do something, and often return an output. Breaking a program into functions makes it easier to read, test, and reuse.</li>
              <li><strong>Conditionals</strong> — <code>if / else</code> statements that let your program make decisions and take different paths depending on the data.</li>
              <li><strong>Loops</strong> — <code>for</code> and <code>while</code> constructs that repeat a block of code, usually to process a collection of data (like a list of users).</li>
              <li><strong>Data structures</strong> — arrays/lists (ordered collections) and objects/dictionaries (key-value pairs) are the two you'll use constantly to organize data in memory.</li>
            </ul>
            <p>Here's a small example in JavaScript that ties these together — a function that loops through a list of users and returns only the active ones:</p>
            <pre><code>function getActiveUsers(users) {
  const active = [];
  for (const user of users) {
    if (user.isActive) {
      active.push(user);
    }
  }
  return active;
}</code></pre>
            <p>Every framework and library you'll learn is ultimately built on top of these same fundamentals — mastering them well makes everything else easier to pick up.</p>
          `,
          quiz: {
            title: "Programming Foundations Quiz",
            questions: [
              {
                prompt: "Which HTTP method is typically used to submit new data to a server?",
                choices: [
                  { text: "GET" },
                  { text: "POST", isCorrect: true },
                  { text: "HEAD" },
                  { text: "OPTIONS" },
                ],
              },
              {
                prompt: "An HTTP status code of 404 means:",
                choices: [
                  { text: "The server had an internal error" },
                  { text: "The request succeeded" },
                  { text: "The requested resource wasn't found", isCorrect: true },
                  { text: "The user isn't authenticated" },
                ],
              },
              {
                prompt: "What is the main purpose of a function in programming?",
                choices: [
                  { text: "To store a single value permanently" },
                  { text: "To repeat a block of code infinitely" },
                  { text: "To bundle reusable logic that can take input and return output", isCorrect: true },
                  { text: "To style a web page" },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      slug: "full-stack-basics",
      title: "Full Stack Basics",
      summary: "Where the front end ends and the back end begins.",
      lessons: [
        {
          slug: "front-end-vs-back-end",
          title: "Front End vs. Back End",
          content: `
            <p>A "full stack" developer works across both major halves of a web application:</p>
            <ul>
              <li><strong>Front end</strong> — everything that runs in the user's browser: HTML (structure), CSS (styling), and JavaScript (behavior/interactivity). Frameworks like React or Next.js help organize front-end code into reusable components.</li>
              <li><strong>Back end</strong> — the server-side code that handles business logic, talks to the database, enforces security rules, and returns data to the front end. Common back-end technologies include Node.js, Python (with frameworks like FastAPI or Django), and databases like PostgreSQL.</li>
            </ul>
            <p>The front end and back end communicate over an <strong>API</strong> (Application Programming Interface) — typically the front end sends HTTP requests to back-end API routes, and the back end responds with data (usually JSON).</p>
            <p>A useful mental model: the front end is responsible for <em>what the user sees and interacts with</em>, and the back end is responsible for <em>what's true and allowed</em>. Never trust the front end alone to enforce security or business rules — a user can always modify or bypass front-end code, so the back end must independently validate everything.</p>
          `,
        },
        {
          slug: "apis-and-databases",
          title: "Working with APIs and Databases",
          content: `
            <p>Most full stack applications follow a similar data flow:</p>
            <ol>
              <li>The front end sends a request to an API route (e.g., <code>POST /api/register</code>).</li>
              <li>The back end validates the request (is the data well-formed? Is the user authorized?).</li>
              <li>The back end reads or writes data in a <strong>database</strong>.</li>
              <li>The back end sends a response back to the front end, usually as JSON.</li>
            </ol>
            <p>Databases generally fall into two categories:</p>
            <ul>
              <li><strong>Relational (SQL)</strong> databases like PostgreSQL or MySQL organize data into tables with defined relationships between them — great for structured data with clear relationships (like users, orders, and products).</li>
              <li><strong>NoSQL</strong> databases like MongoDB store more flexible, document-based data — useful when your data doesn't fit neatly into rigid tables.</li>
            </ul>
            <p>Rather than writing raw SQL by hand for every query, many developers use an <strong>ORM</strong> (Object-Relational Mapper) like Prisma, which lets you define your database schema in code and query it using regular programming language syntax instead of raw SQL strings — this app you're learning on is itself built with Prisma and PostgreSQL.</p>
          `,
          quiz: {
            title: "Full Stack Basics Quiz",
            questions: [
              {
                prompt: "Which of these is a front-end responsibility?",
                choices: [
                  { text: "Enforcing that a user is authorized to delete data" },
                  { text: "Rendering the UI and handling user interaction", isCorrect: true },
                  { text: "Storing hashed passwords" },
                  { text: "Running database migrations" },
                ],
              },
              {
                prompt: "Why should the back end re-validate data even if the front end already validated it?",
                choices: [
                  { text: "The front end can always be modified or bypassed by a user", isCorrect: true },
                  { text: "Front-end validation is always sufficient" },
                  { text: "It improves front-end performance" },
                  { text: "It's required by HTTP" },
                ],
              },
              {
                prompt: "What is the main benefit of using an ORM like Prisma?",
                choices: [
                  { text: "It eliminates the need for a database" },
                  { text: "It lets you query the database using your programming language instead of raw SQL", isCorrect: true },
                  { text: "It replaces the front end entirely" },
                  { text: "It automatically writes your business logic" },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      slug: "engineering-practices",
      title: "Engineering Practices",
      summary: "The habits that separate professional software from hobby code.",
      lessons: [
        {
          slug: "version-control-with-git",
          title: "Version Control with Git",
          content: `
            <p><strong>Git</strong> is a version control system that tracks changes to your code over time, letting you experiment safely, collaborate with others, and roll back mistakes. A few core concepts:</p>
            <ul>
              <li><strong>Repository (repo)</strong> — the project folder Git is tracking.</li>
              <li><strong>Commit</strong> — a saved snapshot of your changes, with a message describing what changed and why.</li>
              <li><strong>Branch</strong> — an independent line of development, so you can build a new feature without affecting the main codebase until it's ready.</li>
              <li><strong>Merge / Pull Request</strong> — bringing changes from one branch into another, usually after review.</li>
              <li><strong>Remote</strong> — a hosted copy of your repository (e.g., on GitHub) that you push to and pull from, so your code isn't only on one machine.</li>
            </ul>
            <p>A typical day-to-day Git workflow looks like: create a branch for your change, make commits as you work, push the branch to a remote like GitHub, open a pull request, get it reviewed, then merge it into the main branch. This workflow is standard across almost every professional software team.</p>
          `,
        },
        {
          slug: "testing-debugging-code-review",
          title: "Testing, Debugging, and Code Review",
          content: `
            <p>Writing code that works once is easy. Writing code that keeps working as the project grows is the actual skill of software engineering — and it relies on a few key practices:</p>
            <ul>
              <li><strong>Testing</strong> — automated tests (unit tests for individual functions, integration tests for how pieces work together) catch bugs before they reach users, and give you confidence to change code without breaking things elsewhere.</li>
              <li><strong>Debugging</strong> — the process of finding and fixing the root cause of unexpected behavior. Good debugging is systematic: reproduce the bug reliably, narrow down where it happens (often with logging or a debugger), form a hypothesis, and test it.</li>
              <li><strong>Code review</strong> — having another developer read your code before it's merged. Reviews catch bugs, share knowledge across a team, and keep a codebase consistent — most professional teams require at least one review before merging any change.</li>
            </ul>
            <p>These practices compound. Tests make code review faster (a reviewer can trust the tests cover the basics). Code review catches issues tests don't cover, like an approach that will be hard to maintain. Together, they're what allows teams of many engineers to keep shipping reliable software instead of accumulating an unmanageable pile of bugs.</p>
          `,
          quiz: {
            title: "Engineering Practices Quiz",
            questions: [
              {
                prompt: "What is the main purpose of a Git branch?",
                choices: [
                  { text: "To permanently delete old code" },
                  { text: "To develop a change independently before merging it into the main codebase", isCorrect: true },
                  { text: "To back up your entire hard drive" },
                  { text: "To automatically test your code" },
                ],
              },
              {
                prompt: "Automated tests are valuable primarily because they:",
                choices: [
                  { text: "Replace the need for code review" },
                  { text: "Catch bugs before they reach users and allow safer changes", isCorrect: true },
                  { text: "Make the application run faster" },
                  { text: "Are required by Git" },
                ],
              },
              {
                prompt: "What is a key benefit of code review?",
                choices: [
                  { text: "It catches issues and shares knowledge before code is merged", isCorrect: true },
                  { text: "It eliminates the need for testing" },
                  { text: "It automatically deploys code to production" },
                  { text: "It only matters for solo projects" },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      slug: "front-end-frameworks-react",
      title: "Front-End Frameworks & React Basics",
      summary: "Building interactive UIs the way modern teams actually do.",
      lessons: [
        {
          slug: "intro-react-components-props-state",
          title: "Intro to React: Components, Props, and State",
          content: `
            <p><strong>React</strong> is a JavaScript library for building user interfaces out of small, reusable pieces called <strong>components</strong>. Instead of manually updating the DOM (the browser's representation of a web page) every time data changes, you describe what the UI should look like for a given set of data, and React handles updating the actual page efficiently.</p>
            <ul>
              <li><strong>Components</strong> — functions that return UI (written in JSX, HTML-like syntax inside JavaScript). A page is built by composing many small components together (a <code>Button</code>, a <code>Header</code>, a <code>UserCard</code>).</li>
              <li><strong>Props</strong> — data passed INTO a component from its parent, similar to function arguments. Props are read-only from the component's perspective.</li>
              <li><strong>State</strong> — data a component manages itself and can change over time (e.g., whether a dropdown is open). Changing state triggers React to re-render that component with the new data.</li>
            </ul>
            <p>A simple mental model: props flow down from parent to child (like water flowing downhill), while state lives locally in whichever component needs it. Most React bugs early on come from confusing the two — trying to modify a prop directly instead of lifting the state up to a shared parent component.</p>
          `,
        },
        {
          slug: "hooks-and-side-effects",
          title: "Hooks and Managing Side Effects in React",
          content: `
            <p><strong>Hooks</strong> are functions that let you use React features like state inside function components. The two you'll use constantly:</p>
            <ul>
              <li><code>useState</code> — declares a piece of state and a function to update it: <code>const [count, setCount] = useState(0)</code>.</li>
              <li><code>useEffect</code> — runs code in response to a component rendering or specific values changing — used for "side effects" like fetching data from an API, setting up a subscription, or manually interacting with the DOM.</li>
            </ul>
            <p>A common pattern is fetching data when a component first appears:</p>
            <pre><code>useEffect(() => {
  fetch("/api/users")
    .then((res) => res.json())
    .then((data) => setUsers(data));
}, []); // empty array = run once, when the component mounts</code></pre>
            <p>That empty array is called the <strong>dependency array</strong> — it tells React when to re-run the effect. An empty array means "only run once." Including a variable means "re-run whenever this value changes." Getting the dependency array wrong is one of the most common sources of bugs in React apps — either effects that never update when they should, or effects that run in an infinite loop.</p>
          `,
          quiz: {
            title: "Front-End Frameworks & React Quiz",
            questions: [
              {
                prompt: "In React, how does data typically flow between components?",
                choices: [
                  { text: "State always flows up, props always flow down from parent to child", isCorrect: true },
                  { text: "Data flows randomly between any two components" },
                  { text: "Props are the same as global variables" },
                  { text: "Child components can freely rewrite their parent's data directly" },
                ],
              },
              {
                prompt: "What is the useEffect hook typically used for?",
                choices: [
                  { text: "Declaring CSS styles" },
                  { text: "Running side effects like data fetching in response to renders or changing values", isCorrect: true },
                  { text: "Compiling JSX into HTML" },
                  { text: "Replacing the need for useState" },
                ],
              },
              {
                prompt: "What does an empty dependency array (`[]`) in useEffect mean?",
                choices: [
                  { text: "The effect never runs" },
                  { text: "The effect runs once, when the component mounts", isCorrect: true },
                  { text: "The effect runs on every single render" },
                  { text: "It causes an error" },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      slug: "back-end-apis-authentication",
      title: "Back-End APIs & Authentication",
      summary: "Building the server side that real apps depend on.",
      lessons: [
        {
          slug: "building-rest-apis",
          title: "Building REST APIs: Routes, Middleware, and Status Codes",
          content: `
            <p>A <strong>REST API</strong> exposes a set of URL routes that let clients read and modify data using standard HTTP methods. A typical resource, like "users," usually gets a consistent set of routes:</p>
            <ul>
              <li><code>GET /api/users</code> — list all users</li>
              <li><code>GET /api/users/:id</code> — get one specific user</li>
              <li><code>POST /api/users</code> — create a new user</li>
              <li><code>PATCH /api/users/:id</code> — update a specific user</li>
              <li><code>DELETE /api/users/:id</code> — delete a specific user</li>
            </ul>
            <p><strong>Middleware</strong> is code that runs between a request arriving and your route's main logic executing — commonly used for things every route needs: checking authentication, logging requests, or parsing the request body. Instead of repeating that logic in every route, middleware lets you write it once and apply it broadly.</p>
            <p>Returning the right <strong>status code</strong> matters just as much as returning the right data: <code>200</code> for a successful read, <code>201</code> for a successful creation, <code>400</code> for invalid input the client sent, <code>401</code> for "you're not logged in," <code>403</code> for "you're logged in but not allowed to do this," and <code>404</code> for a resource that doesn't exist. Getting these right makes your API predictable and debuggable for whoever consumes it — including future you.</p>
          `,
        },
        {
          slug: "authentication-authorization-fundamentals",
          title: "Authentication & Authorization Fundamentals",
          content: `
            <p>These two terms sound similar but answer different questions:</p>
            <ul>
              <li><strong>Authentication</strong> — "who are you?" Verifying a user's identity, typically via a password, a magic link, or a third-party login (Google, GitHub, etc.).</li>
              <li><strong>Authorization</strong> — "what are you allowed to do?" Determining whether an authenticated user has permission to perform a specific action.</li>
            </ul>
            <p>Once a user authenticates, the server needs a way to recognize them on future requests without asking for a password every time. Two common approaches:</p>
            <ul>
              <li><strong>Session-based auth</strong> — the server creates a session and gives the browser a cookie referencing it; the server looks up the session on each request.</li>
              <li><strong>Token-based auth (e.g., JWT)</strong> — the server issues a signed token containing the user's identity, which the client sends with each request; the server verifies the signature instead of looking anything up, which scales well across multiple servers.</li>
            </ul>
            <p>Regardless of approach, passwords must be hashed (never stored or logged in plain text), and authorization checks must happen server-side on every sensitive action — a recurring theme across this entire track, because it's genuinely one of the most common real-world security failures in production applications.</p>
          `,
          quiz: {
            title: "Back-End APIs & Authentication Quiz",
            questions: [
              {
                prompt: "Which HTTP status code should a successful resource-creation request return?",
                choices: [
                  { text: "200" },
                  { text: "201", isCorrect: true },
                  { text: "301" },
                  { text: "404" },
                ],
              },
              {
                prompt: "What is the difference between authentication and authorization?",
                choices: [
                  { text: "They are the same thing" },
                  { text: "Authentication verifies identity; authorization verifies permission to act", isCorrect: true },
                  { text: "Authorization happens before authentication always" },
                  { text: "Authentication only applies to admins" },
                ],
              },
              {
                prompt: "What is middleware typically used for in a REST API?",
                choices: [
                  { text: "Styling the front end" },
                  { text: "Shared logic like auth checks or logging that runs before route handlers", isCorrect: true },
                  { text: "Replacing the database" },
                  { text: "Compiling JavaScript" },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      slug: "deployment-devops-ai-tooling",
      title: "Deployment, DevOps & AI Tooling",
      summary: "Shipping software, and using today's AI-powered dev tools well.",
      lessons: [
        {
          slug: "cicd-cloud-deployment-basics",
          title: "CI/CD and Cloud Deployment Basics",
          content: `
            <p><strong>CI/CD</strong> stands for Continuous Integration and Continuous Deployment (or Delivery) — the practice of automatically building, testing, and deploying code every time it changes, instead of doing these steps manually.</p>
            <ul>
              <li><strong>Continuous Integration (CI)</strong> — every time code is pushed, an automated pipeline runs tests and checks (linting, type-checking, build) to catch problems immediately, before they reach other developers or production.</li>
              <li><strong>Continuous Deployment/Delivery (CD)</strong> — once code passes CI, it's automatically deployed (continuous deployment) or made ready to deploy with one click (continuous delivery), instead of a manual, error-prone release process.</li>
            </ul>
            <p>Common CI/CD tools include GitHub Actions, GitLab CI, and Jenkins. A typical pipeline for a web app: push code → run automated tests → build the application → deploy to a hosting platform (Vercel, Netlify, AWS, Azure). This is also where security has to be built in, not bolted on — a good pipeline includes automated security scanning (checking dependencies for known vulnerabilities, scanning for accidentally-committed secrets) as a required step before deployment, not an afterthought.</p>
          `,
        },
        {
          slug: "working-with-ai-coding-tools",
          title: "Working with AI Coding Tools & LLM APIs",
          content: `
            <p>AI coding assistants (like Claude Code, GitHub Copilot, and others) and LLM APIs (like the Anthropic or OpenAI APIs) have become a standard part of the modern developer's toolkit — not a replacement for understanding fundamentals, but a serious multiplier once you do. A few practical principles for using them well:</p>
            <ul>
              <li><strong>You are still responsible for the code.</strong> AI-generated code can look confident and still be wrong, insecure, or inefficient — review it with the same care you'd apply to a human teammate's pull request.</li>
              <li><strong>Give clear context.</strong> The more specific your prompt (what the code should do, constraints, existing patterns in your codebase), the better the result — vague prompts produce vague, generic code.</li>
              <li><strong>Use AI for the parts that benefit most</strong> — boilerplate, first drafts, explaining unfamiliar code, generating test cases — while keeping architecture decisions and security-sensitive logic under close human review.</li>
            </ul>
            <p>If you're building your own product on top of an LLM API (rather than just using a coding assistant), remember the same security principles from earlier in this track apply directly: never trust user input passed into a prompt without validation, never expose your API keys in front-end code, and always consider what happens if a user tries to manipulate the AI into ignoring its instructions (known as prompt injection) — especially if that AI has access to real actions like sending emails or modifying data.</p>
          `,
          quiz: {
            title: "Deployment, DevOps & AI Tooling Quiz",
            questions: [
              {
                prompt: "What does Continuous Integration (CI) primarily provide?",
                choices: [
                  { text: "Automatic marketing for your app" },
                  { text: "Automated tests and checks run on every code change", isCorrect: true },
                  { text: "A replacement for version control" },
                  { text: "Free cloud hosting" },
                ],
              },
              {
                prompt: "Why should security scanning be part of a CI/CD pipeline rather than an afterthought?",
                choices: [
                  { text: "It's not actually necessary" },
                  { text: "It catches vulnerable dependencies and leaked secrets before deployment", isCorrect: true },
                  { text: "It replaces the need for testing" },
                  { text: "It only matters for mobile apps" },
                ],
              },
              {
                prompt: "When using AI coding tools, who remains responsible for the correctness and security of the resulting code?",
                choices: [
                  { text: "The AI tool itself" },
                  { text: "The developer using the tool", isCorrect: true },
                  { text: "No one — AI code doesn't need review" },
                  { text: "Only the original framework authors" },
                ],
              },
            ],
          },
        },
      ],
    },
  ],
};

async function seedTrack(track: TrackSeed) {
  await prisma.track.upsert({
    where: { slug: track.slug },
    update: {
      title: track.title,
      tagline: track.tagline,
      description: track.description,
      icon: track.icon,
      order: track.order,
    },
    create: {
      slug: track.slug,
      title: track.title,
      tagline: track.tagline,
      description: track.description,
      icon: track.icon,
      order: track.order,
    },
  });

  const trackRecord = await prisma.track.findUniqueOrThrow({ where: { slug: track.slug } });

  for (const [moduleOrder, moduleSeed] of track.modules.entries()) {
    await prisma.module.upsert({
      where: { trackId_slug: { trackId: trackRecord.id, slug: moduleSeed.slug } },
      update: {
        title: moduleSeed.title,
        summary: moduleSeed.summary,
        order: moduleOrder,
      },
      create: {
        trackId: trackRecord.id,
        slug: moduleSeed.slug,
        title: moduleSeed.title,
        summary: moduleSeed.summary,
        order: moduleOrder,
      },
    });

    const moduleRecord = await prisma.module.findUniqueOrThrow({
      where: { trackId_slug: { trackId: trackRecord.id, slug: moduleSeed.slug } },
    });

    for (const [lessonOrder, lessonSeed] of moduleSeed.lessons.entries()) {
      await prisma.lesson.upsert({
        where: { moduleId_slug: { moduleId: moduleRecord.id, slug: lessonSeed.slug } },
        update: {
          title: lessonSeed.title,
          content: lessonSeed.content,
          order: lessonOrder,
        },
        create: {
          moduleId: moduleRecord.id,
          slug: lessonSeed.slug,
          title: lessonSeed.title,
          content: lessonSeed.content,
          order: lessonOrder,
        },
      });

      const lessonRecord = await prisma.lesson.findUniqueOrThrow({
        where: { moduleId_slug: { moduleId: moduleRecord.id, slug: lessonSeed.slug } },
      });

      if (lessonSeed.quiz) {
        const existingQuiz = await prisma.quiz.findUnique({
          where: { lessonId: lessonRecord.id },
        });

        if (existingQuiz) {
          await prisma.question.deleteMany({ where: { quizId: existingQuiz.id } });
          await prisma.quiz.update({
            where: { id: existingQuiz.id },
            data: { title: lessonSeed.quiz.title },
          });
        }

        const quiz =
          existingQuiz ??
          (await prisma.quiz.create({
            data: { lessonId: lessonRecord.id, title: lessonSeed.quiz.title },
          }));

        for (const [qOrder, question] of lessonSeed.quiz.questions.entries()) {
          await prisma.question.create({
            data: {
              quizId: quiz.id,
              prompt: question.prompt,
              order: qOrder,
              choices: {
                create: question.choices.map((choice, cOrder) => ({
                  text: choice.text,
                  isCorrect: !!choice.isCorrect,
                  order: cOrder,
                })),
              },
            },
          });
        }
      }
    }
  }
}

type CodingProblemSeed = {
  slug: string;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  prompt: string;
  starterCode: string;
  testCode: string;
  minTier: "FREE" | "PRO" | "MAX";
};

const codingProblems: CodingProblemSeed[] = [
  {
    slug: "sum-two-numbers",
    title: "Sum Two Numbers",
    difficulty: "EASY",
    prompt:
      "Write a function <code>sum(a, b)</code> that returns the sum of two numbers.",
    starterCode: "function sum(a, b) {\n  // your code here\n}",
    testCode: `const cases = [[1,2,3],[0,0,0],[-1,1,0],[10,-5,5]];
const results = cases.map(([a,b,expected]) => {
  let actual, error = null;
  try { actual = sum(a, b); } catch (e) { error = String(e); }
  return { input: [a,b], expected, actual, pass: error === null && actual === expected, error };
});
postMessage(results);`,
    minTier: "PRO",
  },
  {
    slug: "reverse-a-string",
    title: "Reverse a String",
    difficulty: "EASY",
    prompt: "Write a function <code>reverseString(str)</code> that returns the string reversed.",
    starterCode: "function reverseString(str) {\n  // your code here\n}",
    testCode: `const cases = [["hello","olleh"],["",""],["a","a"],["Access Granted","detnarG sseccA"]];
const results = cases.map(([input, expected]) => {
  let actual, error = null;
  try { actual = reverseString(input); } catch (e) { error = String(e); }
  return { input, expected, actual, pass: error === null && actual === expected, error };
});
postMessage(results);`,
    minTier: "PRO",
  },
  {
    slug: "fizzbuzz",
    title: "FizzBuzz",
    difficulty: "MEDIUM",
    prompt:
      "Write a function <code>fizzBuzz(n)</code> that returns an array of strings for the numbers 1 to n. For multiples of 3 use \"Fizz\", multiples of 5 use \"Buzz\", multiples of both use \"FizzBuzz\", otherwise the number as a string.",
    starterCode: "function fizzBuzz(n) {\n  // your code here\n}",
    testCode: `function expectedFizzBuzz(n) {
  const out = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) out.push("FizzBuzz");
    else if (i % 3 === 0) out.push("Fizz");
    else if (i % 5 === 0) out.push("Buzz");
    else out.push(String(i));
  }
  return out;
}
const cases = [3, 5, 15, 1];
const results = cases.map((n) => {
  const expected = expectedFizzBuzz(n);
  let actual, error = null;
  try { actual = fizzBuzz(n); } catch (e) { error = String(e); }
  return { input: n, expected, actual, pass: error === null && JSON.stringify(actual) === JSON.stringify(expected), error };
});
postMessage(results);`,
    minTier: "PRO",
  },
  {
    slug: "find-the-duplicate",
    title: "Find the Duplicate",
    difficulty: "MEDIUM",
    prompt:
      "Write a function <code>findDuplicate(arr)</code> that returns the first number that appears more than once in the array. Return <code>null</code> if there are no duplicates.",
    starterCode: "function findDuplicate(arr) {\n  // your code here\n}",
    testCode: `const cases = [
  [[1,2,3,2,4], 2],
  [[1,2,3], null],
  [[5,5,5], 5],
  [[7,1,2,3,1], 1],
];
const results = cases.map(([input, expected]) => {
  let actual, error = null;
  try { actual = findDuplicate(input); } catch (e) { error = String(e); }
  const norm = (v) => (v === undefined ? null : v);
  return { input, expected, actual, pass: error === null && norm(actual) === expected, error };
});
postMessage(results);`,
    minTier: "PRO",
  },
  {
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "HARD",
    prompt:
      "Write a function <code>isValidParentheses(str)</code> that returns <code>true</code> if every opening bracket <code>(</code>, <code>{</code>, <code>[</code> has a matching, correctly-ordered closing bracket, and <code>false</code> otherwise.",
    starterCode: "function isValidParentheses(str) {\n  // your code here\n}",
    testCode: `const cases = [
  ["()", true],
  ["()[]{}", true],
  ["(]", false],
  ["([)]", false],
  ["{[]}", true],
  ["", true],
];
const results = cases.map(([input, expected]) => {
  let actual, error = null;
  try { actual = isValidParentheses(input); } catch (e) { error = String(e); }
  return { input, expected, actual, pass: error === null && actual === expected, error };
});
postMessage(results);`,
    minTier: "PRO",
  },
  {
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "HARD",
    prompt:
      "Write a function <code>twoSum(nums, target)</code> that returns the indices of the two numbers in <code>nums</code> that add up to <code>target</code>, as an array <code>[i, j]</code> with <code>i &lt; j</code>. Assume exactly one solution exists.",
    starterCode: "function twoSum(nums, target) {\n  // your code here\n}",
    testCode: `const cases = [
  [[2,7,11,15], 9, [0,1]],
  [[3,2,4], 6, [1,2]],
  [[3,3], 6, [0,1]],
];
const results = cases.map(([nums, target, expected]) => {
  let actual, error = null;
  try { actual = twoSum(nums, target); } catch (e) { error = String(e); }
  return { input: { nums, target }, expected, actual, pass: error === null && JSON.stringify(actual) === JSON.stringify(expected), error };
});
postMessage(results);`,
    minTier: "PRO",
  },
];

type InterviewQuestionSeed = {
  category: "BEHAVIORAL" | "TECHNICAL";
  prompt: string;
  sampleAnswer: string;
  tips: string;
  minTier: "FREE" | "PRO" | "MAX";
};

const interviewQuestions: InterviewQuestionSeed[] = [
  {
    category: "BEHAVIORAL",
    prompt: "Tell me about a time you failed at something. What did you learn?",
    sampleAnswer:
      "In a group project, I underestimated how long integrating a third-party API would take and didn't flag it until the deadline was close. We shipped a scaled-down version on time, but I learned to surface risks early and communicate blockers as soon as I see them, not after I've tried to solve them alone.",
    tips: "Use the STAR method (Situation, Task, Action, Result). Pick a real failure with a genuine lesson — avoid disguised humblebrags like 'I work too hard.'",
    minTier: "MAX",
  },
  {
    category: "BEHAVIORAL",
    prompt: "Describe a challenging team conflict and how you resolved it.",
    sampleAnswer:
      "Two teammates disagreed on which library to use for a feature. Instead of letting it stall the project, I asked each to write a one-paragraph tradeoff summary, and we picked based on our actual constraints (deadline, team familiarity) rather than personal preference. It turned a personal disagreement into an objective decision.",
    tips: "Focus on the process you used to de-escalate and decide, not on who was 'right.' Interviewers are testing for maturity and collaboration skills.",
    minTier: "MAX",
  },
  {
    category: "BEHAVIORAL",
    prompt: "Why do you want to work in cybersecurity or software engineering?",
    sampleAnswer:
      "I like that the field rewards curiosity — there's always a deeper layer to understand, whether it's how a network actually routes packets or how an attacker thinks. I also want work that has real consequences for people, and both fields let me directly protect or build things that matter.",
    tips: "Be specific and personal — generic answers ('I like technology') are forgettable. Tie it to something concrete you've done (a project, a course, a hands-on moment).",
    minTier: "MAX",
  },
  {
    category: "TECHNICAL",
    prompt: "Explain the CIA triad in your own words, as if to a non-technical manager.",
    sampleAnswer:
      "Confidentiality means only the right people can see the data. Integrity means the data hasn't been changed or tampered with. Availability means the systems are up and usable when people need them. Every security decision is really about protecting one or more of those three things.",
    tips: "Interviewers want to see you can translate technical concepts for a non-technical audience — avoid jargon in your explanation.",
    minTier: "MAX",
  },
  {
    category: "TECHNICAL",
    prompt: "Walk me through what happens when you type a URL into your browser and hit enter.",
    sampleAnswer:
      "The browser first checks its cache and DNS to resolve the domain to an IP address. It opens a TCP connection to that IP (with a TLS handshake for HTTPS), then sends an HTTP request. The server processes the request, possibly querying a database, and sends back an HTTP response with HTML/CSS/JS. The browser parses that, requests additional assets, and renders the page.",
    tips: "This is one of the most common technical interview questions across both cybersecurity and software roles. Practice it out loud — interviewers are grading how clearly you structure a multi-step technical explanation.",
    minTier: "MAX",
  },
  {
    category: "TECHNICAL",
    prompt: "How would you approach debugging a production issue you've never seen before?",
    sampleAnswer:
      "First, I'd try to reproduce it reliably and check logs/monitoring to understand scope and impact. Then I'd form a hypothesis based on recent changes (deploys, config, traffic patterns) and test it in the least risky way possible. I'd communicate status to the team throughout, not just at the end, and once fixed, write up a short postmortem so it doesn't repeat.",
    tips: "Interviewers care more about your systematic process than whether you 'know the answer' — walk through your reasoning step by step.",
    minTier: "MAX",
  },
];

async function seedCodingProblems() {
  for (const [order, problem] of codingProblems.entries()) {
    await prisma.codingProblem.upsert({
      where: { slug: problem.slug },
      update: { ...problem, order },
      create: { ...problem, order },
    });
  }
}

async function seedInterviewQuestions() {
  await prisma.interviewQuestion.deleteMany();
  for (const [order, question] of interviewQuestions.entries()) {
    await prisma.interviewQuestion.create({ data: { ...question, order } });
  }
}

async function main() {
  await seedTrack(itNetworkingTrack);
  await seedTrack(cybersecurityTrack);
  await seedTrack(softwareEngineeringTrack);
  await seedCodingProblems();
  await seedInterviewQuestions();
  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
