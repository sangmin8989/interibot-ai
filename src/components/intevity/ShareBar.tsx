"use client";

import { useState, useCallback } from "react";
import html2canvas from "html2canvas";

declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: Record<string, unknown>) => void;
      };
    };
  }
}

interface Props {
  typeId: string;
  archetype: string;
  oneLiner: string;
  captureRef?: React.RefObject<HTMLDivElement | null>;
}

export default function ShareBar({ typeId, archetype, oneLiner, captureRef }: Props) {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }, []);

  const resultUrl = typeof window !== "undefined"
    ? `${window.location.origin}/intevity/result/${typeId}`
    : "";

  const handleKakao = () => {
    const url = `${window.location.origin}/intevity/result/${typeId}`;
    if (window.Kakao?.Share) {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: `\uB098\uB294 "${archetype}" \uC720\uD615\uC774\uC5D0\uC694`,
          description: oneLiner,
          imageUrl: `${window.location.origin}/intevity/result/${typeId}/opengraph-image`,
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        buttons: [
          {
            title: "\uB0B4 \uC720\uD615 \uBCF4\uAE30",
            link: { mobileWebUrl: url, webUrl: url },
          },
          {
            title: "\uB098\uB3C4 \uD14C\uC2A4\uD2B8\uD558\uAE30",
            link: {
              mobileWebUrl: `${window.location.origin}/intevity`,
              webUrl: `${window.location.origin}/intevity`,
            },
          },
        ],
      });
    } else {
      navigator.clipboard.writeText(url);
      showToast("\uCE74\uCE74\uC624\uD1A1 SDK\uAC00 \uC5C6\uC5B4 \uB9C1\uD06C\uAC00 \uBCF5\uC0AC\uB418\uC5C8\uC2B5\uB2C8\uB2E4");
    }
  };

  const handleImageSave = async () => {
    if (!captureRef?.current) {
      showToast("\uC774\uBBF8\uC9C0 \uC800\uC7A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4");
      return;
    }

    try {
      const canvas = await html2canvas(captureRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: null,
      });

      // Resize to 1080x1920 (9:16) if possible
      const targetW = 1080;
      const targetH = 1920;
      const resized = document.createElement("canvas");
      resized.width = targetW;
      resized.height = targetH;
      const ctx = resized.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, targetW, targetH);
        // Scale to fit width, center vertically
        const scale = targetW / canvas.width;
        const scaledH = canvas.height * scale;
        const offsetY = Math.max(0, (targetH - scaledH) / 2);
        ctx.drawImage(canvas, 0, offsetY, targetW, scaledH);
      }

      const link = document.createElement("a");
      link.download = `intevity-${typeId}.png`;
      link.href = (ctx ? resized : canvas).toDataURL("image/png");
      link.click();
      showToast("\uC774\uBBF8\uC9C0\uAC00 \uC800\uC7A5\uB418\uC5C8\uC2B5\uB2C8\uB2E4");
    } catch {
      showToast("\uC774\uBBF8\uC9C0 \uC800\uC7A5\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4");
    }
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/intevity/result/${typeId}`;
    navigator.clipboard.writeText(url);
    showToast("\uB9C1\uD06C\uAC00 \uBCF5\uC0AC\uB418\uC5C8\uC2B5\uB2C8\uB2E4");
  };

  return (
    <>
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[60] bg-black/80 text-white text-sm px-4 py-2 rounded">
          {toast}
        </div>
      )}

      {/* Share Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-t border-gray-200">
        <div className="flex items-center justify-center gap-0 max-w-md mx-auto">
          <button
            onClick={handleKakao}
            className="flex-1 flex flex-col items-center justify-center py-3 gap-1 hover:bg-gray-50 active:bg-gray-100 transition-colors rounded-none"
          >
            <span className="text-2xl">💬</span>
            <span className="text-[11px] text-gray-600">카카오톡</span>
          </button>
          <button
            onClick={handleImageSave}
            className="flex-1 flex flex-col items-center justify-center py-3 gap-1 hover:bg-gray-50 active:bg-gray-100 transition-colors rounded-none"
          >
            <span className="text-2xl">📸</span>
            <span className="text-[11px] text-gray-600">이미지 저장</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="flex-1 flex flex-col items-center justify-center py-3 gap-1 hover:bg-gray-50 active:bg-gray-100 transition-colors rounded-none"
          >
            <span className="text-2xl">🔗</span>
            <span className="text-[11px] text-gray-600">링크 복사</span>
          </button>
        </div>
      </div>
    </>
  );
}
