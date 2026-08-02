const en = {
  meta: {
    title: "Robertsystems — Custom software development",
    description:
      "We design and develop mobile applications, desktop software and websites. Check out our active projects: controlISP and a POS system for businesses and warehouses.",
  },
  nav: {
    home: "Home",
    services: "Services",
    projects: "Projects",
    about: "About",
    contact: "Contact",
    cta: "Let's talk",
  },
  hero: {
    badge: "Custom software development",
    title: [
      { text: "We build software that " },
      { text: "drives", highlight: true },
      { text: " your business" },
    ],
    subtitle:
      "At Robertsystems we design and develop mobile applications, desktop software and websites, tailored to the real needs of your business.",
    ctaPrimary: "See our projects",
    ctaSecondary: "Contact us",
  },
  services: {
    title: "Our services",
    subtitle: "Complete software solutions, from idea to final product.",
    items: [
      {
        icon: "mobile",
        title: "Mobile applications",
        description:
          "Apps for iOS and Android designed and built with best practices, focused on your users' experience.",
        tags: ["iOS", "Android", "UX/UI"],
      },
      {
        icon: "desktop",
        title: "Desktop software",
        description:
          "Robust, fast desktop software adapted to your workflow, so your operation runs more efficiently.",
        tags: ["Windows", "Desktop", "Automation"],
      },
      {
        icon: "web",
        title: "Websites",
        description:
          "Modern, fast, SEO-optimized websites, from landing pages to full portals and web systems.",
        tags: ["Web", "SEO", "E-commerce"],
      },
    ],
  },
  projects: {
    title: "Active projects",
    subtitle: "We work every day on real projects that are already live.",
    viewLabel: "View project",
    items: [
      {
        name: "controlISP",
        status: "Active",
        type: "Web management system for ISPs",
        description:
          "Web platform for internet service providers (ISPs): manage subscribers, billing, online payments, plans, zones and the state of your network, all from one place.",
        features: [
          "Subscriber management",
          "Billing and payment control",
          "Online payments (confirm/cancel)",
          "Plans and zones",
          "MikroTik integration",
          "Fiber networks (OLT)",
          "Customer portal",
          "Users, reports and tickets",
        ],
        tech: ["Cloudflare Workers", "React", "D1 (SQLite)", "MikroTik API"],
      },
      {
        name: "POS System",
        status: "Active",
        type: "Point of sale system",
        description:
          "Point of sale (POS) system for businesses and warehouses, built with JavaFX. Fast sales with multiple payment methods, real-time inventory, credit sales, purchases and reports.",
        features: [
          "Fast sales",
          "Multiple payment methods",
          "Automatic change calculation",
          "Real-time inventory",
          "Credit sales",
          "Supplier purchases",
          "Returns",
          "PDF reports",
          "Cash drawer close (X Report)",
          "Ticket printing",
        ],
        tech: ["JavaFX", "MySQL", "Windows 7 or higher"],
        download: {
          url: "https://github.com/gury03/robertsystems-portal/releases/download/puntodeventa-v2.0.4/PuntoDeVenta_2.0.4_Setup.exe",
          label: "Download installer (762 MB)",
        },
      },
    ],
  },
  about: {
    title: "About us",
    subtitle:
      "Robertsystems is a team passionate about building technology that solves real problems.",
    paragraphs: [
      "We are a company dedicated to software design and development. We turn ideas into functional products: mobile applications, desktop software and websites.",
      "We believe in simple, well-crafted, user-centered software. Every project starts by listening to your needs and ends with a solution you can use from day one.",
    ],
    stats: [
      { value: "2", label: "Active projects" },
      { value: "3", label: "Development areas" },
      { value: "100%", label: "Custom software" },
    ],
    values: [
      {
        title: "Quality",
        description: "Clean code and best practices on every delivery.",
      },
      {
        title: "Commitment",
        description: "We support your project from start to finish.",
      },
      {
        title: "Innovation",
        description: "Up-to-date technology to solve real problems.",
      },
    ],
  },
  contact: {
    title: "Let's talk about your project",
    subtitle: "Have an idea in mind? Tell us and we'll make it happen.",
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@example.com",
      phone: "WhatsApp",
      phonePlaceholder: "Your WhatsApp number (optional)",
      message: "Message",
      messagePlaceholder: "Tell us about your project...",
      submit: "Send message",
      success:
        "Thanks! Your message has been sent. We'll get back to you as soon as possible.",
      error: "Could not send your message. Please try again.",
    },
    info: {
      email: "contact@robertsystems.org",
      location: "We work with clients all over the world",
    },
  },
  footer: {
    tagline:
      "We build custom software: mobile applications, desktop software and websites.",
    linksTitle: "Links",
    servicesTitle: "Services",
    rights: "All rights reserved.",
    madeWith: "Made with",
  },
};

export default en;
