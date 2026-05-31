"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useEffect } from "react";

// Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let smoother: any = null;

export function useGSAPAnimations() {
  useEffect(() => {
    // Initialize ScrollSmoother for smooth scrolling with error handling
    if (!smoother) {
      try {
        smoother = ScrollSmoother.create({
          smooth: 2,
          effects: true,
          normalizeScroll: true,
        });
      } catch (e) {
        console.log("ScrollSmoother initialization note:", e);
      }
    }

    // Smooth scroll animations for sections
    const sections = document.querySelectorAll(
      ".hero-section, .about-section, .experience-section, .projects-section, .skills-section, .contact-section"
    );

    sections.forEach((section, index) => {
      // Create timeline for section animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "top 30%",
          scrub: 1.2,
          markers: false,
          onEnter: () => section.classList.add("section-visible"),
          onLeave: () => section.classList.remove("section-visible"),
        },
      });

      tl.fromTo(
        section,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1 }
      );
    });

    // Enhanced parallax effect for hero with better motion
    const hero = document.querySelector(".hero-section");
    if (hero) {
      gsap.to(hero, {
        y: 200,
        opacity: 0.8,
        scrollTrigger: {
          trigger: hero,
          start: "top center",
          end: "bottom center",
          scrub: 2.5,
          markers: false,
          onUpdate: (self) => {
            // Add velocity-based adjustments for smoother feel
            const velocity = self.getVelocity();
            gsap.to(hero, { duration: 0.8, overwrite: "auto", y: 200 + velocity * 0.001 });
          },
        },
      });
    }

    // Stagger animation for cards with improved easing
    const cards = document.querySelectorAll(".glass-card");
    if (cards.length > 0) {
      const container = cards[0]?.parentElement;
      gsap.fromTo(
        cards,
        { 
          opacity: 0, 
          y: 80, 
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            end: "top 10%",
            scrub: 1,
            markers: false,
          },
        }
      );
    }

    // Add scroll event listener for additional animations
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
          
          // Update scroll-dependent elements
          const parallaxElements = document.querySelectorAll("[data-parallax]");
          parallaxElements.forEach((el: any) => {
            const speed = parseFloat(el.dataset.parallax) || 0.5;
            const yOffset = window.scrollY * speed;
            el.style.transform = `translateY(${yOffset}px)`;
          });
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}

// Smooth scroll to section
export function smoothScrollTo(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    if (smoother) {
      try {
        smoother.scrollTo(element, true);
      } catch (e) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// Add smooth scroll behavior
export function initSmoothScroll() {
  // Initialize ScrollSmoother if not already done
  if (!smoother) {
    try {
      smoother = ScrollSmoother.create({
        smooth: 2,
        effects: true,
        normalizeScroll: true,
      });
    } catch (e) {
      console.log("ScrollSmoother initialization note:", e);
    }
  }

  // Enable smooth scrolling on all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e: Event) => {
      const href = (anchor as HTMLAnchorElement).getAttribute("href");
      if (href && href !== "#") {
        e.preventDefault();
        smoothScrollTo(href.slice(1));
      }
    });
  });
}

// Kill smoother when component unmounts
export function killSmoother() {
  if (smoother) {
    try {
      smoother.kill();
    } catch (e) {
      console.log("ScrollSmoother kill note:", e);
    }
    smoother = null;
  }
}
