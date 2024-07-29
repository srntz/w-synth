import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import { useSynthContext } from "@/context/synthContext";
import { ChangeEvent, useState } from "react";
import { EnvelopeCurve } from "tone";
import Knob from "@/components/custom-ui/knob/Knob";

export default function EnvelopeAttack() {
  const synth = useSynthContext();

  const [attackState, setAttackState] = useState<{
    attack: string;
    attackCurve: EnvelopeCurve;
  }>({
    attack: synth.get().envelope.attack.toString(),
    attackCurve: synth.get().envelope.attackCurve.toString() as EnvelopeCurve,
  });

  function handleAttackChange(e: ChangeEvent) {
    synth.set({
      envelope: {
        attack: (e.target as HTMLInputElement).value,
      },
    });
    setAttackState((prev) => {
      return {
        ...prev,
        attack: (e.target as HTMLInputElement).value,
      };
    });
  }

  function handleAttackCurveChange(value: string) {
    synth.set({
      envelope: {
        attackCurve: value as EnvelopeCurve,
      },
    });
    setAttackState((prev) => {
      return {
        ...prev,
        attackCurve: value as EnvelopeCurve,
      };
    });
  }

  return (
    <div className="envelope-attack flex h-full w-full flex-col items-center justify-between py-4">
      <p
        onDragStart={(e) => e.preventDefault()}
        className="cursor-default select-none font-subjectivity text-sm font-medium text-slate-800"
      >
        Attack
      </p>
      {/* <input
        type="range"
        name="attack"
        min={0}
        max={10}
        step={0.01}
        value={attackState.attack}
        onChange={handleAttackChange}
      /> */}
      <Knob className="h-11 w-11" />

      <Select
        value={attackState.attackCurve.toString()}
        onValueChange={handleAttackCurveChange}
      >
        <SelectTrigger
          onDragStart={(e) => e.preventDefault()}
          className="h-1 w-[50px] select-none text-[12px]"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Attack Curve</SelectLabel>
            <SelectItem value="linear">&zwnj;Linear</SelectItem>
            <SelectItem value="exponential">&zwnj;Exp</SelectItem>
            <SelectItem value="sine">&zwnj;Sine</SelectItem>
            <SelectItem value="cosine">&zwnj;Cosine</SelectItem>
            <SelectItem value="bounce">&zwnj;Bounce</SelectItem>
            <SelectItem value="ripple">&zwnj;Ripple</SelectItem>
            <SelectItem value="step">&zwnj;Step</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
