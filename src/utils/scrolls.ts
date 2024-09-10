import { debounce } from "@/utils";

export const handleScrollX = (
  event: React.UIEvent<HTMLDivElement>,
  customFunction: () => void,
): void => {
  const target = event.target as HTMLDivElement;
  const { scrollWidth, clientWidth, scrollLeft } = target;
  const isEnd = scrollWidth - clientWidth === scrollLeft;

  const debouncedScroll = debounce(() => {
    target.scrollLeft = scrollWidth - clientWidth - 1;
    customFunction();
  }, 300);

  if (isEnd) {
    debouncedScroll();
  }
};
