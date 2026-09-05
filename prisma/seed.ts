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

const cybersecurityTrack: TrackSeed = {
  slug: "cybersecurity",
  title: "Cybersecurity Fundamentals",
  tagline: "Think like a defender (and an attacker)",
  description:
    "A hands-on introduction to cybersecurity — covering core concepts, network security, and the frameworks security analysts use every day.",
  icon: "shield",
  order: 1,
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
  ],
};

const softwareEngineeringTrack: TrackSeed = {
  slug: "software-engineering",
  title: "Software Engineering & Full Stack Dev",
  tagline: "From how the web works to shipping real code",
  description:
    "A practical path through full stack fundamentals — how the web works, front end vs. back end, and the engineering practices that separate hobby code from professional software.",
  icon: "code",
  order: 2,
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

async function main() {
  await seedTrack(cybersecurityTrack);
  await seedTrack(softwareEngineeringTrack);
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
