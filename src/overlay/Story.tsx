import Motion, {storyBeats} from "./Motion";
import { copy } from "../config/copy";
export function Demo({ index }: { index: number }) {
  return (
    <div className={`demo demo-${index}`}>
      {index === 0 && (
        <>
          <div className="demo-top">
            <span className="spark">✧</span> AI search <span>•••</span>
          </div>
          <div className="query" data-query>
            Who should I call nearby?
          </div>
          <div className="result">
            <span className="result-icon">A</span>
            <div>
              <strong>Your Business</strong>
              <p>Clear service · Clear next step</p>
            </div>
            <span className="check">✓</span>
          </div>
          <div className="recommendation-context">A business that matches the request, with a simple way to get in touch.</div><div className="screen-call-action">Call your business <span>↗</span></div><div className="screen-input">Ask a follow-up <span>↑</span></div>
        </>
      )}
      {index === 1 && (
        <>
          <div className="demo-top">
            AI Receptionist <span className="live">Live</span>
          </div>
          <div className="call-avatar">A<span/></div><div className="call-name">Your Business</div><small className="call-subtitle">Answers · qualifies · books</small><div className="wave">
            {Array.from({ length: 24 }, (_, i) => (
              <i key={i} style={{ height: 12 + Math.sin(i * 2) ** 2 * 35 }} />
            ))}
          </div>
          <div className="transcript">
            {copy.transcript.map((s, i) => (
              <p data-transcript={i} key={s}>
                {s}
              </p>
            ))}
          </div><div className="call-controls"><span>⌕</span><span>⋮</span><span>↗</span><span className="end-call">⌁</span></div>
        </>
      )}
      {index === 2 && (
        <>
          <div className="demo-top">
            Booking Agent <span>Tuesday</span>
          </div>
          <h3>Choose a time.</h3>
          <div className="calendar-month"><strong>October</strong><span>‹ &nbsp; ›</span></div><div className="calendar-week">{["M","T","W","T","F","S","S"].map((d,i)=><span key={i}>{d}<b className={i===1?"selected-day":""}>{19+i}</b></span>)}</div><div className="calendar">
            <span>09:00</span>
            <span className="slot" data-booked>
              10:00 <b>✓ Booked</b>
            </span>
            <span>11:00</span>
            <span>14:30</span>
          </div>
        </>
      )}
      {index === 3 && (
        <>
          <div className="demo-top">
            Reminder Agent <span>↗</span>
          </div>
          <div className="messages">
            {copy.messages.map((s, i) => (
              <p data-message={i} key={s}>
                {s}
                <small>Delivered ✓</small>
              </p>
            ))}
          </div>
        </>
      )}
      {index === 4 && (
        <>
          <div className="demo-top">
            Your business <span>{copy.dashboard}</span>
          </div>
          <small>Illustrative booked-jobs dashboard</small>
          <div className="counter" data-counter>
            $2,400,000
          </div>
          <div className="pipeline">
            <span>New</span>
            <span>Qualified</span>
            <span>Won</span>
            <div className="lead" data-lead>
              <b>Quote follow-up</b>
              <small>Next step scheduled</small>
            </div>
          </div>
        </>
      )}
      {index === 5 && (
        <div className="review-flow">
          <div className="review-request">
            <div className="review-app-bar"><span className="review-business-mark">A</span><span>Your Business</span><i>•••</i></div>
            <div className="review-message"><small>Thanks for choosing us.</small><strong>How was your experience?</strong><p>Your feedback helps the next customer find the right team.</p></div>
            <div className="review-action">Leave a review <span>→</span></div>
          </div>
          <div className="review-submitted">
            <span className="review-success">✓</span>
            <small>REVIEW SUBMITTED</small>
            <strong>Thank you for the five stars.</strong>
            <div className="review-stars" aria-label="Five-star review"><i>★</i><i>★</i><i>★</i><i>★</i><i>★</i></div>
            <p>“Quick, clear and easy to work with.”</p>
          </div>
        </div>
      )}
    </div>
  );
}
export function ScenePhoto({index}:{index:number}){return <Motion index={index}/>}
export default function Story(){return <>{copy.captions.map((caption,i)=><article className={`story-panel editorial-story editorial-scene-${i}`} data-scene={i+1} key={caption}>
<div className="scene-heading"><h2>{caption}</h2></div>
<div className="editorial-stage"><Motion index={i}/><div className="scene-intent"><span>What happens next</span><p>{storyBeats[i].detail}</p></div><div className={`center-device ${i===4?'center-monitor':'center-phone'} ${i===5?'review-phone':''}`}>
{(i<4||i===5)&&<><div className="phone-rear"><div className="camera-cluster"><i/><i/><i/><b/></div><span>avanor</span></div><div className="phone-volume"/><div className="device-topline"><span>9:41</span><i/><span className="status-icons"><svg viewBox="0 0 38 12" aria-hidden="true"><path d="M1 10V7m4 3V5m4 5V2" stroke="currentColor" strokeWidth="2"/><path d="M14 3q5-4 10 0m-8 3q3-2 6 0m-4 3h2" fill="none" stroke="currentColor" strokeWidth="1.5"/><rect x="28" y="2" width="8" height="8" rx="2" fill="currentColor"/><path d="M37 4v4" stroke="currentColor"/></svg></span></div><div className="device-side-key"/></>}
<div className="device-interior"><Demo index={i}/></div>{(i<4||i===5)?<div className="device-bottomline"/>:i===4?<div className="display-stand"/>:null}</div></div><small className="editorial-demo-label">{copy.demo}</small>
</article>)}</>}
