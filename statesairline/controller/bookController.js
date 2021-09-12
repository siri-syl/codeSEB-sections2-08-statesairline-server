const flights = require('../repository/flightList');
// 항공편 예약 데이터를 저장합니다.
let booking = [];

module.exports = {
  // [GET] /book 요청을 수행합니다.
  // 전체 데이터 혹은 요청 된 flight_uuid, phone 값과 동일한 예약 데이터를 조회합니다.
  findById: async (req, res) => {
    //TODO: 
    // {
    //   flight_uuid: 'af6fa55c-da65-47dd-af23-578fdba44bed',
    //   name: '김코딩',
    //   phone: '010-1234-5678'
    // }
    let reqQue = req.query,
    keys = Object.keys(reqQue);
    let result = booking.filter((bookItem) => keys.every(k =>  reqQue[k] === bookItem[k]));

    if(!!reqQue.phone){
      return res.status(200).json(result[0]);
    }
    return res.status(200).json(result);
  },

  // [POST] /book 요청을 수행합니다.
  // 요청 된 예약 데이터를 저장합니다.
  create: async (req, res) => {
    //TODO: 
    booking.push(req.body)
    return res.status(201).json({ message: 'Create success!' });
  },

  // [DELETE] /book?phone={phone} 요청을 수행합니다.
  // 요청 된 phone 값과 동일한 예약 데이터를 삭제합니다.
  deleteById: async (req, res) => {
    //TODO: 
    let reqQue = req.query;
    let result = [];
    for(let i=0; i<booking.length; i++){
      if(booking[i].phone === reqQue.phone){
        result = booking.slice(0,i).concat(booking.slice(i+1));
      }
    }
    
    return res.status(200).json(result);
  }
};
