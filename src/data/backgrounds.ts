export const Backgrounds = [
];

const choose = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const GetRandomBackground = () => `url("backgrounds/${choose(Backgrounds)}")`;
export default GetRandomBackground;
