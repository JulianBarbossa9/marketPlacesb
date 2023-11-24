"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useRef, useState } from "react";
import NavItem from "./NavItem";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  // console.log(activeIndex);

  const isAnyOpen = activeIndex !== null; 

  const navRef = useRef<HTMLDivElement | null>(null)

  return (
    <div className="flex gap-4 h-full">
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
