"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { FLIGHT_SECTION_IDS } from "@/modules/features/pages/src/config/sections";

function readHashId() {
  const raw = window.location.hash.slice(1);
  if (!raw) return "";
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function scrollToId(id: string) {
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ block: "start" });
}

function isNearViewport(element: HTMLElement) {
  const box = element.getBoundingClientRect();
  return box.top < window.innerHeight * 0.75 && box.bottom > window.innerHeight * 0.15;
}

export function SectionUrl() {
  const initialIdRef = useRef("");
  const settledRef = useRef(false);

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    const id = readHashId();
    initialIdRef.current = id;
    scrollToId(id);
  }, []);

  useEffect(() => {
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => {
        const id = initialIdRef.current;
        const target = id ? document.getElementById(id) : null;
        if (target && !isNearViewport(target)) {
          target.scrollIntoView({ block: "start" });
        }
        settledRef.current = true;
      });
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!settledRef.current) return;
      const mid = window.innerHeight / 2;
      let winner: string | null = null;
      document.querySelectorAll<HTMLElement>("[data-section]").forEach((node) => {
        const box = node.getBoundingClientRect();
        if (box.top <= mid && box.bottom > mid) winner = node.id;
      });
      if (winner === null) return;
      const id = winner;
      const nextHash = id === "" || id === FLIGHT_SECTION_IDS[0] ? "" : `#${id}`;
      const currentId = readHashId();
      const currentHash = currentId ? `#${currentId}` : "";
      if (currentHash === nextHash) return;
      history.replaceState(null, "", `${window.location.pathname}${window.location.search}${nextHash}`);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
