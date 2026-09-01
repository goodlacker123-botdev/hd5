import { useEffect, useRef } from "react";

interface TunegoodyEmbedProps {
  src: string;
  title: string;
  origin: string;
  minHeight?: number;
}

const TunegoodyEmbed = ({ src, title, origin, minHeight = 760 }: TunegoodyEmbedProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const sendHostContext = () => {
      if (!iframe.contentWindow) return;
      try {
        const destination = new URL(window.location.href);
        destination.search = "";
        destination.hash = "";
        iframe.contentWindow.postMessage(
          { type: "tunegoody:embed:host-context", url: destination.toString() },
          origin,
        );
      } catch {
        return;
      }
    };

    const onLoad = () => sendHostContext();
    iframe.addEventListener("load", onLoad);
    const t = window.setTimeout(sendHostContext, 0);

    let confirmed = false;
    const onMessage = (event: MessageEvent) => {
      const data = event.data as { type?: string; height?: number } | null;
      if (!data || data.type !== "tunegoody:embed:resize" || typeof data.height !== "number") return;
      if (!Number.isFinite(data.height) || data.height <= 0) return;
      if (iframe.contentWindow !== event.source) return;
      if (event.origin !== origin) return;
      iframe.style.height = `${Math.max(data.height, minHeight)}px`;
      if (!confirmed) {
        confirmed = true;
        sendHostContext();
      }
    };
    window.addEventListener("message", onMessage);

    return () => {
      iframe.removeEventListener("load", onLoad);
      window.removeEventListener("message", onMessage);
      window.clearTimeout(t);
    };
  }, [src, origin, minHeight]);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      title={title}
      loading="lazy"
      scrolling="no"
      style={{
        width: "100%",
        minWidth: 0,
        border: 0,
        overflow: "hidden",
        height: `${minHeight}px`,
      }}
    />
  );
};

export default TunegoodyEmbed;
