import { KeyboardLayout } from "./components/KeyboardLayout";
import type { KeyPosition } from "./components/KeyboardLayout";
import { TwitterIcon, GitHubIcon, DribbbleIcon } from "./components/icons";

const macroPadKeys: KeyPosition[] = [
  {
    id: "orange",
    col: 1,
    row: 1,
    keycapProps: { variant: "orange" },
  },
  {
    id: "twitter",
    col: 2,
    row: 1,
    keycapProps: {
      variant: "cream",
      legend: "1",
      children: <TwitterIcon />,
    },
  },
  {
    id: "github",
    col: 3,
    row: 1,
    keycapProps: {
      variant: "cream",
      legend: "2",
      children: <GitHubIcon />,
    },
  },
  {
    id: "dribbble",
    col: 1,
    row: 2,
    keycapProps: {
      variant: "cream",
      legend: "3",
      children: <DribbbleIcon />,
    },
  },
  {
    id: "spacebar",
    col: 2,
    row: 2,
    colSpan: 2,
    keycapProps: { variant: "cream" },
  },
];

export function App() {
  return (
    <div className="flex flex-col items-center gap-8">
      <KeyboardLayout keys={macroPadKeys} columns={3} rows={2} />
    </div>
  );
}
