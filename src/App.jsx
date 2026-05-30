import { useState, useEffect, useRef } from "react";

const phases = [
  {
    id: 1, emoji: "🖥️", title: "Computer Fundamentals", color: "#00d4ff", darkColor: "#0088aa",
    sections: [
      {
        title: "How Computers Work",
        topics: [
          { name: "CPU", what: "Central Processing Unit — the brain of the computer. Executes instructions via fetch-decode-execute cycle.", why: "Understanding CPU architecture helps you write cache-friendly code, understand parallelism, and optimize compute-heavy tasks.", prereqs: "None", difficulty: "Beginner", realWorld: "Knowing why CPU-bound vs I/O-bound tasks behave differently helps choose the right concurrency model.", mistakes: "Thinking faster CPU = always faster code. Cache misses and branch mispredictions matter more at scale.", resources: ["Computer Organization and Design (Patterson & Hennessy)", "Crash Course Computer Science (YouTube)", "nand2tetris.org"], practice: ["Build a simple ALU in a hardware simulator", "Compare benchmark results for sequential vs random memory access"] },
          { name: "RAM", what: "Random Access Memory — volatile, fast storage for currently running programs. Data is lost on power off.", why: "Helps you understand memory allocation, garbage collection, and why keeping data in memory vs disk matters enormously for performance.", prereqs: "None", difficulty: "Beginner", realWorld: "Choosing the right caching strategy, understanding heap vs stack, diagnosing memory leaks.", mistakes: "Treating RAM as infinite. Understanding memory limits guides architectural choices.", resources: ["What Every Programmer Should Know About Memory (Drepper)", "Operating Systems: Three Easy Pieces (OSTEP)"], practice: ["Write a program that deliberately causes memory pressure and observe swapping behavior"] },
          { name: "ROM & Storage (SSD/HDD)", what: "ROM is permanent firmware storage. SSDs use NAND flash (fast, no moving parts). HDDs use spinning magnetic platters.", why: "Influences database design, file I/O strategies, and understanding latency numbers (HDD seek ~10ms, SSD ~0.1ms, RAM ~100ns).", prereqs: "None", difficulty: "Beginner", realWorld: "Choosing between memory caching and disk persistence. Understanding why SQLite beats Postgres for certain read-heavy local apps.", mistakes: "Ignoring I/O as a bottleneck. Most web apps are I/O-bound, not CPU-bound.", resources: ["Latency Numbers Every Programmer Should Know (interactive)", "How SSDs Work - AnandTech"], practice: ["Benchmark file read/write speeds on your machine. Compare sequential vs random access."] },
        ]
      },
      {
        title: "Operating Systems",
        topics: [
          { name: "Processes", what: "An isolated execution environment with its own memory space, file descriptors, and resources.", why: "Node.js runs in a process. Understanding process isolation is key to containerization, security sandboxing, and IPC.", prereqs: "CPU, RAM", difficulty: "Intermediate", realWorld: "Forking processes in Node for CPU work, running isolated microservices, understanding Docker container boundaries.", mistakes: "Confusing processes with threads. Processes are isolated; threads share memory.", resources: ["OSTEP Chapters on Processes", "man fork, man exec on Linux"], practice: ["Write a shell in C or Go that forks child processes"] },
          { name: "Threads", what: "Lightweight execution units that share memory within a process.", why: "JavaScript is single-threaded. Understanding this explains the Event Loop, Worker Threads, and why async != parallel.", prereqs: "Processes", difficulty: "Intermediate", realWorld: "Node.js Worker Threads for CPU tasks, thread pools in Java/Go, race conditions in shared state.", mistakes: "Thinking async JavaScript uses multiple threads. It doesn't — it uses cooperative scheduling on one thread.", resources: ["OSTEP: Concurrency sections", "MDN: Worker Threads"], practice: ["Implement a thread-safe queue in Go or Java"] },
        ]
      },
      {
        title: "Networking Basics",
        topics: [
          { name: "DNS", what: "Domain Name System — translates human-readable hostnames (google.com) into IP addresses.", why: "Every web request starts with DNS. Understanding it helps debug connectivity issues, set up domains, and design CDN strategies.", prereqs: "None", difficulty: "Beginner", realWorld: "Configuring A records, CNAMEs, TTLs. Understanding DNS propagation delays when deploying.", mistakes: "Not understanding TTL caching. DNS changes can take up to 48 hours to propagate globally.", resources: ["How DNS Works (dnsimple.com/comic)", "dig command documentation"], practice: ["Use dig to trace a full DNS resolution chain. Set up your own domain and configure DNS records."] },
          { name: "HTTP & HTTPS", what: "HyperText Transfer Protocol — the foundation of data communication on the web. HTTPS adds TLS encryption.", why: "Every API call, browser request, and webhook uses HTTP. Mastering it means mastering web development.", prereqs: "DNS", difficulty: "Beginner", realWorld: "Designing RESTful APIs, understanding headers, status codes, caching, CORS, content negotiation.", mistakes: "Not understanding idempotency (GET/PUT are idempotent, POST is not). Ignoring HTTP/2 and HTTP/3 improvements.", resources: ["MDN HTTP documentation", "HTTP: The Definitive Guide (O'Reilly)", "curl manual"], practice: ["Build an HTTP/1.1 server from raw TCP sockets in any language"] },
          { name: "TCP/IP & UDP", what: "TCP: reliable, ordered, connection-oriented. UDP: fast, connectionless, no delivery guarantee.", why: "TCP powers most web traffic. UDP powers DNS, video streaming, and games where speed > reliability.", prereqs: "None", difficulty: "Intermediate", realWorld: "Choosing UDP for WebRTC video calls, understanding TCP handshake overhead, tuning TCP buffers for high-throughput servers.", mistakes: "Always defaulting to TCP. For real-time apps (games, video), UDP with application-level retry is often better.", resources: ["Beej's Guide to Network Programming", "RFC 793 (TCP)", "RFC 768 (UDP)"], practice: ["Build a UDP-based chat app. Observe dropped packets."] },
          { name: "SSL/TLS", what: "Security protocol layered over TCP that provides encryption, authentication, and integrity.", why: "All modern web traffic should be encrypted. Understanding TLS is essential for security engineering and debugging HTTPS issues.", prereqs: "TCP/IP", difficulty: "Intermediate", realWorld: "Setting up Let's Encrypt, configuring cipher suites, pinning certificates in mobile apps, mutual TLS for service mesh.", mistakes: "Confusing SSL (deprecated) with TLS. SSL 3.0 is insecure; use TLS 1.2+ minimum, prefer TLS 1.3.", resources: ["The Illustrated TLS Connection (tls13.ulfheim.net)", "OpenSSL Cookbook"], practice: ["Use openssl to inspect a certificate, simulate a TLS handshake, and create a self-signed cert"] },
        ]
      },
      {
        title: "Browser Internals",
        topics: [
          { name: "Rendering Engine", what: "Parses HTML/CSS, builds DOM and CSSOM, computes layout, paints pixels to screen.", why: "Understanding rendering helps optimize Core Web Vitals (LCP, CLS, FID) and avoid layout thrashing.", prereqs: "HTML, CSS basics", difficulty: "Intermediate", realWorld: "Avoiding expensive CSS properties that trigger layout recalculation, using will-change for GPU compositing.", mistakes: "Reading offsetHeight inside a loop — triggers synchronous layout recalculation on every iteration.", resources: ["Inside look at modern web browser (Google blog series)", "Browser rendering optimization - Udacity"], practice: ["Use Chrome DevTools Performance tab to find layout thrashing in a sample app"] },
          { name: "Event Loop", what: "JavaScript's concurrency model: a single-threaded loop that processes a call stack, microtask queue, and task queue.", why: "The most misunderstood part of JavaScript. Explains async/await, setTimeout, Promise resolution order, and blocking behavior.", prereqs: "JavaScript basics", difficulty: "Intermediate", realWorld: "Why long-running synchronous code blocks the UI, why microtasks (Promises) run before macrotasks (setTimeout).", mistakes: "Thinking async code runs in parallel. In Node.js and browsers, JS is single-threaded.", resources: ["What the heck is the event loop anyway? (Philip Roberts, JSConf)", "Node.js Event Loop (nodejs.org/en/docs/guides)"], practice: ["Predict the console.log order for 10 complex async/setTimeout/Promise combinations"] },
        ]
      },
      {
        title: "Data Encoding & Virtualization",
        topics: [
          { name: "Unicode & Character Sets", what: "Unicode is the universal character encoding standard. UTF-8 is the dominant encoding (variable-width, ASCII-compatible).", why: "Prevents encoding bugs in international apps, file processing, and database storage.", prereqs: "None", difficulty: "Beginner", realWorld: "Why emoji break string length calculations, database collation issues, byte-order marks in CSVs.", mistakes: "Using string length to count characters. Use codepoints. 'emoji'.length == 2 in JS.", resources: ["The Absolute Minimum Every Software Developer Must Know About Unicode (Joel Spolsky)", "UTF-8 Everywhere manifesto"], practice: ["Write a function that correctly reverses a string containing emoji"] },
          { name: "Virtualization & Containers", what: "VMs emulate hardware; containers share the host OS kernel but isolate filesystem/processes via namespaces and cgroups.", why: "Modern deployments are containerized. Understanding the difference helps right-size your infrastructure.", prereqs: "Operating Systems", difficulty: "Intermediate", realWorld: "Docker for local dev, Kubernetes for production, VMs for stronger isolation (security-sensitive workloads).", mistakes: "Treating containers as VMs. Containers are processes, not machines. Shared kernel = different security model.", resources: ["Docker docs", "Container Security (Liz Rice)", "Kubernetes Up & Running (O'Reilly)"], practice: ["Run an Nginx container, customize it, build your own image from scratch (FROM scratch)"] },
        ]
      }
    ]
  },
  {
    id: 2, emoji: "🐧", title: "Linux Mastery", color: "#ff6b35", darkColor: "#cc4400",
    sections: [
      {
        title: "Linux Fundamentals",
        topics: [
          { name: "File System", what: "Hierarchical directory structure: / (root), /etc (config), /var (variable data), /usr (user binaries), /proc (kernel interface).", why: "Every server runs Linux. Navigating the filesystem, understanding paths, inodes, and permissions is non-negotiable.", prereqs: "None", difficulty: "Beginner", realWorld: "Reading log files in /var/log, editing server configs in /etc, understanding where binaries live in /usr/bin.", mistakes: "Using absolute paths in scripts (breaks on different distros). Always use relative paths or variables.", resources: ["The Linux Command Line (William Shotts — free online)", "Linux Filesystem Hierarchy Standard"], practice: ["Navigate to 20 different system directories and understand what each contains"] },
          { name: "Permissions", what: "Unix permissions: owner/group/other with read(4)/write(2)/execute(1). Plus setuid, setgid, sticky bit.", why: "Security foundation of Linux. Misconfigured permissions = security vulnerabilities.", prereqs: "File System", difficulty: "Beginner", realWorld: "Setting up web server directories, securing private keys (chmod 600), understanding sudo vs su.", mistakes: "Using chmod 777 as a 'fix.' This removes all security. Always use minimum necessary permissions.", resources: ["chmod calculator online", "man chmod, man chown, man chgrp"], practice: ["Set up a web server directory with correct ownership and permissions without using 777"] },
          { name: "Shell Scripting (Bash)", what: "Scripting language for automating system tasks, combining commands, and building DevOps pipelines.", why: "Bash is on every Unix system. Automating deployments, build steps, and cron jobs requires Bash competency.", prereqs: "File System, Permissions", difficulty: "Intermediate", realWorld: "Deployment scripts, backup automation, log rotation, CI/CD pipeline steps.", mistakes: "Not quoting variables ($var vs \"$var\"). Unquoted variables break with spaces and globs.", resources: ["Advanced Bash-Scripting Guide", "shellcheck.net (linting tool)", "Bash Cookbook (O'Reilly)"], practice: ["Write a deployment script that pulls code, runs tests, restarts a service, and sends a Slack notification on failure"] },
          { name: "SSH", what: "Secure Shell — encrypted protocol for remote login and command execution.", why: "The primary way to access production servers. Key-based auth is essential for automation and security.", prereqs: "Networking basics", difficulty: "Beginner", realWorld: "Accessing cloud instances (EC2), setting up SSH tunnels, using ssh-agent for key management, SCP/SFTP for file transfer.", mistakes: "Using password authentication on production servers. Always use key-based auth and disable password login.", resources: ["ssh_config man page", "SSH Mastery (Michael Lucas)"], practice: ["Set up a remote server, configure key-based auth, create an SSH config with aliases, set up port forwarding"] },
          { name: "Process Management", what: "Tools: ps, top, htop, kill, pkill, nice, systemd, supervisor for managing running processes.", why: "Production servers require monitoring and controlling services. systemd is the standard init system.", prereqs: "Processes", difficulty: "Intermediate", realWorld: "Restarting crashed services, investigating memory leaks, setting process priorities, managing daemon lifecycles.", mistakes: "Using kill -9 as the first option. It bypasses cleanup. Use SIGTERM first, SIGKILL only if needed.", resources: ["systemd documentation", "man ps, man kill"], practice: ["Write a systemd unit file for a Node.js application. Configure auto-restart on failure."] },
          { name: "Nginx", what: "High-performance HTTP server, reverse proxy, and load balancer.", why: "The most common production web server. Powers ~33% of the web.", prereqs: "HTTP, Linux basics", difficulty: "Intermediate", realWorld: "Serving static files, reverse proxying to Node/Python apps, SSL termination, rate limiting, caching.", mistakes: "Not understanding worker_processes and worker_connections tuning. Defaults aren't optimal for production.", resources: ["Nginx documentation", "The NGINX Cookbook (Derek DeJonghe)", "nginx.viraptor.info (config visualizer)"], practice: ["Configure Nginx as a reverse proxy for a Node app with SSL, gzip, and caching headers"] },
        ]
      }
    ]
  },
  {
    id: 3, emoji: "🌿", title: "Git & Version Control", color: "#f7931e", darkColor: "#c06000",
    sections: [
      {
        title: "Git Core",
        topics: [
          { name: "Git Internals", what: "Git stores data as a content-addressable object store: blobs (files), trees (directories), commits, tags. SHA-1 hashes identify everything.", why: "Understanding internals makes advanced operations (rebase, cherry-pick, bisect) intuitive, not magical.", prereqs: "None", difficulty: "Intermediate", realWorld: "Recovering lost commits via reflog, understanding what git reset actually does to the object graph.", mistakes: "Treating git as a magic black box. Reading .git/objects teaches you more than any tutorial.", resources: ["Pro Git (Scott Chacon — free at git-scm.com)", "git internals video by Scott Chacon"], practice: ["Manually create a git commit by writing blobs, trees, and commits with git hash-object and git commit-tree"] },
          { name: "Branching & Merging", what: "Branches are lightweight pointers to commits. Merging combines branch histories.", why: "Branching enables parallel development. Understanding merge strategies (fast-forward, recursive, octopus) prevents conflicts.", prereqs: "Git basics", difficulty: "Beginner", realWorld: "Feature branches, hotfix branches, merge vs rebase debate in team workflows.", mistakes: "Long-lived feature branches. They diverge and make merges painful. Prefer short-lived branches.", resources: ["Atlassian Git branching tutorial", "Trunk Based Development (trunkbaseddevelopment.com)"], practice: ["Simulate a 3-way merge conflict, resolve it manually, understand what each marker means"] },
          { name: "Rebase & Cherry-Pick", what: "Rebase replays commits on top of a different base. Cherry-pick applies individual commits to a branch.", why: "Rebase creates cleaner linear history. Cherry-pick is essential for backporting fixes.", prereqs: "Branching, Merging", difficulty: "Intermediate", realWorld: "Interactive rebase to squash WIP commits before PR. Cherry-pick a security fix to a release branch.", mistakes: "Rebasing shared/public branches. Golden rule: never rebase commits others have based work on.", resources: ["git-rebase man page", "Oh Shit, Git (ohshitgit.com)"], practice: ["Use interactive rebase to squash 5 commits, reword messages, and reorder commits"] },
          { name: "Git Hooks", what: "Scripts that run automatically at specific git events: pre-commit, post-commit, pre-push, etc.", why: "Enforce code quality locally before code reaches CI. Run linting, tests, conventional commits checks.", prereqs: "Shell Scripting", difficulty: "Intermediate", realWorld: "Husky for JS projects runs ESLint and tests on every commit. pre-push runs full test suite.", mistakes: "Making hooks too slow. A 5-second pre-commit hook kills developer flow. Keep them under 1 second.", resources: ["Husky documentation", "git hooks documentation"], practice: ["Write a pre-commit hook that runs ESLint and blocks commits if there are errors"] },
          { name: "Monorepo Strategies", what: "Single repository containing multiple packages/apps. Tools: Nx, Turborepo, Lerna.", why: "Used by Google, Meta, Microsoft. Enables atomic cross-package changes, shared tooling, unified CI.", prereqs: "Git basics, npm/Node basics", difficulty: "Advanced", realWorld: "Frontend + backend + shared types in one repo. One PR changes API and its consumer simultaneously.", mistakes: "Monorepo without a build system. Without caching and dependency graph awareness, builds become impossibly slow.", resources: ["Monorepo.tools comparison", "Turborepo documentation", "Nx documentation"], practice: ["Set up a Turborepo with a shared UI component library consumed by two apps"] },
        ]
      }
    ]
  },
  {
    id: 4, emoji: "🏗️", title: "HTML Mastery", color: "#e44d26", darkColor: "#b03000",
    sections: [
      {
        title: "Semantic HTML",
        topics: [
          { name: "Semantic Elements", what: "HTML5 elements with inherent meaning: <article>, <section>, <nav>, <main>, <aside>, <header>, <footer>, <figure>, <time>.", why: "Semantics improve SEO, accessibility, and code maintainability. Screen readers and search engines rely on structure.", prereqs: "None", difficulty: "Beginner", realWorld: "Properly structured news articles rank better. Semantic landmarks let screen reader users jump between sections.", mistakes: "Using <div> for everything. Divitis. Always ask: is there a more semantic element for this?", resources: ["MDN HTML elements reference", "HTML5 Boilerplate"], practice: ["Take a div-soup page and refactor it with correct semantic elements"] },
          { name: "Forms & Validation", what: "Native HTML form elements with built-in validation: required, pattern, min/max, type=email/url/tel.", why: "Forms are how users interact with your app. Native validation is fast, accessible, and requires zero JavaScript.", prereqs: "Semantic HTML", difficulty: "Beginner", realWorld: "Checkout forms, login pages, data entry. Proper form structure enables autofill, password managers.", mistakes: "Reinventing validation with JavaScript when HTML5 can handle it. Using <div> instead of <label> for form fields.", resources: ["MDN Forms guide", "web.dev forms best practices"], practice: ["Build a multi-step form with native validation, proper labels, and fieldset grouping"] },
          { name: "Accessibility (a11y)", what: "Building web experiences usable by people with disabilities. WCAG 2.1 guidelines. ARIA roles and properties.", why: "Legal requirement in many countries. ~15% of people have a disability. Also improves SEO and overall UX.", prereqs: "Semantic HTML", difficulty: "Intermediate", realWorld: "ARIA labels for icon-only buttons, focus management in modals, keyboard navigation, skip links.", mistakes: "Adding ARIA to everything. 'No ARIA is better than bad ARIA.' Semantics first, ARIA as last resort.", resources: ["WebAIM", "A11y Project", "Inclusive Components (Heydon Pickering)"], practice: ["Audit an existing site with axe DevTools and fix all critical a11y violations"] },
          { name: "Web Components", what: "Browser-native component model: Custom Elements, Shadow DOM, HTML Templates. Framework-agnostic.", why: "Native encapsulation. Works in any framework. Design systems can ship Web Components and be used anywhere.", prereqs: "JavaScript, DOM", difficulty: "Advanced", realWorld: "GitHub uses Web Components. Used in design systems that must work across React, Angular, and Vue apps.", mistakes: "Choosing Web Components when you only have one framework. The complexity is only worth it for universal components.", resources: ["MDN Web Components", "open-wc.org", "Lit framework"], practice: ["Build a <date-picker> Web Component that works in plain HTML, React, and Vue"] },
        ]
      }
    ]
  },
  {
    id: 5, emoji: "🎨", title: "CSS Mastery", color: "#2965f1", darkColor: "#1040c0",
    sections: [
      {
        title: "Layout Systems",
        topics: [
          { name: "Flexbox", what: "One-dimensional layout system for distributing space along a main axis with powerful alignment controls.", why: "Replaced float-based layouts. Essential for navbars, card rows, centered content, and any 1D layout.", prereqs: "CSS basics", difficulty: "Beginner", realWorld: "Navigation bars, pricing card rows, centering elements, form layouts.", mistakes: "Using flexbox for 2D layouts. That's what Grid is for. Using margin:auto when flexbox alignment would be cleaner.", resources: ["CSS-Tricks Flexbox Guide", "Flexbox Froggy (game)", "What the Flexbox (Wes Bos)"], practice: ["Build a responsive navbar with flexbox. Implement Holy Grail layout."] },
          { name: "CSS Grid", what: "Two-dimensional layout system for simultaneously controlling rows and columns.", why: "The most powerful CSS layout tool. Replaces hacky table and float layouts for complex UIs.", prereqs: "Flexbox", difficulty: "Intermediate", realWorld: "Dashboard layouts, magazine-style designs, image galleries, any complex 2D layout.", mistakes: "Using grid for 1D layouts when flexbox is simpler. Not using grid-template-areas for named regions.", resources: ["CSS-Tricks Grid Guide", "Grid Garden (game)", "Every Layout (every-layout.dev)"], practice: ["Build a responsive dashboard with sidebar, header, main content, and widget grid using only CSS Grid"] },
          { name: "Container Queries", what: "Apply styles based on the size of a parent container, not the viewport.", why: "Enables truly reusable components that adapt to their context, not just screen size.", prereqs: "CSS Grid, Flexbox, Media Queries", difficulty: "Intermediate", realWorld: "A card component that switches from horizontal to vertical layout based on the sidebar vs main content area.", mistakes: "Still reaching for media queries when container queries would be more contextually appropriate.", resources: ["MDN Container Queries", "web.dev Container Queries article"], practice: ["Build a product card that adapts its layout based on container width"] },
          { name: "CSS Architecture (BEM, CUBE)", what: "Methodologies for organizing CSS at scale: BEM (Block Element Modifier), CUBE CSS, Utility-first.", why: "Without architecture, CSS becomes unmaintainable at scale. Specificity wars and cascade conflicts.", prereqs: "CSS fundamentals", difficulty: "Intermediate", realWorld: "Design systems, large team codebases, ensuring CSS changes don't have unexpected side effects.", mistakes: "Deep nesting (over 3 levels). Overusing !important. Global styles bleeding into components.", resources: ["BEM methodology", "CUBE CSS (Andy Bell)", "Tailwind CSS for utility-first"], practice: ["Refactor a messy CSS file using BEM methodology. Identify and eliminate all !important uses."] },
          { name: "CSS Variables & Modern CSS", what: "Custom properties (--var), calc(), clamp(), logical properties, :is(), :where(), :has(), @layer.", why: "Custom properties enable dynamic theming. :has() is the 'parent selector' that changes CSS capability.", prereqs: "CSS fundamentals", difficulty: "Intermediate", realWorld: "Dark mode theming with CSS variables, fluid typography with clamp(), conditional styling with :has().", mistakes: "Not using cascade layers (@layer) which leads to specificity conflicts in large codebases.", resources: ["Modern CSS (moderncss.dev)", "CSS { In Real Life } blog", "Lea Verou's CSS Secrets"], practice: ["Build a theme switcher (dark/light/high-contrast) using only CSS variables. No JavaScript."] },
        ]
      }
    ]
  },
  {
    id: 6, emoji: "⚡", title: "JavaScript Mastery", color: "#f7df1e", darkColor: "#c0a800",
    sections: [
      {
        title: "Core Language",
        topics: [
          { name: "Scope & Closures", what: "Scope defines variable visibility (global, function, block). Closures are functions that remember their outer scope after the outer function returns.", why: "Fundamental to understanding JavaScript's execution model. Closures power module patterns, memoization, and event handlers.", prereqs: "JS basics", difficulty: "Intermediate", realWorld: "Module pattern (IIFE), private variables, factory functions, memoization, React hooks (useState is a closure).", mistakes: "The classic for-loop closure bug with var. The setTimeout in loop problem. Use let or IIFE to fix.", resources: ["You Don't Know JS: Scope & Closures (Kyle Simpson)", "MDN Closures"], practice: ["Implement a memoize function using closures. Build a counter factory."] },
          { name: "Prototypal Inheritance", what: "JavaScript's inheritance model: objects have a [[Prototype]] link. Property lookup traverses the prototype chain.", why: "Every JS object uses prototypes. Understanding this explains how class syntax works under the hood.", prereqs: "Objects, Functions", difficulty: "Intermediate", realWorld: "Understanding how Array.prototype.map works, extending built-ins, creating efficient object hierarchies.", mistakes: "Mutating Array.prototype or Object.prototype. Extends the prototype of all arrays/objects globally.", resources: ["YDKJS: this & Object Prototypes", "JavaScript.info Prototypes"], practice: ["Implement inheritance without class syntax. Replicate Object.create behavior manually."] },
          { name: "Async JavaScript & Event Loop", what: "Callbacks → Promises → async/await. Event Loop processes call stack, microtask queue (Promises), and macrotask queue (setTimeout).", why: "JavaScript's killer feature. Enables non-blocking I/O without multi-threading.", prereqs: "Functions, Callbacks", difficulty: "Intermediate", realWorld: "API calls, file I/O in Node.js, parallel request batching with Promise.all(), sequential processing.", mistakes: "Creating Promise chains that swallow errors. Forgetting to await. Not handling Promise.all rejection.", resources: ["Philip Roberts Event Loop talk (JSConf)", "Node.js Event Loop Explained (nodejs.org)"], practice: ["Implement Promise from scratch. Implement a rate limiter using async/await."] },
          { name: "Functional Programming", what: "Programming paradigm emphasizing pure functions, immutability, composition, and avoiding side effects.", why: "Pure functions are testable, cacheable, and parallelizable. FP patterns are idiomatic in modern JS.", prereqs: "Functions, Arrays", difficulty: "Intermediate", realWorld: "React's functional component model, Redux reducers (pure functions), ramda/lodash/fp utility usage.", mistakes: "Over-engineering with FP. Not every problem needs monads. Use FP where it simplifies, not to seem clever.", resources: ["Professor Frisby's Mostly Adequate Guide to FP (free)", "JavaScript Allongé (Reginald Braithwaite)"], practice: ["Implement map, filter, reduce from scratch. Build a function composition utility."] },
          { name: "Design Patterns", what: "Reusable solutions: Singleton, Observer, Factory, Strategy, Command, Proxy, Decorator, Module.", why: "Patterns are a shared vocabulary for discussing architecture and solving recurring problems elegantly.", prereqs: "OOP, Closures", difficulty: "Advanced", realWorld: "Observer pattern = EventEmitter. Proxy = Vue reactivity. Strategy = payment provider switching.", mistakes: "Forcing patterns where they don't fit. Patterns are tools, not rules. Over-engineering simple problems.", resources: ["Learning JavaScript Design Patterns (Addy Osmani — free)", "Refactoring Guru Patterns"], practice: ["Implement a pub/sub event system. Build a strategy pattern for sorting algorithms."] },
          { name: "V8 & JS Engine Internals", what: "V8 compiles JS to machine code via Ignition (interpreter) and TurboFan (optimizing compiler). Hidden classes, inline caching.", why: "Writing V8-optimized code means understanding what de-optimizes it: dynamic property deletion, type instability.", prereqs: "JavaScript advanced", difficulty: "Advanced", realWorld: "Why deleting properties hurts performance. Why consistent object shapes enable inline caching.", mistakes: "Premature optimization. Profile first. V8 is remarkably good at optimizing idiomatic JS.", resources: ["V8 blog (v8.dev)", "Franziska Hinkelmann's V8 talks", "Benedikt Meurer's optimization talks"], practice: ["Use --trace-opt and --trace-deopt flags to observe V8 optimization/deoptimization in a Node process"] },
        ]
      }
    ]
  },
  {
    id: 7, emoji: "🔷", title: "TypeScript Mastery", color: "#3178c6", darkColor: "#1a4a8a",
    sections: [
      {
        title: "Advanced Types",
        topics: [
          { name: "Generics", what: "Type parameters that make code reusable across multiple types while maintaining type safety.", why: "The foundation of reusable, type-safe utilities. Every data structure, API client, and hook should use generics.", prereqs: "TypeScript basics", difficulty: "Intermediate", realWorld: "Generic API response type <T>, generic React components, type-safe custom hooks.", mistakes: "Overusing any to avoid generics. That defeats TypeScript's purpose.", resources: ["TypeScript Handbook: Generics", "Total TypeScript (Matt Pocock)"], practice: ["Implement a type-safe EventEmitter using generics. Type a fetch wrapper."] },
          { name: "Utility Types", what: "Built-in type transformers: Partial<T>, Required<T>, Pick<T,K>, Omit<T,K>, Readonly<T>, Record<K,V>, ReturnType<F>.", why: "Eliminates massive duplication. Derive types from existing types instead of redeclaring.", prereqs: "Generics", difficulty: "Intermediate", realWorld: "Partial<Config> for optional overrides, Pick for API response shapes, Omit to exclude password from User type.", mistakes: "Redeclaring types instead of deriving with utilities. Leads to types going out of sync.", resources: ["TypeScript Handbook: Utility Types", "Type Challenges (github.com/type-challenges)"], practice: ["Solve 20 Type Challenges on GitHub. Implement Partial, Required, Readonly from scratch."] },
          { name: "Conditional & Mapped Types", what: "Conditional: T extends U ? X : Y. Mapped: { [K in keyof T]: Transform<T[K]> }. Infer keyword.", why: "Enables types that change based on other types — the foundation of advanced type libraries.", prereqs: "Utility Types", difficulty: "Advanced", realWorld: "Deep readonly, recursive types, template literal types for API route typing, discriminated unions.", mistakes: "Overcomplicating types until they become incomprehensible. Types should be readable by teammates.", resources: ["Total TypeScript advanced patterns", "TypeScript type challenges"], practice: ["Implement DeepReadonly<T>. Build a type-safe router with typed params."] },
          { name: "Declaration Files (.d.ts)", what: "Type definitions for JavaScript libraries that lack TypeScript support. @types/* packages on npm.", why: "Lets you use untyped npm packages with full type safety.", prereqs: "TypeScript intermediate", difficulty: "Intermediate", realWorld: "Writing types for legacy internal JS modules, contributing to DefinitelyTyped, augmenting library types.", mistakes: "Using @ts-ignore instead of writing proper declarations. Loses type safety at integration points.", resources: ["TypeScript Declaration Files guide", "DefinitelyTyped Contributing Guide"], practice: ["Write a .d.ts file for a popular JavaScript library without TypeScript support"] },
        ]
      }
    ]
  },
  {
    id: 8, emoji: "📊", title: "Data Structures & Algorithms", color: "#00c896", darkColor: "#007a5c",
    sections: [
      {
        title: "Foundations",
        topics: [
          { name: "Big O Notation", what: "Mathematical notation describing algorithm performance as input size grows. Time and space complexity.", why: "Enables comparing algorithms and making informed architectural decisions about scalability.", prereqs: "Basic math", difficulty: "Beginner", realWorld: "Choosing between O(1) hash lookup vs O(n) array search. Understanding why bubble sort fails on large datasets.", mistakes: "Confusing best-case with average/worst-case. Big O is worst case unless specified.", resources: ["Big O Cheat Sheet (bigocheatsheet.com)", "Introduction to Algorithms (CLRS)"], practice: ["Analyze the time and space complexity of 20 different code snippets"] },
          { name: "Arrays & Linked Lists", what: "Arrays: contiguous memory, O(1) access, O(n) insert. Linked Lists: O(1) insert at head, O(n) access.", why: "Foundation of every data structure. Understanding memory layouts enables cache-friendly code.", prereqs: "Big O", difficulty: "Beginner", realWorld: "JavaScript arrays are dynamic arrays. Linked lists in LRU cache implementations.", mistakes: "Using linked lists when arrays suffice. Arrays are cache-friendly; linked lists have pointer-chasing overhead.", resources: ["LeetCode Easy array problems", "CTCI Chapter on Arrays"], practice: ["Implement a doubly linked list. Implement an LRU cache using a linked list + hash map."] },
          { name: "Trees & Graphs", what: "Trees: hierarchical structures (BST, AVL, Red-Black, Trie, Heap). Graphs: nodes + edges (directed, undirected, weighted).", why: "Trees power databases (B-trees), filesystems, and DOM. Graphs power social networks, routing, and dependency resolution.", prereqs: "Arrays, Recursion", difficulty: "Intermediate", realWorld: "Database indices use B-trees. npm dependency resolution is graph traversal (DFS). DNS is a tree.", mistakes: "Not understanding when to use BFS vs DFS. BFS for shortest path, DFS for exhaustive search.", resources: ["Algorithms (Sedgewick)", "LeetCode Trees tag", "William Fiset Graph Theory playlist"], practice: ["Implement BFS and DFS. Find shortest path in a weighted graph (Dijkstra's)."] },
          { name: "Dynamic Programming", what: "Breaking problems into overlapping subproblems and memoizing results. Bottom-up (tabulation) or top-down (memoization).", why: "Turns exponential brute-force into polynomial solutions for optimization problems.", prereqs: "Recursion, Arrays", difficulty: "Advanced", realWorld: "Text diff algorithms (Myers diff), sequence alignment in bioinformatics, shortest path problems.", mistakes: "Jumping to DP without trying brute force first. Always start with recursion, then optimize.", resources: ["Grokking Dynamic Programming Patterns (educative.io)", "MIT 6.006 Dynamic Programming lectures"], practice: ["Solve: Fibonacci, Coin Change, Longest Common Subsequence, Knapsack, Edit Distance"] },
          { name: "Sorting & Searching", what: "Sorting: QuickSort (avg O(n log n)), MergeSort (stable, O(n log n)), HeapSort. Searching: Binary Search, BFS, DFS, A*.", why: "Sorting and searching are fundamental operations. Understanding tradeoffs guides algorithm selection.", prereqs: "Arrays, Big O", difficulty: "Intermediate", realWorld: "Database query execution uses sorting. Binary search powers everything from autocomplete to git bisect.", mistakes: "Implementing QuickSort when the built-in sort is fine. Know when to use standard library vs custom.", resources: ["Sorting Algorithm Visualizer (visualgo.net)", "Binary Search (LeetCode problems)"], practice: ["Implement QuickSort, MergeSort. Implement binary search with edge cases (first/last occurrence)."] },
        ]
      }
    ]
  },
  {
    id: 9, emoji: "🖼️", title: "Frontend Engineering", color: "#ff4785", darkColor: "#cc0060",
    sections: [
      {
        title: "Browser & DOM",
        topics: [
          { name: "DOM Manipulation", what: "Document Object Model — tree representation of HTML. JavaScript API for querying, modifying, and observing DOM nodes.", why: "Understanding the DOM is required for any JavaScript UI work, even when using frameworks.", prereqs: "HTML, JavaScript", difficulty: "Beginner", realWorld: "Building interactive UI without frameworks, understanding what React/Vue do under the hood.", mistakes: "Querying the DOM inside loops (causes layout recalculation). Reading and writing in the same frame.", resources: ["MDN DOM documentation", "JavaScript.info DOM Manipulation"], practice: ["Build a Todo app in vanilla JS with no frameworks. Implement virtualized scroll."] },
          { name: "State Management Patterns", what: "Managing application state: local state, global state, server state, URL state, form state.", why: "State management is the hardest part of frontend engineering. Wrong patterns lead to bugs and performance issues.", prereqs: "JavaScript, DOM", difficulty: "Advanced", realWorld: "Redux for global state, React Query for server state, Zustand for lightweight shared state.", mistakes: "Lifting state too high (everything in a global store). Over-fetching with Redux instead of using server state tools.", resources: ["XState documentation (state machines)", "Jotai vs Zustand vs Redux comparison"], practice: ["Build the same shopping cart using: useState, useReducer, Zustand, and Redux. Compare tradeoffs."] },
          { name: "Performance Optimization", what: "Core Web Vitals (LCP, CLS, FID/INP), code splitting, lazy loading, virtual lists, bundle analysis.", why: "Performance is a feature. 1-second delay in page response = 7% reduction in conversions.", prereqs: "Browser internals, React/Vue basics", difficulty: "Advanced", realWorld: "Lighthouse audits, Webpack Bundle Analyzer, lazy loading routes, virtualized lists for 10k items.", mistakes: "Optimizing before measuring. Use profiling to identify actual bottlenecks, not assumptions.", resources: ["web.dev Performance", "Core Web Vitals guide", "React Profiler documentation"], practice: ["Take a slow React app to Lighthouse 90+ score. Profile and fix the top 3 performance issues."] },
        ]
      }
    ]
  },
  {
    id: 10, emoji: "⚛️", title: "React Mastery", color: "#61dafb", darkColor: "#1a9abf",
    sections: [
      {
        title: "React Internals",
        topics: [
          { name: "Fiber Architecture", what: "React's reconciliation engine. Fiber enables interruptible rendering, priorities, and concurrent features.", why: "Understanding Fiber explains why React can prioritize user interactions over background updates.", prereqs: "React basics, JavaScript advanced", difficulty: "Advanced", realWorld: "Why startTransition() marks updates as non-urgent. How Suspense works. Understanding batching.", mistakes: "Thinking React re-renders are expensive. React's diffing is optimized; DOM manipulation is the bottleneck.", resources: ["Inside Fiber: In-Depth Overview (Maxim Koretskyi)", "React Internals Deep Dive (YouTube)"], practice: ["Build a tiny React clone (react-from-scratch) with hooks support"] },
          { name: "Hooks Deep Dive", what: "useState, useEffect, useContext, useReducer, useRef, useMemo, useCallback, useTransition, useDeferredValue.", why: "Hooks are React's API for function components. Misusing them is the #1 source of React bugs.", prereqs: "React basics", difficulty: "Intermediate", realWorld: "useEffect dependency arrays, stale closure bugs, when useMemo/useCallback actually help performance.", mistakes: "Adding everything to useEffect. Using useEffect for derived state. Missing dependencies.", resources: ["Dan Abramov: A Complete Guide to useEffect", "React Hooks documentation"], practice: ["Build a custom useFetch hook. Build useLocalStorage. Build a useDebounce hook."] },
          { name: "Server Components (RSC)", what: "React components that render on the server — they can directly access databases, filesystem, and secrets.", why: "RSC fundamentally changes React architecture: zero bundle overhead, direct data access, streaming.", prereqs: "React, Node.js, HTTP", difficulty: "Advanced", realWorld: "Next.js 13+ uses RSC by default. Eliminates waterfalls of client-side data fetching.", mistakes: "Putting event handlers in Server Components. RSC cannot be interactive; they render to HTML.", resources: ["React Server Components RFC", "Josh Comeau: Making Sense of React Server Components"], practice: ["Build a blog with Next.js App Router using RSC for data fetching, Client Components for interactivity"] },
          { name: "Performance Optimization", what: "React.memo, useMemo, useCallback, code splitting, lazy(), Suspense, profiler, avoiding renders.", why: "Unnecessary re-renders are the most common React performance issue.", prereqs: "React hooks, Fiber", difficulty: "Intermediate", realWorld: "Memoizing expensive computations, lazy loading route components, avoiding prop drilling via context.", mistakes: "Overusing memo/useMemo. They have overhead. Only add them after measuring a real performance problem.", resources: ["React Profiler tutorial", "Before You Memo (overreacted.io)"], practice: ["Use React Profiler to find and fix 3 unnecessary re-render issues in a complex component tree"] },
        ]
      }
    ]
  },
  {
    id: 11, emoji: "⚙️", title: "Backend Engineering", color: "#68d391", darkColor: "#2f855a",
    sections: [
      {
        title: "Node.js & APIs",
        topics: [
          { name: "Node.js Architecture", what: "Single-threaded, event-driven JavaScript runtime. Non-blocking I/O via libuv. Event loop phases.", why: "Node.js is ideal for I/O-heavy services. Understanding its architecture prevents CPU-blocking mistakes.", prereqs: "JavaScript, Event Loop", difficulty: "Intermediate", realWorld: "API servers, real-time apps, CLI tools, serverless functions. Avoid CPU-heavy tasks without Worker Threads.", mistakes: "Running synchronous CPU tasks on the main thread. Use child_process.fork or Worker Threads.", resources: ["Node.js documentation", "Node.js Design Patterns (Mario Casciaro)", "Node.js Event Loop clarified"], practice: ["Build an HTTP server from scratch using Node's http module only. Implement routing manually."] },
          { name: "REST API Design", what: "Representational State Transfer — architectural style using HTTP methods (GET/POST/PUT/PATCH/DELETE), resources, and status codes.", why: "RESTful APIs are the standard for web services. Good design enables evolvability and developer experience.", prereqs: "HTTP, Node.js basics", difficulty: "Beginner", realWorld: "Every CRUD application. Rate limiting, pagination, versioning, error formats.", mistakes: "Using GET for mutations. Returning 200 for errors. Inconsistent naming conventions.", resources: ["REST API Design Best Practices (Microsoft)", "Zalando RESTful API Guidelines"], practice: ["Design and build a RESTful API for a library management system with proper versioning and pagination"] },
          { name: "GraphQL", what: "Query language for APIs. Clients specify exactly what data they need. Single endpoint, strongly typed schema.", why: "Eliminates over-fetching and under-fetching. Excellent for complex, nested data and mobile clients.", prereqs: "REST APIs, TypeScript helpful", difficulty: "Intermediate", realWorld: "GitHub API v4, Shopify, Twitter all use GraphQL. Great for product catalogs with variable data needs.", mistakes: "Using GraphQL for simple CRUD. REST is often simpler. N+1 query problem if not using DataLoader.", resources: ["Apollo Server documentation", "Production Ready GraphQL (Marc-André Giroux)"], practice: ["Build a GraphQL API with DataLoader for batching, auth, and pagination"] },
          { name: "Authentication & Authorization", what: "Auth: proving identity (who are you). Authz: permissions (what can you do). JWT, sessions, OAuth 2.0, RBAC.", why: "Security foundation. Wrong auth implementation is the most dangerous backend mistake.", prereqs: "HTTP, Cryptography basics", difficulty: "Intermediate", realWorld: "JWT for stateless APIs, session cookies for web apps, OAuth for social login, RBAC for SaaS.", mistakes: "Storing passwords in plaintext. Using JWT for sessions (no revocation). JWT secret leaks.", resources: ["Auth0 documentation", "The Web Application Hacker's Handbook (Chapter on Auth)"], practice: ["Build auth from scratch: registration, login, JWT refresh tokens, password reset via email"] },
          { name: "WebSockets & Real-time", what: "Persistent bidirectional TCP connection over HTTP upgrade. Enables server-push without polling.", why: "Required for chat, live dashboards, collaborative editing, multiplayer games.", prereqs: "Node.js, HTTP", difficulty: "Intermediate", realWorld: "Slack, Figma, Google Docs all use WebSockets. Socket.IO adds fallbacks and rooms.", mistakes: "Using WebSockets when SSE (Server-Sent Events) would suffice for one-way streaming.", resources: ["Socket.IO documentation", "WebSockets RFC 6455", "SSE vs WebSockets comparison"], practice: ["Build a real-time collaborative text editor using WebSockets and operational transforms"] },
        ]
      }
    ]
  },
  {
    id: 12, emoji: "🗄️", title: "Database Engineering", color: "#f6ad55", darkColor: "#c05000",
    sections: [
      {
        title: "Relational Databases",
        topics: [
          { name: "SQL Mastery", what: "Structured Query Language: SELECT, JOIN (INNER/LEFT/RIGHT/FULL), GROUP BY, HAVING, subqueries, CTEs, window functions.", why: "SQL is the most important language for backend developers. Window functions and CTEs unlock complex analytics.", prereqs: "None", difficulty: "Beginner", realWorld: "Data reporting, complex queries with multiple JOINs, aggregations, recursive queries for hierarchies.", mistakes: "Using N+1 queries (one query per row). Not using CTEs for readability. Forgetting NULL handling.", resources: ["Mode Analytics SQL Tutorial", "PostgreSQL documentation", "SQL Zoo"], practice: ["Solve 50 LeetCode SQL problems. Write a query using window functions for user retention analysis."] },
          { name: "Indexing & Query Optimization", what: "Indexes (B-tree, hash, GIN, GiST) speed up queries. EXPLAIN ANALYZE reveals query execution plans.", why: "A missing index is the most common database performance problem. Indexes turn O(n) scans into O(log n).", prereqs: "SQL, B-trees", difficulty: "Intermediate", realWorld: "Adding an index on foreign keys reduces JOIN time from seconds to milliseconds. EXPLAIN reveals seq scans.", mistakes: "Over-indexing (slows writes). Indexing columns with low cardinality. Not using partial indexes.", resources: ["Use The Index, Luke! (use-the-index-luke.com)", "EXPLAIN ANALYZE documentation"], practice: ["Take a slow query, analyze its execution plan, add appropriate indexes, and measure improvement"] },
          { name: "Transactions & ACID", what: "Atomicity, Consistency, Isolation, Durability. Transactions ensure operations succeed/fail as a unit.", why: "Critical for financial systems, inventory management — any operation that must not leave partial state.", prereqs: "SQL", difficulty: "Intermediate", realWorld: "Bank transfers (debit one, credit another), order placement (reserve inventory + create order).", mistakes: "Using transactions too broadly (holds locks, reduces concurrency). Too narrow (leaves inconsistent state).", resources: ["PostgreSQL Transaction documentation", "Designing Data-Intensive Applications (DDIA) - Chapter 7"], practice: ["Implement a bank transfer that handles concurrent transactions correctly without race conditions"] },
          { name: "Isolation Levels", what: "Read Uncommitted, Read Committed, Repeatable Read, Serializable. Each trades consistency for concurrency.", why: "Wrong isolation level causes dirty reads, phantom reads, lost updates — subtle, hard-to-reproduce bugs.", prereqs: "Transactions", difficulty: "Advanced", realWorld: "Most databases default to Read Committed. Serializable is needed for financial consistency.", mistakes: "Using Serializable everywhere (too slow). Not understanding what problems each level solves.", resources: ["DDIA Chapter 7", "PostgreSQL Transaction Isolation documentation"], practice: ["Demonstrate dirty read, non-repeatable read, and phantom read with actual SQL queries"] },
          { name: "Sharding & Replication", what: "Replication: copies of data across servers (primary-replica). Sharding: splitting data across servers by key.", why: "Required for databases that exceed single-server capacity. Foundation of web-scale systems.", prereqs: "Indexing, Transactions", difficulty: "Advanced", realWorld: "Instagram shards by user_id. Replication powers read replicas for analytics without impacting writes.", mistakes: "Sharding prematurely. Most apps never need it. 'Shard when you must, not when you can.'", resources: ["DDIA Chapter 6", "Vitess documentation (YouTube sharding solution)"], practice: ["Set up PostgreSQL streaming replication with a primary and read replica"] },
        ]
      },
      {
        title: "NoSQL & Caching",
        topics: [
          { name: "MongoDB", what: "Document database storing JSON-like BSON documents. Flexible schema, horizontal scaling, aggregation pipeline.", why: "Excellent for hierarchical data, rapid prototyping, and use cases with variable document structure.", prereqs: "JavaScript, JSON", difficulty: "Beginner", realWorld: "Content management, user profiles, catalogs, logging. Mongoose adds schema validation.", mistakes: "Using MongoDB for relational data just to avoid SQL. Embedding vs referencing tradeoffs.", resources: ["MongoDB University (free courses)", "Mongoose documentation"], practice: ["Build a blog with MongoDB. Optimize queries with the aggregation pipeline."] },
          { name: "Redis", what: "In-memory data structure store: strings, hashes, lists, sets, sorted sets, streams, pub/sub.", why: "The Swiss Army knife of backend infrastructure. Caching, sessions, queues, leaderboards, pub/sub.", prereqs: "Networking basics", difficulty: "Intermediate", realWorld: "Session storage, rate limiting counters, job queues (Bull/BullMQ), real-time leaderboards.", mistakes: "Using Redis without eviction policies. Not setting TTLs. Treating Redis as primary database.", resources: ["Redis University (free)", "Redis documentation", "Designing Data-Intensive Applications"], practice: ["Implement a rate limiter with Redis. Build a job queue with BullMQ. Implement LRU cache."] },
        ]
      }
    ]
  },
  {
    id: 13, emoji: "🔐", title: "Security Engineering", color: "#fc8181", darkColor: "#c00000",
    sections: [
      {
        title: "OWASP Top 10",
        topics: [
          { name: "SQL Injection", what: "Attacker injects SQL code via user input to manipulate database queries.", why: "Still the #1 vulnerability. Can expose, modify, or destroy entire databases.", prereqs: "SQL, Backend basics", difficulty: "Intermediate", realWorld: "' OR '1'='1 bypasses login. Defense: always use parameterized queries, never string concatenation.", mistakes: "Input sanitization only (not parameterization). Showing raw SQL errors to users.", resources: ["OWASP SQL Injection", "PortSwigger Web Security Academy (SQL Injection labs)"], practice: ["Set up a deliberately vulnerable app (DVWA). Exploit and then fix 5 SQL injection vulnerabilities."] },
          { name: "XSS (Cross-Site Scripting)", what: "Injecting malicious scripts into web pages viewed by other users. Stored, Reflected, or DOM-based.", why: "Can steal session cookies, perform actions as users, redirect to phishing sites.", prereqs: "HTML, JavaScript, Sessions", difficulty: "Intermediate", realWorld: "Defense: CSP headers, HTML escaping, React's JSX auto-escaping, avoiding dangerouslySetInnerHTML.", mistakes: "Only escaping on output, not validating on input. Using eval() with user data. Trusting innerHTML.", resources: ["PortSwigger XSS labs", "OWASP XSS Prevention Cheat Sheet"], practice: ["Demonstrate all 3 types of XSS. Implement and test a Content Security Policy."] },
          { name: "Authentication Attacks & JWT", what: "Broken auth vulnerabilities: weak passwords, no rate limiting, JWT none algorithm, session fixation.", why: "Authentication bypass = complete account takeover.", prereqs: "Authentication basics", difficulty: "Intermediate", realWorld: "JWT 'alg:none' attack, credential stuffing attacks, insecure password reset flows.", mistakes: "Using JWT as a session replacement without understanding revocation limitations.", resources: ["PortSwigger Authentication labs", "JWT Security Best Practices (OWASP)"], practice: ["Exploit a JWT none algorithm vulnerability. Implement secure password reset with time-limited tokens."] },
          { name: "Encryption & Hashing", what: "Encryption (AES, RSA): reversible with key. Hashing (bcrypt, Argon2, SHA-256): one-way. Salting prevents rainbow tables.", why: "Passwords must be hashed (bcrypt), never encrypted. Data at rest and in transit must be encrypted.", prereqs: "Basic cryptography concepts", difficulty: "Intermediate", realWorld: "Password storage with bcrypt. AES-256 for database fields. TLS for transport. AWS KMS for key management.", mistakes: "MD5/SHA1 for passwords (not designed for this, too fast). Storing passwords encrypted (can be reversed with key).", resources: ["Cryptography I (Coursera, Dan Boneh)", "Password Hashing (OWASP)"], practice: ["Implement secure password storage with bcrypt. Set up field-level encryption for PII."] },
          { name: "Secrets Management", what: "Managing API keys, database credentials, and tokens securely. HashiCorp Vault, AWS Secrets Manager, environment variables.", why: "Hardcoded secrets in code are the most common source of credential leaks.", prereqs: "DevOps basics", difficulty: "Intermediate", realWorld: "Secret rotation, dynamic secrets, audit trails for secret access. Trufflehog scanning for leaked secrets.", mistakes: "Committing .env files to Git. Using the same credentials for dev/staging/production.", resources: ["HashiCorp Vault documentation", "SOPS (Mozilla Secrets OPerationS)"], practice: ["Set up HashiCorp Vault locally. Implement secret rotation for a database password."] },
        ]
      }
    ]
  },
  {
    id: 14, emoji: "🧪", title: "Testing Mastery", color: "#a78bfa", darkColor: "#5b21b6",
    sections: [
      {
        title: "Testing Pyramid",
        topics: [
          { name: "Unit Testing (Jest/Vitest)", what: "Testing individual functions/modules in isolation. Fast, deterministic, no external dependencies.", why: "Foundation of test suites. Catches regressions, enables confident refactoring, documents behavior.", prereqs: "JavaScript", difficulty: "Beginner", realWorld: "Testing utility functions, business logic, React component rendering with React Testing Library.", mistakes: "Testing implementation details instead of behavior. Over-mocking (testing the mock, not the code).", resources: ["Jest documentation", "Testing Library documentation", "Testing JavaScript (Kent C. Dodds)"], practice: ["Write tests for a currency converter. Achieve 100% branch coverage on a utility library."] },
          { name: "Integration Testing", what: "Testing how multiple units work together. May include database, file system, or HTTP connections.", why: "Catches issues that unit tests miss: database queries, API contracts, middleware chains.", prereqs: "Unit Testing", difficulty: "Intermediate", realWorld: "Testing Express routes with supertest against a real test database. Testing React pages with navigation.", mistakes: "Integration tests that are too broad (become slow and brittle). Not cleaning up between tests.", resources: ["Supertest documentation", "Testing with real databases guide"], practice: ["Write integration tests for a REST API with database. Use transactions to rollback after each test."] },
          { name: "E2E Testing (Playwright)", what: "Tests that drive a real browser through complete user journeys from frontend to backend.", why: "Highest confidence tests. Catches issues no unit test can: network timing, CSS, browser quirks.", prereqs: "Integration Testing, Basic DevOps", difficulty: "Intermediate", realWorld: "Testing checkout flow, authentication, file uploads. Running in CI against a staging environment.", mistakes: "Too many E2E tests (they're slow). Use sparingly for critical paths. Don't replace unit tests with E2E.", resources: ["Playwright documentation", "Cypress documentation", "Testing Trophy vs Pyramid"], practice: ["Write E2E tests for a complete user registration + login + profile update flow"] },
          { name: "Contract Testing", what: "Testing API contracts between services (consumer and provider) without requiring both to be running.", why: "In microservices, contract testing prevents API changes in one service from breaking consumers.", prereqs: "Integration Testing, REST APIs", difficulty: "Advanced", realWorld: "Pact framework: frontend defines expected API responses, backend verifies it can fulfill them.", mistakes: "Skipping contract testing and discovering breaking changes in production.", resources: ["Pact documentation", "Martin Fowler: Consumer-Driven Contract Testing"], practice: ["Implement consumer-driven contract tests between a React app and a Node.js API"] },
        ]
      }
    ]
  },
  {
    id: 15, emoji: "🚀", title: "DevOps Engineering", color: "#48bb78", darkColor: "#1a6b3c",
    sections: [
      {
        title: "Containerization & Orchestration",
        topics: [
          { name: "Docker", what: "Container runtime. Dockerfile defines image. docker-compose for multi-container local development.", why: "'Works on my machine' → works everywhere. Reproducible environments, isolation, fast deployment.", prereqs: "Linux basics, Networking", difficulty: "Intermediate", realWorld: "Every production deployment. Local development parity. Multi-stage builds for lean production images.", mistakes: "Running as root in containers. Not using .dockerignore. Huge images due to missing multi-stage builds.", resources: ["Docker documentation", "Docker Deep Dive (Nigel Poulton)", "dive tool for image analysis"], practice: ["Write a production Dockerfile for a Node.js app. Use multi-stage build. Minimize image size to < 100MB."] },
          { name: "Kubernetes", what: "Container orchestration: deployments, services, ingress, configmaps, secrets, horizontal pod autoscaling.", why: "The standard for running containers at scale. Self-healing, load balancing, rolling deployments.", prereqs: "Docker, Networking, YAML", difficulty: "Advanced", realWorld: "Production deployments at any company using containers at scale. EKS, GKE, AKS managed services.", mistakes: "Running stateful workloads (databases) without understanding PVCs and StatefulSets.", resources: ["Kubernetes in Action (Marko Luksa)", "kubernetes.io tutorials", "CKAD exam preparation"], practice: ["Deploy a Node.js app to k8s with auto-scaling, health checks, rolling deployments, and secrets"] },
          { name: "CI/CD with GitHub Actions", what: "Automating test, build, and deploy pipelines on code changes. YAML-defined workflows, matrix builds, environments.", why: "Automated pipelines prevent human error, enforce standards, and enable fast, frequent releases.", prereqs: "Git, Docker basics", difficulty: "Intermediate", realWorld: "Run tests on PR, build Docker image, push to registry, deploy to staging, manual approval for production.", mistakes: "Storing secrets in workflow files. Not caching dependencies (makes builds slow). No rollback strategy.", resources: ["GitHub Actions documentation", "GitHub Actions: Up and Running (O'Reilly)"], practice: ["Build a full CI/CD pipeline: lint → test → build Docker → push to ECR → deploy to ECS"] },
          { name: "Infrastructure as Code (Terraform)", what: "Define infrastructure in HCL configuration files. Plan, apply, destroy. State management, modules, providers.", why: "Infrastructure defined in code = version controlled, reproducible, reviewable, automatable infrastructure.", prereqs: "Cloud basics, Networking", difficulty: "Advanced", realWorld: "Provisioning VPCs, RDS instances, ECS clusters, CloudFront distributions, all in version control.", mistakes: "Manual changes to Terraform-managed resources (state drift). Not using remote state with locking.", resources: ["Terraform documentation", "Terraform: Up & Running (Yevgeniy Brikman)"], practice: ["Provision a complete production environment: VPC, RDS, ECS cluster with Terraform"] },
        ]
      }
    ]
  },
  {
    id: 16, emoji: "☁️", title: "Cloud Engineering", color: "#f6ad55", darkColor: "#b45309",
    sections: [
      {
        title: "AWS Core Services",
        topics: [
          { name: "EC2 & VPC", what: "EC2: virtual machines in the cloud. VPC: isolated network with subnets, route tables, security groups, NAT gateways.", why: "Foundation of AWS. Understanding VPC is prerequisite to secure, scalable cloud architecture.", prereqs: "Linux, Networking", difficulty: "Intermediate", realWorld: "Every AWS workload lives in a VPC. Public subnets for load balancers, private subnets for databases.", mistakes: "Putting databases in public subnets. Overly permissive security groups (0.0.0.0/0). No VPC Flow Logs.", resources: ["AWS documentation", "AWS Solutions Architect Associate certification", "A Cloud Guru"], practice: ["Design and build a 3-tier VPC: public ALB, private app servers, isolated database subnet"] },
          { name: "S3", what: "Object storage with 11 nines durability. Storage classes (Standard, IA, Glacier). Versioning, lifecycle policies, events.", why: "Universal storage for static files, backups, data lakes, and static site hosting.", prereqs: "AWS basics", difficulty: "Beginner", realWorld: "Static site hosting, image/video storage, log archiving, data lake for analytics, deployment artifacts.", mistakes: "Public S3 buckets with sensitive data. Not enabling versioning. Not using lifecycle policies for cost.", resources: ["AWS S3 documentation", "S3 security best practices"], practice: ["Host a static React app on S3 + CloudFront. Set up lifecycle policies for log archiving."] },
          { name: "Lambda & Serverless", what: "Function-as-a-Service: run code without managing servers. Pay per invocation. Cold starts, concurrency limits.", why: "Eliminates server management for event-driven workloads. Cost-effective for variable traffic.", prereqs: "Node.js/Python, API Gateway basics", difficulty: "Intermediate", realWorld: "Image resizing on S3 upload, API endpoints, scheduled jobs, webhook handlers.", mistakes: "Cold start latency for latency-sensitive workloads. Hitting the 15-minute execution limit.", resources: ["AWS Lambda documentation", "Serverless Framework", "Production Ready Serverless (Yan Cui)"], practice: ["Build a serverless image processing pipeline: S3 upload → Lambda → resize → store + notify"] },
          { name: "RDS & Database Services", what: "Managed relational databases: PostgreSQL, MySQL, Aurora. Automated backups, Multi-AZ, read replicas.", why: "Managed databases eliminate DBA overhead for patch management, backups, and failover.", prereqs: "SQL, AWS networking", difficulty: "Intermediate", realWorld: "Production PostgreSQL with Multi-AZ for HA, read replicas for reporting, Aurora for auto-scaling.", mistakes: "Not enabling automated backups. Putting RDS in a public subnet. Not using IAM database auth.", resources: ["AWS RDS documentation", "Aurora best practices"], practice: ["Set up RDS PostgreSQL with Multi-AZ, create a read replica, test failover behavior"] },
          { name: "IAM", what: "Identity and Access Management: users, groups, roles, policies (JSON). Principle of least privilege.", why: "The most important AWS security service. Misconfigured IAM = breached cloud account.", prereqs: "Security fundamentals", difficulty: "Intermediate", realWorld: "EC2 instance roles, Lambda execution roles, cross-account access, service control policies.", mistakes: "Using root account credentials. Admin policies on everything. Not using roles for services.", resources: ["AWS IAM documentation", "IAM Policy Simulator", "AWS re:Invent IAM security deep dives"], practice: ["Create a least-privilege IAM role for a Lambda that can only read from one specific S3 bucket"] },
        ]
      }
    ]
  },
  {
    id: 17, emoji: "🏛️", title: "Software Architecture", color: "#b794f4", darkColor: "#6b21a8",
    sections: [
      {
        title: "Architectural Patterns",
        topics: [
          { name: "Monolith vs Microservices", what: "Monolith: single deployable unit. Microservices: small, independent services communicating over network.", why: "Choosing the wrong architecture is expensive to fix. Most apps should start as monoliths.", prereqs: "Backend, Databases, DevOps", difficulty: "Advanced", realWorld: "Amazon started as monolith, decomposed to microservices. Most startups succeed as monoliths.", mistakes: "'Microservices from day one.' Distributed monolith (tightly coupled microservices). Network call overhead.", resources: ["Building Microservices (Sam Newman)", "Majestic Monolith (DHH)", "Modular Monolith (Kamil Grzybek)"], practice: ["Identify the boundaries in a monolith that would be good candidates for extraction to services"] },
          { name: "Event-Driven Architecture", what: "Services communicate through events (messages). Async, decoupled. Kafka, RabbitMQ, AWS EventBridge.", why: "Enables loose coupling, scalability, and audit trails. Powers real-time data pipelines.", prereqs: "Microservices basics, Message queues", difficulty: "Advanced", realWorld: "Order placed → InventoryService, EmailService, AnalyticsService all react to one event.", mistakes: "Event sourcing when a simple database is fine. Choreography chaos without clear event contracts.", resources: ["Enterprise Integration Patterns (Hohpe & Woolf)", "Designing Event-Driven Systems (Stopford)"], practice: ["Implement an order processing system using events. Handle failures with dead-letter queues."] },
          { name: "Clean Architecture & DDD", what: "Clean Architecture: dependency inversion, business logic at center, infrastructure at edges. DDD: model software around business domains.", why: "Makes business logic testable and independent of frameworks, databases, and UI.", prereqs: "OOP, Design Patterns", difficulty: "Advanced", realWorld: "Financial and healthcare domains where business rules are complex and must be isolated from infra changes.", mistakes: "Using Clean Architecture for simple CRUD. The overhead is only worth it for complex domains.", resources: ["Clean Architecture (Robert Martin)", "Domain-Driven Design (Eric Evans)", "DDD Quickly (free)"], practice: ["Build a bank account system applying Clean Architecture: domain, use cases, adapters, infrastructure layers"] },
          { name: "CQRS & Event Sourcing", what: "CQRS: separate read (Query) and write (Command) models. Event Sourcing: store state as sequence of events.", why: "Enables independently scalable read/write, full audit history, and temporal queries.", prereqs: "Clean Architecture, Event-Driven", difficulty: "Expert", realWorld: "Banking transaction history, collaborative document editing, git (event sourcing for code changes).", mistakes: "Using Event Sourcing for everything. It adds massive complexity. Use only when audit trail is a core requirement.", resources: ["CQRS Journey (Microsoft)", "Versioning in an Event Sourced System (Greg Young)"], practice: ["Build a simple bank with Event Sourcing. Implement event versioning and projection rebuild."] },
        ]
      }
    ]
  },
  {
    id: 18, emoji: "📐", title: "System Design", color: "#f687b3", darkColor: "#9d174d",
    sections: [
      {
        title: "Distributed Systems",
        topics: [
          { name: "Scalability & Load Balancing", what: "Horizontal scaling (more servers) vs vertical (bigger server). Load balancers distribute traffic: Round Robin, Least Connections, IP Hash.", why: "Understanding scaling enables designing systems that handle 10x, 100x traffic growth.", prereqs: "Networking, HTTP, Cloud basics", difficulty: "Intermediate", realWorld: "AWS ALB routing to Auto Scaling Groups. Nginx as load balancer. Sticky sessions for stateful apps.", mistakes: "Vertical scaling as the primary strategy (hit limits, single point of failure).", resources: ["Designing Data-Intensive Applications (DDIA)", "System Design Interview (Alex Xu)"], practice: ["Design a URL shortener. Design a Twitter feed. Design a rate limiter at scale."] },
          { name: "CAP Theorem", what: "In a distributed system, you can only guarantee 2 of: Consistency, Availability, Partition Tolerance.", why: "Explains why distributed databases make different tradeoffs. Guides database selection.", prereqs: "Distributed systems basics, Databases", difficulty: "Advanced", realWorld: "DynamoDB chooses AP (available during partition). HBase chooses CP. Understanding this guides DB selection.", mistakes: "Thinking you need perfect consistency when eventual consistency is acceptable (99% of cases).", resources: ["DDIA Chapter 9", "Aphyr's blog (Kyle Kingsbury, Jepsen tests)"], practice: ["Demonstrate CAP tradeoffs by analyzing MongoDB, Cassandra, and PostgreSQL behavior during network partition"] },
          { name: "Caching Strategies", what: "Cache-aside, write-through, write-behind, read-through. Cache invalidation: TTL, event-driven, versioning.", why: "Caching is the highest-impact performance optimization. 'There are only 2 hard problems in CS...'", prereqs: "Redis, Databases", difficulty: "Intermediate", realWorld: "CDN for static assets, Redis for API responses, database query cache, application-level memoization.", mistakes: "Cache stampede (thundering herd). Stale cache after updates. Cache everything without measuring miss rate.", resources: ["AWS Caching Best Practices", "Redis documentation on caching patterns"], practice: ["Implement cache-aside pattern with Redis. Handle cache invalidation on database write."] },
          { name: "Message Queues & Kafka", what: "Async message brokers decouple producers from consumers. Kafka: distributed log. RabbitMQ: traditional MQ.", why: "Enables fault tolerance, rate limiting, and async processing at massive scale.", prereqs: "Event-Driven Architecture", difficulty: "Advanced", realWorld: "Kafka powers LinkedIn, Netflix, Uber for real-time data pipelines processing millions of events/second.", mistakes: "Using Kafka for simple task queues (use BullMQ/RabbitMQ). Not designing for consumer group failures.", resources: ["Kafka: The Definitive Guide (O'Reilly)", "Confluent Kafka tutorials"], practice: ["Build a real-time analytics pipeline: event producers → Kafka → consumers → dashboard"] },
        ]
      }
    ]
  },
  {
    id: 19, emoji: "📡", title: "Observability & Monitoring", color: "#34d399", darkColor: "#065f46",
    sections: [
      {
        title: "The Three Pillars",
        topics: [
          { name: "Logging (Winston/Pino)", what: "Structured logs (JSON) with levels (error/warn/info/debug), correlation IDs, and contextual metadata.", why: "Logs are your first line of investigation when something breaks. Structured logs are queryable.", prereqs: "Node.js basics", difficulty: "Beginner", realWorld: "Centralized logging in ELK/Loki. Correlation IDs trace requests across microservices. Log levels in production.", mistakes: "Logging sensitive data (PII, tokens). console.log in production. Unstructured logs that can't be queried.", resources: ["Pino documentation", "Logging Best Practices (AWS)", "12-Factor App: Logs"], practice: ["Set up structured logging with Pino. Add correlation IDs. Ship logs to a local ELK stack."] },
          { name: "Metrics (Prometheus/Grafana)", what: "Numerical measurements over time: request rate, error rate, latency, CPU usage. Prometheus scrapes, Grafana visualizes.", why: "Metrics reveal trends that logs miss. Alerting on SLA breaches before users notice.", prereqs: "Basics", difficulty: "Intermediate", realWorld: "Dashboard showing request rate, p50/p95/p99 latency, error rate, database connection pool utilization.", mistakes: "Alerting on every metric (alert fatigue). Not tracking the RED method: Rate, Errors, Duration.", resources: ["Prometheus documentation", "Grafana tutorials", "SRE Book: Monitoring"], practice: ["Instrument a Node.js app with prom-client. Build a Grafana dashboard with RED method metrics."] },
          { name: "Distributed Tracing (OpenTelemetry)", what: "Traces track requests across multiple services via trace IDs. Spans represent individual operations. OpenTelemetry is the standard.", why: "In microservices, logs alone can't show why a request took 3 seconds. Traces show exactly which service was slow.", prereqs: "Microservices, Logging", difficulty: "Advanced", realWorld: "Jaeger and Zipkin visualize traces. OpenTelemetry instruments Node.js, Go, Java apps uniformly.", mistakes: "Sampling 100% of traces (massive overhead). Not propagating trace context across service boundaries.", resources: ["OpenTelemetry documentation", "Distributed Systems Observability (O'Reilly)"], practice: ["Instrument a 3-service system with OpenTelemetry. Trace a request end-to-end. Find the bottleneck."] },
          { name: "Error Tracking (Sentry)", what: "Captures, groups, and alerts on application errors. Stack traces, user context, breadcrumbs, source maps.", why: "Errors in production happen. Sentry tells you immediately, with full context to fix them.", prereqs: "Logging basics", difficulty: "Beginner", realWorld: "Sentry in every production app. Error grouping prevents notification flooding. Release tracking shows regressions.", mistakes: "Not setting up error boundaries in React. Not tagging errors with user context. Ignoring error budgets.", resources: ["Sentry documentation", "Error Monitoring Best Practices"], practice: ["Integrate Sentry into a React + Node app. Configure alerts, source maps, and user context."] },
        ]
      }
    ]
  },
  {
    id: 20, emoji: "⚡", title: "Performance Engineering", color: "#fbd38d", darkColor: "#92400e",
    sections: [
      {
        title: "Frontend Performance",
        topics: [
          { name: "Core Web Vitals", what: "Google's user-centric performance metrics: LCP (Largest Contentful Paint), CLS (Cumulative Layout Shift), INP (Interaction to Next Paint).", why: "Core Web Vitals are a Google ranking factor. They measure real user experience.", prereqs: "HTML, CSS, JavaScript, React basics", difficulty: "Intermediate", realWorld: "LCP: load the hero image faster. CLS: reserve space for images. INP: eliminate long tasks blocking interaction.", mistakes: "Optimizing in devtools without measuring Real User Monitoring (RUM) data. Lab vs field data gaps.", resources: ["web.dev Core Web Vitals", "Lighthouse documentation", "Chrome User Experience Report"], practice: ["Achieve Lighthouse scores: Performance 90+, Accessibility 100, SEO 90+ on a real project"] },
          { name: "Bundle Optimization", what: "Code splitting, tree shaking, lazy loading, dynamic imports, analyzing with webpack-bundle-analyzer.", why: "Large JavaScript bundles are the #1 frontend performance killer. Parse time blocks the main thread.", prereqs: "JavaScript, Webpack/Vite basics", difficulty: "Intermediate", realWorld: "Route-based splitting in React Router. Dynamic import() for heavy libraries. Eliminating dead code.", mistakes: "Importing entire lodash library for one function. Not splitting vendor chunks. No code splitting.", resources: ["webpack-bundle-analyzer", "Vite documentation", "web.dev JavaScript performance"], practice: ["Reduce a React app's initial bundle by 50% using code splitting and tree shaking"] },
        ]
      },
      {
        title: "Backend Performance",
        topics: [
          { name: "Profiling & Bottleneck Detection", what: "Node.js built-in profiler, clinic.js, 0x flame graph tool. Identify CPU hotspots and memory issues.", why: "You cannot optimize what you cannot measure. Profiling reveals the actual bottleneck.", prereqs: "Node.js, Linux", difficulty: "Advanced", realWorld: "clinic.js doctor diagnoses event loop delays, memory leaks, and I/O waits automatically.", mistakes: "Guessing at bottlenecks instead of measuring. Optimizing the wrong code path.", resources: ["clinic.js documentation", "Node.js Profiling Guide", "0x flame graph tool"], practice: ["Profile a slow Node.js API endpoint. Generate a flame graph. Identify and fix the top bottleneck."] },
          { name: "Database Query Optimization", what: "EXPLAIN ANALYZE, index optimization, connection pooling (pg-pool), query result caching, batch loading.", why: "Database is usually the bottleneck. N+1 queries kill performance at scale.", prereqs: "SQL, PostgreSQL", difficulty: "Advanced", realWorld: "Adding a single index reducing a 10-second report query to 50ms. DataLoader batching GraphQL queries.", mistakes: "SELECT * in production. Missing indexes on JOIN columns. Not using connection pooling.", resources: ["Use The Index, Luke", "DataLoader documentation", "PostgreSQL EXPLAIN documentation"], practice: ["Find the 5 slowest queries in a PostgreSQL database. Optimize each. Measure improvement."] },
        ]
      }
    ]
  },
  {
    id: 21, emoji: "🤖", title: "AI Engineering", color: "#c084fc", darkColor: "#7e22ce",
    sections: [
      {
        title: "LLMs & AI Applications",
        topics: [
          { name: "LLM Fundamentals", what: "Large Language Models: transformer architecture, tokens, context windows, temperature, top-p sampling.", why: "AI is becoming a core part of every application. Developers need to integrate LLMs effectively.", prereqs: "Python/JavaScript basics, APIs", difficulty: "Intermediate", realWorld: "OpenAI, Anthropic, Google APIs. Understanding token limits, cost optimization, model selection.", mistakes: "Not understanding token limits (causes truncation). Using temperature=1 for deterministic tasks.", resources: ["Andrej Karpathy: Intro to LLMs", "Anthropic documentation", "OpenAI API documentation"], practice: ["Build a multi-turn chatbot. Implement token counting. Optimize prompts for cost."] },
          { name: "RAG (Retrieval Augmented Generation)", what: "Combining LLMs with external knowledge retrieval. Embed documents → store in vector DB → retrieve relevant chunks → feed to LLM.", why: "Solves LLM knowledge cutoffs and hallucinations for domain-specific applications.", prereqs: "LLM fundamentals, Embeddings, Vector databases", difficulty: "Advanced", realWorld: "Customer support chatbot that queries your documentation. Internal knowledge base assistant.", mistakes: "Poor chunking strategy. Not reranking retrieved results. Ignoring retrieval quality metrics.", resources: ["LlamaIndex documentation", "LangChain documentation", "RAG survey paper"], practice: ["Build a RAG system over a documentation set. Evaluate with RAGAS metrics."] },
          { name: "AI Agents & MCP", what: "LLMs with tool use: search, code execution, database queries. Model Context Protocol (MCP) standardizes tool definitions.", why: "Agents can complete multi-step tasks autonomously. MCP enables interoperable AI tool ecosystems.", prereqs: "LLM fundamentals, APIs", difficulty: "Advanced", realWorld: "GitHub Copilot agents, Claude's tool use for file operations, Cursor AI for code editing.", mistakes: "Infinite agent loops. No cost guardrails. Agents with too much autonomy and no human oversight.", resources: ["Anthropic MCP specification", "LangGraph documentation", "Building LLM-powered apps (Chip Huyen)"], practice: ["Build a research agent that searches the web, reads papers, and generates a summary report"] },
          { name: "Prompt Engineering", what: "Designing prompts that reliably elicit desired LLM behavior: system prompts, few-shot examples, chain-of-thought.", why: "Prompt quality directly determines AI application quality. Good prompts replace fine-tuning for many tasks.", prereqs: "LLM fundamentals", difficulty: "Intermediate", realWorld: "System prompts for customer service tone. Chain-of-thought for complex reasoning tasks.", mistakes: "Not iterating on prompts systematically. No evals/benchmarks for prompt quality.", resources: ["Anthropic Prompt Engineering Guide", "DAIR.AI Prompt Engineering Guide", "OpenAI Cookbook"], practice: ["Build a prompt evaluation harness. Test 5 prompt variants against a test suite of inputs."] },
        ]
      }
    ]
  },
  {
    id: 22, emoji: "🛠️", title: "Developer Productivity", color: "#4ade80", darkColor: "#15803d",
    sections: [
      {
        title: "Tools & Workflow",
        topics: [
          { name: "VS Code Mastery", what: "Multi-cursor editing, keyboard shortcuts, workspace settings, extensions, debugging, remote development.", why: "A master programmer is fast. Knowing your editor deeply multiplies your output.", prereqs: "None", difficulty: "Beginner", realWorld: "Remote SSH development, Docker container development, debugging Node.js apps with breakpoints.", mistakes: "Using mouse for everything. Not learning keybindings. Ignoring the integrated terminal and debugger.", resources: ["VS Code documentation", "VS Code Can Do That (Burke Holland)", "vscodecandothat.com"], practice: ["Complete an entire coding task using only keyboard shortcuts. Set up and use the debugger."] },
          { name: "Terminal & Shell Mastery", what: "zsh/fish with plugins, aliases, functions, fzf, ripgrep, bat, eza, tmux, dotfiles management.", why: "The terminal is where elite developers live. Speed in the terminal multiplies productivity.", prereqs: "Basic CLI", difficulty: "Intermediate", realWorld: "Fuzzy file finding, searching codebases 100x faster than grep, multiplexed terminal sessions.", mistakes: "Not investing in terminal setup. Not learning keyboard shortcuts. Reinventing the wheel without learning tools.", resources: ["Your Missing Semester of CS Education (MIT)", "zsh documentation", "tmux productive mouse-free development"], practice: ["Set up a complete terminal environment. Automate your development machine setup with a dotfiles repo."] },
          { name: "Technical Writing & Documentation", what: "Architecture Decision Records (ADRs), READMEs, API docs, runbooks, postmortems.", why: "Code without documentation is incomplete. Documentation multiplies team velocity.", prereqs: "Basic writing skills", difficulty: "Beginner", realWorld: "README that enables onboarding in hours not days. ADRs that explain why decisions were made.", mistakes: "Documenting what (the code shows that). Document why. Out-of-date documentation is worse than none.", resources: ["Divio Documentation System", "Google Developer Style Guide", "Docs as Code"], practice: ["Write a complete README for your portfolio project. Write an ADR for an architecture decision."] },
        ]
      }
    ]
  },
  {
    id: 23, emoji: "🧰", title: "Essential Tools", color: "#60a5fa", darkColor: "#1d4ed8",
    sections: [
      {
        title: "Production Tool Stack",
        topics: [
          { name: "Logging & Monitoring", what: "Winston/Pino (logging), Prometheus+Grafana (metrics), Sentry (errors), Datadog/New Relic (APM).", why: "Production apps need visibility. These tools are the standard at most companies.", prereqs: "Node.js, Docker", difficulty: "Intermediate", realWorld: "ELK Stack for log aggregation. Grafana for dashboards. Sentry for real-time error alerts.", mistakes: "Console.log in production. No alerting. Choosing tools without considering cost at scale.", resources: ["Datadog documentation", "Prometheus + Grafana getting started", "ELK Stack guide"], practice: ["Build a monitoring stack with Prometheus, Grafana, and Loki using Docker Compose"] },
          { name: "API Testing (Postman/Insomnia/Hoppscotch)", what: "HTTP client tools for designing, testing, and documenting APIs. Collections, environments, automated tests.", why: "Every backend developer needs an API testing tool for development and debugging.", prereqs: "REST APIs basics", difficulty: "Beginner", realWorld: "Testing APIs without a frontend, sharing API collections with team, automated API contract tests.", mistakes: "Not using environments (hardcoded URLs). Not writing assertion tests in collections.", resources: ["Postman documentation", "Hoppscotch (open source alternative)"], practice: ["Build a complete Postman collection for an API with tests, environments, and documentation"] },
          { name: "ORM & Database Tools", what: "Prisma/TypeORM/Drizzle (ORMs), pgAdmin/TablePlus (GUI), pg-dump (backups), Flyway/Liquibase (migrations).", why: "ORMs reduce boilerplate. Database GUIs enable exploration. Migrations enable version-controlled schema changes.", prereqs: "SQL, Node.js", difficulty: "Intermediate", realWorld: "Prisma auto-generates TypeScript types from schema. Flyway migrations in CI/CD pipeline.", mistakes: "Skipping migrations (manual schema changes cause drift). Over-using ORM for complex queries (use raw SQL).", resources: ["Prisma documentation", "Drizzle ORM documentation", "Flyway documentation"], practice: ["Set up a project with Prisma, implement 5 migrations, roll one back"] },
          { name: "Queue Systems", what: "BullMQ (Redis-backed), RabbitMQ, SQS (AWS). Job queues, priority queues, delayed jobs, retries.", why: "Async processing prevents timeouts for long-running tasks (emails, image processing, exports).", prereqs: "Redis, Node.js", difficulty: "Intermediate", realWorld: "Email sending queue, PDF generation queue, video processing pipeline, webhook delivery.", mistakes: "Processing long tasks synchronously in request handlers (causes timeouts). No retry logic.", resources: ["BullMQ documentation", "RabbitMQ tutorials", "AWS SQS documentation"], practice: ["Build a job queue system for PDF generation with priorities, retries, and progress tracking"] },
        ]
      }
    ]
  },
  {
    id: 24, emoji: "🏆", title: "Real Projects", color: "#fb923c", darkColor: "#c2410c",
    sections: [
      {
        title: "Project Portfolio",
        topics: [
          { name: "Beginner Projects", what: "Todo app, Weather app, Calculator, Notes app, Quiz app.", why: "Build confidence with fundamentals. Learn CRUD, state management, API consumption.", prereqs: "HTML, CSS, JavaScript basics", difficulty: "Beginner", realWorld: "Skills learned apply to every real application: state, events, APIs, DOM.", mistakes: "Tutorial hell. Build them yourself, don't just follow along.", resources: ["The Odin Project", "Full Stack Open (Helsinki University, free)"], practice: ["Build a Todo app with: local storage, filtering, drag-to-reorder, dark mode"] },
          { name: "Intermediate Projects", what: "E-commerce store, Social media clone, Project management tool, Real-time chat, Blog with CMS.", why: "Combines frontend + backend + database. Production-like complexity.", prereqs: "React, Node.js, Database basics", difficulty: "Intermediate", realWorld: "Authentication, file uploads, real-time features, search, pagination — all real-world skills.", mistakes: "Skipping auth for 'simplicity.' Always include auth; it teaches the most about web security.", resources: ["Full Stack Open", "The Odin Project", "Josh Comeau's courses"], practice: ["Build a Trello clone with: auth, boards, drag-drop, real-time updates via WebSockets"] },
          { name: "Advanced Projects", what: "Distributed URL shortener, Video streaming platform, Code collaboration editor, Multi-tenant SaaS.", why: "Forces application of system design, performance optimization, and scalability principles.", prereqs: "All fundamentals + system design basics", difficulty: "Advanced", realWorld: "Resume differentiators. Shows you can build and ship production-grade applications.", mistakes: "Building features nobody uses. Focus on depth (performance, reliability) not breadth.", resources: ["System Design Interview (Alex Xu)", "DDIA"], practice: ["Build a URL shortener handling 1M req/day with analytics, custom slugs, and expiry"] },
          { name: "Enterprise Projects", what: "Multi-tenant SaaS platform with RBAC, billing, audit logs, API rate limiting, and multi-region deployment.", why: "Demonstrates production readiness: the gap between demo apps and real enterprise software.", prereqs: "Everything above", difficulty: "Expert", realWorld: "Stripe, GitHub, Linear, Notion all solve these problems. Understanding them makes you hireable at senior level.", mistakes: "Skipping the hard parts (billing, multi-tenancy, security). These are where value lives.", resources: ["Stripe documentation", "PlanetScale multi-tenancy guide", "Lenny's Newsletter"], practice: ["Build a SaaS boilerplate with: auth, orgs/teams, billing via Stripe, RBAC, audit logs, API"] },
        ]
      }
    ]
  },
  {
    id: 25, emoji: "🎯", title: "Senior Developer Skills", color: "#a3e635", darkColor: "#3f6212",
    sections: [
      {
        title: "Technical Leadership",
        topics: [
          { name: "Code Reviews", what: "Reviewing code for correctness, security, performance, maintainability, and knowledge sharing.", why: "Code reviews are the most impactful mechanism for maintaining quality and growing a team.", prereqs: "Solid technical skills across the stack", difficulty: "Intermediate", realWorld: "Reviewing PRs for security vulnerabilities, performance issues, missing tests, unclear naming.", mistakes: "Nitpicking style issues (use linters for that). Not explaining why. Being prescriptive vs suggestive.", resources: ["Google Engineering Code Review Guide", "The Art of Giving and Receiving Code Reviews"], practice: ["Review 10 open source PRs. Give constructive feedback. Submit your own PR and request review."] },
          { name: "Technical Decision Making", what: "Architecture Decision Records, trade-off analysis, Build vs Buy vs Open Source, RFC process.", why: "Senior engineers make decisions that affect teams for years. Process and documentation matter.", prereqs: "Architecture knowledge, Communication skills", difficulty: "Advanced", realWorld: "Choosing a database, evaluating frameworks, deciding to refactor vs rewrite — all need structured decision making.", mistakes: "Decisions based on hype or personal preference. 'We should use Rust' without considering team skills.", resources: ["Architecture Decision Records (Michael Nygard)", "Thinking Strategically (Dixit & Nalebuff)"], practice: ["Write an ADR for a real technology decision you've made. Present it to peers for feedback."] },
          { name: "Estimation & Planning", what: "Breaking down work into tasks, estimating complexity (story points vs time), handling uncertainty.", why: "Reliable estimates enable product teams to plan. Chronic underestimation destroys trust.", prereqs: "Engineering experience", difficulty: "Intermediate", realWorld: "Sprint planning, project scoping, stakeholder communication about timelines.", mistakes: "Estimating without accounting for testing, code review, deployment, and unknowns. Always add a buffer.", resources: ["Software Estimation (Steve McConnell)", "Shape Up (Basecamp, free)"], practice: ["Estimate a feature, build it, compare estimate to actual. Repeat 10 times to calibrate."] },
          { name: "Mentoring & Leadership", what: "1:1s, pair programming, technical documentation, creating learning resources, giving talks.", why: "Senior engineers multiply team output through others. Mentoring is a force multiplier.", prereqs: "Experience, Empathy, Communication", difficulty: "Advanced", realWorld: "Onboarding junior developers, leading technical interviews, giving tech talks, writing blog posts.", mistakes: "Just doing work instead of teaching. Enabling learned helplessness by always giving answers.", resources: ["The Staff Engineer's Path (Tanya Reilly)", "An Elegant Puzzle (Will Larson)"], practice: ["Mentor a junior developer for 1 month. Pair program 3x. Write a technical blog post."] },
        ]
      }
    ]
  }
];

