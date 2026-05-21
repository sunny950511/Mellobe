import React, { useState } from 'react';
import { X, Heart, Sparkles, Check } from 'lucide-react';
import './OrderForm.css';

function OrderForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    option: 'green-checker',
    quantity: 1,
    pledge: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleQuantity = (amount) => {
    setFormData(prev => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + amount)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('모든 필수 정보를 입력해주세요!');
      return;
    }
    if (!formData.pledge) {
      alert('지구를 사랑하겠다는 약속에 서약해주세요!');
      return;
    }
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      address: '',
      option: 'green-checker',
      quantity: 1,
      pledge: false
    });
    onClose();
  };

  return (
    <div className="order-modal-overlay">
      <div className="order-modal-window">
        {/* Close Button */}
        <button className="order-close-btn" onClick={handleClose} aria-label="닫기">
          <X size={24} />
        </button>

        {!isSubmitted ? (
          <form className="order-form-container" onSubmit={handleSubmit}>
            <div className="order-header">
              <h2 className="order-title">주문하기</h2>
            </div>

            <div className="order-body">
              {/* Product Option Picker */}
              <div className="form-group">
                <label className="form-label">옵션 선택</label>
                <div className="order-option-selector">
                  <label className={`option-card ${formData.option === 'green-checker' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="option"
                      value="green-checker"
                      checked={formData.option === 'green-checker'}
                      onChange={handleChange}
                    />
                    <span className="option-color-dot green"></span>
                    <span className="option-name">포레스트 그린</span>
                  </label>

                  <label className={`option-card ${formData.option === 'coral-checker' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="option"
                      value="coral-checker"
                      checked={formData.option === 'coral-checker'}
                      onChange={handleChange}
                    />
                    <span className="option-color-dot coral"></span>
                    <span className="option-name">코랄 탠저린</span>
                  </label>

                  <label className={`option-card ${formData.option === 'butter-cream' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="option"
                      value="butter-cream"
                      checked={formData.option === 'butter-cream'}
                      onChange={handleChange}
                    />
                    <span className="option-color-dot butter"></span>
                    <span className="option-name">클래식 크림</span>
                  </label>
                </div>
              </div>

              {/* 성함 */}
              <div className="form-group">
                <label className="form-label" htmlFor="order-name">성함</label>
                <input
                  type="text"
                  id="order-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="성함 입력"
                  className="form-input"
                  required
                />
              </div>

              {/* 연락처 */}
              <div className="form-group">
                <label className="form-label" htmlFor="order-phone">연락처</label>
                <input
                  type="tel"
                  id="order-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="010-0000-0000"
                  className="form-input"
                  required
                />
              </div>

              {/* 배송지 주소 */}
              <div className="form-group address-group">
                <label className="form-label" htmlFor="order-address">배송지 주소</label>
                <input
                  type="text"
                  id="order-address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="배송 주소를 입력해주세요."
                  className="form-input"
                  required
                />
              </div>

              {/* 수량 */}
              <div className="form-group qty-group">
                <label className="form-label">수량</label>
                <div className="quantity-controller">
                  <button type="button" onClick={() => handleQuantity(-1)} className="qty-btn">-</button>
                  <span className="qty-val">{formData.quantity}</span>
                  <button type="button" onClick={() => handleQuantity(1)} className="qty-btn">+</button>
                </div>
              </div>

              {/* Eco pledge check */}
              <div className="form-group pledge-group">
                <label className="pledge-label">
                  <input
                    type="checkbox"
                    name="pledge"
                    checked={formData.pledge}
                    onChange={handleChange}
                  />
                  <div className="custom-checkbox">
                    {formData.pledge && <Check size={16} />}
                  </div>
                  <span className="pledge-text">
                    위 내용을 확인하였으며 결제에 동의합니다.
                  </span>
                </label>
              </div>
            </div>

            <div className="order-footer">
              <div className="order-price-info">
                <span>금액</span>
                <strong>{(formData.quantity * 98000).toLocaleString()}원</strong>
              </div>
              <button type="submit" className="btn-jelly btn-submit-order">
                주문하기
              </button>
            </div>
          </form>
        ) : (
          <div className="order-success-container">
            <div className="success-lottie-mock">
              <Heart className="success-heart-icon" size={64} fill="var(--accent-coral)" />
              <div className="sparkles-wrap">
                <Sparkles className="spark-1" size={24} />
                <Sparkles className="spark-2" size={16} />
              </div>
            </div>
            <h2 className="success-title">주문이<br />완료되었습니다!</h2>
            <p className="success-desc">
              <strong>{formData.name}</strong> 님이 신청하신 소중한 빛이<br />
              지구를 생각하는 마음과 함께 포장되어 발송될 예정입니다.
            </p>
            <div className="success-summary">
              <div className="summary-row">
                <span>신청 제품</span>
                <strong>
                  {formData.option === 'green-checker' ? '포레스트 그린' : formData.option === 'coral-checker' ? '코랄 탠저린' : '클래식 크림'} ({formData.quantity}개)
                </strong>
              </div>
              <div className="summary-row">
                <span>배송 주소</span>
                <span className="summary-addr">{formData.address}</span>
              </div>
            </div>
            <button className="btn-jelly btn-success-close" onClick={handleClose}>
              돌아가기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderForm;
