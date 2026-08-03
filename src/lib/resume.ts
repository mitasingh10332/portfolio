export const profile = {
  name: "Mita Singh ",
  title: "Frontend Developer & Software Engineer",
  tagline: "I turn complex product ideas into experiences people can actually use.",
  // TODO: Replace with your actual resume link (Google Drive / PDF)
  resumeUrl: "https://drive.google.com/file/d/1OEf-RXxmRpaKFwTJi4I6ycpwq0BbJbtb/view",

  intro:
   "**Frontend Developer** with **2+ years** of hands on industry experience building and shipping **production grade web applications**. I specialize in **React.js, Next.js, and TypeScript**, with experience taking products from early requirements and interface architecture through **API integration, real time features, cloud deployment, and production delivery**.",


 about: [
"I enjoy working at the intersection of **product thinking and frontend engineering**  understanding what a product needs, breaking complex requirements into practical solutions, and turning them into scalable, production ready functionality and experiences.",
"I have worked across real world products spanning accommodation, healthcare, dining, and social wellness, taking ownership of frontend architecture, collaborating with clients and cross functional teams, integrating complex APIs and third party services, and taking features from requirements through development, testing, deployment, and release.",
"My experience spans **application logic, real time communication, payment gateways, authentication, subscriptions, role based access control, internationalisation, push notifications, PWAs, and cloud infrastructure**, giving me a strong understanding of how modern web products are built, integrated, and delivered.",
"I bring a **problem solving, adaptable, and ownership driven approach** to engineering — from understanding requirements and choosing the right technical approach to building reliable functionality and working with teams to deliver it successfully. I am also an **AWS Certified Solutions Architect – Associate**, with practical knowledge of cloud infrastructure, deployment, DNS, IAM, and scalable application delivery.",
],

  journey: [
    "Started with a strong foundation in Computer Science and gradually moved from learning individual technologies to understanding how complete products are designed, built, integrated, and shipped.",
    "Gained hands on industry experience working on production applications where frontend decisions directly affected usability, reliability, payments, communication, and business workflows.",
    "Progressed into frontend ownership and client facing responsibilities, leading the frontend delivery of the Accommodation Module while coordinating requirements across clients, backend developers, designers, and QA.",
    "Today, I bring a product minded engineering approach: build cleanly, understand the problem first, collaborate closely, and ship experiences that are ready for real users.",
  ],

  education: {
    school: "Acropolis Institute of Technology and Research, Indore",
    degree: "B.Tech, Computer Science and Engineering",
    period: "Aug 2020 – May 2024",
    detail: "CGPA 7.81 / 10.0",
  },

  certifications: [
    "**AWS Certified Solutions Architect – Associate**",
    "Algorithmic Toolbox — Coursera",
    "Computer Networks and Internet Protocol — NPTEL",
    "Advanced Google Analytics — Google",
  ],

  contact: {
    email: "mitasingh10332@gmail.com",
    phone: "+91 9111996077",
    github: "https://github.com/mitasingh10332",
    linkedin: "https://www.linkedin.com/in/mita-singh-",
  },
};

