import { Slider } from "@mui/material";

interface RangeSliderProps {
  className?: string;
  range: [number, number];
  minMaxRange: [number, number];
  setRange: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  className,
  range,
  minMaxRange,
  setRange,
}) => {
  const minDistance = minMaxRange[1] * 0.1;

  const handleRangeChange = (newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) return;
    const [prevMin, prevMax] = range;
    const [newMin, newMax] = newValue;
    const min = activeThumb === 0 ? newMin : prevMin;
    const max = activeThumb === 0 ? prevMax : newMax;
    setRange([
      Math.min(min, prevMax - minDistance),
      Math.max(max, prevMin + minDistance),
    ]);
  };

  return (
    <Slider
      className={className}
      value={range}
      step={minDistance * 0.1}
      onChange={(_, newValue, activeThumb) => {
        handleRangeChange(newValue, activeThumb);
      }}
      valueLabelDisplay="auto"
      min={minMaxRange[0]}
      max={minMaxRange[1]}
      disableSwap
    />
  );
};

export default RangeSlider;
