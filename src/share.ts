const TWITTER_BASE_URL = "https://twitter.com/intent/tweet";
const HASH_TAGS: string[] = [];

const generateTwitterUrlWithText = (text: string) => {
  const params = new URLSearchParams(
    Object.entries({
      url: document.URL,
      text,
      hashtags: HASH_TAGS.join(","),
    })
  );
  const url = new URL(`${TWITTER_BASE_URL}?${params.toString()}`);
  return url.href;
};

const generateBody = (time: string) => {
  return `${time}でクリアしました！`;
};

export const generateTwitterUrlWithTime = (time: string) => {
  return generateTwitterUrlWithText(generateBody(time));
};

export const generateTwitterUrl = () => {
  return generateTwitterUrlWithText("23区当てゲームプレイ中！");
};
