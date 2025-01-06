'use client';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import PAGES_OPREATIONS from '@/graphql/page';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import { firaSansFont } from '@/assets/fonts/fonts';

interface NavigationBarProps {}

const NavigationBar: React.FC<NavigationBarProps> = () => {
  const { data } = useQuery(PAGES_OPREATIONS.Queries.pages);

  const pathname = usePathname();

  // State for the menu button
  const [open, setOpen] = useState(false);
  // State for the navbar visibility

  //This hook is used to get the scrollY value
  const { scrollY } = useScroll();

  //Used with framer-motion to animate the menu button
  const topVariants = {
    // If it is close we are not going to have any rotation
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: 45,
      backgroundColor: 'rgb(0, 0, 0)',
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
      backgroundColor: 'rgb(0, 0, 0)',
    },
  };
  // End of framer-motion

  const slideOutVariants = {
    open: { opacity: 1, x: '0%' },
    closed: { opacity: 1, x: '100%' }, // Sidebar slides out to the right
  };

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  const MOBILE_VIEWPORT = 640;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Transform scrollY to animate height from 80px to 50px
  const navHeight = useTransform(scrollY, [0, 100], ['75px', '50px']);

  const navStyle = windowWidth < MOBILE_VIEWPORT ? { height: navHeight } : {};

  // Transform Logo Text
  const logoTextOpacity = useTransform(scrollY, [0, 10], [1, 0]);
  const logoText = useTransform(scrollY, [0, 100], ['0px', '-150px']);

  const logoTextStyle =
    windowWidth < MOBILE_VIEWPORT
      ? { x: logoText, opacity: logoTextOpacity }
      : {};

  /**The component returns a nav element with a conditional class based on the isSticky state.
     If sticky (isSticky is true), it adds classes like sticky top-0 z-50 for positioning. */
  return (
    <nav className="fixed w-full z-50 bg-white">
      <div className="ae-mobile-container ae-non-mobile-container ease-in-out duration-300 lg:duration-0">
        <motion.div
          style={navStyle}
          className="max-w-[1200px] mx-auto flex items-center justify-between lg:p-0"
        >
          {/* TABLET/DESKTOP MENU LIST */}
          <div className="tablet-list h-full md:flex gap-4">
            {/* Logo */}
            <Link href="/" passHref>
              <div className="w-[100px] -ml-3 flex flex-col items-center justify-center gap-1 py-2">
                <div className="relative">
                  <Image
                    width={40}
                    height={40}
                    alt="logo image"
                    src="/images/logo/AES-Logomark_750px-M.png"
                    className="w-auto h-auto"
                    priority
                  />
                </div>
                <motion.p
                  className="text-[10px] text-purple-purp-aes font-black text-center"
                  style={logoTextStyle}
                >
                  AI ENERGY SHOP
                </motion.p>
              </div>
            </Link>

            {/* TABLET TO DESKTOP LINKS */}
            <div className="hidden lg:flex gap-4 items-center justify-center">
              {data?.pages
                ?.filter((item) => item?.slug !== '/')
                .map?.((link: any) => {
                  return (
                    <Link
                      key={link.documentId}
                      href={`/${link.slug}`}
                      passHref
                      className={`gradientbar-link ${
                        pathname.includes(link.slug, 1) ? 'active' : ''
                      } flex flex-col gap-2 min-w-[60px] pb-1 mt-auto`}
                    >
                      <div
                        className={`${firaSansFont.className} w-full font-semibold text-center`}
                      >
                        {link.title}
                      </div>
                      <div className="gradientbar w-full h-[4px] bg-transparent ease-in-out duration-300 opacity-0"></div>
                    </Link>
                  );
                })}
            </div>
          </div>

          {/* MOBILE MENU LIST */}
          <div className="mobile-list lg:hidden">
            {/* Overlay for the mobile menu */}
            {open && (
              <div className="fixed top-0 right-0 w-full h-full bg-black opacity-[.33]" />
            )}
            <button
              className="w-10 h-8 flex rounded-md flex-col justify-between z-50 relative"
              onClick={() => setOpen(!open)}
            >
              <motion.div
                variants={topVariants}
                animate={open ? 'opened' : 'closed'}
                className="w-10 h-1 bg-black rounded origin-left"
              ></motion.div>
              <motion.div
                variants={centerVariants}
                animate={open ? 'opened' : 'closed'}
                className="w-10 h-1 bg-black rounded"
              ></motion.div>
              <motion.div
                variants={bottomVariants}
                animate={open ? 'opened' : 'closed'}
                className="w-10 h-1 bg-black rounded origin-left"
              ></motion.div>
            </button>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial="closed"
                  animate={open ? 'open' : 'closed'}
                  exit="closed" // Ensures a smooth exit animation
                  variants={slideOutVariants}
                  transition={{
                    duration: open ? 0.4 : 0.35,
                    ease: 'easeInOut',
                  }}
                  className="w-10/12 h-screen text-blue-51 bg-slate-50 fixed top-0 right-0 flex flex-row z-20"
                >
                  <div className="h-full w-2 bg-gradient-to-b from-[#f9ac0a] via-[#e71467] to-[#29294c]"></div>
                  <div className="nav-list w-full h-full flex flex-col gap-4">
                    {data?.pages?.map?.((link) => (
                      <Link
                        key={link?.documentId}
                        href={`/${link?.slug}`}
                        onClick={() => setOpen(false)}
                        passHref
                        className="translate-y-20"
                      >
                        <div className="cursor-pointer block hover:font-bold p-2 text-start text-xl hover:bg-slate-300">
                          {link?.title}
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default NavigationBar;
