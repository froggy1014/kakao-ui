// Sample data shared by stories. Images are local SVGs under public/samples.
export const IMG = (name: string) => `/samples/${name}.svg`;

export const PEOPLE = {
  minji: { name: "김민지", avatar: IMG("avatar-minji") },
  junho: { name: "이준호", avatar: IMG("avatar-junho") },
  seoyeon: { name: "박서연", avatar: IMG("avatar-seoyeon") },
  dohyun: { name: "최도현", avatar: IMG("avatar-dohyun") },
  haeun: { name: "정하은", avatar: IMG("avatar-haeun") },
  noPhoto: { name: "알 수 없음" },
};

export const CHANNELS = {
  shop: { name: "미리마켓", avatar: IMG("channel-shop") },
  bank: { name: "포근은행", avatar: IMG("channel-bank") },
};

export const LONG_TEXT =
  "오늘 회의에서 나온 이야기 정리해서 공유할게요. 일정은 다음 주 화요일까지 1차 시안, 목요일에 리뷰, 금요일에 최종 확정하는 걸로 했고요. 디자인 쪽 리소스가 부족하면 미리 말해주세요!";
