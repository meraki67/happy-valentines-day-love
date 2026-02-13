import { useEffect, useRef } from "react";

export default function HeartsBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width, height, animationFrameId;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;

      canvas.width = width * DPR;
      canvas.height = height * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const hearts = [];

    const createHeart = () => ({
      x: Math.random() * width,
      y: height + 20,
      size: 6 + Math.random() * 18,
      speed: 0.5 + Math.random() * 1.5,
      drift: (Math.random() - 0.5) * 0.8,
      opacity: 0.3 + Math.random() * 0.4,
    });

    for (let i = 0; i < 40; i++) {
      hearts.push(createHeart());
    }

    const drawHeart = (x, y, size, opacity) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 24, size / 24);

      ctx.beginPath();
      ctx.moveTo(0, 8);
      ctx.bezierCurveTo(0, -6, -12, -6, -12, 2);
      ctx.bezierCurveTo(-12, 12, 0, 16, 0, 22);
      ctx.bezierCurveTo(0, 16, 12, 12, 12, 2);
      ctx.bezierCurveTo(12, -6, 0, -6, 0, 8);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(-12, -6, 12, 22);
      gradient.addColorStop(0, `rgba(255, 175, 204, ${opacity})`);
      gradient.addColorStop(1, `rgba(255, 77, 109, ${opacity})`);

      ctx.fillStyle = gradient;
      ctx.shadowColor = "rgba(255, 77, 109, 0.6)";
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      hearts.forEach((heart, index) => {
        heart.y -= heart.speed;
        heart.x += heart.drift;

        if (heart.y < -30) {
          hearts[index] = createHeart();
        }

        drawHeart(heart.x, heart.y, heart.size, heart.opacity);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-5 w-full h-full"
    />
  );
}
