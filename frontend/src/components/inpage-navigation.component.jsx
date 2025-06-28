import { useEffect, useRef, useState } from "react";

export let activeTabLineRef;
export let activeTabRef;

const InPageNavigation = ({
  routes,
  defaultHidden = [],
  defaultActiveIndex = 0,
  children,
}) => {
  activeTabLineRef = useRef();
  activeTabRef = useRef();

  const [InPageNavIndex, setInPageNavIndex] = useState(defaultActiveIndex);
  const [width, setWidth] = useState(window.innerWidth);

  const channgePageState = (btn, i) => {
    if (!btn || !activeTabLineRef.current) return;

    const { offsetWidth, offsetLeft } = btn;

    activeTabLineRef.current.style.width = offsetWidth + "px";
    activeTabLineRef.current.style.left = offsetLeft + "px";

    setInPageNavIndex(i);
  };

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);

      // Auto-switch to default tab if screen is now > 766
      if (newWidth > 766 && InPageNavIndex !== defaultActiveIndex) {
        channgePageState(activeTabRef.current, defaultActiveIndex);
      }
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [InPageNavIndex, defaultActiveIndex]);

  useEffect(() => {
    // Set initial tab underline position
    if (activeTabRef.current) {
      channgePageState(activeTabRef.current, InPageNavIndex);
    }
  }, []);

  return (
    <>
      <div className="relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto">
        {routes.map((route, i) => {
          return (
            <button
              ref={i === defaultActiveIndex ? activeTabRef : null}
              key={i}
              className={
                "p-4 px-5 capitalize " +
                (InPageNavIndex === i ? "text-black" : "text-dark-grey ") +
                (defaultHidden.includes(route) ? "md:hidden" : "")
              }
              onClick={(e) => channgePageState(e.target, i)}
            >
              {route}
            </button>
          );
        })}
        <hr
          ref={activeTabLineRef}
          className="absolute bottom-0 duration-300 border-black"
        />
      </div>

      {Array.isArray(children) ? children[InPageNavIndex] : children}
    </>
  );
};

export default InPageNavigation;
