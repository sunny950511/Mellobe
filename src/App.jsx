import React, { useState, useEffect, useRef } from 'react';
import { Heart, ArrowRight, Sparkles, Shield, ArrowUp } from 'lucide-react';
import './App.css';
import TextType from './TextType';
import FeverLab from './FeverLab';
import BrandStory from './BrandStory';
import UnboxingSpec from './UnboxingSpec';
import OrderForm from './OrderForm';
import brandLogo from './assets/brand_logo.png';
import lampSlideMix from './assets/lamp_slide_mix.png';
import hero2 from './assets/hero2.png';
import hero3 from './assets/hero3.png';
import hero4 from './assets/hero4.png';
import hero5 from './assets/hero5.png';
import hero6 from './assets/hero6.png';
import ootd1 from './assets/ootd_gallery_1.png';
import ootd2 from './assets/ootd_gallery_2.png';
import ootd3 from './assets/ootd_gallery_3.png';

const heroImages = [hero2, hero3, hero4, hero5, hero6];


function App() {

  // Hero Image Slider State
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Section 4: Gallery Hearts State
  const [likedCards, setLikedCards] = useState({
    card1: false,
    card2: false,
    card3: false,
  });

  // OOTD 갤러리 + 언박싱 통합 다크 존 배경 트리거
  const darkZoneRef = useRef(null);
  const specSectionRef = useRef(null); // UnboxingSpec 섹션 다크→라이트 전환 트리거
  const epicCtaRef = useRef(null); // 에픽 CTA 레퍼런스
  const [isGalleryActive, setIsGalleryActive] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false); // 스크롤 탑 버튼 표시 상태 추가
  const [isOrderOpen, setIsOrderOpen] = useState(false); // 주문 정보 입력창 노출 상태

  // Hero Image Load Animation
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);

  useEffect(() => {
    // 히어로 이미지 미리 다운로드(프리로드)하여 크로스페이드 시 끊김 깜빡임 차단
    heroImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Hero 쫀득 등장 타이밍
    const timer = setTimeout(() => {
      setIsHeroLoaded(true);
    }, 100);

    // Hero 자동 이미지 슬라이더 타이머 (3.5초 주기)
    const slideTimer = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3500);

    // 갤러리 진입 시 다크모드 ON, 벗어나면 OFF
    const darkZoneObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsGalleryActive(true);
        } else {
          setIsGalleryActive(false);
        }
      },
      {
        threshold: 0.05
      }
    );

    // UnboxingSpec 진입 시 다크모드 OFF, 위로 나가면 다크모드 ON 복구
    const specSectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsGalleryActive(false); // 언박싱 섹션 진입 → 라이트모드
        } else if (entry.boundingClientRect.top > 0) {
          setIsGalleryActive(true);  // 언박싱 섹션이 뷰포트 아래로 나감 → 갤러리로 돌아온 것이므로 다크모드 복구
        }
      },
      {
        threshold: 0.05
      }
    );

    if (darkZoneRef.current) {
      darkZoneObserver.observe(darkZoneRef.current);
    }
    if (specSectionRef.current) {
      specSectionObserver.observe(specSectionRef.current);
    }

    // 3. 마우스 추적 선명한 컨페티 트레일 효과
    const colors = [
      '#FFB7B2', // 파스텔 핑크
      '#FFDAC1', // 파스텔 오렌지
      '#E2F0CB', // 파스텔 옐로우그린
      '#B5EAD7', // 파스텔 민트
      '#C7CEEA', // 파스텔 바이올렛
      '#FF6B35', // 시그니처 코랄
      '#FFF2AC', // 시그니처 버터
      '#0B4628'  // 시그니처 딥그린
    ];

    const createMouseConfetti = (x, y) => {
      if (window.matchMedia('(max-width: 768px)').matches) return;

      const confetti = document.createElement('div');
      confetti.className = 'mouse-confetti-piece';

      const shapes = ['square', 'circle', 'triangle'];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      confetti.classList.add(`shape-${shape}`);

      const color = colors[Math.floor(Math.random() * colors.length)];

      const size = Math.random() * 8 + 6; // 6px ~ 14px 선명한 크기
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;

      if (shape === 'triangle') {
        confetti.style.width = '0';
        confetti.style.height = '0';
        confetti.style.borderLeftWidth = `${size / 2}px`;
        confetti.style.borderRightWidth = `${size / 2}px`;
        confetti.style.borderBottomWidth = `${size}px`;
        confetti.style.borderBottomColor = color;
      } else {
        confetti.style.backgroundColor = color;
      }

      const offsetX = (Math.random() - 0.5) * 10;
      const offsetY = (Math.random() - 0.5) * 10;
      confetti.style.left = `${x + offsetX}px`;
      confetti.style.top = `${y + offsetY}px`;

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 50 + 20;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance + 30; // 중력 낙하 효과
      const rot = (Math.random() - 0.5) * 360;

      confetti.style.setProperty('--tx', `${tx}px`);
      confetti.style.setProperty('--ty', `${ty}px`);
      confetti.style.setProperty('--rot', `${rot}deg`);

      document.body.appendChild(confetti);

      confetti.addEventListener('animationend', () => {
        confetti.remove();
      });
    };

    const handleMouseMove = (e) => {
      createMouseConfetti(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
      clearInterval(slideTimer);
      if (darkZoneRef.current) {
        darkZoneObserver.unobserve(darkZoneRef.current);
      }
      if (specSectionRef.current) {
        specSectionObserver.unobserve(specSectionRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // 스크롤 높이에 따라 탑 버튼 표시 제어
  useEffect(() => {
    const handleScrollBtn = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScrollBtn);
    return () => window.removeEventListener('scroll', handleScrollBtn);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // (handlePatternChange 로직은 FeverLab 컴포넌트 내부로 이관되었습니다)

  // 하트 클릭 찜하기 인터랙션
  const toggleLike = (cardKey) => {
    setLikedCards(prev => ({
      ...prev,
      [cardKey]: !prev[cardKey]
    }));
  };


  return (
    <div className={`app-container ${isGalleryActive ? 'theme-dark' : 'theme-light'}`}>


      {/* HEADER */}
      <header className="brand-header">
        <div className="header-logo" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
          <img src={brandLogo} alt="Checkerboard Fever Logo" className="logo-img" />
        </div>

        {/* 네비게이션 메뉴바: 데스크톱/태블릿은 도트 연동형, 모바일은 키치한 칩 테마 적용 */}
        <nav className="header-nav">
          <a href="#brand-story" className="nav-item">
            <span className="dot dot-primary"></span>
            <span className="nav-text">STORY</span>
          </a>
          <a href="#fever-lab" className="nav-item">
            <span className="dot dot-accent"></span>
            <span className="nav-text">LAB</span>
          </a>
          <a href="#gallery" className="nav-item">
            <span className="dot dot-butter"></span>
            <span className="nav-text">GALLERY</span>
          </a>
          <a href="#spec" className="nav-item">
            <span className="dot dot-primary"></span>
            <span className="nav-text">SPEC</span>
          </a>
          <a href="#order" className="nav-item">
            <span className="dot dot-accent"></span>
            <span className="nav-text">ORDER</span>
          </a>
        </nav>
      </header>

      {/* SECTION 1: HERO - 100vh 비대칭 인터록킹 그리드 (Interlocking Grid) */}
      <section className="section-hero-kitsch">

        {/* 히어로 섹션 전체 배경에 꽉 차는 흐릿한 백그라운드 이미지 슬라이더 */}
        <div className="hero-blur-bg-wrap" aria-hidden="true">
          {heroImages.map((imgSrc, idx) => (
            <div
              key={idx}
              className={`hero-blur-bg-img ${idx === currentHeroIndex ? 'active' : ''} ${idx === 3 ? 'hero5-special' : ''}`}
              style={{ backgroundImage: `url(${imgSrc})` }}
            />
          ))}
        </div>

        <div className="hero-interlocking-grid">

          {/* 셀 1: 거대한 메인 카피 타이포그래피 영역 */}
          <div className="grid-cell cell-title-brand">
            <span className="grid-badge">NEW KITSCH LIGHT</span>
            <h1 className="grid-main-title">
              {['M', 'e', 'l', 'l', 'o', 'b', 'e'].map((letter, i) => (
                <span key={i} className="bounce-letter">
                  {letter}
                </span>
              ))}
            </h1>
          </div>

          {/* 셀 2: 조명 이미지 로테이션 슬라이더 영역 */}
          <div className="grid-cell cell-image-slider">
            <div className="grid-slider-frame">
              {heroImages.map((imgSrc, idx) => (
                <div
                  key={idx}
                  className={`grid-slide-img ${idx === currentHeroIndex ? 'active' : ''} ${idx === 3 ? 'hero5-special' : ''}`}
                  style={{ backgroundImage: `url(${imgSrc})` }}
                />
              ))}
            </div>
          </div>

          {/* 셀 3: 상세 서술 한글 카피 영역 */}
          <div className="grid-cell cell-description">
            <p className="grid-sub-desc">
              내 방의 온도를 바꾸는 불빛,<br />
              지구를 사랑하는 마음을 담은 조명
            </p>
          </div>

          {/* 셀 4: 입체적 젤리 CTA 버튼 영역 */}
          <div className="grid-cell cell-cta-button" onClick={() => setIsOrderOpen(true)}>
            <button className="btn-jelly grid-btn-cta">
              Order Mellob Stand
              <ArrowRight className="btn-arrow" size={24} />
            </button>
          </div>

          {/* 셀 5: 100% Eco-friendly 마크 및 회전 데코 영역 */}
          <div className="grid-cell cell-deco-badge">
            <div className="grid-eco-sticker">100% ECO</div>
          </div>

        </div>

        {/* 통통 튀는 젤리 마퀴 밴드 (그리드 하단에 밀착 배치) */}
        <div className="hero-marquee-band">
          <div className="marquee-track">
            <div className="marquee-content">
              <span>THE KITSCHEST WAY TO LOVE THE EARTH </span>
              <span>LIGHT UP YOUR ROOM WITH CHECKERBOARD MOOD </span>
              <span>ECO-FRIENDLY BIO-SILICONE </span>
              <span>JELLY POPPING TOUCH LIFE </span>
              <span>FEVER LAB SPECIAL EDITION </span>
            </div>
            <div className="marquee-content" aria-hidden="true">
              <span>THE KITSCHEST WAY TO LOVE THE EARTH </span>
              <span>LIGHT UP YOUR ROOM WITH CHECKERBOARD MOOD </span>
              <span>ECO-FRIENDLY BIO-SILICONE </span>
              <span>JELLY POPPING TOUCH LIFE </span>
              <span>FEVER LAB SPECIAL EDITION </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 & 2.5: BRAND VALUES & STORY (BrandStory 컴포넌트 내부로 가치 마크업이 통합 병합됨) */}
      <div id="brand-story">
        <BrandStory />
      </div>

      {/* SECTION 3: PRODUCT DETAIL (LAB) - 분리 모듈화된 FeverLab 컴포넌트로 대체 */}
      <div id="fever-lab">
        <FeverLab />
      </div>

      {/* OOTD 갤러리만 다크 테마 존 - UnboxingSpec은 제외 */}
      <div className="dark-theme-zone" ref={darkZoneRef}>
        {/* SECTION 4: OOTD GALLERY */}
        <section className="section-gallery" id="gallery">
          <div className="container">
            <div className="gallery-header">
              <span className="gallery-badge">#FEVER_OOTD</span>
              <h2 className="gallery-title">
                불이 꺼지면,<br />
                나만의 파티가 시작됩니다.
              </h2>
              <p className="gallery-desc">
                어두운 방에서 은은하게 빛나는 스탠드의 실물 감성을 체험해보세요.
              </p>
            </div>

            <div className="gallery-grid">
              {/* 카드 1 */}
              <div className="gallery-card grid-item-1">
                <div className="gallery-img-wrap">
                  <img src={ootd1} alt="Aesthetic Bedroom with Lamp" />
                  <button
                    className={`heart-btn ${likedCards.card1 ? 'liked' : ''}`}
                    onClick={() => toggleLike('card1')}
                  >
                    <Heart className="heart-icon" fill={likedCards.card1 ? "var(--accent-coral)" : "none"} />
                  </button>
                </div>
                <div className="gallery-card-info">
                  <h4>민지님의 서재 룸투어</h4>
                  <p>#데스크테리어 #감성조명</p>
                </div>
              </div>

              {/* 카드 2 */}
              <div className="gallery-card grid-item-2">
                <div className="gallery-img-wrap">
                  <img src={ootd2} alt="Modern Desk Setup" />
                  <button
                    className={`heart-btn ${likedCards.card2 ? 'liked' : ''}`}
                    onClick={() => toggleLike('card2')}
                  >
                    <Heart className="heart-icon" fill={likedCards.card2 ? "var(--accent-coral)" : "none"} />
                  </button>
                </div>
                <div className="gallery-card-info">
                  <h4>그린 포인트 작업실</h4>
                  <p>#홈오피스 #미닝아웃</p>
                </div>
              </div>

              {/* 카드 3 */}
              <div className="gallery-card grid-item-3">
                <div className="gallery-img-wrap">
                  <img src={ootd3} alt="Chic Living Room Corner" />
                  <button
                    className={`heart-btn ${likedCards.card3 ? 'liked' : ''}`}
                    onClick={() => toggleLike('card3')}
                  >
                    <Heart className="heart-icon" fill={likedCards.card3 ? "var(--accent-coral)" : "none"} />
                  </button>
                </div>
                <div className="gallery-card-info">
                  <h4>체커보드 오브제 존</h4>
                  <p>#미니멀리즘 #키치인테리어</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 4.5: UNBOXING & SPEC - 다크 테마 존 밖으로 분리, 진입 시 라이트모드 전환 트리거 */}
      <div id="spec" ref={specSectionRef}>
        <UnboxingSpec />
      </div>

      {/* SECTION 5: EPIC CTA */}
      <section className="section-epic-cta" id="order" ref={epicCtaRef}>
        <div className="container">
          <div className="epic-box">
            <span className="epic-small-title">GET YOUR FEVER</span>
            <h2 className="epic-main-title">
              내 방의 밀도를 바꾸는<br />가장 귀여운 오브제.
            </h2>
            <button className="btn-jelly btn-epic-action" onClick={() => setIsOrderOpen(true)}>
              Order Mellob Stand
              <ArrowRight className="btn-arrow bounce-arrow" size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="brand-footer">
        <div className="container">
          <div className="footer-top">
            <span className="footer-logo">MELLOBE</span>
            <p>지구를 생각하는 마음으로 만듭니다.</p>
          </div>
          <div className="footer-bottom">
            <p>© 2026 MELLOBE. All rights reserved.</p>
            <p>Non-toxic & Eco-Certified lighting brand.</p>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY BOTTOM BAR */}
      <div className="mobile-sticky-bar">
        <div className="sticky-bar-content">
          <div className="sticky-price-info">
            <span className="price-tag"> MELLOBE 체커보드 장스탠드</span>
            <span className="price">98,000원</span>
          </div>
          <button className="btn-jelly mobile-sticky-cta" onClick={() => setIsOrderOpen(true)}>
            Order Now
          </button>
        </div>
      </div>

      {/* 팝핑 젤리 스크롤 탑 버튼 */}
      <button
        className={`btn-scroll-top ${showScrollTop ? 'active' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} strokeWidth={3} />
      </button>

      {/* 주문 폼 */}
      <OrderForm isOpen={isOrderOpen} onClose={() => setIsOrderOpen(false)} />

    </div>
  );
}

export default App;
