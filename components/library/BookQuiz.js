"use client";
import { useEffect, useState } from "react";
import { loadQuizCache, saveQuizCache, quizKey, fetchQuiz } from "@/lib/quiz";

const STAGE = {
  IDLE: 'idle',
  LOADING: 'loading',
  ERROR: 'error',
  PLAYING: 'playing',
  COMPLETED: 'completed',
};

export default function BookQuiz({ book, lang, t }) {
  const [questions, setQuestions] = useState(null);
  const [stage, setStage] = useState(STAGE.IDLE);
  const [error, setError] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setQuestions(null);
    setStage(STAGE.IDLE);
    setError(null);
    setCurrentIdx(0);
    setAnswers([]);
    if (!book) return;
    const cache = loadQuizCache();
    const cached = cache[quizKey(book.title, book.author, lang)];
    if (cached) setQuestions(cached);
  }, [book?.id, lang]);

  async function handleGenerate() {
    if (!book || stage === STAGE.LOADING) return;
    setStage(STAGE.LOADING);
    setError(null);
    try {
      const qs = await fetchQuiz(book.title, book.author, lang);
      const cache = loadQuizCache();
      cache[quizKey(book.title, book.author, lang)] = qs;
      saveQuizCache(cache);
      setQuestions(qs);
      setStage(STAGE.IDLE);
    } catch (e) {
      setError(e.status === 404 ? 'not_found' : 'error');
      setStage(STAGE.ERROR);
    }
  }

  function handleStart() {
    setAnswers(new Array(questions.length).fill(null));
    setCurrentIdx(0);
    setStage(STAGE.PLAYING);
  }

  function handlePick(idx) {
    setAnswers(a => {
      const next = a.slice();
      next[currentIdx] = idx;
      return next;
    });
  }

  function handleSubmit() {
    setStage(STAGE.COMPLETED);
  }

  function handleReplay() {
    setAnswers(new Array(questions.length).fill(null));
    setCurrentIdx(0);
    setStage(STAGE.PLAYING);
  }

  const total = questions?.length || 0;
  const score = stage === STAGE.COMPLETED && questions
    ? questions.reduce((acc, q, i) => acc + (answers[i] === q.answerIndex ? 1 : 0), 0)
    : 0;

  function scoreMessage() {
    if (!total) return '';
    const ratio = score / total;
    if (ratio >= 0.9) return t.quizScoreGreat;
    if (ratio >= 0.7) return t.quizScoreGood;
    if (ratio >= 0.5) return t.quizScoreMid;
    return t.quizScoreLow;
  }

  const showHint = !questions && stage === STAGE.IDLE;
  const showError = stage === STAGE.ERROR;
  const showStartBtn = questions && stage === STAGE.IDLE;
  const showPlaying = stage === STAGE.PLAYING;
  const showCompleted = stage === STAGE.COMPLETED;
  const isLoading = stage === STAGE.LOADING;

  return (
    <div className="panel-section panel-quiz">
      <div className="panel-quiz-content">
        <span className="panel-section-eyebrow">{t.quizSectionTitle}</span>

        {showHint && (
          <p className="panel-quiz-hint">{t.quizEmptyHint}</p>
        )}

        {showError && (
          <p className="panel-quiz-hint">
            {error === 'not_found' ? t.quizNotFound : t.quizError}
          </p>
        )}

        {showPlaying && (
          <QuizPlayer
            questions={questions}
            currentIdx={currentIdx}
            setCurrentIdx={setCurrentIdx}
            answers={answers}
            onPick={handlePick}
            onSubmit={handleSubmit}
            t={t}
          />
        )}

        {showCompleted && (
          <QuizResult
            questions={questions}
            answers={answers}
            score={score}
            total={total}
            scoreMessage={scoreMessage()}
            t={t}
          />
        )}
      </div>

      {/* Generate / Start / Replay button row */}
      {(showHint || showError || isLoading) && (
        <button
          type="button"
          className="btn btn-ai btn-md panel-quiz-action"
          onClick={handleGenerate}
          disabled={isLoading}>
          {isLoading ? (
            <svg className="panel-cast-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <circle cx="12" cy="12" r="10" strokeOpacity="0.3"/>
              <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg className="import-tab-ai-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="aiQuizGrad" x1="23" y1="1" x2="2.1" y2="23" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F67BF8"/>
                  <stop offset="0.62" stopColor="#4959E6"/>
                </linearGradient>
              </defs>
              <path d="M12 1.5C12.28 1.5 12.5 1.72 12.5 2C12.5 7.25 16.75 11.5 22 11.5C22.28 11.5 22.5 11.72 22.5 12C22.5 12.28 22.28 12.5 22 12.5C16.75 12.5 12.5 16.75 12.5 22C12.5 22.28 12.28 22.5 12 22.5C11.72 22.5 11.5 22.28 11.5 22C11.5 16.75 7.25 12.5 2 12.5C1.72 12.5 1.5 12.28 1.5 12C1.5 11.72 1.72 11.5 2 11.5C7.25 11.5 11.5 7.25 11.5 2C11.5 1.72 11.72 1.5 12 1.5Z" fill="url(#aiQuizGrad)"/>
            </svg>
          )}
          {isLoading ? t.quizLoading : (showError ? t.quizRegenerateBtn : t.quizGenerateBtn)}
        </button>
      )}

      {showStartBtn && (
        <button type="button" className="btn btn-ai btn-md panel-quiz-action" onClick={handleStart}>
          <svg className="import-tab-ai-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="aiQuizGrad2" x1="23" y1="1" x2="2.1" y2="23" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F67BF8"/>
                <stop offset="0.62" stopColor="#4959E6"/>
              </linearGradient>
            </defs>
            <path d="M12 1.5C12.28 1.5 12.5 1.72 12.5 2C12.5 7.25 16.75 11.5 22 11.5C22.28 11.5 22.5 11.72 22.5 12C22.5 12.28 22.28 12.5 22 12.5C16.75 12.5 12.5 16.75 12.5 22C12.5 22.28 12.28 22.5 12 22.5C11.72 22.5 11.5 22.28 11.5 22C11.5 16.75 7.25 12.5 2 12.5C1.72 12.5 1.5 12.28 1.5 12C1.5 11.72 1.72 11.5 2 11.5C7.25 11.5 11.5 7.25 11.5 2C11.5 1.72 11.72 1.5 12 1.5Z" fill="url(#aiQuizGrad2)"/>
          </svg>
          {t.quizGenerateBtn}
        </button>
      )}

      {showCompleted && (
        <div className="panel-quiz-end-actions">
          <button type="button" className="btn btn-outline btn-md panel-quiz-action" onClick={handleReplay}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="23 4 23 10 17 10"/>
              <polyline points="1 20 1 14 7 14"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
            {t.quizReplay}
          </button>
        </div>
      )}

      {(showPlaying || showCompleted) && (
        <span className="panel-quiz-disclaimer">{t.quizDisclaimer}</span>
      )}
    </div>
  );
}

