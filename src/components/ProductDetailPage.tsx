import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { productRegistry } from "../config/productRegistry";
import { reviewsRegistry } from "../config/reviewsRegistry";
import { useTranslatedProduct } from "../hooks/useTranslatedProduct";

const PageContainer = styled.section`
  position: relative;
  z-index: 3;
`;

// Hero Section
const HeroSection = styled.section`
  margin-bottom: 6rem;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 4rem;
  }
`;

const HeroIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 12px;
  }
`;

const HeroInitialsPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  [data-theme="dark"] & {
    background-color: #ffffff;
    color: #000000;
  }

  [data-theme="dracula"] & {
    background-color: #ff79c6;
    color: #282a36;
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  color: #000000;
  margin-bottom: 1.5rem;
  transition: color 0.3s ease;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.1);

  [data-theme="dark"] & {
    color: #ffffff;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  [data-theme="dracula"] & {
    color: #f8f8f2;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
`;

const HeroDescription = styled.p`
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  line-height: 1.7;
  color: #000000;
  max-width: 800px;
  margin: 0 auto 3rem;
  opacity: 0.8;
  transition: color 0.3s ease;

  [data-theme="dark"] & {
    color: rgba(255, 255, 255, 0.8);
  }

  [data-theme="dracula"] & {
    color: rgba(248, 248, 242, 0.8);
  }
`;

const AddButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const AddToChromeButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background-color: #000000;
  color: #ffffff;
  font-size: 1.125rem;
  font-weight: 600;
  text-align: center;
  border-radius: 8px;
  border: none;
  transition: all 0.2s ease;
  text-decoration: none;

  [data-theme="dark"] & {
    background-color: #ffffff;
    color: #000000;

    &:hover {
      background-color: rgba(255, 255, 255, 0.9);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
    }
  }

  [data-theme="dracula"] & {
    background-color: #ff79c6;

    &:hover {
      background-color: #ff6bb5;
    }
  }

  &:hover {
    background-color: #333333;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`;

const FreeTag = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: rgba(80, 250, 123, 0.2);
  color: #50fa7b;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 4px;

  [data-theme="light"] & {
    background-color: rgba(80, 250, 123, 0.15);
    color: #2ecc71;
  }
`;

// Why Section
const WhySection = styled.section`
  margin-bottom: 6rem;

  @media (max-width: 768px) {
    margin-bottom: 4rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #000000;
  margin-bottom: 3rem;
  text-align: center;
  transition: color 0.3s ease;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.05);

  [data-theme="dark"] & {
    color: #ffffff;
    text-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  }

  [data-theme="dracula"] & {
    color: #f8f8f2;
    text-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const BenefitCard = styled.div`
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  padding: 2rem;
  transition: all 0.3s ease;

  [data-theme="dark"] & {
    background-color: rgba(26, 26, 26, 0.95);
    border-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }

  [data-theme="dracula"] & {
    background-color: #343746;
    border-color: rgba(255, 121, 198, 0.3);
  }

  &:hover {
    border-color: rgba(0, 0, 0, 0.12);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);

    [data-theme="dark"] & {
      border-color: rgba(255, 255, 255, 0.2);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    [data-theme="dracula"] & {
      border-color: rgba(255, 121, 198, 0.5);
      box-shadow: 0 4px 12px rgba(255, 121, 198, 0.2);
    }
  }
`;

const BenefitTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 0.75rem;
  transition: color 0.3s ease;

  [data-theme="dark"] & {
    color: #ffffff;
  }

  [data-theme="dracula"] & {
    color: #f8f8f2;
  }
`;

const BenefitDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #000000;
  opacity: 0.7;
  transition: color 0.3s ease;

  [data-theme="dark"] & {
    color: rgba(255, 255, 255, 0.7);
  }

  [data-theme="dracula"] & {
    color: rgba(248, 248, 242, 0.7);
  }
`;

// Demo Video Section
const DemoSection = styled.section`
  margin-bottom: 6rem;

  @media (max-width: 768px) {
    margin-bottom: 4rem;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);

  [data-theme="dark"] & {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  }

  [data-theme="dracula"] & {
    box-shadow: 0 8px 24px rgba(255, 121, 198, 0.2);
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

// Reviews Section
const ReviewsSection = styled.section`
  margin-bottom: 4rem;
`;

const ReviewsGrid = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  padding-bottom: 1rem;
  -webkit-overflow-scrolling: touch;

  /* Hide scrollbar completely */
  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }

  /* Hide scrollbar for Firefox */
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const ReviewCard = styled.article<{
  $isReddit?: boolean;
  $isVisible?: boolean;
}>`
  background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 360px;
  max-width: 420px;
  width: 100%;
  flex-shrink: 0;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transform: ${(props) =>
    props.$isVisible
      ? "translateX(0) scale(1)"
      : "translateX(30px) scale(0.95)"};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${(props) =>
      props.$isReddit
        ? "linear-gradient(90deg, #FF4500 0%, #FF6B35 100%)"
        : "linear-gradient(90deg, #4285F4 0%, #34A853 100%)"};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.08);
    border-color: ${(props) =>
      props.$isReddit ? "rgba(255, 69, 0, 0.2)" : "rgba(66, 133, 244, 0.2)"};

    &::before {
      opacity: 1;
    }
  }

  ${(props) =>
    props.$isReddit &&
    `
    background: linear-gradient(135deg, #FFF5F2 0%, #FFFFFF 100%);
    border-color: rgba(255, 69, 0, 0.15);
  `}

  [data-theme="dark"] & {
    background: linear-gradient(
      135deg,
      rgba(26, 26, 26, 0.98) 0%,
      rgba(20, 20, 20, 0.98) 100%
    );
    border-color: rgba(255, 255, 255, 0.12);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(20px);

    &:hover {
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(0, 0, 0, 0.4);
      border-color: ${(props) =>
        props.$isReddit ? "rgba(255, 69, 0, 0.4)" : "rgba(66, 133, 244, 0.4)"};
    }

    ${(props) =>
      props.$isReddit &&
      `
      background: linear-gradient(135deg, rgba(40, 20, 15, 0.98) 0%, rgba(26, 26, 26, 0.98) 100%);
      border-color: rgba(255, 69, 0, 0.25);
    `}
  }

  [data-theme="dracula"] & {
    background: linear-gradient(135deg, #343746 0%, #2d2f3e 100%);
    border-color: rgba(255, 121, 198, 0.2);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(255, 121, 198, 0.1);

    &:hover {
      box-shadow: 0 12px 24px rgba(255, 121, 198, 0.2),
        0 4px 8px rgba(0, 0, 0, 0.4);
      border-color: rgba(255, 121, 198, 0.4);
    }

    ${(props) =>
      props.$isReddit &&
      `
      background: linear-gradient(135deg, rgba(60, 30, 25, 0.98) 0%, #343746 100%);
      border-color: rgba(255, 69, 0, 0.3);
    `}
  }

  @media (max-width: 768px) {
    padding: 0.875rem 1rem;
    min-width: 300px;
    border-radius: 12px;
    gap: 0.625rem;
  }
`;

const SectionWrapper = styled.div`
  margin-bottom: 5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.875rem;
  margin-bottom: 0.125rem;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`;

const AuthorNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AvatarContainer = styled.div<{ $isReddit?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.$isReddit
      ? "linear-gradient(135deg, #FF4500 0%, #FF6B35 100%)"
      : "#FFFFFF"};
  box-shadow: 0 2px 8px
    ${(props) =>
      props.$isReddit ? "rgba(255, 69, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"};
  flex-shrink: 0;
  border: ${(props) =>
    props.$isReddit ? "none" : "1px solid rgba(0, 0, 0, 0.08)"};

  [data-theme="dark"] & {
    background: ${(props) =>
      props.$isReddit
        ? "linear-gradient(135deg, #FF4500 0%, #FF6B35 100%)"
        : "rgba(255, 255, 255, 0.95)"};
    border: ${(props) =>
      props.$isReddit ? "none" : "1px solid rgba(255, 255, 255, 0.1)"};
  }

  [data-theme="dracula"] & {
    background: ${(props) =>
      props.$isReddit
        ? "linear-gradient(135deg, #FF4500 0%, #FF6B35 100%)"
        : "rgba(255, 255, 255, 0.95)"};
    border: ${(props) =>
      props.$isReddit ? "none" : "1px solid rgba(255, 121, 198, 0.2)"};
  }
`;

const RedditIcon = styled.svg`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
`;

const GoogleIcon = styled.svg`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
`;

const AuthorName = styled.p`
  font-size: 0.9375rem;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: -0.01em;
  transition: color 0.3s ease;

  [data-theme="dark"] & {
    color: #ffffff;
  }

  [data-theme="dracula"] & {
    color: #f8f8f2;
  }
`;

const ReviewSource = styled.div<{ $isReddit?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.375rem 0.75rem;
  border-radius: 8px;
  width: fit-content;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;

  background: ${(props) =>
    props.$isReddit ? "rgba(255, 69, 0, 0.1)" : "rgba(66, 133, 244, 0.1)"};
  color: ${(props) => (props.$isReddit ? "#FF4500" : "#4285F4")};

  [data-theme="dark"] & {
    background: ${(props) =>
      props.$isReddit ? "rgba(255, 69, 0, 0.2)" : "rgba(66, 133, 244, 0.2)"};
    color: ${(props) => (props.$isReddit ? "#FF6B35" : "#5A9DFF")};
  }

  [data-theme="dracula"] & {
    background: ${(props) =>
      props.$isReddit ? "rgba(255, 69, 0, 0.2)" : "rgba(255, 121, 198, 0.2)"};
    color: ${(props) => (props.$isReddit ? "#FF6B35" : "#FF79C6")};
  }
`;

const StarsContainer = styled.div`
  display: flex;
  gap: 0.125rem;
  flex-shrink: 0;
  padding: 0.5rem 0.75rem;
  background: rgba(66, 133, 244, 0.08);
  border-radius: 10px;
  align-items: center;

  [data-theme="dark"] & {
    background: rgba(66, 133, 244, 0.15);
  }

  [data-theme="dracula"] & {
    background: rgba(255, 121, 198, 0.15);
  }
`;

const Star = styled.span<{ $filled: boolean }>`
  color: ${(props) => (props.$filled ? "#FFC107" : "rgba(0, 0, 0, 0.15)")};
  font-size: 1.125rem;
  line-height: 1;
  transition: all 0.2s ease;
  text-shadow: ${(props) =>
    props.$filled ? "0 1px 2px rgba(255, 193, 7, 0.3)" : "none"};

  [data-theme="dark"] & {
    color: ${(props) =>
      props.$filled ? "#FFC107" : "rgba(255, 255, 255, 0.15)"};
  }

  [data-theme="dracula"] & {
    color: ${(props) =>
      props.$filled ? "#FFC107" : "rgba(248, 248, 242, 0.15)"};
  }
`;

const ReviewText = styled.p`
  font-size: 0.875rem;
  line-height: 1.55;
  color: #2c2c2c;
  flex: 1;
  font-weight: 400;
  transition: color 0.3s ease;
  margin: 0.125rem 0;

  [data-theme="dark"] & {
    color: rgba(255, 255, 255, 0.85);
  }

  [data-theme="dracula"] & {
    color: rgba(248, 248, 242, 0.85);
  }
`;

const ReviewDate = styled.p`
  font-size: 0.6875rem;
  color: #888888;
  margin-top: auto;
  font-weight: 500;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &::before {
    content: "📅";
    font-size: 0.75rem;
  }

  [data-theme="dark"] & {
    color: rgba(255, 255, 255, 0.6);
  }

  [data-theme="dracula"] & {
    color: rgba(248, 248, 242, 0.6);
  }
`;

const ReviewLink = styled.a<{ $isReddit?: boolean }>`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${(props) => (props.$isReddit ? "#FF4500" : "#4285F4")};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  width: fit-content;
  margin-top: 0.125rem;

  background: ${(props) =>
    props.$isReddit ? "rgba(255, 69, 0, 0.08)" : "rgba(66, 133, 244, 0.08)"};

  &:hover {
    background: ${(props) =>
      props.$isReddit ? "rgba(255, 69, 0, 0.15)" : "rgba(66, 133, 244, 0.15)"};
    transform: translateX(2px);
  }

  &::after {
    content: "→";
    transition: transform 0.2s ease;
  }

  &:hover::after {
    transform: translateX(2px);
  }

  [data-theme="dark"] & {
    background: ${(props) =>
      props.$isReddit ? "rgba(255, 69, 0, 0.15)" : "rgba(66, 133, 244, 0.15)"};
    color: ${(props) => (props.$isReddit ? "#FF6B35" : "#5A9DFF")};

    &:hover {
      background: ${(props) =>
        props.$isReddit
          ? "rgba(255, 69, 0, 0.25)"
          : "rgba(66, 133, 244, 0.25)"};
    }
  }

  [data-theme="dracula"] & {
    background: ${(props) =>
      props.$isReddit ? "rgba(255, 69, 0, 0.15)" : "rgba(255, 121, 198, 0.15)"};
    color: ${(props) => (props.$isReddit ? "#FF6B35" : "#FF79C6")};

    &:hover {
      background: ${(props) =>
        props.$isReddit
          ? "rgba(255, 69, 0, 0.25)"
          : "rgba(255, 121, 198, 0.25)"};
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666666;
  transition: color 0.3s ease;

  [data-theme="dark"] & {
    color: rgba(255, 255, 255, 0.7);
  }

  [data-theme="dracula"] & {
    color: rgba(248, 248, 242, 0.7);
  }
`;

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star key={i} $filled={i < rating}>
      ★
    </Star>
  ));
};

const getYouTubeEmbedUrl = (url: string): string => {
  // Extract video ID from various YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[2].length === 11 ? match[2] : null;

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url;
};

const ReviewCardWithAnimation: React.FC<{
  review: (typeof reviewsRegistry)[0];
  index: number;
}> = ({ review, index }) => {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isReddit = review.source === "Reddit";

  return (
    <ReviewCard
      ref={cardRef}
      $isReddit={isReddit}
      $isVisible={isVisible}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <ReviewHeader>
        <AuthorInfo>
          <AuthorNameContainer>
            <AvatarContainer $isReddit={isReddit}>
              {isReddit ? (
                <RedditIcon viewBox="0 0 24 24" fill="white">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                </RedditIcon>
              ) : (
                <GoogleIcon viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </GoogleIcon>
              )}
            </AvatarContainer>
            <div>
              <AuthorName>{review.author}</AuthorName>
              <ReviewSource $isReddit={isReddit}>
                {isReddit ? t("productDetail.sourceReddit") : t("productDetail.sourceChrome")}
              </ReviewSource>
            </div>
          </AuthorNameContainer>
        </AuthorInfo>
        {!isReddit && review.rating && (
          <StarsContainer>{renderStars(review.rating)}</StarsContainer>
        )}
      </ReviewHeader>
      <ReviewText>{review.text}</ReviewText>
      <ReviewDate>{review.date}</ReviewDate>
      {review.link && (
        <ReviewLink
          href={review.link}
          target="_blank"
          rel="noopener noreferrer"
          $isReddit={isReddit}
        >
          {isReddit ? t("productDetail.viewPost") : t("productDetail.viewReview")}
        </ReviewLink>
      )}
    </ReviewCard>
  );
};

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();

  const product = productRegistry.find((p) => p.id === id);
  const translated = useTranslatedProduct(product);

  const benefitList = t("benefits.promptNav", {
    returnObjects: true,
  }) as { title: string; description: string }[];

  useEffect(() => {
    if (!product) {
      document.title = t("app.documentTitle");
      return;
    }
    document.title = `${translated.name} — ${t("app.name")}`;
    return () => {
      document.title = t("app.documentTitle");
    };
  }, [product, translated.name, t, i18n.language]);

  if (!product) {
    return (
      <PageContainer>
        <EmptyState>
          <h2>{t("productDetail.notFound")}</h2>
          <p>{t("productDetail.notFoundDesc")}</p>
        </EmptyState>
      </PageContainer>
    );
  }

  const productReviews = reviewsRegistry.filter(
    (review) => review.extensionId === product.id || !review.extensionId
  );

  const chromeReviews = productReviews.filter(
    (r) => r.source === "Chrome Store"
  );
  const redditComments = productReviews.filter((r) => r.source === "Reddit");

  return (
    <PageContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroIcon>
          {product.iconPath ? (
            <img
              src={product.iconPath}
              alt={t("productCard.iconAlt", { name: translated.name })}
            />
          ) : (
            <HeroInitialsPlaceholder>
              {(() => {
                const words = translated.name.trim().split(/\s+/);
                if (words.length >= 2) {
                  return (words[0][0] + words[1][0]).toUpperCase();
                }
                return translated.name.substring(0, 2).toUpperCase();
              })()}
            </HeroInitialsPlaceholder>
          )}
        </HeroIcon>
        <HeroTitle>{translated.name}</HeroTitle>
        <HeroDescription>{translated.description}</HeroDescription>
        <AddButtonContainer>
          {product.status === "Live" && product.links.chromeStore ? (
            <>
              <AddToChromeButton
                href={product.links.chromeStore}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("productDetail.addToChrome")}
              </AddToChromeButton>
              <FreeTag>{t("productDetail.free")}</FreeTag>
            </>
          ) : (
            <AddToChromeButton
              as="div"
              style={{ cursor: "not-allowed", opacity: 0.6 }}
            >
              {t("productDetail.comingSoon")}
            </AddToChromeButton>
          )}
        </AddButtonContainer>
      </HeroSection>

      {/* Why Section */}
      <WhySection>
        <SectionTitle>{t("productDetail.whyTitle")}</SectionTitle>
        <BenefitsGrid>
          {benefitList.map((benefit, index) => (
            <BenefitCard key={index}>
              <BenefitTitle>{benefit.title}</BenefitTitle>
              <BenefitDescription>{benefit.description}</BenefitDescription>
            </BenefitCard>
          ))}
        </BenefitsGrid>
      </WhySection>

      {/* Demo Video Section */}
      {product.demoVideoUrl && (
        <DemoSection>
          <SectionTitle>See It In Action</SectionTitle>
          <VideoContainer>
            <iframe
              src={getYouTubeEmbedUrl(product.demoVideoUrl)}
              title={`${product.name} Demo Video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </VideoContainer>
        </DemoSection>
      )}

      {/* Reviews Section */}
      <ReviewsSection>
        {/* Chrome Store Reviews Section */}
        {chromeReviews.length > 0 && (
          <SectionWrapper>
            <SectionTitle
              style={{
                fontSize: "clamp(1.25rem, 3vw, 2rem)",
                marginBottom: "2rem",
              }}
            >
              {t("productDetail.chromeReviews")}
            </SectionTitle>
            <ReviewsGrid>
              {chromeReviews.map((review, index) => (
                <ReviewCardWithAnimation
                  key={review.id}
                  review={review}
                  index={index}
                />
              ))}
            </ReviewsGrid>
          </SectionWrapper>
        )}

        {/* Reddit Comments Section */}
        {redditComments.length > 0 && (
          <SectionWrapper>
            <SectionTitle
              style={{
                fontSize: "clamp(1.25rem, 3vw, 2rem)",
                marginBottom: "2rem",
              }}
            >
              {t("productDetail.redditComments")}
            </SectionTitle>
            <ReviewsGrid>
              {redditComments.map((review, index) => (
                <ReviewCardWithAnimation
                  key={review.id}
                  review={review}
                  index={index}
                />
              ))}
            </ReviewsGrid>
          </SectionWrapper>
        )}

        {productReviews.length === 0 && (
          <EmptyState>
            <p>{t("productDetail.noReviews")}</p>
          </EmptyState>
        )}
      </ReviewsSection>
    </PageContainer>
  );
};
