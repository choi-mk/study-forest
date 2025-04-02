import React, { useState, useRef, useEffect } from "react";
import styles from "./StudyEmoji.module.css";
import smileIcon from "/images/icon/ic_smile.svg";
//import EmojiPicker from 'emoji-picker-react';

function StudyEmoji() {
  const [showPicker, setShowPicker] = useState(false);
  const addButtonRef = useRef(null);
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const moreEmojisButtonRef = useRef(null);

  const handleAddButtonClick = () => {
    setShowPicker(!showPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    setSelectedEmojis([...selectedEmojis, emojiObject.emoji]);
    setShowPicker(false);
  };

  const handleSelectedEmojiClick = (index) => {
    const newEmojis = [...selectedEmojis];
    newEmojis.splice(index, 1);
    setSelectedEmojis(newEmojis);
  };

  const handleMoreEmojisClick = () => {
    setModalOpen(!modalOpen);
  };

  const pickerStyle = {
    position: "absolute",
    top: addButtonRef.current ? addButtonRef.current.offsetHeight + 10 : "50px",
    left: addButtonRef.current ? addButtonRef.current.offsetLeft : "0",
    zIndex: 1000,
  };

  const modalStyle = {
    position: "absolute",
    top: moreEmojisButtonRef.current
      ? moreEmojisButtonRef.current.offsetHeight +
        moreEmojisButtonRef.current.offsetTop
      : "auto",
    left: moreEmojisButtonRef.current
      ? moreEmojisButtonRef.current.offsetLeft
      : "auto",
    background: "white",
    padding: "20px",
    border: "1px solid gray",
    zIndex: 1001,
  };

  const getEmojiCounts = () => {
    const emojiCounts = {};
    selectedEmojis.forEach((emoji) => {
      emojiCounts[emoji] = (emojiCounts[emoji] || 0) + 1;
    });
    return emojiCounts;
  };

  const getDisplayedEmojis = () => {
    const emojiCounts = getEmojiCounts();
    return selectedEmojis.slice(0, 3).map((emoji) => ({
      emoji,
      count: emojiCounts[emoji],
    }));
  };

  useEffect(() => {
    if (modalOpen && selectedEmojis.length <= 3) {
      setModalOpen(false);
    }
  }, [selectedEmojis, modalOpen]);

  return (
    <div
      style={{ display: "flex", alignItems: "center", position: "relative" }}
    >
      {getDisplayedEmojis().map((item, index) => (
        <button
          key={index}
          className={`${styles.emoji} ${styles.commonButtonStyle}`}
          onClick={() =>
            handleSelectedEmojiClick(selectedEmojis.indexOf(item.emoji))
          }
        >
          {item.emoji} {item.count > 0 && <span>({item.count})</span>}
        </button>
      ))}

      {selectedEmojis.length < 3 &&
        Array(3 - selectedEmojis.length)
          .fill(null)
          .map((_, index) => (
            <button
              key={`empty-${index}`}
              className={`${styles.emoji} ${styles.commonButtonStyle}`}
            >
              {/* 빈칸 */}
            </button>
          ))}

      <button
        ref={moreEmojisButtonRef}
        className={`${styles.emoji} ${styles.commonButtonStyle}`}
        onClick={handleMoreEmojisClick}
      >
        +{selectedEmojis.length > 3 ? selectedEmojis.length - 3 : 0}
      </button>

      <button
        className={`${styles.addBtn} ${styles.commonButtonStyle}`}
        onClick={handleAddButtonClick}
        ref={addButtonRef}
      >
        <img src={smileIcon} alt="smile" />
        <p>추가</p>
      </button>

      {showPicker && (
        <div style={pickerStyle}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      {modalOpen && (
        <div style={modalStyle}>
          <p>선택된 이모지:</p>
          {Object.entries(getEmojiCounts()).map(([emoji, count]) => (
            <button
              key={emoji}
              className={styles.emoji}
              onClick={() =>
                handleSelectedEmojiClick(selectedEmojis.indexOf(emoji))
              }
            >
              {emoji} ({count})
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudyEmoji;
