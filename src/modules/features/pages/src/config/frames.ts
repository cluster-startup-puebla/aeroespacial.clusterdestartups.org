export interface LandingFrame {
  id: string;
  src: string;
  portraitSrc?: string;
  altKey:
    | "frames.img01"
    | "frames.img02"
    | "frames.img03"
    | "frames.img04"
    | "frames.img05"
    | "frames.img06"
    | "frames.img07"
    | "frames.img08";
}

export const HERO_PLATE: LandingFrame = {
  id: "IMG-01",
  src: "/landing/img-01.webp",
  portraitSrc: "/landing/img-01-portrait.webp",
  altKey: "frames.img01",
};

export const HERO_OBJECT: LandingFrame = {
  id: "IMG-02",
  src: "/landing/img-02.webp",
  altKey: "frames.img02",
};

export const FLIGHT_FRAMES: LandingFrame[] = [
  { id: "IMG-03", src: "/landing/img-03.webp", altKey: "frames.img03" },
  { id: "IMG-07", src: "/landing/img-07.webp", altKey: "frames.img07" },
];
