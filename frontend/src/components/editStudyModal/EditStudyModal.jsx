import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditStudyModal.css';

const EditStudyModal = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const VERIFY_PASSWORD_URL = 'http://localhost:5090/api/verify-password';
  const navigate = useNavigate();

  const userId = "1"; // userId를 알수있어야함, 일단 지금은 해결책이 부족하므로(전역 상태에서 id를 가져온다거나 하는 설정이 없음). 일단 userId를 1로 하드코딩합니다.

  if (!isOpen) return null;

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleVerifyPassword = async () => {
    try {
      const response = await fetch(VERIFY_PASSWORD_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, password }),
      });

      if (!response.ok) {
        throw new Error('서버 응답 실패!');
      }

      const data = await response.json();
      console.log(data);

      if (data.success) {
        navigate('/study-edit-form'); // 비밀번호 검증 성공 시 'study-edit-form' 경로로 이동
      } else {
        setErrorMessage('비밀번호 검증에 실패했습니다. 다시 시도해주세요.'); // 비밀번호 검증 실패 시 오류 메시지
      }
    } catch (error) {
      console.error('비밀번호 검증 API 호출 실패!:', error);
      setErrorMessage('비밀번호 검증에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <p className="modal-title">연우의 개발공장</p>
          <button type="button" onClick={onClose} className="modal-close-button">
            나가기
          </button>
        </div>
        <p className="modal-message">권한이 필요해요!</p>
        <div className="modal-input-container">
          <p className="modal-input-label">비밀번호</p>
          <input
            placeholder="비밀번호를 입력해 주세요"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="modal-input"
          />
          {errorMessage && (
            <p className="error-message">{errorMessage}</p> // 오류 메시지 표시
          )}
        </div>
        <button
          className="modal-verify-button"
          type="button"
          onClick={handleVerifyPassword}
        >
          수정하러 가기
        </button>
      </div>
    </div>
  );
};

export default EditStudyModal;