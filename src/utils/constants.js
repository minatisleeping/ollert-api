// * Những domain được phép truy cập tới tài nguyên Server
//* Vd blacklist là những trang web không được phép truy cập tới tài nguyên Server thì whitelist ngược lại
export const WHITELIST_DOMAINS = [
  // 'http://localhost:5173'
  'https://trello-web-hazel.vercel.app'
]

export const BOARD_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
}
