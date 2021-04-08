/*
 * @Author: jiwenjie5 
 * @Date: 2021-04-Th 09:15:16 
 * @Last Modified by:   jiwenjie5 
 * @Last Modified time: 2021-04-Th 09:15:16 
 */
import http from './httpInstance';

// 项目生成后自动带出的接口文件，可以忽略
function getUserInfo () {
  return http({
    method: 'get',
    url: 'https://my-json-server.typicode.com/zimplexing/demo/userInfo'
  })
}

// 获取车辆列表接口
function queryVehicleList(params) {
  return http.post('/evacs/api/vehicleinfo/service/vehicles', params);
}

// 删除车辆信息接口
function deleteVehicle(params) {
  return http.post('/evacs/api/vehicleinfo/service/deletevehicle', params);
}

// 获取车辆颜色参照值列表
function loadPlateColors(params) {
  return http.get('/evacs/api/datadicitonnary/service/platecolors', { params });
}

// 获取车辆燃油编码参照值
function loadOiltypes() {
  return http.get('/evacs/api/datadicitonnary/service/oiltypes');
}

// 获取车辆排放阶段编码信息
function loadPlevels() {
  return http.get('/evacs/api/datadicitonnary/service/plevels');
}

// 添加车辆信息
function addVehicle(params) {
  return http.post('/evacs/api/vehicleinfo/service/addvehicle', params);
}

// 修改车辆界面
function updateVehicle(params) {
  return http.post('/evacs/api/vehicleinfo/service/updatevehicle', params);
}

// 客户参数信息查询
function queryClientParams() {
  return http.get('/evacs/api/consumerparam/service/params');
}

// 客户参数信息添加修改
function addClientParams(params) {
  return http.post('/evacs/api/consumerparam/service/addparam', params);
}

// 查询通用模式的台账信息
function queryBookInfo() {
  return http.get('/evacs/api/standingbookconfig/service/bookinfo');
}

// 添加通用模式台账信息
function addBookInfo(params) {
  return http.post('/evacs/api/standingbookconfig/service/addinfo', params);
}

// 车牌号模式台账信息查询
function queryVehiclebills(params) {
  return http.post('/evacs/api/vehiclebill/service/vehiclebills', params);
}

// 车辆台账-车牌模式-删除数据
function deleteBill(params) {
  return http.post('/evacs/api/vehiclebill/service/deletebiil', params);
}

// 车辆台账-车牌模式-车辆台账信息上传
function addBill(params) {
  return http.post('/evacs/api/vehiclebill/service/addbiil', params);
}

// 通用模式授权接口
function switchEnable(params) {
  return http.post('/evacs/api/standingbookconfig/service/enable', params);
}

export default {
  getUserInfo,

  deleteVehicle,
  queryVehicleList,
  addVehicle,
  updateVehicle,
  queryClientParams,
  addClientParams,
  queryBookInfo,
  addBookInfo,
  deleteBill,
  addBill,
  switchEnable,

  queryVehiclebills,

  loadPlateColors,
  loadOiltypes,
  loadPlevels
}
