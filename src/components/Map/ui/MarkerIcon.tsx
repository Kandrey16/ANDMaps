export const MarkerIcon = ({ src, alt }: { src: string; alt: string }) => (
  <div style={{ width: 30, height: 30 }}>
    <img
      src={src}
      style={{ width: '100%', height: '100%' }}
      alt={alt}
    />
  </div>
)