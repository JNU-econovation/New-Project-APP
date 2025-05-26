export const logMessageWithTime = (message: string) => {
  const now = new Date();
  const timeString = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  console.log(`[${timeString}] ${message}`);
};
