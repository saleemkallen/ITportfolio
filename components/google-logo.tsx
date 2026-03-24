interface GoogleLogoProps {
  size?: "large" | "small"
}

/** Wordmark "Saleem" using Google brand letter colors (Blue, Red, Yellow, Blue, Green, Red). */
const SALEEM_LETTERS = [
  { char: "S", color: "#4285F4" },
  { char: "a", color: "#EA4335" },
  { char: "l", color: "#FBBC05" },
  { char: "e", color: "#4285F4" },
  { char: "e", color: "#34A853" },
  { char: "m", color: "#EA4335" },
] as const

export function GoogleLogo({ size = "large" }: GoogleLogoProps) {
  const fontSize = size === "large" ? "text-[88px] leading-none max-[480px]:text-[64px]" : "text-[22px] leading-none"

  return (
    <h1 className={`${fontSize} font-normal tracking-[-0.03em] select-none`}>
      {SALEEM_LETTERS.map((letter, index) => (
        <span
          key={index}
          style={{
            color: letter.color,
            fontWeight: 400,
          }}
        >
          {letter.char}
        </span>
      ))}
    </h1>
  )
}
