export const tabs = ['all', 'about', 'works', 'misc'];
export const subTabs = ['projects', 'pens'];
export const audioFiles = [
  '1.mp3',
  '2.mp3',
  '3.mp3',
  '4.mp3',
  '5.mp3',
  '6.mp3',
  '7.mp3',
  '8.mp3',
];

export const getPathName = (): string => {
  let location = window.location.pathname?.split('/')?.[1];
  if (tabs.includes(location)) return location;
  window.history.replaceState(null, '', `/${tabs[0]}`);
  return tabs[0];
};

export const getSubPathName = (): string => {
  let location = window.location.pathname?.split('/')?.[2];
  return location;
};

const pi = Math.PI;
const timingFunction = (x: number) => 0.5 * (Math.cos(x * pi + pi) + 1);
export const scrollToTop = (
  top = 0,
  element = document.scrollingElement as Element
): void => {
  const startTop = element.scrollTop;
  top = top ?? startTop;
  top = Math.max(0, Math.min(element.scrollHeight - element.clientHeight, top));
  if (startTop === top) return;
  const distanceTop = top - startTop;

  let x = 0,
    prevTimestamp: number = 0;

  function step(newTimestamp: number) {
    x += (newTimestamp - prevTimestamp) / 250;
    x = Math.min(x, 1);
    const fraction = timingFunction(x);
    element.scroll({
      top: startTop + fraction * distanceTop,
      behavior: 'smooth',
    });
    if (x >= 1) return;
    prevTimestamp = newTimestamp;
    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame((timestamp) => {
    prevTimestamp = timestamp;
    window.requestAnimationFrame(step);
  });
};
