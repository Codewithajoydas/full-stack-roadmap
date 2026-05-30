// This is the expanded phases array
export const phases = [
  // ============================================================
  // PHASE 1 — COMPUTER SCIENCE FOUNDATIONS
  // ============================================================
  {
    id: 1,
    emoji: "🖥️",
    title: "Computer Science Foundations",
    color: "#00d4ff",
    darkColor: "#0088aa",
    sections: [
      {
        title: "Computer Architecture",
        topics: [
          {
            name: "CPU Architecture",
            what: "Central Processing Unit — executes instructions via fetch-decode-execute cycle. Includes ALU, control unit, registers, and cache hierarchy (L1/L2/L3).",
            why: "Understanding CPU architecture helps write cache-friendly code, reason about parallelism, and optimize compute-heavy tasks.",
            prereqs: "None",
            difficulty: "Beginner",
            realWorld:
              "Knowing CPU-bound vs I/O-bound behavior guides concurrency model selection. Cache-friendly data layouts can yield 10x speedups.",
            mistakes:
              "Assuming faster CPU always means faster code. Cache misses and branch mispredictions dominate at scale.",
            resources: [
              "Computer Organization and Design (Patterson & Hennessy)",
              "Crash Course Computer Science (YouTube)",
              "nand2tetris.org",
            ],
            practice: [
              "Build a simple ALU in a hardware simulator",
              "Compare sequential vs random memory access benchmarks",
            ],
          },
          {
            name: "Memory Hierarchy",
            what: "Layered memory system: Registers → L1 Cache → L2 Cache → L3 Cache → RAM → SSD → HDD. Each level trades speed for capacity.",
            why: "Understanding memory hierarchy is essential for writing high-performance code. Cache misses are the #1 hidden performance bottleneck.",
            prereqs: "CPU Architecture",
            difficulty: "Intermediate",
            realWorld:
              "Structure-of-arrays vs array-of-structures tradeoff. Prefetching data. Cache line awareness in concurrent programming.",
            mistakes:
              "Ignoring spatial/temporal locality. Accessing memory randomly destroys cache efficiency.",
            resources: [
              "What Every Programmer Should Know About Memory (Drepper)",
              "Gallery of Processor Cache Effects",
            ],
            practice: [
              "Write cache-friendly matrix multiplication. Measure performance vs naive implementation.",
            ],
          },
          {
            name: "RAM (Random Access Memory)",
            what: "Volatile, fast storage for currently running programs. DRAM cells, addressing, row/column selection, DIMM modules.",
            why: "Guides memory allocation strategy, garbage collection tuning, and why keeping working sets in RAM matters enormously.",
            prereqs: "Memory Hierarchy",
            difficulty: "Beginner",
            realWorld:
              "Choosing caching strategies, understanding heap vs stack, diagnosing memory leaks, JVM heap tuning.",
            mistakes:
              "Treating RAM as infinite. Understanding memory limits is critical for architectural decisions.",
            resources: [
              "Operating Systems: Three Easy Pieces (OSTEP)",
              "What Every Programmer Should Know About Memory",
            ],
            practice: [
              "Write a program that causes memory pressure and observe OS swapping behavior",
            ],
          },
          {
            name: "Storage (SSD/HDD/NVMe)",
            what: "ROM is permanent firmware storage. SSDs use NAND flash (fast, no moving parts). HDDs use spinning platters. NVMe uses PCIe lanes for ultra-low latency.",
            why: "Influences database design, file I/O strategies, and understanding latency numbers everyone should know.",
            prereqs: "Memory Hierarchy",
            difficulty: "Beginner",
            realWorld:
              "HDD seek ~10ms, SATA SSD ~0.1ms, NVMe ~0.02ms, RAM ~100ns. These numbers drive architecture decisions.",
            mistakes:
              "Ignoring I/O as a bottleneck. Most web apps are I/O-bound, not CPU-bound.",
            resources: [
              "Latency Numbers Every Programmer Should Know (interactive)",
              "How SSDs Work - AnandTech",
            ],
            practice: [
              "Benchmark sequential vs random I/O on your machine using fio or dd",
            ],
          },
          {
            name: "Assembly Basics",
            what: "Low-level language that maps directly to machine instructions. x86-64 registers (RAX, RBX, RCX…), MOV, ADD, JMP, CALL, RET instructions.",
            why: "Demystifies compilers, enables reading disassembly for performance analysis, and builds mental model of how code runs.",
            prereqs: "CPU Architecture",
            difficulty: "Intermediate",
            realWorld:
              "Reading compiler output to verify optimizations. Understanding SIMD for vectorized operations. Reverse engineering malware.",
            mistakes:
              "Thinking you need to write assembly regularly. The goal is reading and understanding, not authorship.",
            resources: [
              "x86-64 Assembly Language Programming (Ray Seyfarth)",
              "Compiler Explorer (godbolt.org)",
            ],
            practice: [
              "Write a Hello World in x86-64 assembly. Read the disassembly of a C bubble sort.",
            ],
          },
          {
            name: "Caching Fundamentals",
            what: "Hardware caches (L1/L2/L3) automatically cache memory. Software caches (Redis, Memcached) explicitly cache data. Cache line = 64 bytes on x86.",
            why: "Caching is the highest-impact optimization at every level of the stack — hardware, OS, application, and CDN.",
            prereqs: "Memory Hierarchy",
            difficulty: "Intermediate",
            realWorld:
              "False sharing in multi-threaded code. Cache-oblivious algorithms. Application-level caching with Redis.",
            mistakes:
              "Cache invalidation is notoriously hard. Stale data bugs, thundering herd, cache stampede.",
            resources: [
              "CPU Caches and Why You Care (Scott Meyers)",
              "Systems Performance (Brendan Gregg)",
            ],
            practice: [
              "Demonstrate false sharing performance penalty. Fix with padding. Measure improvement.",
            ],
          },
        ],
      },
      {
        title: "Operating Systems",
        topics: [
          {
            name: "Processes",
            what: "Isolated execution environments with their own virtual memory space, file descriptors, and resources. Created via fork().",
            why: "Node.js runs in a process. Understanding process isolation is key to containerization, security sandboxing, and IPC.",
            prereqs: "CPU, RAM",
            difficulty: "Intermediate",
            realWorld:
              "Forking processes in Node for CPU work, running isolated microservices, understanding Docker container boundaries.",
            mistakes:
              "Confusing processes with threads. Processes are isolated; threads share memory.",
            resources: [
              "OSTEP — Chapters on Processes",
              "man fork, man exec on Linux",
            ],
            practice: [
              "Write a shell in C or Go that forks child processes and handles signals",
            ],
          },
          {
            name: "Threads & Concurrency",
            what: "Lightweight execution units sharing memory within a process. POSIX threads (pthreads), thread pools, mutex, semaphore, condition variable.",
            why: "JavaScript is single-threaded. Understanding threads explains the Event Loop, Worker Threads, and why async != parallel.",
            prereqs: "Processes",
            difficulty: "Intermediate",
            realWorld:
              "Node.js Worker Threads for CPU tasks, thread pools in Java/Go, race conditions in shared state.",
            mistakes:
              "Thinking async JavaScript uses multiple threads. It uses cooperative scheduling on one thread.",
            resources: [
              "OSTEP: Concurrency sections",
              "The Art of Multiprocessor Programming",
            ],
            practice: [
              "Implement a thread-safe bounded queue in Go or Java with mutex and condition variables",
            ],
          },
          {
            name: "CPU Scheduling",
            what: "OS algorithms for allocating CPU time: Round Robin, Priority, CFS (Linux), MLFQ. Preemptive vs cooperative.",
            why: "Understanding scheduling explains latency variability, real-time constraints, and how to tune process priorities.",
            prereqs: "Processes, Threads",
            difficulty: "Intermediate",
            realWorld:
              "nice/renice for process priority, cgroups for container CPU limits, real-time scheduling for latency-critical apps.",
            mistakes:
              "Assuming all processes get fair CPU time by default. Unconstrained processes can starve others.",
            resources: [
              "OSTEP: CPU Scheduling",
              "Linux kernel scheduler documentation",
            ],
            practice: [
              "Use nice, ionice, and cgroups to limit CPU and I/O of a process",
            ],
          },
          {
            name: "Memory Management",
            what: "Virtual memory, paging, page tables, TLB, demand paging, swap. Allocators: malloc, jemalloc, tcmalloc.",
            why: "Understanding memory management is essential for debugging memory leaks, OOM kills, and performance issues.",
            prereqs: "RAM, Processes",
            difficulty: "Intermediate",
            realWorld:
              "Diagnosing memory leaks in Node.js. OOM kills in Kubernetes. mmap for zero-copy file access.",
            mistakes:
              "Not understanding the difference between RSS, VSZ, and PSS memory metrics.",
            resources: [
              "OSTEP: Memory Virtualization",
              "Linux Memory Management Documentation",
            ],
            practice: [
              "Implement a simple slab allocator. Analyze a memory leak with Valgrind or heaptrack.",
            ],
          },
          {
            name: "Compilers & Interpreters",
            what: "Compilers translate source code to machine code (GCC, Clang). Interpreters execute source directly (CPython). JIT compilers combine both (V8, JVM).",
            why: "Understanding compilation stages (lexing, parsing, IR, optimization, code gen) makes you a better programmer and debugger.",
            prereqs: "Assembly Basics",
            difficulty: "Advanced",
            realWorld:
              "Writing Babel plugins, understanding TypeScript compilation, V8 JIT optimization, writing DSLs.",
            mistakes:
              "Thinking compiled languages are always faster. JIT-compiled JS can outperform naive C.",
            resources: [
              "Crafting Interpreters (Robert Nystrom, free online)",
              "Engineering a Compiler (Cooper & Torczon)",
            ],
            practice: [
              "Build a Lox interpreter following Crafting Interpreters. Write a simple expression evaluator.",
            ],
          },
          {
            name: "Garbage Collection",
            what: "Automatic memory reclamation: Mark-and-Sweep, Reference Counting, Generational GC (young/old gen), Tri-color marking, Stop-the-world vs concurrent GC.",
            why: "GC pauses cause latency spikes. Understanding GC helps tune JVM, V8, and Go GC for production workloads.",
            prereqs: "Memory Management",
            difficulty: "Advanced",
            realWorld:
              "JVM GC tuning (-Xmx, -XX:+UseG1GC). V8 heap snapshots. Go GC GOGC env var. Avoiding allocation pressure.",
            mistakes:
              "Assuming GC is free. GC pauses are the #1 source of latency jitter in managed runtimes.",
            resources: [
              "The Garbage Collection Handbook (Jones, Hosking, Moss)",
              "V8 GC blog posts (v8.dev)",
            ],
            practice: [
              "Generate a V8 heap snapshot and find a memory leak. Tune JVM GC for a throughput workload.",
            ],
          },
          {
            name: "Virtual Machines & Containers",
            what: "VMs emulate full hardware (hypervisor: Type 1 = bare metal, Type 2 = hosted). Containers share the host OS kernel via namespaces and cgroups.",
            why: "Modern deployments are containerized. Understanding the difference determines security posture and resource overhead.",
            prereqs: "Operating Systems",
            difficulty: "Intermediate",
            realWorld:
              "Docker for local dev, Kubernetes for production, VMs (EC2) for stronger isolation.",
            mistakes:
              "Treating containers as VMs. Containers are processes — shared kernel means a different security model.",
            resources: [
              "Docker docs",
              "Container Security (Liz Rice)",
              "Kubernetes Up & Running (O'Reilly)",
            ],
            practice: [
              "Build a container from scratch using Linux namespaces and cgroups without Docker",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 2 — NETWORKING ENGINEERING
  // ============================================================
  {
    id: 2,
    emoji: "🌐",
    title: "Networking Engineering",
    color: "#06b6d4",
    darkColor: "#0e7490",
    sections: [
      {
        title: "Network Fundamentals",
        topics: [
          {
            name: "OSI Model",
            what: "7-layer conceptual framework: Physical, Data Link, Network, Transport, Session, Presentation, Application. TCP/IP collapses to 4 layers.",
            why: "OSI gives you a mental model to reason about where in the stack a problem lives. 'Is this a Layer 3 or Layer 7 issue?'",
            prereqs: "None",
            difficulty: "Beginner",
            realWorld:
              "Debugging connectivity: ping tests Layer 3, curl tests Layer 7. Firewall rules operate at Layer 3/4. WAF at Layer 7.",
            mistakes:
              "Memorizing the layers without understanding what operates at each. Map real tools to each layer.",
            resources: [
              "Computer Networks (Tanenbaum)",
              "Beej's Guide to Network Programming",
            ],
            practice: [
              "Map 10 real protocols (HTTP, TLS, TCP, IP, Ethernet) to their OSI layers with justification",
            ],
          },
          {
            name: "TCP/IP Stack",
            what: "Internet protocol suite: IP for addressing/routing, TCP for reliable ordered delivery, UDP for fast connectionless delivery.",
            why: "TCP powers most web traffic. Understanding the handshake, flow control, and congestion control is essential for performance engineering.",
            prereqs: "OSI Model",
            difficulty: "Intermediate",
            realWorld:
              "TCP_NODELAY for low-latency apps. SO_REUSEPORT for multi-process servers. TCP Fast Open for reduced latency.",
            mistakes:
              "Not understanding that TCP is a stream, not a message protocol. Applications must define message boundaries.",
            resources: [
              "Beej's Guide to Network Programming",
              "TCP/IP Illustrated (Stevens)",
              "RFC 793",
            ],
            practice: [
              "Build a TCP echo server and client from raw sockets. Observe handshake in Wireshark.",
            ],
          },
          {
            name: "UDP",
            what: "User Datagram Protocol — connectionless, no delivery guarantee, no ordering. Header: source port, dest port, length, checksum.",
            why: "UDP's lower overhead makes it ideal for real-time applications where occasional packet loss is preferable to latency.",
            prereqs: "OSI Model",
            difficulty: "Intermediate",
            realWorld:
              "DNS uses UDP. WebRTC for video calls. Online games. QUIC (HTTP/3) builds reliability on top of UDP.",
            mistakes:
              "Assuming UDP is always unreliable. QUIC proves you can build reliable protocols on UDP.",
            resources: ["Beej's Guide to Network Programming", "RFC 768"],
            practice: [
              "Build a UDP-based chat app. Implement your own basic reliability layer (sequence numbers, ACKs).",
            ],
          },
          {
            name: "DNS",
            what: "Domain Name System — hierarchical distributed database translating hostnames to IPs. Record types: A, AAAA, CNAME, MX, TXT, NS, SOA, SRV.",
            why: "Every web request starts with DNS. Understanding it helps debug connectivity, configure CDNs, and design multi-region systems.",
            prereqs: "UDP",
            difficulty: "Beginner",
            realWorld:
              "Configuring A records, CNAMEs, TTLs. Split-horizon DNS. DNS-based load balancing. GeoDNS for routing.",
            mistakes:
              "Not understanding TTL caching. DNS changes can take up to 48 hours to propagate globally.",
            resources: [
              "How DNS Works (dnsimple.com/comic)",
              "dig command documentation",
              "DNS and BIND (O'Reilly)",
            ],
            practice: [
              "Use dig to trace a full DNS resolution chain. Set up a local authoritative DNS server with BIND.",
            ],
          },
          {
            name: "HTTP & HTTPS",
            what: "HyperText Transfer Protocol — request/response protocol. HTTP/1.1: persistent connections. HTTP/2: multiplexing, header compression. HTTP/3: QUIC-based.",
            why: "Every API call, browser request, and webhook uses HTTP. Mastering all versions is essential for performance and compatibility.",
            prereqs: "TCP/IP, DNS",
            difficulty: "Beginner",
            realWorld:
              "Designing RESTful APIs, understanding headers, status codes, caching, CORS, content negotiation, connection reuse.",
            mistakes:
              "Not understanding idempotency. Ignoring HTTP/2 server push. Missing HTTP/3 QUIC benefits for mobile.",
            resources: [
              "MDN HTTP documentation",
              "HTTP: The Definitive Guide (O'Reilly)",
              "HTTP/3 Explained (Bagder)",
            ],
            practice: [
              "Build an HTTP/1.1 server from raw TCP sockets. Add HTTP/2 with h2 library. Benchmark difference.",
            ],
          },
          {
            name: "TLS/SSL",
            what: "Transport Layer Security — provides encryption (AES), authentication (certificates, PKI), and integrity (HMAC) over TCP. TLS 1.3 is current standard.",
            why: "All modern web traffic must be encrypted. TLS understanding is essential for security engineering and debugging HTTPS issues.",
            prereqs: "TCP/IP",
            difficulty: "Intermediate",
            realWorld:
              "Let's Encrypt automation, mutual TLS for service meshes, certificate pinning in mobile, HSTS preloading.",
            mistakes:
              "Confusing SSL (deprecated) with TLS. SSL 3.0 is broken. Minimum TLS 1.2, prefer TLS 1.3.",
            resources: [
              "The Illustrated TLS Connection (tls13.ulfheim.net)",
              "OpenSSL Cookbook",
              "TLS 1.3 RFC 8446",
            ],
            practice: [
              "Use openssl to inspect a cert, simulate handshake, create self-signed cert, and set up mTLS.",
            ],
          },
          {
            name: "WebSockets",
            what: "Full-duplex communication protocol over a single TCP connection. Initiated via HTTP Upgrade. RFC 6455.",
            why: "Required for real-time features: chat, live dashboards, collaborative editing, multiplayer games.",
            prereqs: "HTTP, TCP/IP",
            difficulty: "Intermediate",
            realWorld:
              "Slack, Figma, Google Docs use WebSockets. Socket.IO adds rooms and fallbacks.",
            mistakes:
              "Using WebSockets when SSE (Server-Sent Events) suffices. WebSockets are stateful — harder to scale.",
            resources: [
              "WebSockets RFC 6455",
              "Socket.IO documentation",
              "WebSocket API (MDN)",
            ],
            practice: [
              "Build a WebSocket server without Socket.IO. Handle ping/pong, reconnection, and message framing.",
            ],
          },
          {
            name: "gRPC",
            what: "Google Remote Procedure Call — uses HTTP/2 and Protocol Buffers (protobuf) for efficient, strongly typed service-to-service communication.",
            why: "gRPC is the standard for internal microservice communication. ~7x faster than JSON REST for equivalent payloads.",
            prereqs: "HTTP/2, Protocol Buffers",
            difficulty: "Intermediate",
            realWorld:
              "Kubernetes internal APIs. Service meshes. Microservice communication at Google, Netflix, Uber.",
            mistakes:
              "Using gRPC for browser-facing APIs (use gRPC-Web or REST). Not generating clients from proto files.",
            resources: [
              "gRPC documentation",
              "Protocol Buffers documentation",
              "gRPC: Up and Running (O'Reilly)",
            ],
            practice: [
              "Build a gRPC chat service with unary, server-streaming, and bidirectional streaming RPCs.",
            ],
          },
          {
            name: "Reverse Proxy & Load Balancers",
            what: "Reverse proxy forwards client requests to backend servers. Load balancers distribute traffic: Round Robin, Least Connections, IP Hash, Weighted.",
            why: "Essential for horizontal scaling, SSL termination, caching, and hiding backend topology.",
            prereqs: "HTTP, Networking basics",
            difficulty: "Intermediate",
            realWorld:
              "Nginx, HAProxy, AWS ALB, Cloudflare. Health checks, connection draining, circuit breaking.",
            mistakes:
              "Not configuring connection draining. Sticky sessions defeat horizontal scaling benefits.",
            resources: [
              "Nginx documentation",
              "HAProxy documentation",
              "Load Balancing in the Cloud (O'Reilly)",
            ],
            practice: [
              "Configure Nginx as reverse proxy with upstream health checks, SSL termination, and rate limiting.",
            ],
          },
          {
            name: "CDN (Content Delivery Network)",
            what: "Globally distributed edge servers that cache content close to users. Cache-Control, origin pull vs push, edge compute.",
            why: "CDNs reduce latency, bandwidth costs, and origin load. Critical for any global application.",
            prereqs: "HTTP, DNS",
            difficulty: "Intermediate",
            realWorld:
              "Cloudflare, AWS CloudFront, Fastly. Cache invalidation, origin shield, edge compute (Cloudflare Workers).",
            mistakes:
              "Not setting proper Cache-Control headers. Caching authenticated content. Missing cache purge strategy.",
            resources: [
              "Cloudflare documentation",
              "AWS CloudFront documentation",
              "Web Performance in Action",
            ],
            practice: [
              "Set up CloudFront for an S3-hosted static site with custom cache behaviors per path pattern.",
            ],
          },
          {
            name: "NAT & VPN",
            what: "NAT (Network Address Translation) maps private IPs to public IPs. VPN creates encrypted tunnels over public networks. WireGuard, OpenVPN, IPSec.",
            why: "NAT is in every home router and cloud VPC. VPNs secure remote access and connect cloud networks.",
            prereqs: "TCP/IP, TLS",
            difficulty: "Intermediate",
            realWorld:
              "AWS NAT Gateway for private subnet internet access. WireGuard for team VPN. Site-to-site VPN for hybrid cloud.",
            mistakes:
              "Not understanding NAT traversal challenges for P2P apps. STUN/TURN servers solve this (WebRTC).",
            resources: [
              "WireGuard documentation",
              "AWS VPC documentation",
              "Network Warrior (O'Reilly)",
            ],
            practice: [
              "Set up a WireGuard VPN server. Connect multiple clients. Route traffic through it.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 3 — LINUX MASTERY
  // ============================================================
  {
    id: 3,
    emoji: "🐧",
    title: "Linux Mastery",
    color: "#ff6b35",
    darkColor: "#cc4400",
    sections: [
      {
        title: "Linux Fundamentals",
        topics: [
          {
            name: "File System Hierarchy",
            what: "Hierarchical directory structure: / (root), /etc (config), /var (variable data), /usr (user binaries), /proc (kernel interface), /sys (device interface), /dev (devices).",
            why: "Every server runs Linux. Navigating the filesystem, understanding inodes, and paths is non-negotiable for any backend engineer.",
            prereqs: "None",
            difficulty: "Beginner",
            realWorld:
              "Reading logs in /var/log, editing configs in /etc, understanding /proc/meminfo for memory stats.",
            mistakes:
              "Using absolute paths in scripts (breaks on different distros). Always use variables or relative paths.",
            resources: [
              "The Linux Command Line (William Shotts, free online)",
              "Filesystem Hierarchy Standard (FHS)",
            ],
            practice: [
              "Navigate 20 system directories. Understand purpose of each. Use proc fs to read CPU and memory info.",
            ],
          },
          {
            name: "Permissions & Ownership",
            what: "Unix permissions: owner/group/other with read(4)/write(2)/execute(1). Special bits: setuid (4), setgid (2), sticky (1). ACLs for fine-grained control.",
            why: "Security foundation of Linux. Misconfigured permissions are a primary source of security vulnerabilities.",
            prereqs: "File System Hierarchy",
            difficulty: "Beginner",
            realWorld:
              "Securing private keys (chmod 600), web server directory ownership, setuid for privilege escalation (sudo), ACLs for shared directories.",
            mistakes:
              "Using chmod 777 as a 'fix.' Always apply minimum necessary permissions.",
            resources: [
              "chmod calculator online",
              "man chmod, man chown, man chgrp, man setfacl",
            ],
            practice: [
              "Set up a shared project directory with ACLs. Secure an SSH key pair. Configure a web server with correct ownership.",
            ],
          },
          {
            name: "Users & Groups",
            what: "User accounts (/etc/passwd), groups (/etc/group), password hashing (/etc/shadow). sudo configuration (/etc/sudoers). Service accounts.",
            why: "Principle of least privilege requires proper user/group management. Service accounts isolate application permissions.",
            prereqs: "Permissions & Ownership",
            difficulty: "Beginner",
            realWorld:
              "Creating service accounts for Node.js apps, sudo rules for deployment automation, group-based access control.",
            mistakes:
              "Running services as root. Not using service accounts. Sharing credentials between team members.",
            resources: [
              "Linux System Administration (O'Reilly)",
              "man useradd, man usermod, man sudoers",
            ],
            practice: [
              "Create a service account for a web app. Configure sudo rules for deployment. Set up group-based file access.",
            ],
          },
          {
            name: "Shell Scripting (Bash)",
            what: "Scripting language for automating system tasks. Variables, arrays, conditionals, loops, functions, process substitution, here docs, trap, getopts.",
            why: "Bash is on every Unix system. Automating deployments, builds, and cron jobs requires Bash proficiency.",
            prereqs: "File System, Permissions, Users",
            difficulty: "Intermediate",
            realWorld:
              "Deployment scripts, backup automation, log rotation, CI/CD pipeline steps, database migrations.",
            mistakes:
              'Not quoting variables ($var vs "$var"). Not checking exit codes ($?). Not using set -euo pipefail.',
            resources: [
              "Advanced Bash-Scripting Guide",
              "shellcheck.net",
              "Bash Cookbook (O'Reilly)",
            ],
            practice: [
              "Write a deployment script: pull code, run tests, restart service, send Slack notification on failure.",
            ],
          },
          {
            name: "Cron Jobs & Systemd Timers",
            what: "Cron: schedule recurring tasks via crontab (min hour day month weekday command). Systemd timers: more powerful alternative with dependencies.",
            why: "Every production system needs scheduled tasks: backups, cleanup, reports, cache warming.",
            prereqs: "Shell Scripting",
            difficulty: "Beginner",
            realWorld:
              "Nightly database backups, hourly log rotation, daily certificate renewal with certbot.",
            mistakes:
              "Not redirecting output to log files. Missing MAILTO for failure notifications. Not testing cron expressions.",
            resources: [
              "crontab.guru (expression editor)",
              "Systemd Timer documentation",
            ],
            practice: [
              "Set up a cron job for nightly backups. Convert it to a systemd timer. Add failure alerting.",
            ],
          },
          {
            name: "SSH Mastery",
            what: "Secure Shell — encrypted remote access. Key-based auth, ssh-agent, SSH config, tunneling (local, remote, dynamic), ProxyJump, SSHFS.",
            why: "The primary way to access production servers. Key-based auth and proper config are essential for security and automation.",
            prereqs: "Networking basics",
            difficulty: "Beginner",
            realWorld:
              "Accessing cloud instances, SSH tunnels to databases, jump hosts for private network access, SCP/rsync for file transfer.",
            mistakes:
              "Password authentication on production servers. Not using ssh-agent. Not setting IdentitiesOnly.",
            resources: [
              "ssh_config man page",
              "SSH Mastery (Michael Lucas)",
              "OpenSSH documentation",
            ],
            practice: [
              "Configure key-based auth, SSH config with aliases, local port forwarding, and jump host configuration.",
            ],
          },
          {
            name: "Process Management",
            what: "Tools: ps, top, htop, kill signals (SIGTERM, SIGKILL, SIGHUP), pkill, nice/renice, systemd, journalctl, supervisor.",
            why: "Production servers require monitoring and controlling services. systemd is the standard init system on modern Linux.",
            prereqs: "Processes",
            difficulty: "Intermediate",
            realWorld:
              "Restarting crashed services, investigating memory leaks, setting process priorities, managing daemon lifecycles.",
            mistakes:
              "Using kill -9 first. It bypasses cleanup handlers. Send SIGTERM first, SIGKILL only if needed.",
            resources: [
              "systemd documentation",
              "man ps, man kill",
              "systemd by example",
            ],
            practice: [
              "Write a systemd unit file for Node.js app. Configure auto-restart, logging, resource limits.",
            ],
          },
          {
            name: "Linux Networking Tools",
            what: "ip, ss, netstat, nmap, tcpdump, wireshark, iptables/nftables, traceroute, mtr, iperf3, dig, curl.",
            why: "Diagnosing network issues in production requires fluency with these tools.",
            prereqs: "Networking basics, Linux fundamentals",
            difficulty: "Intermediate",
            realWorld:
              "Debugging why a service can't connect to a database. Verifying firewall rules. Capturing traffic for analysis.",
            mistakes:
              "Using netstat when ss is faster. Not using tcpdump filters (captures too much data).",
            resources: [
              "Linux Networking Cookbook",
              "tcpdump documentation",
              "nmap Network Scanning (Gordon Lyon)",
            ],
            practice: [
              "Capture and analyze HTTP traffic with tcpdump. Write iptables rules for a basic firewall. Use mtr to trace a route.",
            ],
          },
          {
            name: "Performance Monitoring",
            what: "Tools: top, vmstat, iostat, sar, perf, strace, ltrace, /proc filesystem, Brendan Gregg's performance tools.",
            why: "Diagnosing production performance issues requires understanding system-level metrics beyond application metrics.",
            prereqs: "Process Management, Linux Networking",
            difficulty: "Intermediate",
            realWorld:
              "Finding which process causes CPU spikes. Diagnosing I/O wait. Identifying system call overhead with strace.",
            mistakes:
              "Using top without knowing what to look for. Confusing %user, %system, %iowait percentages.",
            resources: [
              "Systems Performance (Brendan Gregg)",
              "Linux Performance Analysis in 60 Seconds",
            ],
            practice: [
              "Use the USE Method (Utilization, Saturation, Errors) to analyze a slow production system.",
            ],
          },
          {
            name: "Nginx",
            what: "High-performance HTTP server and reverse proxy. Event-driven architecture, worker processes, upstream pools, location blocks, rewrite rules, Lua scripting.",
            why: "The most common production web server. Powers ~33% of the web. Essential for serving, proxying, and protecting applications.",
            prereqs: "HTTP, Linux basics",
            difficulty: "Intermediate",
            realWorld:
              "Serving static files, reverse proxying to apps, SSL termination, rate limiting, caching, A/B routing.",
            mistakes:
              "Not tuning worker_processes and worker_connections. Not configuring keepalive_timeout. Default config is not production-ready.",
            resources: [
              "Nginx documentation",
              "The NGINX Cookbook (O'Reilly)",
              "nginx.viraptor.info",
            ],
            practice: [
              "Configure Nginx: reverse proxy for Node app, SSL with Let's Encrypt, gzip, cache headers, rate limiting.",
            ],
          },
          {
            name: "Linux Security Hardening",
            what: "AppArmor/SELinux for mandatory access control. fail2ban for brute-force protection. UFW/iptables firewalls. auditd for syscall auditing. CIS benchmarks.",
            why: "A default Linux install is not production-secure. Hardening reduces attack surface and limits blast radius of compromise.",
            prereqs: "Linux fundamentals, Permissions",
            difficulty: "Advanced",
            realWorld:
              "CIS benchmark hardening for compliance. SELinux policies for confined services. fail2ban to block SSH brute force.",
            mistakes:
              "Disabling SELinux/AppArmor because it's hard. Security controls exist for a reason.",
            resources: [
              "CIS Benchmarks",
              "SELinux by Example (Mayer, MacMillan, Caplan)",
              "Lynis audit tool",
            ],
            practice: [
              "Run a Lynis security audit on a fresh server. Fix the top 10 findings. Configure fail2ban and UFW.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 4 — GIT & VERSION CONTROL
  // ============================================================
  {
    id: 4,
    emoji: "🌿",
    title: "Git & Version Control",
    color: "#f7931e",
    darkColor: "#c06000",
    sections: [
      {
        title: "Git Core",
        topics: [
          {
            name: "Git Internals",
            what: "Git stores data as a content-addressable object store: blobs (files), trees (directories), commits, and annotated tags, all identified by SHA-1 hashes.",
            why: "Understanding internals makes advanced operations (rebase, cherry-pick, reflog, fsck) intuitive rather than magical.",
            prereqs: "None",
            difficulty: "Intermediate",
            realWorld:
              "Recovering lost commits via reflog, understanding what git reset --hard does to the object graph.",
            mistakes:
              "Treating git as a black box. Reading .git/objects teaches more than any tutorial.",
            resources: [
              "Pro Git (Chacon, free at git-scm.com)",
              "git internals video by Scott Chacon",
            ],
            practice: [
              "Manually create a commit by writing blobs, trees, and commits with git hash-object and git commit-tree.",
            ],
          },
          {
            name: "Branching Strategies",
            what: "Git Flow, GitHub Flow, Trunk Based Development, Release Branching. Branch naming conventions and protection rules.",
            why: "The right branching strategy determines your deployment frequency, release cadence, and merge conflict rate.",
            prereqs: "Git basics",
            difficulty: "Beginner",
            realWorld:
              "Trunk-based development enables continuous deployment. Git Flow is appropriate for versioned releases.",
            mistakes:
              "Long-lived feature branches. They diverge and make merges painful. Prefer short-lived branches.",
            resources: [
              "Trunk Based Development (trunkbaseddevelopment.com)",
              "Atlassian Git branching tutorial",
            ],
            practice: [
              "Simulate a team workflow with trunk-based development. Handle feature flags for incomplete features.",
            ],
          },
          {
            name: "Rebase & Cherry-Pick",
            what: "Rebase replays commits on a new base, creating linear history. Cherry-pick applies specific commits to another branch. Interactive rebase for history editing.",
            why: "Rebase creates cleaner history. Cherry-pick is essential for backporting security fixes to release branches.",
            prereqs: "Branching",
            difficulty: "Intermediate",
            realWorld:
              "Interactive rebase to squash WIP commits before PR. Cherry-pick a security fix to a maintenance branch.",
            mistakes:
              "Rebasing shared/public branches. Never rebase commits others have based work on.",
            resources: ["git-rebase man page", "Oh Shit, Git! (ohshitgit.com)"],
            practice: [
              "Squash 5 commits, reword messages, reorder commits with interactive rebase.",
            ],
          },
          {
            name: "Git Hooks",
            what: "Scripts executed at git events: pre-commit (lint/test), commit-msg (message format), pre-push (full tests), post-merge (install), prepare-commit-msg.",
            why: "Enforce code quality locally before code reaches CI. Faster feedback loop than waiting for CI.",
            prereqs: "Shell Scripting",
            difficulty: "Intermediate",
            realWorld:
              "Husky in JS projects runs ESLint and tests. conventional-commits enforcement. Secret scanning with detect-secrets.",
            mistakes:
              "Slow hooks kill developer flow. Keep pre-commit under 1 second. Run expensive checks in pre-push.",
            resources: [
              "Husky documentation",
              "git hooks documentation",
              "lefthook (Go-based hooks manager)",
            ],
            practice: [
              "Write pre-commit: lint + type check. pre-push: tests. commit-msg: conventional commit validation.",
            ],
          },
          {
            name: "Monorepo Strategies",
            what: "Single repository for multiple packages/apps. Tools: Nx, Turborepo, Lerna. Workspace protocols (npm/yarn/pnpm workspaces). Affected command detection.",
            why: "Enables atomic cross-package changes, shared tooling, unified CI, easier refactoring across service boundaries.",
            prereqs: "Git basics, npm/Node basics",
            difficulty: "Advanced",
            realWorld:
              "Frontend + backend + shared types in one repo. One PR changes an API and its consumer simultaneously.",
            mistakes:
              "Monorepo without a build system with caching. Without affected detection, all packages rebuild on every change.",
            resources: [
              "Monorepo.tools comparison",
              "Turborepo documentation",
              "Nx documentation",
            ],
            practice: [
              "Set up a Turborepo with a shared UI library consumed by two apps. Configure build caching and affected detection.",
            ],
          },
          {
            name: "Tags, Releases & Semantic Versioning",
            what: "Git tags mark specific commits. SemVer: MAJOR.MINOR.PATCH. Conventional commits enable automated changelog generation.",
            why: "Versioning enables reproducible builds, communicates breaking changes, and supports automated release pipelines.",
            prereqs: "Git basics",
            difficulty: "Beginner",
            realWorld:
              "GitHub Releases with release notes. npm package versioning. Docker image tags. Automated releases with semantic-release.",
            mistakes:
              "Inconsistent versioning. Forgetting to tag releases. Not communicating breaking changes with major version bumps.",
            resources: [
              "semver.org",
              "semantic-release documentation",
              "Conventional Commits specification",
            ],
            practice: [
              "Set up semantic-release with conventional commits. Automate changelog generation and npm publishing.",
            ],
          },
          {
            name: "GitHub & GitLab Platform Skills",
            what: "Pull Requests, code review workflows, branch protection rules, GitHub Actions CI, GitHub Packages, GitLab CI/CD, merge request approvals.",
            why: "Modern software development happens on these platforms. Platform mastery accelerates team workflows.",
            prereqs: "Git Core",
            difficulty: "Beginner",
            realWorld:
              "Required reviews before merge. CODEOWNERS for automatic reviewer assignment. Draft PRs for early feedback.",
            mistakes:
              "Merging without code review. Not using branch protection rules. Huge PRs that are impossible to review.",
            resources: [
              "GitHub documentation",
              "GitLab documentation",
              "Thoughtworks code review guide",
            ],
            practice: [
              "Configure branch protection with required reviews, status checks, and CODEOWNERS. Set up GitHub Actions CI.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 5 — HTML MASTERY
  // ============================================================
  {
    id: 5,
    emoji: "🏗️",
    title: "HTML Mastery",
    color: "#e44d26",
    darkColor: "#b03000",
    sections: [
      {
        title: "Semantic HTML",
        topics: [
          {
            name: "Semantic Elements",
            what: "HTML5 elements with inherent meaning: <article>, <section>, <nav>, <main>, <aside>, <header>, <footer>, <figure>, <figcaption>, <time>, <mark>, <details>, <summary>.",
            why: "Semantics improve SEO, accessibility, and code maintainability. Screen readers and crawlers rely on structure.",
            prereqs: "None",
            difficulty: "Beginner",
            realWorld:
              "Structured articles rank better in Google. Semantic landmarks let screen reader users jump between sections.",
            mistakes:
              "Divitis — using <div> for everything. Always ask: is there a more semantic element available?",
            resources: [
              "MDN HTML elements reference",
              "HTML5 Boilerplate",
              "html5doctor.com",
            ],
            practice: [
              "Refactor a div-soup page with correct semantic elements. Validate with the HTML validator.",
            ],
          },
          {
            name: "Forms & Validation",
            what: "Input types (email, tel, url, date, number, range, color, file), validation attributes (required, pattern, min, max, minlength), form events, FormData API.",
            why: "Forms are how users interact with your app. Native validation is faster, accessible, and requires no JavaScript.",
            prereqs: "Semantic Elements",
            difficulty: "Beginner",
            realWorld:
              "Checkout forms, login pages, data entry. Proper labels enable autofill and password managers.",
            mistakes:
              "Using <div> instead of <label>. Skipping native validation for a JS-only approach. Missing autocomplete attributes.",
            resources: ["MDN Forms guide", "web.dev forms best practices"],
            practice: [
              "Build a multi-step checkout form: native validation, proper labels, fieldset grouping, ARIA live regions.",
            ],
          },
          {
            name: "Accessibility (a11y)",
            what: "WCAG 2.1 guidelines (Levels A, AA, AAA). ARIA roles, properties, and states. Keyboard navigation. Focus management. Screen reader testing.",
            why: "Legal requirement in many jurisdictions. ~15% of people have a disability. Also improves SEO and overall UX.",
            prereqs: "Semantic Elements",
            difficulty: "Intermediate",
            realWorld:
              "ARIA labels for icon-only buttons, focus management in modals, skip links, live regions for dynamic content.",
            mistakes:
              "Adding ARIA to everything. 'No ARIA is better than bad ARIA.' Semantics first, ARIA as last resort.",
            resources: [
              "WebAIM",
              "The A11y Project",
              "Inclusive Components (Heydon Pickering)",
            ],
            practice: [
              "Audit an existing site with axe DevTools. Fix all critical violations. Test with NVDA/VoiceOver.",
            ],
          },
          {
            name: "Meta Tags & SEO",
            what: "Document metadata: <meta charset>, viewport, description, OG tags (og:title, og:image), Twitter Cards, canonical, robots, structured data (JSON-LD).",
            why: "Meta tags control how pages appear in search results and social media shares. Structured data enables rich results.",
            prereqs: "Semantic Elements",
            difficulty: "Beginner",
            realWorld:
              "Open Graph tags for social previews. JSON-LD for recipe, product, and review rich snippets in Google.",
            mistakes:
              "Missing viewport meta tag (breaks mobile). Duplicate canonical tags. Missing alt text on images.",
            resources: [
              "Google Search documentation",
              "Open Graph protocol (ogp.me)",
              "Schema.org",
            ],
            practice: [
              "Add complete SEO metadata to a landing page. Implement JSON-LD for a product page. Test with Google Rich Results tool.",
            ],
          },
          {
            name: "Web Components",
            what: "Browser-native component model: Custom Elements (define new HTML elements), Shadow DOM (encapsulated styles), HTML Templates (<template>, <slot>).",
            why: "Framework-agnostic components. Design systems can ship Web Components usable in React, Angular, Vue, and plain HTML.",
            prereqs: "JavaScript, DOM",
            difficulty: "Advanced",
            realWorld:
              "GitHub uses Web Components. Adobe Spectrum, Shoelace, and other design systems ship as Web Components.",
            mistakes:
              "Choosing Web Components when you only have one framework. Complexity only pays off for universal components.",
            resources: [
              "MDN Web Components",
              "open-wc.org",
              "Lit framework documentation",
            ],
            practice: [
              "Build a <date-picker> Web Component that works in plain HTML, React, and Vue.",
            ],
          },
          {
            name: "Performance HTML Patterns",
            what: "Resource hints: preload, prefetch, preconnect. Lazy loading (loading=lazy). async/defer scripts. Critical path optimization. picture/srcset for responsive images.",
            why: "HTML loading order directly impacts LCP and FID. Wrong resource loading kills Core Web Vitals.",
            prereqs: "HTML basics, HTTP",
            difficulty: "Intermediate",
            realWorld:
              "preconnect to CDN origin. preload critical fonts. defer non-critical scripts. Native lazy loading for images.",
            mistakes:
              "Preloading too many resources (wastes bandwidth). Not deferring non-critical JavaScript.",
            resources: [
              "web.dev resource prioritization",
              "MDN: Resource hints",
              "Harry Roberts: Resource Hints",
            ],
            practice: [
              "Optimize a slow-loading page using resource hints. Measure improvement with Lighthouse.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 6 — CSS MASTERY
  // ============================================================
  {
    id: 6,
    emoji: "🎨",
    title: "CSS Mastery",
    color: "#2965f1",
    darkColor: "#1040c0",
    sections: [
      {
        title: "Layout Systems",
        topics: [
          {
            name: "Flexbox",
            what: "One-dimensional layout system. Main axis / cross axis. flex-direction, justify-content, align-items, flex-wrap, flex-grow/shrink/basis, gap.",
            why: "Replaced float-based layouts. Essential for navbars, card rows, centering, and any 1D layout.",
            prereqs: "CSS basics",
            difficulty: "Beginner",
            realWorld:
              "Navigation bars, pricing card rows, centering elements vertically and horizontally, form layouts.",
            mistakes:
              "Using flexbox for 2D layouts. Not understanding flex-basis vs width. Overusing margin: auto.",
            resources: [
              "CSS-Tricks Flexbox Guide",
              "Flexbox Froggy (game)",
              "What the Flexbox (Wes Bos)",
            ],
            practice: [
              "Build a responsive navbar. Implement Holy Grail layout. Create a card grid with equal heights.",
            ],
          },
          {
            name: "CSS Grid",
            what: "Two-dimensional layout system. grid-template-columns/rows, grid-area, auto-placement, minmax(), repeat(), fr units, subgrid.",
            why: "The most powerful CSS layout tool. Replaces hacky float/table layouts for complex UIs.",
            prereqs: "Flexbox",
            difficulty: "Intermediate",
            realWorld:
              "Dashboard layouts, magazine-style designs, image galleries, any complex 2D layout.",
            mistakes:
              "Using grid for 1D layouts when flexbox is simpler. Not using grid-template-areas for named zones.",
            resources: [
              "CSS-Tricks Grid Guide",
              "Grid Garden (game)",
              "Every Layout (every-layout.dev)",
            ],
            practice: [
              "Build a responsive dashboard: sidebar, header, main content, widget grid using CSS Grid only.",
            ],
          },
          {
            name: "Container Queries",
            what: "@container queries style elements based on ancestor container size, not viewport. cqw, cqh units. Named containers.",
            why: "Enables truly reusable components that adapt to their context, not the screen size.",
            prereqs: "CSS Grid, Media Queries",
            difficulty: "Intermediate",
            realWorld:
              "A card switching between horizontal and vertical layout based on its container, not the viewport width.",
            mistakes:
              "Reaching for media queries when container queries are more semantically correct.",
            resources: [
              "MDN Container Queries",
              "web.dev Container Queries article",
              "CSS Tricks Container Queries",
            ],
            practice: [
              "Build a product card that adapts layout at 300px container width vs 600px container width.",
            ],
          },
          {
            name: "CSS Variables & Custom Properties",
            what: "Custom properties (--color-primary: #3b82f6), var(), @property for typed custom properties, inheritance, cascade layers (@layer).",
            why: "Custom properties enable dynamic theming, design tokens, and runtime style changes via JavaScript.",
            prereqs: "CSS fundamentals",
            difficulty: "Intermediate",
            realWorld:
              "Dark mode with one CSS change. Design tokens shared between CSS and JS. Component-scoped theme overrides.",
            mistakes:
              "Not using @layer, leading to specificity wars. Not leveraging custom property inheritance.",
            resources: [
              "Modern CSS (moderncss.dev)",
              "CSS { In Real Life } blog",
              "Lea Verou's CSS Secrets",
            ],
            practice: [
              "Build a design token system with CSS custom properties. Implement dark/light/high-contrast themes without JS.",
            ],
          },
          {
            name: "Modern CSS Selectors",
            what: ":is(), :where(), :has() (parent selector), :not(), :nth-child(an+b of selector), :focus-visible, :focus-within. Selector specificity rules.",
            why: ":has() is the most powerful new CSS feature. It enables conditional styling based on child content.",
            prereqs: "CSS fundamentals",
            difficulty: "Intermediate",
            realWorld:
              ":has(img) to style containers differently when they have images. :focus-visible for keyboard-only focus rings.",
            mistakes:
              "Not understanding :is()/:where() specificity differences. :where() has zero specificity.",
            resources: [
              "MDN :has()",
              "CSS Selectors Level 4",
              "web.dev modern CSS selectors",
            ],
            practice: [
              "Style a form differently based on :has(input:invalid). Build a disclosure widget with :has(details[open]).",
            ],
          },
          {
            name: "Animations & Transitions",
            what: "CSS transitions (transition: property duration easing), @keyframes animations, Web Animations API, animation-timeline, scroll-driven animations.",
            why: "CSS animations are GPU-accelerated. Understanding which properties trigger layout/paint determines performance.",
            prereqs: "CSS fundamentals",
            difficulty: "Intermediate",
            realWorld:
              "Micro-interactions, page transitions, loading states, scroll-driven parallax effects.",
            mistakes:
              "Animating properties that trigger layout (width, height). Only animate transform and opacity for 60fps.",
            resources: [
              "CSS Animations documentation",
              "The Animation Guide (web.dev)",
              "Scroll-driven Animations Spec",
            ],
            practice: [
              "Build an animated card flip without JavaScript. Implement a scroll-driven progress indicator using CSS only.",
            ],
          },
          {
            name: "CSS Architecture (BEM, CUBE, Utility-First)",
            what: "BEM (Block__Element--Modifier), CUBE CSS (Composition, Utility, Block, Exception), utility-first (Tailwind). Methodologies for scalable CSS.",
            why: "Without architecture, CSS becomes unmaintainable at scale. Specificity conflicts and cascade issues.",
            prereqs: "CSS fundamentals",
            difficulty: "Intermediate",
            realWorld:
              "Design systems, large team codebases, ensuring CSS changes don't have unexpected side effects.",
            mistakes:
              "Deep nesting (3+ levels). !important overuse. Global styles bleeding into component scope.",
            resources: [
              "BEM methodology",
              "CUBE CSS (Andy Bell)",
              "Tailwind CSS documentation",
            ],
            practice: [
              "Refactor a messy stylesheet using BEM. Eliminate all !important uses. Identify and fix specificity conflicts.",
            ],
          },
          {
            name: "Responsive Design & Media Queries",
            what: "Mobile-first approach, @media (min-width), @media (prefers-color-scheme), @media (prefers-reduced-motion), @media (display-mode), viewport units.",
            why: "60%+ of traffic is mobile. Responsive design is not optional.",
            prereqs: "Flexbox, CSS Grid",
            difficulty: "Intermediate",
            realWorld:
              "Fluid typography with clamp(). Intrinsic layouts that work without breakpoints. Print stylesheets.",
            mistakes:
              "Desktop-first design. Forgetting prefers-reduced-motion for users with vestibular disorders.",
            resources: [
              "Every Layout (every-layout.dev)",
              "Intrinsic Web Design (Jen Simmons)",
              "web.dev responsive design",
            ],
            practice: [
              "Build a fully responsive layout with zero breakpoints using intrinsic CSS techniques.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 7 — JAVASCRIPT MASTERY
  // ============================================================
  {
    id: 7,
    emoji: "⚡",
    title: "JavaScript Mastery",
    color: "#f7df1e",
    darkColor: "#c0a800",
    sections: [
      {
        title: "Core Language",
        topics: [
          {
            name: "Scope, Closures & Hoisting",
            what: "Lexical scope, variable hoisting (var vs let/const), temporal dead zone, closure over mutable bindings, IIFE pattern, module scope.",
            why: "Fundamental to JavaScript's execution model. Closures power module patterns, memoization, and React hooks.",
            prereqs: "JS basics",
            difficulty: "Intermediate",
            realWorld:
              "Module pattern (IIFE), private variables, factory functions, memoization, useState is a closure.",
            mistakes:
              "The for-loop closure bug with var. The setTimeout-in-loop problem. Fix with let or IIFE.",
            resources: [
              "You Don't Know JS: Scope & Closures (Kyle Simpson)",
              "MDN Closures",
            ],
            practice: [
              "Implement a memoize function using closures. Build a module with private state.",
            ],
          },
          {
            name: "Prototypal Inheritance & OOP",
            what: "[[Prototype]] chain, Object.create(), prototype delegation, ES6 class syntax (syntactic sugar), super, mixins, composition over inheritance.",
            why: "Every JS object uses prototypes. Understanding this explains how class syntax works under the hood.",
            prereqs: "Objects, Functions",
            difficulty: "Intermediate",
            realWorld:
              "Understanding Array.prototype.map, extending built-ins safely, creating efficient object hierarchies.",
            mistakes:
              "Mutating Array.prototype. Preferring deep inheritance hierarchies over composition.",
            resources: [
              "YDKJS: this & Object Prototypes",
              "JavaScript.info Prototypes",
            ],
            practice: [
              "Implement inheritance without class syntax. Implement Object.create from scratch.",
            ],
          },
          {
            name: "Async JavaScript & Event Loop",
            what: "Call stack, Web APIs, macrotask queue (setTimeout, setInterval), microtask queue (Promises, queueMicrotask). Callbacks → Promises → async/await.",
            why: "JavaScript's non-blocking I/O model. Deep understanding is essential for correct async code.",
            prereqs: "Functions, Callbacks",
            difficulty: "Intermediate",
            realWorld:
              "API calls, Node.js file I/O, Promise.all for parallel requests, Promise.allSettled for resilient fetching.",
            mistakes:
              "Swallowing Promise rejections. Forgetting await. Not handling Promise.all rejection.",
            resources: [
              "Philip Roberts Event Loop talk (JSConf)",
              "Node.js Event Loop (nodejs.org)",
              "Jake Archibald: In The Loop",
            ],
            practice: [
              "Implement Promise from scratch. Implement a rate limiter using async/await.",
            ],
          },
          {
            name: "Iterators, Generators & Symbols",
            what: "Iterable protocol (Symbol.iterator), generators (function*), yield, yield*, async generators, for...of, spread/destructuring with custom iterables.",
            why: "Generators enable lazy evaluation, infinite sequences, and cooperative multitasking — powerful patterns for data pipelines.",
            prereqs: "Async JavaScript",
            difficulty: "Advanced",
            realWorld:
              "Lazy data processing pipelines, implementing custom data structures with iteration, Redux-Saga uses generators.",
            mistakes:
              "Overusing generators where a simple array map would suffice.",
            resources: ["YDKJS: ES6+", "JavaScript.info Generators"],
            practice: [
              "Implement an infinite Fibonacci generator. Build a lazy pipeline: filter → map → take using generators.",
            ],
          },
          {
            name: "Functional Programming",
            what: "Pure functions, immutability, composition (pipe/compose), currying, partial application, functors, monads (optional pattern), point-free style.",
            why: "Pure functions are testable, cacheable, and predictable. FP patterns are idiomatic in modern JS and React.",
            prereqs: "Functions, Arrays",
            difficulty: "Intermediate",
            realWorld:
              "React functional components, Redux reducers (pure), ramda/lodash-fp utility usage, array pipeline methods.",
            mistakes:
              "Over-engineering with FP. Not every problem needs monads. Use where it simplifies, not to appear clever.",
            resources: [
              "Professor Frisby's Mostly Adequate Guide to FP (free)",
              "JavaScript Allongé (Braithwaite)",
            ],
            practice: [
              "Implement map, filter, reduce from scratch. Build compose and pipe utilities.",
            ],
          },
          {
            name: "Proxies & Reflect API",
            what: "Proxy wraps objects and intercepts operations (get, set, has, apply, construct). Reflect mirrors proxy traps for default behavior.",
            why: "Powers Vue 3 reactivity, validation libraries, and ORM query builders. Essential for metaprogramming.",
            prereqs: "Prototypal Inheritance",
            difficulty: "Advanced",
            realWorld:
              "Vue 3 reactive() uses Proxy. Immer uses Proxy for structural sharing. ORM query builder DSLs.",
            mistakes:
              "Proxy performance overhead. Not using Reflect to maintain default behavior in traps.",
            resources: ["MDN Proxy", "JavaScript Proxies in Practice"],
            practice: [
              "Build a reactive data binding system using Proxy (like Vue's reactive()). Build a validation proxy.",
            ],
          },
          {
            name: "Design Patterns",
            what: "Creational: Singleton, Factory, Builder. Structural: Proxy, Decorator, Adapter, Facade. Behavioral: Observer, Strategy, Command, Iterator, Template Method.",
            why: "Patterns are a shared vocabulary and proven solutions for recurring problems.",
            prereqs: "OOP, Closures",
            difficulty: "Advanced",
            realWorld:
              "Observer = EventEmitter. Proxy = Vue reactivity. Strategy = payment provider switching. Command = undo/redo.",
            mistakes:
              "Forcing patterns where they don't fit. Patterns are tools, not rules.",
            resources: [
              "Learning JavaScript Design Patterns (Addy Osmani, free)",
              "Refactoring Guru Patterns",
            ],
            practice: [
              "Implement a pub/sub event system. Build a command pattern for an undo/redo system.",
            ],
          },
          {
            name: "Browser APIs",
            what: "Web Storage (localStorage, sessionStorage), IndexedDB, Service Workers, Cache API, File API, Geolocation, Notifications, WebWorkers, IntersectionObserver, MutationObserver, ResizeObserver.",
            why: "Rich browser APIs enable powerful offline-capable, native-like web applications.",
            prereqs: "JavaScript basics",
            difficulty: "Intermediate",
            realWorld:
              "Offline-first PWAs with Service Worker + Cache API. Virtual scroll with IntersectionObserver.",
            mistakes:
              "Not handling browser API permission denials. Storing sensitive data in localStorage (XSS-accessible).",
            resources: [
              "MDN Web APIs",
              "web.dev: Service Workers",
              "The Offline Cookbook (Jake Archibald)",
            ],
            practice: [
              "Build a PWA with offline capability using Service Worker and Cache API.",
            ],
          },
          {
            name: "V8 Engine Internals",
            what: "V8: Ignition interpreter + TurboFan JIT compiler. Hidden classes (object shapes), inline caching, deoptimization triggers, garbage collection phases.",
            why: "Writing V8-friendly code means understanding what causes deoptimizations: dynamic property deletion, type instability.",
            prereqs: "JavaScript advanced",
            difficulty: "Advanced",
            realWorld:
              "Why deleting properties hurts performance. Why consistent object shapes enable inline caching.",
            mistakes:
              "Premature optimization. Profile first. V8 is remarkably effective at optimizing idiomatic code.",
            resources: [
              "V8 blog (v8.dev)",
              "Franziska Hinkelmann's V8 talks",
              "Benedikt Meurer's optimization talks",
            ],
            practice: [
              "Use --trace-opt/--trace-deopt to observe V8 optimization in a Node.js process. Profile with clinic.js.",
            ],
          },
          {
            name: "JavaScript Security",
            what: "XSS prevention (escaping, CSP), prototype pollution, eval() dangers, CORS, CSRF, supply chain attacks (npm audit), SRI (Subresource Integrity).",
            why: "JavaScript runs in a hostile environment: the browser. Security mistakes have immediate, public consequences.",
            prereqs: "DOM, HTTP",
            difficulty: "Intermediate",
            realWorld:
              "Prototype pollution in lodash, CVE-2019-10744. Supply chain attack via npm package hijacking.",
            mistakes:
              "Using eval() or innerHTML with user data. Not auditing npm dependencies. Trusting client-side validation.",
            resources: [
              "OWASP JavaScript Security Guide",
              "Snyk Vulnerability Database",
              "npm audit documentation",
            ],
            practice: [
              "Audit an npm project for vulnerabilities. Fix a prototype pollution vulnerability.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 8 — TYPESCRIPT MASTERY
  // ============================================================
  {
    id: 8,
    emoji: "🔷",
    title: "TypeScript Mastery",
    color: "#3178c6",
    darkColor: "#1a4a8a",
    sections: [
      {
        title: "Type System",
        topics: [
          {
            name: "Type Inference & Fundamentals",
            what: "Structural typing, type inference, literal types, union types, intersection types, discriminated unions, const assertions, satisfies operator.",
            why: "TypeScript's type system is far more powerful than most use. Understanding it unlocks significant productivity gains.",
            prereqs: "JavaScript basics",
            difficulty: "Beginner",
            realWorld:
              "Discriminated unions for state machines. Const assertions for typed configuration objects.",
            mistakes:
              "Over-annotating (trusting inference). Using any to escape the type system.",
            resources: [
              "TypeScript Handbook",
              "Total TypeScript (Matt Pocock)",
              "TypeScript Deep Dive (Basarat)",
            ],
            practice: [
              "Type a state machine for a traffic light using discriminated unions.",
            ],
          },
          {
            name: "Generics",
            what: "Type parameters, generic constraints (extends), generic defaults, generic functions, generic classes, conditional type inference with generics.",
            why: "Generics make code reusable across multiple types while maintaining full type safety.",
            prereqs: "TypeScript fundamentals",
            difficulty: "Intermediate",
            realWorld:
              "Generic API response wrapper, generic React components, type-safe custom hooks.",
            mistakes:
              "Overusing any to avoid generics. Not constraining generics appropriately.",
            resources: [
              "TypeScript Handbook: Generics",
              "Total TypeScript",
              "type-challenges on GitHub",
            ],
            practice: [
              "Implement a type-safe EventEmitter using generics. Type a fetch wrapper with generic return type.",
            ],
          },
          {
            name: "Utility Types",
            what: "Built-in transformers: Partial<T>, Required<T>, Readonly<T>, Pick<T,K>, Omit<T,K>, Record<K,V>, Exclude<T,U>, Extract<T,U>, NonNullable<T>, ReturnType<F>, Parameters<F>, ConstructorParameters, InstanceType.",
            why: "Eliminates duplication. Derive types from existing types instead of redeclaring them.",
            prereqs: "Generics",
            difficulty: "Intermediate",
            realWorld:
              "Partial<Config> for optional overrides. Omit<User, 'password'> for API responses.",
            mistakes:
              "Redeclaring types instead of deriving. Leads to types going out of sync.",
            resources: [
              "TypeScript Handbook: Utility Types",
              "type-challenges (GitHub)",
            ],
            practice: [
              "Solve 30 type challenges. Implement Partial, Required, Pick, Omit from scratch.",
            ],
          },
          {
            name: "Conditional & Mapped Types",
            what: "Conditional: T extends U ? X : Y. Mapped: { [K in keyof T]: Transform<T[K]> }. infer keyword for type extraction. Template literal types.",
            why: "Enables types that change based on other types — the foundation of advanced type libraries.",
            prereqs: "Utility Types",
            difficulty: "Advanced",
            realWorld:
              "DeepReadonly, recursive types, template literals for API routes, inferring function return types.",
            mistakes:
              "Types so complex teammates can't understand them. Types should document, not obfuscate.",
            resources: [
              "Total TypeScript advanced workshops",
              "TypeScript type challenges",
            ],
            practice: [
              "Implement DeepReadonly<T>, DeepPartial<T>. Build a type-safe router with inferred params.",
            ],
          },
          {
            name: "TypeScript Compiler & tsconfig",
            what: "Compiler options: strict, target, lib, module, moduleResolution, paths, baseUrl, declaration, sourceMap, incremental, project references.",
            why: "Incorrect tsconfig leads to incorrect compilation, missing type safety, and broken tooling.",
            prereqs: "TypeScript intermediate",
            difficulty: "Intermediate",
            realWorld:
              "Project references for monorepos. Path aliases for cleaner imports. Strict mode for maximum safety.",
            mistakes:
              "Not enabling strict mode. Incorrect moduleResolution for Node.js 16+ ESM.",
            resources: [
              "tsconfig reference (typescriptlang.org)",
              "Are the Types Wrong? (arethetypeswrong.dev)",
            ],
            practice: [
              "Configure a TypeScript monorepo with project references and path aliases.",
            ],
          },
          {
            name: "Declaration Files (.d.ts)",
            what: "Ambient declarations, module augmentation, global augmentation, @types packages, triple-slash references, declaration merging.",
            why: "Enables type-safe usage of JavaScript libraries that lack TypeScript support.",
            prereqs: "TypeScript intermediate",
            difficulty: "Intermediate",
            realWorld:
              "Writing types for internal JS modules, contributing to DefinitelyTyped, extending library types.",
            mistakes:
              "Using @ts-ignore instead of proper declarations. Losing type safety at library boundaries.",
            resources: [
              "TypeScript Declaration Files guide",
              "DefinitelyTyped Contributing Guide",
            ],
            practice: [
              "Write a .d.ts file for a popular JS library. Augment an existing library type.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 9 — DATA STRUCTURES & ALGORITHMS
  // ============================================================
  {
    id: 9,
    emoji: "📊",
    title: "Data Structures & Algorithms",
    color: "#00c896",
    darkColor: "#007a5c",
    sections: [
      {
        title: "Foundations",
        topics: [
          {
            name: "Big O Notation",
            what: "Time and space complexity analysis. O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ). Best/average/worst case. Amortized analysis.",
            why: "Enables comparing algorithms and making informed decisions about scalability.",
            prereqs: "Basic math",
            difficulty: "Beginner",
            realWorld:
              "Choosing O(1) hash lookup vs O(n) array search. Understanding why bubble sort fails on large datasets.",
            mistakes:
              "Confusing best-case with average/worst-case. Big O is worst case unless specified.",
            resources: [
              "Big O Cheat Sheet (bigocheatsheet.com)",
              "Introduction to Algorithms (CLRS)",
            ],
            practice: [
              "Analyze the time and space complexity of 30 different code snippets.",
            ],
          },
          {
            name: "Arrays & Dynamic Arrays",
            what: "Contiguous memory, O(1) random access, O(n) insert/delete in middle, O(1) amortized append. Dynamic resizing (doubling strategy).",
            why: "Foundation of most data structures. Cache-friendly due to spatial locality.",
            prereqs: "Big O",
            difficulty: "Beginner",
            realWorld:
              "JavaScript arrays are dynamic arrays. Most interview problems use arrays.",
            mistakes:
              "Using linked lists when arrays suffice. Arrays are cache-friendly; linked lists have pointer-chasing overhead.",
            resources: [
              "LeetCode Easy array problems",
              "CTCI Chapter on Arrays",
            ],
            practice: [
              "Implement a dynamic array from scratch. Solve: Two Sum, Maximum Subarray, Merge Intervals.",
            ],
          },
          {
            name: "Linked Lists",
            what: "Singly linked, doubly linked, circular. O(1) insert at head, O(n) access. Sentinel nodes, Floyd's cycle detection, fast/slow pointers.",
            why: "Foundational structure for understanding pointer-based data structures. LRU cache implementation.",
            prereqs: "Arrays",
            difficulty: "Beginner",
            realWorld:
              "LRU cache uses doubly linked list + hash map. Browser history (back/forward). Undo stacks.",
            mistakes:
              "Not handling null checks for head/tail. Losing references when rearranging pointers.",
            resources: ["LeetCode Linked List problems", "CTCI Chapter 2"],
            practice: [
              "Implement doubly linked list. Implement LRU cache. Solve: Reverse Linked List, Detect Cycle.",
            ],
          },
          {
            name: "Stacks & Queues",
            what: "Stack: LIFO, O(1) push/pop. Queue: FIFO, O(1) enqueue/dequeue. Deque (double-ended). Monotonic stack for optimization problems.",
            why: "Core data structures underlying recursion, BFS, expression parsing, and many optimization algorithms.",
            prereqs: "Arrays, Linked Lists",
            difficulty: "Beginner",
            realWorld:
              "Call stack (stack). BFS uses queue. Browser back/forward uses stack. Undo/redo uses stack.",
            mistakes:
              "Using array.shift() for queue (O(n)). Implement with linked list for O(1) dequeue.",
            resources: ["LeetCode Stack/Queue problems"],
            practice: [
              "Implement stack and queue using two queues or two stacks. Solve: Valid Parentheses, Sliding Window Maximum.",
            ],
          },
          {
            name: "Hash Tables",
            what: "Key-value store with O(1) average get/set/delete. Hash functions, collision resolution (chaining, open addressing). Load factor. Robin Hood hashing.",
            why: "The most useful data structure in practice. Powers databases, caches, sets, and symbol tables.",
            prereqs: "Arrays",
            difficulty: "Beginner",
            realWorld:
              "Database indexes (hash indexes), Python dicts, JavaScript objects and Maps.",
            mistakes:
              "Ignoring collision handling. Not understanding when worst-case O(n) occurs.",
            resources: [
              "CLRS Chapter on Hash Tables",
              "Visualizing Hash Tables",
            ],
            practice: [
              "Implement a hash table with chaining. Solve: Two Sum, Group Anagrams, LRU Cache.",
            ],
          },
          {
            name: "Trees",
            what: "Binary trees, BST (O(log n) ops when balanced), AVL, Red-Black trees, B-trees (databases), Tries (prefix trees), Segment trees, Fenwick trees.",
            why: "Trees power databases (B-trees), filesystems, autocomplete (Tries), and the DOM.",
            prereqs: "Recursion",
            difficulty: "Intermediate",
            realWorld:
              "Database B-tree indexes. DNS hierarchy. File system directories. Autocomplete with Trie.",
            mistakes:
              "Not understanding when trees become unbalanced (degrade to O(n)). Forgetting base cases in recursion.",
            resources: [
              "Algorithms (Sedgewick)",
              "LeetCode Trees",
              "Visualgo.net",
            ],
            practice: [
              "Implement BST with insert/search/delete. Solve: Maximum Depth, Level Order Traversal, LCA.",
            ],
          },
          {
            name: "Graphs",
            what: "Directed/undirected, weighted/unweighted, adjacency list/matrix representation. BFS, DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, Topological Sort, Union-Find.",
            why: "Graphs model relationships. Social networks, routing, dependency resolution, and workflow systems are all graphs.",
            prereqs: "Trees, Queues",
            difficulty: "Intermediate",
            realWorld:
              "npm dependency resolution (DAG). Google Maps routing (Dijkstra). Social network friend suggestions (BFS).",
            mistakes:
              "Not marking visited nodes (infinite loops). Not choosing BFS vs DFS correctly.",
            resources: [
              "William Fiset Graph Theory playlist",
              "LeetCode Graph problems",
            ],
            practice: [
              "Implement BFS and DFS. Solve Dijkstra's. Solve: Number of Islands, Course Schedule, Network Delay Time.",
            ],
          },
          {
            name: "Heaps & Priority Queues",
            what: "Min-heap/max-heap: O(log n) insert, O(1) peek, O(log n) extract. Heap sort. Fibonacci heap for Dijkstra optimization.",
            why: "Essential for problems requiring repeated minimum/maximum extraction: scheduling, Dijkstra, merge K sorted lists.",
            prereqs: "Arrays, Trees",
            difficulty: "Intermediate",
            realWorld:
              "Task schedulers. Stream processing: find median, top K elements. Event-driven simulation.",
            mistakes:
              "Implementing heap manually instead of using a library for production code.",
            resources: ["CLRS Chapter on Heaps", "LeetCode Heap problems"],
            practice: [
              "Implement min-heap from scratch. Solve: Merge K Sorted Lists, Top K Frequent Elements, Kth Largest.",
            ],
          },
          {
            name: "Dynamic Programming",
            what: "Memoization (top-down) and tabulation (bottom-up). Identify overlapping subproblems and optimal substructure. Recognize DP patterns: 0/1 knapsack, LCS, LIS, edit distance.",
            why: "Turns exponential brute force into polynomial time for optimization problems.",
            prereqs: "Recursion, Arrays",
            difficulty: "Advanced",
            realWorld:
              "Myers diff algorithm for git. Viterbi algorithm for NLP. Sequence alignment in bioinformatics.",
            mistakes:
              "Not starting with brute force recursion first. Jumping to DP without understanding the recurrence.",
            resources: [
              "Grokking DP Patterns (educative.io)",
              "MIT 6.006 DP Lectures",
              "Neetcode DP playlist",
            ],
            practice: [
              "Solve: Fibonacci, Coin Change, LCS, Knapsack 0/1, Edit Distance, Word Break, Burst Balloons.",
            ],
          },
          {
            name: "Sorting & Searching",
            what: "QuickSort (avg O(n log n), in-place), MergeSort (stable, O(n log n)), HeapSort, Counting/Radix sort. Binary search and its variants (first/last occurrence, search space).",
            why: "Sorting and searching are ubiquitous operations. Understanding tradeoffs guides selection.",
            prereqs: "Arrays, Big O",
            difficulty: "Intermediate",
            realWorld:
              "Database query execution uses sorting. Binary search powers autocomplete, git bisect.",
            mistakes:
              "Implementing QuickSort when built-in sort is fine. Not using binary search for sorted arrays.",
            resources: [
              "Sorting Algorithm Visualizer (visualgo.net)",
              "LeetCode Binary Search problems",
            ],
            practice: [
              "Implement QuickSort, MergeSort. Binary search: first/last occurrence, rotated array, search range.",
            ],
          },
          {
            name: "Greedy Algorithms & Backtracking",
            what: "Greedy: locally optimal choices leading to global optimum (interval scheduling, Huffman coding, Kruskal's MST). Backtracking: explore all possibilities with pruning (N-Queens, Sudoku, permutations).",
            why: "Greedy solves optimization problems efficiently. Backtracking solves constraint satisfaction problems.",
            prereqs: "Sorting, Arrays",
            difficulty: "Advanced",
            realWorld:
              "Interval scheduling for calendar apps. Huffman coding for compression. Constraint satisfaction for puzzles.",
            mistakes:
              "Applying greedy without proving it's correct (greedy doesn't always work). Not pruning in backtracking.",
            resources: [
              "CLRS Greedy Algorithms",
              "LeetCode Backtracking problems",
            ],
            practice: [
              "Solve: Activity Selection, Jump Game, N-Queens, Combination Sum, Generate Parentheses, Sudoku Solver.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 10 — FRONTEND ENGINEERING
  // ============================================================
  {
    id: 10,
    emoji: "🖼️",
    title: "Frontend Engineering",
    color: "#ff4785",
    darkColor: "#cc0060",
    sections: [
      {
        title: "Browser & DOM",
        topics: [
          {
            name: "DOM Manipulation & Events",
            what: "Document Object Model tree. querySelector, createElement, appendChild, event delegation, custom events, event capture vs bubble, passive event listeners.",
            why: "Understanding the DOM is required for any JavaScript UI work, even when using frameworks.",
            prereqs: "HTML, JavaScript",
            difficulty: "Beginner",
            realWorld:
              "Building interactive UI without frameworks, understanding what React/Vue do under the hood.",
            mistakes:
              "Querying the DOM inside loops. Reading layout properties after writing (causes forced reflow).",
            resources: [
              "MDN DOM documentation",
              "JavaScript.info DOM Manipulation",
            ],
            practice: [
              "Build a Todo app in vanilla JS without frameworks. Implement virtual scroll for 100k items.",
            ],
          },
          {
            name: "Browser Rendering Pipeline",
            what: "Critical rendering path: Parse HTML → Build DOM → Parse CSS → Build CSSOM → Combine → Layout → Paint → Composite. GPU layers.",
            why: "Understanding rendering helps optimize Core Web Vitals and avoid layout thrashing.",
            prereqs: "HTML, CSS",
            difficulty: "Intermediate",
            realWorld:
              "Avoiding CSS properties that trigger layout recalculation. Using will-change for GPU compositing.",
            mistakes:
              "Reading offsetHeight inside a write loop — triggers synchronous layout on every iteration.",
            resources: [
              "Inside look at modern web browser (Google blog series)",
              "Rendering Performance (web.dev)",
            ],
            practice: [
              "Use Chrome DevTools Performance tab to find layout thrashing. Fix using requestAnimationFrame.",
            ],
          },
          {
            name: "State Management Patterns",
            what: "Local state, global state, server state, URL state, form state. Flux, Redux, atomic state (Jotai, Recoil), proxy-based (Valtio), state machines (XState).",
            why: "State management is the hardest part of frontend engineering. Wrong patterns cause bugs and performance issues.",
            prereqs: "JavaScript, DOM",
            difficulty: "Advanced",
            realWorld:
              "Redux for global state, TanStack Query for server state, Zustand for lightweight shared state.",
            mistakes:
              "Putting everything in global state. Overusing Redux when local state suffices.",
            resources: [
              "XState documentation",
              "Jotai vs Zustand vs Redux comparison",
              "You Might Not Need Redux (Abramov)",
            ],
            practice: [
              "Implement the same shopping cart with: useState, useReducer, Zustand, and XState. Compare tradeoffs.",
            ],
          },
          {
            name: "Performance Optimization",
            what: "Core Web Vitals (LCP, CLS, INP), code splitting, lazy loading, virtual lists, bundle analysis, resource hints, critical CSS.",
            why: "Performance is a feature. 1-second delay = 7% fewer conversions. Google ranks faster pages higher.",
            prereqs: "Browser Rendering, React/Vue basics",
            difficulty: "Advanced",
            realWorld:
              "Lighthouse audits, webpack-bundle-analyzer, lazy loading routes, Virtuoso for 10k item lists.",
            mistakes:
              "Optimizing before measuring. Profile first. Real User Monitoring (RUM) reveals field data.",
            resources: [
              "web.dev Performance",
              "Core Web Vitals guide",
              "WebPageTest documentation",
            ],
            practice: [
              "Take a slow app to Lighthouse 90+. Profile with DevTools. Fix top 3 bottlenecks with evidence.",
            ],
          },
          {
            name: "Design Systems",
            what: "Component libraries, design tokens, Storybook for component development, style guides, accessibility standards, versioning and distribution.",
            why: "Design systems enable consistent, accessible UIs built faster across multiple products.",
            prereqs: "CSS architecture, Accessibility",
            difficulty: "Advanced",
            realWorld:
              "Radix UI, Shadcn/ui, Material UI, Ant Design — all production design systems.",
            mistakes:
              "Building a design system before you need one. Solve specific pain points first.",
            resources: [
              "Design Systems (Alla Kholmatova)",
              "Storybook documentation",
              "Brad Frost: Atomic Design",
            ],
            practice: [
              "Build a design system with 10 components, Storybook docs, a11y tests, and npm publishing.",
            ],
          },
          {
            name: "Progressive Web Apps (PWA)",
            what: "Service Workers for offline and caching, Web App Manifest for installability, Background Sync, Push Notifications, Web Share API.",
            why: "PWAs deliver native-like experiences without app store distribution. Offline capability is a competitive advantage.",
            prereqs: "JavaScript, HTTP caching",
            difficulty: "Intermediate",
            realWorld:
              "Twitter Lite, Starbucks PWA achieved 2x daily active users after PWA launch.",
            mistakes:
              "Caching too aggressively without cache versioning. Not handling service worker update lifecycle.",
            resources: [
              "web.dev PWA",
              "The Offline Cookbook (Jake Archibald)",
              "Workbox documentation",
            ],
            practice: [
              "Build an offline-capable PWA with push notifications and background sync.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 11 — REACT ENGINEERING
  // ============================================================
  {
    id: 11,
    emoji: "⚛️",
    title: "React Engineering",
    color: "#61dafb",
    darkColor: "#1a9abf",
    sections: [
      {
        title: "React Internals & Patterns",
        topics: [
          {
            name: "Fiber Architecture & Reconciliation",
            what: "React Fiber is the reconciliation engine. Enables interruptible rendering, time-slicing, priority lanes, and concurrent features.",
            why: "Understanding Fiber explains why React can prioritize user interactions over background rendering.",
            prereqs: "React basics, JavaScript advanced",
            difficulty: "Advanced",
            realWorld:
              "startTransition() marks updates as non-urgent. Suspense boundaries. Batching behavior in React 18.",
            mistakes:
              "Thinking React re-renders are expensive. DOM manipulation is the bottleneck, not React's diffing.",
            resources: [
              "Inside Fiber: In-Depth Overview (Maxim Koretskyi)",
              "React Internals Deep Dive (YouTube)",
            ],
            practice: [
              "Build a tiny React clone (react-from-scratch) with useState and useEffect support.",
            ],
          },
          {
            name: "Hooks Deep Dive",
            what: "useState, useEffect, useContext, useReducer, useRef, useMemo, useCallback, useLayoutEffect, useId, useTransition, useDeferredValue, useSyncExternalStore.",
            why: "Hooks are React's primary API. Misusing them is the #1 source of React bugs.",
            prereqs: "React basics",
            difficulty: "Intermediate",
            realWorld:
              "useEffect dependency arrays. Stale closure bugs. When useMemo/useCallback actually help.",
            mistakes:
              "Adding everything to useEffect. Using useEffect for derived state. Missing/incorrect dependencies.",
            resources: [
              "A Complete Guide to useEffect (Dan Abramov)",
              "React docs (react.dev)",
            ],
            practice: [
              "Build: useFetch, useLocalStorage, useDebounce, useIntersectionObserver custom hooks.",
            ],
          },
          {
            name: "Server Components (RSC)",
            what: "React components that render on the server — direct database access, filesystem access, no client-side JavaScript. Interleaved with Client Components.",
            why: "RSC eliminates waterfalls, reduces bundle size to zero for server-rendered components, enables streaming HTML.",
            prereqs: "React, Node.js, HTTP",
            difficulty: "Advanced",
            realWorld:
              "Next.js App Router uses RSC by default. Shopify Hydrogen uses RSC for e-commerce.",
            mistakes:
              "Adding event handlers in Server Components. RSC cannot be interactive.",
            resources: [
              "React Server Components RFC",
              "Josh Comeau: Making Sense of RSC",
            ],
            practice: [
              "Build a blog with Next.js App Router using RSC for data fetching and Client Components for interactivity.",
            ],
          },
          {
            name: "Concurrent Rendering & Suspense",
            what: "React 18 concurrent features: Suspense for data fetching and code splitting, useTransition, useDeferredValue, SuspenseList. Streaming SSR with renderToPipeableStream.",
            why: "Concurrent React enables responsive UIs even during heavy rendering by interleaving work.",
            prereqs: "Fiber Architecture, Hooks",
            difficulty: "Advanced",
            realWorld:
              "Streaming HTML for faster FCP. Non-blocking route transitions with startTransition.",
            mistakes:
              "Wrapping everything in Suspense. Only wrap components that actually suspend.",
            resources: [
              "React 18 RFC: Concurrent Features",
              "Streaming SSR with React 18",
            ],
            practice: [
              "Implement streaming SSR with Suspense for data fetching in a Next.js App Router app.",
            ],
          },
          {
            name: "State Management (Redux Toolkit, Zustand, TanStack Query)",
            what: "Redux Toolkit (RTK) standardizes Redux with createSlice, createAsyncThunk, RTK Query. Zustand for simple global state. TanStack Query for server state.",
            why: "Different state types need different tools. Redux for complex global state, TanStack Query for server state.",
            prereqs: "React Hooks",
            difficulty: "Intermediate",
            realWorld:
              "RTK Query for API calls with caching. Zustand for UI state. TanStack Query for REST/GraphQL.",
            mistakes:
              "Using Redux for server state (use TanStack Query instead). Global state for local UI concerns.",
            resources: [
              "Redux Toolkit documentation",
              "TanStack Query documentation",
              "Zustand documentation",
            ],
            practice: [
              "Build a data-heavy app using TanStack Query for server state and Zustand for UI state.",
            ],
          },
          {
            name: "React Router & Navigation",
            what: "React Router v6: nested routes, data loaders (Remix-style), actions, defer, Await, Link, NavLink, useParams, useSearchParams.",
            why: "Routing is fundamental to any multi-page React app. Understanding the data loading model prevents waterfall fetching.",
            prereqs: "React basics",
            difficulty: "Intermediate",
            realWorld:
              "Nested layouts with shared navigation. Data preloading on route transition. Form submissions with actions.",
            mistakes:
              "Fetching data inside components instead of route loaders. Not handling 404 and error states.",
            resources: ["React Router documentation", "Remix documentation"],
            practice: [
              "Build a multi-page app with nested routes, data loaders, error boundaries, and search params.",
            ],
          },
          {
            name: "React Testing Library",
            what: "Test components as users interact with them. Queries: getByRole, getByText, getByLabelText. userEvent for interactions. Testing async behavior.",
            why: "Testing implementation details is brittle. RTL encourages testing behavior, leading to resilient tests.",
            prereqs: "React basics, Jest",
            difficulty: "Intermediate",
            realWorld:
              "Testing a form submission, modal open/close, async data loading, and navigation.",
            mistakes:
              "Using getByTestId instead of accessible queries. Testing internal state instead of behavior.",
            resources: [
              "React Testing Library documentation",
              "Kent C. Dodds: Testing JavaScript",
            ],
            practice: [
              "Test a complete form flow: input validation, submission, success/error states.",
            ],
          },
          {
            name: "Performance Optimization",
            what: "React.memo, useMemo, useCallback, code splitting with lazy(), Suspense, useTransition, React Profiler, avoiding unnecessary re-renders.",
            why: "Unnecessary re-renders are the most common React performance issue.",
            prereqs: "React Hooks, Fiber",
            difficulty: "Intermediate",
            realWorld:
              "Memoizing expensive computations. Lazy loading route components. Context splitting.",
            mistakes:
              "Overusing memo/useMemo. They have overhead. Measure before adding memoization.",
            resources: [
              "Before You memo() (overreacted.io)",
              "React Profiler documentation",
            ],
            practice: [
              "Use React Profiler to find and fix 3 unnecessary re-render issues in a complex tree.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 12 — NODE.JS ENGINEERING
  // ============================================================
  {
    id: 12,
    emoji: "🟢",
    title: "Node.js Engineering",
    color: "#68d391",
    darkColor: "#276749",
    sections: [
      {
        title: "Node.js Architecture",
        topics: [
          {
            name: "Event Loop & libuv",
            what: "Node.js event loop phases: timers → pending callbacks → idle/prepare → poll → check → close callbacks. libuv thread pool for I/O. Microtask queues.",
            why: "Node.js's non-blocking I/O model is its defining feature. Misunderstanding the event loop causes subtle, hard-to-debug bugs.",
            prereqs: "JavaScript async",
            difficulty: "Intermediate",
            realWorld:
              "Understanding why process.nextTick fires before Promise callbacks. Diagnosing event loop blocking.",
            mistakes:
              "Blocking the event loop with CPU-heavy synchronous code. Long JSON.parse calls block all requests.",
            resources: [
              "Node.js Event Loop documentation",
              "Don't Block the Event Loop (Node.js guide)",
              "clinic.js",
            ],
            practice: [
              "Use clinic.js doctor to diagnose event loop blocking. Use clinic.js flame for CPU hotspots.",
            ],
          },
          {
            name: "Streams & Buffers",
            what: "Readable, Writable, Duplex, Transform streams. Backpressure, stream.pipeline(), stream.compose(). Buffer for binary data. base64 encoding.",
            why: "Streams enable processing large data without loading it all into memory — essential for file processing and proxying.",
            prereqs: "Node.js basics",
            difficulty: "Intermediate",
            realWorld:
              "Streaming file uploads to S3. Video transcoding pipelines. Compressing responses with zlib Transform.",
            mistakes:
              "Not handling backpressure (source faster than sink). Not using stream.pipeline() for error handling.",
            resources: [
              "Node.js Stream documentation",
              "Node.js Streams Handbook",
            ],
            practice: [
              "Build a streaming ETL pipeline: read large CSV → transform → write to database using streams.",
            ],
          },
          {
            name: "Worker Threads",
            what: "Run CPU-intensive JavaScript in separate threads sharing memory via SharedArrayBuffer and Atomics. Worker communication via postMessage.",
            why: "Allows Node.js to use multiple CPU cores without the overhead of separate processes.",
            prereqs: "Node.js basics, Concurrency",
            difficulty: "Advanced",
            realWorld:
              "Image processing, PDF generation, cryptographic operations — CPU-heavy tasks offloaded from event loop.",
            mistakes:
              "Using Worker Threads for I/O-bound tasks. Threads don't help I/O — that's what the event loop handles.",
            resources: [
              "Node.js Worker Threads documentation",
              "Worker Threads in Practice",
            ],
            practice: [
              "Benchmark: event loop vs Worker Thread for CPU-heavy image resizing. Implement a worker pool.",
            ],
          },
          {
            name: "Child Processes & Cluster",
            what: "child_process.fork(), exec(), spawn(), execFile(). Cluster module for multi-process load balancing across CPU cores.",
            why: "Fork processes for full CPU core utilization. Cluster enables a single Node app to handle load across all cores.",
            prereqs: "Processes, Node.js basics",
            difficulty: "Intermediate",
            realWorld:
              "PM2 uses cluster. Spawning Python subprocesses for ML inference. Running shell commands from Node.",
            mistakes:
              "Using exec() for user-provided commands (shell injection). Use execFile or spawn with args array.",
            resources: [
              "Node.js Child Process documentation",
              "Node.js Cluster documentation",
            ],
            practice: [
              "Build a cluster setup that spawns worker processes per CPU core and distributes HTTP requests.",
            ],
          },
          {
            name: "Node.js Core Modules",
            what: "fs (file system), path, os, net, http, https, crypto, zlib, util, readline, diagnostics_channel, AsyncLocalStorage, AsyncResource.",
            why: "Core modules provide the building blocks for everything from HTTP servers to cryptography without npm dependencies.",
            prereqs: "Node.js basics",
            difficulty: "Intermediate",
            realWorld:
              "AsyncLocalStorage for request-scoped context (correlation IDs). crypto for HMAC signatures.",
            mistakes:
              "Using fs.readFileSync in request handlers. Not using AsyncLocalStorage for context propagation.",
            resources: [
              "Node.js API documentation",
              "Node.js Best Practices (GitHub)",
            ],
            practice: [
              "Build an HTTP server from scratch using only Node core (no Express). Add routing, middleware, async error handling.",
            ],
          },
          {
            name: "Node.js Performance",
            what: "CPU profiling with --prof, V8 heap snapshots, clinic.js, 0x flame graphs. Event loop lag monitoring. Memory leak detection.",
            why: "Performance problems in Node.js have specific patterns that require Node-specific tooling to diagnose.",
            prereqs: "V8 Internals, Node.js architecture",
            difficulty: "Advanced",
            realWorld:
              "Diagnosing memory leaks in long-running Node servers. Finding synchronous crypto calls blocking the loop.",
            mistakes:
              "Not measuring before optimizing. Using --max-old-space-size without understanding the underlying leak.",
            resources: [
              "clinic.js documentation",
              "Node.js Profiling Guide",
              "0x flame graph tool",
            ],
            practice: [
              "Profile a Node.js API server. Generate a flame graph. Identify and fix the top CPU bottleneck.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 13 — BACKEND ENGINEERING
  // ============================================================
  {
    id: 13,
    emoji: "⚙️",
    title: "Backend Engineering",
    color: "#a78bfa",
    darkColor: "#5b21b6",
    sections: [
      {
        title: "API Design & Patterns",
        topics: [
          {
            name: "REST API Design",
            what: "Resource-based URLs, HTTP methods (GET/POST/PUT/PATCH/DELETE), status codes, HATEOAS, content negotiation, versioning strategies (URL, header, query param).",
            why: "RESTful APIs are the web standard. Good design enables evolvability and great developer experience.",
            prereqs: "HTTP, Node.js basics",
            difficulty: "Beginner",
            realWorld:
              "Every CRUD application. Pagination (cursor-based vs offset), rate limiting, API versioning.",
            mistakes:
              "GET for mutations. 200 for errors. Inconsistent naming conventions. Not documenting response schemas.",
            resources: [
              "Microsoft REST API Guidelines",
              "Zalando RESTful API Guidelines",
              "Google API Design Guide",
            ],
            practice: [
              "Design and build a RESTful API for a library: proper versioning, pagination, filtering, error formats.",
            ],
          },
          {
            name: "GraphQL",
            what: "Query language for APIs: single endpoint, strongly typed schema, resolvers, mutations, subscriptions, DataLoader for N+1 batching, federation.",
            why: "Eliminates over-fetching/under-fetching. Excellent for complex nested data and mobile clients with bandwidth constraints.",
            prereqs: "REST APIs, TypeScript",
            difficulty: "Intermediate",
            realWorld:
              "GitHub v4 API, Shopify, Stripe Dashboard all use GraphQL.",
            mistakes:
              "GraphQL for simple CRUD (REST is simpler). N+1 queries without DataLoader. Over-exposing internal data.",
            resources: [
              "Apollo Server documentation",
              "Production Ready GraphQL (Marc-André Giroux)",
              "The Guild documentation",
            ],
            practice: [
              "Build a GraphQL API with DataLoader batching, subscriptions, field-level authorization, and pagination.",
            ],
          },
          {
            name: "Authentication & Authorization",
            what: "Authentication: JWT (access + refresh tokens), sessions (cookie-based), OAuth 2.0 + PKCE, OIDC, passkeys/WebAuthn. Authorization: RBAC, ABAC, ReBAC.",
            why: "Security foundation. Wrong auth implementation is the most dangerous backend mistake.",
            prereqs: "HTTP, Cryptography basics",
            difficulty: "Intermediate",
            realWorld:
              "JWT for stateless APIs, sessions for web apps, OAuth for social login, Permit.io/Casbin for RBAC.",
            mistakes:
              "Storing passwords in plaintext. Using JWT with no expiry. Not implementing refresh token rotation.",
            resources: [
              "Auth0 documentation",
              "OAuth 2.0 in Action",
              "The Web Application Hacker's Handbook",
            ],
            practice: [
              "Build auth from scratch: registration, login, JWT refresh tokens, OAuth Google login, password reset.",
            ],
          },
          {
            name: "Validation & Error Handling",
            what: "Input validation (Zod, Joi, class-validator), sanitization, error hierarchies, global error middleware, RFC 7807 Problem Details, structured error responses.",
            why: "Validation is the first line of defense. Consistent error formats make APIs easier to consume.",
            prereqs: "REST APIs",
            difficulty: "Intermediate",
            realWorld:
              "Zod schemas shared between client and server (tRPC, Next.js). Error codes for client-side handling.",
            mistakes:
              "Trusting client input. Leaking stack traces in error responses. Inconsistent error shapes.",
            resources: [
              "Zod documentation",
              "RFC 7807 Problem Details",
              "Express error handling guide",
            ],
            practice: [
              "Build a validation middleware with Zod. Define a consistent error response format. Handle async errors.",
            ],
          },
          {
            name: "File Uploads & Storage",
            what: "Multipart form data, streaming uploads, direct-to-S3 uploads (presigned URLs), image processing (Sharp), virus scanning, size/type validation.",
            why: "File handling is a common requirement with significant security and performance implications.",
            prereqs: "Node.js Streams, AWS S3",
            difficulty: "Intermediate",
            realWorld:
              "Profile photo uploads, document processing, video uploads with transcoding pipelines.",
            mistakes:
              "Storing uploads on local filesystem (doesn't work at scale). Not validating file type (MIME sniffing).",
            resources: [
              "Multer documentation",
              "Sharp documentation",
              "AWS S3 presigned URLs",
            ],
            practice: [
              "Build image upload: presigned URL → S3 → Lambda resizing → CDN delivery. Validate type and size.",
            ],
          },
          {
            name: "Email & Notifications",
            what: "SMTP, transactional email (SendGrid, Resend, Postmark), email templates (React Email, MJML), email deliverability (SPF, DKIM, DMARC), push notifications.",
            why: "Transactional emails are critical for user engagement: confirmations, resets, notifications.",
            prereqs: "Node.js basics",
            difficulty: "Intermediate",
            realWorld:
              "Signup confirmation, password reset, weekly digest, billing receipts.",
            mistakes:
              "Using no-reply addresses. Not setting SPF/DKIM (emails go to spam). Not testing across email clients.",
            resources: [
              "Resend documentation",
              "React Email",
              "Email authentication guide",
            ],
            practice: [
              "Build a transactional email system with React Email templates, Resend delivery, and queue for reliability.",
            ],
          },
          {
            name: "Background Jobs & Queues",
            what: "Job queues (BullMQ, Temporal, Inngest), cron jobs, retry logic with exponential backoff, dead letter queues, priority queues, fan-out patterns.",
            why: "Long-running tasks must not block HTTP responses. Queues enable async processing with reliability.",
            prereqs: "Redis, Node.js",
            difficulty: "Intermediate",
            realWorld:
              "Email sending queue, PDF generation, video transcoding, scheduled reports, webhook delivery.",
            mistakes:
              "Processing long tasks synchronously in request handlers. No retry logic. No dead letter queue.",
            resources: [
              "BullMQ documentation",
              "Temporal documentation",
              "Inngest documentation",
            ],
            practice: [
              "Build a job processing system: priority queues, retries with backoff, DLQ, progress tracking.",
            ],
          },
          {
            name: "Event-Driven Architecture",
            what: "Event producers, consumers, event brokers (Kafka, RabbitMQ, SQS, EventBridge). Event schemas, idempotency, at-least-once delivery, outbox pattern.",
            why: "Events enable loose coupling, scalability, and audit trails in distributed systems.",
            prereqs: "Databases, Message Queues",
            difficulty: "Advanced",
            realWorld:
              "Order placed → inventory, email, analytics all react independently to the same event.",
            mistakes:
              "Tight coupling between services via direct calls instead of events. No event schema registry.",
            resources: [
              "Enterprise Integration Patterns (Hohpe & Woolf)",
              "Designing Event-Driven Systems (Stopford)",
            ],
            practice: [
              "Implement order processing with events. Handle failures with dead-letter queues and idempotency keys.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 14 — API ENGINEERING
  // ============================================================
  {
    id: 14,
    emoji: "🔌",
    title: "API Engineering",
    color: "#f97316",
    darkColor: "#9a3412",
    sections: [
      {
        title: "API Design & Standards",
        topics: [
          {
            name: "OpenAPI & Swagger",
            what: "OpenAPI 3.x specification for describing REST APIs. YAML/JSON schema, request/response schemas, authentication definitions, Swagger UI for documentation.",
            why: "OpenAPI enables automatic client generation, documentation, and contract testing — critical for developer experience.",
            prereqs: "REST APIs",
            difficulty: "Intermediate",
            realWorld:
              "Generating TypeScript clients from OpenAPI specs. Automated API documentation for external developers.",
            mistakes:
              "Writing OpenAPI after the fact. Design the spec first, then implement.",
            resources: [
              "OpenAPI specification",
              "Stoplight Studio",
              "swagger-ui-express",
            ],
            practice: [
              "Design an OpenAPI 3.x spec for a complete API. Generate TypeScript client with openapi-typescript.",
            ],
          },
          {
            name: "API Gateway",
            what: "Single entry point for all APIs: authentication, rate limiting, request transformation, routing, SSL termination, caching, analytics. AWS API Gateway, Kong, Traefik.",
            why: "API Gateway centralizes cross-cutting concerns across all services, reducing duplication.",
            prereqs: "REST APIs, Networking",
            difficulty: "Intermediate",
            realWorld:
              "AWS API Gateway with Lambda. Kong as a self-hosted gateway. Traefik for Kubernetes.",
            mistakes:
              "Too much logic in the gateway (business logic belongs in services). Routing is the gateway's job.",
            resources: [
              "AWS API Gateway documentation",
              "Kong documentation",
              "API Gateway Pattern (MS Docs)",
            ],
            practice: [
              "Set up Kong as an API gateway with authentication, rate limiting, and analytics plugins.",
            ],
          },
          {
            name: "Rate Limiting & Throttling",
            what: "Token bucket, sliding window, fixed window algorithms. Per-user, per-IP, per-API-key limits. Retry-After headers. Distributed rate limiting with Redis.",
            why: "Rate limiting protects APIs from abuse, ensures fair usage, and prevents resource exhaustion.",
            prereqs: "Redis, REST APIs",
            difficulty: "Intermediate",
            realWorld:
              "GitHub API: 5000 req/hr for authenticated users. Stripe: 100 req/sec per account.",
            mistakes:
              "Fixed window rate limiting (burst at window boundaries). Not returning Retry-After headers.",
            resources: [
              "Redis rate limiting patterns",
              "Rate Limiting Algorithms Explained",
            ],
            practice: [
              "Implement sliding window rate limiting with Redis. Test burst behavior with load testing.",
            ],
          },
          {
            name: "API Versioning & Evolution",
            what: "URL versioning (/v1/, /v2/), header versioning (API-Version: 2024-01), sunset dates, backward compatibility, API changelogs.",
            why: "APIs evolve. Versioning prevents breaking changes for existing consumers.",
            prereqs: "REST APIs",
            difficulty: "Intermediate",
            realWorld:
              "Stripe uses date-based versioning. Twilio uses URL versioning. GitHub uses Accept header versioning.",
            mistakes:
              "Breaking backward compatibility without versioning. Not communicating deprecations.",
            resources: [
              "Stripe API versioning blog",
              "API Versioning Strategies",
            ],
            practice: [
              "Design a versioning strategy for an API. Implement v1 → v2 migration with backward compatibility.",
            ],
          },
          {
            name: "API Security",
            what: "Authentication (API keys, OAuth 2.0), authorization (scopes, RBAC), input validation, HTTPS enforcement, CORS configuration, request signing (HMAC).",
            why: "APIs are the most targeted attack surface. Security must be built in from the start.",
            prereqs: "Security Engineering basics",
            difficulty: "Intermediate",
            realWorld:
              "AWS request signing (SigV4). Stripe webhook signature verification. OAuth 2.0 PKCE for public clients.",
            mistakes:
              "API keys in query parameters (logged in server logs). No CORS restrictions. Missing input validation.",
            resources: [
              "OWASP API Security Top 10",
              "API Security in Action (Madden)",
            ],
            practice: [
              "Implement API key management with rotation. Add HMAC webhook signature verification.",
            ],
          },
          {
            name: "gRPC & Protocol Buffers",
            what: "Protocol Buffers: language-neutral schema with binary encoding. gRPC: four service types (unary, server-streaming, client-streaming, bidirectional). gRPC-Web for browsers.",
            why: "gRPC is ~7x more efficient than JSON REST for internal services. Strongly typed contracts prevent integration bugs.",
            prereqs: "HTTP/2, APIs",
            difficulty: "Intermediate",
            realWorld:
              "Kubernetes uses gRPC internally. Service meshes (Istio) use gRPC for control plane.",
            mistakes:
              "Using gRPC for browser-facing APIs without gRPC-Web. Not versioning proto files.",
            resources: [
              "gRPC documentation",
              "Protocol Buffers documentation",
              "Practical gRPC (Ravindranath)",
            ],
            practice: [
              "Build a gRPC microservice with all 4 streaming modes. Generate clients for Node.js and Python.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 15 — DATABASE ENGINEERING
  // ============================================================
  {
    id: 15,
    emoji: "🗄️",
    title: "Database Engineering",
    color: "#f6ad55",
    darkColor: "#c05000",
    sections: [
      {
        title: "Relational Databases",
        topics: [
          {
            name: "SQL Mastery",
            what: "SELECT, JOINs (INNER/LEFT/RIGHT/FULL OUTER/CROSS), subqueries, CTEs, window functions (ROW_NUMBER, RANK, LAG, LEAD, PARTITION BY), GROUPING SETS, ROLLUP.",
            why: "SQL is the most important language for backend developers. Window functions unlock powerful analytics without application-side processing.",
            prereqs: "None",
            difficulty: "Beginner",
            realWorld:
              "User retention analysis, cohort reports, inventory management, hierarchical queries with recursive CTEs.",
            mistakes:
              "N+1 queries. Not using CTEs for readability. Forgetting NULL propagation rules.",
            resources: [
              "Mode Analytics SQL Tutorial",
              "PostgreSQL documentation",
              "SQL Zoo",
              "Use The Index, Luke",
            ],
            practice: [
              "Solve 50 LeetCode SQL problems. Write window function queries for retention, cohorts, running totals.",
            ],
          },
          {
            name: "PostgreSQL Internals",
            what: "MVCC (Multi-Version Concurrency Control), WAL (Write-Ahead Logging), VACUUM, autovacuum, table bloat, TOAST, partitioning, logical replication.",
            why: "Understanding PostgreSQL internals enables writing correct, performant queries and tuning configuration.",
            prereqs: "SQL Mastery",
            difficulty: "Advanced",
            realWorld:
              "Diagnosing table bloat from UPDATE-heavy workloads. WAL configuration for streaming replication.",
            mistakes:
              "Not understanding MVCC — every UPDATE creates a new row version. Not running VACUUM regularly.",
            resources: [
              "The Internals of PostgreSQL (Ishikawa)",
              "PostgreSQL documentation",
              "pganalyze",
            ],
            practice: [
              "Analyze table bloat with pg_stat_user_tables. Configure autovacuum for a write-heavy table.",
            ],
          },
          {
            name: "Indexing & Query Optimization",
            what: "Index types: B-tree, Hash, GIN (full-text, JSONB), GiST, BRIN, partial indexes, covering indexes (INCLUDE). EXPLAIN ANALYZE, pg_stat_statements.",
            why: "A missing index is the most common database performance problem. EXPLAIN reveals how the planner executes queries.",
            prereqs: "SQL, B-trees",
            difficulty: "Intermediate",
            realWorld:
              "Adding a GIN index on JSONB columns. Partial index on active users only. Covering index to avoid heap fetches.",
            mistakes:
              "Over-indexing (slows writes). Indexing low-cardinality columns. Not using partial indexes.",
            resources: [
              "Use The Index, Luke! (use-the-index-luke.com)",
              "EXPLAIN ANALYZE documentation",
            ],
            practice: [
              "Take 5 slow queries, analyze execution plans, add appropriate indexes, measure improvement.",
            ],
          },
          {
            name: "Transactions & ACID",
            what: "Atomicity (all or nothing), Consistency (constraints maintained), Isolation (concurrent transactions appear serial), Durability (committed data survives crashes).",
            why: "ACID guarantees correctness in financial systems, inventory management, and any multi-step operations.",
            prereqs: "SQL",
            difficulty: "Intermediate",
            realWorld:
              "Bank transfer: debit + credit must be atomic. Order placement: reserve inventory + create order.",
            mistakes:
              "Transactions too broad (lock contention). Too narrow (partial failure leaves inconsistent state).",
            resources: [
              "DDIA Chapter 7",
              "PostgreSQL Transaction documentation",
            ],
            practice: [
              "Implement a bank transfer with concurrent transaction testing. Demonstrate atomicity on failure.",
            ],
          },
          {
            name: "Isolation Levels & Concurrency",
            what: "Read Uncommitted, Read Committed, Repeatable Read, Serializable. Phenomena: dirty reads, non-repeatable reads, phantom reads, serialization anomalies.",
            why: "Wrong isolation level causes subtle, hard-to-reproduce data corruption bugs in concurrent systems.",
            prereqs: "Transactions",
            difficulty: "Advanced",
            realWorld:
              "PostgreSQL defaults to Read Committed. Serializable Snapshot Isolation (SSI) in PostgreSQL.",
            mistakes:
              "Using Serializable everywhere (performance cost). Not understanding what each level prevents.",
            resources: [
              "DDIA Chapter 7",
              "PostgreSQL Transaction Isolation documentation",
              "Jepsen tests",
            ],
            practice: [
              "Demonstrate dirty read, phantom read, and lost update with actual SQL queries and concurrent sessions.",
            ],
          },
          {
            name: "Sharding & Partitioning",
            what: "Table partitioning (range, list, hash). Horizontal sharding by shard key. Consistent hashing. Cross-shard queries. Tools: Citus, Vitess, PlanetScale.",
            why: "Required for databases that exceed single-server capacity. Foundation of web-scale systems.",
            prereqs: "PostgreSQL, Indexing",
            difficulty: "Advanced",
            realWorld:
              "Instagram shards by user_id. Citus distributes PostgreSQL. Vitess shards MySQL for YouTube.",
            mistakes:
              "Sharding prematurely. Most apps never need it. Start with read replicas and partitioning first.",
            resources: [
              "DDIA Chapter 6",
              "Citus documentation",
              "Vitess documentation",
            ],
            practice: [
              "Set up PostgreSQL table partitioning by date range. Configure primary with read replica.",
            ],
          },
          {
            name: "Replication & High Availability",
            what: "Streaming replication (primary + standbys), logical replication, synchronous vs asynchronous replication, failover (Patroni, pg_auto_failover), connection pooling (PgBouncer).",
            why: "Single-server databases are single points of failure. Replication provides HA and read scaling.",
            prereqs: "PostgreSQL, Networking",
            difficulty: "Advanced",
            realWorld:
              "Patroni manages PostgreSQL HA at Zalando scale. PgBouncer reduces connection overhead.",
            mistakes:
              "Asynchronous replication with potential data loss on failover for financial data.",
            resources: [
              "Patroni documentation",
              "PgBouncer documentation",
              "PostgreSQL Streaming Replication",
            ],
            practice: [
              "Set up PostgreSQL streaming replication with Patroni for automatic failover. Test failover scenario.",
            ],
          },
        ],
      },
      {
        title: "NoSQL & Caching",
        topics: [
          {
            name: "MongoDB",
            what: "Document database: BSON documents, flexible schema, aggregation pipeline, Atlas Search, change streams, transactions, Atlas Vector Search.",
            why: "Excellent for hierarchical, variable-structure data. Rapid prototyping when schema evolves frequently.",
            prereqs: "JavaScript, JSON",
            difficulty: "Beginner",
            realWorld:
              "Content management, user profiles, product catalogs, event logging, geospatial queries.",
            mistakes:
              "Using MongoDB for relational data to avoid SQL. Embedding documents without considering document size limits.",
            resources: [
              "MongoDB University (free)",
              "Mongoose documentation",
              "MongoDB: The Definitive Guide",
            ],
            practice: [
              "Build a blog with MongoDB. Optimize with aggregation pipeline. Add Atlas Search for full-text search.",
            ],
          },
          {
            name: "Redis",
            what: "In-memory data structure store: strings, hashes, lists, sets, sorted sets, HyperLogLog, streams, pub/sub. Persistence: RDB snapshots + AOF logging.",
            why: "The Swiss Army knife of backend infrastructure. Caching, sessions, queues, leaderboards, pub/sub, and distributed locks.",
            prereqs: "Networking basics",
            difficulty: "Intermediate",
            realWorld:
              "Session storage, rate limiting, job queues (BullMQ), real-time leaderboards, distributed locks.",
            mistakes:
              "No eviction policy. No TTLs. Treating Redis as primary database (it's a cache with optional persistence).",
            resources: [
              "Redis University (free)",
              "Redis documentation",
              "DDIA",
            ],
            practice: [
              "Implement rate limiter, distributed lock (Redlock), LFU cache, and job queue with BullMQ.",
            ],
          },
          {
            name: "Database Internals",
            what: "Storage engines: B-trees (InnoDB) vs LSM trees (RocksDB, Cassandra). WAL, SSTable, compaction, bloom filters, write amplification.",
            why: "Understanding internals guides database selection and configuration for specific workload patterns.",
            prereqs: "Data Structures",
            difficulty: "Advanced",
            realWorld:
              "LSM trees are write-optimized (Cassandra for time-series). B-trees are read-optimized (PostgreSQL for OLTP).",
            mistakes:
              "Not considering write vs read amplification when choosing a storage engine.",
            resources: [
              "DDIA (entire book)",
              "Database Internals (Alex Petrov)",
              "CMU Database Systems course",
            ],
            practice: [
              "Implement a simple key-value store with a WAL. Implement an LSM tree with compaction.",
            ],
          },
          {
            name: "ORMs (Prisma, Drizzle, Sequelize)",
            what: "Object-Relational Mappers abstract SQL. Prisma: type-safe, schema-first. Drizzle: SQL-like, schema-as-code. Sequelize: classic, model-based.",
            why: "ORMs reduce boilerplate and provide type-safe database access. Migrations enable version-controlled schema changes.",
            prereqs: "SQL, TypeScript",
            difficulty: "Intermediate",
            realWorld:
              "Prisma auto-generates TypeScript types from schema. Drizzle provides maximum SQL control with TypeScript.",
            mistakes:
              "Overusing ORM for complex queries (use raw SQL). Skipping migrations (manual changes cause drift).",
            resources: [
              "Prisma documentation",
              "Drizzle ORM documentation",
              "Prisma vs Drizzle comparison",
            ],
            practice: [
              "Set up Prisma project, implement 5 migrations, write complex queries, use raw SQL for analytics.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 16 — SECURITY ENGINEERING
  // ============================================================
  {
    id: 16,
    emoji: "🔐",
    title: "Security Engineering",
    color: "#fc8181",
    darkColor: "#c00000",
    sections: [
      {
        title: "OWASP Top 10 & Attack Patterns",
        topics: [
          {
            name: "SQL Injection",
            what: "Attacker injects SQL via user input to manipulate queries. Boolean-based, time-based, union-based, and error-based blind injection.",
            why: "Still the #1 vulnerability. Can expose, modify, or destroy entire databases.",
            prereqs: "SQL, Backend basics",
            difficulty: "Intermediate",
            realWorld:
              "Defense: parameterized queries, ORMs, least-privilege database users, WAF rules.",
            mistakes:
              "Sanitization only (not parameterization). Showing raw SQL errors. Trusting ORM with complex queries.",
            resources: [
              "OWASP SQL Injection",
              "PortSwigger SQL Injection labs",
            ],
            practice: [
              "Set up DVWA. Exploit union-based SQLi. Fix with parameterized queries. Add WAF rules.",
            ],
          },
          {
            name: "XSS (Cross-Site Scripting)",
            what: "Injecting malicious scripts into pages viewed by other users. Stored (persistent), Reflected, and DOM-based XSS.",
            why: "XSS can steal session cookies, perform CSRF attacks, redirect users, and compromise accounts.",
            prereqs: "HTML, JavaScript, HTTP",
            difficulty: "Intermediate",
            realWorld:
              "Defense: CSP headers, HTML output encoding, React JSX auto-escaping, avoiding dangerouslySetInnerHTML.",
            mistakes:
              "Trusting innerHTML. Using React's dangerouslySetInnerHTML with user content. Missing CSP.",
            resources: [
              "PortSwigger XSS labs",
              "OWASP XSS Prevention Cheat Sheet",
            ],
            practice: [
              "Demonstrate stored, reflected, and DOM XSS. Implement and test a strict CSP.",
            ],
          },
          {
            name: "CSRF & SSRF",
            what: "CSRF: victim's browser executes unwanted actions. Defense: CSRF tokens, SameSite cookies. SSRF: server makes requests to internal resources. Defense: allowlist, metadata endpoint blocking.",
            why: "CSRF compromises authenticated actions. SSRF can expose cloud metadata credentials (AWS IMDS).",
            prereqs: "HTTP, Authentication",
            difficulty: "Intermediate",
            realWorld:
              "SSRF attack against AWS EC2 metadata service to steal IAM credentials. Capital One breach (2019).",
            mistakes:
              "Not validating URLs in server-side fetch calls. Missing SameSite=Strict on session cookies.",
            resources: [
              "PortSwigger CSRF/SSRF labs",
              "OWASP SSRF Prevention Cheat Sheet",
            ],
            practice: [
              "Build a CSRF attack demonstration. Implement SSRF protection with URL validation and DNS rebinding protection.",
            ],
          },
          {
            name: "Authentication Attacks",
            what: "Credential stuffing, brute force, JWT vulnerabilities (none algorithm, weak secret, algorithm confusion), insecure password reset, session fixation.",
            why: "Authentication bypass = complete account takeover.",
            prereqs: "Authentication basics",
            difficulty: "Intermediate",
            realWorld:
              "JWT 'alg:none' attack. Account takeover via insecure password reset. Credential stuffing from breached lists.",
            mistakes:
              "JWT as session replacement without understanding lack of revocation. Weak JWT secrets.",
            resources: [
              "PortSwigger Authentication labs",
              "JWT Security Best Practices (OWASP)",
            ],
            practice: [
              "Exploit JWT none algorithm vulnerability. Implement secure password reset with time-limited signed tokens.",
            ],
          },
          {
            name: "Encryption & Hashing",
            what: "Symmetric encryption (AES-256-GCM), asymmetric (RSA, ECC), hashing (bcrypt, Argon2, SHA-256), salting, key derivation (PBKDF2, scrypt).",
            why: "Passwords must be hashed (not encrypted). Data at rest and in transit must be encrypted.",
            prereqs: "Basic cryptography concepts",
            difficulty: "Intermediate",
            realWorld:
              "bcrypt for passwords. AES-256-GCM for database fields. AWS KMS for key management.",
            mistakes:
              "MD5/SHA-1 for passwords (cryptographically broken). Storing passwords encrypted (reversible).",
            resources: [
              "Cryptography I (Coursera, Dan Boneh)",
              "OWASP Password Storage Cheat Sheet",
            ],
            practice: [
              "Implement bcrypt password storage. Implement AES-GCM field encryption. Set up key rotation.",
            ],
          },
          {
            name: "Secrets Management",
            what: "HashiCorp Vault (dynamic secrets, secret rotation, audit logs), AWS Secrets Manager, SOPS, detect-secrets for pre-commit scanning.",
            why: "Hardcoded secrets in code are the most common source of credential leaks.",
            prereqs: "DevOps basics",
            difficulty: "Intermediate",
            realWorld:
              "Dynamic database credentials with Vault. Automated secret rotation. Trufflehog scanning in CI.",
            mistakes:
              "Committing .env files to Git. Same credentials in dev/staging/production.",
            resources: [
              "HashiCorp Vault documentation",
              "SOPS documentation",
              "Trufflehog documentation",
            ],
            practice: [
              "Set up Vault locally. Issue dynamic database credentials. Implement automatic rotation.",
            ],
          },
          {
            name: "Threat Modeling",
            what: "STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, DoS, Elevation of Privilege). DREAD. PASTA. Attack trees. Data flow diagrams.",
            why: "Proactively identifying threats is more effective and cheaper than reacting to breaches.",
            prereqs: "Security fundamentals",
            difficulty: "Advanced",
            realWorld:
              "Microsoft STRIDE methodology. MITRE ATT&CK framework for attacker behavior patterns.",
            mistakes:
              "Skipping threat modeling for 'simple' applications. Every app has a threat model.",
            resources: [
              "Threat Modeling (Shostack)",
              "OWASP Threat Modeling Cheat Sheet",
              "MITRE ATT&CK",
            ],
            practice: [
              "Threat model a web application using STRIDE. Create an attack tree. Prioritize mitigations.",
            ],
          },
          {
            name: "Supply Chain Security",
            what: "npm audit, Snyk, SBOM (Software Bill of Materials), dependency pinning, lockfiles, Sigstore for artifact signing, SLSA supply chain levels.",
            why: "Software supply chain attacks are increasing rapidly. SolarWinds, Log4Shell, left-pad all originated from dependencies.",
            prereqs: "npm basics, CI/CD",
            difficulty: "Intermediate",
            realWorld:
              "Log4Shell (2021) affected millions of applications via a transitive Java dependency.",
            mistakes:
              "Not pinning dependencies. Not auditing transitive dependencies. No SBOM for compliance.",
            resources: [
              "Snyk documentation",
              "SLSA framework",
              "OpenSSF Scorecard",
            ],
            practice: [
              "Run Snyk on a project. Generate an SBOM. Set up automated vulnerability scanning in CI.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 17 — TESTING ENGINEERING
  // ============================================================
  {
    id: 17,
    emoji: "🧪",
    title: "Testing Engineering",
    color: "#a78bfa",
    darkColor: "#5b21b6",
    sections: [
      {
        title: "Testing Pyramid",
        topics: [
          {
            name: "Unit Testing (Jest / Vitest)",
            what: "Testing individual functions/modules in isolation with mocks, stubs, and spies. AAA pattern (Arrange, Act, Assert). Code coverage.",
            why: "Fastest feedback loop. Catches regressions, enables confident refactoring, documents behavior.",
            prereqs: "JavaScript",
            difficulty: "Beginner",
            realWorld:
              "Testing utility functions, business logic, React component rendering.",
            mistakes:
              "Testing implementation details. Over-mocking (testing the mock, not the code).",
            resources: [
              "Jest documentation",
              "Vitest documentation",
              "Testing JavaScript (Kent C. Dodds)",
            ],
            practice: [
              "Write tests for a currency converter. 100% branch coverage on a utility library.",
            ],
          },
          {
            name: "Integration Testing",
            what: "Testing multiple units together including real databases, file systems, or HTTP connections. Test containers for ephemeral databases.",
            why: "Catches issues unit tests miss: database queries, API contracts, middleware chains.",
            prereqs: "Unit Testing",
            difficulty: "Intermediate",
            realWorld:
              "Testing Express routes with supertest against a real test database. Testing Next.js API routes.",
            mistakes:
              "Integration tests too broad (slow and brittle). Not cleaning up between tests.",
            resources: [
              "Supertest documentation",
              "Testcontainers documentation",
            ],
            practice: [
              "Write integration tests for REST API with real database. Use transactions to rollback after each test.",
            ],
          },
          {
            name: "E2E Testing (Playwright)",
            what: "Browser automation testing complete user journeys. Page Object Model pattern, network interception, visual regression, accessibility testing.",
            why: "Highest confidence tests. Catches what unit tests can't: network timing, CSS rendering, browser quirks.",
            prereqs: "Integration Testing",
            difficulty: "Intermediate",
            realWorld:
              "Testing checkout flow, authentication, file uploads across Chrome, Firefox, Safari, and mobile.",
            mistakes:
              "Too many E2E tests (slow CI). Use sparingly for critical paths. Don't replace unit tests with E2E.",
            resources: [
              "Playwright documentation",
              "Playwright Best Practices",
            ],
            practice: [
              "Write E2E tests for: registration → login → profile update → delete account flow.",
            ],
          },
          {
            name: "Contract Testing (Pact)",
            what: "Consumer-driven contract testing. Consumer defines expected API behavior. Provider verifies it can fulfill contracts. Pact Broker for sharing contracts.",
            why: "In microservices, prevents breaking API changes from being discovered in production.",
            prereqs: "Integration Testing, REST APIs",
            difficulty: "Advanced",
            realWorld:
              "Frontend team defines expected API response shapes. Backend team runs provider verification in CI.",
            mistakes:
              "Skipping contract testing and discovering breaking API changes in production.",
            resources: [
              "Pact documentation",
              "Martin Fowler: Consumer-Driven Contract Testing",
            ],
            practice: [
              "Implement consumer-driven contract tests between a React app and Node.js API using Pact.",
            ],
          },
          {
            name: "Load Testing (k6, Artillery)",
            what: "Simulating concurrent users to test performance under load. Identifying breaking points, bottlenecks, and resource limits. Soak testing for memory leaks.",
            why: "Apps that work for 10 users may fail for 10,000. Load testing reveals scalability issues before production.",
            prereqs: "Backend basics",
            difficulty: "Intermediate",
            realWorld:
              "k6 for scripted load tests. Artillery for scenario-based load tests. AWS Load Testing.",
            mistakes:
              "Running load tests against production without throttling. Not testing realistic user scenarios.",
            resources: [
              "k6 documentation",
              "Artillery documentation",
              "Gatling documentation",
            ],
            practice: [
              "Load test a REST API with k6. Find the breaking point. Identify and fix the bottleneck.",
            ],
          },
          {
            name: "Security Testing (SAST/DAST)",
            what: "SAST: static analysis of source code (Semgrep, SonarQube). DAST: dynamic testing of running app (OWASP ZAP, Burp Suite). Penetration testing.",
            why: "Security testing finds vulnerabilities before attackers do.",
            prereqs: "Security Engineering basics",
            difficulty: "Advanced",
            realWorld:
              "Semgrep in CI for code scanning. ZAP in DAST pipeline. Annual penetration tests.",
            mistakes:
              "Only running SAST (misses runtime vulnerabilities). Not fixing security findings.",
            resources: [
              "OWASP ZAP documentation",
              "Semgrep rules",
              "PortSwigger Web Security Academy",
            ],
            practice: [
              "Run OWASP ZAP against a test app. Set up Semgrep in CI with a custom security ruleset.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 18 — DEVOPS ENGINEERING
  // ============================================================
  {
    id: 18,
    emoji: "🚀",
    title: "DevOps Engineering",
    color: "#48bb78",
    darkColor: "#1a6b3c",
    sections: [
      {
        title: "Containers & Orchestration",
        topics: [
          {
            name: "Docker",
            what: "Containerization: Dockerfile (multi-stage builds), image layers, .dockerignore, Docker Compose for local dev, image scanning, non-root users.",
            why: "'Works on my machine' problem solved. Reproducible builds and environments.",
            prereqs: "Linux basics, Networking",
            difficulty: "Intermediate",
            realWorld:
              "Every production deployment. Multi-stage builds for minimal production images.",
            mistakes:
              "Running as root. Huge images. Not using .dockerignore. Storing secrets in Dockerfile.",
            resources: [
              "Docker documentation",
              "Docker Deep Dive (Nigel Poulton)",
              "dive (image analysis tool)",
            ],
            practice: [
              "Write a production Dockerfile for Node.js app. Multi-stage build. < 100MB final image.",
            ],
          },
          {
            name: "Kubernetes",
            what: "Container orchestration: Pods, Deployments, Services, Ingress, ConfigMaps, Secrets, PVCs, StatefulSets, HPA, VPA, RBAC, NetworkPolicy.",
            why: "The standard for running containers at scale. Self-healing, load balancing, rolling deployments.",
            prereqs: "Docker, Networking, YAML",
            difficulty: "Advanced",
            realWorld:
              "Production deployments at any company using containers at scale. EKS, GKE, AKS managed services.",
            mistakes:
              "Running databases without StatefulSets. No resource limits (noisy neighbor). Missing liveness/readiness probes.",
            resources: [
              "Kubernetes in Action (Marko Luksa)",
              "CKAD exam preparation",
              "k3s for local dev",
            ],
            practice: [
              "Deploy Node.js app to k8s: HPA, health probes, rolling deployments, secrets, NetworkPolicy.",
            ],
          },
          {
            name: "Helm",
            what: "Kubernetes package manager. Charts (templates + values), chart repositories, hooks, tests, library charts.",
            why: "Helm standardizes Kubernetes application packaging and deployment. Charts are the de facto deployment format.",
            prereqs: "Kubernetes",
            difficulty: "Intermediate",
            realWorld:
              "Deploying third-party software (nginx-ingress, cert-manager, prometheus) with Helm charts.",
            mistakes:
              "Putting secrets in values.yaml. Helm chart too complex — use Kustomize for overlays instead.",
            resources: [
              "Helm documentation",
              "Artifact Hub (chart repository)",
            ],
            practice: [
              "Create a Helm chart for your application. Use chart dependencies. Implement chart tests.",
            ],
          },
          {
            name: "CI/CD Pipelines",
            what: "GitHub Actions, GitLab CI, Jenkins. Pipeline stages: lint → test → build → scan → push → deploy → smoke test. Environments, approvals, rollbacks.",
            why: "Automated pipelines prevent human error, enforce quality gates, and enable frequent, reliable releases.",
            prereqs: "Git, Docker",
            difficulty: "Intermediate",
            realWorld:
              "Full pipeline: PR → test → staging deploy → manual approval → production deploy with smoke tests.",
            mistakes:
              "Secrets in workflow files. No dependency caching (slow builds). No rollback strategy.",
            resources: [
              "GitHub Actions documentation",
              "GitLab CI documentation",
            ],
            practice: [
              "Build pipeline: lint → test → Docker build → push to registry → deploy to k8s with ArgoCD.",
            ],
          },
          {
            name: "Infrastructure as Code (Terraform)",
            what: "HCL configuration, providers, resources, data sources, modules, state management (remote state, state locking), workspaces, Terragrunt for DRY.",
            why: "Infrastructure in code = version controlled, reproducible, reviewable, and automatable.",
            prereqs: "Cloud basics, Networking",
            difficulty: "Advanced",
            realWorld:
              "Provisioning entire AWS environments: VPC, RDS, ECS, CloudFront — all in version control.",
            mistakes:
              "Manual changes to Terraform-managed resources (state drift). Not using remote state with locking.",
            resources: [
              "Terraform: Up & Running (Brikman)",
              "Terraform documentation",
              "Terragrunt documentation",
            ],
            practice: [
              "Provision: VPC with public/private subnets, RDS, ECS cluster with Terraform. Use modules.",
            ],
          },
          {
            name: "GitOps & ArgoCD",
            what: "GitOps: Git as single source of truth for infrastructure. ArgoCD syncs Kubernetes cluster state with Git. Flux as alternative. App of Apps pattern.",
            why: "GitOps provides audit trail, easy rollback, and self-healing infrastructure.",
            prereqs: "Kubernetes, Git",
            difficulty: "Advanced",
            realWorld:
              "Production clusters managed entirely by ArgoCD. Pull requests trigger deployments. Automatic drift detection.",
            mistakes:
              "Not using sync waves for dependent resources. Missing health checks for ArgoCD to detect failures.",
            resources: [
              "ArgoCD documentation",
              "Flux documentation",
              "GitOps with Kubernetes (Sinnott-Armstrong)",
            ],
            practice: [
              "Set up ArgoCD to deploy an application via GitOps. Implement progressive delivery with Argo Rollouts.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 19 — CLOUD ENGINEERING
  // ============================================================
  {
    id: 19,
    emoji: "☁️",
    title: "Cloud Engineering",
    color: "#f6ad55",
    darkColor: "#b45309",
    sections: [
      {
        title: "AWS Core Services",
        topics: [
          {
            name: "EC2 & VPC",
            what: "EC2: virtual machines, instance types, Auto Scaling Groups, AMIs. VPC: subnets (public/private), route tables, Internet Gateway, NAT Gateway, security groups, NACLs.",
            why: "Foundation of AWS. VPC is the network within which all services run.",
            prereqs: "Linux, Networking",
            difficulty: "Intermediate",
            realWorld:
              "3-tier architecture: public ALB → private EC2 app servers → isolated RDS in private subnet.",
            mistakes:
              "Databases in public subnets. Overly permissive security groups. No VPC Flow Logs.",
            resources: [
              "AWS Solutions Architect Associate certification",
              "A Cloud Guru",
            ],
            practice: [
              "Design and build 3-tier VPC: public ALB, private app servers, isolated DB subnet with Terraform.",
            ],
          },
          {
            name: "S3",
            what: "Object storage with 11-nines durability. Storage classes (Standard, IA, Glacier), versioning, lifecycle policies, S3 Events, presigned URLs, S3 Select.",
            why: "Universal storage for static files, backups, data lakes, and deployment artifacts.",
            prereqs: "AWS basics",
            difficulty: "Beginner",
            realWorld:
              "Static site hosting, image storage, log archiving, Athena queries over S3 data lake.",
            mistakes:
              "Public buckets with sensitive data. No versioning. No lifecycle policies (costs balloon).",
            resources: ["AWS S3 documentation", "S3 Security Best Practices"],
            practice: [
              "Host React app on S3 + CloudFront with custom domain, HTTPS, and cache invalidation on deploy.",
            ],
          },
          {
            name: "Lambda & Serverless",
            what: "Function-as-a-Service: event-triggered execution, pay per invocation, cold starts, concurrency, Lambda layers, Lambda@Edge, ARM64 (Graviton2).",
            why: "Eliminates server management for event-driven workloads. Cost-effective for variable/infrequent traffic.",
            prereqs: "Node.js/Python, API Gateway",
            difficulty: "Intermediate",
            realWorld:
              "Image resizing on S3 upload, API endpoints, scheduled jobs, webhook handlers, edge personalization.",
            mistakes:
              "Cold start latency for latency-sensitive workloads. Using Lambda for long-running tasks (15min limit).",
            resources: [
              "AWS Lambda documentation",
              "Production Ready Serverless (Yan Cui)",
            ],
            practice: [
              "Build serverless pipeline: S3 upload → Lambda resize → store + notify via SNS.",
            ],
          },
          {
            name: "RDS & Aurora",
            what: "Managed PostgreSQL/MySQL: automated backups, Multi-AZ failover, read replicas, parameter groups. Aurora: distributed storage, Aurora Serverless v2.",
            why: "Managed databases eliminate DBA overhead for patching, backups, and failover.",
            prereqs: "SQL, Networking",
            difficulty: "Intermediate",
            realWorld:
              "Aurora for global applications with multi-region. RDS for standard OLTP workloads.",
            mistakes:
              "RDS in public subnets. No automated backups. Not using IAM authentication.",
            resources: ["AWS RDS documentation", "Aurora documentation"],
            practice: [
              "Set up RDS with Multi-AZ, create read replica, enable Performance Insights, test failover.",
            ],
          },
          {
            name: "IAM",
            what: "Users, groups, roles, policies (identity-based, resource-based), permission boundaries, service control policies (SCPs), IAM Access Analyzer, OIDC federation.",
            why: "The most critical AWS security service. Misconfigured IAM = compromised cloud account.",
            prereqs: "Security fundamentals",
            difficulty: "Intermediate",
            realWorld:
              "EC2 instance roles for S3 access. Lambda execution roles. Cross-account roles for CI/CD.",
            mistakes:
              "Root account credentials in use. Admin policies on everything. Not using roles for services.",
            resources: [
              "AWS IAM documentation",
              "IAM Policy Simulator",
              "AWS Security Reference Architecture",
            ],
            practice: [
              "Create least-privilege IAM role for Lambda: read from one S3 bucket, write to one DynamoDB table.",
            ],
          },
          {
            name: "ECS, EKS & Fargate",
            what: "ECS: AWS native container orchestration (EC2 launch type or Fargate serverless). EKS: managed Kubernetes. Fargate: serverless containers.",
            why: "The primary ways to run containers in AWS production environments.",
            prereqs: "Docker, Kubernetes basics",
            difficulty: "Advanced",
            realWorld:
              "Fargate for variable workloads (no server management). EKS for complex Kubernetes workloads.",
            mistakes:
              "ECS with EC2 launch type without understanding capacity provider strategy.",
            resources: [
              "AWS ECS documentation",
              "AWS EKS documentation",
              "AWS Fargate documentation",
            ],
            practice: [
              "Deploy a multi-container app on ECS Fargate with ALB, service discovery, and CI/CD via GitHub Actions.",
            ],
          },
          {
            name: "Messaging (SNS, SQS, EventBridge)",
            what: "SNS: pub/sub fanout. SQS: queue (standard and FIFO). EventBridge: event bus with rules, targets, schema registry, cross-account events.",
            why: "Decoupled messaging enables scalable, fault-tolerant event-driven architectures in AWS.",
            prereqs: "AWS basics, Event-Driven Architecture",
            difficulty: "Intermediate",
            realWorld:
              "SNS fanout → multiple SQS queues for different consumers. EventBridge for cross-service events.",
            mistakes:
              "SQS without DLQ. Not setting visibility timeout correctly. SNS without message filtering.",
            resources: [
              "AWS SNS documentation",
              "AWS SQS documentation",
              "AWS EventBridge documentation",
            ],
            practice: [
              "Build event-driven order processing with EventBridge rules, SQS queues, Lambda consumers, and DLQ.",
            ],
          },
          {
            name: "CloudWatch & Observability",
            what: "CloudWatch Logs, Metrics, Alarms, Dashboards, Log Insights (query language), Container Insights, Lambda Insights, X-Ray distributed tracing.",
            why: "AWS-native observability. CloudWatch is the default monitoring solution for all AWS services.",
            prereqs: "AWS basics",
            difficulty: "Intermediate",
            realWorld:
              "Alarm on Lambda error rate. Log Insights for query analysis. X-Ray traces for Lambda → DynamoDB.",
            mistakes:
              "Not setting log retention policies (unlimited retention costs money). Missing composite alarms.",
            resources: [
              "AWS CloudWatch documentation",
              "AWS X-Ray documentation",
            ],
            practice: [
              "Set up CloudWatch dashboard for a serverless app. Create composite alarms. Analyze logs with Insights.",
            ],
          },
          {
            name: "GCP Core Services",
            what: "GKE (managed Kubernetes), Cloud Run (serverless containers), BigQuery (data warehouse), Cloud Storage, Pub/Sub, Cloud SQL, Artifact Registry, Cloud Build.",
            why: "GCP is the leading cloud for data engineering and ML workloads. GKE originated Kubernetes.",
            prereqs: "Cloud basics",
            difficulty: "Intermediate",
            realWorld:
              "BigQuery for petabyte-scale analytics. Cloud Run for scalable HTTP services without managing servers.",
            mistakes:
              "Not using Workload Identity for pod-to-service authentication (avoid service account key files).",
            resources: [
              "Google Cloud documentation",
              "Google Cloud Professional Cloud Architect certification",
            ],
            practice: [
              "Deploy a containerized app on Cloud Run. Analyze data with BigQuery. Set up Cloud Build CI.",
            ],
          },
          {
            name: "Azure Core Services",
            what: "Azure App Service, AKS (managed Kubernetes), Azure Functions, Azure Storage, Azure SQL, Cosmos DB, Azure AD, Azure DevOps, Azure Monitor.",
            why: "Azure dominates enterprise and Microsoft-centric environments. Essential for many large organizations.",
            prereqs: "Cloud basics",
            difficulty: "Intermediate",
            realWorld:
              "Azure AD for enterprise SSO. Cosmos DB for globally distributed, multi-model database.",
            mistakes:
              "Not understanding Azure's resource group model. Missing RBAC on resource groups.",
            resources: [
              "Microsoft Azure documentation",
              "AZ-900 Azure Fundamentals certification",
            ],
            practice: [
              "Deploy a full-stack app on Azure: App Service, Azure SQL, Azure Blob Storage, Azure AD authentication.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 20 — OBSERVABILITY & MONITORING
  // ============================================================
  {
    id: 20,
    emoji: "📡",
    title: "Observability & Monitoring",
    color: "#34d399",
    darkColor: "#065f46",
    sections: [
      {
        title: "The Three Pillars",
        topics: [
          {
            name: "Structured Logging (Pino/Winston)",
            what: "Structured JSON logs with levels (error/warn/info/debug), correlation IDs, request context, log sampling for high-volume services.",
            why: "Structured logs are queryable. Correlation IDs enable request tracing across microservices.",
            prereqs: "Node.js basics",
            difficulty: "Beginner",
            realWorld:
              "ELK/Loki for log aggregation. Correlation IDs trace requests across services. Log levels reduce noise.",
            mistakes:
              "Logging sensitive data (PII, secrets). console.log in production. Unstructured text logs.",
            resources: [
              "Pino documentation",
              "Winston documentation",
              "Logging Best Practices (12-Factor)",
            ],
            practice: [
              "Set up Pino with correlation IDs. Ship logs to Loki. Build a Grafana dashboard for log analysis.",
            ],
          },
          {
            name: "Metrics (Prometheus & Grafana)",
            what: "Counter, Gauge, Histogram, Summary metric types. PromQL for querying. Grafana dashboards. Alertmanager for routing alerts. RED and USE methods.",
            why: "Metrics reveal trends and enable alerting before users notice problems.",
            prereqs: "Basic infrastructure knowledge",
            difficulty: "Intermediate",
            realWorld:
              "Dashboard: request rate, error rate, p50/p95/p99 latency, DB connection pool, queue depth.",
            mistakes:
              "Alerting on every metric (alert fatigue). Not tracking RED metrics (Rate, Errors, Duration).",
            resources: [
              "Prometheus documentation",
              "Grafana documentation",
              "SRE Book: Monitoring Chapter",
            ],
            practice: [
              "Instrument Node.js app with prom-client. Build RED method Grafana dashboard. Set up on-call alerts.",
            ],
          },
          {
            name: "Distributed Tracing (OpenTelemetry)",
            what: "Traces (root span + child spans), trace context propagation (W3C Trace Context), sampling strategies, Jaeger/Zipkin/Tempo backends.",
            why: "In microservices, traces show exactly which service caused latency. Logs alone can't answer 'why was this request slow?'",
            prereqs: "Microservices, Logging",
            difficulty: "Advanced",
            realWorld:
              "Instrumenting Node.js, Go, and Python services with OTel SDK. Jaeger for trace visualization.",
            mistakes:
              "100% sampling rate (massive overhead). Not propagating trace context through message queues.",
            resources: [
              "OpenTelemetry documentation",
              "Distributed Systems Observability (O'Reilly)",
            ],
            practice: [
              "Instrument a 3-service system with OTel. Trace a request end-to-end. Identify the bottleneck.",
            ],
          },
          {
            name: "Error Tracking (Sentry)",
            what: "Error capture, grouping, alerting. Stack traces with source maps, user context, breadcrumbs, release tracking, performance monitoring.",
            why: "Errors happen in production. Sentry provides immediate notification with full context to fix them.",
            prereqs: "Logging basics",
            difficulty: "Beginner",
            realWorld:
              "Sentry in every production frontend and backend. Release tracking shows which deploy caused regressions.",
            mistakes:
              "Missing error boundaries in React. No user context. Ignoring error budgets.",
            resources: [
              "Sentry documentation",
              "Error Monitoring Best Practices",
            ],
            practice: [
              "Integrate Sentry into React + Node app. Configure alerts, source maps, user context, performance.",
            ],
          },
          {
            name: "Alerting & SLOs",
            what: "SLIs (Service Level Indicators), SLOs (Service Level Objectives), SLAs (Agreements), error budgets, alerting on SLO burn rate (multi-window multi-burn-rate).",
            why: "Alerting on symptoms (user impact), not causes, reduces alert fatigue and focuses on what matters.",
            prereqs: "Metrics, Prometheus",
            difficulty: "Advanced",
            realWorld:
              "99.9% availability SLO with 43.2 minutes error budget per month. Alert when budget burns too fast.",
            mistakes:
              "Alerting on every metric spike. Not using error budgets to guide reliability investment.",
            resources: [
              "Google SRE Book: Chapter 6",
              "SLO Bible (slodlc.com)",
              "Sloth SLO generator",
            ],
            practice: [
              "Define SLOs for an API. Implement multi-window burn rate alerts in Prometheus/Grafana.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 21 — PERFORMANCE ENGINEERING
  // ============================================================
  {
    id: 21,
    emoji: "⚡",
    title: "Performance Engineering",
    color: "#fbd38d",
    darkColor: "#92400e",
    sections: [
      {
        title: "Frontend Performance",
        topics: [
          {
            name: "Core Web Vitals",
            what: "LCP (Largest Contentful Paint < 2.5s), CLS (Cumulative Layout Shift < 0.1), INP (Interaction to Next Paint < 200ms). Real User Monitoring vs lab data.",
            why: "CWV are a Google ranking signal. They measure real user experience, not synthetic benchmarks.",
            prereqs: "HTML, CSS, JavaScript, React basics",
            difficulty: "Intermediate",
            realWorld:
              "LCP: preload hero image. CLS: reserve space for ads/images. INP: eliminate long JavaScript tasks.",
            mistakes:
              "Optimizing DevTools scores without fixing Real User Monitoring data. Lab vs field data gaps.",
            resources: [
              "web.dev Core Web Vitals",
              "Chrome User Experience Report",
              "SpeedCurve RUM",
            ],
            practice: [
              "Achieve: Performance 90+, Accessibility 100, SEO 90+ on a real project with Lighthouse.",
            ],
          },
          {
            name: "Bundle Optimization",
            what: "Code splitting (dynamic import()), tree shaking, lazy loading, webpack-bundle-analyzer, Module Federation, differential loading (modern/legacy).",
            why: "Large JavaScript bundles are the #1 frontend performance killer. Parse time blocks the main thread.",
            prereqs: "JavaScript, webpack/Vite",
            difficulty: "Intermediate",
            realWorld:
              "Route-based splitting in React Router. Dynamic import() for heavy libraries (Chart.js, Monaco).",
            mistakes:
              "Importing entire lodash for one function. No route splitting. Not using Vite for dev speed.",
            resources: [
              "webpack-bundle-analyzer",
              "Vite documentation",
              "web.dev JavaScript performance",
            ],
            practice: [
              "Reduce a React app's initial bundle by 50% using code splitting and tree shaking.",
            ],
          },
          {
            name: "Rendering Optimization",
            what: "Critical rendering path, render-blocking resources, paint optimization, compositor layers, will-change, contain: strict, content-visibility: auto.",
            why: "Rendering performance directly impacts INP and LCP, the two most impactful Core Web Vitals.",
            prereqs: "Browser Rendering Pipeline",
            difficulty: "Advanced",
            realWorld:
              "content-visibility: auto for off-screen content reduces rendering time by 50%+ on long pages.",
            mistakes:
              "Animating layout-triggering properties (width/height). Not deferring off-screen rendering.",
            resources: [
              "Rendering Performance (web.dev)",
              "CSS Triggers (csstriggers.com)",
            ],
            practice: [
              "Use Chrome DevTools Layers panel to identify and fix jank in an animation.",
            ],
          },
        ],
      },
      {
        title: "Backend Performance",
        topics: [
          {
            name: "Profiling & Bottleneck Detection",
            what: "Node.js --prof flag, clinic.js (doctor, flame, bubbleprof), 0x for flame graphs, V8 heap snapshots, async hooks for I/O analysis.",
            why: "You cannot optimize what you cannot measure. Profiling reveals actual bottlenecks, not assumed ones.",
            prereqs: "Node.js, Linux",
            difficulty: "Advanced",
            realWorld:
              "clinic.js doctor diagnoses event loop delays, memory leaks, and I/O waits automatically.",
            mistakes:
              "Guessing at bottlenecks. Optimizing the wrong code path based on intuition.",
            resources: [
              "clinic.js documentation",
              "Node.js Profiling Guide",
              "0x flame graph tool",
            ],
            practice: [
              "Profile a slow Node.js API. Generate flame graph. Identify and fix the top bottleneck.",
            ],
          },
          {
            name: "Database Query Optimization",
            what: "EXPLAIN ANALYZE, index optimization, connection pooling (PgBouncer, pg-pool), query result caching, materialized views, DataLoader for batching.",
            why: "Database is usually the bottleneck. N+1 queries kill performance at scale.",
            prereqs: "SQL, PostgreSQL",
            difficulty: "Advanced",
            realWorld:
              "Single index reducing 10-second analytics query to 50ms. DataLoader batching 100 GraphQL queries into 1.",
            mistakes:
              "SELECT * in production. No indexes on JOIN columns. No connection pooling.",
            resources: [
              "Use The Index, Luke",
              "DataLoader documentation",
              "pgBadger log analyzer",
            ],
            practice: [
              "Find 5 slowest queries with pg_stat_statements. Optimize each. Measure improvement.",
            ],
          },
          {
            name: "Caching Architecture",
            what: "Cache-aside, write-through, write-behind, read-through patterns. Cache stampede mitigation (probabilistic early expiry, locking). CDN caching. Stale-while-revalidate.",
            why: "Caching is the highest-impact performance optimization across every layer of the stack.",
            prereqs: "Redis, HTTP",
            difficulty: "Intermediate",
            realWorld:
              "CDN for static assets, Redis for API responses, stale-while-revalidate for background refresh.",
            mistakes:
              "Cache stampede on popular expiring keys. Stale cache after writes. Over-caching (missing invalidation).",
            resources: [
              "AWS Caching Best Practices",
              "Redis caching patterns",
              "HTTP Caching (MDN)",
            ],
            practice: [
              "Implement cache-aside with Redis. Handle cache invalidation on write. Test stampede scenario.",
            ],
          },
          {
            name: "Load Testing & Capacity Planning",
            what: "k6 for HTTP load testing, Artillery for scenario-based, Locust for Python-based, chaos engineering (chaos monkey, Gremlin), capacity modeling.",
            why: "Load testing reveals breaking points before production traffic does. Capacity planning prevents surprise outages.",
            prereqs: "Backend basics, Infrastructure",
            difficulty: "Intermediate",
            realWorld:
              "Load testing before product launch. Black Friday capacity planning. SRE reliability practices.",
            mistakes:
              "Load testing in production with real users. Not testing realistic user scenarios (think times, data variability).",
            resources: [
              "k6 documentation",
              "Gremlin chaos engineering",
              "The Art of Capacity Planning",
            ],
            practice: [
              "Load test an API to find its breaking point. Implement auto-scaling. Test that it works.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 22 — SOFTWARE ARCHITECTURE
  // ============================================================
  {
    id: 22,
    emoji: "🏛️",
    title: "Software Architecture",
    color: "#b794f4",
    darkColor: "#6b21a8",
    sections: [
      {
        title: "Architectural Patterns",
        topics: [
          {
            name: "Monolith vs Microservices",
            what: "Monolith: single deployable unit. Microservices: small independent services communicating via network. Modular monolith as evolution path.",
            why: "Choosing the wrong architecture is expensive to undo. Most apps should start as well-structured monoliths.",
            prereqs: "Backend, Databases, DevOps",
            difficulty: "Advanced",
            realWorld:
              "Shopify is a Rails monolith at massive scale. Amazon started monolithic and decomposed over years.",
            mistakes:
              "Microservices from day one. Distributed monolith (tightly coupled services). Network call overhead.",
            resources: [
              "Building Microservices (Sam Newman)",
              "Majestic Monolith (DHH)",
              "Modular Monolith (Kamil Grzybek)",
            ],
            practice: [
              "Identify service boundaries in a monolith. Extract one service. Implement service discovery.",
            ],
          },
          {
            name: "Clean Architecture & Hexagonal",
            what: "Clean Architecture: business logic at center, adapters at edges. Dependency rule: inward only. Ports and Adapters (Hexagonal Architecture).",
            why: "Makes business logic testable and independent of frameworks, databases, and UI.",
            prereqs: "OOP, Design Patterns",
            difficulty: "Advanced",
            realWorld:
              "Financial and healthcare domains where business rules are complex and isolated from infrastructure.",
            mistakes:
              "Applying Clean Architecture to simple CRUD. The overhead is only worth it for complex domains.",
            resources: [
              "Clean Architecture (Robert Martin)",
              "Get Your Hands Dirty on Clean Architecture (Reflectoring)",
            ],
            practice: [
              "Build a bank account system applying Clean Architecture: domain, use cases, adapters, infrastructure.",
            ],
          },
          {
            name: "Domain-Driven Design (DDD)",
            what: "Ubiquitous language, bounded contexts, aggregates, entities, value objects, domain events, repositories, domain services, anti-corruption layer.",
            why: "DDD aligns software architecture with business domains, enabling complex domain modeling.",
            prereqs: "OOP, Clean Architecture",
            difficulty: "Advanced",
            realWorld:
              "Used in complex business domains: banking, healthcare, supply chain. Microservice boundaries from bounded contexts.",
            mistakes:
              "Using DDD for simple CRUD apps. The tactical patterns add overhead without value for simple domains.",
            resources: [
              "Domain-Driven Design (Eric Evans)",
              "Implementing Domain-Driven Design (Vernon)",
              "DDD Quickly (free)",
            ],
            practice: [
              "Model an e-commerce domain with DDD: Order aggregate, Product bounded context, payment domain events.",
            ],
          },
          {
            name: "Event-Driven & Event Sourcing",
            what: "Events as first-class citizens. Event sourcing: state as a sequence of events. CQRS: separate read/write models. Projection rebuilding. Event versioning.",
            why: "Full audit history, temporal queries, and independently scalable read/write models.",
            prereqs: "Databases, Messaging",
            difficulty: "Expert",
            realWorld:
              "Banking ledgers, collaborative document editing, git (event sourcing for code), e-commerce order history.",
            mistakes:
              "Event sourcing for everything. It adds massive complexity — use only when audit trail is core.",
            resources: [
              "CQRS Journey (Microsoft)",
              "Versioning in Event Sourced Systems (Greg Young)",
              "EventStoreDB docs",
            ],
            practice: [
              "Build a bank with Event Sourcing: events, projections, snapshots, and event versioning.",
            ],
          },
          {
            name: "CQRS",
            what: "Command Query Responsibility Segregation: separate models for reads (queries) and writes (commands). Synchronous or eventually consistent read models.",
            why: "Enables optimization of read and write paths independently. Read models can be denormalized for query efficiency.",
            prereqs: "DDD, Event-Driven Architecture",
            difficulty: "Advanced",
            realWorld:
              "Write to PostgreSQL (normalized). Read from Elasticsearch (denormalized for full-text search).",
            mistakes:
              "Premature CQRS adoption. For simple CRUD, the added complexity provides no benefit.",
            resources: [
              "DDIA Chapter 11",
              "CQRS by Martin Fowler",
              "Greg Young's CQRS documentation",
            ],
            practice: [
              "Implement CQRS: write model in PostgreSQL, read model in Redis, synchronized via events.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 23 — SYSTEM DESIGN
  // ============================================================
  {
    id: 23,
    emoji: "📐",
    title: "System Design",
    color: "#f687b3",
    darkColor: "#9d174d",
    sections: [
      {
        title: "Distributed Systems",
        topics: [
          {
            name: "Scalability & Load Balancing",
            what: "Horizontal (more servers) vs vertical scaling (bigger server). Load balancing algorithms: Round Robin, Least Connections, IP Hash, Consistent Hashing.",
            why: "Understanding scaling patterns enables designing systems that handle 10x, 100x growth without redesign.",
            prereqs: "Networking, HTTP, Cloud",
            difficulty: "Intermediate",
            realWorld:
              "AWS ALB + Auto Scaling Groups. Consistent hashing in distributed caches (Redis Cluster).",
            mistakes:
              "Vertical scaling as primary strategy (hits hardware limits, single point of failure).",
            resources: [
              "DDIA (Kleppmann)",
              "System Design Interview (Alex Xu)",
              "Designing Distributed Systems (Burns)",
            ],
            practice: [
              "Design: URL shortener, Twitter feed, rate limiter, web crawler. For each: estimate scale, diagram, trade-offs.",
            ],
          },
          {
            name: "CAP Theorem & PACELC",
            what: "CAP: Consistency, Availability, Partition Tolerance — choose 2 in a distributed system. PACELC extends: during normal operation, latency vs consistency trade-off.",
            why: "Explains why distributed databases make different tradeoffs. Guides database and system selection.",
            prereqs: "Distributed systems basics",
            difficulty: "Advanced",
            realWorld:
              "DynamoDB: AP (available during partition). HBase: CP. Cassandra: configurable consistency per query.",
            mistakes:
              "Thinking you need strong consistency when eventual consistency is acceptable (99% of cases).",
            resources: [
              "DDIA Chapter 9",
              "Aphyr's Jepsen blog (Kyle Kingsbury)",
              "CAP Twelve Years Later (Brewer)",
            ],
            practice: [
              "Analyze MongoDB, Cassandra, PostgreSQL behavior during network partition. Document CAP choices.",
            ],
          },
          {
            name: "Caching at Scale",
            what: "Multi-layer caching (CDN → application → database). Consistent hashing for cache distribution. Cache warming strategies. Cache cohorting.",
            why: "At scale, caching is the difference between a system that survives and one that collapses.",
            prereqs: "Redis, Databases",
            difficulty: "Intermediate",
            realWorld:
              "Facebook TAO: distributed caching system handling billions of queries per second.",
            mistakes:
              "Cache stampede on popular expiring keys. No cache warming before deploys.",
            resources: [
              "Scaling Memcache at Facebook (USENIX)",
              "Redis Cluster documentation",
            ],
            practice: [
              "Design a caching layer for a read-heavy social feed. Handle cache invalidation and stampede.",
            ],
          },
          {
            name: "Message Queues & Event Streaming",
            what: "Message queues (RabbitMQ, SQS): point-to-point. Event streaming (Kafka, Kinesis): log-based, consumer groups, replay. Kafka partitioning and consumer lag.",
            why: "Async messaging enables fault tolerance, rate limiting, and replay — essential for large-scale systems.",
            prereqs: "Event-Driven Architecture",
            difficulty: "Advanced",
            realWorld:
              "Kafka powers LinkedIn (7 trillion messages/day), Uber (event sourcing for trips), Netflix.",
            mistakes:
              "Kafka for simple task queues (use SQS/BullMQ). Not planning for consumer group failures.",
            resources: [
              "Kafka: The Definitive Guide (O'Reilly)",
              "Confluent tutorials",
              "Kafka The Internals",
            ],
            practice: [
              "Build real-time analytics pipeline: events → Kafka → consumers → ClickHouse → dashboard.",
            ],
          },
          {
            name: "Distributed Consensus",
            what: "Raft algorithm (leader election, log replication). Paxos. Distributed transactions (2PC, 3PC). Consensus in practice: etcd, ZooKeeper, CockroachDB.",
            why: "Distributed consensus is the foundation of reliable distributed systems.",
            prereqs: "Distributed systems basics",
            difficulty: "Expert",
            realWorld:
              "etcd powers Kubernetes leader election. CockroachDB uses Raft for distributed transactions.",
            mistakes:
              "Assuming distributed transactions are equivalent to local transactions (they're not).",
            resources: [
              "DDIA Chapter 9",
              "Raft paper (Ongaro & Ousterhout)",
              "The Raft Consensus Algorithm (raft.github.io)",
            ],
            practice: [
              "Implement Raft leader election. Use etcd for distributed lock in a multi-node application.",
            ],
          },
          {
            name: "System Design Case Studies",
            what: "Designing: URL shortener, search engine, social feed, ride-sharing, video streaming, chat system, payment system, notification system.",
            why: "System design interviews and real engineering require applying all distributed systems knowledge to concrete problems.",
            prereqs: "All distributed systems topics",
            difficulty: "Advanced",
            realWorld:
              "These patterns appear in real systems: Twitter/X feed, YouTube, Uber, Slack, Stripe.",
            mistakes:
              "Not starting with requirements (functional + non-functional). Jumping to solutions before understanding scale.",
            resources: [
              "System Design Interview Vol 1 & 2 (Alex Xu)",
              "High Scalability blog",
              "Engineering blogs (Meta, Uber, Netflix)",
            ],
            practice: [
              "For each case study: estimate QPS/storage, design components, explain trade-offs in 45 minutes.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 24 — DESIGN PATTERNS
  // ============================================================
  {
    id: 24,
    emoji: "🎯",
    title: "Design Patterns",
    color: "#60a5fa",
    darkColor: "#1d4ed8",
    sections: [
      {
        title: "GoF Design Patterns",
        topics: [
          {
            name: "Creational Patterns",
            what: "Singleton (one instance), Factory Method (subclass decides), Abstract Factory (families), Builder (step-by-step), Prototype (clone). JavaScript module pattern as Singleton.",
            why: "Creational patterns abstract object creation, making systems independent of how objects are created.",
            prereqs: "OOP",
            difficulty: "Intermediate",
            realWorld:
              "Builder: SQL query builders. Factory: creating database adapters. Singleton: connection pools.",
            mistakes:
              "Overusing Singleton (global state, testability issues). Prefer dependency injection.",
            resources: [
              "Refactoring Guru: Creational Patterns",
              "Learning JavaScript Design Patterns (Osmani)",
            ],
            practice: [
              "Implement Builder for a query builder. Implement Factory for multiple payment providers.",
            ],
          },
          {
            name: "Structural Patterns",
            what: "Adapter (interface translation), Bridge (abstraction from implementation), Composite (tree structures), Decorator (add behavior), Facade (simplified interface), Proxy, Flyweight.",
            why: "Structural patterns compose objects/classes to form larger structures while keeping them flexible.",
            prereqs: "OOP",
            difficulty: "Intermediate",
            realWorld:
              "Decorator: middleware chains (Express). Proxy: Vue reactivity. Facade: AWS SDK simplifying complex APIs.",
            mistakes:
              "Using Adapter when Facade would be simpler. Over-wrapping simple objects.",
            resources: [
              "Refactoring Guru: Structural Patterns",
              "Design Patterns: GoF",
            ],
            practice: [
              "Implement a middleware Decorator chain. Build a Proxy for API response caching.",
            ],
          },
          {
            name: "Behavioral Patterns",
            what: "Observer (event system), Strategy (interchangeable algorithms), Command (undo/redo), Iterator, Template Method, Chain of Responsibility, Mediator, State, Visitor, Memento.",
            why: "Behavioral patterns define communication patterns between objects.",
            prereqs: "OOP",
            difficulty: "Intermediate",
            realWorld:
              "Observer = EventEmitter. Strategy = sorting algorithms. Command = undo/redo in editors. State machines.",
            mistakes:
              "Implementing Observer without thinking about memory leaks (forgot to unsubscribe).",
            resources: [
              "Refactoring Guru: Behavioral Patterns",
              "Head First Design Patterns",
            ],
            practice: [
              "Implement Observer/EventEmitter. Build Strategy pattern for payment processing. Build Command for undo/redo.",
            ],
          },
          {
            name: "Architectural Patterns",
            what: "MVC, MVP, MVVM, Flux, Redux, Repository pattern, Unit of Work, Service Layer, CQRS, Specification pattern.",
            why: "Architectural patterns organize code at the application level, providing structure for entire layers.",
            prereqs: "Design Patterns fundamentals",
            difficulty: "Advanced",
            realWorld:
              "Repository pattern in TypeORM. MVVM in Angular. Flux in React/Redux. Specification in complex query building.",
            mistakes:
              "Applying Repository pattern without a unit of work (breaks transaction handling).",
            resources: [
              "Patterns of Enterprise Application Architecture (Fowler)",
              "Clean Architecture (Martin)",
            ],
            practice: [
              "Implement Repository + Unit of Work pattern. Compare to direct ORM usage. Identify trade-offs.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 25 — AI ENGINEERING
  // ============================================================
  {
    id: 25,
    emoji: "🤖",
    title: "AI Engineering",
    color: "#c084fc",
    darkColor: "#7e22ce",
    sections: [
      {
        title: "LLMs & AI Applications",
        topics: [
          {
            name: "LLM Fundamentals",
            what: "Transformer architecture, self-attention, tokenization (BPE), context windows, temperature, top-p sampling, logit bias, token probability. Model families: GPT, Claude, Gemini, Llama.",
            why: "AI is becoming core infrastructure. Engineers need to integrate and optimize LLMs effectively.",
            prereqs: "Python/JavaScript basics, APIs",
            difficulty: "Intermediate",
            realWorld:
              "OpenAI, Anthropic, Google APIs. Token counting for cost optimization. Model selection by capability/cost.",
            mistakes:
              "Not understanding token limits (causes truncation). Temperature=1 for deterministic tasks. Not caching repetitive calls.",
            resources: [
              "Andrej Karpathy: Intro to LLMs",
              "Anthropic documentation",
              "OpenAI API documentation",
            ],
            practice: [
              "Build a multi-turn chatbot with token counting, cost tracking, and prompt caching.",
            ],
          },
          {
            name: "Prompt Engineering",
            what: "System prompts, few-shot examples, chain-of-thought (CoT), self-consistency, ReAct pattern, prompt injection defense, structured output prompting, meta-prompting.",
            why: "Prompt quality directly determines AI application quality. Good prompts can replace expensive fine-tuning.",
            prereqs: "LLM fundamentals",
            difficulty: "Intermediate",
            realWorld:
              "System prompts for customer service tone control. CoT for complex reasoning. Structured JSON output.",
            mistakes:
              "Not iterating prompts with a systematic eval harness. No version control for prompts.",
            resources: [
              "Anthropic Prompt Engineering Guide",
              "DAIR.AI Prompt Engineering Guide",
              "OpenAI Cookbook",
            ],
            practice: [
              "Build a prompt eval harness. Test 5 prompt variants against a test suite of 20 inputs. Track metrics.",
            ],
          },
          {
            name: "RAG (Retrieval Augmented Generation)",
            what: "Document ingestion → chunking → embedding → vector store. Query → embed → semantic search → rerank → augment prompt → generate. Evaluation with RAGAS.",
            why: "RAG grounds LLMs in external knowledge, solving hallucination and knowledge cutoff problems.",
            prereqs: "LLM fundamentals, Vector Databases",
            difficulty: "Advanced",
            realWorld:
              "Customer support chatbot querying documentation. Internal knowledge base assistant.",
            mistakes:
              "Poor chunking strategy (too large or too small). No reranking (first retrieval results not always best).",
            resources: [
              "LlamaIndex documentation",
              "LangChain documentation",
              "RAGAS evaluation framework",
            ],
            practice: [
              "Build a RAG system over documentation. Evaluate with RAGAS: faithfulness, relevancy, context precision.",
            ],
          },
          {
            name: "Embeddings & Vector Databases",
            what: "Dense vector representations of text/images. Cosine similarity, dot product. Vector databases: Pinecone, Weaviate, Qdrant, pgvector, Chroma. ANN algorithms: HNSW, IVF.",
            why: "Embeddings enable semantic search, recommendation, and similarity — the foundation of RAG and AI search.",
            prereqs: "LLM fundamentals",
            difficulty: "Intermediate",
            realWorld:
              "Semantic search over a product catalog. Similar document retrieval. Code search by intent.",
            mistakes:
              "Using full cosine similarity scan over millions of vectors (use ANN indexes). Wrong embedding model for domain.",
            resources: [
              "Pinecone documentation",
              "Weaviate documentation",
              "pgvector documentation",
            ],
            practice: [
              "Build semantic search for a documentation corpus using pgvector. Compare HNSW vs flat index performance.",
            ],
          },
          {
            name: "AI Agents & Tool Use",
            what: "LLMs with tool use: web search, code execution, database queries. ReAct (Reason + Act) pattern. Multi-agent systems. Planning agents. Agent memory (episodic, semantic, procedural).",
            why: "Agents can complete multi-step tasks autonomously by planning and using tools.",
            prereqs: "LLM fundamentals, APIs",
            difficulty: "Advanced",
            realWorld:
              "GitHub Copilot agent for code editing. Claude tools for file operations. Research agents.",
            mistakes:
              "Infinite loops in agentic systems. No cost guardrails. Too much autonomy without human checkpoints.",
            resources: [
              "LangGraph documentation",
              "LangChain Agents documentation",
              "Building LLM Apps (Chip Huyen)",
            ],
            practice: [
              "Build a research agent: web search → paper reading → synthesis → report generation with citation.",
            ],
          },
          {
            name: "Model Context Protocol (MCP)",
            what: "Open standard for LLM-to-tool communication. MCP servers expose tools, resources, and prompts. MCP clients (Claude, Cursor, VS Code) consume them.",
            why: "MCP enables interoperable AI tool ecosystems. Write a tool once, use across all MCP-compatible AI clients.",
            prereqs: "LLM fundamentals, APIs",
            difficulty: "Advanced",
            realWorld:
              "MCP servers for databases, GitHub, file systems, Slack, Jira — all usable by any MCP-compatible AI.",
            mistakes:
              "Not handling MCP tool errors gracefully. Not validating tool input schemas.",
            resources: [
              "Anthropic MCP specification",
              "MCP SDK documentation",
              "MCP Server examples",
            ],
            practice: [
              "Build an MCP server exposing database query and file system tools. Test with Claude Desktop.",
            ],
          },
          {
            name: "Fine-Tuning & PEFT",
            what: "Full fine-tuning vs Parameter-Efficient Fine-Tuning (LoRA, QLoRA, prefix tuning, adapter layers). Dataset curation, instruction tuning, DPO (Direct Preference Optimization).",
            why: "Fine-tuning adapts models to specific domains or tasks where prompt engineering isn't sufficient.",
            prereqs: "ML fundamentals, LLM fundamentals",
            difficulty: "Advanced",
            realWorld:
              "Fine-tuning for specific writing style, code generation in proprietary languages, customer service tone.",
            mistakes:
              "Fine-tuning when RAG would suffice. Not curating high-quality training data. Catastrophic forgetting.",
            resources: [
              "Hugging Face PEFT documentation",
              "LoRA paper (Hu et al.)",
              "Axolotl fine-tuning framework",
            ],
            practice: [
              "Fine-tune a small open-source model (Llama) using LoRA on a custom instruction dataset. Evaluate.",
            ],
          },
          {
            name: "AI Evaluation & Observability",
            what: "LLM evaluation: ROUGE, BERTScore, LLM-as-judge, human evaluation. Prompt versioning. Cost tracking. Latency monitoring. Langfuse, Braintrust, Phoenix.",
            why: "AI systems require specialized observability. Without evals, you don't know if your system is getting better or worse.",
            prereqs: "AI Engineering basics",
            difficulty: "Advanced",
            realWorld:
              "A/B testing prompts. Monitoring for hallucinations. Cost per conversation tracking.",
            mistakes:
              "No systematic evals — flying blind. Relying only on vibe checks without metrics.",
            resources: [
              "Langfuse documentation",
              "Braintrust documentation",
              "RAGAS for RAG evaluation",
            ],
            practice: [
              "Set up an eval pipeline: prompt variants → test cases → LLM-as-judge scoring → dashboard.",
            ],
          },
          {
            name: "AI Architecture Patterns",
            what: "Gateway pattern (unified LLM routing), fallback chains (primary → fallback model), streaming responses (SSE), semantic caching, prompt injection defense.",
            why: "Production AI applications require reliability, cost efficiency, and security patterns.",
            prereqs: "LLM fundamentals, Backend Engineering",
            difficulty: "Advanced",
            realWorld:
              "OpenRouter for model routing. Semantic caching with GPTCache. Guardrails AI for output validation.",
            mistakes:
              "No fallback when primary model is down. No rate limiting on LLM calls. Infinite streaming responses.",
            resources: [
              "Patterns for Building LLM-based Systems (Eugene Yan)",
              "LLM Patterns (eugeneyan.com)",
            ],
            practice: [
              "Build an AI gateway with routing, fallback, semantic caching, and rate limiting.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 26 — MACHINE LEARNING
  // ============================================================
  {
    id: 26,
    emoji: "🧠",
    title: "Machine Learning",
    color: "#818cf8",
    darkColor: "#3730a3",
    sections: [
      {
        title: "ML Foundations",
        topics: [
          {
            name: "Mathematics for ML",
            what: "Linear algebra (vectors, matrices, eigenvalues, SVD). Calculus (derivatives, gradient, chain rule, partial derivatives). Probability (Bayes theorem, distributions, MLE).",
            why: "ML algorithms are mathematical. Without the math, you can't debug models or understand why algorithms work.",
            prereqs: "High school math",
            difficulty: "Intermediate",
            realWorld:
              "Backpropagation is chain rule applied iteratively. PCA is SVD. Naive Bayes is Bayes theorem.",
            mistakes:
              "Skipping the math and treating ML as a black box. Can't debug models without understanding gradients.",
            resources: [
              "Mathematics for Machine Learning (free PDF)",
              "3Blue1Brown: Linear Algebra & Calculus playlists",
            ],
            practice: [
              "Implement matrix multiplication from scratch. Derive the gradient of MSE loss manually.",
            ],
          },
          {
            name: "Statistics & Probability",
            what: "Descriptive stats (mean, median, variance, skew). Probability distributions (Gaussian, Bernoulli, Poisson). Hypothesis testing, p-values, confidence intervals, A/B testing.",
            why: "ML is applied statistics. Evaluation, validation, and interpretation require statistical literacy.",
            prereqs: "Basic math",
            difficulty: "Intermediate",
            realWorld:
              "A/B test significance. Model confidence intervals. Distribution shift detection in production.",
            mistakes:
              "Misinterpreting p-values (p < 0.05 doesn't mean your hypothesis is true). HARKing (post-hoc rationalization).",
            resources: [
              "Think Stats (Downey, free)",
              "Statistical Inference (Casella & Berger)",
              "Khan Academy Statistics",
            ],
            practice: [
              "Run an A/B test simulation. Implement hypothesis testing from scratch. Analyze model calibration.",
            ],
          },
          {
            name: "Data Preprocessing & Feature Engineering",
            what: "Handling missing values, outliers, normalization/standardization, encoding (one-hot, target, ordinal), feature crossing, embeddings for categorical features.",
            why: "Garbage in, garbage out. Data quality determines model quality more than algorithm choice.",
            prereqs: "Python, NumPy, Pandas",
            difficulty: "Intermediate",
            realWorld:
              "Feature engineering for tabular ML competitions (Kaggle). Time series features: lag, rolling stats.",
            mistakes:
              "Data leakage (using future information as features). Normalizing before train/test split (uses test statistics).",
            resources: [
              "Feature Engineering for Machine Learning (Zheng & Casari)",
              "Kaggle Learn",
            ],
            practice: [
              "Process a Kaggle dataset: handle missing values, engineer features, encode categoricals, validate.",
            ],
          },
          {
            name: "Supervised Learning",
            what: "Linear/logistic regression, decision trees, random forests, gradient boosting (XGBoost, LightGBM), SVM, k-NN. Classification and regression tasks.",
            why: "Supervised learning is the most commonly applied ML in industry: fraud detection, recommendation, pricing.",
            prereqs: "ML Mathematics, Data Preprocessing",
            difficulty: "Intermediate",
            realWorld:
              "XGBoost for structured/tabular data. Logistic regression for credit scoring (interpretability).",
            mistakes:
              "Ignoring class imbalance. Not tuning regularization. Choosing complex models when simple ones suffice.",
            resources: [
              "Hands-On Machine Learning (Géron)",
              "scikit-learn documentation",
            ],
            practice: [
              "Build a fraud detection model: EDA, feature engineering, XGBoost, threshold tuning, evaluation.",
            ],
          },
          {
            name: "Unsupervised Learning",
            what: "Clustering (k-means, DBSCAN, hierarchical), dimensionality reduction (PCA, t-SNE, UMAP), anomaly detection, autoencoders.",
            why: "Unlabeled data is abundant. Unsupervised methods extract structure without labels.",
            prereqs: "Supervised Learning",
            difficulty: "Intermediate",
            realWorld:
              "Customer segmentation (k-means). Anomaly detection (isolation forest). Dimensionality reduction for visualization.",
            mistakes:
              "Choosing k in k-means arbitrarily. Using t-SNE for general DR (it's only for visualization).",
            resources: [
              "Hands-On Machine Learning: Unsupervised Learning chapters",
              "scikit-learn clustering",
            ],
            practice: [
              "Segment customers with k-means. Detect anomalies with Isolation Forest. Visualize high-dim data with UMAP.",
            ],
          },
          {
            name: "Model Evaluation & Validation",
            what: "Train/val/test splits, cross-validation (k-fold, stratified, time-series), metrics (accuracy, F1, AUC-ROC, PR-AUC, RMSE, MAPE), confusion matrix, calibration.",
            why: "Correct evaluation is critical. A well-evaluated bad model is more dangerous than a known bad model.",
            prereqs: "Supervised Learning",
            difficulty: "Intermediate",
            realWorld:
              "AUC-ROC for imbalanced classification. MAPE for demand forecasting. Stratified CV for small datasets.",
            mistakes:
              "Testing on training data. Using accuracy on imbalanced datasets. Not using calibration for probability outputs.",
            resources: [
              "scikit-learn model evaluation guide",
              "Practical Statistics for Data Scientists",
            ],
            practice: [
              "Evaluate a classifier on imbalanced data. Compare accuracy vs F1 vs AUC. Implement calibration.",
            ],
          },
          {
            name: "MLOps",
            what: "ML pipelines, experiment tracking (MLflow, Weights & Biases), model registry, model serving (BentoML, Seldon, Triton), data versioning (DVC), model monitoring.",
            why: "80% of ML projects fail to reach production. MLOps bridges research and production.",
            prereqs: "ML, DevOps basics",
            difficulty: "Advanced",
            realWorld:
              "MLflow for experiment tracking at Databricks scale. Seldon for Kubernetes model serving.",
            mistakes:
              "No experiment tracking (can't reproduce results). No model monitoring (silent degradation in production).",
            resources: [
              "Designing ML Systems (Huyen)",
              "MLflow documentation",
              "Weights & Biases documentation",
            ],
            practice: [
              "Build an ML pipeline: data → training → eval → tracking → registry → serving → monitoring.",
            ],
          },
          {
            name: "Python ML Libraries",
            what: "NumPy (arrays, linear algebra), Pandas (dataframes, cleaning), Matplotlib/Seaborn (visualization), scikit-learn (classical ML), SciPy (scientific computing).",
            why: "The Python data science ecosystem is the industry standard for ML work.",
            prereqs: "Python basics",
            difficulty: "Beginner",
            realWorld:
              "Every ML project starts with Pandas for data loading and NumPy for numerical operations.",
            mistakes:
              "Using Python loops over Pandas DataFrames (use vectorized operations). Not understanding broadcasting.",
            resources: [
              "NumPy documentation",
              "Pandas documentation",
              "Python for Data Analysis (McKinney)",
            ],
            practice: [
              "Analyze a dataset end-to-end with Pandas: loading, cleaning, visualization, summary statistics.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 27 — DEEP LEARNING
  // ============================================================
  {
    id: 27,
    emoji: "🔬",
    title: "Deep Learning",
    color: "#f472b6",
    darkColor: "#9d174d",
    sections: [
      {
        title: "Neural Networks & Architectures",
        topics: [
          {
            name: "Neural Network Fundamentals",
            what: "Perceptrons, multilayer perceptrons (MLP), activation functions (ReLU, GELU, sigmoid, tanh), forward pass, backpropagation, gradient descent, vanishing/exploding gradients.",
            why: "Neural networks are the foundation of all deep learning. Understanding backpropagation is essential for debugging training.",
            prereqs: "ML Mathematics, Linear Algebra",
            difficulty: "Intermediate",
            realWorld:
              "Every deep learning model is a neural network. Debugging training instability requires backprop knowledge.",
            mistakes:
              "Using sigmoid activations in hidden layers (vanishing gradients). Not normalizing inputs.",
            resources: [
              "Neural Networks and Deep Learning (Nielsen, free online)",
              "Deep Learning (Goodfellow et al.)",
            ],
            practice: [
              "Implement a neural network with backpropagation from scratch in NumPy.",
            ],
          },
          {
            name: "CNN (Convolutional Neural Networks)",
            what: "Convolution operation, pooling (max, average), feature maps, padding, stride, receptive field. Architectures: LeNet, AlexNet, VGG, ResNet, EfficientNet.",
            why: "CNNs are the foundation of computer vision. Transfer learning from pretrained CNNs enables fast results.",
            prereqs: "Neural Networks",
            difficulty: "Intermediate",
            realWorld:
              "Image classification, object detection (YOLO), medical imaging, autonomous vehicles.",
            mistakes:
              "Not using transfer learning. Training from scratch on small datasets (overfitting).",
            resources: [
              "Stanford CS231n",
              "Fast.ai",
              "PyTorch Computer Vision tutorials",
            ],
            practice: [
              "Fine-tune ResNet50 for a custom image classification task using PyTorch.",
            ],
          },
          {
            name: "Transformers & Attention",
            what: "Self-attention mechanism, multi-head attention, positional encoding, encoder-decoder architecture, BERT (encoder-only), GPT (decoder-only), T5 (encoder-decoder).",
            why: "Transformers are the architecture behind all modern LLMs, vision models, and multimodal AI.",
            prereqs: "Neural Networks, Linear Algebra",
            difficulty: "Advanced",
            realWorld:
              "BERT for NLP tasks. GPT for generation. Vision Transformers (ViT) for image classification.",
            mistakes:
              "Not understanding why transformers replaced RNNs (parallelism during training, better long-range dependencies).",
            resources: [
              "Attention is All You Need (Vaswani et al.)",
              "Andrej Karpathy: nanoGPT",
              "The Illustrated Transformer (Jay Alammar)",
            ],
            practice: [
              "Implement a simplified transformer from scratch following nanoGPT. Train on a small text corpus.",
            ],
          },
          {
            name: "RNN, LSTM & Sequence Models",
            what: "Recurrent Neural Networks, vanishing gradient problem, LSTM (Long Short-Term Memory), GRU, bidirectional RNNs, sequence-to-sequence models.",
            why: "Historical context for understanding why transformers were developed. Still used in specific streaming/real-time applications.",
            prereqs: "Neural Networks",
            difficulty: "Intermediate",
            realWorld:
              "Time series forecasting, speech recognition (pre-whisper), older NLP models.",
            mistakes:
              "Using RNNs for new projects (use Transformers for most tasks).",
            resources: [
              "Understanding LSTM Networks (Olah)",
              "Stanford CS224n",
            ],
            practice: [
              "Implement LSTM for time series forecasting. Compare to Transformer-based model.",
            ],
          },
          {
            name: "Transfer Learning & Fine-Tuning",
            what: "Using pretrained model weights as initialization. Feature extraction (freeze base, train head). Full fine-tuning. Domain adaptation. Foundation models.",
            why: "Transfer learning dramatically reduces data and compute requirements for new tasks.",
            prereqs: "CNN or Transformers",
            difficulty: "Intermediate",
            realWorld:
              "Fine-tuning BERT for sentiment analysis. ResNet feature extraction for medical imaging.",
            mistakes:
              "Not unfreezing layers gradually (catastrophic forgetting). Using wrong learning rate for fine-tuning.",
            resources: [
              "Fast.ai course",
              "Hugging Face transformers documentation",
            ],
            practice: [
              "Fine-tune a pretrained BERT model for text classification on a custom dataset.",
            ],
          },
          {
            name: "PyTorch & TensorFlow",
            what: "PyTorch: dynamic computation graphs, autograd, Dataset/DataLoader, nn.Module, training loops, GPU acceleration (CUDA). TensorFlow/Keras: static graphs, high-level API.",
            why: "PyTorch dominates research and is increasingly standard in production. TensorFlow has large deployment ecosystem.",
            prereqs: "Neural Networks",
            difficulty: "Intermediate",
            realWorld:
              "PyTorch for research and fine-tuning. TensorFlow for TensorFlow Serving and mobile deployment.",
            mistakes:
              "Not moving tensors to GPU. Not using DataLoader with multiple workers. Forgetting optimizer.zero_grad().",
            resources: [
              "PyTorch documentation",
              "Fast.ai course (uses PyTorch)",
              "Deep Learning with Python (Chollet)",
            ],
            practice: [
              "Train a CNN in PyTorch: Dataset, DataLoader, training loop, evaluation, model saving.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 28 — DATA ENGINEERING
  // ============================================================
  {
    id: 28,
    emoji: "📦",
    title: "Data Engineering",
    color: "#2dd4bf",
    darkColor: "#0f766e",
    sections: [
      {
        title: "Data Pipelines & Infrastructure",
        topics: [
          {
            name: "ETL & ELT Pipelines",
            what: "Extract-Transform-Load vs Extract-Load-Transform. Batch vs streaming. Data quality checks, schema validation, idempotency, lineage tracking.",
            why: "Data pipelines are the plumbing of every data-driven company. Broken pipelines = broken analytics = wrong decisions.",
            prereqs: "SQL, Python basics",
            difficulty: "Intermediate",
            realWorld:
              "ELT with dbt on top of BigQuery/Snowflake. Fivetran/Airbyte for extraction. Real-time with Kafka.",
            mistakes:
              "Not handling idempotency (duplicate data). No data quality checks. No lineage tracking.",
            resources: [
              "Fundamentals of Data Engineering (Reis & Housley)",
              "dbt documentation",
              "Fivetran documentation",
            ],
            practice: [
              "Build an ELT pipeline: extract from PostgreSQL → load to BigQuery → transform with dbt.",
            ],
          },
          {
            name: "Data Warehouses",
            what: "Columnar storage, dimensional modeling (star schema, snowflake schema), slowly changing dimensions, fact tables, dimension tables. Snowflake, BigQuery, Redshift, ClickHouse.",
            why: "Data warehouses enable analytical queries on large datasets that would be impractical in operational databases.",
            prereqs: "SQL, Data pipelines",
            difficulty: "Intermediate",
            realWorld:
              "BigQuery for petabyte-scale analytics. ClickHouse for real-time analytics at low latency.",
            mistakes:
              "Using star schema for OLTP. Not partitioning/clustering tables for query optimization.",
            resources: [
              "The Data Warehouse Toolkit (Kimball)",
              "BigQuery documentation",
              "ClickHouse documentation",
            ],
            practice: [
              "Design a star schema for an e-commerce data warehouse. Implement in BigQuery. Optimize queries.",
            ],
          },
          {
            name: "Apache Spark",
            what: "Distributed computing framework for large-scale data processing. RDDs, DataFrames, Spark SQL, Spark Streaming, MLlib. PySpark for Python interface.",
            why: "Spark is the standard for processing data that doesn't fit on a single machine.",
            prereqs: "Python, SQL",
            difficulty: "Advanced",
            realWorld:
              "Processing TBs of log data for analytics. Feature engineering for ML at scale. ETL at Airbnb, Netflix.",
            mistakes:
              "Using Spark for small data (overhead isn't worth it). Shuffles kill performance at scale.",
            resources: [
              "Learning Spark (O'Reilly)",
              "Spark documentation",
              "Databricks documentation",
            ],
            practice: [
              "Process a large dataset with PySpark: load from S3, clean, aggregate, write to data warehouse.",
            ],
          },
          {
            name: "Apache Kafka (Data Engineering)",
            what: "Event streaming platform. Topics, partitions, consumer groups, exactly-once semantics, Kafka Connect (source/sink connectors), Kafka Streams, ksqlDB.",
            why: "Kafka is the real-time data backbone for event-driven data architectures and streaming analytics.",
            prereqs: "Distributed systems basics",
            difficulty: "Advanced",
            realWorld:
              "Real-time feature computation for ML models. CDC (Change Data Capture) with Debezium. Log aggregation.",
            mistakes:
              "Too few partitions (throughput bottleneck). Not planning for consumer group rebalancing.",
            resources: [
              "Kafka: The Definitive Guide",
              "Confluent developer documentation",
              "Debezium documentation",
            ],
            practice: [
              "Set up Kafka with Debezium for CDC from PostgreSQL to a data warehouse.",
            ],
          },
          {
            name: "Apache Airflow & Workflow Orchestration",
            what: "DAG-based workflow orchestration. Operators, hooks, sensors, XComs, pools, task dependencies, scheduling. Alternatives: Prefect, Dagster, Temporal.",
            why: "Complex data pipelines require orchestration for dependency management, scheduling, retries, and monitoring.",
            prereqs: "Python, Data pipelines",
            difficulty: "Intermediate",
            realWorld:
              "Orchestrating nightly ETL jobs, ML retraining pipelines, data quality checks.",
            mistakes:
              "Heavy computation in Airflow tasks (use it to orchestrate, not compute). Dynamic DAG generation issues.",
            resources: [
              "Apache Airflow documentation",
              "Prefect documentation",
              "Dagster documentation",
            ],
            practice: [
              "Build an Airflow DAG: extract → validate → transform → load → notify. Handle retries and failures.",
            ],
          },
          {
            name: "Data Lakes & Lakehouses",
            what: "Data lakes (raw storage in S3/GCS/ADLS). Lakehouse architecture: Delta Lake, Apache Iceberg, Apache Hudi. ACID transactions on object storage.",
            why: "Lakehouses combine data lake scalability with data warehouse reliability — the future of data architecture.",
            prereqs: "Object Storage, Spark",
            difficulty: "Advanced",
            realWorld:
              "Delta Lake on Databricks. Iceberg on AWS with Athena. Netflix uses Iceberg for their data platform.",
            mistakes:
              "Storing unstructured data in a data lake without schema management (data swamp).",
            resources: [
              "Delta Lake documentation",
              "Apache Iceberg documentation",
              "Databricks documentation",
            ],
            practice: [
              "Build a lakehouse pipeline: raw S3 → Delta Lake → Spark transformation → BI tool.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 29 — OPEN SOURCE ENGINEERING
  // ============================================================
  {
    id: 29,
    emoji: "🌍",
    title: "Open Source Engineering",
    color: "#a3e635",
    darkColor: "#3f6212",
    sections: [
      {
        title: "Contributing & Maintaining",
        topics: [
          {
            name: "Contributing to Open Source",
            what: "Finding good-first-issues, reading CONTRIBUTING.md, forking and cloning repos, writing meaningful PRs, responding to code review, following project conventions.",
            why: "OSS contributions build real-world coding skills, reputation, and professional network.",
            prereqs: "Git, Programming fundamentals",
            difficulty: "Beginner",
            realWorld:
              "Contributing to Node.js, TypeScript, React, Kubernetes, and other high-impact projects.",
            mistakes:
              "Starting with large contributions. Fix typos → docs → small bugs → features. Build trust incrementally.",
            resources: [
              "First Timers Only",
              "Good First Issue",
              "How to Contribute to Open Source (GitHub guide)",
            ],
            practice: [
              "Submit 5 PRs to open source projects: documentation, small bug fixes, tests.",
            ],
          },
          {
            name: "Semantic Versioning & Changelogs",
            what: "SemVer MAJOR.MINOR.PATCH. Conventional commits spec. CHANGELOG.md format. Breaking change communication. Release notes.",
            why: "Proper versioning communicates intent and enables dependent projects to manage upgrades safely.",
            prereqs: "Git tags, npm basics",
            difficulty: "Beginner",
            realWorld:
              "npm packages must follow SemVer for dependency resolution to work correctly.",
            mistakes:
              "Breaking changes in minor versions. Not maintaining a human-readable changelog. Missing migration guides.",
            resources: [
              "semver.org",
              "keepachangelog.com",
              "Conventional Commits specification",
            ],
            practice: [
              "Set up semantic-release with conventional commits. Auto-generate CHANGELOG. Publish to npm.",
            ],
          },
          {
            name: "Open Source Maintainer Skills",
            what: "Issue triage, PR review at scale, documentation, community management, governance models, RFC process, roadmap communication, burnout prevention.",
            why: "Maintaining open source is a distinct skill set from contributing. The responsibilities are significant.",
            prereqs: "Programming experience, Communication skills",
            difficulty: "Advanced",
            realWorld:
              "Popular projects receive hundreds of issues. Effective triage and community guidelines are essential.",
            mistakes:
              "Not setting boundaries on response time. Missing contributor guidelines. No code of conduct.",
            resources: [
              "The Architecture of Open Source Applications",
              "Roads and Bridges (Nadia Asparouhova)",
            ],
            practice: [
              "Maintain an open source project: issues, PRs, documentation, releases, community for 3 months.",
            ],
          },
          {
            name: "Open Source Licensing",
            what: "MIT, Apache 2.0, GPL, LGPL, MPL, BSD, EUPL. Permissive vs copyleft. CLA (Contributor License Agreement). FOSS business models.",
            why: "License choice affects how your software can be used commercially and legally.",
            prereqs: "None",
            difficulty: "Beginner",
            realWorld:
              "MIT for maximum adoption. GPL for copyleft protection. Apache 2.0 for patent protection.",
            mistakes:
              "Not having a license (all rights reserved by default). Using GPL for libraries (forces GPL on users).",
            resources: [
              "choosealicense.com",
              "The Open Source Initiative",
              "FOSS Licenses Explained",
            ],
            practice: [
              "Evaluate licensing for a new project. Choose and apply a license. Draft a CLA if needed.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 30 — TECHNICAL WRITING
  // ============================================================
  {
    id: 30,
    emoji: "✍️",
    title: "Technical Writing",
    color: "#94a3b8",
    darkColor: "#334155",
    sections: [
      {
        title: "Documentation & Communication",
        topics: [
          {
            name: "README & Project Documentation",
            what: "README structure: badges, description, quick start, installation, usage examples, API reference, contributing, license. Diátaxis documentation framework.",
            why: "Good README enables contributors to onboard in hours. Poor documentation kills project adoption.",
            prereqs: "Basic writing skills",
            difficulty: "Beginner",
            realWorld:
              "GitHub projects with good README attract contributors. npm packages with clear docs get more downloads.",
            mistakes:
              "Documenting what (code shows that). Document why and how. Out-of-date docs worse than no docs.",
            resources: [
              "Diátaxis documentation framework",
              "Make a README (makeareadme.com)",
              "Google Dev Style Guide",
            ],
            practice: [
              "Write a complete README for a portfolio project. Follow Diátaxis: tutorials, how-tos, reference, explanation.",
            ],
          },
          {
            name: "Architecture Decision Records (ADRs)",
            what: "Lightweight documentation capturing architectural decisions: context, options considered, decision, consequences. Michael Nygard's ADR format.",
            why: "ADRs preserve institutional knowledge about why decisions were made, not just what was decided.",
            prereqs: "Software development experience",
            difficulty: "Beginner",
            realWorld:
              "ADRs prevent teams from rediscovering and relitigating past architectural decisions.",
            mistakes:
              "Writing ADRs after the decision is made. Missing the 'options considered' section.",
            resources: [
              "ADR GitHub organization",
              "Thoughtworks: Use Architectural Decision Records",
              "ADR tools (adr-tools)",
            ],
            practice: [
              "Write ADRs for 5 real architectural decisions. Include rejected alternatives with reasons.",
            ],
          },
          {
            name: "API Documentation",
            what: "OpenAPI/Swagger for REST APIs. GraphQL schema documentation. SDK documentation. Runbooks for operations. Postman documentation export.",
            why: "API documentation is the developer experience. Poor documentation = poor adoption.",
            prereqs: "API Engineering",
            difficulty: "Intermediate",
            realWorld:
              "Stripe's documentation is the gold standard. Well-documented APIs require less support.",
            mistakes:
              "Documentation separated from code (goes stale). Missing request/response examples. No error codes documented.",
            resources: [
              "Docs as Code",
              "Redoc for OpenAPI rendering",
              "Stripe API documentation approach",
            ],
            practice: [
              "Generate OpenAPI docs from code annotations. Publish interactive API docs with Redoc.",
            ],
          },
          {
            name: "Technical Blog Writing",
            what: "Audience identification, progressive disclosure, code examples, diagrams (Mermaid, Excalidraw), SEO for technical content, measuring impact.",
            why: "Technical writing builds personal brand, crystallizes understanding, and contributes to the community.",
            prereqs: "Technical expertise, Writing skills",
            difficulty: "Intermediate",
            realWorld:
              "Engineering blogs attract talent and clients. Personal blogs lead to job offers and speaking invitations.",
            mistakes:
              "Assuming too much knowledge. Not including executable code examples. Not editing for brevity.",
            resources: [
              "Julia Evans: How to Blog (jvns.ca)",
              "Write Useful Books (Rob Fitzpatrick)",
            ],
            practice: [
              "Publish 3 technical blog posts explaining something you learned. Measure engagement.",
            ],
          },
          {
            name: "Diagrams as Code",
            what: "Mermaid (flowcharts, sequence, ER, C4), PlantUML, Excalidraw, draw.io, C4 model (context, container, component, code), architecture diagrams.",
            why: "Diagrams communicate architecture faster than prose. Diagrams-as-code are version-controllable.",
            prereqs: "Basic software architecture",
            difficulty: "Beginner",
            realWorld:
              "C4 model for documenting system architecture. Mermaid in GitHub markdown for inline diagrams.",
            mistakes:
              "Too much detail in overview diagrams. Using different diagram styles inconsistently.",
            resources: [
              "The C4 Model (c4model.com)",
              "Mermaid documentation",
              "Structurizr for C4 diagrams",
            ],
            practice: [
              "Document a complete system with C4 model: context, container, component diagrams.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 31 — DEVELOPER PRODUCTIVITY
  // ============================================================
  {
    id: 31,
    emoji: "🛠️",
    title: "Developer Productivity",
    color: "#4ade80",
    darkColor: "#15803d",
    sections: [
      {
        title: "Tools & Workflow",
        topics: [
          {
            name: "VS Code Mastery",
            what: "Multi-cursor editing, keyboard shortcuts, workspace settings, extensions (ESLint, Prettier, GitLens, REST Client, Docker), debugging, remote development (SSH, containers).",
            why: "Editor mastery multiplies output. Deep knowledge separates fast developers from average ones.",
            prereqs: "None",
            difficulty: "Beginner",
            realWorld:
              "Remote SSH development into cloud machines. Dev Container development for consistent environments.",
            mistakes:
              "Using mouse for everything. Not configuring a formatter. Not using the integrated debugger.",
            resources: [
              "VS Code documentation",
              "VS Code Can Do That (Burke Holland)",
              "Vim in VS Code",
            ],
            practice: [
              "Complete an entire coding task using only keyboard. Set up and debug a Node.js app with breakpoints.",
            ],
          },
          {
            name: "Terminal & Shell Mastery",
            what: "zsh with Oh My Zsh or Starship prompt. fzf (fuzzy finder), ripgrep (rg), bat (cat replacement), eza (ls replacement), zoxide (cd replacement), tmux, dotfiles management.",
            why: "The terminal is where elite developers live. Proficiency compounds over thousands of daily operations.",
            prereqs: "Basic CLI",
            difficulty: "Intermediate",
            realWorld:
              "fzf for fuzzy file/history search. ripgrep for code search. tmux for persistent sessions on remote servers.",
            mistakes:
              "Not investing in terminal setup. Not backing up dotfiles. Reinventing tools instead of learning existing ones.",
            resources: [
              "Your Missing Semester (MIT)",
              "tmux: Productive Mouse-Free Development (Hogan)",
            ],
            practice: [
              "Set up complete terminal environment. Manage dotfiles with chezmoi. Automate dev machine setup.",
            ],
          },
          {
            name: "AI-Powered Development",
            what: "GitHub Copilot, Cursor, Claude Code for AI pair programming. Effective prompting for code generation. AI code review. AI for test generation and documentation.",
            why: "AI coding tools provide 20-40% productivity improvements for experienced developers who know when to trust vs verify AI output.",
            prereqs:
              "Solid programming skills (needed to evaluate AI suggestions)",
            difficulty: "Beginner",
            realWorld:
              "AI for boilerplate generation, test writing, refactoring, debugging. Engineers who use AI well outperform those who don't.",
            mistakes:
              "Trusting AI output without review. Not learning fundamentals first. Over-relying on AI for architecture decisions.",
            resources: [
              "GitHub Copilot documentation",
              "Claude Code documentation",
              "Cursor documentation",
            ],
            practice: [
              "Use AI to generate tests for an existing module. Review, correct, and improve AI suggestions.",
            ],
          },
          {
            name: "Automation & Productivity Systems",
            what: "Makefile/Taskfile for project tasks. Homebrew for macOS package management. Ansible/chezmoi for machine setup. Keyboard shortcuts (Raycast, Alfred).",
            why: "Automating repetitive tasks compounds productivity over time. 10 minutes to automate saves hours over weeks.",
            prereqs: "Shell Scripting",
            difficulty: "Intermediate",
            realWorld:
              "One command to set up a new dev machine. Makefile for project-specific commands (make test, make deploy).",
            mistakes:
              "Automating infrequently done tasks. Spending more time on automation than manual task would take.",
            resources: [
              "Taskfile documentation",
              "Ansible documentation",
              "Raycast documentation",
            ],
            practice: [
              "Automate your complete dev machine setup (from fresh install to fully configured) in one script.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 32 — ESSENTIAL TOOLS
  // ============================================================
  {
    id: 32,
    emoji: "🧰",
    title: "Essential Tools",
    color: "#60a5fa",
    darkColor: "#1d4ed8",
    sections: [
      {
        title: "Professional Tool Stack",
        topics: [
          {
            name: "API Development Tools",
            what: "Postman/Insomnia/Hoppscotch (REST testing), Bruno (git-native API client), Thunder Client (VS Code), HTTPie (CLI), curl, Wireshark.",
            why: "Every backend developer needs tools for API development, testing, and debugging.",
            prereqs: "REST APIs basics",
            difficulty: "Beginner",
            realWorld:
              "Postman Collections shared with teams. Bruno for git-committed API collections.",
            mistakes:
              "Hardcoded environments. No assertion tests in collections.",
            resources: [
              "Postman documentation",
              "Bruno documentation",
              "Hoppscotch (open source)",
            ],
            practice: [
              "Build a complete API collection with environments, tests, and documentation.",
            ],
          },
          {
            name: "Database Tools",
            what: "pgAdmin, TablePlus, DBeaver (GUI clients). pg_dump/pg_restore (backups). pgbadger (log analysis). explain.depesz.com (EXPLAIN visualization).",
            why: "Database tools accelerate development, exploration, and optimization.",
            prereqs: "SQL",
            difficulty: "Beginner",
            realWorld:
              "TablePlus for daily database exploration. pgbadger for query performance analysis.",
            mistakes:
              "Making production schema changes via GUI instead of migrations.",
            resources: ["TablePlus documentation", "pgbadger documentation"],
            practice: [
              "Set up TablePlus connecting to multiple environments. Run a pgbadger analysis on query logs.",
            ],
          },
          {
            name: "Observability Tool Stack",
            what: "Grafana + Prometheus (metrics), Loki (logs), Tempo (traces) — the PLG/LGTM stack. Jaeger (distributed tracing). Sentry (errors). Datadog, New Relic (commercial APM).",
            why: "Production applications require comprehensive observability. The open source stack is free and powerful.",
            prereqs: "Docker, Node.js basics",
            difficulty: "Intermediate",
            realWorld:
              "LGTM stack for self-hosted observability. Datadog for enterprises requiring managed observability.",
            mistakes:
              "console.log in production. No alerting. Not considering storage costs for high-cardinality metrics.",
            resources: [
              "Grafana Cloud documentation",
              "OpenTelemetry documentation",
            ],
            practice: [
              "Build LGTM stack with Docker Compose: instrument Node.js app with all three pillars.",
            ],
          },
          {
            name: "Security Tools",
            what: "Burp Suite (web app security testing), OWASP ZAP, nmap, Metasploit (penetration testing), Semgrep (SAST), Trivy (container scanning), Snyk (dependency scanning).",
            why: "Security professionals and security-aware developers use these tools to find vulnerabilities proactively.",
            prereqs: "Security basics",
            difficulty: "Intermediate",
            realWorld:
              "Trivy in CI pipeline for container image scanning. Snyk for dependency vulnerability monitoring.",
            mistakes:
              "Running security tools without understanding findings. Not fixing critical vulnerabilities.",
            resources: [
              "PortSwigger Web Security Academy",
              "Trivy documentation",
              "Snyk documentation",
            ],
            practice: [
              "Run Trivy on a Docker image. Run OWASP ZAP against a test app. Fix the critical findings.",
            ],
          },
          {
            name: "Queue & Messaging Tools",
            what: "BullMQ Dashboard (Bull Board), RabbitMQ Management UI, Kafka UI (Kafdrop, AKHQ), AWS SQS console, Temporal UI for workflow visualization.",
            why: "Visibility into queue systems is essential for debugging and monitoring async workloads.",
            prereqs: "Redis/RabbitMQ/Kafka basics",
            difficulty: "Intermediate",
            realWorld:
              "Kafdrop for Kafka topic inspection and message browsing. Bull Board for BullMQ job monitoring.",
            mistakes:
              "No visibility into queue depth and processing rates (silent failures in async systems).",
            resources: [
              "Bull Board documentation",
              "Kafdrop documentation",
              "AKHQ documentation",
            ],
            practice: [
              "Set up monitoring dashboards for BullMQ and Kafka. Create alerts on queue depth thresholds.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 33 — REAL-WORLD PROJECTS
  // ============================================================
  {
    id: 33,
    emoji: "🏆",
    title: "Real-World Projects",
    color: "#fb923c",
    darkColor: "#c2410c",
    sections: [
      {
        title: "Project Portfolio",
        topics: [
          {
            name: "Beginner Projects",
            what: "Todo app (CRUD, local storage, filtering), Weather app (API integration), Calculator, Notes app with markdown, Quiz app with scoring.",
            why: "Builds confidence with fundamentals. Teaches CRUD, state management, API consumption, and DOM manipulation.",
            prereqs: "HTML, CSS, JavaScript basics",
            difficulty: "Beginner",
            realWorld:
              "Skills apply to every real application: state, events, APIs, DOM, storage.",
            mistakes:
              "Tutorial hell — watching without building. Build yourself, don't just follow along.",
            resources: [
              "The Odin Project",
              "Full Stack Open (Helsinki University, free)",
            ],
            practice: [
              "Todo app: local storage, filter, drag-to-reorder, dark mode, keyboard shortcuts.",
            ],
          },
          {
            name: "Intermediate Projects",
            what: "E-commerce store (auth, cart, payments), Real-time chat (WebSockets, rooms), Project management (Kanban, drag-drop), Social feed (pagination, likes), Blog CMS.",
            why: "Combines frontend + backend + database. Production-like complexity with real auth, uploads, and real-time.",
            prereqs: "React, Node.js, Database basics",
            difficulty: "Intermediate",
            realWorld:
              "Teaches: authentication flows, file uploads, real-time features, full-text search, email.",
            mistakes:
              "Skipping auth to simplify. Auth teaches the most about web security and sessions.",
            resources: [
              "Full Stack Open",
              "Josh Comeau's courses",
              "Fireship tutorials",
            ],
            practice: [
              "Trello clone: auth, boards, cards, drag-drop, real-time updates with WebSockets, dark mode.",
            ],
          },
          {
            name: "Advanced Projects",
            what: "URL shortener (1M req/day, analytics), Video streaming platform (HLS, adaptive bitrate), Code collaboration editor (CRDTs, WebSockets), Multi-tenant SaaS.",
            why: "Forces application of system design, performance optimization, and scalability principles at real scale.",
            prereqs: "All fundamentals + system design basics",
            difficulty: "Advanced",
            realWorld:
              "Resume differentiators. Shows ability to build and ship production-grade applications.",
            mistakes:
              "Features nobody uses. Focus on depth: performance, reliability, observability.",
            resources: ["System Design Interview (Alex Xu)", "DDIA"],
            practice: [
              "URL shortener: analytics dashboard, custom slugs, expiry, A/B redirect, geo-routing, 1M req/day load test.",
            ],
          },
          {
            name: "Enterprise Projects",
            what: "Multi-tenant SaaS: org/team management, RBAC, Stripe billing with usage metering, audit logs, API rate limiting, webhook system, multi-region deployment.",
            why: "Demonstrates production readiness — the gap between demo apps and real enterprise software.",
            prereqs: "All above",
            difficulty: "Expert",
            realWorld:
              "Stripe, GitHub, Linear, Notion all solve these problems. Understanding them makes you hireable at senior/staff level.",
            mistakes:
              "Skipping billing, multi-tenancy, security audits. These are where real business value lives.",
            resources: [
              "Stripe documentation",
              "PlanetScale multi-tenancy guide",
              "SaaS boilerplates (ShipFast, Supastarter)",
            ],
            practice: [
              "SaaS boilerplate: auth, orgs/teams, Stripe billing, RBAC, audit logs, API keys, webhook delivery.",
            ],
          },
          {
            name: "AI-Powered Projects",
            what: "RAG-powered knowledge base, AI code reviewer, AI customer support agent, Multimodal search, LLM fine-tuning pipeline, AI evaluation framework.",
            why: "AI projects differentiate candidates in the current job market and build unique product intuition.",
            prereqs: "LLM fundamentals, Backend Engineering",
            difficulty: "Advanced",
            realWorld:
              "Internal knowledge assistants, AI-powered customer support at scale, personalized AI applications.",
            mistakes:
              "AI for AI's sake. Solve a real problem. Non-AI solutions are often simpler and more reliable.",
            resources: [
              "LangChain cookbook",
              "Anthropic cookbook",
              "LlamaIndex documentation",
            ],
            practice: [
              "Build a RAG system over your company docs with evaluation metrics, source attribution, and feedback loop.",
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // PHASE 34 — ENGINEERING LEADERSHIP
  // ============================================================
  {
    id: 34,
    emoji: "🎯",
    title: "Engineering Leadership",
    color: "#a3e635",
    darkColor: "#3f6212",
    sections: [
      {
        title: "Technical Leadership",
        topics: [
          {
            name: "Code Reviews",
            what: "Reviewing for correctness, security, performance, maintainability, and knowledge sharing. Giving specific, actionable, constructive feedback. Conventional Comments.",
            why: "Code reviews are the highest-leverage mechanism for maintaining quality and growing a team.",
            prereqs: "Solid technical skills across the stack",
            difficulty: "Intermediate",
            realWorld:
              "Reviewing PRs for security vulnerabilities, missing tests, performance issues, architectural concerns.",
            mistakes:
              "Nitpicking style (use linters). Not explaining why. Being prescriptive vs suggestive. Blocking PRs without alternatives.",
            resources: [
              "Google Engineering Code Review Guide",
              "Conventional Comments",
              "The Art of Giving Code Reviews",
            ],
            practice: [
              "Review 10 open source PRs. Give constructive feedback. Submit your own PR and request review.",
            ],
          },
          {
            name: "Technical Decision Making",
            what: "Architecture Decision Records, RFC process, trade-off analysis, Build vs Buy vs Open Source, proof of concept evaluation, reversible vs irreversible decisions.",
            why: "Senior engineers make decisions that affect teams for years. Process and documentation matter more than individual genius.",
            prereqs: "Architecture knowledge, Communication skills",
            difficulty: "Advanced",
            realWorld:
              "Choosing a database, evaluating frameworks, deciding when to refactor vs rewrite.",
            mistakes:
              "Decisions based on hype. 'We should use Rust' without considering team skills. No ADR to reference later.",
            resources: [
              "Architecture Decision Records (Nygard)",
              "Shape Up (Basecamp, free)",
              "Thinking in Systems (Meadows)",
            ],
            practice: [
              "Write an ADR for a real technology decision you've made. Present to peers for feedback and critique.",
            ],
          },
          {
            name: "Estimation & Planning",
            what: "Work breakdown structure, story point estimation, t-shirt sizing, cone of uncertainty, risk buffers, technical debt accounting, sprint planning.",
            why: "Reliable estimates enable product teams to plan. Chronic underestimation destroys team trust and credibility.",
            prereqs: "Engineering experience",
            difficulty: "Intermediate",
            realWorld:
              "Sprint planning, project scoping, stakeholder communication about timelines and risks.",
            mistakes:
              "Not accounting for testing, review, deployment, and unknowns. Optimistic estimates without buffers.",
            resources: [
              "Software Estimation (McConnell)",
              "Shape Up (Basecamp, free)",
              "No Estimates movement",
            ],
            practice: [
              "Estimate a feature, build it, compare to actual. Repeat 10 times to calibrate. Analyze error patterns.",
            ],
          },
          {
            name: "Technical Hiring & Interviewing",
            what: "Job description writing, resume screening, phone screens, technical interviews (system design, coding, behavioral), take-home projects, structured evaluation rubrics.",
            why: "Hiring is the highest-leverage activity for team quality. Bad hires cost 2-3x annual salary to fix.",
            prereqs: "Engineering experience",
            difficulty: "Advanced",
            realWorld:
              "Designing interview processes that are fair, signal-accurate, and respectful of candidates' time.",
            mistakes:
              "Asking trick questions. No structured rubric (bias). Ignoring cultural add vs cultural fit.",
            resources: [
              "Hire, Hire, Hire (Reed)",
              "The Manager's Path (Fournier)",
              "Tech Interview Handbook",
            ],
            practice: [
              "Design and run a structured technical interview. Create an evaluation rubric. Debrief with peers.",
            ],
          },
          {
            name: "Mentoring & Staff Engineering",
            what: "1:1s, pair programming, sponsorship vs mentorship, technical roadmaps, cross-team influence, staff/principal engineer archetypes (tech lead, solver, right-hand, architect).",
            why: "Senior engineers multiply team output through others. Mentoring is the highest-leverage force multiplier.",
            prereqs: "Experience, Empathy, Communication",
            difficulty: "Advanced",
            realWorld:
              "Onboarding junior devs, technical interviews, conference talks, engineering blog posts, RFCs.",
            mistakes:
              "Doing work instead of teaching. Creating learned helplessness by always giving answers.",
            resources: [
              "The Staff Engineer's Path (Reilly)",
              "An Elegant Puzzle (Larson)",
              "Staff Engineer (Larson)",
            ],
            practice: [
              "Mentor a junior developer for 1 month with regular 1:1s and pair programming. Write a technical blog post.",
            ],
          },
          {
            name: "Engineering Strategy & Culture",
            what: "Technical roadmap creation, tech debt management, engineering principles and values, team topologies (stream-aligned, platform, enabling, complicated-subsystem), developer experience (DevEx).",
            why: "Culture and strategy determine team effectiveness more than individual skill. Principals shape both.",
            prereqs: "Staff-level engineering experience",
            difficulty: "Expert",
            realWorld:
              "Writing engineering principles that guide thousands of decisions. Team topology changes for Conway's Law.",
            mistakes:
              "Tech debt as an excuse for rewrites. Rewrites almost never go as planned (Second System Effect).",
            resources: [
              "Team Topologies (Skelton & Pais)",
              "A Philosophy of Software Design (Ousterhout)",
              "Good Strategy Bad Strategy (Rumelt)",
            ],
            practice: [
              "Write an engineering strategy document for a real team problem. Present to leadership. Measure adoption.",
            ],
          },
          {
            name: "Incident Management",
            what: "On-call rotations, runbooks, incident response (detection → coordination → mitigation → communication → resolution), blameless postmortems, SRE practices.",
            why: "Systems fail. How teams respond to failures determines trust, reliability, and learning culture.",
            prereqs: "Observability, Infrastructure",
            difficulty: "Advanced",
            realWorld:
              "Writing blameless postmortems that identify system failures (not human failures). PagerDuty on-call.",
            mistakes:
              "Blame-full postmortems. Not following up on action items. Declaring incidents over before verifying.",
            resources: [
              "Google SRE Book (free online)",
              "Blameless Postmortems (Etsy)",
              "Incident.io documentation",
            ],
            practice: [
              "Run a Chaos Day: intentionally introduce failures and practice incident response. Write a postmortem.",
            ],
          },
        ],
      },
    ],
  },
];
