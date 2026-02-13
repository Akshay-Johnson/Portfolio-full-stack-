type Props = {
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  multiline?: boolean;
};

export default function RightLabelInput({
  label,
  value,
  onChange,
  multiline = false,
}: Props) {
  return (
    <div className="relative w-full">
      {multiline ? (
        <textarea
          value={value}
          onChange={onChange}
          className="border border-gray-600 p-2 w-full rounded pr-24"
          required
        />
      ) : (
        <input
          value={value}
          onChange={onChange}
          className="border border-gray-600 p-2 w-full rounded pr-24"
          required
        />
      )}
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none ">
        {label}
      </span>
    </div>
  );
}
