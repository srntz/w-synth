import { useSynthChannelContext } from "@/context/SynthChannelContext";
import { useState } from "react";
import Knob from "@/components/custom-ui/knob/Knob";
import { useAppSelector } from "@/store/hooks";
import { PAN_DEFAULT } from "@/localStorage/localStorageDefaults";
import useMountEffect from "@/hooks/useMountEffect";

export default function Pan() {
  const channel = useSynthChannelContext();
  const initialPan = useAppSelector((state) => state.synthOnePan.pan);
  const [panState, setPanState] = useState(initialPan);

  useMountEffect(() => {
    channel.set({
      pan: initialPan,
    });
  });

  function handlePanChange(value: number) {
    channel.set({
      pan: value,
    });
    setPanState(value);
    if (value !== PAN_DEFAULT) {
      localStorage.setItem("synthOnePan", JSON.stringify(value));
    } else {
      localStorage.removeItem("synthOnePan");
    }
  }

  return (
    <div className="pan flex w-full flex-col items-center gap-3">
      <p
        onDragStart={(e) => e.preventDefault()}
        className="cursor-default select-none font-nohemi text-[0.7rem] font-medium text-centauri-black opacity-85"
      >
        Pan
      </p>

      <Knob
        min={-1}
        max={1}
        initValue={panState}
        defaultValue={PAN_DEFAULT}
        onChange={handlePanChange}
        className="bg-centauriBlack h-8 w-8"
      />
    </div>
  );
}
