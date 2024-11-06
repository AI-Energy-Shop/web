'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import PAGES_OPREATIONS from '@/graphql/page';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';

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
    closed: { opacity: 0, x: '100%' },
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
      <div className="max-w-[1200px] m-auto ease-in-out duration-300 lg:duration-0">
        <motion.div
          className="w-full flex items-center justify-between pl-5 lg:p-0"
          style={navStyle}
        >
          {/* TABLET/DESKTOP MENU LIST */}
          <div className="h-full md:flex gap-4">
            {/* Logo */}
            <Link href="/" passHref>
              <div className="w-[100px]  flex flex-col items-center justify-center gap-1 py-2">
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
                {/* ${daysOne.className}  */}
                <motion.p
                  className="text-[10px] text-purple-purp-aes font-black text-center"
                  style={logoTextStyle}
                >
                  AI ENERGY SHOP
                </motion.p>
              </div>
            </Link>

            {/* TABLET TO DESKTOP LINKS */}
            <div className="desktop-nav-links hidden lg:flex gap-4 items-center justify-center">
              {data?.pages?.map?.((link: any) => {
                return (
                  <Link
                    key={link.documentId}
                    href={`/${link.slug}`}
                    passHref
                    className={`gradientbar-button ${
                      pathname === link.url ? 'active' : ''
                    } flex flex-col gap-2 min-w-[60px] pb-1 mt-auto`}
                  >
                    {/* ${firaSansFont.className}  */}
                    <button className={`w-full font-semibold text-center`}>
                      {link.title}
                    </button>
                    <div className="gradientbar w-full h-[4px] bg-transparent ease-in-out duration-300 opacity-0"></div>
                  </Link>
                );
              })}
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
            {open && (
              <motion.div
                layout
                initial="closed"
                variants={slideOutVariants}
                animate={open ? 'open' : 'closed'}
                transition={{ duration: open ? 0.4 : 0.35, ease: 'easeInOut' }}
                className={`w-10/12 h-screen text-blue-51  bg-slate-50 fixed top-0 right-0 flex flex-row z-20`}
              >
                <div className="h-full w-2 bg-gradient-to-b from-[#f9ac0a] via-[#e71467] to-[#29294c]"></div>
                <div className="nav-list w-full h-full flex flex-col gap-4">
                  {data?.pages?.map?.((link: any) => (
                    <Link
                      key={link.documentId}
                      href={`/${link.slug}`}
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
        </motion.div>
      </div>
    </nav>
  );
};

export default NavigationBar;
