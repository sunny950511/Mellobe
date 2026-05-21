import { useEffect, useRef, useState } from 'react';
import { Shield, Sparkles } from 'lucide-react';
import './BrandStory.css';

function BrandStory() {
  const storyLayoutRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0); // 0(비활성), 1, 2, 3 단계 순차 빌드업

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // 인포그래픽 카드 영역 도달 시 일정한 스태거 딜레이를 두고 순서대로 카드 활성화
          setActiveStep(1);
          const timer1 = setTimeout(() => setActiveStep(2), 500);
          const timer2 = setTimeout(() => setActiveStep(3), 1000);
          return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
          };
        }
      },
      { threshold: 0.15 } // 15% 노출되었을 때 애니메이션 트리거
    );

    const currentRef = storyLayoutRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section className="section-brand-story">
      <div className="container">

        {/* ==========================================
           PART A: BRAND VALUES (기존 section-value 병합)
           ========================================== */}
        <div className="value-zone">
          <div className="value-header">
            <span className="gallery-badge">#ECO_FRIENDLY_THREAD</span>
            <h2 className="value-title">지구를 생각하는 마음은<br />생각보다 말랑하니까.</h2>
            <div className="value-hashtags">
              <span>#Non-Toxic</span>
              <span>#Eco-Certified</span>
              <span>#Vegan-Silicon</span>
            </div>
          </div>

          <div className="value-grid">
            <div className="value-card card-left">
              <div className="card-icon-wrap">
                <Shield size={32} />
              </div>
              <h3>100% 비건 실리콘 바디</h3>
              <p>
                부드러운 촉감의 친환경 무독성 실리콘으로 마감했습니다.<br />
                아이와 반려동물이 있어도 걱정 없이 공간을 밝혀주세요.
              </p>
            </div>

            <div className="value-card card-right">
              <div className="card-icon-wrap">
                <Sparkles size={32} />
              </div>
              <h3>친환경 재생 자수 원사 패브릭</h3>
              <p>
                버려지는 페트병을 재활용하여 직조한 체커보드 패브릭 갓입니다.<br />
                선명한 색감과 고유의 텍스처를 경험해보세요.
              </p>
            </div>
          </div>
        </div>

        {/* 두 구역을 가르는 키치한 점선 디바이더 */}
        <div className="story-divider"></div>

        {/* ==========================================
           PART B: PROCESS STORY (기존 3단계 인포그래픽)
           ========================================== */}
        <div className="story-layout" ref={storyLayoutRef}>

          {/* 좌측: 브랜드 스토리 카피 텍스트 */}
          <div className="story-text-zone">
            <h2 className="story-headline">
              예쁜 건 좋은데,<br />
              지구한테 미안하긴 싫어서.
            </h2>
            <p className="story-paragraph">
              멜롭의 시그니처 갓은 단순히 공장에서 찍어내는 플라스틱이 아닙니다.<br />버려진 폐페트병을 정밀 세척 가공하여 뽑아낸 <strong>100% 리사이클 자수 원사</strong>로 촘촘하게 짜 올렸습니다.
            </p>
          </div>

          {/* 우측: 친환경 공정 3단계 가로 배치 인포그래픽 */}
          <div className="story-graphic-zone">
            <div className="process-flow">

              {/* 1단계: 폐페트병 수거 */}
              <div className={`process-card step-1 ${activeStep >= 1 ? 'active' : ''}`}>
                <div className="card-num">01</div>
                <div className="card-illustration">
                  <svg viewBox="0 0 64 64" className="illust-svg">
                    <rect x="24" y="8" width="16" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="3" />
                    <path d="M18 20 C18 16, 46 16, 46 20 L42 56 C42 58, 22 58, 22 56 Z" fill="none" stroke="currentColor" strokeWidth="3" />
                    <line x1="26" y1="32" x2="38" y2="32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    <line x1="26" y1="40" x2="38" y2="40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                <h4 className="card-title">PET Bottle</h4>
                <p className="card-desc">폐페트병 수거 & 정밀 세척</p>
              </div>

              {/* 연결 도트 1 */}
              <div className={`process-step-dot dot-1 ${activeStep >= 2 ? 'active' : ''}`}></div>

              {/* 2단계: 리사이클 원사 추출 */}
              <div className={`process-card step-2 ${activeStep >= 2 ? 'active' : ''}`}>
                <div className="card-num">02</div>
                <div className="card-illustration">
                  <svg viewBox="0 0 64 64" className="illust-svg">
                    <circle cx="32" cy="32" r="16" fill="none" stroke="currentColor" strokeWidth="3" />
                    <path d="M20 20 Q32 10 44 20 Q54 32 44 44 Q32 54 20 44 Q10 32 20 20 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
                    <path d="M26 32 C 26 24, 38 24, 38 32 C 38 40, 26 40, 26 32 Z" fill="none" stroke="currentColor" strokeWidth="3" />
                  </svg>
                </div>
                <h4 className="card-title">Recycled Yarn</h4>
                <p className="card-desc">미세 펠릿 가공 및 원사 추출</p>
              </div>

              {/* 연결 도트 2 */}
              <div className={`process-step-dot dot-2 ${activeStep >= 3 ? 'active' : ''}`}></div>

              {/* 3단계: 체커보드 자수 갓 완성 */}
              <div className={`process-card step-3 ${activeStep >= 3 ? 'active' : ''}`}>
                <div className="card-num">03</div>
                <div className="card-illustration">
                  <svg viewBox="0 0 64 64" className="illust-svg">
                    <polygon points="20 12, 44 12, 54 44, 10 44" fill="none" stroke="currentColor" strokeWidth="3" />
                    <line x1="20" y1="12" x2="10" y2="44" stroke="currentColor" strokeWidth="3" />
                    <line x1="44" y1="12" x2="54" y2="44" stroke="currentColor" strokeWidth="3" />
                    <path d="M28 12 L22 44 M36 12 L42 44" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
                  </svg>
                </div>
                <h4 className="card-title">Kitsch Shade</h4>
                <p className="card-desc">체커보드 자수 갓 직조 완성</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default BrandStory;
