const projectsData = [
  {
    id: 1,
    title: "Learnify",
    shortDesc: "AI-powered online course learning platform with personalized, adaptive content using LangChain.",
    fullDesc:
      "Learnify is an AI-powered platform providing personalized and interactive learning. It uses a fine-tuned LangChain model integrated with a modified API to deliver adaptive content, answer queries, and recommend learning paths. The platform features a responsive React frontend with a dynamic course dashboard, real-time AI-driven quiz generation, and progress tracking — all tailored to each learner's pace and goals.",
    tech: ["React", "LangChain", "AI APIs", "JavaScript"],
    date: "Nov 2025",
    github: "https://github.com/rayappan",
    live: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Zesto",
    shortDesc: "Responsive online food ordering system with product management, cart, and checkout features.",
    fullDesc:
      "Zesto is a full-featured food ordering web application built with React JS. It features a beautiful restaurant menu with categories, a dynamic shopping cart with quantity management, and integrated product, cart, and checkout functionality. The app is fully responsive, optimized for all screen sizes, and delivers a seamless ordering experience from browsing to checkout.",
    tech: ["React JS", "CSS3", "Context API", "LocalStorage"],
    date: "Feb 2024",
    github: "https://github.com/rayappan",
    live: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Ambulance Detection System",
    shortDesc: "Real-time ambulance detection via mobile camera using DroidCam, OpenCV and YOLOv8.",
    fullDesc:
      "A real-time system detecting ambulances via mobile camera using DroidCam, OpenCV, and YOLOv8. The system streams live camera feed, runs YOLOv8 object detection to identify emergency vehicles with high accuracy, and triggers alerts for smart traffic management. Includes a web dashboard showing detection confidence scores, bounding box overlays, and alert history logs.",
    tech: ["Python", "OpenCV", "YOLOv8", "DroidCam", "Flask"],
    date: "Sep 2024",
    github: "https://github.com/rayappan",
    live: "#",
    featured: false,
  },
];

export default projectsData;
