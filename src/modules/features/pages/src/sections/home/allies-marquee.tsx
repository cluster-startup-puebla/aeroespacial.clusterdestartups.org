interface AllyLogo {
  src: string;
  alt: string;
  /** Height utilities. The default matches a square or crest. Wordmarks override it so the cap height matches. */
  frame?: string;
}

interface AllyCluster {
  logos: AllyLogo[];
}

type AllyItem = AllyLogo | AllyCluster;

interface AlliesMarqueeProps {
  label: string;
  logos: AllyItem[];
}

const COPIES = 4;
const DEFAULT_FRAME = "h-12 w-auto sm:h-14";

function isCluster(item: AllyItem): item is AllyCluster {
  return "logos" in item;
}

function AllyImage({ logo, hidden }: { logo: AllyLogo; hidden: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo.src}
      alt={hidden ? "" : logo.alt}
      loading="lazy"
      decoding="async"
      className={`object-contain ${logo.frame ?? DEFAULT_FRAME}`}
    />
  );
}

function AllyGroup({ logos, copy }: { logos: AllyItem[]; copy: number }) {
  const hidden = copy > 0;

  return (
    <ul
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 items-center gap-12 pr-12 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6 motion-reduce:pr-0 ${hidden ? "motion-reduce:hidden" : ""}`}
    >
      {logos.map((item) =>
        isCluster(item) ? (
          <li
            key={item.logos.map((logo) => logo.src).join("|")}
            className="flex shrink-0 items-center gap-3"
          >
            {item.logos.map((logo) => (
              <AllyImage key={logo.src} logo={logo} hidden={hidden} />
            ))}
          </li>
        ) : (
          <li key={item.src} className="flex shrink-0 items-center">
            <AllyImage logo={item} hidden={hidden} />
          </li>
        ),
      )}
    </ul>
  );
}

export function AlliesMarquee({ label, logos }: AlliesMarqueeProps) {
  return (
    <section
      aria-label={label}
      className="overflow-hidden border-y border-line bg-surface py-8"
    >
      <p className="text-center text-micro uppercase tracking-wider text-ink-secondary">
        {label}
      </p>
      <div className="group mt-5 [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)] motion-reduce:[mask-image:none]">
        <div className="flex w-max animate-allies group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none">
          {Array.from({ length: COPIES }, (_, copy) => (
            <AllyGroup
              key={copy}
              logos={logos}
              copy={copy}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
