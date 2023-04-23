export default function fixedLengthBase64(
  input: string,
  fixedLength: number,
): string {
  if (fixedLength <= 0) {
    throw new Error("Fixed length must be a positive integer.");
  }

  const encoder = new TextEncoder();
  const inputData = encoder.encode(input);

  const fixedData = new Uint8Array(fixedLength);
  for (let i = 0; i < inputData.length; i++) {
    fixedData[i % fixedLength] ^= inputData[i] as number;
  }

  const b64 = btoa(String.fromCharCode.apply(null, Array.from(fixedData)));
  return b64;
}
