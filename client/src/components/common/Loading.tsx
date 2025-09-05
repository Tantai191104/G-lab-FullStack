const Loading: React.FC<{ fullscreen?: boolean }> = ({ fullscreen = true }) => (
  <div
    className={
      fullscreen ? "global-loading-overlay" : "flex items-center justify-center"
    }
  >
    <div className="neon-spinner" />
  </div>
);

export default Loading;
