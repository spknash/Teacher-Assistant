"use client";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { FiMenu, FiArrowRight } from "react-icons/fi";
import UserButton from "./user-button";

const FlipNavWrapper = () => {
  return (
    <div className="bg-gray-50">
      <FlipNav />
    </div>
  );
};

const FlipNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white p-4 border-b-[1px] border-gray-200 flex items-center justify-between relative">
      <NavLeft setIsOpen={setIsOpen} />
      
      <NavMenu isOpen={isOpen} />
    </nav>
  );
};

const LogInFlipNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="bg-white p-4 border-b-[1px] border-gray-200 flex items-center justify-between relative">
        <NavLeft setIsOpen={setIsOpen} />
       
        <NavMenu isOpen={isOpen} />
        </nav>
    );
    }

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <svg
      width="50"
      height="39"
      viewBox="0 0 50 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-gray-800"
    >
      <path
        d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
        stopColor="#000000"
      ></path>
      <path
        d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
        stopColor="#000000"
      ></path>
    </svg>
  );
};

const NavLeft = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex items-center gap-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="block lg:hidden text-gray-950 text-2xl"
        onClick={() => setIsOpen((pv) => !pv)}
      >
        <FiMenu />
      </motion.button>
      <Logo />
      <NavLink text="Home" link = "/"/>
      <NavLink text="Projects" link = "projects"/>
      <NavLink text="Tuturial" link ="tuturial" />
      <NavLink text="About" link = "about" />
    </div>
  );
};

const NavLink = ({ text, link}: { text: string, link:string }) => {
  return (
    <a
      href={link}
      rel="nofollow"
      className="hidden lg:block h-[30px] overflow-hidden font-medium"
    >
      <motion.div whileHover={{ y: -30 }}>
        <span className="flex items-center h-[30px] text-gray-500">{text}</span>
        <span className="flex items-center h-[30px] text-indigo-600">
          {text}
        </span>
      </motion.div>
    </a>
  );
};

// const NavRight = () => {
//   return (
//     <div className="flex items-center gap-4">
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent font-medium rounded-md whitespace-nowrap"
//       >
//         Sign in
//       </motion.button>
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white font-medium rounded-md whitespace-nowrap"
//       >
//         Sign up
//       </motion.button>
//     </div>
//   );
// };

const NavMenu = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <motion.div
      variants={menuVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      className="absolute p-4 bg-white shadow-lg left-0 right-0 top-full origin-top flex flex-col gap-4"
    >
      <MenuLink text="Home" link="/" />
      <MenuLink text="Projects" link="/projects" />
      <MenuLink text="Tuturial" link="tuturial"/>
      <MenuLink text="About" link="about"/>
    </motion.div>
  );
};

const MenuLink = ({ text, link}: { text: string, link:string }) => {
  return (
    <motion.a
      variants={menuLinkVariants}
      rel="nofollow"
      href={link}
      className="h-[30px] overflow-hidden font-medium text-lg flex items-start gap-2"
    >
      <motion.span variants={menuLinkArrowVariants}>
        <FiArrowRight className="h-[30px] text-gray-950" />
      </motion.span>
      <motion.div whileHover={{ y: -30 }}>
        <span className="flex items-center h-[30px] text-gray-500">{text}</span>
        <span className="flex items-center h-[30px] text-indigo-600">
          {text}
        </span>
      </motion.div>
    </motion.a>
  );
};

export default FlipNavWrapper;

const menuVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const menuLinkVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: -10,
    opacity: 0,
  },
};

const menuLinkArrowVariants = {
  open: {
    x: 0,
  },
  closed: {
    x: -4,
  },
};