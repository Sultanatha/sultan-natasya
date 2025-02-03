export declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      Share: {
        sendScrap: (arg: { requestUrl: string }) => void;
      };
      Navi: {
        start: (arg: {
          name: string;
          x: number;
          y: number;
          coordType: string;
        }) => void;
      };
    };
    gtag: (...args: any[]) => void;
  }
}
