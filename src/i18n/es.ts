const es = {
  meta: {
    title: "Robertsystems — Desarrollo de software a medida",
    description:
      "Diseñamos y desarrollamos aplicaciones móviles, programas para PC y páginas web. Conoce nuestros proyectos activos: controlISP y sistema POS para negocios y bodegas.",
  },
  nav: {
    home: "Inicio",
    services: "Servicios",
    projects: "Proyectos",
    about: "Nosotros",
    contact: "Contacto",
    cta: "Hablemos",
  },
  hero: {
    badge: "Desarrollo de software a medida",
    title: [
      { text: "Creamos software que " },
      { text: "impulsa", highlight: true },
      { text: " tu negocio" },
    ],
    subtitle:
      "En Robertsystems diseñamos y desarrollamos aplicaciones móviles, programas para PC y páginas web, adaptados a las necesidades reales de tu negocio.",
    ctaPrimary: "Conoce nuestros proyectos",
    ctaSecondary: "Contáctanos",
  },
  services: {
    title: "Nuestros servicios",
    subtitle: "Soluciones de software completas, de la idea al producto final.",
    items: [
      {
        icon: "mobile",
        title: "Aplicaciones móviles",
        description:
          "Apps para iOS y Android diseñadas y desarrolladas con las mejores prácticas, pensadas en la experiencia de tus usuarios.",
        tags: ["iOS", "Android", "UX/UI"],
      },
      {
        icon: "desktop",
        title: "Programas para PC",
        description:
          "Software de escritorio robusto, rápido y adaptado a tu flujo de trabajo, para que tu operación sea más eficiente.",
        tags: ["Windows", "Escritorio", "Automatización"],
      },
      {
        icon: "web",
        title: "Páginas web",
        description:
          "Sitios web modernos, rápidos y optimizados para SEO, desde landing pages hasta portales y sistemas web completos.",
        tags: ["Web", "SEO", "E-commerce"],
      },
    ],
  },
  projects: {
    title: "Proyectos activos",
    subtitle:
      "Trabajamos día a día en proyectos reales que ya están en funcionamiento.",
    viewLabel: "Ver proyecto",
    items: [
      {
        name: "controlISP",
        status: "Activo",
        type: "Sistema de gestión web para ISPs",
        description:
          "Plataforma web para proveedores de servicios de internet (ISPs) con portal de pagos para abonados: administra clientes, facturación y pagos online, consulta el estado del servicio y reporta averías, con integración a MikroTik y OLT.",
        features: [
          "Gestión de abonados",
          "Facturación y control de pagos",
          "Portal de pagos para abonados",
          "Pagos online (confirmar/anular)",
          "Planes y zonas",
          "Integración con MikroTik",
          "Integración con OLT (fibra óptica)",
          "Consulta de estado del servicio",
          "Reporte de averías desde el portal",
          "Usuarios y reportes",
        ],
      },
      {
        name: "Sistema POS",
        status: "Activo",
        type: "Sistema de punto de venta",
        description:
          "Sistema de punto de venta para negocios y bodegas, desarrollado en JavaFX. Ventas rápidas con múltiples métodos de pago, inventario en tiempo real, créditos, compras y reportes.",
        features: [
          "Ventas rápidas",
          "Múltiples métodos de pago",
          "Cálculo automático de cambio",
          "Inventario en tiempo real",
          "Ventas a crédito",
          "Compras a proveedores",
          "Devoluciones",
          "Reportes en PDF",
          "Cierre de caja (Corte X)",
          "Impresión de tickets",
        ],
        tech: ["JavaFX", "MySQL", "Windows 7 o superior"],
        download: {
          url: "https://github.com/gury03/robertsystems-portal/releases/download/puntodeventa-v2.0.4/PuntoDeVenta_2.0.4_Setup.exe",
          label: "Descargar instalador (762 MB)",
        },
      },
    ],
  },
  about: {
    title: "Sobre nosotros",
    subtitle:
      "Robertsystems es un equipo apasionado por crear tecnología que resuelve problemas reales.",
    paragraphs: [
      "Somos una empresa dedicada al diseño y desarrollo de software. Convertimos ideas en productos funcionales: aplicaciones móviles, programas para PC y páginas web.",
      "Creemos en el software simple, bien hecho y centrado en el usuario. Cada proyecto comienza escuchando tus necesidades y termina con una solución que puedes usar desde el primer día.",
    ],
    stats: [
      { value: "2", label: "Proyectos activos" },
      { value: "3", label: "Áreas de desarrollo" },
      { value: "100%", label: "Software a medida" },
    ],
    values: [
      {
        title: "Calidad",
        description: "Código limpio y buenas prácticas en cada entrega.",
      },
      {
        title: "Compromiso",
        description: "Acompañamos tu proyecto de inicio a fin.",
      },
      {
        title: "Innovación",
        description: "Tecnología actual para resolver problemas reales.",
      },
    ],
  },
  contact: {
    title: "Hablemos de tu proyecto",
    subtitle: "¿Tienes una idea en mente? Cuéntanos y la hacemos realidad.",
    form: {
      name: "Nombre",
      namePlaceholder: "Tu nombre",
      email: "Correo electrónico",
      emailPlaceholder: "tucorreo@ejemplo.com",
      phone: "WhatsApp",
      phonePlaceholder: "Tu número de WhatsApp (opcional)",
      message: "Mensaje",
      messagePlaceholder: "Cuéntanos sobre tu proyecto...",
      submit: "Enviar mensaje",
      success:
        "¡Gracias! Tu mensaje ha sido enviado. Te responderemos lo antes posible.",
      error: "No se pudo enviar el mensaje. Inténtalo de nuevo.",
    },
    info: {
      email: "contacto@robertsystems.org",
      location: "Trabajamos con clientes de todo el mundo",
    },
  },
  footer: {
    tagline:
      "Desarrollamos software a medida: aplicaciones móviles, programas para PC y páginas web.",
    linksTitle: "Enlaces",
    servicesTitle: "Servicios",
    rights: "Todos los derechos reservados.",
    madeWith: "Hecho con",
  },
};

export default es;
