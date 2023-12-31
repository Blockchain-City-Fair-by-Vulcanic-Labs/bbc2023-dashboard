import { Rye } from "next/font/google";

const rye = Rye({ weight: "400", subsets: ["latin"] });

export default function Button({
  text,
  func,
  disabled = false,
  styling,
}: {
  text: string;
  func: () => void;
  disabled?: boolean;
  styling?: string;
}) {
  return (
    <button
      className={
        rye.className +
        ` w-full text-center text-carnival-yellow border-carnival-yellow border-2 border-carnival-yellow p-2 hover:bg-carnival-yellow hover:text-carnival-green ${styling}`
      }
      disabled={disabled}
      onClick={func}
    >
      {text}
    </button>
  );
}