export type SkillGroup = {
  label: string;
  description?: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages & Frameworks",
    description:
      "The core technologies I use to build scalable, component driven web applications.",
    items: [
      "JavaScript (ES6+)",
      "TypeScript",
      "React.js",
      "Next.js",
      "C / C++",
      "HTML5",
      "CSS3",
    ],
  },
  {
    label: "UI & Application Architecture",
    description:
      "Building interfaces that stay maintainable as products and feature sets grow.",
    items: [
      "Redux Toolkit",
      "Context API",
      "Material UI",
      "Bootstrap",
      "Canvas API",
      "PWA",
      "Responsive Design",
      "Component Architecture",
    ],
  },
  {
    label: "APIs, Real Time & Developer Tools",
    description:
      "Connecting frontend experiences to the services and systems behind them.",
    items: [
      "RESTful APIs",
      "Socket.io",
      "Firebase Cloud Messaging",
      "Postman",
      "Git & GitHub",
      "Webpack",
      "NPM",
    ],
  },
  {
    label: "Cloud & Deployment",
    description:
      "Taking applications beyond local development and into production.",
    items: [
      "AWS Amplify",
      "Route 53",
      "IAM",
      "Vercel",
      "Hostinger",
      "DNS Configuration",
      "Agile / Scrum",
    ],
  },
  {
    label: "Authentication, Payments & Access",
    description:
      "Implementing product critical flows where security and reliability matter.",
    items: [
      "OAuth 2.0",
      "Stripe",
      "PayPal",
      "MTN Mobile Money",
      "RBAC",
      "Subscription Management",
    ],
  },
  {
    label: "Engineering Practices",
    description:
      "The qualities I focus on beyond simply making a feature work.",
    items: [
      "Performance Optimization",
      "Accessibility (a11y)",
      "Cross-Browser Compatibility",
      "Code Review",
      "Internationalisation (i18n)",
      "SDLC",
    ],
  },
];

export const experience = [
  {
    company: "CIS, Cyber Infrastructure",
    role: "Software Developer",
    period: "April 2024 – June 2026",

    summary:
      "Worked on production web applications across multiple product domains, with a strong focus on frontend architecture, complex integrations, responsive experiences, and end-to-end feature delivery.",

    highlights: [
      "Took ownership of the **Accommodation Module frontend**, acting as the frontend lead and primary client liaison. I translated business requirements into technical solutions, coordinated with backend developers, and owned frontend delivery from architecture through production.",
      "Built and shipped **5+ production grade applications** using React.js, Next.js, and TypeScript, working on workflows involving bookings, payments, subscriptions, real time communication, authentication, notifications, and internationalisation.",
      "Designed reusable, component driven interfaces with a focus on **responsive behaviour, cross browser compatibility, maintainability, and production performance** rather than one off page implementations.",
      "Integrated complex third party services including **Stripe, PayPal, MTN Mobile Money, OAuth providers, Socket.io, Firebase Cloud Messaging, and subscription systems**.",
      "Worked across the application delivery lifecycle — from requirement discussions and API integration to testing, deployment, issue resolution, and production releases.",
      "Managed deployment and cloud related responsibilities using **AWS Amplify, Route 53, Vercel, DNS configuration, and IAM**, developing practical experience beyond the frontend layer.",
      "Collaborated closely with **UI/UX designers, QA engineers, backend developers, and clients** within Agile/Scrum workflows to turn product requirements into reliable, user facing features.",
    ],

    tech: [
      "React.js",
      "Next.js",
      "TypeScript",
      "AWS Amplify",
      "Vercel",
      "Socket.io",
      "REST APIs",
      "Agile",
      "Scrum",
    ],
  },
];

