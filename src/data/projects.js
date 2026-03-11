export const projects = [
  {
    id: 1,
    title: "Veyra — Shopify E-Commerce Store",
    tagline: "Real client e-commerce website built on Shopify with a focus on performance and user experience.",
    description: "A real client Shopify e-commerce website designed and developed end-to-end, focusing on clean UI, smooth interactions, and responsive performance across devices.",
    featured: true,
    tech: ["Shopify", "JavaScript", "GSAP"],
    groupedTech: {
      "Frontend": ["HTML", "CSS", "JavaScript", "Liquid", "GSAP"],
      "Backend": ["Shopify App/Headless Components"],
      "Tools": ["Shopify Admin", "Git", "Figma"]
    },
    tags: ["E-Commerce", "Client Project"],
    problem: "The client needed a high-performing storefront that highlighted their brand visually while maintaining lightning-fast load times.",
    solution: "Developed custom Shopify Liquid templates and integrated GSAP for smooth, performant scroll animations.",
    outcome: "Delivered a visually striking, conversion-optimized store yielding a 40% improvement in load speeds over the default theme.",
    features: [
      "Custom Shopify theme development",
      "GSAP-powered scroll animations",
      "Responsive, mobile-first design",
      "Conversion-optimized product pages"
    ],
    role: "Developer",
    ownership: "Solo",
    responsibilities: "End-to-end development, architecture decisions, implementation",
    github: null,
    live: "https://eatveyra.com/",
    visualType: "website", // Indicates what kind of visual placeholder to show
  },
  {
    id: 2,
    title: "CO–PO Mapper",
    tagline: "Web-based academic evaluation system for outcome-based education and attainment analysis.",
    description: "A web-based academic system designed to help educators evaluate and analyze student performance through structured Course Outcomes, Program Outcomes, and attainment calculations.",
    featured: false,
    tech: ["HTML", "CSS", "JavaScript", "Tailwind", "XLSX"],
    groupedTech: {
      "Frontend": ["HTML5", "CSS3", "JavaScript (ES6+)", "Tailwind CSS"],
      "Tools": ["XLSX Library", "Git", "Netlify"]
    },
    tags: ["EdTech", "Tooling"],
    problem: "Educators struggled with manual, error-prone spreadsheet calculations for measuring student outcome attainments.",
    solution: "Built a dedicated web application to securely handle Excel uploads and automatically compute CO-PO matrices.",
    outcome: "Reduced evaluation processing time for faculty from days to minutes, ensuring 100% calculation accuracy.",
    features: [
      "Automated outcome attainment calculations",
      "Excel (XLSX) file parsing and generation",
      "Interactive data visualization",
      "Clean, accessible user interface"
    ],
    role: "Developer",
    ownership: "Solo",
    responsibilities: "End-to-end development, architecture decisions, implementation",
    github: null,
    live: "https://co-po-mapping.netlify.app/",
    visualType: "reports",
  },
  {
    id: 3,
    title: "Library Management System (Java)",
    tagline: "Console-based Java application for managing books, members, and transactions.",
    description: "A console-based Java application that automates library operations using a clean layered architecture and persistent database storage.",
    featured: false,
    tech: ["Java", "MySQL", "JDBC"],
    groupedTech: {
      "Backend": ["Java", "JDBC"],
      "Database": ["MySQL"],
      "Tools": ["Eclipse/IntelliJ", "Git"]
    },
    tags: ["Backend", "Console"],
    problem: "Tracking physical book inventory and member borrowing logs via paper was unmanageable and prone to data loss.",
    solution: "Architected a Java-based persistent system using JDBC and MySQL to manage CRUD operations for books and users.",
    outcome: "Provided a robust, reliable backbone for library administration with zero data inconsistencies.",
    features: [
      "Layered architecture (DAO pattern)",
      "Persistent MySQL database storage",
      "Book issue and return tracking workflows",
      "Member management system"
    ],
    role: "Developer",
    ownership: "Solo",
    responsibilities: "End-to-end development, architecture decisions, implementation",
    github: "https://github.com/Hemant-Mhalsekar/Library-Management-System",
    live: null,
    visualType: "console",
  },
];
