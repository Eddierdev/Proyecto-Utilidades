"use client";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function DatePicker({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white font-mono text-sm
                   focus:outline-none focus:border-yellow-400/60 focus:ring-1 focus:ring-yellow-400/30
                   [color-scheme:dark] cursor-pointer"
      />
      {value && (
        <span className="text-xs text-white/40 font-mono">{value}</span>
      )}
    </div>
  );
}
