export const storyBeats = [
 {title:'Turn demand into the first conversation.',steps:['They see you','They call or inquire','You respond'],detail:'Ads and visibility create demand. A fast response gives it somewhere to go.'},
 {title:'An incoming lead gets a real response.',steps:['Call or form arrives','AI agent responds','Need understood'],detail:'The right questions are asked while the customer is still ready to talk.'},
 {title:'Interest becomes an appointment.',steps:['Qualify the inquiry','Check the calendar','Book the time'],detail:'The agent puts the right appointment straight into your live calendar.'},
 {title:'Good leads do not get forgotten.',steps:['Confirm','Remind','Follow up'],detail:'Reminders reduce no-shows. Consistent follow-up gives the quote another chance to close.'},
 {title:'Your team sees the whole picture.',steps:['Call recorded','Next step assigned','Outcome tracked'],detail:'Every call, text, quote and next action lives in one shared customer record.'},
 {title:'A finished job helps win the next one.',steps:['Job complete','Review requested','Trust compounds'],detail:'A simple review request turns a good customer experience into proof for the next customer.'}
];
export default function Motion({index}:{index:number}){const beat=storyBeats[index];return <div className="purpose-motion" aria-label={beat.title}><div className="purpose-track"><i/></div>{beat.steps.map((s,i)=><div className="purpose-step" key={s} style={{opacity:`calc(.35 + var(--beat-${i}, 1) * .65)`,transform:`translateY(calc((1 - var(--beat-${i}, 1)) * 12px))`}}><span className="purpose-number" aria-hidden="true"/><strong>{s}</strong></div>)}</div>}
