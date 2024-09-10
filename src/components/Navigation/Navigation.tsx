"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { NAV_LINKS } from "@/libs/constant";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { daysOne, firaSansFont } from "@/assets/fonts/fonts";
import { usePathname } from "next/navigation";

interface NavigationBarProps {}

const NavigationBar: React.FC<NavigationBarProps> = (props) => {
  const pathname = usePathname();

  // State for the sticky navbar
  const [isSticky, setIsSticky] = useState(false);
  // State for the menu button
  const [open, setOpen] = useState(false);
  // State for the navbar visibility
  const [hidden, setHidden] = useState(false);

  //This hook is used to get the scrollY value
  const { scrollY } = useScroll();

  //This hook is used to detect the scroll direction
  useMotionValueEvent(scrollY, "change", (latest) => {
    //Get the previous value of the scrollY
    const previous = scrollY.getPrevious();
    //If the current scrollY is greater than the previous scrollY, hide the navbar
    if (previous !== undefined && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  //Used with framer-motion to animate the menu button
  const topVariants = {
    // If it is close we are not going to have any rotation
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: 45,
      backgroundColor: "rgb(0, 0, 0)",
    },
  };

  const centerVariants = {
    closed: {
      opacity: 1, //visible
    },
    opened: {
      opacity: 0, //invisible
    },
  };

  const bottomVariants = {
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: -45,
      backgroundColor: "rgb(0, 0, 0)",
    },
  };
  // End of framer-motion

  // Scroll variant
  const scrollVariant = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const slideOutVariants = {
    open: { opacity: 1, x: "0%" },
    closed: { opacity: 0, x: "100%" },
  };

  // Add sticky class to navbar when scrolling
  /**This hook manages the isSticky state by adding a scroll event listener.
    The handleScroll function checks if the user has scrolled and updates isSticky accordingly.
    The cleanup function removes the event listener when the component unmounts to prevent memory leaks. */
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    // Add event listener when component
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**The component returns a nav element with a conditional class based on the isSticky state.
     If sticky (isSticky is true), it adds classes like sticky top-0 z-50 for positioning. */
  return (
    <motion.nav
      className={`max-w-[1200px] m-auto ease-in-out duration-300 lg:duration-0 ${
        isSticky ? "h-0 opacity-0" : "h-[80px] opacity-100"
      }`}
      variants={scrollVariant}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <div className="h-20 w-full flex items-center justify-between pl-5 lg:p-0">
        {/* TABLET/DESKTOP MENU LIST */}
        <div className="h-full md:flex gap-4">
          {/* Logo */}
          <Link href="/" passHref>
            <div className="w-[100px] h flex flex-col items-center justify-center gap-1 py-2">
              <div className="relative">
                <Image
                  width={50}
                  height={50}
                  alt="logo image"
                  src="/images/logo/AES-Logomark_750px-M.png"
                  className="w-auto h-auto"
                />
              </div>
              <p
                className={`${daysOne.className} text-[10px] it text-purple-purp-aes font-black text-center text-nowrap `}
              >
                AI ENERGY SHOP
              </p>
            </div>
          </Link>

          {/* TABLET TO DESKTOP LINKS */}
          <div className="desktop-nav-links hidden lg:flex gap-4 items-center justify-center">
            {NAV_LINKS.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                passHref
                className={`gradientbar-button ${
                  pathname === link.url ? "active" : ""
                } flex flex-col gap-2 min-w-[60px] pb-1 mt-auto`}
              >
                <button
                  className={`${firaSansFont.className} w-full font-semibold text-center`}
                >
                  {link.title}
                </button>
                <div className="gradientbar w-full h-[4px] bg-transparent ease-in-out duration-300 opacity-0"></div>
              </Link>
            ))}
          </div>
        </div>

        {/* MOBILE MENU LIST */}
        <div className="lg:hidden">
          <button
            className="w-10 h-8 flex rounded-md flex-col justify-between z-50 relative m-8"
            onClick={() => setOpen(!open)}
          >
            <motion.div
              variants={topVariants}
              animate={open ? "opened" : "closed"}
              className="w-10 h-1 bg-black rounded origin-left"
            ></motion.div>
            <motion.div
              variants={centerVariants}
              animate={open ? "opened" : "closed"}
              className="w-10 h-1 bg-black rounded"
            ></motion.div>
            <motion.div
              variants={bottomVariants}
              animate={open ? "opened" : "closed"}
              className="w-10 h-1 bg-black rounded origin-left"
            ></motion.div>
          </button>
          {open && (
            <motion.div
              layout
              initial="closed"
              variants={slideOutVariants}
              animate={open ? "open" : "closed"}
              transition={{ duration: open ? 0.4 : 0.35, ease: "easeInOut" }}
              className={`w-10/12 h-screen text-blue-51  bg-slate-50 fixed top-0 right-0 flex flex-row z-20`}
            >
              <div className="h-full w-2 bg-gradient-to-b from-[#f9ac0a] via-[#e71467] to-[#29294c]"></div>
              <div className="nav-list w-full h-full flex flex-col gap-4">
                {NAV_LINKS.map((link, index) => (
                  <Link
                    key={index}
                    href={link.url}
                    passHref
                    className="translate-y-20 "
                  >
                    <div className="cursor-pointer block hover:font-bold p-5 transition-all text-start  text-xl duration-200 hover:bg-slate-300">
                      {link.title}
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default NavigationBar;
