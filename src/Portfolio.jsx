import React, { useState, useEffect, useRef } from 'react';
import {
    Terminal,
    Server,
    Database,
    Cloud,
    Code,
    Cpu,
    ShieldCheck,
    ExternalLink,
    Github,
    Linkedin,
    Mail,
    ChevronDown,
    Menu,
    X,
    FileText,
    Award,
    Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA BASED ON YOUR CV (Translated to English) ---
const profile = {
    name: "Francisco Flores Enríquez",
    title: "Cloud System Engineer Associate",
    subtitle: "CloudOps | AWS | Linux Administration",
    summary: "Cloud System Engineer Associate with hands-on experience in AWS cloud operations, Linux administration, monitoring, and IaC. Specialized in maintaining high-availability environments, executing operational runbooks, and resolving incidents.",
    email: "franciscofloresenriquez2001@gmail.com",
    linkedin: "https://www.linkedin.com/in/francisco-flores-89230b25b/",
    github: "https://github.com/franciscofloresen",
    location: "Tlaquepaque, Jalisco / Remote"
};

const skills = {
    cloud: [
        { name: "AWS Lambda", level: 90 },
        { name: "EC2 & VPC", level: 85 },
        { name: "CloudWatch", level: 90 },
        { name: "S3 & CloudFront", level: 85 },
        { name: "IAM & Security", level: 80 }
    ],
    devops: [
        { name: "Terraform (IaC)", level: 85 },
        { name: "GitHub Actions", level: 80 },
        { name: "Docker", level: 75 },
        { name: "CI/CD Pipelines", level: 80 }
    ],
    system: [
        { name: "Linux Admin", level: 85 },
        { name: "Bash Scripting", level: 80 },
        { name: "Python Automation", level: 90 },
        { name: "Networking", level: 75 }
    ],
    backend: [
        { name: "Flask / Node.js", level: 80 },
        { name: "Aurora MySQL", level: 75 },
        { name: "DynamoDB", level: 70 },
        { name: "REST APIs", level: 85 }
    ]
};

const experience = [
    {
        role: "Freelance Cloud & Systems Engineer",
        company: "Various Clients (Remote)",
        period: "2023 - Present",
        desc: [
            "Managed AWS cloud environments, performing monitoring, incident investigation, and troubleshooting for serverless applications.",
            "Executed operational tasks: log analysis in CloudWatch, API debugging, and system updates/patching.",
            "Optimized backend services using AWS Lambda, App Runner, S3, and Aurora MySQL.",
            "Automated infrastructure provisioning using Terraform for consistent deployments.",
            "Implemented secure authentication flows and ensured SLA compliance."
        ]
    }
];

const projects = [
    {
        title: "Med & Beauty - Web Catalog",
        tech: ["Terraform", "AWS Lambda", "DynamoDB", "Cognito", "CloudFront"],
        desc: "Serverless product catalog architected on AWS. Implements JWT auth via Cognito, Role-Based Access Control (RBAC) for admins, and a CRUD API using Lambda/DynamoDB. Optimized for cost (<$0.50/mo) using S3/CloudFront hosting.",
        link: "https://distribuidoramedandbeauty.com",
        type: "Serverless Architecture"
    },
    {
        title: "Serverless Portfolio with AI",
        tech: ["AWS Amplify", "Python", "OpenAI API", "React"],
        desc: "Managed full lifecycle of an Amplify-hosted application. Integrated Python Lambda functions with OpenAI API for an intelligent chatbot.",
        link: "https://main.dd5vs7yyk3xwx.amplifyapp.com",
        type: "Full Stack Cloud"
    },
    {
        title: "Snake Game in C",
        tech: ["C", "Low-level Systems", "Memory Mgmt"],
        desc: "Low-level application demonstrating deep understanding of CPU operations, pointers, and memory management.",
        link: "#",
        type: "Systems Programming"
    }
];

const certifications = [
    { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "Oct 2025" },
    { name: "AWS Academy Graduate - Cloud Web App Builder", issuer: "Amazon Web Services", date: "Oct 2025" },
    { name: "Cypher & Neo4j Fundamentals", issuer: "Neo4j", date: "Mar/Apr 2025" },
    { name: "Cisco Python Essentials 1", issuer: "Cisco Networking Academy", date: "Dec 2022" }
];

// --- COMPONENTS ---

const NavLink = ({ href, children, mobile, onClick }) => (
    <a
        href={href}
        onClick={onClick}
        className={`${mobile ? 'block py-2 text-lg' : 'text-sm font-medium'} text-slate-300 hover:text-cyan-400 transition-colors uppercase tracking-widest`}
    >
        {children}
    </a>
);

const SectionTitle = ({ title, icon: Icon }) => (
    <div className="flex items-center gap-3 mb-8 border-b border-slate-700 pb-4">
        <Icon className="text-cyan-400 w-6 h-6" />
        <h2 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">{title}</h2>
    </div>
);

const SkillBar = ({ name, level }) => (
    <div className="mb-4">
        <div className="flex justify-between mb-1">
            <span className="text-slate-300 text-sm font-mono">{name}</span>
            <span className="text-cyan-400 text-xs font-mono">{level}%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${level}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-gradient-to-r from-cyan-600 to-blue-500 h-2 rounded-full"
            />
        </div>
    </div>
);

const TerminalWindow = () => {
    const [lines, setLines] = useState([]);
    const [currentLine, setCurrentLine] = useState('');
    const scrollRef = useRef(null);

    useEffect(() => {
        // Function to run the terminal sequence with IP fetching
        const runTerminalSequence = async () => {
            let userIp = "127.0.0.1"; // Fallback IP

            // 1. Initial boot lines
            const initialSequence = [
                { text: "init cloud_profile --user=francisco", type: "input", delay: 30 },
                { text: "Loading user configuration...", type: "output", color: "text-slate-400" },
                { text: "[OK] AWS_ACCESS_KEY_ID loaded", type: "output", color: "text-green-400" },
                { text: "[OK] Region: us-east-1 configured", type: "output", color: "text-green-400" },
                { text: "terraform plan", type: "input", delay: 50 },
                { text: "Acquiring state lock...", type: "output", color: "text-slate-400" },
                { text: "  + module.portfolio_infrastructure", type: "output", color: "text-green-300" },
                { text: "Plan: 3 to add, 0 to change.", type: "output", color: "text-cyan-300" },
            ];

            // Helper to process a list of steps
            const processSteps = async (steps) => {
                for (const step of steps) {
                    if (step.type === 'input') {
                        // Typewriter effect
                        for (let i = 0; i < step.text.length; i++) {
                            setCurrentLine(prev => prev + step.text[i]);
                            await new Promise(r => setTimeout(r, step.delay + Math.random() * 20));
                        }
                        // Press enter
                        await new Promise(r => setTimeout(r, 300));
                        setLines(prev => [...prev, { ...step, text: `> ${step.text}` }]);
                        setCurrentLine('');
                    } else {
                        // Instant output
                        setLines(prev => [...prev, step]);
                        await new Promise(r => setTimeout(r, 150));
                    }
                }
            };

            // Run initial part
            await processSteps(initialSequence);

            // 2. Fetch IP while "processing"
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                if (data.ip) userIp = data.ip;
            } catch (error) {
                console.error("IP fetch failed", error);
            }

            // 3. Final sequence with IP
            const finalSequence = [
                { text: "./identify_visitor.sh", type: "input", delay: 30 },
                { text: "Analyzing network traffic...", type: "output", color: "text-yellow-300" },
                { text: `Visitor IP detected: ${userIp}`, type: "output", color: "text-blue-400" },
                { text: `Hi ${userIp}! Welcome to my CloudOps portfolio.`, type: "output", color: "text-green-400 font-bold" },
                { text: "Status: ONLINE | Waiting for input...", type: "output", color: "text-white mt-2 border-t border-slate-700 pt-2" },
            ];

            await processSteps(finalSequence);
        };

        runTerminalSequence();

    }, []);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines, currentLine]);

    return (
        <div className="bg-slate-900 rounded-lg shadow-2xl overflow-hidden border border-slate-700 font-mono text-xs md:text-sm w-full max-w-lg h-[320px] flex flex-col relative group hover:border-cyan-700 transition-colors">
            {/* Title Bar */}
            <div className="bg-slate-800 px-4 py-2 flex gap-2 items-center border-b border-slate-700 shrink-0 z-10">
                <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"></div>
                <span className="ml-2 text-slate-400 text-xs flex items-center gap-1">
          <Terminal size={10} /> francisco@cloud-ops:~
        </span>
            </div>

            {/* Content Area */}
            <div
                ref={scrollRef}
                className="p-4 text-slate-300 flex-1 overflow-y-auto font-mono scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
            >
                {lines.map((line, i) => (
                    <div key={i} className={`${line.color || 'text-slate-300'} mb-1 break-words leading-tight`}>
                        {line.text}
                    </div>
                ))}

                {/* Active Input Line */}
                <div className="flex text-cyan-400 items-center min-h-[1.5rem]">
                    <span className="mr-2 font-bold">{'>'}</span>
                    <span>{currentLine}</span>
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="w-2 h-4 bg-cyan-400 ml-1 inline-block"
                    />
                </div>
            </div>
        </div>
    );
};

