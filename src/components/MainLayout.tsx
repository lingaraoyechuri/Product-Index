import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { StarfieldBackground } from "./StarfieldBackground";
import { LightBackground } from "./LightBackground";
import { DraculaBackground } from "./DraculaBackground";

const sheetEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  background-color: rgba(255, 255, 255, 0.85);
  padding: 0.875rem clamp(1rem, 4vw, 2rem);
  transition: background-color 0.3s ease, border-color 0.3s ease,
    box-shadow 0.3s ease;
  backdrop-filter: blur(14px) saturate(1.25);
  -webkit-backdrop-filter: blur(14px) saturate(1.25);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04);

  [data-theme="dark"] & {
    background-color: rgba(22, 22, 22, 0.88);
    border-bottom-color: rgba(255, 255, 255, 0.08);
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.35);
  }

  [data-theme="dracula"] & {
    background-color: rgba(52, 55, 70, 0.92);
    border-bottom-color: rgba(255, 121, 198, 0.22);
    box-shadow: 0 1px 0 rgba(255, 121, 198, 0.12);
  }

  @media (max-width: 768px) {
    padding: 0.625rem 0.75rem;
  }
`;

const HeaderContent = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 0.5rem;
  min-height: 40px;

  @media (min-width: 769px) {
    gap: 0.75rem 1rem;
  }
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  flex-shrink: 0;
  min-width: 0;
`;

const Logo = styled.h2`
  font-size: clamp(1.125rem, 3vw, 1.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #000000;
  cursor: pointer;
  margin: 0;
  line-height: 1;
  transition: opacity 0.2s ease, color 0.3s ease;

  [data-theme="dark"] & {
    color: #ffffff;
  }

  [data-theme="dracula"] & {
    color: #f8f8f2;
  }

  &:hover {
    opacity: 0.82;
  }

  @media (max-width: 768px) {
    font-size: 1.35rem;
    letter-spacing: -0.04em;
  }
`;

const LogoFull = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoShort = styled.span`
  display: none;
  font-weight: 800;
  @media (max-width: 768px) {
    display: inline;
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex: 1;
  justify-content: center;
  min-width: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileNav = styled.nav`
  display: none;
  align-items: center;
  gap: 0.2rem;
  flex: 1;
  justify-content: center;
  min-width: 0;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const NavLink = styled(Link)<{ $isActive?: boolean; $compact?: boolean }>`
  font-size: ${(p) => (p.$compact ? "0.8125rem" : "0.9375rem")};
  font-weight: ${(p) => (p.$compact ? 600 : 500)};
  padding: ${(p) => (p.$compact ? "0.4rem 0.65rem" : "0.5rem 1rem")};
  border-radius: 8px;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease;
  color: #000000;
  opacity: ${(props) => (props.$isActive ? "1" : "0.78")};
  background-color: ${(props) =>
    props.$isActive ? "rgba(0, 0, 0, 0.07)" : "transparent"};

  [data-theme="dark"] & {
    color: #ffffff;
    background-color: ${(props) =>
      props.$isActive ? "rgba(255, 255, 255, 0.12)" : "transparent"};
  }

  [data-theme="dracula"] & {
    color: #f8f8f2;
    background-color: ${(props) =>
      props.$isActive ? "rgba(255, 121, 198, 0.18)" : "transparent"};
  }

  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.05);
    [data-theme="dark"] & {
      background-color: rgba(255, 255, 255, 0.08);
    }
    [data-theme="dracula"] & {
      background-color: rgba(255, 121, 198, 0.12);
    }
  }
`;

const DesktopToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
  margin-left: auto;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SheetOpenButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  flex-shrink: 0;
  color: #000000;
  background-color: rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s ease, color 0.2s ease;

  [data-theme="dark"] & {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.1);
  }

  [data-theme="dracula"] & {
    color: #f8f8f2;
    background-color: rgba(255, 121, 198, 0.12);
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.09);
    [data-theme="dark"] & {
      background-color: rgba(255, 255, 255, 0.16);
    }
    [data-theme="dracula"] & {
      background-color: rgba(255, 121, 198, 0.22);
    }
  }

  &:focus-visible {
    outline: 2px solid rgba(66, 133, 244, 0.55);
    outline-offset: 2px;
  }

  [data-theme="dracula"] &:focus-visible {
    outline-color: rgba(255, 121, 198, 0.65);
  }

  @media (max-width: 768px) {
    display: flex;
  }

  svg {
    width: 22px;
    height: 22px;
  }
`;

const SheetBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 250;
  background-color: rgba(0, 0, 0, 0.4);

  [data-theme="dark"] & {
    background-color: rgba(0, 0, 0, 0.55);
  }
`;

const TopSheetPanel = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 260;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0.75rem clamp(1rem, 4vw, 2rem) 1.25rem;
  padding-top: max(0.75rem, env(safe-area-inset-top));
  border-radius: 0 0 16px 16px;
  background-color: rgba(255, 255, 255, 0.97);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-top: none;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  animation: ${sheetEnter} 0.22s ease-out;
  backdrop-filter: blur(16px) saturate(1.2);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);

  [data-theme="dark"] & {
    background-color: rgba(28, 28, 28, 0.97);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 20px 56px rgba(0, 0, 0, 0.55);
  }

  [data-theme="dracula"] & {
    background-color: rgba(52, 55, 70, 0.98);
    border-color: rgba(255, 121, 198, 0.28);
    box-shadow: 0 20px 56px rgba(0, 0, 0, 0.45),
      0 0 0 1px rgba(255, 121, 198, 0.08);
  }
