export const Backgrounds = [];

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const choose = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]!;
const GetRandomBackground = () => `url("backgrounds/${choose(Backgrounds)}")`;
export default GetRandomBackground;
