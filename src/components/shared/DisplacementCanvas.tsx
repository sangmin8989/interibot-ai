"use client";

import { useEffect, useRef } from "react";

// Mouse position is tracked from the parent container via window mousemove
// Canvas itself is pointer-events-none so it never blocks clicks
export default function DisplacementCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
    canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);

    const vert = `
      attribute vec2 a_pos;
      varying vec2 v_uv;
      void main() { v_uv = a_pos * 0.5 + 0.5; gl_Position = vec4(a_pos, 0.0, 1.0); }
    `;
    const frag = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_mouse;
      varying vec2 v_uv;
      void main() {
        vec2 uv = v_uv;
        float dist = distance(uv, u_mouse);
        float ripple = sin(dist * 40.0 - u_time * 3.0) * exp(-dist * 6.0) * 0.015;
        float wave = sin(uv.x * 10.0 + u_time * 0.5) * 0.003;
        vec2 disp = uv + vec2(ripple + wave, ripple);
        float c = smoothstep(0.0, 0.01, abs(sin(disp.x * 80.0))) * 0.03;
        c += smoothstep(0.0, 0.01, abs(sin(disp.y * 60.0))) * 0.02;
        float glow = exp(-dist * 4.0) * 0.08;
        gl_FragColor = vec4(0.83, 0.46, 0.29, (c + glow) * 0.5);
      }
    `;

    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let raf: number;
    const start = Date.now();

    function render() {
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.05;
      m.y += (m.targetY - m.y) * 0.05;
      gl!.uniform1f(uTime, (Date.now() - start) / 1000);
      gl!.uniform2f(uMouse, m.x, 1.0 - m.y);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    }
    render();

    // Listen on window so pointer-events-none doesn't matter
    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
        mouseRef.current.targetX = x;
        mouseRef.current.targetY = y;
      }
    };
    window.addEventListener("mousemove", handleMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-10 h-full w-full ${className}`}
    />
  );
}