`;

const SheetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SheetTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #000000;

  [data-theme="dark"] & {
    color: #ffffff;
  }

  [data-theme="dracula"] & {
    color: #f8f8f2;
  }
`;

const SheetClose = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #666666;
  background: rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s ease, color 0.2s ease;

  [data-theme="dark"] & {
    color: rgba(255, 255, 255, 0.75);
    background: rgba(255, 255, 255, 0.08);
  }

  [data-theme="dracula"] & {
    color: #f8f8f2;
    background: rgba(255, 121, 198, 0.12);
  }

  &:hover {
    background: rgba(0, 0, 0, 0.09);
    [data-theme="dark"] & {
      background: rgba(255, 255, 255, 0.14);
    }
    [data-theme="dracula"] & {
      background: rgba(255, 121, 198, 0.22);
    }
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const SheetBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
  overflow: visible;
`;

const SheetRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SheetLabel = styled.span`
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #666666;

  [data-theme="dark"] & {
    color: rgba(255, 255, 255, 0.55);
  }

  [data-theme="dracula"] & {
    color: rgba(248, 248, 242, 0.55);
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  background-color: #ffffff;
  transition: background-color 0.3s ease;
  position: relative;
  z-index: 2;

  [data-theme="dark"] & {
    background-color: transparent;
  }

  [data-theme="light"] & {
    background-color: transparent;
  }

  [data-theme="dracula"] & {
    background-color: transparent;
  }

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const Footer = styled.footer`
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  background-color: #ffffff;
  padding: 2rem clamp(1rem, 4vw, 2rem);
  margin-top: auto;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  position: relative;
  z-index: 10;
  backdrop-filter: blur(10px);

  [data-theme="dark"] & {
    background-color: rgba(26, 26, 26, 0.8);
    border-top-color: rgba(255, 255, 255, 0.1);
  }

  [data-theme="dracula"] & {
    background-color: #343746;
    border-top-color: rgba(255, 121, 198, 0.3);
  }
`;

const FooterContent = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
`;

const Copyright = styled.p`
  font-size: 0.875rem;
  color: #666666;
  transition: color 0.3s ease;

  [data-theme="dark"] & {
    color: rgba(255, 255, 255, 0.7);
  }

  [data-theme="dracula"] & {
    color: rgba(248, 248, 242, 0.7);
  }
`;

const SlidersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M9 21h6M15 8H9M7 3h10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseXIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M6 6l12 12M18 6L6 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const isProductDetail = /^\/tools\/[^/]+$/.test(location.pathname);
    if (!isProductDetail) {
      document.title = t("app.documentTitle");
    }
    const short = i18n.language.split("-")[0] ?? "en";
    document.documentElement.lang = short === "zh" ? "zh-Hans" : short;
  }, [location.pathname, t, i18n.language]);

  useEffect(() => {
    setSheetOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheetOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [sheetOpen]);

  const toolsActive =
    location.pathname === "/tools" || location.pathname === "/";
  const aboutActive = location.pathname === "/about";

  const sheet =
    sheetOpen &&
    createPortal(
      <>
        <SheetBackdrop
          aria-hidden
          onClick={() => setSheetOpen(false)}
        />
        <TopSheetPanel
          role="dialog"
          aria-modal="true"
          aria-labelledby="display-settings-title"
        >
          <SheetHeader>
            <SheetTitle id="display-settings-title">
              {t("nav.settingsSheetTitle")}
            </SheetTitle>
            <SheetClose
              type="button"
              onClick={() => setSheetOpen(false)}
              aria-label={t("nav.closeSheet")}
            >
              <CloseXIcon />
            </SheetClose>
          </SheetHeader>
          <SheetBody>
            <SheetRow>
              <SheetLabel>{t("language.label")}</SheetLabel>
              <LanguageSwitcher />
            </SheetRow>
            <SheetRow>
              <SheetLabel>{t("nav.appearance")}</SheetLabel>
              <ThemeToggle />
            </SheetRow>
          </SheetBody>
        </TopSheetPanel>
      </>,
      document.body
    );

  return (
    <LayoutContainer>
      <StarfieldBackground />
      <LightBackground />
      <DraculaBackground />
      {sheet}
      <Header>
        <HeaderContent>
          <LogoLink to="/" aria-label={t("app.name")}>
            <Logo>
              <LogoFull>{t("app.name")}</LogoFull>
              <LogoShort aria-hidden>{t("app.logoShort")}</LogoShort>
            </Logo>
          </LogoLink>

          <DesktopNav aria-label="Main navigation">
            <NavLink to="/tools" $isActive={toolsActive}>
              {t("nav.tools")}
            </NavLink>
            <NavLink to="/about" $isActive={aboutActive}>
              {t("nav.about")}
            </NavLink>
          </DesktopNav>

          <MobileNav aria-label="Main navigation">
            <NavLink
              to="/tools"
              $isActive={toolsActive}
              $compact
            >
              {t("nav.tools")}
            </NavLink>
            <NavLink to="/about" $isActive={aboutActive} $compact>
              {t("nav.about")}
            </NavLink>
          </MobileNav>

          <DesktopToolbar>
            <LanguageSwitcher />
            <ThemeToggle />
          </DesktopToolbar>

          <SheetOpenButton
            type="button"
            aria-expanded={sheetOpen}
            aria-haspopup="dialog"
            onClick={() => setSheetOpen((o) => !o)}
            aria-label={t("nav.openDisplaySettings")}
          >
            <SlidersIcon />
          </SheetOpenButton>
        </HeaderContent>
      </Header>
      <Main>{children}</Main>
      <Footer>
        <FooterContent>
          <Copyright>
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </Copyright>
        </FooterContent>
      </Footer>
    </LayoutContainer>
  );
};
