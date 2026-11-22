/* THE BALM Health Initiative and Social Intervention — interaction layer
   Compiled to assets/js/main.js by `npm run build`.
   Loaded in <head> (small file) so the page knows JS is on before it paints.
   This file is a plain browser script: no imports or exports. */
(function () {
  "use strict";

  const root = document.documentElement;
  root.classList.add("js");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ICON = {
    up: '<svg class="icon" viewBox="0 0 24 24" style="width:21px;height:21px" aria-hidden="true"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>',
    menu: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg>',
    close: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12"/><path d="M18 6 6 18"/></svg>',
  } as const;

  /** Runs one feature. If it breaks, the error is logged and every other feature still runs. */
  const safely = (name: string, feature: () => void): void => {
    try {
      feature();
    } catch (err) {
      console.error(`[balm] "${name}" failed:`, err);
    }
  };

  const $$ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document): T[] =>
    Array.from(scope.querySelectorAll<T>(sel));

  document.addEventListener("DOMContentLoaded", () => {
    let currentRef = ""; // filled by "gift reference", read by "copy buttons"

    /* ---------- Reveal on scroll ---------- */
    safely("reveal", () => {
      const revealEls = $$(".rv, .rv-stagger");
      if ("IntersectionObserver" in window && !reduceMotion) {
        const ro = new IntersectionObserver(
          (entries) => {
            entries.forEach((en) => {
              if (en.isIntersecting) {
                en.target.classList.add("in");
                ro.unobserve(en.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
        );
        revealEls.forEach((el) => ro.observe(el));
        root.classList.add("reveal-ready");
      } else {
        revealEls.forEach((el) => el.classList.add("in"));
        root.classList.add("reveal-ready");
      }
    });

    /* ---------- Images that fail to load: hide so the art panel behind shows ---------- */
    safely("image fallback", () => {
      $$<HTMLImageElement>(".frame img, .hero-photo img").forEach((img) => {
        const fail = () => img.classList.add("img-missing");
        if (img.complete && img.naturalWidth === 0) fail();
        img.addEventListener("error", fail);
      });
    });

    /* ---------- Back to top + mobile give bar + sticky header ---------- */
    safely("scroll ui", () => {
      const toTop = document.createElement("button");
      toTop.className = "to-top";
      toTop.type = "button";
      toTop.setAttribute("aria-label", "Back to top");
      toTop.innerHTML = ICON.up;
      document.body.appendChild(toTop);
      toTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      });

      const header = document.querySelector<HTMLElement>(".site-header");
      const giveBar = document.querySelector<HTMLElement>(".give-bar");
      let ticking = false;
      const onScroll = (): void => {
        const st = window.pageYOffset || root.scrollTop;
        header?.classList.toggle("stuck", st > 10);
        toTop.classList.toggle("show", st > 700);
        if (giveBar) {
          const nearEnd = window.innerHeight + st > document.body.scrollHeight - 500;
          giveBar.classList.toggle("show", st > 600 && !nearEnd);
        }
        ticking = false;
      };
      window.addEventListener(
        "scroll",
        () => {
          if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
          }
        },
        { passive: true },
      );
      onScroll();
    });

    /* ---------- Mobile nav ---------- */
    safely("mobile nav", () => {
      const toggle = document.querySelector<HTMLButtonElement>(".nav-toggle");
      const nav = document.querySelector<HTMLElement>(".main-nav");
      if (toggle && nav) {
        const scrim = document.createElement("div");
        scrim.className = "nav-scrim";
        document.body.appendChild(scrim);
        toggle.innerHTML = ICON.menu;

        const inertTargets = [
          document.querySelector(".brand"),
          document.querySelector("main"),
          document.querySelector(".page-hero"),
          document.querySelector(".site-footer"),
          document.querySelector(".to-top"),
          document.querySelector(".give-bar"),
        ].filter((el): el is Element => el !== null);

        const setNav = (open: boolean): void => {
          nav.classList.toggle("open", open);
          scrim.classList.toggle("show", open);
          toggle.setAttribute("aria-expanded", open ? "true" : "false");
          toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
          toggle.innerHTML = open ? ICON.close : ICON.menu;
          document.body.style.overflow = open ? "hidden" : "";
          inertTargets.forEach((el) => {
            if (open) el.setAttribute("inert", "");
            else el.removeAttribute("inert");
          });
          if (open) nav.querySelector<HTMLAnchorElement>("a")?.focus();
        };
        toggle.addEventListener("click", () => setNav(!nav.classList.contains("open")));
        scrim.addEventListener("click", () => {
          setNav(false);
          toggle.focus();
        });
        $$("a", nav).forEach((a) => a.addEventListener("click", () => setNav(false)));
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape" && nav.classList.contains("open")) {
            setNav(false);
            toggle.focus();
          }
        });
        window.addEventListener("resize", () => {
          if (window.innerWidth > 1180 && nav.classList.contains("open")) setNav(false);
        });
      }
    });

    /* ---------- Footer year ---------- */
    safely("footer year", () => {
      $$("[data-year]").forEach((el) => {
        el.textContent = String(new Date().getFullYear());
      });
    });

    /* ---------- Accordion ---------- */
    safely("accordion", () => {
      $$<HTMLButtonElement>(".acc-btn").forEach((btn, i) => {
        const panel = btn.nextElementSibling as HTMLElement | null;
        if (!panel) return;
        const id = panel.id || `acc-panel-${i}`;
        panel.id = id;
        btn.setAttribute("aria-controls", id);
        btn.setAttribute("aria-expanded", "false");
        btn.addEventListener("click", () => {
          const open = btn.getAttribute("aria-expanded") === "true";
          const group = btn.closest("[data-acc-group]");
          if (group && !open) {
            $$<HTMLButtonElement>(".acc-btn", group).forEach((other) => {
              if (other === btn) return;
              other.setAttribute("aria-expanded", "false");
              const otherPanel = other.nextElementSibling as HTMLElement | null;
              if (otherPanel) otherPanel.style.maxHeight = "";
            });
          }
          btn.setAttribute("aria-expanded", open ? "false" : "true");
          panel.style.maxHeight = open ? "" : `${panel.scrollHeight}px`;
        });
      });
    });

    /* ---------- Journey stepper (OPTRTE) — works like tabs ---------- */
    safely("journey tabs", () => {
      $$("[data-journey]").forEach((journey) => {
        const tabs = $$<HTMLButtonElement>('[role="tab"]', journey);
        const select = (tab: HTMLButtonElement, focus: boolean): void => {
          tabs.forEach((t) => {
            const on = t === tab;
            t.setAttribute("aria-selected", on ? "true" : "false");
            t.tabIndex = on ? 0 : -1;
            const panelId = t.getAttribute("aria-controls");
            const p = panelId ? document.getElementById(panelId) : null;
            if (p) {
              p.hidden = !on;
              p.classList.toggle("show", on);
            }
          });
          if (focus) tab.focus();
        };
        tabs.forEach((t, i) => {
          t.addEventListener("click", () => select(t, false));
          t.addEventListener("keydown", (e) => {
            let next: HTMLButtonElement | undefined;
            if (e.key === "ArrowRight" || e.key === "ArrowDown") next = tabs[(i + 1) % tabs.length];
            if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = tabs[(i - 1 + tabs.length) % tabs.length];
            if (e.key === "Home") next = tabs[0];
            if (e.key === "End") next = tabs[tabs.length - 1];
            if (next) {
              e.preventDefault();
              select(next, true);
            }
          });
        });
      });
    });

    /* ---------- Certificate lightbox ---------- */
    safely("lightbox", () => {
      const certs = $$("[data-lightbox]");
      if (certs.length) {
        const lb = document.createElement("div");
        lb.className = "lightbox";
        lb.setAttribute("role", "dialog");
        lb.setAttribute("aria-modal", "true");
        lb.setAttribute("aria-label", "Certificate, full size");
        lb.innerHTML = `<button class="lightbox-close" type="button" aria-label="Close">${ICON.close}</button><img alt="">`;
        document.body.appendChild(lb);
        const lbImg = lb.querySelector("img")!;
        const lbClose = lb.querySelector<HTMLButtonElement>(".lightbox-close")!;
        let lastFocused: HTMLElement | null = null;

        const closeLb = (): void => {
          if (!lb.classList.contains("open")) return;
          lb.classList.remove("open");
          document.body.style.overflow = "";
          lastFocused?.focus();
          lastFocused = null;
        };
        const openLb = (el: HTMLElement): void => {
          const img = el.querySelector("img");
          if (!img) return;
          lastFocused = el;
          lbImg.src = img.src;
          lbImg.alt = img.alt;
          lb.classList.add("open");
          document.body.style.overflow = "hidden";
          lbClose.focus();
        };
        certs.forEach((el) => {
          el.addEventListener("click", () => openLb(el));
          el.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openLb(el);
            }
          });
        });
        lb.addEventListener("click", (e) => {
          const target = e.target as Element;
          if (target === lb || target.closest(".lightbox-close")) closeLb();
        });
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") closeLb();
        });
      }
    });

    /* ---------- Gift reference code ----------
       Each visitor gets a short code (e.g. BALM-7KQ2) to put in the transfer
       description. The same code is filled into the confirmation form, so the
       team can match a bank alert to a person in seconds. */
    safely("gift reference", () => {
      const refEls = $$("[data-ref-code]");
      if (refEls.length) {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I to avoid mix-ups
        const buf = new Uint8Array(4);
        window.crypto.getRandomValues(buf);
        currentRef = "BALM-" + Array.from(buf, (b) => chars[b % chars.length]).join("");
        refEls.forEach((el) => {
          if (el instanceof HTMLInputElement) el.value = currentRef;
          else el.textContent = currentRef;
        });
      }
    });

    /* ---------- Copy to clipboard ---------- */
    safely("copy buttons", () => {
      const copyText = (val: string, done: () => void): void => {
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(val).then(done).catch(() => undefined);
          return;
        }
        const ta = document.createElement("textarea");
        ta.value = val;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          done();
        } catch {
          /* copying not allowed — nothing more we can do */
        }
        document.body.removeChild(ta);
      };
      $$<HTMLButtonElement>("[data-copy]").forEach((btn) => {
        btn.addEventListener("click", () => {
          let val = btn.getAttribute("data-copy") ?? "";
          if (val === "@ref") val = currentRef;
          const label = btn.querySelector("span");
          copyText(val, () => {
            btn.classList.add("done");
            if (!label) return;
            const original = label.textContent;
            label.textContent = "Copied";
            window.setTimeout(() => {
              label.textContent = original;
              btn.classList.remove("done");
            }, 1800);
          });
        });
      });
    });

    /* ---------- Prefill amount, contact reason and today's date ---------- */
    safely("prefill", () => {
      const params = new URLSearchParams(window.location.search);
      const amt = document.querySelector<HTMLInputElement>("[data-amount-field]");
      const qAmount = params.get("amount");
      if (amt && qAmount && /^\d{2,9}$/.test(qAmount)) amt.value = qAmount;

      const reasonSel = document.querySelector<HTMLSelectElement>('select[name="reason"]');
      const qReason = params.get("reason");
      if (reasonSel && qReason) {
        Array.from(reasonSel.options).forEach((o) => {
          if (o.value.toLowerCase().indexOf(qReason.toLowerCase()) === 0) reasonSel.value = o.value;
        });
      }

      $$<HTMLInputElement>("input[data-today]").forEach((d) => {
        const t = new Date();
        const iso = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
        d.max = iso;
        if (!d.value) d.value = iso;
      });
    });

    /* ---------- Forms (Netlify Forms) with inline checks ---------- */
    safely("forms", () => {
      type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      $$<HTMLFormElement>("form[data-form]").forEach((form) => {
        const statusEl = form.querySelector<HTMLElement>("[data-form-status]");
        const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');

        const errorFor = (input: Field): HTMLElement | null =>
          input.closest(".field")?.querySelector<HTMLElement>(".err") ?? null;
        const showErr = (input: Field, msg: string): void => {
          input.classList.add("invalid");
          input.setAttribute("aria-invalid", "true");
          const err = errorFor(input);
          if (err) {
            err.textContent = msg;
            err.classList.add("show");
          }
        };
        const clearErr = (input: Field): void => {
          input.classList.remove("invalid");
          input.removeAttribute("aria-invalid");
          errorFor(input)?.classList.remove("show");
        };
        $$<Field>("input, textarea, select", form).forEach((i) => i.addEventListener("input", () => clearErr(i)));

        const setStatus = (kind: "pending" | "success" | "error", text: string): void => {
          if (!statusEl) return;
          statusEl.textContent = text;
          statusEl.className = `form-status show ${kind}`;
        };

        form.addEventListener("submit", (e) => {
          e.preventDefault();
          let ok = true;
          $$<Field>("[required]", form).forEach((i) => {
            const empty = i instanceof HTMLInputElement && i.type === "checkbox" ? !i.checked : !i.value.trim();
            if (empty) {
              showErr(i, i.getAttribute("data-msg") ?? "Please fill this in.");
              ok = false;
            }
          });
          $$<HTMLInputElement>('input[type="email"]', form).forEach((i) => {
            if (i.value.trim() && !EMAIL.test(i.value.trim())) {
              showErr(i, "That email address doesn’t look right.");
              ok = false;
            }
          });
          if (!ok) {
            form.querySelector<HTMLElement>(".invalid")?.focus();
            return;
          }

          const body = new URLSearchParams();
          new FormData(form).forEach((v, k) => body.append(k, String(v)));

          if (submitBtn) submitBtn.disabled = true;
          setStatus("pending", "Sending…");

          fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: body.toString(),
          })
            .then((res) => {
              if (!res.ok) throw new Error(`Status ${res.status}`);
              setStatus("success", form.getAttribute("data-success") ?? "Sent — thank you.");
              const keep = form.querySelector<HTMLInputElement>("[data-ref-code]");
              const keepVal = keep?.value;
              form.reset();
              if (keep && keepVal !== undefined) keep.value = keepVal;
            })
            .catch(() => {
              setStatus("error", "That didn’t go through. Please try again, or email thebalmhealthinitiative@gmail.com.");
            })
            .finally(() => {
              if (submitBtn) submitBtn.disabled = false;
            });
        });
      });
    });
  });
})();