function QuizPlayer({ questions, currentIdx, setCurrentIdx, answers, onPick, onSubmit, t }) {
  const total = questions.length;
  const q = questions[currentIdx];
  const isLast = currentIdx === total - 1;
  const allAnswered = answers.every(a => a !== null);

  return (
    <div className="panel-quiz-player">
      <div className="panel-quiz-progress">
        <span className="panel-quiz-progress-label">{t.quizQuestionCounter(currentIdx + 1, total)}</span>
        <div className="panel-quiz-progress-bar">
          <div className="panel-quiz-progress-fill" style={{ width: `${((currentIdx + 1) / total) * 100}%` }} />
        </div>
      </div>

      <div className="panel-quiz-question">{q.q}</div>

      <div className="panel-quiz-choices">
        {q.choices.map((choice, i) => (
          <button
            key={i}
            type="button"
            className={`panel-quiz-choice${answers[currentIdx] === i ? ' is-selected' : ''}`}
            onClick={() => onPick(i)}>
            <span className="panel-quiz-choice-letter">{String.fromCharCode(65 + i)}</span>
            <span className="panel-quiz-choice-text">{choice}</span>
          </button>
        ))}
      </div>

      <div className="panel-quiz-nav">
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={() => setCurrentIdx(i => Math.max(0, i - 1))}
          disabled={currentIdx === 0}>
          ←
        </button>
        {!isLast ? (
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => setCurrentIdx(i => Math.min(total - 1, i + 1))}>
            →
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={onSubmit}
            disabled={!allAnswered}>
            {t.quizSubmit}
          </button>
        )}
      </div>
    </div>
  );
}

function QuizResult({ questions, answers, score, total, scoreMessage, t }) {
  return (
    <div className="panel-quiz-result">
      <div className="panel-quiz-score">{t.quizScore(score, total)}</div>
      <p className="panel-quiz-score-msg">{scoreMessage}</p>

      <div className="panel-quiz-review">
        <span className="panel-section-eyebrow">{t.quizReviewTitle}</span>
        <ul className="panel-quiz-review-list">
          {questions.map((q, i) => {
            const correct = answers[i] === q.answerIndex;
            return (
              <li key={i} className={`panel-quiz-review-item ${correct ? 'is-correct' : 'is-incorrect'}`}>
                <span className={`panel-quiz-review-badge ${correct ? 'is-correct' : 'is-incorrect'}`}>
                  {correct ? t.quizCorrect : t.quizIncorrect}
                </span>
                <div className="panel-quiz-review-q">{q.q}</div>
                <div className="panel-quiz-review-row">
                  <span className="panel-quiz-review-label">{t.quizYourAnswer}</span>
                  <span>{answers[i] !== null ? q.choices[answers[i]] : '—'}</span>
                </div>
                {!correct && (
                  <div className="panel-quiz-review-row">
                    <span className="panel-quiz-review-label">{t.quizCorrectAnswer}</span>
                    <span>{q.choices[q.answerIndex]}</span>
                  </div>
                )}
                {q.explanation && (
                  <div className="panel-quiz-review-explanation">{q.explanation}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
