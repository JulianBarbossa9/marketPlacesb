"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";


const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  // console.log(activeIndex);

  useEffect(() => {
    const handler = (e:KeyboardEvent) => {
      if (e.key === 'Escape'){
        setActiveIndex(null)
      }
    }
    //To know where come KeyboardEvent we cans use: document.addEventListener("keydown", (e) =>)
    document.addEventListener("keydown", handler)

    return () => {
      document.removeEventListener("keydown", handler)
    }
  },[])

  const isAnyOpen = activeIndex !== null; 

  const navRef = useRef<HTMLDivElement | null>(null)

  useOnClickOutside(navRef, () => setActiveIndex(null))

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, i) => {
        const handleOpen = () => {
          if (activeIndex === i) {
            setActiveIndex(null);
          } else {
            setActiveIndex(i);
          }
        };

        const isOpen = i === activeIndex;
        // console.log(isOpen)

        return (
          <NavItem
            category={category}
            handleOpen={handleOpen}
            isOpen={isOpen}
            isAnyOpen={isAnyOpen}
            key={category.value}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
