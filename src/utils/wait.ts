export default function wait(milliseconds: number): Promise<void> {
  return new Promise((res) => setTimeout(res, milliseconds));
}
