// src/hooks/useCarousel.js
import { useState, useEffect, useCallback } from 'react';
import { CAROUSEL_CONFIG } from '../utils/constants';

export const useCarousel = (itemCount) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleNext = useCallback(() => {
    if (isFlipping || itemCount === 0) return;
    setIsFlipping(true);
    setCurrentSlide((prev) => (prev + 1) % itemCount);
    setTimeout(() => setIsFlipping(false), CAROUSEL_CONFIG.ANIMATION_DURATION);
  }, [isFlipping, itemCount]);

  const handlePrev = useCallback(() => {
    if (isFlipping || itemCount === 0) return;
    setIsFlipping(true);
    setCurrentSlide((prev) => (prev - 1 + itemCount) % itemCount);
    setTimeout(() => setIsFlipping(false), CAROUSEL_CONFIG.ANIMATION_DURATION);
  }, [isFlipping, itemCount]);

  const goToSlide = useCallback((index) => {
    if (isFlipping || itemCount === 0) return;
    setIsFlipping(true);
    setCurrentSlide(index);
    setTimeout(() => setIsFlipping(false), CAROUSEL_CONFIG.ANIMATION_DURATION);
  }, [isFlipping, itemCount]);

  // Auto-play
  useEffect(() => {
    if (!isPaused && itemCount > 0) {
      const interval = setInterval(handleNext, CAROUSEL_CONFIG.AUTO_PLAY_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [isPaused, itemCount, handleNext]);

  // Drag handlers
  const handleDragStart = useCallback((clientX) => {
    setDragStart(clientX);
    setIsPaused(true);
  }, []);

  const handleDragMove = useCallback((clientX) => {
    if (dragStart === null) return;
    const diff = clientX - dragStart;
    setDragOffset(diff);
  }, [dragStart]);

  const handleDragEnd = useCallback(() => {
    if (dragStart === null) return;
    
    if (Math.abs(dragOffset) > CAROUSEL_CONFIG.DRAG_THRESHOLD) {
      if (dragOffset > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    
    setDragStart(null);
    setDragOffset(0);
    setIsPaused(false);
  }, [dragStart, dragOffset, handleNext, handlePrev]);

  // Mouse events
  const handleMouseDown = (e) => handleDragStart(e.clientX);
  const handleMouseMove = (e) => handleDragMove(e.clientX);
  const handleMouseUp = handleDragEnd;

  // Touch events
  const handleTouchStart = (e) => handleDragStart(e.touches[0].clientX);
  const handleTouchMove = (e) => handleDragMove(e.touches[0].clientX);
  const handleTouchEnd = handleDragEnd;

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  }, [handleNext, handlePrev]);

  return {
    currentSlide,
    isFlipping,
    dragOffset,
    handleNext,
    handlePrev,
    goToSlide,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleKeyDown,
  };
};