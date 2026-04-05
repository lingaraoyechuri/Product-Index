import styled, { keyframes } from "styled-components";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "../i18n/config";

const fadeSlide = keyframes`
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SelectShell = styled.div<{ $open: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.25rem;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  min-height: calc(0.25rem + 32px + 0.25rem);
  position: relative;
  transition: background-color 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  [data-theme="dark"] & {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.1);
  }

  [data-theme="dracula"] & {
    background-color: rgba(255, 121, 198, 0.1);
    border-color: rgba(255, 121, 198, 0.2);
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.09);
    border-color: rgba(0, 0, 0, 0.14);
    [data-theme="dark"] & {
      background-color: rgba(255, 255, 255, 0.14);
      border-color: rgba(255, 255, 255, 0.18);
    }
    [data-theme="dracula"] & {
      background-color: rgba(255, 121, 198, 0.18);
      border-color: rgba(255, 121, 198, 0.38);
    }
  }

  ${(p) =>
    p.$open
      ? `
    box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.5);
    [data-theme="dark"] & {
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.4);
    }
    [data-theme="dracula"] & {
      box-shadow: 0 0 0 2px rgba(255, 121, 198, 0.6);
    }
  `
      : `
    &:focus-within {
      box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.45);
      [data-theme="dark"] & {
        box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.35);
      }
      [data-theme="dracula"] & {
        box-shadow: 0 0 0 2px rgba(255, 121, 198, 0.55);
      }
    }
  `}
`;

const TriggerButton = styled.button`
  appearance: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  min-width: 7.25rem;
  height: 32px;
  margin: 0;
  padding: 0 0.4rem 0 0.5rem;
  font-size: 0.8125rem;
  font-weight: 500;
  font-family: inherit;
  line-height: 1;
  color: #000000;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;

  [data-theme="dark"] & {
    color: #ffffff;
  }

  [data-theme="dracula"] & {
    color: #f8f8f2;
  }

  &:focus {
    outline: none;
  }
`;

const Chevron = styled.span<{ $open: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  color: #666666;
  transition: transform 0.2s ease;
  transform: rotate(${(p) => (p.$open ? "180deg" : "0deg")});

  [data-theme="dark"] & {
    color: rgba(255, 255, 255, 0.75);
  }

  [data-theme="dracula"] & {
    color: #ff79c6;
  }

  svg {
    width: 12px;
    height: 12px;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  min-width: 10rem;
  margin: 0;
  padding: 0.35rem;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  z-index: 200;
  border-radius: 10px;
  animation: ${fadeSlide} 0.18s ease-out;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12), 0 2px 10px rgba(0, 0, 0, 0.06);

  [data-theme="dark"] & {
    background-color: rgba(26, 26, 26, 0.98);
    border-color: rgba(255, 255, 255, 0.12);
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(12px);
  }

  [data-theme="dracula"] & {
    background-color: #343746;
    border-color: rgba(255, 121, 198, 0.35);
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.45),
      0 0 0 1px rgba(255, 121, 198, 0.15);
    backdrop-filter: blur(12px);
  }
`;

const OptionButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 0.5rem;
  padding: 0.5rem 0.65rem;
  margin: 0;
  border: none;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 500;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
  color: #1a1a1a;
  background: ${(p) =>
    p.$active ? "rgba(0, 0, 0, 0.06)" : "transparent"};

  [data-theme="dark"] & {
    color: rgba(255, 255, 255, 0.95);
    background: ${(p) =>
      p.$active ? "rgba(255, 255, 255, 0.12)" : "transparent"};
  }

  [data-theme="dracula"] & {
    color: #f8f8f2;
    background: ${(p) =>
      p.$active ? "rgba(255, 121, 198, 0.2)" : "transparent"};
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.07);
    [data-theme="dark"] & {
      background-color: rgba(255, 255, 255, 0.1);
    }
    [data-theme="dracula"] & {
      background-color: rgba(255, 121, 198, 0.15);
    }
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    box-shadow: inset 0 0 0 2px rgba(66, 133, 244, 0.45);
    [data-theme="dark"] & {
      box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.35);
    }
    [data-theme="dracula"] & {
      box-shadow: inset 0 0 0 2px rgba(255, 121, 198, 0.55);
    }
  }
`;

const CheckMark = styled.span`
  flex-shrink: 0;
  width: 1rem;
  height: 1rem;
  color: #1a73e8;
  display: flex;
  align-items: center;
  justify-content: center;

  [data-theme="dark"] & {
    color: #8ab4f8;
  }

  [data-theme="dracula"] & {
    color: #ff79c6;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const CheckSpacer = styled.span`
  flex-shrink: 0;
  width: 1rem;
  height: 1rem;
`;

const ChevronSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const CheckSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  const raw = i18n.resolvedLanguage ?? i18n.language;
  const short = raw.split("-")[0] ?? "en";
  const value = SUPPORTED_LANGUAGES.some((l) => l.code === short)
    ? short
    : "en";

  const current = SUPPORTED_LANGUAGES.find((l) => l.code === value) ?? SUPPORTED_LANGUAGES[0];

  const selectLang = useCallback(
    (code: string) => {
      i18n.changeLanguage(code).catch(() => undefined);
      setOpen(false);
      triggerRef.current?.focus();
    },
    [i18n]
  );

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (shellRef.current && !shellRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <SelectShell ref={shellRef} $open={open}>
      <TriggerButton
        ref={triggerRef}
        type="button"
        id="language-select-trigger"
        aria-label={t("language.aria")}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" && !open) {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        <span>{current.label}</span>
        <Chevron $open={open} aria-hidden>
          <ChevronSvg />
        </Chevron>
      </TriggerButton>

      {open && (
        <Dropdown
          id={listId}
          role="listbox"
          aria-labelledby="language-select-trigger"
        >
          {SUPPORTED_LANGUAGES.map(({ code, label }) => (
            <OptionButton
              key={code}
              type="button"
              role="option"
              aria-selected={code === value}
              $active={code === value}
              onClick={() => selectLang(code)}
            >
              <span>{label}</span>
              {code === value ? (
                <CheckMark aria-hidden>
                  <CheckSvg />
                </CheckMark>
              ) : (
                <CheckSpacer aria-hidden />
              )}
            </OptionButton>
          ))}
        </Dropdown>
      )}
    </SelectShell>
  );
};
