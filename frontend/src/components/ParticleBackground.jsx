import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackground = () => {
  const [init, setInit] = useState(false);

  // This is the new, modern way to boot up the particle engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null; // Wait until engine is ready before showing anything

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: { enable: true, zIndex: -1 }, // Puts it safely behind your UI
        background: {
          image: "linear-gradient(135deg, #020617 0%, #1e1b4b 50%, #0f172a 100%)",
        },
        particles: {
          number: { value: 60, density: { enable: true, width: 800 } },
          color: { value: ["#06b6d4", "#8b5cf6", "#d946ef"] }, // Cyan, Purple, Pink
          links: {
            enable: true,
            distance: 150,
            color: "#8b5cf6",
            opacity: 0.5,
            width: 1.5,
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            outModes: { default: "bounce" },
          },
          size: { value: { min: 2, max: 4 } },
          opacity: { value: 0.8 },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
          },
          modes: {
            grab: { distance: 200, links: { opacity: 0.8, color: "#06b6d4" } },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticleBackground;