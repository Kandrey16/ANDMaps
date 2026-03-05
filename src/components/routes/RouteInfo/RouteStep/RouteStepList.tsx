import { useState } from "react";

import { useMapStore } from "../../../../store/map.store";
import type { RouteLegs } from "../../../../types/route.type";
import { RouteStepItem } from "./RouteStepItem";

type RouteStepsListProps = {
  steps: RouteLegs["steps"];
};

export const RouteStepsList = ({ steps }: RouteStepsListProps) => {
  const { setMapLocation } = useMapStore();
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-1 pr-1 text-xs">
      {steps.map((step, i) => (
        <RouteStepItem
          key={i}
          index={i}
          step={step}
          isActive={i === active}
          onClick={() => {
            if (step.maneuver?.location) {
              setMapLocation(step.maneuver.location, 16);
              setActive(i);
            }
          }}
        />
      ))}
    </div>
  );
};
