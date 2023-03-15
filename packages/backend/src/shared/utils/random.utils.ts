export const getRandomSubset = <T>(arr: T[], num: number): T[] => {
  const copyArr = [...arr];

  for (let i = copyArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copyArr[i], copyArr[j]] = [copyArr[j], copyArr[i]];
  }

  return copyArr.slice(0, num);
};
