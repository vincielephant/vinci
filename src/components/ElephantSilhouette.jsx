/**
 * Stylized inline silhouette inspired by the Vinci elephant icon — used for
 * floating background mascots, confetti, and inline punctuation marks.
 * Single path, easy to recolor and animate.
 */
export default function ElephantSilhouette({
  size = 24,
  color = '#f2778a',
  className = '',
  style,
  ...rest
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      style={style}
      aria-hidden
      {...rest}
    >
      <path
        fill={color}
        d="M14 22c0-8 7-14 16-14 9 0 16 6 16 14 0 3-1 5-1 7l5 4c2 1 2 4 0 5l-4 2c-1 4-4 7-8 8v6c0 2-2 3-4 3s-3-1-3-3v-5h-7v5c0 2-1 3-3 3s-4-1-4-3v-7c-3-2-5-5-6-9-3 0-6-2-7-5-2-4 0-8 4-9 1 0 3 0 4 1l1-3c0-1 0-3 1-4z"
      />
      <circle cx="36" cy="22" r="2.2" fill="#fff" />
      <circle cx="36" cy="22" r="1.1" fill="#1b1b1b" />
    </svg>
  )
}
