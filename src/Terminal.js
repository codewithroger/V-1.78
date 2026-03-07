import React, { useEffect, useRef, useState } from "react";

export default function Terminal() {
  const [state, setState] = useState("BOOT"); // BOOT | LOGIN | MENU | SUBMENU | SCREEN | EXIT
  const [lines, setLines] = useState([]);
  const [submenuOptions, setSubmenuOptions] = useState([]);
  const [submenuCallback, setSubmenuCallback] = useState(() => {});
  const [cursorVisible, setCursorVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [userName, setUserName] = useState("");
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [sessionTime, setSessionTime] = useState(0);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // ------------------ BOOT LINES ------------------
  const bootLines = [
    "HP FINANCIAL SYSTEMS TERMINAL v1.0",
    "Initializing Automation & Support Modules...",
    "Loading System Utilities...",
    "System Ready.",
    "",
    "Yogesh Gurunath Hitnalli",
    "Associate Software Engineer",
    "Linux | Python | SQL ",
    "",
    "Launching profile..."
  ];

  // ------------------ DATA ------------------
  const projects = [
    {
      name: "HearAid",
      desc: [
        "Empowering the Deaf and Hard of Hearing with Real-Time Sound Awareness",
        "- Implemented real-time sound classification (e.g., alarms, baby cries, glass breaking).",
        "- Developed known voice recognition for personalized interaction.",
        "-  Technology Used: Machine Learning, Flutter, REST API.",
      ],
      github: "https://github.com/harrypaul/ai-finance"
    },
    {
      name: "Blockchain-Based Voting System",
      desc: [
        "A blockchain-based voting system designed for secure elections",
        "– Integrated MetaMask, Volta Energy Network, and Solidity for secure, transparent elections.",
        "– Addressed both technical implementation and regulatory compliance challenges.",
        "– Technology Used: React.js, Solidity, Hardhat."
      ],
      github: "https://github.com/harrypaul/cashflow"
    },
  ];

  const experience = [
    {
      name: "Production Support Analysis ",
      Company: "Alliance Bernstein",
      details: [
        "- I possess expertise in ITIL incident management, problem management, and change management which enables me to maintain operational stability.",

"- I have expertise in Control-M and ServiceNow and Jira which I use for automation and issue tracking.", 

"- I have acquired extensive practical knowledge of SQL and UNIX and Linux and Windows Server which I use for troubleshooting and root cause analysis.",

"- I have experience in coordinating software releases and performing disaster recovery testing and creating audit-compliant documentation.", 

"- I collaborate effectively with business stakeholders and technical stakeholders to reduce project impact while implementing ongoing improvements."
      ]
    },
    {
      name: "Machine Learning Internship",
      Company:"IIT Bombay"  ,
      details: [
        "- Designed automated monitoring tools for reporting.",
        "- Reduced manual reporting workload by 80%.",
        "- Documented processes and optimized workflows.",
        "- Implemented CI/CD pipelines for automation.",
        "- Created reusable templates for future projects."
      ]
    }
  ];

  const aboutInfo = [
    "Yogesh is a Software Engineer professional with expertise in:",
   "- Mission-critical banking and capital markets applications.",
   "- Skilled in ITIL-based incident, problem, and change management for operational stability.",
   "- Proficient in Control-M, ServiceNow, and Jira for automation and issue tracking.",
   "- Strong hands-on experience in SQL, UNIX, Linux, and Windows Server for troubleshooting and root cause analysis.",
   "- Experienced in release coordination, disaster recovery (DR) testing, and audit-compliant documentation.",
   "- Effective collaborator with business and technical stakeholders to minimize impact and drive continuous improvement.", 
    "",
  
  ];

  const skills = [
    {
      category: "Programming",
      items: [
        { name: "Python", level: "90%", color: "#3776AB" },
        { name: "SQL", level: "85%", color: "#E34C26" },
        { name: "Java", level: "80%", color: "#217346" }
      ]
    },
    {
      category: "web Technology",
      items: [
        { name: "HTML and CSS", level: "85%", color: "#FF6B6B" },
        { name: "JavaScript", level: "90%", color: "#4ECDC4" },
        { name: "React", level: "75%", color: "#FFE66D" }
      ]
    },
    {
      category: "Tools",
      items: [
        { name: "Control M", level: "95%", color: "#217346" },
        { name: "Jira", level: "80%", color: "#F05032" },
        { name: "ServiceNow", level: "70%", color: "#F2C811" }
      ]
    }
  ];

  // ------------------ CLOCK ------------------
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", { 
        hour12: false, 
        hour: "2-digit", 
        minute: "2-digit",
        second: "2-digit"
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // ------------------ SESSION TIMER ------------------
  useEffect(() => {
    if (state !== "BOOT" && state !== "LOGIN" && state !== "EXIT") {
      const interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [state]);

  // ------------------ CURSOR BLINK ------------------
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible(prev => !prev), 500);
    return () => clearInterval(blink);
  }, []);

  // ------------------ SMOOTH SCROLL ------------------
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [lines]);

  // ------------------ BOOT SEQUENCE ------------------
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLines(prev => [...prev, bootLines[i]]);
      i++;
      if (i >= bootLines.length) {
        clearInterval(interval);
        setTimeout(() => showLogin(), 1000);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // ------------------ LOGIN ------------------
  const showLogin = () => {
    setLines([
      "",
      "HP FINANCIAL SYSTEMS TERMINAL v1.0",
      "---------------------------------------",
      "",
      "Enter your name to continue:",
      ""
    ]);
    setState("LOGIN");
    inputRef.current?.focus();
  };

  const handleLogin = (name) => {
    if (name.trim()) {
      setUserName(name.trim());
      setTimeout(() => showMenu(), 500);
    }
  };

  // ------------------ MENU ------------------
  const showMenu = () => {
    setLines([]);
    setTimeout(() => {
      setLines([
        "",
        "MAIN EXECUTION MENU",
        "-------------------------",
        "1 . HERO",
        "2 . ABOUT",
        "3 . PROJECTS",
        "4 . SKILLS",
        "5 . EXPERIENCE",
        "",
        "Select option:",
        "",

      ]);
      setState("MENU");
      inputRef.current?.focus();
    }, 300);
  };

  const openScreen = (title, content) => {
    setLines([title, "-------------------------", ...content, "", "Press 0 to return"]);
    setState("SCREEN");
    inputRef.current?.focus();
  };

  const openSubmenu = (options, callback) => {
    setSubmenuOptions(options);
    setSubmenuCallback(() => callback);
    setLines([
      "",
      "Select an option:",
      "-------------------------",
      ...options.map((o, i) => `${i + 1} - ${o.name}`),
      "",
      "Press 0 to return"
    ]);
    setState("SUBMENU");
    inputRef.current?.focus();
  };

  // ------------------ COMMAND HANDLER ------------------
  const handleCommand = (inputValue) => {
    const cmd = inputValue.trim().toUpperCase();
    if (!cmd) return;

    // Add to history
    if (inputValue.trim()) {
      setHistory(prev => [inputValue.trim(), ...prev]);
      setHistoryIndex(-1);
    }

    // Handle Login State
    if (state === "LOGIN") {
      handleLogin(inputValue);
      return;
    }

    if (state === "MENU") {
      switch (cmd) {
        case "1":
  openScreen("HERO", [
    "👋 Hi, I'm Yogesh — Associate Software Engineer at Hexaware Technologies",
    "",
    "🎓 B.Tech in Computer Engineering from D.Y. Patil College of Engineering",
    "💻 Skilled in SQL, UNIX/Linux, Windows Server, Control-M, ServiceNow & Jira",
    "🎯 Mission: Deliver stability and innovation in banking & capital markets",
    "💡 Philosophy: Automation and efficiency drive continuous improvement",
    "🚀 Goal: Build scalable, audit-compliant systems that solve real-world problems",
    "🌟 Strength: Collaborating with stakeholders to ensure high availability and operational excellence"
  ]);

          break;
        case "2":
          openScreen("ABOUT", aboutInfo);
          break;
        case "3":
          openSubmenu(projects, (p) =>
            openScreen(p.name, [...p.desc, `GitHub: ${p.github}`])
          );
          break;
        case "4":
          openScreen("SKILLS", [
            "📊 SKILLS OVERVIEW",
            "========================",
            "",
            "🔹 PROGRAMMING",
            "========================",
            ...skills[0].items.map(s => `${s.name.padEnd(15)} [${s.level.padEnd(6)}] ${"█".repeat(Math.floor(parseInt(s.level)/10))}`),
            "",
 "",
            "🔹 WEB TECHNOLOGY",
            "========================",
            ...skills[1].items.map(s => `${s.name.padEnd(15)} [${s.level.padEnd(6)}] ${"█".repeat(Math.floor(parseInt(s.level)/10))}`),
            "",


            "🔹 TOOLS",
            "========================",
            ...skills[2].items.map(s => `${s.name.padEnd(15)} [${s.level.padEnd(6)}] ${"█".repeat(Math.floor(parseInt(s.level)/10))}`),
            "",
           
          ]);
          break;
        case "5": openSubmenu(experience, (e) => openScreen(e.name, [ ` Company: ${e.Company}`, ...e.details ]) ); break;
        case "HELP":
          setLines(prev => [...prev, "HELP MENU"]);
          setLines(prev => [...prev, "-------------------------"]);
          setLines(prev => [...prev, "Navigation Commands:"]);
          setLines(prev => [...prev, "  1-5  - Select menu option"]);
          setLines(prev => [...prev, "  0    - Return to main menu"]);
          setLines(prev => [...prev, ""]);
          setLines(prev => [...prev, "System Commands:"]);
          setLines(prev => [...prev, "  DATE   - Show current date/time"]);
          setLines(prev => [...prev, "  WHOAMI - Show your username"]);
          setLines(prev => [...prev, "  EXIT   - End session"]);
          setLines(prev => [...prev, ""]);
        
          break;
        case "DATE":
        case "TIME":
          setLines(prev => [...prev, new Date().toString()]);
          break;
        case "WHOAMI":
          setLines(prev => [...prev, `User: ${userName}`]);
          break;
        case "EXIT":
        case "LOGOUT":
          setLines(prev => [...prev, "Session ended. Refresh to restart."]);
          setState("EXIT");
          break;
        case "REBOOT":
          setLines([]);
          setState("BOOT");
          break;
        case "VER":
          setLines(prev => [...prev, " Terminal v1.79"]);
          break;
        case "THANKS":
          setLines(prev => [...prev, "Thanks for using HP Terminal! "]);
          break;
        default:
          setLines(prev => [...prev, "INVALID OPTION"]);
      }
    } else if (state === "SUBMENU") {
      if (cmd === "0") return showMenu();
      const idx = parseInt(cmd) - 1;
      if (idx >= 0 && idx < submenuOptions.length) submenuCallback(submenuOptions[idx]);
      else setLines(prev => [...prev, "INVALID OPTION"]);
    } else if (state === "SCREEN" && cmd === "0") {
      showMenu();
    }
  };

  // ------------------ KEYBOARD HANDLER ------------------
  const handleKeyDown = (e) => {
    // Handle Enter
    if (e.key === "Enter") {
      handleCommand(e.target.value);
      setInput("");
      e.target.value = "";
      return;
    }

    // Handle Arrow Up (History)
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < history.length) {
          setHistoryIndex(newIndex);
          e.target.value = history[newIndex];
        }
      }
      return;
    }

    // Handle Arrow Down (History)
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        e.target.value = history[newIndex];
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        e.target.value = "";
      }
      return;
    }

    // Handle Keyboard Shortcuts
    if (e.ctrlKey) {
      if (e.key === "c" || e.key === "C") {
        e.preventDefault();
        setInput("");
        e.target.value = "";
        return;
      }
      if (e.key === "h" || e.key === "H") {
        e.preventDefault();
        setLines(prev => [...prev, "HELP MENU"]);
        setLines(prev => [...prev, "-------------------------"]);
        setLines(prev => [...prev, "Navigation Commands:"]);
        setLines(prev => [...prev, "  1-5  - Select menu option"]);
        setLines(prev => [...prev, "  0    - Return to main menu"]);
        setLines(prev => [...prev, ""]);
        setLines(prev => [...prev, "System Commands:"]);
        setLines(prev => [...prev, "  DATE   - Show current date/time"]);
        setLines(prev => [...prev, "  WHOAMI - Show your username"]);
        setLines(prev => [...prev, "  EXIT   - End session"]);
        setLines(prev => [...prev, ""]);
        setLines(prev => [...prev, "💡 TIP: Use Arrow Up/Down for command history"]);
        return;
      }
    }
  };

  // ------------------ FOCUS INPUT ------------------
  useEffect(() => {
    inputRef.current?.focus();
  }, [lines, state]);

  // ------------------ GET PROMPT ------------------
  const getPrompt = () => {
    if (state === "LOGIN") {
      return "LOGIN:";
    }
    if (userName) {
      return `${userName}`;
    }
    return "HP Terminal";
  };

  // ------------------ FORMAT TIME ------------------
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // ------------------ RENDER ------------------
  return (
    <div
      ref={terminalRef}
      style={{
        background: "#000000",
        color: "#f5f5f5",
        fontFamily: 'Meslo NF',
        padding: "20px",
        minHeight: "90vh",
        lineHeight: "1.6",
        overflowY: "auto"
      }}
    >
      {/* CRT Scanline Effect */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)",
        backgroundSize: "100% 2px",
        pointerEvents: "none",
        zIndex: 100,
        opacity: 0.15
      }} />

      {/* TOP: Time and Status */}
      <div style={{
        borderBottom: "1px solid #333",
        paddingBottom: "5px",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        color: "#666",
        fontSize: "12px"
      }}>
        <span>HP Terminal</span>
        <span>{currentTime} | {formatTime(sessionTime)} | CONNECTED</span>
      </div>

      <div style={{ whiteSpace: "pre-wrap", minHeight: "400px" }}>
        {lines.join("\n")}
      </div>
      
      {/* BOTTOM: Input with Prompt */}
      <div style={{ display: "flex", alignItems: "center", marginTop: "195px", position: "relative" }}>
        <span style={{ color: "#00ff00" }}>{getPrompt()}> </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          style={{
            background: "transparent",
            border: "none",
            color: "#f5f5f5",
            outline: "none",
            fontFamily: "'Fantasque Sans Mono', 'Fira Code', monospace",
            width: "80%"
          }}
          autoComplete="off"
          spellCheck="false"
        />
        <span style={{ visibility: cursorVisible ? "visible" : "hidden" }}>_</span>
      </div>

      
    </div>
  );
}
