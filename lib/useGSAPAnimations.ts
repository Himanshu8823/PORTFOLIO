import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function useGSAPAnimations() {
  useEffect(() => {
    // Smooth scroll animations for sections
    const sections = document.querySelectorAll(
      ".hero-section, .about-section, .experience-section, .projects-section, .skills-section, .contact-section"
    );

    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "cubic-bezier(0.16,1,0.3,1)",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: false,
            markers: false,
          },
        }
      );
    });

    // Parallax effect for hero
    const hero = document.querySelector(".hero-section");
    if (hero) {
      gsap.to(hero, {
        y: 100,
        scrollTrigger: {
          trigger: hero,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          markers: false,
        },
      });
    }

    // Stagger animation for list items
    const cards = document.querySelectorAll(".glass-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "cubic-bezier(0.16,1,0.3,1)",
        scrollTrigger: {
          trigger: cards[0]?.parentElement,
          start: "top 75%",
          end: "top 25%",
          scrub: false,
          markers: false,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}

// Smooth scroll to section
export function smoothScrollTo(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    gsap.to(window, {
      scrollTo: {
        y: element,
        autoKill: true,
      },
      duration: 1.5,
      ease: "power3.inOut",
    });
  }
}

// Add smooth scroll behavior
export function initSmoothScroll() {
  // Register ScrollToPlugin if not already registered
  if (!gsap.plugins.scrollTo) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Enable smooth scrolling on all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      if (href && href !== "#") {
        smoothScrollTo(href.slice(1));
      }
    });
  });
}
