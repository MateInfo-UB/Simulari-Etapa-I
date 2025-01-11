import { H3, Radio } from '@blueprintjs/core'
import { ProblemaType } from './types'
import MarkdownPreview from '@uiw/react-markdown-preview';

interface ProblemViewerProps {
  problem: ProblemaType,
  pickedAnswer: string | undefined,
  setPickedAnswer: (answer: string) => void,
  // Answer is shown, and the user can't change it
  isInReviewMode: boolean,
}

const ProblemViewer = ({ problem, pickedAnswer, setPickedAnswer, isInReviewMode }: ProblemViewerProps) => {
  return <div
    style={{
      height: "100%",
      width: "100%",
      padding: "50px",
      paddingTop: "10px",
      overflow: "auto",
    }}
    data-color-mode="light"
  >
    <H3 style={{ textAlign: "center" }}>{problem.titlu}</H3>
    {problem.enunt_markdown &&
      <MarkdownPreview source={problem.enunt_markdown} style={{ padding: 16 }} />}
    {problem.imagine && <div style={{
      display: "flex",
      justifyContent: "center"
    }}>
      <img src={problem.imagine} style={{
        maxWidth: "400px",
        maxHeight: "300px",
      }} />
    </div>}

    <H3 style={{
      textAlign: "center",
      paddingTop: "30px",
      paddingBottom: "10px",
    }}>Răspuns</H3>
    {/* the choices */}
    <div style={{
      display: "flex",
      flexDirection: "row",
      padding: "10px",
      paddingTop: "0",
    }}>
      {problem.variante.map((varianta) => {
        return <Radio
          key={varianta}
          value={varianta.toString()}
          label={varianta.toString() + (isInReviewMode && varianta.toString() === problem.raspuns.toString() ? " (corect)" : "")}
          onClick={() => setPickedAnswer(varianta.toString())}
          disabled={isInReviewMode}
          checked={pickedAnswer === varianta.toString()}
          style={{ paddingLeft: "30px", paddingRight: "30px" }}
        />
      })}
    </div>
  </div>
}

export { ProblemViewer }
export type { ProblemViewerProps }
