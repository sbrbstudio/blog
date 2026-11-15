"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function RouteScrollReset() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    function handleLinkNavigation(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const destination = new URL(link.href, window.location.href);
      if (
        destination.origin === window.location.origin &&
        destination.pathname !== window.location.pathname &&
        !destination.hash
      ) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    }

    document.addEventListener("click", handleLinkNavigation, true);
    return () =>
      document.removeEventListener("click", handleLinkNavigation, true);
  }, []);

  useEffect(() => {
    if (previousPathname.current === pathname) return;

    previousPathname.current = pathname;

    if (!window.location.hash) {
      let secondFrame = 0;
      const firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        });
      });

      return () => {
        window.cancelAnimationFrame(firstFrame);
        window.cancelAnimationFrame(secondFrame);
      };
    }
  }, [pathname]);

  return null;
}