export const projects = [
  {
    name: "Accommodation Module",
    subtitle: "Airbnb style rental platform · **Frontend Lead / Team Lead**",

    description:
      "A full featured accommodation platform designed around two distinct user experiences: a **Customer App** for discovering and booking stays, and a **Vendor App** for managing properties, pricing, and availability. The product combines marketplace style discovery with real time communication, payments, role based access, and multilingual support.",

    detail:
      "As frontend lead, I worked across the product lifecycle — translating requirements into frontend architecture, coordinating with the backend team, and driving frontend delivery. The platform included **search and booking flows, map based discovery, live chat, real time availability, promo codes, social authentication, multi-language support, and PWA delivery**.",

    challenge:
      "The product required multiple complex systems to work together without making the user experience feel fragmented — from booking and availability to payments, authentication, and real time messaging.",

    approach:
      "Built the application with **Next.js and TypeScript**, using Socket.io for real time communication and availability updates, integrated multiple payment providers, implemented OAuth based authentication and RBAC, and delivered the application as a PWA on Vercel.",

    tech: [
      "Next.js",
      "TypeScript",
      "Socket.io",
      "Stripe",
      "PayPal",
      "MTN Mobile Money",
      "PWA",
      "OAuth",
      "i18n",
      "RBAC",
      "Vercel",
    ],
  },

  {
    name: "AI Cancer Consultation Platform",
    subtitle: "AI powered healthcare experience",

    description:
      "A healthcare focused platform built around an AI consultation experience, where users can communicate in real time, continue assessment sessions, and move through structured symptom assessment workflows without losing their progress.",

    detail:
      "I worked on the frontend experience using **React.js, Next.js, TypeScript, and Socket.io**, including real time chat, multi session tracking, resumable assessment forms, subscription based access, and Firebase Cloud Messaging notifications.",

    challenge:
      "The interface needed to support an ongoing conversational experience while also handling structured assessment data and subscription restrictions without interrupting the user journey.",

    approach:
      "Combined real time Socket.io communication with structured frontend state and resumable workflows, added push notifications through **Firebase Cloud Messaging**, and deployed the application using **AWS Amplify**.",

    tech: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Socket.io",
      "Firebase Cloud Messaging",
      "Subscription Management",
      "AWS Amplify",
    ],
  },

  {
    name: "Dine App",
    subtitle: "Restaurant booking & ordering platform",

    description:
      "A restaurant platform combining **table reservations and food ordering** into a single digital experience. Customers can reserve tables, customise food orders, apply promotional codes, and complete payments, while vendors can manage venues and menus.",

    detail:
      "Built as a full stack **Next.js** application with Stripe payment integration, Redux Toolkit for application state, Material UI for interface development, and Postman for API testing and integration.",

    challenge:
      "The product brought together several transactional workflows — reservations, food customisation, promotions, payments, and real time order tracking — while maintaining a straightforward customer experience.",

    approach:
      "Developed reusable frontend flows for customer and vendor experiences, integrated REST APIs and Stripe payments, and implemented the vendor side management workflows for venues, menus, and orders.",

    tech: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Stripe",
      "Redux Toolkit",
      "Material UI",
      "Postman",
    ],
  },

  {
    name: "Social Platform for Mental Wellness",
    subtitle: "Community, messaging & live video",

    description:
      "A community driven social platform designed around connection and engagement, combining moderated forums, private messaging, live video experiences, interactive stories, and role based access.",

    detail:
      "Developed frontend experiences using **React.js and Next.js**, integrating Socket.io for private messaging, Firebase Cloud Messaging for notifications, Canvas API for story creation, and the Banuba SDK for AR filters during live video calls.",

    challenge:
      "The platform combined several highly interactive experiences — messaging, live video, stories, notifications, and moderated community spaces — requiring consistent real time behaviour across the product.",

    approach:
      "Integrated real time communication with Socket.io, built interactive story creation using the **Canvas API**, added AR capabilities through **Banuba SDK**, and implemented push notifications and RBAC for a more controlled community experience.",

    tech: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Socket.io",
      "Canvas API",
      "Banuba SDK",
      "Firebase Cloud Messaging",
      "RBAC",
    ],
  },
];

export const portfolioStats = [
  {
    value: "2+",
    label: "Years of Industry Experience",
  },
  {
    value: "5+",
    label: "Production Applications Shipped",
  },
  {
    value: "10+",
    label: "Technologies & Integrations Used",
  },
  {
    value: "AWS",
    label: "Certified Solutions Architect",
  },
];

export const strengths = [
  {
    title: "Ownership",
    description:
      "I am comfortable taking a feature from an ambiguous requirement to a production ready implementation and coordinating with the people needed to ship it.",
  },
  {
    title: "Product Thinking",
    description:
      "I focus on how a feature works for the person using it, not only how it looks in the codebase.",
  },
  {
    title: "Technical Range",
    description:
      "My experience spans UI architecture, APIs, real time systems, authentication, payments, cloud deployment, and production delivery.",
  },
  {
    title: "Collaboration",
    description:
      "I work closely with clients, designers, backend developers, and QA to turn ideas into features that are practical, testable, and shippable.",
  },
];

export const chapters = [
  { id: "start", label: "Start" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

