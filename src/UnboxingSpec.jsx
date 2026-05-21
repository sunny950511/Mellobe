import React from 'react';
import { Gift, ShieldCheck } from 'lucide-react';
import './UnboxingSpec.css';
import unboxingPackage from './assets/unboxing_package.png';

function UnboxingSpec() {
  return (
    <section className="section-unboxing-spec">
      <div className="container">

        {/* 섹션 인트로 헤더 */}
        <div className="spec-header">
          <div className="spec-badge">
            <Gift size={14} className="gift-icon" />
            Packaging & Specs
          </div>
          <h2 className="spec-main-title">언박싱부터 환경을 사랑하는 방법</h2>
        </div>

        <div className="unboxing-layout">

          {/* 좌측: 사탕수수 친환경 패키지 및 굿즈 비주얼 (호버 3D 모션 연동) */}
          <div className="unboxing-visual-zone">
            <div className="package-interactive-card">
              {/* 호버 시 사방으로 통통 튀며 날아오를 스티커 스택 */}
              <div className="sticker-overlay-item item-1">KITSCH</div>
              <div className="sticker-overlay-item item-2">ECO-LOVE</div>
              <div className="sticker-overlay-item item-3">FEVER LAB</div>

              <div className="package-box-wrapper">
                <img
                  src={unboxingPackage}
                  alt="100% Sugarcane Biodegradable Package with Kitsch Stickers"
                  className="package-main-img"
                />
              </div>
            </div>

            <div className="package-tagline">
              <span className="bold-eco">100% 생분해 사탕수수 재생 크라프트지</span>로 제작된 친환경 시그니처 박스와, 스탠드 몸체나 다이어리에 커스텀 튜닝할 수 있는 <strong>젤리 팝 스티커 팩</strong>이 함께 동봉됩니다.
            </div>
          </div>

          {/* 우측: 상세 제품 스펙 테이블 정보 */}
          <div className="spec-table-zone">
            <h3 className="spec-table-title">Product Specifications</h3>
            <p className="spec-table-desc">
              내 방의 감도를 끌어올려 주는 체커보드 램프의 정밀 규격 정보입니다.
            </p>

            <div className="table-wrapper">
              <table className="spec-detail-table">
                <tbody>
                  <tr>
                    <th>모델명</th>
                    <td>Checkerboard Fever Lamp (Classic Ver.)</td>
                  </tr>
                  <tr>
                    <th>크기 / 무게</th>
                    <td>150mm x 150mm x 320mm / 650g (구부림 형태에 따라 유동적)</td>
                  </tr>
                  <tr>
                    <th>소재</th>
                    <td>100% 리사이클 자수 원사 (PET 재생), Bio-Silicone, 스틸 베이스</td>
                  </tr>
                  <tr>
                    <th>전원 & 입력</th>
                    <td>USB Type-C 인터페이스 / 5V 2A (에코 고효율 보드 장착)</td>
                  </tr>
                  <tr>
                    <th>케이블 정보</th>
                    <td>1.8m 브레이디드 에코 패브릭 패치 케이블</td>
                  </tr>
                  <tr>
                    <th>동봉 패키지</th>
                    <td>사탕수수 생분해 박스 + 젤리 커스텀 스티커팩 1종 + 보증서</td>
                  </tr>
                  <tr>
                    <th>안전 인증</th>
                    <td>KC 안전확인신고 완료 및 유럽 RoHS 친환경 소재 적합 인증</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="spec-footer-alert">
              <ShieldCheck size={16} className="alert-badge-icon" />
              <span>구매일로부터 1년간 무상 품질 보증 및 교환 A/S 지원</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default UnboxingSpec;