export default function Portfolio() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500 selection:text-white">

            {/* Navbar */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-3' : 'bg-transparent py-6'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tighter text-white">
                        <Cloud className="text-cyan-400" />
                        <span>CLOUD<span className="text-cyan-400">OPS</span>.FF</span>
                    </div>

                    <div className="hidden md:flex gap-8">
                        <NavLink href="#about">Profile</NavLink>
                        <NavLink href="#skills">Skills</NavLink>
                        <NavLink href="#projects">Projects</NavLink>
                        <NavLink href="#experience">Experience</NavLink>
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden"
                        >
                            <div className="px-6 py-4 flex flex-col gap-2">
                                <NavLink mobile href="#about" onClick={() => setIsOpen(false)}>Profile</NavLink>
                                <NavLink mobile href="#skills" onClick={() => setIsOpen(false)}>Skills</NavLink>
                                <NavLink mobile href="#projects" onClick={() => setIsOpen(false)}>Projects</NavLink>
                                <NavLink mobile href="#experience" onClick={() => setIsOpen(false)}>Experience</NavLink>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Hero Section */}
            <header id="about" className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
                {/* Background Grid Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

                <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-800 text-cyan-400 text-xs font-mono mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
                            Available for Hire
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Francisco <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                Flores Enríquez
              </span>
                        </h1>
                        <p className="text-xl text-slate-400 mb-8 max-w-lg leading-relaxed">
                            {profile.title} | {profile.subtitle}.
                            Specialist in building scalable, secure, and automated cloud infrastructure.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="#contact" className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-cyan-900/20 flex items-center gap-2">
                                <Mail size={18} /> Contact
                            </a>
                            <a href={profile.github} target="_blank" rel="noreferrer" className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg font-medium transition-all flex items-center gap-2">
                                <Github size={18} /> GitHub
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex justify-center md:justify-end"
                    >
                        <TerminalWindow />
                    </motion.div>
                </div>

                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-500">
                    <ChevronDown />
                </div>
            </header>

            {/* Skills Section */}
            <section id="skills" className="py-20 bg-slate-900/50">
                <div className="container mx-auto px-6">
                    <SectionTitle title="Technical Arsenal" icon={Cpu} />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-cyan-800 transition-colors">
                            <div className="flex items-center gap-3 mb-6 text-cyan-400">
                                <Cloud />
                                <h3 className="font-bold text-lg text-white">Cloud & AWS</h3>
                            </div>
                            {skills.cloud.map(s => <SkillBar key={s.name} {...s} />)}
                        </div>

                        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-cyan-800 transition-colors">
                            <div className="flex items-center gap-3 mb-6 text-purple-400">
                                <Code />
                                <h3 className="font-bold text-lg text-white">DevOps & IaC</h3>
                            </div>
                            {skills.devops.map(s => <SkillBar key={s.name} {...s} />)}
                        </div>

                        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-cyan-800 transition-colors">
                            <div className="flex items-center gap-3 mb-6 text-green-400">
                                <Terminal />
                                <h3 className="font-bold text-lg text-white">System Admin</h3>
                            </div>
                            {skills.system.map(s => <SkillBar key={s.name} {...s} />)}
                        </div>

                        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-cyan-800 transition-colors">
                            <div className="flex items-center gap-3 mb-6 text-yellow-400">
                                <Database />
                                <h3 className="font-bold text-lg text-white">Backend</h3>
                            </div>
                            {skills.backend.map(s => <SkillBar key={s.name} {...s} />)}
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20">
                <div className="container mx-auto px-6">
                    <SectionTitle title="Featured Deployments" icon={Server} />

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className="group bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-cyan-700 transition-all shadow-lg"
                            >
                                <div className="h-2 bg-gradient-to-r from-cyan-600 to-blue-600"></div>
                                <div className="p-8">
                                    <div className="text-xs font-mono text-cyan-400 mb-2">{project.type}</div>
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                        {project.desc}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tech.map(t => (
                                            <span key={t} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded border border-slate-700">
                        {t}
                      </span>
                                        ))}
                                    </div>
                                    <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-cyan-400 transition-colors">
                                        View Project <ExternalLink size={14} />
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience & Certs */}
            <section id="experience" className="py-20 bg-slate-900/30">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16">

                    {/* Experience Column */}
                    <div>
                        <SectionTitle title="Professional Experience" icon={ShieldCheck} />
                        <div className="relative border-l-2 border-slate-800 ml-3 space-y-12">
                            {experience.map((exp, idx) => (
                                <div key={idx} className="relative pl-8">
                                    <span className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-500"></span>
                                    <div className="mb-1 text-sm text-cyan-400 font-mono">{exp.period}</div>
                                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                                    <div className="text-slate-400 mb-4 font-medium">{exp.company}</div>
                                    <ul className="space-y-3">
                                        {exp.desc.map((item, i) => (
                                            <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
                                                <span className="text-cyan-500 mt-1">▹</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Certifications & Education Column */}
                    <div>
                        <SectionTitle title="Certifications & Education" icon={Award} />

                        <div className="space-y-4 mb-12">
                            {certifications.map((cert, idx) => (
                                <div key={idx} className="flex items-center p-4 bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-600 transition-colors">
                                    <div className="bg-cyan-950/50 p-3 rounded-full mr-4 text-cyan-400">
                                        <Award size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">{cert.name}</h4>
                                        <p className="text-sm text-slate-400">{cert.issuer} • {cert.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="text-cyan-400">#</span> Education
                        </h3>
                        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                            <h4 className="text-lg font-bold text-white">Computer Systems Engineering</h4>
                            <p className="text-slate-400">ITESO - Tlaquepaque, Jalisco</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* Footer / Contact */}
            <footer id="contact" className="py-20 border-t border-slate-900 bg-slate-950">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-8">Ready to deploy?</h2>
                    <div className="flex justify-center gap-6 mb-12">
                        <a href={`mailto:${profile.email}`} className="p-4 bg-slate-900 rounded-full text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-all border border-slate-800">
                            <Mail size={24} />
                        </a>
                        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="p-4 bg-slate-900 rounded-full text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-all border border-slate-800">
                            <Linkedin size={24} />
                        </a>
                        <a href={profile.github} target="_blank" rel="noreferrer" className="p-4 bg-slate-900 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all border border-slate-800">
                            <Github size={24} />
                        </a>
                    </div>
                    <p className="text-slate-600 text-sm">
                        © {new Date().getFullYear()} Francisco Flores Enríquez. Built with React & Tailwind.
                    </p>
                </div>
            </footer>

        </div>
    );
}