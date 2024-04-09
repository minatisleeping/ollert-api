import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

// * Khởi tạo 1 đối tượng trelloDatabaseInstance ban đầu là null(vì mình chưa connect)
let trelloDatabaseInstance = null

const client = new MongoClient(env.MONGODB_URI, {
  // Lưu ý: cái serverApi có từ phiên bản MongoDB 5.0.0 trở lên có thể k cần dùng nó, còn nếu dùng nó là chúng
  //ta sẽ chỉ định một cái Stable API Version của MongoDB
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  // * Gọi kết nối tới MongoDB Atlas với URI đã khai báo trong thân của mongoClientInstance
  await client.connect()

  // * Kết nối thành công thì lấy ra Database theo tên và gán ngược lại vào biến trelloDatabaseInstance ở trên
  trelloDatabaseInstance = client.db(env.DATABASE_NAME)
}

// * Đóng kết nối tới database khi cần
export const CLOSE_DB = async () => {
  await client.close()
}

// Function GET_DB (không async) này có nhiệm vụ export ra cái TrelloDatabaseInstance sau khi đã connect thành
//công tới MongoDB để ta sử dụng nhiều nơi khác nhau trong code
// ! Lưu ý phải đảm bảo chỉ luôn gọi cái GET_DB này sai khi đã kết nối thành công tới MongoDB
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!')
  return trelloDatabaseInstance
}

