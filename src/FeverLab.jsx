import React, { useState } from 'react';
import { Sun, Compass, RotateCw } from 'lucide-react';
import './FeverLab.css';

function FeverLab() {
  // Fever Lab 조명 커스텀 로직 전용 캡슐화 상태
  const [dimmingLevel, setDimmingLevel] = useState(2); // 1(Muted), 2(Warm), 3(Bright) 단계
  const [pattern, setPattern] = useState('green-checker'); // green-checker, coral-checker, butter-cream
  const [isShadeBouncing, setIsShadeBouncing] = useState(false);
  const [stemAngle, setStemAngle] = useState(0); // 기둥 각도 (-30도 ~ 30도, 0도에서 똑바로 시작하도록 튜닝)

  // 갓 패턴 체인지 시 젤리 탄성 바운스 애니메이션 발 트리거
  const handlePatternChange = (newPattern) => {
    if (newPattern === pattern) return;
    setPattern(newPattern);
    setIsShadeBouncing(true);
    setTimeout(() => setIsShadeBouncing(false), 400);
  };

  return (
    <section className="section-detail">
      <div className="container">
        <div className="detail-layout">

          {/* 좌측: 실시간 반응형 조명 그래픽 캔버스 */}
          <div
            className="detail-canvas"
            style={{
              background: dimmingLevel === 1
                ? 'radial-gradient(circle at 50% 30%, #FFFDF5 0%, #EFEBD3 70%, #E8E3C6 100%)'
                : dimmingLevel === 2
                  ? 'radial-gradient(circle at 50% 30%, #FFFDEB 0%, #FFF7CD 45%, #F4EEB3 100%)'
                  : 'radial-gradient(circle at 50% 30%, #FFFFF2 0%, #FFF999 50%, #FFF355 100%)',
              transition: 'background 0.4s ease'
            }}
          >
            <div className="canvas-title">MELLOBE LAB</div>
            <div className="lamp-visualizer-container">

              {/* 램프 본체 3D 느낌 조립 그래픽 */}
              <div className="interactive-lamp">
                {/* 회전/기울임이 적용되는 상부 바디 */}
                <div
                  className="lamp-movable-body"
                  style={{
                    transform: `rotate(${stemAngle}deg)`,
                    transformOrigin: 'bottom center',
                    transition: 'transform 0.1s ease-out',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    width: '100%',
                    height: '270px'
                  }}
                >
                  {/* 디밍 그라데이션 광배 - 바디 회전에 맞춰 함께 꺾이도록 이동 */}
                  <div
                    className={`lamp-glow-effect dim-level-${dimmingLevel}`}
                    style={{
                      transform: `translate(-50%, -50%) scale(${1 + dimmingLevel * 0.15})`,
                      opacity: dimmingLevel * 0.25
                    }}
                  ></div>

                  {/* 갓 (Shade) */}
                  <div
                    className={`lamp-shade ${pattern} ${isShadeBouncing ? 'jelly-bounce' : ''}`}
                    style={{
                      filter: `brightness(${0.85 + dimmingLevel * 0.1})`,
                      boxShadow: `0 0 ${10 + dimmingLevel * 15}px rgba(255, 107, 53, ${dimmingLevel * 0.25})`,
                      transition: 'filter 0.4s ease, box-shadow 0.4s ease'
                    }}
                  >
                    {/* 패턴 오버레이 */}
                    <div className="shade-pattern-overlay"></div>
                  </div>

                  {/* 기둥 (Stem) */}
                  <div className="lamp-stem"></div>

                  {/* 스위치 (Switch) - 중력에 의해 수직 아래로 처질 때 탄성 찰랑임 추가 */}
                  <div
                    className="lamp-switch-point"
                    style={{
                      transform: `rotate(${-stemAngle}deg)`,
                      transformOrigin: 'top center',
                      transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                  ></div>
                </div>

                {/* 스탠드 베이스 (Base) - 바닥에 고정 */}
                <div className="lamp-base"></div>
                {/* 쫀득하고 묵직한 3D 하부 그림자 */}
                <div className="lamp-base-shadow"></div>
              </div>
            </div>

            {/* canvas-footer가 완벽히 제거되어 깔끔한 아트 프레임 비주얼 확보 */}
          </div>

          {/* 우측: 컨트롤 탭 메뉴 */}
          <div className="detail-control">
            <h2 className="detail-title">
              만지고, 구부리고, 바꾸고.<br />
              내 손끝에서 켜지는 텍스처 무드.
            </h2>
            <p className="detail-desc">
              스위치를 활용하여 실시간으로 변화하는 무드를 확인해 보세요.
            </p>

            {/* 컨트롤 그룹 1: 갓 패턴 체인지 */}
            <div className="control-group">
              <label className="control-label">
                <Compass size={18} />
                갓 패턴 선택
              </label>
              <div className="pattern-chips">
                <button
                  className={`chip-btn ${pattern === 'green-checker' ? 'active' : ''}`}
                  onClick={() => handlePatternChange('green-checker')}
                >
                  <span className="dot-preview green"></span>
                  포레스트 그린
                </button>
                <button
                  className={`chip-btn ${pattern === 'coral-checker' ? 'active' : ''}`}
                  onClick={() => handlePatternChange('coral-checker')}
                >
                  <span className="dot-preview coral"></span>
                  코랄 탠저린
                </button>
                <button
                  className={`chip-btn ${pattern === 'butter-cream' ? 'active' : ''}`}
                  onClick={() => handlePatternChange('butter-cream')}
                >
                  <span className="dot-preview butter"></span>
                  클래식 크림
                </button>
              </div>
            </div>

            {/* 컨트롤 그룹 2: 3단 터치 디밍 */}
            <div className="control-group">
              <label className="control-label">
                <Sun size={18} />
                터치 디밍 조절 (3단)
              </label>
              <div className="dimming-switch-bg">
                <div
                  className="dimming-slider-thumb"
                  style={{ left: `calc(${(dimmingLevel - 1) * 33.33}% + 4px)` }}
                ></div>
                {[1, 2, 3].map((level) => (
                  <button
                    key={level}
                    className={`dim-btn ${dimmingLevel === level ? 'active' : ''}`}
                    onClick={() => setDimmingLevel(level)}
                  >
                    {level === 1 ? 'Muted' : level === 2 ? 'Warm' : 'Bright'}
                  </button>
                ))}
              </div>
            </div>

            {/* 컨트롤 그룹 3: 조명 기둥 각도 조절 */}
            <div className="control-group">
              <label className="control-label">
                <RotateCw size={18} />
                조명 기둥 각도 조절 ({stemAngle}°)
              </label>
              <div className="angle-slider-container">
                <input
                  type="range"
                  min="-30"
                  max="30"
                  value={stemAngle}
                  onChange={(e) => setStemAngle(Number(e.target.value))}
                  className="angle-slider"
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default FeverLab;
