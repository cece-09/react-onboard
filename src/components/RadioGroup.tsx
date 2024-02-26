export const RadioGroup = (props: {
  type?: "color" | "align" | "sticker";
  options: string[] | number[];
  selectedIdx: number;
  onClick: (idx: number) => void;
}) => {
  const { type, options, selectedIdx, onClick } = props;

  return (
    <section className="radio-group">
      {options.map((option, idx) => (
        <button
          key={idx}
          onClick={() => onClick(idx)}
          className={`radio ${type === "color" ? `color-${option}` : ""} ${
            idx === selectedIdx ? "selected" : ""
          }`}
        >
          {option}
        </button>
      ))}
    </section>
  );
};
