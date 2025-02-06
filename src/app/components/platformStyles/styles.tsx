import { FaGithub, FaTwitter, FaYoutube, FaLinkedin, FaGitlab, FaStackOverflow } from "react-icons/fa";
import { SiFrontendmentor } from "react-icons/si";

export const platformStyles: Record<string, { bg: string; text: string; icon: JSX.Element }> = {
  GitHub: { bg: "bg-black", text: "text-white", icon: <FaGithub size={20} /> },
  Twitter: { bg: "bg-blue-500", text: "text-white", icon: <FaTwitter size={20} /> },
  YouTube: { bg: "bg-red-600", text: "text-white", icon: <FaYoutube size={20} /> },
  LinkedIn: { bg: "bg-blue-700", text: "text-white", icon: <FaLinkedin size={20} /> },
  GitLab: { bg: "bg-orange-500", text: "text-white", icon: <FaGitlab size={20} /> },
  "Frontend Mentor": { bg: "bg-gray-700", text: "text-white", icon: <SiFrontendmentor size={20} /> },
  "Stack Overflow": { bg: "bg-yellow-500", text: "text-black", icon: <FaStackOverflow size={20} /> },
};
