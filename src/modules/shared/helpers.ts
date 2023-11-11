export function getImageLink(cid: string, name: string): string {
  return `https://${cid}.ipfs.w3s.link/${name}`;
}

export function integerToBoolArray(num: number, length: number): boolean[] {
  let binaryString = num.toString(2);
  // ensure binary string totals to a string of {length}
  // MSB - LSB
  if (binaryString.length < length) {
    binaryString =
      new Array(length - binaryString.length).fill(0).join("") + binaryString;
  }
  // convert string to array of bool
  const boolArray = binaryString
    .split("")
    .reverse()
    .map((e) => Boolean(Number(e)));

  return boolArray;
}
