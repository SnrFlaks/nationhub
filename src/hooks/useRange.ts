import { useEffect, useState } from "react";
import { Country, countryService } from "@api/CountryService";

const useRange = (type: keyof Country) => {
  const [range, setRange] = useState<[number, number]>([0, 0]);
  const [minMaxRange, setMinMaxRange] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const fetchMinMaxRanges = async () => {
      const min = await countryService.getMin(type);
      const max = await countryService.getMax(type);
      setMinMaxRange([min ?? 0, max ?? 0]);
      setRange([min ?? 0, max ?? 0]);
    };

    fetchMinMaxRanges();
  }, [type]);

  return [range, minMaxRange, setRange] as const;
};

export default useRange;
