const { filter } = require('../repository/flightList');
const flights = require('../repository/flightList');

module.exports = {
  // [GET] /flight
  // 요청 된 departure_times, arrival_times, destination, departure 값과 동일한 값을 가진 항공편 데이터를 조회합니다.
  findAll: async (req, res) => {
    //TODO: 
    // /flight?departure_times=2021-12-03T12:00:00&arrival_times=2021-12-03T12:00:00
    // /flight?departure=CJU&destination=ICN

    let reqQue = req.query;
    // console.log(reqQue);
    let keys = Object.keys(reqQue),
    result = flights.filter(flightItem => keys.every(k => reqQue[k] === flightItem[k]));

    // let result = flights.filter((item) => {
    //   if(reqQue.length !== 0) return true;
    //   else{
    //     for(let prop in reqQue){

    //       flights[prop] === reqQue[prop]
    //     }
    //   }
    // })

    return res.json(result);
  },
  // [GET] /flight/{:id}
  // 요청 된 id 값과 동일한 uuid 값을 가진 항공편 데이터를 조회합니다.
  findById: async (req, res) => {
    //TODO: 
    let reqPar = req.params;
    let result = flights.filter((item) => {
      if(reqPar.length === 0) {
        return true;
      }
      else{
        return item.uuid === reqPar.id
      }
    })

    return res.json(result)
  },

  // [PUT] /flight/{:id} 요청을 수행합니다.
  // 요청 된 id 값과 동일한 uuid 값을 가진 항공편 데이터를 요청 된 Body 데이터로 수정합니다.
  update: async (req, res) => {
    let data = {};
    let tempFlights = flights.slice();
    //TODO: 

    let reqBody = req.body; // 바꿔야 하는 정보
    let reqPar = req.params; // 요청 id값

    for(let i=0; i<tempFlights.length; i++){
      if(flights[i].uuid === reqPar.id){
        for(let prop in tempFlights[i]){
          data[prop] = tempFlights[i][prop];
        }
        for(let prop in reqBody){
          data[prop] = reqBody[prop];
          tempFlights[i][prop] = reqBody[prop];
        }
      }
    }
    // console.log(data)
    
    return res.status(200).json(data);
  }
};
