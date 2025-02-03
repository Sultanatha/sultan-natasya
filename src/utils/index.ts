export const getContentHeight = (
  currentWidth: number,
  designSize: { width: number; height: number }
) => (designSize.height * currentWidth) / designSize.width;