const difficultyColors = {
  "Beginner": "#4ade80",
  "Intermediate": "#fbbf24",
  "Advanced": "#f87171",
  "Expert": "#c084fc"
};

const timeEstimates = {
  1: "2-4 weeks", 2: "3-4 weeks", 3: "1-2 weeks", 4: "2-3 weeks",
  5: "3-4 weeks", 6: "6-8 weeks", 7: "3-4 weeks", 8: "6-8 weeks",
  9: "3-4 weeks", 10: "4-6 weeks", 11: "4-6 weeks", 12: "4-6 weeks",
  13: "3-4 weeks", 14: "3-4 weeks", 15: "4-6 weeks", 16: "4-6 weeks",
  17: "4-6 weeks", 18: "4-6 weeks", 19: "2-3 weeks", 20: "3-4 weeks",
  21: "4-6 weeks", 22: "1-2 weeks", 23: "2-3 weeks", 24: "Ongoing",
  25: "Ongoing"
};

export default function App() {
  const [activePhase, setActivePhase] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const [search, setSearch] = useState("");
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(localStorage.getItem("fsd-completed") || "{}"); } catch { return {}; }
  });
  const [view, setView] = useState("roadmap");
  const topicRef = useRef(null);

  useEffect(() => {
    try { localStorage.setItem("fsd-completed", JSON.stringify(completed)); } catch {}
  }, [completed]);

  const totalTopics = phases.reduce((sum, p) => sum + p.sections.reduce((s, sec) => s + sec.topics.length, 0), 0);
  const completedCount = Object.values(completed).filter(Boolean).length;
  const progressPct = Math.round((completedCount / totalTopics) * 100);

  const filteredPhases = search.trim() === "" ? phases : phases.map(p => ({
    ...p,
    sections: p.sections.map(s => ({
      ...s,
      topics: s.topics.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.what.toLowerCase().includes(search.toLowerCase()))
    })).filter(s => s.topics.length > 0)
  })).filter(p => p.sections.length > 0);

  const toggleComplete = (key) => {
    setCompleted(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const openTopic = (topic, phaseColor) => {
    setActiveTopic({ ...topic, color: phaseColor });
    setTimeout(() => topicRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      background: "#080c14",
      color: "#e2e8f0",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background grid */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)`,
        backgroundSize: "48px 48px"
      }} />

      {/* Header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(8,12,20,0.95)",
        borderBottom: "1px solid rgba(0,212,255,0.12)",
        backdropFilter: "blur(12px)",
        padding: "0 24px"
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", gap: 16, padding: "12px 0", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 11, color: "#00d4ff", letterSpacing: 4, textTransform: "uppercase", marginBottom: 2 }}>FULL STACK</div>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5, color: "#fff" }}>Developer Roadmap</div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            {["roadmap", "progress", "plan"].map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: "6px 16px", borderRadius: 4, border: "1px solid",
                borderColor: view === v ? "#00d4ff" : "rgba(255,255,255,0.1)",
                background: view === v ? "rgba(0,212,255,0.1)" : "transparent",
                color: view === v ? "#00d4ff" : "#94a3b8",
                cursor: "pointer", fontSize: 12, fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 1
              }}>{v}</button>
            ))}
          </div>

          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search topics..."
            style={{
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)",
              borderRadius: 4, padding: "6px 14px", color: "#e2e8f0", fontSize: 13,
              fontFamily: "inherit", width: 200, outline: "none"
            }}
          />

          <div style={{ textAlign: "right", minWidth: 80 }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#00d4ff" }}>{progressPct}%</div>
            <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: 1 }}>{completedCount}/{totalTopics}</div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 2, background: "rgba(255,255,255,0.05)", margin: "0 24px" }}>
          <div style={{
            height: "100%", width: `${progressPct}%`,
            background: "linear-gradient(90deg, #00d4ff, #7c3aed)",
            transition: "width 0.5s ease"
          }} />
        </div>
      </header>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 24px", position: "relative", zIndex: 1 }}>

        {view === "plan" && (
          <div>
            <h2 style={{ fontSize: 24, color: "#00d4ff", marginBottom: 24, letterSpacing: 2, textTransform: "uppercase" }}>📅 Weekly Study Plan</h2>
            <div style={{ display: "grid", gap: 16 }}>
              {[
                { weeks: "Weeks 1–4", focus: "Phases 1-3: Computer Fundamentals, Linux Mastery, Git", goal: "Solid foundation — understand what's happening under the hood" },
                { weeks: "Weeks 5–8", focus: "Phases 4-5: HTML & CSS Mastery", goal: "Build pixel-perfect, accessible, responsive interfaces" },
                { weeks: "Weeks 9–16", focus: "Phases 6-7: JavaScript & TypeScript Mastery", goal: "Deep JS knowledge — the most important investment you'll make" },
                { weeks: "Weeks 17–22", focus: "Phases 8-9: DSA & Frontend Engineering", goal: "Algorithm skills for interviews + production frontend patterns" },
                { weeks: "Weeks 23–28", focus: "Phases 10-11: React & Backend Engineering", goal: "Build full-stack applications from frontend to API" },
                { weeks: "Weeks 29–34", focus: "Phases 12-13: Databases & Security", goal: "Production-ready data layer and security practices" },
                { weeks: "Weeks 35–38", focus: "Phases 14-15: Testing & DevOps", goal: "Quality guarantees and deployment automation" },
                { weeks: "Weeks 39–44", focus: "Phases 16-18: Cloud, Architecture & System Design", goal: "Scale and architect real-world systems" },
                { weeks: "Weeks 45–50", focus: "Phases 19-22: Observability, Performance, AI, Productivity", goal: "Elite-level operational and modern AI engineering skills" },
                { weeks: "Weeks 51+", focus: "Phases 23-25: Tools, Projects, Leadership (ongoing)", goal: "Build portfolio projects, develop leadership skills, contribute to open source" },
              ].map((row, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "180px 1fr 1fr", gap: 16,
                  padding: "16px 20px", background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)", borderRadius: 6,
                  alignItems: "center"
                }}>
                  <div style={{ color: "#00d4ff", fontSize: 13, fontWeight: 700 }}>{row.weeks}</div>
                  <div style={{ color: "#e2e8f0", fontSize: 13 }}>{row.focus}</div>
                  <div style={{ color: "#94a3b8", fontSize: 12, fontStyle: "italic" }}>{row.goal}</div>
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: 24, color: "#00d4ff", marginTop: 48, marginBottom: 24, letterSpacing: 2, textTransform: "uppercase" }}>🎯 Interview Preparation Path</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              {[
                { title: "Coding Interviews", items: ["Phase 8: DSA — LeetCode 150 core problems", "Focus: Arrays, Strings, Trees, Graphs, DP", "Practice: 2 problems/day for 3 months", "Tools: LeetCode, NeetCode, AlgoExpert"] },
                { title: "System Design", items: ["Phase 18: System Design mastery", "Study: DDIA + System Design Interview books", "Practice: Design 20 different systems", "Mock interviews: Pramp, Interviewing.io"] },
                { title: "Behavioral", items: ["STAR method for every experience", "Prepare 10 impactful stories from projects", "Leadership, conflict, failure examples", "Research company engineering blog"] },
                { title: "Full Stack Technical", items: ["Phases 6, 10, 11: JS, React, Backend deep dives", "Build 2-3 polished portfolio projects", "Deploy everything publicly", "Open source contributions"] },
              ].map((card, i) => (
                <div key={i} style={{ padding: "20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,212,255,0.1)", borderRadius: 8 }}>
                  <div style={{ color: "#00d4ff", fontWeight: 700, marginBottom: 12, textTransform: "uppercase", fontSize: 12, letterSpacing: 1 }}>{card.title}</div>
                  {card.items.map((item, j) => (
                    <div key={j} style={{ color: "#94a3b8", fontSize: 12, padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>→ {item}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {view === "progress" && (
          <div>
            <h2 style={{ fontSize: 24, color: "#00d4ff", marginBottom: 24, letterSpacing: 2, textTransform: "uppercase" }}>📊 Your Progress</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
              {phases.map(phase => {
                const phaseTopics = phase.sections.flatMap(s => s.topics);
                const phaseCompleted = phaseTopics.filter(t => completed[`${phase.id}-${t.name}`]).length;
                const pct = Math.round((phaseCompleted / phaseTopics.length) * 100);
                return (
                  <div key={phase.id} style={{
                    padding: "16px 20px", background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${pct === 100 ? phase.color : "rgba(255,255,255,0.07)"}`,
                    borderRadius: 8, cursor: "pointer",
                    transition: "all 0.2s"
                  }} onClick={() => { setView("roadmap"); setActivePhase(activePhase === phase.id ? null : phase.id); }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <div style={{ fontSize: 13 }}>{phase.emoji} Phase {phase.id}</div>
                      <div style={{ fontSize: 13, color: pct === 100 ? phase.color : "#64748b", fontWeight: 700 }}>{pct}%</div>
                    </div>
                    <div style={{ fontSize: 14, color: "#e2e8f0", marginBottom: 10 }}>{phase.title}</div>
                    <div style={{ height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 2 }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: phase.color, borderRadius: 2, transition: "width 0.5s" }} />
                    </div>
                    <div style={{ fontSize: 11, color: "#475569", marginTop: 6 }}>{phaseCompleted}/{phaseTopics.length} topics · ~{timeEstimates[phase.id]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === "roadmap" && (
          <div>
            {/* Phase overview grid */}
            {!activePhase && search === "" && (
              <div>
                <div style={{ textAlign: "center", marginBottom: 48 }}>
                  <div style={{ fontSize: 11, letterSpacing: 6, color: "#00d4ff", textTransform: "uppercase", marginBottom: 12 }}>Complete Skill Tree</div>
                  <h1 style={{ fontSize: 42, fontWeight: 800, letterSpacing: -1, color: "#fff", margin: 0 }}>
                    25 Phases to World-Class
                  </h1>
                  <p style={{ color: "#64748b", marginTop: 12, fontSize: 14 }}>
                    ~{completedCount}/{totalTopics} topics mastered · Click any phase to explore
                  </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
                  {phases.map(phase => {
                    const phaseTopics = phase.sections.flatMap(s => s.topics);
                    const phaseCompleted = phaseTopics.filter(t => completed[`${phase.id}-${t.name}`]).length;
                    const pct = Math.round((phaseCompleted / phaseTopics.length) * 100);
                    return (
                      <button key={phase.id} onClick={() => setActivePhase(phase.id)} style={{
                        background: "rgba(255,255,255,0.02)",
                        border: `1px solid rgba(${phase.color.slice(1).match(/.{2}/g).map(x => parseInt(x,16)).join(",")},0.25)`,
                        borderRadius: 8, padding: "18px 20px", cursor: "pointer",
                        textAlign: "left", transition: "all 0.2s", fontFamily: "inherit",
                        color: "#e2e8f0",
                        "&:hover": { background: "rgba(255,255,255,0.05)" }
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <div style={{ fontSize: 28, marginBottom: 8 }}>{phase.emoji}</div>
                          <div style={{ fontSize: 11, color: pct > 0 ? phase.color : "#475569", fontWeight: 700 }}>{pct}%</div>
                        </div>
                        <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4, letterSpacing: 1 }}>PHASE {phase.id}</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0", marginBottom: 8 }}>{phase.title}</div>
                        <div style={{ height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 1 }}>
                          <div style={{ height: "100%", width: `${pct}%`, background: phase.color, borderRadius: 1 }} />
                        </div>
                        <div style={{ fontSize: 11, color: "#475569", marginTop: 6 }}>
                          {phaseTopics.length} topics · {timeEstimates[phase.id]}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Phase detail */}
            {(activePhase || search) && (
              <div>
                {activePhase && !search && (
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
                    <button onClick={() => { setActivePhase(null); setActiveTopic(null); }} style={{
                      background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
                      color: "#94a3b8", cursor: "pointer", padding: "6px 16px", borderRadius: 4,
                      fontFamily: "inherit", fontSize: 12
                    }}>← Back</button>
                    {(() => {
                      const phase = phases.find(p => p.id === activePhase);
                      return (
                        <div>
                          <span style={{ fontSize: 20 }}>{phase.emoji}</span>
                          <span style={{ marginLeft: 10, fontSize: 18, fontWeight: 700, color: phase.color }}>{phase.title}</span>
                          <span style={{ marginLeft: 8, fontSize: 12, color: "#475569" }}>Phase {phase.id} · ~{timeEstimates[phase.id]}</span>
                        </div>
                      );
                    })()}
                  </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: activeTopic ? "1fr 1fr" : "1fr", gap: 24, alignItems: "start" }}>
                  {/* Topics list */}
                  <div>
                    {filteredPhases
                      .filter(p => !activePhase || p.id === activePhase)
                      .map(phase => (
                        <div key={phase.id} style={{ marginBottom: 32 }}>
                          {!activePhase && (
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, cursor: "pointer" }}
                              onClick={() => setActivePhase(phase.id)}>
                              <span style={{ fontSize: 18 }}>{phase.emoji}</span>
                              <span style={{ fontSize: 16, fontWeight: 700, color: phase.color }}>Phase {phase.id}: {phase.title}</span>
                            </div>
                          )}
                          {phase.sections.map(section => (
                            <div key={section.title} style={{ marginBottom: 20 }}>
                              <div style={{ fontSize: 11, color: "#475569", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10, paddingBottom: 6, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                {section.title}
                              </div>
                              <div style={{ display: "grid", gap: 6 }}>
                                {section.topics.map(topic => {
                                  const key = `${phase.id}-${topic.name}`;
                                  const done = completed[key];
                                  const isActive = activeTopic?.name === topic.name;
                                  return (
                                    <div key={topic.name} style={{
                                      display: "flex", alignItems: "center", gap: 10,
                                      padding: "10px 14px",
                                      background: isActive ? `rgba(${phase.color.slice(1).match(/.{2}/g).map(x => parseInt(x,16)).join(",")},0.1)` : "rgba(255,255,255,0.02)",
                                      border: `1px solid ${isActive ? phase.color : "rgba(255,255,255,0.06)"}`,
                                      borderRadius: 6, cursor: "pointer",
                                      transition: "all 0.15s"
                                    }}>
                                      <button onClick={() => toggleComplete(key)} style={{
                                        width: 18, height: 18, borderRadius: 3,
                                        border: `2px solid ${done ? phase.color : "rgba(255,255,255,0.2)"}`,
                                        background: done ? phase.color : "transparent",
                                        cursor: "pointer", flexShrink: 0, padding: 0,
                                        display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontSize: 10
                                      }}>{done ? "✓" : ""}</button>

                                      <div style={{ flex: 1 }} onClick={() => openTopic(topic, phase.color)}>
                                        <div style={{ fontSize: 13, color: done ? "#475569" : "#e2e8f0", fontWeight: 500, textDecoration: done ? "line-through" : "none" }}>
                                          {topic.name}
                                        </div>
                                        <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>{topic.what.slice(0, 80)}…</div>
                                      </div>

                                      <div style={{
                                        fontSize: 10, padding: "2px 8px", borderRadius: 10,
                                        background: `${difficultyColors[topic.difficulty]}22`,
                                        color: difficultyColors[topic.difficulty],
                                        flexShrink: 0
                                      }}>{topic.difficulty}</div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                  </div>

                  {/* Topic detail panel */}
                  {activeTopic && (
                    <div ref={topicRef} style={{
                      position: "sticky", top: 90,
                      background: "rgba(8,12,20,0.98)",
                      border: `1px solid ${activeTopic.color}44`,
                      borderRadius: 10, overflow: "hidden"
                    }}>
                      <div style={{ background: `${activeTopic.color}18`, padding: "20px 24px", borderBottom: `1px solid ${activeTopic.color}33` }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <div>
                            <div style={{ fontSize: 11, color: activeTopic.color, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Topic Deep Dive</div>
                            <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{activeTopic.name}</div>
                          </div>
                          <div style={{
                            fontSize: 11, padding: "4px 12px", borderRadius: 12,
                            background: `${difficultyColors[activeTopic.difficulty]}22`,
                            color: difficultyColors[activeTopic.difficulty],
                            border: `1px solid ${difficultyColors[activeTopic.difficulty]}44`
                          }}>{activeTopic.difficulty}</div>
                        </div>
                      </div>

                      <div style={{ padding: "20px 24px", overflow: "auto", maxHeight: "70vh" }}>
                        {[
                          { label: "What It Is", content: activeTopic.what, icon: "📖" },
                          { label: "Why It Matters", content: activeTopic.why, icon: "💡" },
                          { label: "Prerequisites", content: activeTopic.prereqs, icon: "🔑" },
                          { label: "Real-World Usage", content: activeTopic.realWorld, icon: "🌐" },
                          { label: "Common Mistakes", content: activeTopic.mistakes, icon: "⚠️" },
                        ].map(item => (
                          <div key={item.label} style={{ marginBottom: 18 }}>
                            <div style={{ fontSize: 11, color: activeTopic.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
                              {item.icon} {item.label}
                            </div>
                            <div style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.7, paddingLeft: 8, borderLeft: `2px solid ${activeTopic.color}44` }}>
                              {item.content}
                            </div>
                          </div>
                        ))}

                        <div style={{ marginBottom: 18 }}>
                          <div style={{ fontSize: 11, color: activeTopic.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
                            📚 Best Resources
                          </div>
                          {activeTopic.resources.map((r, i) => (
                            <div key={i} style={{ fontSize: 12, color: "#94a3b8", padding: "4px 0 4px 12px", borderLeft: `2px solid ${activeTopic.color}33` }}>
                              → {r}
                            </div>
                          ))}
                        </div>

                        <div>
                          <div style={{ fontSize: 11, color: activeTopic.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
                            🏋️ Practice Exercises
                          </div>
                          {activeTopic.practice.map((p, i) => (
                            <div key={i} style={{
                              fontSize: 12, color: "#94a3b8", padding: "6px 12px", marginBottom: 6,
                              background: `${activeTopic.color}0d`, borderRadius: 4,
                              borderLeft: `3px solid ${activeTopic.color}`
                            }}>{p}</div>
                          ))}
                        </div>

                        <button onClick={() => setActiveTopic(null)} style={{
                          marginTop: 20, width: "100%", padding: "10px",
                          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                          color: "#94a3b8", cursor: "pointer", borderRadius: 6,
                          fontFamily: "inherit", fontSize: 12
                        }}>Close</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
